import React from 'react';
import '../CSS/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="container">
      <header className="hero-section">
        <span className="badge green-badge">ABOUT US</span>
        <p className='about-ushero'>Transforming Nigeria's farm-to-market<br />supply chain</p>
        <p className="hero-subtext">
          We're building the infrastructure that connects Nigerian farmers directly to trusted truck 
          drivers, eliminating waste, reducing post-harvest losses, and creating prosperity across the 
          agricultural value chain.
        </p>
      </header>

      <section className="story-stats-grid">
        <div className="story-text">
          <span className="badge gray-badge">OUR STORY</span>
          <h2>Born from a real problem</h2>
          <p>In 2024, we watched Nigerian farmers lose nearly 40% of their harvest to transportation delays. Tomatoes rotted waiting for trucks. Cassava sat in fields for days. Farmers earned less while consumers paid more.</p>
          <p>The problem wasn't lack of trucks or lack of produce. It was the absence of a reliable, transparent system to connect them. Informal networks exploited both sides. Information was scarce. Trust was broken.</p>
          <p><strong>FarmGoo</strong> was founded to solve this. We built a platform that brings transparency, accountability, and efficiency to Nigeria's first-mile logistics — ensuring that every harvest reaches the market fresh, fast, and fairly priced.</p>
        </div>

        <div className="stats-card">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">40%</div>
              <div className="stat-label">Post-harvest loss before FarmGoo</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1,400+</div>
              <div className="stat-label">Deliveries completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">250+</div>
              <div className="stat-label">Registered farmers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">120+</div>
              <div className="stat-label">Verified drivers</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mv-grid">
        <div className="info-card">
          <div className="icon-circle green-bg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-green)" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <h3>Our Mission</h3>
          <p>To eliminate post-harvest losses in Nigeria by building transparent, efficient, and inclusive logistics infrastructure that empowers farmers, drivers, and agents to thrive together.</p>
        </div>

        <div className="info-card">
          <div className="icon-circle orange-bg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-yellow)" strokeWidth="2.5">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <h3>Our Vision</h3>
          <p>A Nigeria where every farmer has instant access to reliable transport, every harvest reaches the market fresh, and agricultural productivity drives nationwide economic growth and food security.</p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;