import React, { useState } from "react";
import axios from "axios";
import { FiMail, FiPhone, FiChevronDown, FiChevronUp } from "react-icons/fi";
import "../CSS/SupportSection.css";

const SupportSection = () => {
  // Frequently Asked Questions Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Form State
  const [issueType, setIssueType] = useState("Payment Issue");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [formMessage, setFormMessage] = useState({ type: "", text: "" });

  const BASE_URL = import.meta.env.VITE_BaseUrl;
  const token = localStorage.getItem("token");

  // FAQ Content Array
  const faqs = [
    {
      question: "How do I request transport?",
      answer:
        "You can easily book or request a transport vehicle straight from your primary dashboard panel by selecting your pickup point, weight payload capacity, and destination details.",
    },
    {
      question: "When do I pay?",
      answer:
        "Payments are processed seamlessly prior to shipment activation or dynamically handled through your funded application wallet balance architecture.",
    },
    {
      question: "What if my produce gets damaged?",
      answer:
        "We offer comprehensive cargo transit coverage safeguards. If an issue is verified during transit lifecycle legs, immediately register an escalating claim ticket via our support system.",
    },
    {
      question: "How is pricing calculated?",
      answer:
        "Pricing metrics scale transparently based on total travel distance matrices, volumetric weight specifications, vehicle configuration selections, and localized market operational costs.",
    },
  ];

  const handleEmailClick = () => {
    window.location.href = "mailto:support@farmgoo.ng";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:0800FARMGOO";
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormMessage({ type: "", text: "" });

    // Validation
    if (!description.trim()) {
      setFormMessage({
        type: "error",
        text: "Please enter a description for your issue before submitting.",
      });
      return;
    }

    setLoading(true);
    try {
      // Standard API payload structure matching your system architecture
      const response = await axios.post(
        `${BASE_URL}/agentDashboard/report-issue`,
        { issueType, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data) {
        setFormMessage({
          type: "success",
          text: "Your support report has been successfully submitted! We will get back to you shortly.",
        });
        setDescription(""); // Reset form field text area
      }
    } catch (error) {
      console.error("Support system report submission error details:", error);
      if (error.response?.data?.message) {
        setFormMessage({ type: "error", text: error.response.data.message });
      } else {
        setFormMessage({
          type: "error",
          text: "Network error or backend server unavailable. Please try again later.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fg-support-container">
      <div className="fg-support-inner">
        <h1 className="fg-support-main-title">Help & Support</h1>

        {/* Action Cards Grid: Email and Call Support Contexts */}
        <div className="fg-support-cards-grid">
          {/* Email Support Card */}
          <div className="fg-support-action-card">
            <div className="fg-support-icon-circle email-bg">
              <FiMail className="fg-support-native-icon email-icon-clr" />
            </div>
            <h3 className="fg-support-card-label">Email Us</h3>
            <p className="fg-support-card-detail">support@farmgoo.ng</p>
            <button
              type="button"
              className="fg-support-action-trigger-btn"
              onClick={handleEmailClick}
            >
              Send Email
            </button>
          </div>

          {/* Call Support Card */}
          <div className="fg-support-action-card">
            <div className="fg-support-icon-circle phone-bg">
              <FiPhone className="fg-support-native-icon phone-icon-clr" />
            </div>
            <h3 className="fg-support-card-label">Call Us</h3>
            <p className="fg-support-card-detail">0800-FARMGOO</p>
            <button
              type="button"
              className="fg-support-action-trigger-btn"
              onClick={handlePhoneClick}
            >
              Call Now
            </button>
          </div>
        </div>

        {/* Frequently Asked Questions Section */}
        <div className="fg-support-section-panel">
          <h2 className="panel-container-title">Frequently Asked Questions</h2>
          <div className="faq-accordion-stack">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`faq-item-row ${isOpen ? "faq-active" : ""}`}
                >
                  <div
                    className="faq-question-header"
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <FiChevronUp className="faq-chevron-icon" />
                    ) : (
                      <FiChevronDown className="faq-chevron-icon" />
                    )}
                  </div>
                  {isOpen && (
                    <div className="faq-answer-body">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Report an Issue Section */}
      </div>
    </section>
  );
};

export default SupportSection;
