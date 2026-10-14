/**
 * Simulated Asynchronous Movie API
 *
 * Implements realistic asynchronous network behavior:
 * - Uses native Promises and artificial delay (350-500ms)
 * - Persistent storage backed by localStorage with fallback to INITIAL_MOVIES
 * - Handles filtering, searching, sorting, pagination server-style
 * - Supports simulated error states for demonstration & defense requirements
 */

import { INITIAL_MOVIES } from '../data/initialMovies.js';

const STORAGE_KEY = 'cinevault_movies_v1';
const ERROR_SIMULATION_KEY = 'cinevault_simulate_error';
const DEFAULT_DELAY = 400;

// Helper to get all movies from localStorage or initialize with seed data
function getStoredMovies() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOVIES));
      return [...INITIAL_MOVIES];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOVIES));
      return [...INITIAL_MOVIES];
    }
    return parsed;
  } catch (error) {
    console.error('Failed to read from localStorage:', error);
    return [...INITIAL_MOVIES];
  }
}

// Helper to persist movies
function saveStoredMovies(movies) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

// Artificial delay simulator
const delay = (ms = DEFAULT_DELAY) => new Promise((resolve) => setTimeout(resolve, ms));

export const movieApi = {
  /**
   * Check or toggle simulated error state (used for defense demos)
   */
  isSimulatedErrorActive() {
    return localStorage.getItem(ERROR_SIMULATION_KEY) === 'true';
  },

  setSimulatedError(active) {
    localStorage.setItem(ERROR_SIMULATION_KEY, active ? 'true' : 'false');
  },

  /**
   * Fetch movies with search, filter, sort, and pagination
   */
  async getMovies(params = {}) {
    await delay();

    if (this.isSimulatedErrorActive()) {
      throw new Error('500 Internal Server Error: Failed to fetch film archive records from simulated server.');
    }

    const {
      search = '',
      genre = 'All',
      decade = 'All',
      minRating = 0,
      awardOnly = false,
      sortBy = 'rating-desc',
      page = 1,
      limit = 9,
    } = params;

    let movies = getStoredMovies();

    // 1. Search filter across title, director, country, synopsis, cast
    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      movies = movies.filter((m) =>
        m.title.toLowerCase().includes(q) ||
        (m.originalTitle && m.originalTitle.toLowerCase().includes(q)) ||
        m.director.toLowerCase().includes(q) ||
        m.country.toLowerCase().includes(q) ||
        m.synopsis.toLowerCase().includes(q) ||
        (Array.isArray(m.cast) && m.cast.some((actor) => actor.toLowerCase().includes(q)))
      );
    }

    // 2. Genre filter
    if (genre && genre !== 'All') {
      movies = movies.filter((m) =>
        Array.isArray(m.genres) && m.genres.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
    }

    // 3. Decade filter
    if (decade && decade !== 'All') {
      movies = movies.filter((m) => m.decade === decade);
    }

    // 4. Rating filter
    const minRatingNum = Number(minRating);
    if (!isNaN(minRatingNum) && minRatingNum > 0) {
      movies = movies.filter((m) => Number(m.rating) >= minRatingNum);
    }

    // 5. Award winners only filter
    if (awardOnly) {
      movies = movies.filter((m) => Array.isArray(m.festivalAwards) && m.festivalAwards.length > 0);
    }

    // 6. Sorting
    movies.sort((a, b) => {
      switch (sortBy) {
        case 'rating-desc':
          return (Number(b.rating) || 0) - (Number(a.rating) || 0);
        case 'rating-asc':
          return (Number(a.rating) || 0) - (Number(b.rating) || 0);
        case 'year-desc':
          return (Number(b.year) || 0) - (Number(a.year) || 0);
        case 'year-asc':
          return (Number(a.year) || 0) - (Number(b.year) || 0);
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'runtime-desc':
          return (Number(b.runtime) || 0) - (Number(a.runtime) || 0);
        case 'runtime-asc':
          return (Number(a.runtime) || 0) - (Number(b.runtime) || 0);
        default:
          return 0;
      }
    });

    const totalMatching = movies.length;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 9);
    const totalPages = Math.ceil(totalMatching / limitNum) || 1;

    // Pagination slice
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedItems = movies.slice(startIndex, startIndex + limitNum);

    // Compute catalog statistics
    const allStored = getStoredMovies();
    const avgRating = (
      allStored.reduce((acc, m) => acc + (Number(m.rating) || 0), 0) / (allStored.length || 1)
    ).toFixed(1);

    const awardWinningCount = allStored.filter(
      (m) => Array.isArray(m.festivalAwards) && m.festivalAwards.length > 0
    ).length;

    return {
      data: paginatedItems,
      total: totalMatching,
      page: pageNum,
      limit: limitNum,
      totalPages,
      stats: {
        totalInDb: allStored.length,
        avgRating,
        awardWinningCount,
      },
    };
  },

  /**
   * Fetch single movie detail by ID
   */
  async getMovieById(id) {
    await delay(300);

    if (this.isSimulatedErrorActive()) {
      throw new Error('500 Server Error: Unable to retrieve film record.');
    }

    const movies = getStoredMovies();
    const found = movies.find((m) => String(m.id) === String(id));
    if (!found) {
      throw new Error(`Film with ID "${id}" was not found in the archive.`);
    }
    return found;
  },

  /**
   * Add a new movie record
   */
  async createMovie(movieData) {
    await delay(500);

    if (this.isSimulatedErrorActive()) {
      throw new Error('500 Server Error: Unable to persist new film entry.');
    }

    // Validation
    if (!movieData.title || !movieData.title.trim()) {
      throw new Error('Title is required.');
    }
    if (!movieData.director || !movieData.director.trim()) {
      throw new Error('Director is required.');
    }
    const year = Number(movieData.year);
    if (isNaN(year) || year < 1895 || year > 2030) {
      throw new Error('Please enter a valid release year between 1895 and 2030.');
    }

    const movies = getStoredMovies();
    const newId = `cine-${Date.now()}`;
    const decade = `${Math.floor(year / 10) * 10}s`;

    const newMovie = {
      id: newId,
      title: movieData.title.trim(),
      originalTitle: movieData.originalTitle?.trim() || movieData.title.trim(),
      director: movieData.director.trim(),
      year,
      decade,
      country: movieData.country?.trim() || 'International',
      genres: Array.isArray(movieData.genres) && movieData.genres.length > 0
        ? movieData.genres
        : ['Drama'],
      runtime: Number(movieData.runtime) || 100,
      rating: Number(movieData.rating) || 8.0,
      festivalAwards: Array.isArray(movieData.festivalAwards)
        ? movieData.festivalAwards.filter(Boolean)
        : movieData.festivalAwards ? [movieData.festivalAwards] : [],
      synopsis: movieData.synopsis?.trim() || 'No synopsis provided.',
      cast: Array.isArray(movieData.cast) && movieData.cast.length > 0
        ? movieData.cast
        : ['Ensemble Cast'],
      language: movieData.language?.trim() || 'English',
      posterUrl: movieData.posterUrl?.trim() || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80',
      curatorNotes: movieData.curatorNotes?.trim() || 'Recently submitted to the archive catalog.',
      featured: false,
      addedAt: new Date().toISOString(),
    };

    const updated = [newMovie, ...movies];
    saveStoredMovies(updated);
    return newMovie;
  },

  /**
   * Reset database back to original 105 curated masterpieces
   */
  async resetDatabase() {
    await delay(300);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOVIES));
    localStorage.removeItem(ERROR_SIMULATION_KEY);
    return [...INITIAL_MOVIES];
  },
};

export default movieApi;
