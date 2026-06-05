import React from 'react'
import '../CSS/DetailsTwo.css'
const DetailTwo = () => {
  return (
     <div className="detail-two">
      <div className="detail-two-left">
        <span className="problem-badge">The Problem</span>
        <p className='detail-text'>
          Nigerian farmers lose up to <span className="highlight">40%</span> of their <br/>harvest to transport<br/> delays.
        </p>
        <p>
          Without reliable transport, perishable produce sits on farms for days — <br/>rotting, losing value, and crushing farmer income. Informal networks are <br/>exploitative and slow. We built a better way.
        </p>
        <button className="join-btn">Join the solution →</button>
      </div>
 
      <div className="detail-two-right">
        <div className="problem-card">
          <h3>Transport delays cause spoilage</h3>
          <p>Days without a truck means perishables rot before reaching any market. Every hour counts with tomatoes, peppers, and yam.</p>
        </div>
        <div className="problem-card">
          <h3>Exploitative informal pricing</h3>
          <p>Farmers have no price visibility. Informal drivers charge what they want, knowing there are no alternatives in rural areas.</p>
        </div>
        <div className="problem-card">
          <h3>Drivers run expensive empty miles</h3>
          <p>Trucks return from markets empty. Without a load-matching network, drivers earn less and fuel is wasted on every return trip.</p>
        </div>
      </div>
    </div>
  )
}

export default DetailTwo
