import React, { useState, useEffect } from 'react';
import { X, PlusCircle, AlertCircle, CheckCircle, Film } from 'lucide-react';
import { movieApi } from '../api/movieApi.js';

const AVAILABLE_GENRES = [
  'Drama',
  'Crime',
  'Sci-Fi',
  'Mystery',
  'Thriller',
  'Comedy',
  'Romance',
  'War',
  'Animation',
  'Adventure',
  'History',
  'Documentary',
  'Biography',
];

const INITIAL_FORM_STATE = {
  title: '',
  originalTitle: '',
  director: '',
  year: new Date().getFullYear(),
  country: 'United States',
  genre: 'Drama',
  runtime: 120,
  rating: 8.2,
  festivalAwards: '',
  language: 'English',
  posterUrl: '',
  synopsis: '',
  curatorNotes: '',
};

/**
 * AddMovieModal Component
 * 
 * Controlled form component for archiving a new film entry into the CineVault.
 * Employs internal controlled state, client-side validation with field errors,
 * asynchronous submission via simulated API, loading indicator, and feedback.
 */
export default function AddMovieModal({ isOpen, onClose, onMovieAdded }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Controlled change handler for inputs
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value,
    }));

    // Clear field-level error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title || !formData.title.trim()) {
      newErrors.title = 'Film title is required.';
    }

    if (!formData.director || !formData.director.trim()) {
      newErrors.director = 'Director name is required.';
    }

    const yearNum = Number(formData.year);
    if (!yearNum || yearNum < 1895 || yearNum > 2030) {
      newErrors.year = 'Release year must be between 1895 and 2030.';
    }

    const runtimeNum = Number(formData.runtime);
    if (!runtimeNum || runtimeNum <= 0) {
      newErrors.runtime = 'Runtime must be greater than 0 minutes.';
    }

    const ratingNum = Number(formData.rating);
    if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 10) {
      newErrors.rating = 'Rating must be between 0.0 and 10.0.';
    }

    if (!formData.synopsis || formData.synopsis.trim().length < 15) {
      newErrors.synopsis = 'Please provide an archival synopsis of at least 15 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Split awards by comma
      const awardsArray = formData.festivalAwards
        ? formData.festivalAwards.split(',').map((s) => s.trim()).filter(Boolean)
        : [];

      const payload = {
        title: formData.title,
        originalTitle: formData.originalTitle || formData.title,
        director: formData.director,
        year: Number(formData.year),
        country: formData.country,
        genres: [formData.genre],
        runtime: Number(formData.runtime),
        rating: Number(formData.rating),
        festivalAwards: awardsArray,
        language: formData.language,
        posterUrl: formData.posterUrl || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80',
        synopsis: formData.synopsis,
        curatorNotes: formData.curatorNotes || 'Added by archive member.',
      };

      const createdMovie = await movieApi.createMovie(payload);
      
      // Reset form
      setFormData(INITIAL_FORM_STATE);
      setErrors({});
      onMovieAdded(createdMovie);
      onClose();
    } catch (err) {
      setServerError(err.message || 'Failed to submit movie to database.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-movie-modal-title"
    >
      <div className="modal-container" style={{ maxWidth: '720px' }}>
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Close dialog"
          id="btn-close-add-modal"
        >
          <X size={18} />
        </button>

        <div className="modal-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div className="brand-icon-box" style={{ width: '38px', height: '38px' }}>
              <Film size={20} />
            </div>
            <div>
              <h2 id="add-movie-modal-title" className="modal-title" style={{ fontSize: '1.5rem' }}>
                Archival Film Submission
              </h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Add a new verified cinema masterpiece to the permanent CineVault archive.
              </p>
            </div>
          </div>

          {/* Server Error Alert */}
          {serverError && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1rem',
              background: 'rgba(244, 63, 94, 0.1)',
              border: '1px solid rgba(244, 63, 94, 0.4)',
              borderRadius: 'var(--radius-md)',
              color: '#fda4af',
              fontSize: '0.85rem',
              marginBottom: '1.5rem',
            }}>
              <AlertCircle size={16} />
              <span>{serverError}</span>
            </div>
          )}

          {/* Controlled Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              {/* Title */}
              <div className="form-group">
                <label className="form-label" htmlFor="input-title">
                  Film Title <span className="required">*</span>
                </label>
                <input
                  id="input-title"
                  name="title"
                  type="text"
                  className={`form-input ${errors.title ? 'has-error' : ''}`}
                  placeholder="e.g. In the Mood for Love"
                  value={formData.title}
                  onChange={handleChange}
                />
                {errors.title && <span className="field-error-msg">{errors.title}</span>}
              </div>

              {/* Original Title */}
              <div className="form-group">
                <label className="form-label" htmlFor="input-original-title">
                  Original Script Title
                </label>
                <input
                  id="input-original-title"
                  name="originalTitle"
                  type="text"
                  className="form-input"
                  placeholder="e.g. 花樣年華"
                  value={formData.originalTitle}
                  onChange={handleChange}
                />
              </div>

              {/* Director */}
              <div className="form-group">
                <label className="form-label" htmlFor="input-director">
                  Director <span className="required">*</span>
                </label>
                <input
                  id="input-director"
                  name="director"
                  type="text"
                  className={`form-input ${errors.director ? 'has-error' : ''}`}
                  placeholder="e.g. Wong Kar-wai"
                  value={formData.director}
                  onChange={handleChange}
                />
                {errors.director && <span className="field-error-msg">{errors.director}</span>}
              </div>

              {/* Release Year */}
              <div className="form-group">
                <label className="form-label" htmlFor="input-year">
                  Release Year <span className="required">*</span>
                </label>
                <input
                  id="input-year"
                  name="year"
                  type="number"
                  min="1895"
                  max="2030"
                  className={`form-input ${errors.year ? 'has-error' : ''}`}
                  value={formData.year}
                  onChange={handleChange}
                />
                {errors.year && <span className="field-error-msg">{errors.year}</span>}
              </div>

              {/* Country */}
              <div className="form-group">
                <label className="form-label" htmlFor="input-country">
                  Country of Origin
                </label>
                <input
                  id="input-country"
                  name="country"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Hong Kong, France, Japan"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>

              {/* Primary Genre */}
              <div className="form-group">
                <label className="form-label" htmlFor="input-genre">
                  Primary Genre
                </label>
                <select
                  id="input-genre"
                  name="genre"
                  className="custom-select"
                  value={formData.genre}
                  onChange={handleChange}
                >
                  {AVAILABLE_GENRES.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              {/* Runtime (mins) */}
              <div className="form-group">
                <label className="form-label" htmlFor="input-runtime">
                  Runtime (minutes) <span className="required">*</span>
                </label>
                <input
                  id="input-runtime"
                  name="runtime"
                  type="number"
                  min="1"
                  className={`form-input ${errors.runtime ? 'has-error' : ''}`}
                  value={formData.runtime}
                  onChange={handleChange}
                />
                {errors.runtime && <span className="field-error-msg">{errors.runtime}</span>}
              </div>

              {/* Rating (0-10) */}
              <div className="form-group">
                <label className="form-label" htmlFor="input-rating">
                  Rating (0.0 to 10.0) <span className="required">*</span>
                </label>
                <input
                  id="input-rating"
                  name="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  className={`form-input ${errors.rating ? 'has-error' : ''}`}
                  value={formData.rating}
                  onChange={handleChange}
                />
                {errors.rating && <span className="field-error-msg">{errors.rating}</span>}
              </div>

              {/* Festival Awards */}
              <div className="form-group form-field-full">
                <label className="form-label" htmlFor="input-awards">
                  Major Festival Laurels & Awards (comma-separated)
                </label>
                <input
                  id="input-awards"
                  name="festivalAwards"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Palme d'Or (Cannes), Golden Lion (Venice), Academy Award"
                  value={formData.festivalAwards}
                  onChange={handleChange}
                />
              </div>

              {/* Poster URL */}
              <div className="form-group form-field-full">
                <label className="form-label" htmlFor="input-poster">
                  Poster Image URL (optional)
                </label>
                <input
                  id="input-poster"
                  name="posterUrl"
                  type="url"
                  className="form-input"
                  placeholder="https://example.com/poster.jpg (leaves default cinema image if empty)"
                  value={formData.posterUrl}
                  onChange={handleChange}
                />
              </div>

              {/* Synopsis */}
              <div className="form-group form-field-full">
                <label className="form-label" htmlFor="input-synopsis">
                  Archival Synopsis <span className="required">*</span>
                </label>
                <textarea
                  id="input-synopsis"
                  name="synopsis"
                  className={`form-textarea ${errors.synopsis ? 'has-error' : ''}`}
                  placeholder="Provide an overview of the film's premise and dramatic conflict..."
                  value={formData.synopsis}
                  onChange={handleChange}
                />
                {errors.synopsis && <span className="field-error-msg">{errors.synopsis}</span>}
              </div>

              {/* Curator Notes */}
              <div className="form-group form-field-full">
                <label className="form-label" htmlFor="input-curator">
                  Curator's Assessment & Critical Notes
                </label>
                <textarea
                  id="input-curator"
                  name="curatorNotes"
                  className="form-textarea"
                  style={{ minHeight: '70px' }}
                  placeholder="Aesthetic observations, stylistic techniques, or historical importance..."
                  value={formData.curatorNotes}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={onClose}
                disabled={isSubmitting}
                id="btn-cancel-add-movie"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
                id="btn-submit-new-movie"
              >
                <PlusCircle size={16} />
                <span>{isSubmitting ? 'Archiving Film...' : 'Confirm Submission'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
