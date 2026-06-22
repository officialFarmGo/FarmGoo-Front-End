import React from 'react';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import '../CSS/BuiltForEveryOne.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectRole } from '../LIB/AuthenticationSlice';

const BuiltForEveryOne = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleJoin = (role) => {
    dispatch(selectRole(role));
    navigate('/signup');
  };

  return (
    <section className="audience-section">
      <div className="audience-header">
        <p className='badge green-badge'>Who it is Built for</p>
        <h3>
          Built for everyone <br />
          in the <span className="highlight-text">supply chain.</span>
        </h3>
      </div>

      <div className="audience-grid">

        <div className="audience-card">
          <div className="image-wrapper">
            <span className="card-badge">For Farmers</span>
            <img
              src="https://res.cloudinary.com/dnjexdaop/image/upload/v1780660363/photo_5_2026-06-05_12-51-52_a84flh.jpg"
              alt="Farmers working on the field"
              className="card-image"
            />
          </div>
          <div className="card-content">
            <h3>Built for farmers</h3>
            <ul className="feature-list">
              <li>
                <FiCheckCircle className="check-icon" size={18} />
                <span>Post harvests with pickup & destination</span>
              </li>
              <li>
                <FiCheckCircle className="check-icon" size={18} />
                <span>Get driver alerts before loading</span>
              </li>
            </ul>
            <a href="#farmers" className="card-link" onClick={(e) => { e.preventDefault(); handleJoin('farmer'); }}>
              <span>Join as a farmer</span>
              <FiArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="audience-card">
          <div className="image-wrapper">
            <span className="card-badge">For Drivers</span>
            <img
              src="https://res.cloudinary.com/dnjexdaop/image/upload/v1780660364/photo_3_2026-06-05_12-51-52_vw7qzq.jpg"
              alt="Truck driver hauling produce"
              className="card-image"
            />
          </div>
          <div className="card-content">
            <h3>Built for drivers</h3>
            <ul className="feature-list">
              <li>
                <FiCheckCircle className="check-icon" size={18} />
                <span>Get matched</span>
              </li>
              <li>
                <FiCheckCircle className="check-icon" size={18} />
                <span>Accept job</span>
              </li>
              <li>
                <FiCheckCircle className="check-icon" size={18} />
                <span>Deliver</span>
              </li>
              <li>
                <FiCheckCircle className="check-icon" size={18} />
                <span>Get paid</span>
              </li>
            </ul>
            <a href="#drivers" className="card-link" onClick={(e) => { e.preventDefault(); handleJoin('driver'); }}>
              <span>Join as a driver</span>
              <FiArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="audience-card">
          <div className="image-wrapper">
            <span className="card-badge">For Agent</span>
            <img
              src="https://res.cloudinary.com/dnjexdaop/image/upload/v1780660362/photo_2_2026-06-05_12-51-52_mxihfn.jpg"
              alt="Agents managing logistics on mobile devices"
              className="card-image"
            />
          </div>
          <div className="card-content">
            <h3>Built for agent</h3>
            <ul className="feature-list">
              <li>
                <FiCheckCircle className="check-icon" size={18} />
                <span>Onboard farmers without smartphones</span>
              </li>
              <li>
                <FiCheckCircle className="check-icon" size={18} />
                <span>Manage multiple active bookings</span>
              </li>
            </ul>
            <a href="#agents" className="card-link" onClick={(e) => { e.preventDefault(); handleJoin('agent'); }}>
              <span>Become an agent</span>
              <FiArrowRight size={16} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BuiltForEveryOne;