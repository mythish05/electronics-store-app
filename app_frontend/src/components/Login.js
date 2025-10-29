import React, { useState } from "react";
import { loginUser } from "../services/auth";

function Login({ onLogin, onSwitchToRegister }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    
    try {
      const response = await loginUser(credentials);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      onLogin({ username: response.data.username, token: response.data.token });
    } catch (error) {
      setMessage(error.response?.data || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        <h2 className="auth-title">Login</h2>
        {message && (
          <div className="message error">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={credentials.username}
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
              value={credentials.password}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{width: '100%'}} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="auth-switch">
          Don't have an account?{" "}
          <span className="auth-link" onClick={onSwitchToRegister}>
            Register
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;