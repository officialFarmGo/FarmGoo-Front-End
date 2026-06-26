import React from "react";
import "../CSS/NotFound.css";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NotFound = () => {
  const nav = useNavigate();
  const role = useSelector((state) => state.auth.role);

  const DASHBOARD_ROUTES = {
    farmer: "/farmer/dashboard",
    agent: "/agent/dashboard",
    driver: "/drivers/dashboard",
  };

  const handleGoHome = () => {
    nav(-1);
  };

  const homeLabel = "Go Back";

  return (
    <div className="farmgoo-404-container">
      <header className="fg-404-header">
        <div className="fg-404-logo">
          <img src="https://res.cloudinary.com/dnjexdaop/image/upload/v1780660364/photo_7_2026-06-05_12-51-52_qck2fd.jpg" alt="FarmGoo" />
          <span>FarmGoo</span>
        </div>
        <button type="button" className="fg-404-ghost-btn" onClick={handleGoHome}>
          {homeLabel}
        </button>
      </header>

      <main className="fg-404-content">
        <h1 className="fg-404-title">404</h1>

        <div className="fg-404-card">
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
            <button type="button" className="fg-404-primary-btn" onClick={handleGoHome}>
              <HiOutlineArrowLeft /> {homeLabel}
            </button>
            <button type="button" className="fg-404-outline-btn" onClick={() => nav("/")}>
              Explore FarmGoo
            </button>
          </div>
        </div>
      </main>

      <footer className="fg-404-footer">
        <p>© 2026 FarmGoo · Growing together</p>
      </footer>
    </div>
  );
};

export default NotFound;