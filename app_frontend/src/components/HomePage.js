import React from "react";

function HomePage({ onNavigate, user, onLogout }) {

  return (
    <div className="home-container fade-in">
      <div className="home-content">
        <h1 className="home-title">Welcome to Our Store</h1>
        <p className="home-subtitle">Your Premium Electronics Inventory Management Solution</p>
      
      {user ? (
        <div className="user-info">
          <p className="user-welcome">Hello, {user.name || user.email}!</p>
          <button className="btn btn-danger" onClick={onLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="user-info">
          <p className="user-welcome">Please login to access features</p>
          <div className="auth-buttons">
            <button className="btn btn-primary" onClick={() => onNavigate("login")}>
              Login
            </button>
            <button className="btn btn-success" onClick={() => onNavigate("register")}>
              Register
            </button>
          </div>
        </div>
      )}
      
      {user && (
        <div className="nav-buttons">
          <button className="btn btn-primary" onClick={() => onNavigate("items")}>
            Manage Items
          </button>
          <button className="btn btn-success" onClick={() => onNavigate("contacts")}>
            Contact Form
          </button>
        </div>
      )}
      </div>
    </div>
  );
}

export default HomePage;