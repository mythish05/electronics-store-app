import React from "react";
import "../App.css"; // optional (for shared styles)

function FilterSortControls({ filter, setFilter }) {
  return (
    <div className="filter-sort-container">
      <label htmlFor="filterSelect" className="filter-label">
        Filter / Sort:
      </label>

      <select
        id="filterSelect"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="filter-dropdown"
      >
        <option value="all">All Items</option>
        <option value="Mobile">Mobile</option>
        <option value="Laptop">Laptop</option>
        <option value="TV">TV</option>
        <option value="Refrigerator">Refrigerator</option>
        <option value="brand">Sort by Brand (Descending)</option>
      </select>
    </div>
  );
}

export default FilterSortControls;
