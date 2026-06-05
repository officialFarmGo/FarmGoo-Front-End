import React, { useState } from 'react'
import { LuChevronDown, LuChevronUp } from 'react-icons/lu'
import "../CSS/FAQSection.css"

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const faqData = [
    {
      question: "How do I request transport?",
      answer: "Click the 'Request Transport' button on your dashboard, fill in the produce details, pickup and destination locations, and submit."
    },
    {
      question: "When do I pay?",
      answer: "Payment terms depend on your arrangement, typically processed upon booking confirmation or delivery milestone fulfillment."
    },
    {
      question: "What if my produce gets damaged?",
      answer: "We have structural fallback and goods-in-transit insurance coverages specified to safeguard transit occurrences."
    },
    {
      question: "How is pricing calculated?",
      answer: "Pricing is calculated based on total distance, vehicle type requirements, and volume weight of the farm produce."
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="fg-faq-container">
      <div className="fg-faq-card">
        <h2 className="fg-faq-title">Frequently Asked Questions</h2>
        
        <div className="fg-faq-list">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div 
                key={index} 
                className={`fg-faq-item ${isOpen ? 'fg-faq-item-open' : ''}`}
              >
                <button 
                  className="fg-faq-question-row" 
                  onClick={() => toggleFAQ(index)}
                  type="button"
                >
                  <h3>{item.question}</h3>
                  {isOpen ? (
                    <LuChevronUp className="fg-faq-arrow" />
                  ) : (
                    <LuChevronDown className="fg-faq-arrow" />
                  )}
                </button>
                
                {isOpen && (
                  <div className="fg-faq-answer-block">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FAQSection