import React from 'react';
import NewContactForm from './forms/NewContactForm.tsx';
import '../App.css';

const ContactDemo = ({ onBack }) => {
  const handleCancel = () => {
    if (onBack) {
      onBack();
    } else {
      console.log('Cancel clicked - would navigate back');
    }
  };

  return (
    <div className="app-container">
      <div className="contact-container fade-in">
        <div style={{ marginBottom: '30px' }}>
          <button className="btn btn-secondary" onClick={handleCancel}>
            ← Back to Home
          </button>
        </div>
        <div className="contact-form">
          <h2 className="contact-title">Contact Us</h2>
          <NewContactForm onCancel={handleCancel} />
        </div>
      </div>
    </div>
  );
};

export default ContactDemo;