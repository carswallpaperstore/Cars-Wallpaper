import React from 'react';
import { categories } from '../data/wallpapers';
import '../styles/Filter.css';

const Filter = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="filter-container">
      <h2>Filter by Category</h2>
      <div className="filter-options">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`filter-button ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter;