import React, { useState } from 'react';

interface ContactData {
  name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  notes: string;
}

interface NewContactFormProps {
  onCancel?: () => void;
}

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '14px'
};

const labelStyle = {
  display: 'block',
  fontSize: '14px',
  fontWeight: '500',
  color: '#333',
  marginBottom: '8px'
};

const buttonStyle = {
  padding: '10px 24px',
  fontSize: '14px',
  fontWeight: '500',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer'
};

const NewContactForm: React.FC<NewContactFormProps> = ({ onCancel }) => {
  const [contactData, setContactData] = useState<ContactData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact Data:', contactData);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else if (window.history.length > 1) {
      window.history.back();
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', marginBottom: '32px' }}>Add New Contact</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div>
            <label htmlFor="name" style={labelStyle}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={contactData.name}
              onChange={handleInputChange}
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label htmlFor="email" style={labelStyle}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={contactData.email}
              onChange={handleInputChange}
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label htmlFor="phone" style={labelStyle}>Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={contactData.phone}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="company" style={labelStyle}>Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={contactData.company}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="jobTitle" style={labelStyle}>Job Title</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={contactData.jobTitle}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label htmlFor="notes" style={labelStyle}>Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={contactData.notes}
            onChange={handleInputChange}
            rows={4}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '16px', paddingTop: '16px' }}>
          <button
            type="submit"
            style={{ ...buttonStyle, backgroundColor: '#007bff', color: 'white' }}
          >
            Add Contact
          </button>
          <button
            type="button"
            onClick={handleCancel}
            style={{ ...buttonStyle, backgroundColor: '#6c757d', color: 'white' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewContactForm;