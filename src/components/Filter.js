import React from 'react';
import { products } from '../data/products';
import './Filter.css'

const Filter = ({ filters, onFilterChange }) => {
  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  // Extract unique brands and colors from the product data
  const uniqueBrands = [...new Set(products.map((product) => product.brand))];
  const uniqueColors = [...new Set(products.map((product) => product.color))];

  return (
    <div className="filter-container">
      <h2>Filters</h2>
      <div className="filter-item">
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          {/* Categories options */}
          <option value="">All</option>
          <option value="Mens">Mens</option>
          <option value="Womens">Womens</option>
          <option value="Kids">Kids</option>
        </select>
      </div>
      <div className="filter-item">
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          placeholder="Enter price"
          value={filters.price}
          onChange={(e) => handleFilterChange('price', e.target.value)}
        />
      </div>
      <div className="filter-item">
        <label htmlFor="brand">Brand:</label>
        <select
          id="brand"
          value={filters.brand}
          onChange={(e) => handleFilterChange('brand', e.target.value)}
        >
          {/* Brands options */}
          <option value="">All</option>
          {uniqueBrands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-item">
        <label htmlFor="color">Color:</label>
        <select
          id="color"
          value={filters.color}
          onChange={(e) => handleFilterChange('color', e.target.value)}
        >
          {/* Colors options */}
          <option value="">All</option>
          {uniqueColors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
