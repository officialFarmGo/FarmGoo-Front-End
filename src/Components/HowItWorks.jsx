import React from 'react'
import '../CSS/HowItWorks.css'


const HowItWorks = () => {
  return (
    <div className="how-it-works">
      <div className="how-it-works-left">
        <span className="how-it-works-badge">How It Works</span>

        <h1>
          Post a load. Get a driver.<br/>
          <span className="yellow-line">Deliver with confidence.</span>
        </h1>

        <p>
          Three simple steps from farm to market — whether you're digital or working through a local agent.
        </p>

        <div className="steps-list">
          <div className="step-card">
            <span className="step-number">01</span>
            <div className="step-content">
              <h3>Farmer creates request</h3>
              <p>Farmers or agents enter produce type, quantity, pickup point, and destination. The request goes live on the driver board instantly.</p>
            </div>
          </div>

          <div className="step-card">
            <span className="step-number">02</span>
            <div className="step-content">
              <h3>Driver accepts &amp; loads</h3>
              <p>Nearby verified drivers see available loads and accept or place a bid. The farmer is notified immediately and can call with one tap.</p>
            </div>
          </div>

          <div className="step-card">
            <span className="step-number">03</span>
            <div className="step-content">
              <h3>PIN confirms delivery</h3>
              <p>When goods arrive, the farmer shares a 4-digit PIN. The driver enters it to confirm delivery and release escrow payment automatically.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="how-it-works-right">
        <div className="images-top-row">
          <img className="img-top-left" src='https://res.cloudinary.com/dnjexdaop/image/upload/v1780660366/photo_9_2026-06-05_12-51-52_ehhiy2.jpg' alt="Farmer at FARMGO PIN confirmation stand" />
          <img className="img-top-right" src='https://res.cloudinary.com/dnjexdaop/image/upload/v1782003001/photo_2_2026-06-21_01-49-28_ddgmv5.jpg' alt="FARMGO agent at rural branch station" />
        </div>
        <img className="img-bottom" src='https://res.cloudinary.com/dnjexdaop/image/upload/v1782003001/photo_1_2026-06-21_01-49-28_ft10gy.jpg' alt="Farmer handing produce to driver at sunset" />
      </div>
    </div>
  )
}

export default HowItWorks