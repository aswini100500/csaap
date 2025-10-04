import React, { useState } from 'react';

const IndentEntry = () => {
  const [supplier, setSupplier] = useState({
    name: '',
    contact: '',
    gst: ''
  });

  const [productForm, setProductForm] = useState({
    category: '',
    product: '',
    quantity: '',
    units: 'Pieces'
  });

  const [productList, setProductList] = useState([]);

  // Sample categories and products data
  const categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Furniture' },
    { id: 3, name: 'Office Supplies' },
    { id: 4, name: 'Raw Materials' },
    { id: 5, name: 'Packaging' }
  ];

  const products = [
    { id: 1, name: 'Laptop', categoryId: 1 },
    { id: 2, name: 'Mouse', categoryId: 1 },
    { id: 3, name: 'Keyboard', categoryId: 1 },
    { id: 4, name: 'Office Chair', categoryId: 2 },
    { id: 5, name: 'Desk', categoryId: 2 },
    { id: 6, name: 'Printer', categoryId: 1 },
    { id: 7, name: 'Notebooks', categoryId: 3 },
    { id: 8, name: 'Pens', categoryId: 3 },
    { id: 9, name: 'Steel Sheets', categoryId: 4 },
    { id: 10, name: 'Plastic Rolls', categoryId: 4 },
    { id: 11, name: 'Cardboard Boxes', categoryId: 5 },
    { id: 12, name: 'Bubble Wrap', categoryId: 5 }
  ];

  // Filter products based on selected category
  const filteredProducts = productForm.category 
    ? products.filter(product => product.categoryId === parseInt(productForm.category))
    : products;

  const handleSupplierChange = (e) => {
    const { name, value } = e.target;
    setSupplier(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductFormChange = (e) => {
    const { name, value } = e.target;
    
    setProductForm(prev => {
      // If category changes, reset product selection
      if (name === 'category') {
        return {
          ...prev,
          category: value,
          product: '' // Reset product when category changes
        };
      }
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const addProductToList = () => {
    if (!productForm.product || !productForm.quantity) {
      alert('Please select a product and enter quantity');
      return;
    }

    // Find selected product and category details
    const selectedProduct = products.find(p => p.id === parseInt(productForm.product));
    const selectedCategory = categories.find(c => c.id === parseInt(productForm.category));

    const newProduct = {
      id: Date.now(),
      productId: selectedProduct.id,
      product: selectedProduct.name,
      categoryId: selectedCategory.id,
      category: selectedCategory.name,
      quantity: productForm.quantity,
      units: productForm.units
    };

    setProductList(prev => [...prev, newProduct]);
    
    // Reset form
    setProductForm({
      category: '',
      product: '',
      quantity: '',
      units: 'Pieces'
    });
  };

  const removeProduct = (id) => {
    setProductList(prev => prev.filter(product => product.id !== id));
  };

  const saveIndent = () => {
    if (!supplier.name) {
      alert('Please enter supplier name');
      return;
    }

    if (productList.length === 0) {
      alert('Please add at least one product');
      return;
    }

    // In a real application, you would send this data to an API
    const indentData = {
      supplier,
      products: productList,
      date: new Date().toISOString()
    };

    console.log('Indent Data:', indentData);
    
    // Show success message
    alert(`Indent saved successfully!\n\nSupplier: ${supplier.name}\nProducts: ${productList.length}`);
    
    // Reset form
    setSupplier({
      name: '',
      contact: '',
      gst: ''
    });
    setProductList([]);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Indent Entry</h1>
        <p className="text-lg text-gray-600">Create new purchase indent</p>
      </div>

      {/* Supplier Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Supplier Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Supplier Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={supplier.name}
              onChange={handleSupplierChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter supplier name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact No</label>
            <input
              type="tel"
              name="contact"
              value={supplier.contact}
              onChange={handleSupplierChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter contact number"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Supplier GST</label>
          <input
            type="text"
            name="gst"
            value={supplier.gst}
            onChange={handleSupplierChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter GST number"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 my-8"></div>

      {/* Product Entry Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Product List
        </h2>
        <p className="text-gray-600 mb-6">
          Enter product details and press "Add Product To List" to add product
        </p>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={productForm.category}
                onChange={handleProductFormChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product <span className="text-red-500">*</span>
              </label>
              <select
                name="product"
                value={productForm.product}
                onChange={handleProductFormChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={!productForm.category}
                required
              >
                <option value="">Select Product</option>
                {filteredProducts.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
              {!productForm.category && (
                <p className="text-xs text-gray-500 mt-1">Please select a category first</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="quantity"
                value={productForm.quantity}
                onChange={handleProductFormChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter quantity"
                min="1"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Units</label>
              <select
                name="units"
                value={productForm.units}
                onChange={handleProductFormChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Pieces">Pieces</option>
                <option value="Kg">Kilograms</option>
                <option value="Liters">Liters</option>
                <option value="Meters">Meters</option>
                <option value="Box">Box</option>
                <option value="Pack">Pack</option>
              </select>
            </div>
          </div>
          
          <button
            onClick={addProductToList}
            className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            Add Product To List
          </button>
        </div>
      </div>

      {/* Product List Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productList.length > 0 ? (
                productList.map((product, index) => (
                  <tr key={product.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.units}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="text-red-600 hover:text-red-900 font-medium"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <svg className="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
                      </svg>
                      No products added yet. Add products using the form above.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => {
            setSupplier({ name: '', contact: '', gst: '' });
            setProductList([]);
            setProductForm({
              category: '',
              product: '',
              quantity: '',
              units: 'Pieces'
            });
          }}
          className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
        >
          Clear Form
        </button>
        
        <button
          onClick={saveIndent}
          className="px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
        >
          Save Indent
        </button>
      </div>
    </div>
  );
};

export default IndentEntry;