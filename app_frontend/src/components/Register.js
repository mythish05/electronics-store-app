import React, { useState } from "react";
import { registerUser } from "../services/auth";

function Register({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    employeeId: "",
    storeLocation: ""
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    
    try {
      await registerUser(formData);
      setMessage("Registration successful! Please login.");
      setTimeout(() => {
        onSwitchToLogin();
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        <h2 className="auth-title">Register</h2>
        {message && (
          <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="employeeId"
              placeholder="Employee ID (Optional)"
              value={formData.employeeId}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="storeLocation"
              placeholder="Store Location (Optional)"
              value={formData.storeLocation}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <button type="submit" className="btn btn-success" style={{width: '100%'}} disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="auth-switch">
          Already have an account?{" "}
          <span className="auth-link" onClick={onSwitchToLogin}>
            Login
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;