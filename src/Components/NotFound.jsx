import React from "react";
import "../CSS/NotFound.css";
import { HiOutlineArrowLeft } from "react-icons/hi";

const NotFound = () => {
  return (
    <div className="farmgoo-404-container">
      {/* Top Navigation Row */}
      <header className="fg-404-header">
        <div className="fg-404-logo">
          <img src="https://res.cloudinary.com/dnjexdaop/image/upload/v1780660364/photo_7_2026-06-05_12-51-52_qck2fd.jpg" alt="FarmGoo" />
          <span>FarmGoo</span>
        </div>
        <button type="button" className="fg-404-ghost-btn">
          Go home
        </button>
      </header>

      {/* Main Content Center */}
      <main className="fg-404-content">
        <h1 className="fg-404-title">404</h1>

        <div className="fg-404-card">
          {/* Custom leaf/dots indicator icons placeholder */}
          <div className="fg-404-card-icons">
            <span className="fg-leaf-dot"></span>
            <span className="fg-leaf-dot"></span>
            <span className="fg-leaf-dot"></span>
          </div>

          <h2>Looks like this field is empty</h2>
          <p>
            The page you were looking for has wandered off — probably somewhere
            between the furrows. Let's get you back to the harvest.
          </p>

          <div className="fg-404-actions">
            <button type="button" className="fg-404-primary-btn">
              <HiOutlineArrowLeft /> Back to home
            </button>
            <button type="button" className="fg-404-outline-btn">
              Explore farmgoo
            </button>
          </div>
        </div>
      </main>

      {/* Footer Text */}
      <footer className="fg-404-footer">
        <p>© 2026 FarmGoo · Growing together</p>
      </footer>
    </div>
  );
};

export default NotFound;