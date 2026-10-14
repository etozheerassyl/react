import React from 'react';
import { Film, Award, Star, Compass } from 'lucide-react';

/**
 * StatsBanner Component
 * 
 * Displays aggregate metrics about the cinema catalog and active query results.
 */
export default function StatsBanner({ totalInDb, totalMatching, avgRating, awardCount }) {
  return (
    <section className="hero-section" aria-label="Archive Highlights">
      <div className="hero-pill">
        <Compass size={14} />
        <span>A Century of Cinematic Mastery</span>
      </div>

      <h2 className="hero-title">World Cinema Heritage</h2>
      <p className="hero-subtitle">
        An archive of 100+ celebrated masterworks spanning European auteurism, Japanese golden age, 
        American New Hollywood, Korean modern renaissance, and major international festivals.
      </p>

      <div className="stats-grid" role="region" aria-label="Catalog Statistics">
        <div className="stat-card">
          <div className="stat-icon">
            <Film size={24} />
          </div>
          <div className="stat-value">{totalInDb}</div>
          <div className="stat-label">Total Masterpieces</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Compass size={24} />
          </div>
          <div className="stat-value">{totalMatching}</div>
          <div className="stat-label">Matching Query</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Star size={24} />
          </div>
          <div className="stat-value">{avgRating}</div>
          <div className="stat-label">Average Rating</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Award size={24} />
          </div>
          <div className="stat-value">{awardCount}</div>
          <div className="stat-label">Festival Laureates</div>
        </div>
      </div>
    </section>
  );
}
