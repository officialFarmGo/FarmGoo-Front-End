import React from 'react';
import { FiMail, FiPhone, FiCompass, FiTwitter, FiLinkedin, FiFacebook } from 'react-icons/fi';
import '../CSS/ContactUs.css';
import { main } from 'framer-motion/client';

const ContactUs = () => {
  return (
    <main className='main-contactus'>
    <section className="contact-section">
      <div className="contact-header">
        <span className="badge contact-badge">Contact Us</span>
        <h1>Get In Touch</h1>
        <p className="contact-subtext">
          Questions, partnerships, or direct billboard — our team across Marakei Lights will always be ready to help
        </p>
      </div>

      <div className="contact-layout">
        <div className="contact-info-column">
          <div className="info-row-cards">
            <div className="info-mini-card">
              <div className="info-icon-wrapper">
                <FiMail size={20} color="var(--primary-green)" />
              </div>
              <div className="info-card-text">
                <span className="info-label">Email Address</span>
                <span className="info-value">support@farmgoo.ng</span>
              </div>
            </div>

            <div className="info-mini-card">
              <div className="info-icon-wrapper">
                <FiPhone size={20} color="var(--primary-green)" />
              </div>
              <div className="info-card-text">
                <span className="info-label">Email Address</span>
                <span className="info-value">+2346585787745</span>
              </div>
            </div>
          </div>

          <div className="headquarters-card">
            <h2>quarters</h2>
            <span className="sub-label">A HEAD OFFICE</span>
            <p className="address-text">
              ff Airport Drive<br />
              arawa • Kiribati<br />
              56, Bairiki
            </p>
            <p className="phone-text">650 000 0000</p>
            <p className="hours-text">-Fri, 09:00-17:00 GMT</p>
            
            <p className="mission-statement">
              growing community rallying towards using business as a force for good
            </p>

            <div className="social-links">
              <a href="#twitter" className="social-icon"><FiTwitter size={18} /></a>
              <a href="#linkedin" className="social-icon"><FiLinkedin size={18} /></a>
              <a href="#facebook" className="social-icon"><FiFacebook size={18} /></a>
            </div>
          </div>
        </div>

        <div className="contact-form-column">
          <form className="message-form" onSubmit={(e) => e.preventDefault()}>
            <h2>Send us a message</h2>
            
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                defaultValue="Tuarirabu Alee" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone number</label>
              <input 
                type="text" 
                id="phone" 
                defaultValue="+264 650 000 0000" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">How can we help?</label>
              <textarea 
                id="message" 
                placeholder="Your content needs to be atleast 100 words, this is where you leave and needs."
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">Send message</button>
          </form>
        </div>
      </div>
    </section>
    </main>
  );
};

export default ContactUs;