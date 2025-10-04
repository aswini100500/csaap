import React, { useState } from 'react';

const StockTransferEntry = () => {
  const [fromStore, setFromStore] = useState('');
  const [toStore, setToStore] = useState('');
  const [category, setCategory] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [units, setUnits] = useState('Pieces');
  const [productList, setProductList] = useState([]);

  const handleAddProduct = () => {
    if (product && quantity && units) {
      setProductList([...productList, { product, quantity, units }]);
      setProduct('');
      setQuantity('');
      setUnits('Pieces');
    }
  };

  const handleRemoveProduct = (index) => {
    const updatedList = productList.filter((_, i) => i !== index);
    setProductList(updatedList);
  };

  const handleTransfer = () => {
    // Implement transfer logic here, e.g., API call
    alert('Transfer initiated!');
    setProductList([]);
    setFromStore('');
    setToStore('');
    setCategory('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Stock Transfer</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">From Store</label>
          <select
            value={fromStore}
            onChange={(e) => setFromStore(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Store</option>
            <option value="Store A">Store A</option>
            <option value="Store B">Store B</option>
            {/* Add more options as needed */}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">To Store</label>
          <select
            value={toStore}
            onChange={(e) => setToStore(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Store</option>
            <option value="Store C">Store C</option>
            <option value="Store D">Store D</option>
            {/* Add more options as needed */}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            {/* Add more options as needed */}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Product</label>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter product name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter quantity"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Units</label>
          <select
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="Pieces">Pieces</option>
            <option value="Kg">Kg</option>
            <option value="Liters">Liters</option>
            {/* Add more options as needed */}
          </select>
        </div>
        
        <div className="flex items-end">
          <button
            onClick={handleAddProduct}
            className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Product to List
          </button>
        </div>
      </div>
      
      {productList.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Product List</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left">Product</th>
                <th className="px-4 py-2 border-b text-left">Quantity</th>
                <th className="px-4 py-2 border-b text-left">Units</th>
                <th className="px-4 py-2 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-b">{item.product}</td>
                  <td className="px-4 py-2 border-b">{item.quantity}</td>
                  <td className="px-4 py-2 border-b">{item.units}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => handleRemoveProduct(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="flex justify-end">
        <button
          onClick={handleTransfer}
          className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={productList.length === 0}
        >
          Transfer
        </button>
      </div>
    </div>
  );
};

export default StockTransferEntry;