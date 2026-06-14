import React from "react";
import { MdLocationOn, MdCheckCircle, MdAccessTime } from "react-icons/md";
import "../CSS/DeliveryDetails.css";

const DeliveryDetails = () => {
  const timelineEvents = [
    {
      id: 1,
      title: "Request Created",
      time: "10:00 AM",
      completed: true,
    },
    {
      id: 2,
      title: "Driver Accepted",
      time: "10:15 AM",
      completed: true,
    },
    {
      id: 3,
      title: "Loading Produce",
      time: "11:00 AM",
      completed: true,
    },
    {
      id: 4,
      title: "In Transit",
      time: "11:30 AM",
      completed: true,
    },
    {
      id: 5,
      title: "Delivered",
      time: "Est. 1:00 PM",
      completed: false,
    },
  ];

  return (
    <div className="delivery-details-container">
      <div className="details-card-2">
        <h2 className="section-title">Delivery Details</h2>

        <div className="meta-group">
          <span className="meta-label">Produce</span>
          <p className="meta-value highlight-text">Tomatoes - 500kg</p>
        </div>

        <div className="meta-group">
          <span className="meta-label">Pickup Location</span>
          <div className="location-row">
            <MdLocationOn className="location-icon" />
            <p className="meta-value">Ikorodu Farm</p>
          </div>
        </div>

        <div className="meta-group">
          <span className="meta-label">Destination</span>
          <div className="location-row">
            <MdLocationOn className="location-icon" />
            <p className="meta-value">Mile 12 Market</p>
          </div>
        </div>

        <div className="meta-group">
          <span className="meta-label">Agreed fee</span>
          <p className="meta-value highlight-text">₦28,500</p>
        </div>

        <div className="meta-group">
          <span className="meta-label">Escrow status</span>
          <div className="status-badge">Held</div>
        </div>
      </div>

      <div className="details-card-2">
        <h2 className="section-title">Delivery Timeline</h2>
        <div className="timeline-list">
          {timelineEvents.map((event, index) => (
            <div key={event.id} className="timeline-item">
              <div className="timeline-left">
                {event.completed ? (
                  <MdCheckCircle className="icon-success" />
                ) : (
                  <MdAccessTime className="icon-pending" />
                )}
                {index !== timelineEvents.length - 1 && (
                  <div
                    className={`timeline-line ${event.completed && timelineEvents[index + 1].completed ? "line-active" : ""}`}
                  ></div>
                )}
              </div>
              <div className="timeline-content">
                <h4
                  className={`event-title ${!event.completed ? "text-pending" : ""}`}
                >
                  {event.title}
                </h4>
                <p className="event-time">{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetails;
