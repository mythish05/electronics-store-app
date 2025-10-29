import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import ContactDemo from "./components/ContactDemo";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import { addItem, getAllItems, deleteItem } from "./services/api";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");

  // Load items from backend
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await getAllItems();
      setItems(response.data);
    } catch (error) {
      console.error("Error loading items:", error);
    }
  };

  // Add new item
  const handleAddItem = async (item) => {
    try {
      await addItem(item);
      loadItems(); // Reload items after adding
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Delete item
  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(id);
      loadItems(); // Reload items after deleting
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Filter items
  const filteredItems = items.filter((item) =>
    filter === "all" ? true : item.category === filter
  );

  // Sort by brand (descending)
  const sortedItems =
    filter === "brand"
      ? [...items].sort((a, b) => b.brand.localeCompare(a.brand))
      : filteredItems;

  // Auth handlers
  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView("home");
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setCurrentView("home");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("home");
  };

  if (currentView === "home") {
    return <HomePage onNavigate={setCurrentView} user={user} onLogout={handleLogout} />;
  }

  if (currentView === "login") {
    return <Login onLogin={handleLogin} onSwitchToRegister={() => setCurrentView("register")} />;
  }

  if (currentView === "register") {
    return <Register onSwitchToLogin={() => setCurrentView("login")} />;
  }

  if (currentView === "contacts") {
    return <ContactDemo onBack={() => setCurrentView("home")} />;
  }

  return (
    <div className="app-container">
      <Header />
      <div className="controls-section">
        <button className="btn btn-secondary" onClick={() => setCurrentView("home")}>
          Home
        </button>
        <button className="btn btn-primary" onClick={() => setCurrentView("contacts")}>
          Contact Form
        </button>
        <div className="filter-sort-container">
          <label className="filter-label">Filter:</label>
          <select className="filter-dropdown" onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value="all">All Items</option>
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
            <option value="TV">TV</option>
            <option value="Refrigerator">Refrigerator</option>
            <option value="brand">Sort by Brand</option>
          </select>
        </div>
      </div>

      <ItemForm onAdd={handleAddItem} />
      <ItemList items={sortedItems} onDelete={handleDeleteItem} />
    </div>
  );
}

export default App;
