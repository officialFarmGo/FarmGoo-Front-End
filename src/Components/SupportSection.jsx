import React, { useState } from "react";
import "../CSS/SupportSection.css";
import { FiChevronDown } from "react-icons/fi"; // Removed unused FiMail and FiPhone

const SupportSection = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [issueType, setIssueType] = useState("Payment Issue");
  const [description, setDescription] = useState("");

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Issue:", { issueType, description });
  };

  const faqs = [
    {
      question: "How do I request transport?",
      answer:
        "To request transport, go to the dashboard, click on 'Request Transport', fill in your pick-up/drop-off details, and confirm.",
    },
    {
      question: "When do I pay?",
      answer:
        "Payments can be made directly upon scheduling a transport request or based on your account arrangements.",
    },
    {
      question: "What if my produce gets damaged?",
      answer:
        "We take extreme care of items, but if damage occurs, please report it immediately using the 'Report an Issue' form below.",
    },
    {
      question: "How is pricing calculated?",
      answer:
        "Pricing is calculated based on distance, the weight/volume of your produce, and the vehicle type selected.",
    },
  ];

  return (
    <section className="fg-support-container">
      <div className="fg-support-inner">
        <h2 className="fg-support-main-title">Help & Support</h2>

        {/* --- FAQ SECTION --- */}
        <div className="fg-support-section-card">
          <h3 className="fg-support-section-heading">
            Frequently Asked Questions
          </h3>
          <div className="fg-faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="fg-faq-item-container">
                <button
                  type="button"
                  className={`fg-faq-trigger ${openFaq === index ? "active" : ""}`}
                  onClick={() => toggleFaq(index)}
                >
                  <span className="fg-faq-question">{faq.question}</span>
                  <FiChevronDown
                    className={`fg-faq-chevron ${openFaq === index ? "rotate" : ""}`}
                  />
                </button>
                {openFaq === index && (
                  <div className="fg-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
