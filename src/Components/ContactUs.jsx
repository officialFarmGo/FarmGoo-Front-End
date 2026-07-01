import React, { useState } from 'react';
import { FiMail, FiPhone, FiTwitter, FiLinkedin, FiFacebook, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import '../CSS/ContactUs.css';
import { apiInstance } from '../Api/Api';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await apiInstance.post('/contact', {
        name: formData.name,
        phone: formData.phone,
        message: formData.message,
      });
      setSuccess(true);
      setFormData({ name: '', phone: '', message: '' });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Failed to send message. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='main-contactus'>
    <section className="contact-section">
      <div className="contact-header">
        <span className="badge contact-badge">Contact Us</span>
        <h1>Get In Touch</h1>
        <p className="contact-subtext">
          Questions, partnerships, or direct billboard — our team across Marakei Lights will always be ready to help
        </p>
      </div>

      <div className="contact-layout">
        <div className="contact-info-column">
          <div className="info-row-cards">
            <div className="info-mini-card">
              <div className="info-icon-wrapper">
                <FiMail size={20} color="var(--primary-green)" />
              </div>
              <div className="info-card-text">
                <span className="info-label">Email Address</span>
                <span className="info-value">farmgooofficial@gmail.com</span>
              </div>
            </div>

            <div className="info-mini-card">
              <div className="info-icon-wrapper">
                <FiPhone size={20} color="var(--primary-green)" />
              </div>
              <div className="info-card-text">
                <span className="info-label">Phone Number</span>
                <span className="info-value">+2346585787745</span>
              </div>
            </div>
          </div>

          <div className="headquarters-card">
            <h2>quarters</h2>
            <span className="sub-label">A HEAD OFFICE</span>
            <p className="address-text">
              ff Airport Drive<br />
              arawa • Kiribati<br />
              56, Bairiki
            </p>
            <p className="phone-text">650 000 0000</p>
            <p className="hours-text">-Fri, 09:00-17:00 GMT</p>
            
            <p className="mission-statement">
              growing community rallying towards using business as a force for good
            </p>

            <div className="social-links">
              <a href="#twitter" className="social-icon"><FiTwitter size={18} /></a>
              <a href="#linkedin" className="social-icon"><FiLinkedin size={18} /></a>
              <a href="#facebook" className="social-icon"><FiFacebook size={18} /></a>
            </div>
          </div>
        </div>

        <div className="contact-form-column">
          {success ? (
            <div className="contact-success-message">
              <FiCheckCircle size={48} color="var(--primary-green)" />
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out. We will get back to you shortly.</p>
              <button 
                className="submit-btn" 
                onClick={() => setSuccess(false)}
                style={{ marginTop: '16px' }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="message-form" onSubmit={handleSubmit}>
              <h2>Send us a message</h2>
              
              {error && (
                <div className="contact-form-error">
                  <FiAlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone number</label>
                <input 
                  type="text" 
                  id="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">How can we help?</label>
                <textarea 
                  id="message" 
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your content needs to be atleast 100 words, this is where you leave and needs."
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Sending...' : 'Send message'}
                {!loading && <FiSend style={{ marginLeft: '8px' }} />}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
    </main>
  );
};

export default ContactUs;