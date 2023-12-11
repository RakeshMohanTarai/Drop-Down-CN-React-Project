import React, { useState, useEffect, useCallback } from 'react';
import ProductList from './ProductList';
import Filter from './Filter';
import { products } from '../data/products';
import './SearchPage.css';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState({
    category: '',
    price: '',
    brand: '',
    color: '',
  });

  // Define filterProducts using useCallback
  const filterProducts = useCallback(() => {
    let updatedProducts = [...products];

    // Apply category filter
    if (filters.category !== '' && filters.category !== 'All') {
      updatedProducts = updatedProducts.filter((product) => product.category === filters.category);
    }

    // Apply price filter
    if (filters.price !== '') {
      updatedProducts = updatedProducts.filter((product) => product.price <= parseInt(filters.price));
    }

    // Apply brand filter
    if (filters.brand !== '' && filters.brand !== 'All') {
      updatedProducts = updatedProducts.filter((product) => product.brand === filters.brand);
    }

    // Apply color filter
    if (filters.color !== '' && filters.color !== 'All') {
      updatedProducts = updatedProducts.filter((product) => product.color === filters.color);
    }

    setFilteredProducts(updatedProducts);
  }, [filters]);

  useEffect(() => {
    // Apply filters when filters change
    filterProducts();
  }, [filters, filterProducts]); // Include filterProducts in the dependency array

  const handleSearch = () => {
    // Filter products based on search term
    const searchTermLowerCase = searchTerm.toLowerCase();
    const searchedProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTermLowerCase) ||
        product.category.toLowerCase().includes(searchTermLowerCase) ||
        product.brand.toLowerCase().includes(searchTermLowerCase) ||
        product.color.toLowerCase().includes(searchTermLowerCase)
    );
    setFilteredProducts(searchedProducts);
  };

  const handleFilterChange = (filterType, value) => {
    // Update the filters state
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  return (
    <div className="search-page-container">
      <h1>Product Search</h1>
      <div className="search-bar">
        <input 
          id='Search'
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <Filter filters={filters} onFilterChange={handleFilterChange} />
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default SearchPage;
