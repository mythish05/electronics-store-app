import React from "react";
import "../App.css";

function ItemList({ items, onDelete }) {
  return (
    <div className="items-container">
      {items.length === 0 ? (
        <p className="empty-msg">No items available</p>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <div key={item.id} className="item-card fade-in">
              <h3>{item.itemName}</h3>
              <p><b>Brand:</b> <span>{item.brand}</span></p>
              <p><b>Category:</b> <span>{item.category}</span></p>
              <p><b>Price:</b> <span>₹{item.price}</span></p>
              <p><b>Stock:</b> <span>{item.stockQuantity}</span></p>
              <button onClick={() => onDelete(item.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemList;
