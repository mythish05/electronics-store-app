import React, { useState } from "react";
import "../App.css";

function ItemForm({ onAdd }) {
  const [item, setItem] = useState({
    itemName: "",
    brand: "",
    category: "",
    price: "",
    stockQuantity: "",
  });

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemData = {
      ...item,
      price: parseFloat(item.price),
      stockQuantity: parseInt(item.stockQuantity)
    };
    console.log('Sending item data:', itemData);
    onAdd(itemData);
    setItem({ itemName: "", brand: "", category: "", price: "", stockQuantity: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="item-form fade-in">
      <input type="text" name="itemName" placeholder="Item Name" value={item.itemName} onChange={handleChange} required />
      <input type="text" name="brand" placeholder="Brand" value={item.brand} onChange={handleChange} required />
      <input type="text" name="category" placeholder="Category" value={item.category} onChange={handleChange} required />
      <input type="number" name="price" placeholder="Price (₹)" value={item.price} onChange={handleChange} required />
      <input type="number" name="stockQuantity" placeholder="Stock Quantity" value={item.stockQuantity} onChange={handleChange} required />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default ItemForm;
