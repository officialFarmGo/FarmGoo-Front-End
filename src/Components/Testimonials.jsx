import React from 'react';
import { FaStar } from 'react-icons/fa';
import '../CSS/Testimonials.css';

const Testimonials = () => {
  return (
    <section className="testimonials-wrapper">
      <div className="testimonials-container">
        
        <div className="testimonials-header">
          <span className="badge green-badge">WHAT PEOPLE SAY</span>
          <h1>
            From the farmers <br />
            and drivers <span className="green-accent">themselves.</span>
          </h1>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars-row">
              <FaStar size={14} className="star-icon" />
              <FaStar size={14} className="star-icon" />
              <FaStar size={14} className="star-icon" />
              <FaStar size={14} className="star-icon" />
              <FaStar size={14} className="star-icon" />
            </div>
            <p className="quote-text">
              "Before FarmGoo, I waited 3 days for a truck. My tomatoes were already losing 
              value by the time I loaded them. Now I get a driver the same morning."
            </p>
            <div className="user-profile">
              <div className="avatar green-avatar">AM</div>
              <div className="profile-details">
                <span className="profile-name">Abubakar Musa</span>
                <span className="profile-role">Tomato farmer · Badagry, Lagos</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars-row">
              <FaStar size={14} className="star-icon" />
              <FaStar size={14} className="star-icon" />
              <FaStar size={14} className="star-icon" />
              <FaStar size={14} className="star-icon" />
              <FaStar size={14} className="star-icon" />
            </div>
            <p className="quote-text">
              "I used to drive back from Lagos markets empty. Now I pick up a cassava load for 
              the return trip every time. My monthly income has almost doubled."
            </p>
            <div className="user-profile">
              <div className="avatar light-green-avatar">EO</div>
              <div className="profile-details">
                <span className="profile-name">Emeka Obi</span>
                <span className="profile-role">Driver · Lagos-Ogun route</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars-row">
              <FaStar size={14} className="star-icon" />
              <FaStar size={14} className="star-icon" />
              <FaStar size={14} className="star-icon" />
              <FaStar size={14} className="star-icon" />
              <FaStar size={14} className="star-icon" />
            </div>
            <p className="quote-text">
              "I manage 7 farmers who don't own smartphones. FarmGoo lets me book for 
              all of them and I earn a fair commission. A system that finally respects the agent's role."
            </p>
            <div className="user-profile">
              <div className="avatar normal-green-avatar">NA</div>
              <div className="profile-details">
                <span className="profile-name">Ngozi Adamu</span>
                <span className="profile-role">Agent · Lagos State</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;