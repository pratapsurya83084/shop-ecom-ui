import React from 'react';
import { useNavigate } from 'react-router-dom';

const IfNotCartItem = () => {
  const navigate = useNavigate();


  return (
    <div className="dark:bg-black    dark:text-white">
      <div className="dark:bg-slate-900 shadow-lg rounded-lg p-10 flex flex-col items-center">
        <img src="\tienda-online-kit-digital.png" alt="Missing Cart Items"
         className="w- mb-6" />
        <h2 className="text-lg font-semibold mb-2">Your Cart is Empty</h2>
        <p className="  text-white-600 mb-4">You have no items in your cart. Start shopping now!</p>
        <button 
          onClick={() => navigate('/allproducts')} 
          className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded">
          Go to Shop
        </button>
      </div>
    </div>
  );
};

export default IfNotCartItem;
