import React from 'react';
import Grocery from '../components/GroceryList/Grocery';
import '../styles/grocery.css';

const GroceryPage = () => {
  return (
    <div className="grocery-page">
      <Grocery />
    </div>
  );
};

export default GroceryPage;
