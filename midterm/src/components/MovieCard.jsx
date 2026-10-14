import React, { useState } from 'react';
import { Star, Clock, Globe, Award, Heart, Info } from 'lucide-react';

/**
 * MovieCard Component
 * 
 * Reusable card representing an individual film entry in the archive.
 * Includes poster fallback handling, rating, metadata chips, awards banner,
 * and actions to inspect film details or save to favorites.
 */
export default function MovieCard({
  movie,
  onSelectMovie,
  isBookmarked,
  onToggleBookmark
}) {
  const [imageError, setImageError] = useState(false);

  // Format runtime in hours and minutes
  const formatRuntime = (mins) => {
    if (!mins) return 'N/A';
    const hours = Math.floor(mins / 60);
    const remainder = mins % 60;
    return hours > 0 ? `${hours}h ${remainder}m` : `${remainder}m`;
  };

  const fallbackPoster = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80';

  return (
    <article className="movie-card" id={`movie-card-${movie.id}`}>
      {/* Poster Image Container */}
      <div className="card-poster-wrapper">
        <img
          src={imageError ? fallbackPoster : (movie.posterUrl || fallbackPoster)}
          alt={`${movie.title} poster`}
          className="card-poster-img"
          loading="lazy"
          onError={() => setImageError(true)}
        />
        <div className="poster-overlay" aria-hidden="true" />

        {/* Rating Floating Badge */}
        <div className="card-rating-badge" title={`IMDb/Letterboxd Rating: ${movie.rating}/10`}>
          <Star size={13} fill="#f59e0b" color="#f59e0b" />
          <span>{Number(movie.rating).toFixed(1)}</span>
        </div>

        {/* Decade Floating Badge */}
        <div className="card-decade-badge">
          {movie.decade}
        </div>
      </div>

      {/* Card Information Body */}
      <div className="card-content">
        <div className="card-meta-row">
          <span>{movie.year}</span>
          <span className="card-meta-dot" />
          <span className="flex-center gap-1">
            <Clock size={12} />
            {formatRuntime(movie.runtime)}
          </span>
          <span className="card-meta-dot" />
          <span className="flex-center gap-1">
            <Globe size={12} />
            {movie.country}
          </span>
        </div>

        <h3 className="card-title" title={movie.title}>
          {movie.title}
        </h3>

        <p className="card-director">
          Dir. <strong>{movie.director}</strong>
        </p>

        {/* Genre Tags */}
        <div className="genre-tags-list">
          {Array.isArray(movie.genres) && movie.genres.slice(0, 3).map((genre) => (
            <span key={genre} className="genre-tag">
              {genre}
            </span>
          ))}
        </div>

        {/* Synopsis Snippet */}
        <p className="card-synopsis">
          {movie.synopsis}
        </p>

        {/* Award Highlight if present */}
        {Array.isArray(movie.festivalAwards) && movie.festivalAwards.length > 0 && (
          <div className="card-award-banner">
            <Award size={14} color="#f59e0b" />
            <span>{movie.festivalAwards[0]}</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="card-footer">
          <button
            type="button"
            className="card-inspect-btn"
            onClick={() => onSelectMovie(movie.id)}
            id={`btn-inspect-${movie.id}`}
          >
            <Info size={14} />
            <span>Examine Film</span>
          </button>

          <button
            type="button"
            className={`btn-bookmark ${isBookmarked ? 'bookmarked' : ''}`}
            onClick={() => onToggleBookmark(movie.id)}
            title={isBookmarked ? 'Remove from saved' : 'Save to favorites'}
            aria-label={isBookmarked ? 'Remove from saved' : 'Save to favorites'}
            id={`btn-fav-${movie.id}`}
          >
            <Heart size={18} fill={isBookmarked ? '#f59e0b' : 'none'} />
          </button>
        </div>
      </div>
    </article>
  );
}
