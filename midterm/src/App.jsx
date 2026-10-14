import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { movieApi } from './api/movieApi.js';
import Navbar from './components/Navbar.jsx';
import StatsBanner from './components/StatsBanner.jsx';
import FilterBar from './components/FilterBar.jsx';
import MovieCard from './components/MovieCard.jsx';
import MovieDetailModal from './components/MovieDetailModal.jsx';
import AddMovieModal from './components/AddMovieModal.jsx';
import Pagination from './components/Pagination.jsx';
import LoadingSkeleton from './components/LoadingSkeleton.jsx';
import EmptyState from './components/EmptyState.jsx';
import ErrorState from './components/ErrorState.jsx';
import Toast from './components/Toast.jsx';

const DEFAULT_FILTERS = {
  search: '',
  genre: 'All',
  decade: 'All',
  minRating: 0,
  awardOnly: false,
  sortBy: 'rating-desc',
};

const FAVORITES_STORAGE_KEY = 'cinevault_user_favorites';

export default function App() {
  // Main Catalog & API State
  const [movies, setMovies] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({ totalInDb: 105, avgRating: '8.4', awardWinningCount: 82 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter & Pagination UI State
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(9);

  // Modals & Navigation Views
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // User Favorites (Persistent)
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Defense / Testing Controls
  const [isSimulatedError, setIsSimulatedError] = useState(() => movieApi.isSimulatedErrorActive());
  const [isResetting, setIsResetting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Toast Feedback State
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  // Save favorites to localStorage immutably
  const toggleBookmark = useCallback((movieId) => {
    setFavorites((prev) => {
      const exists = prev.includes(movieId);
      const nextFavorites = exists
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId];

      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(nextFavorites));
      } catch (err) {
        console.error('Failed to save favorites to localStorage', err);
      }

      showToast(
        exists ? 'Removed film from saved favorites.' : 'Saved film to your private favorites!',
        'info'
      );
      return nextFavorites;
    });
  }, [showToast]);

  // Primary Data Fetch Effect
  // Handles dependencies, asynchronous resolution, and cleanup against race conditions
  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);

    movieApi.getMovies({
      ...filters,
      page: currentPage,
      limit,
    })
      .then((res) => {
        if (!ignore) {
          setMovies(res.data);
          setTotalCount(res.total);
          setTotalPages(res.totalPages);
          setStats(res.stats);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message || 'Unable to retrieve films from the archival database.');
          setLoading(false);
        }
      });

    return () => {
      // Cleanup flag: discards obsolete responses if filter parameters update before promise resolves
      ignore = true;
    };
  }, [filters, currentPage, limit, refreshKey]);

  // Handler for filter changes (automatically resets to page 1)
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  // Reset all filters back to default
  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setCurrentPage(1);
    setShowOnlyFavorites(false);
    showToast('All search and filter criteria have been reset.');
  }, [showToast]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.search !== '' ||
      filters.genre !== 'All' ||
      filters.decade !== 'All' ||
      filters.minRating !== 0 ||
      filters.awardOnly === true ||
      filters.sortBy !== 'rating-desc' ||
      showOnlyFavorites
    );
  }, [filters, showOnlyFavorites]);

  // Filter out non-favorites if favorites mode is toggled
  const displayedMovies = useMemo(() => {
    if (!showOnlyFavorites) return movies;
    return movies.filter((m) => favorites.includes(m.id));
  }, [movies, showOnlyFavorites, favorites]);

  // Toggle Simulated Error State for Defense Demonstrations
  const handleToggleSimulatedError = useCallback(() => {
    const nextState = !isSimulatedError;
    movieApi.setSimulatedError(nextState);
    setIsSimulatedError(nextState);
    setRefreshKey((k) => k + 1);
    showToast(
      nextState
        ? 'Simulated Server Error activated. Requests will now fail (demonstrating error states).'
        : 'Simulated Server Error disabled. Normal API operations restored.',
      nextState ? 'error' : 'success'
    );
  }, [isSimulatedError, showToast]);

  // Turn off error explicitly from ErrorState component
  const handleDisableSimulatedError = useCallback(() => {
    movieApi.setSimulatedError(false);
    setIsSimulatedError(false);
    setRefreshKey((k) => k + 1);
    showToast('Simulated error turned off. Retrying request...', 'success');
  }, [showToast]);

  // Reset Database back to 105 Seed Records
  const handleResetDatabase = async () => {
    setIsResetting(true);
    try {
      await movieApi.resetDatabase();
      setIsSimulatedError(false);
      handleResetFilters();
      setRefreshKey((k) => k + 1);
      showToast('CineVault archive successfully restored to pristine 105 seed masterworks!');
    } catch (err) {
      showToast(err.message || 'Failed to reset database.', 'error');
    } finally {
      setIsResetting(false);
    }
  };

  // Callback when new film is submitted via controlled form
  const handleMovieAdded = useCallback((newMovie) => {
    setRefreshKey((k) => k + 1);
    showToast(`Masterpiece "${newMovie.title}" successfully archived in CineVault!`, 'success');
  }, [showToast]);

  return (
    <div className="app-root">
      {/* 1. Header & Navigation Component */}
      <Navbar
        onOpenAddModal={() => setIsAddModalOpen(true)}
        favoritesCount={favorites.length}
        onShowFavoritesOnly={() => {
          setShowOnlyFavorites((prev) => !prev);
          setCurrentPage(1);
        }}
        isFavoritesFilterActive={showOnlyFavorites}
        isSimulatedError={isSimulatedError}
        onToggleSimulatedError={handleToggleSimulatedError}
        onResetDatabase={handleResetDatabase}
        isResetting={isResetting}
      />

      <main className="container" id="main-content">
        {/* 2. Hero & Aggregate Metrics Component */}
        <StatsBanner
          totalInDb={stats.totalInDb}
          totalMatching={showOnlyFavorites ? displayedMovies.length : totalCount}
          avgRating={stats.avgRating}
          awardCount={stats.awardWinningCount}
        />

        {/* 3. Search, Filter, Sort & Limit Controls Component */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
          limit={limit}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setCurrentPage(1);
          }}
        />

        {/* Results Count & Favorites Indicator */}
        <div className="results-header">
          <p className="results-count">
            {showOnlyFavorites ? (
              <span>
                Showing <strong>{displayedMovies.length}</strong> saved film{displayedMovies.length === 1 ? '' : 's'}
              </span>
            ) : (
              <span>
                Showing <strong>{movies.length}</strong> of <strong>{totalCount}</strong> matching films in catalog
              </span>
            )}
          </p>
        </div>

        {/* 4. Conditional Content Rendering: Loading, Error, Empty, and Success States */}
        {loading && <LoadingSkeleton count={limit} />}

        {!loading && error && (
          <ErrorState
            error={error}
            onRetry={() => setRefreshKey((k) => k + 1)}
            onDisableSimulatedError={isSimulatedError ? handleDisableSimulatedError : null}
          />
        )}

        {!loading && !error && displayedMovies.length === 0 && (
          <EmptyState onResetFilters={hasActiveFilters ? handleResetFilters : null} />
        )}

        {!loading && !error && displayedMovies.length > 0 && (
          <>
            {/* Movie Cards Grid with Stable Keys */}
            <div className="movies-grid" role="region" aria-label="Film catalog list">
              {displayedMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onSelectMovie={(id) => setSelectedMovieId(id)}
                  isBookmarked={favorites.includes(movie.id)}
                  onToggleBookmark={toggleBookmark}
                />
              ))}
            </div>

            {/* 5. Reusable Pagination Component */}
            {!showOnlyFavorites && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 380, behavior: 'smooth' });
                }}
                totalItems={totalCount}
                limit={limit}
              />
            )}
          </>
        )}
      </main>

      {/* 6. Detail View Modal (Separate View) */}
      {selectedMovieId && (
        <MovieDetailModal
          movieId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
          isBookmarked={favorites.includes(selectedMovieId)}
          onToggleBookmark={toggleBookmark}
        />
      )}

      {/* 7. Controlled Form Modal for Adding Item */}
      <AddMovieModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onMovieAdded={handleMovieAdded}
      />

      {/* 8. Toast Feedback Alert */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Site Footer */}
      <footer className="site-footer" role="contentinfo">
        <div className="container footer-content">
          <div className="footer-brand">CINEVAULT ARCHIVE</div>
          <p className="footer-text">
            Built as a React Single Page Application (SPA) with asynchronous simulated REST API,
            dynamic search, multi-criteria filtering, controlled forms, and comprehensive defense readiness.
          </p>
        </div>
      </footer>
    </div>
  );
}
