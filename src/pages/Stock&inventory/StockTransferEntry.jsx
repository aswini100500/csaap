import React, { useState } from 'react';

const StockTransferEntry = () => {
  const [fromStore, setFromStore] = useState('');
  const [toStore, setToStore] = useState('');
  const [category, setCategory] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [units, setUnits] = useState('Pieces');
  const [notes, setNotes] = useState('');
  const [productList, setProductList] = useState([]);

  // Sample product data based on categories
  const productsData = {
    Electronics: [
      'UNO Dip HQ',
      'PAM8403',
      'Esp32 Cam Module',
      '0.91" I2C Oled 4 Pin'
    ],
    Components: [
      'ACS 712 5A',
      '2xcellholder',
      'Forwarding and Shipping Charges'
    ],
    Batteries: [
      '1s to 8s Battery Level Indicator',
      'CR2032'
    ],
    Sensors: [
      'Mlx90614'
    ],
    Clothing: [
      'T-Shirts',
      'Jeans',
      'Jackets',
      'Shoes'
    ]
  };

  // Get products based on selected category
  const getProductsForCategory = () => {
    return productsData[category] || [];
  };

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
    console.log('Transfer Details:', {
      fromStore,
      toStore,
      category,
      productList,
      notes
    });
    alert('Transfer initiated!');
    setProductList([]);
    setFromStore('');
    setToStore('');
    setCategory('');
    setProduct('');
    setNotes('');
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
            <option value="Store C">Store C</option>
            <option value="Store D">Store D</option>
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
            <option value="Store A">Store A</option>
            <option value="Store B">Store B</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setProduct(''); // Reset product when category changes
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Components">Components</option>
            <option value="Batteries">Batteries</option>
            <option value="Sensors">Sensors</option>
            <option value="Clothing">Clothing</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Product</label>
          <select
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            disabled={!category}
          >
            <option value="">{category ? 'Select Product' : 'Select category first'}</option>
            {getProductsForCategory().map((prod, index) => (
              <option key={index} value={prod}>{prod}</option>
            ))}
          </select>
          {!category && (
            <p className="text-xs text-gray-500 mt-1">Please select a category first</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter quantity"
            min="1"
            disabled={!product}
          />
          {!product && (
            <p className="text-xs text-gray-500 mt-1">Please select a product first</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Units</label>
          <select
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            disabled={!product}
          >
            <option value="Pieces">Pieces</option>
            <option value="Kg">Kg</option>
            <option value="Liters">Liters</option>
            <option value="Boxes">Boxes</option>
            <option value="Packets">Packets</option>
            <option value="Units">Units</option>
          </select>
        </div>
        
        <div className="flex items-end">
          <button
            onClick={handleAddProduct}
            className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!product || !quantity}
          >
            Add Product to List
          </button>
        </div>
      </div>
      
      {/* Notes Field */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Add any notes or comments about this transfer..."
          rows="3"
        />
        <p className="text-xs text-gray-500 mt-1">
          Optional: Add any special instructions or comments for this stock transfer.
        </p>
      </div>
      
      {productList.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Transfer Products List</h2>
            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {productList.length} item{productList.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 border-b text-left text-sm font-medium text-gray-700">No.</th>
                  <th className="px-4 py-3 border-b text-left text-sm font-medium text-gray-700">Product</th>
                  <th className="px-4 py-3 border-b text-left text-sm font-medium text-gray-700">Quantity</th>
                  <th className="px-4 py-3 border-b text-left text-sm font-medium text-gray-700">Units</th>
                  <th className="px-4 py-3 border-b text-left text-sm font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 border-b">{index + 1}</td>
                    <td className="px-4 py-3 border-b font-medium">{item.product}</td>
                    <td className="px-4 py-3 border-b">{item.quantity}</td>
                    <td className="px-4 py-3 border-b">{item.units}</td>
                    <td className="px-4 py-3 border-b">
                      <button
                        onClick={() => handleRemoveProduct(index)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <div className="flex justify-end mt-8">
        <button
          onClick={handleTransfer}
          className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          disabled={productList.length === 0}
        >
          Initiate Transfer
        </button>
      </div>

      {/* Summary section - optional */}
      {productList.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-medium text-blue-800 mb-2">Transfer Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-blue-600">From Store:</p>
              <p className="font-medium">{fromStore || 'Not selected'}</p>
            </div>
            <div>
              <p className="text-sm text-blue-600">To Store:</p>
              <p className="font-medium">{toStore || 'Not selected'}</p>
            </div>
            <div>
              <p className="text-sm text-blue-600">Total Items:</p>
              <p className="font-medium">{productList.length}</p>
            </div>
          </div>
          {notes && (
            <div className="mt-3 pt-3 border-t border-blue-200">
              <p className="text-sm text-blue-600 mb-1">Notes:</p>
              <p className="text-sm">{notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StockTransferEntry;