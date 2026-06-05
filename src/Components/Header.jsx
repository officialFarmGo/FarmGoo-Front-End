import React, { useState } from "react";
import "../CSS/Header.css";
import TruckImg from "../assets/farmgooLogo.png";
import { useNavigate } from 'react-router-dom';

const Header = ({ onScrollToSection, refs }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavLinkClick = (e, targetRef) => {
    e.preventDefault();
    setIsMenuOpen(false);
    onScrollToSection(targetRef);
  };

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        
        <div className="logo-section" style={{ cursor: 'pointer' }} onClick={(e) => handleNavLinkClick(e, refs.homeRef)}>
          <div className="logo-holder">
            <img className="brand-logo" src={TruckImg} alt="FarmGoo Logo" />
          </div>
          <div className="farmgoo-holder">
            <span className="brand-name">FarmGoo</span>
          </div>
        </div>

        <button 
          className={`hamburger-toggle ${isMenuOpen ? "open" : ""}`} 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className={`text-container ${isMenuOpen ? "active" : ""}`}>
          <a href="#home" onClick={(e) => handleNavLinkClick(e, refs.homeRef)}>Home</a>
          <a href="#about" onClick={(e) => handleNavLinkClick(e, refs.aboutRef)}>About us</a>
          <a href="#how-it-works" onClick={(e) => handleNavLinkClick(e, refs.howItWorksRef)}>How it works</a>
          <a href="#features" onClick={(e) => handleNavLinkClick(e, refs.featuresRef)}>Features</a>
          <a href="#contact" onClick={(e) => handleNavLinkClick(e, refs.contactRef)}>Contact us</a>
          
          <div className="mobile-auth-buttons">
            <a href="#login" className="login-link" onClick={() => { setIsMenuOpen(false); navigate('/login'); }}>Log in</a>
            <button className="btn-get-started" onClick={() => { setIsMenuOpen(false); navigate('/chooseDash'); }}>Get started</button>
          </div>
        </nav>

        <div className="login-getStarted">
          <a href="#login" className="login-link" onClick={() => navigate('/login')}>Log in</a>
          <button className="btn-get-started" onClick={() => navigate('/chooseDash')}>Get started</button>
        </div>

      </div>
    </header>
  );
};

export default Header;