import React, { useEffect, useState } from 'react';
import { X, Star, Clock, Globe, Award, Users, BookOpen, Quote, Heart } from 'lucide-react';
import { movieApi } from '../api/movieApi.js';

/**
 * MovieDetailModal Component
 * 
 * Detailed film view displaying comprehensive metadata, synopsis,
 * awards, cast, and curator notes. Fetches single movie via async API
 * to illustrate detail view fetching, loading, error, and cleanup.
 */
export default function MovieDetailModal({
  movieId,
  onClose,
  isBookmarked,
  onToggleBookmark
}) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Demonstrate useEffect cleanup to prevent race conditions on detail view fetching
  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);

    movieApi.getMovieById(movieId)
      .then((data) => {
        if (!ignore) {
          setMovie(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message || 'Failed to load movie details.');
          setLoading(false);
        }
      });

    return () => {
      // Cleanup flag ensures stale async responses don't update unmounted component
      ignore = true;
    };
  }, [movieId]);

  // Handle ESC keyboard press to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const formatRuntime = (mins) => {
    if (!mins) return 'N/A';
    const hours = Math.floor(mins / 60);
    const remainder = mins % 60;
    return hours > 0 ? `${hours}h ${remainder}m` : `${remainder}m`;
  };

  const fallbackPoster = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80';

  return (
    <div 
      className="modal-backdrop" 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-modal-title"
    >
      <div className="modal-container">
        {/* Close Modal Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close details modal"
          id="btn-close-detail-modal"
        >
          <X size={20} />
        </button>

        {loading && (
          <div style={{ padding: '5rem 2rem', textAlign: 'center' }}>
            <div className="state-icon-circle">
              <Star size={32} className="spin" />
            </div>
            <p style={{ color: 'var(--text-muted)' }}>Retrieving archival records from CineVault...</p>
          </div>
        )}

        {error && (
          <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--accent-rose)', marginBottom: '1.5rem' }}>{error}</p>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Return to Catalog
            </button>
          </div>
        )}

        {!loading && !error && movie && (
          <>
            {/* Header / Hero Banner */}
            <div className="modal-hero">
              <img
                src={movie.posterUrl || fallbackPoster}
                alt={movie.title}
                className="modal-hero-img"
              />
              <div className="modal-hero-gradient" />
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              {/* Title & Rating Header */}
              <div className="modal-title-row">
                <div>
                  <h2 id="detail-modal-title" className="modal-title">
                    {movie.title}
                  </h2>
                  {movie.originalTitle && movie.originalTitle !== movie.title && (
                    <div className="modal-original-title">
                      Original Title: {movie.originalTitle}
                    </div>
                  )}
                </div>

                <div className="modal-rating-badge">
                  <Star size={18} fill="#f59e0b" color="#f59e0b" />
                  <span>{Number(movie.rating).toFixed(1)} / 10</span>
                </div>
              </div>

              {/* Quick Metadata Chips */}
              <div className="modal-metadata-chips">
                <span className="meta-chip gold">Dir. {movie.director}</span>
                <span className="meta-chip">{movie.year} ({movie.decade})</span>
                <span className="meta-chip">{formatRuntime(movie.runtime)}</span>
                <span className="meta-chip">{movie.country}</span>
                <span className="meta-chip">Language: {movie.language}</span>
                {Array.isArray(movie.genres) && movie.genres.map((g) => (
                  <span key={g} className="genre-tag">{g}</span>
                ))}
              </div>

              {/* Main Content & Sidebar Grid */}
              <div className="modal-details-grid">
                {/* Left Column: Synopsis & Curator Commentary */}
                <div>
                  <h3 className="section-heading">
                    <BookOpen size={16} />
                    <span>Archival Synopsis</span>
                  </h3>
                  <p className="modal-synopsis">
                    {movie.synopsis}
                  </p>

                  {movie.curatorNotes && (
                    <div className="curator-quote-box">
                      <div className="section-heading" style={{ fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                        <Quote size={14} />
                        <span>Curator's Critical Assessment</span>
                      </div>
                      <p className="curator-quote-text">
                        "{movie.curatorNotes}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Right Column: Cast & Festival Laurels */}
                <aside className="modal-sidebar">
                  {/* Cast Info */}
                  <div className="info-item">
                    <div className="info-item-label">
                      <Users size={13} style={{ display: 'inline', marginRight: '4px' }} />
                      Key Cast
                    </div>
                    <div className="info-item-value">
                      {Array.isArray(movie.cast) ? movie.cast.join(', ') : 'Ensemble'}
                    </div>
                  </div>

                  {/* Festival Honors */}
                  {Array.isArray(movie.festivalAwards) && movie.festivalAwards.length > 0 && (
                    <div className="info-item">
                      <div className="info-item-label">
                        <Award size={13} style={{ display: 'inline', marginRight: '4px' }} />
                        Festival Honors & Awards
                      </div>
                      <ul className="award-list">
                        {movie.festivalAwards.map((award, i) => (
                          <li key={i} className="award-list-item">
                            <span>🏆</span>
                            <span>{award}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Bookmark Button */}
                  <button
                    type="button"
                    className="btn-secondary"
                    style={{ marginTop: '0.5rem', width: '100%', justifyContent: 'center' }}
                    onClick={() => onToggleBookmark(movie.id)}
                    id="btn-detail-toggle-bookmark"
                  >
                    <Heart size={16} fill={isBookmarked ? '#f59e0b' : 'none'} color={isBookmarked ? '#f59e0b' : 'currentColor'} />
                    <span>{isBookmarked ? 'Saved to Favorites' : 'Add to Favorites'}</span>
                  </button>
                </aside>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
