import React from 'react'
import '../CSS/DetailspageAgent.css'

const DetailspageAgent = () => {
  const cardsData = [
    {
      id: 1,
      type: 'driver',
      title: 'Driver Details',
      initial: 'M',
      name: 'Musa Ibrahim',
      subText: 'Large Truck',
      phone: '+234 801 234 5678'
    },
    {
      id: 2,
      type: 'customer',
      title: "Customer's Details",
      initial: 'T',
      name: 'Tolu',
      phone: '+234 801 255 5118'
    },
    {
      id: 3,
      type: 'pin',
      title: 'Your delivery PIN',
      pinDigits: ['4', '2', '5', '4']
    }
  ]

  return (
    <div className="details-container">
      {cardsData.map((card) => (
        <div key={card.id} className="details-card">
          <h2 className="card-title">{card.title}</h2>
          
          {card.type !== 'pin' ? (
            <div className="info-section">
              <div className="avatar">{card.initial}</div>
              <div className="info-text">
                <span className="profile-name">{card.name}</span>
                {card.subText && <span className="sub-text">{card.subText}</span>}
                <span className="phone-text">{card.phone}</span>
              </div>
            </div>
          ) : (
            <div className="pin-section">
              <p className="pin-instruction">
                Share this PIN with the Customer only once goods arrive safely. Entering it confirms delivery and releases escrow.
              </p>
              <div className="pin-display">
                {card.pinDigits.map((digit, index) => (
                  <div key={index} className="pin-box">{digit}</div>
                ))}
              </div>
              <hr className="divider" />
              <p className="manual-text">Manually confirm delivery if the driver has arrived:</p>
              <button className="confirm-btn">Confirm delivery</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default DetailspageAgent;