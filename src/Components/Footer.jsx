import React from "react";
import "../CSS/Footer.css";

const Footer = () => {
  return (
    <footer className="farmgoo-footer">
      <div className="footer-top-section">
        <div className="footer-column brand-info-col">
          <div className="footer-logo-row">
            <span className="footer-logo-text">FarmGoo</span>
          </div>
          <p className="footer-description">
            Nigeria's first-mile farm-to-market logistics platform — built for
            farmers, drivers, and the agents who connect them.
          </p>
        </div>

        <div className="footer-column">
          <h4>Platform</h4>
          <a href="#farmers">For farmers</a>
          <a href="#drivers">For drivers</a>
          <a href="#agents">For agents</a>
          <a href="#admin">Admin access</a>
        </div>

        <div className="footer-column">
          <h4>Company</h4>
          <a href="#about">About us</a>
          <a href="#blog">Blog</a>
          <a href="#careers">Careers</a>
          <a href="#press">Press</a>
        </div>

        <div className="footer-column">
          <h4>Support</h4>
          <a href="#help">Help centre</a>
          <a href="#contact">Contact us</a>
          <a href="#privacy">Privacy policy</a>
          <a href="#terms">Terms of service</a>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom-section">
        <p className="copyright-text">
          © 2026 FarmGoo Technologies Ltd. All rights reserved.
        </p>
        <div className="footer-social-links">
          <a href="#twitter" target="_blank" rel="noreferrer">
            Twitter
          </a>
          <a href="#linkedin" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="#whatsapp" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
