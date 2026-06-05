import React, { useState } from "react";
import "../CSS/AgentHelpSupport.css";
import { LuChevronUp, LuChevronDown } from "react-icons/lu";

const AgentHelpSupport = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const faqs = [
    {
      question: "How do I request transport?",
      answer: "Click the 'Request Transport' button on your dashboard, fill in the produce details, pickup and destination locations, and submit."
    },
    {
      question: "When do I pay?",
      answer: "Payment options are available upon delivery confirmation or via the secure wallet system built into your agent portal."
    },
    {
      question: "What if my produce gets damaged?",
      answer: "All trips are tracked. Report damaged goods immediately via the support channel with photographic evidence for assessment."
    },
    {
      question: "How is pricing calculated?",
      answer: "Pricing is calculated automatically based on total mileage distance, load volume capacity, and localized seasonal market rates."
    }
  ];

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="agent-support-container">
      <h1>Help & Support</h1>

      <div className="faq-card-wrapper">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-list-block">
          {faqs.map((faq, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div 
                key={index} 
                className={`faq-item-row ${isExpanded ? "item-expanded" : "item-collapsed"}`}
              >
                <div 
                  className="faq-question-trigger" 
                  onClick={() => toggleAccordion(index)}
                >
                  <span>{faq.question}</span>
                  {isExpanded ? (
                    <LuChevronUp className="faq-chevron-icon" />
                  ) : (
                    <LuChevronDown className="faq-chevron-icon" />
                  )}
                </div>

                {isExpanded && (
                  <div className="faq-answer-content">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AgentHelpSupport;