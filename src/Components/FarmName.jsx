import React from "react";
import { MdPhone, MdLocationOn, MdPeople } from "react-icons/md";
import { GiTomato } from "react-icons/gi";
import "../CSS/FarmName.css";
import { Link, Links, useNavigate } from "react-router-dom";

const FarmName = () => {
  const nav = useNavigate();
  const farms = [
    {
      id: 1,
      initial: "C",
      name: "Chukwu Farms",
      phone: "+234 803 123 4567",
      location: "Ikorodu Farm, Lagos f",
      produce: "Tomatoes, Pepper",
      deliveries: "8 deliveries",
      joined: "Joined Jan 2025",
    },
    {
      id: 2,
      initial: "E",
      name: "Eze Oil Ltd",
      phone: "+234 805 234 5678",
      location: "Ogun State",
      produce: "Palm Oil",
      deliveries: "5 deliveries",
      joined: "Joined Feb 2025",
    },
    {
      id: 3,
      initial: "P",
      name: "Ojo Harvest",
      phone: "+234 807 345 6789",
      location: "Lagos State",
      produce: "Yam Tubers",
      deliveries: "12 deliveries",
      joined: "Joined Dec 2024",
    },
    {
      id: 4,
      initial: "O",
      name: "Ogun Agro",
      phone: "+234 809 456 7890",
      location: "Abeokuta, Ogun State",
      produce: "Cassava",
      deliveries: "6 deliveries",
      joined: "Joined Mar 2025",
    },
  ];

  return (
    <div className="farms-list-container">
      {farms.map((farm) => (
        <div key={farm.id} className="farm-card">
          <div className="card-left-section">
            <div className="avatar-circle">{farm.initial}</div>

            <div className="farm-details">
              <h3 className="farm-title">{farm.name}</h3>

              <div className="details-grid">
                <div className="detail-item">
                  <MdPhone className="react-icon" />
                  <span className="text">{farm.phone}</span>
                </div>
                <div className="detail-item">
                  <MdLocationOn className="react-icon" />
                  <span className="text">{farm.location}</span>
                </div>
                <div className="detail-item">
                  <GiTomato className="react-icon" />
                  <span className="text">{farm.produce}</span>
                </div>
                <div className="detail-item">
                  <MdPeople className="react-icon" />
                  <span className="text">{farm.deliveries}</span>
                </div>
              </div>

              <p className="joined-date">{farm.joined}</p>
            </div>
          </div>

          <div className="card-right-section">
            <Link
              style={{ textDecoration: "none" }}
              to="/agent/dashboard/TransportRequest"
            >
              <button
                className="request-btn"
                className="add-farmer-btn"
                style={{ background: "blue" }}
                onClick={() => {}}
              >
                Create Request
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FarmName;
