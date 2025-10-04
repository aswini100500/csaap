import React, { useState, useEffect } from 'react';

const SaleEntry = () => {
  // Main form state
  const [formData, setFormData] = useState({
    fromStore: '',
    customerName: '',
    contactNo: '',
    gstType: 'nogst', // Default value
    gstNo: '',
    address: '',
    shippingAddress: '',
    saleDate: new Date().toISOString().split('T')[0],
    discount: 0,
    grossPrice: 0,
    netPrice: 0,
    paidAmount: 0,
    toAccount: ''
  });

  // Product entry state
  const [productEntry, setProductEntry] = useState({
    category: '',
    product: '',
    batch: '',
    rack: '',
    quantity: '',
    units: '',
    discountValue: 0,
    discountType: 'Percentage', // Default to Percentage
    cgst: 0,
    sgst: 0,
    igst: 0,
    salePrice: '',
  });

  // Product list state
  const [productList, setProductList] = useState([]);

  // Mock data for dropdowns
  const [categories, setCategories] = useState(['Electronics', 'Clothing', 'Groceries', 'Books']);
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState(['Main Store', 'Branch Store 1', 'Branch Store 2']);
  const [gstTypes, setGstTypes] = useState([
    { value: 'nogst', label: 'No GST' },
    { value: 'intrastate', label: 'Intrastate (CGST/SGST)' },
    { value: 'interstate', label: 'Interstate (IGST)' }
  ]);
  const [accounts, setAccounts] = useState(['Cash Account', 'Bank Account', 'Credit Card', 'Digital Wallet']);
  
  // Units dropdown options
  const [unitOptions] = useState([
    'Pieces', 'Liter', 'Kg', 'Meter', 'Ton', 'Metric Ton', 'Bucket', 'Barrel', 'Jar', 'Bag', 'Sqft'
  ]);
  
  // Discount type options
  const [discountTypeOptions] = useState([
    { value: 'Percentage', label: 'Discount in %' },
    { value: 'Cash', label: 'Discount in Cash' }
  ]);

  // Calculate totals
  const calculateTotals = () => {
    const gross = productList.reduce((sum, item) => sum + item.saleAmount, 0);
    const totalDiscount = productList.reduce((sum, item) => sum + item.discountAmount, 0);
    const totalCGST = productList.reduce((sum, item) => sum + item.cgstAmount, 0);
    const totalSGST = productList.reduce((sum, item) => sum + item.sgstAmount, 0);
    const totalIGST = productList.reduce((sum, item) => sum + item.igstAmount, 0);
    
    const net = gross - totalDiscount + totalCGST + totalSGST + totalIGST;

    setFormData(prev => ({
      ...prev,
      grossPrice: gross,
      netPrice: net,
      cgstTotal: totalCGST,
      sgstTotal: totalSGST,
      igstTotal: totalIGST,
      totalDiscount: totalDiscount
    }));
  };

  useEffect(() => {
    calculateTotals();
  }, [productList]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle product entry changes
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductEntry(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate discount based on type
  const calculateDiscount = (saleAmount, discountValue, discountType) => {
    if (discountType === 'Percentage') {
      return saleAmount * (discountValue / 100);
    } else {
      return Math.min(discountValue, saleAmount); // Cash discount cannot exceed sale amount
    }
  };

  // Calculate GST amounts for a product
  const calculateGSTAmounts = (saleAmount, cgstRate, sgstRate, igstRate) => {
    return {
      cgstAmount: saleAmount * (cgstRate / 100),
      sgstAmount: saleAmount * (sgstRate / 100),
      igstAmount: saleAmount * (igstRate / 100)
    };
  };

  // Add product to list
  const addProductToList = () => {
    if (!productEntry.product || !productEntry.quantity || !productEntry.salePrice) {
      alert('Please fill required product fields');
      return;
    }

    const salePrice = parseFloat(productEntry.salePrice);
    const quantity = parseFloat(productEntry.quantity);
    const discountValue = parseFloat(productEntry.discountValue) || 0;
    const discountType = productEntry.discountType;
    const cgstRate = parseFloat(productEntry.cgst) || 0;
    const sgstRate = parseFloat(productEntry.sgst) || 0;
    const igstRate = parseFloat(productEntry.igst) || 0;
    
    const saleAmount = salePrice * quantity;
    const discountAmount = calculateDiscount(saleAmount, discountValue, discountType);
    const taxableAmount = saleAmount - discountAmount;
    
    const gstAmounts = calculateGSTAmounts(taxableAmount, cgstRate, sgstRate, igstRate);

    const newProduct = {
      id: Date.now(),
      ...productEntry,
      salePrice,
      quantity,
      discountValue,
      discountType,
      saleAmount,
      discountAmount,
      taxableAmount,
      cgst: cgstRate,
      sgst: sgstRate,
      igst: igstRate,
      ...gstAmounts,
      totalAmount: taxableAmount + gstAmounts.cgstAmount + gstAmounts.sgstAmount + gstAmounts.igstAmount
    };

    setProductList(prev => [...prev, newProduct]);
    
    // Reset product entry form
    setProductEntry({
      category: '',
      product: '',
      batch: '',
      rack: '',
      quantity: '',
      units: '',
      discountValue: 0,
      discountType: 'Percentage',
      cgst: 0,
      sgst: 0,
      igst: 0,
      salePrice: '',
    });
  };

  // Remove product from list
  const removeProduct = (id) => {
    setProductList(prev => prev.filter(item => item.id !== id));
  };

  // Handle sale submission
  const handleSaleSubmit = (e) => {
    e.preventDefault();
    if (productList.length === 0) {
      alert('Please add at least one product to the list');
      return;
    }
    // Here you would typically send the data to your backend
    console.log('Sale Data:', { ...formData, products: productList });
    alert('Sale submitted successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Sale Entry</h1>
          <p className="text-gray-600 mt-1">Create new sale transaction</p>
        </div>

        <form onSubmit={handleSaleSubmit} className="p-6">
          {/* Customer Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Store *
              </label>
              <select
                name="fromStore"
                value={formData.fromStore}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Store</option>
                {stores.map(store => (
                  <option key={store} value={store}>{store}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name *
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact No *
              </label>
              <input
                type="tel"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sale Date *
              </label>
              <input
                type="date"
                name="saleDate"
                value={formData.saleDate}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* GST Type Field - Changed to radio buttons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GST Type *
              </label>
              <div className="space-y-2">
                {gstTypes.map(type => (
                  <div key={type.value} className="flex items-center">
                    <input
                      type="radio"
                      id={type.value}
                      name="gstType"
                      value={type.value}
                      checked={formData.gstType === type.value}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor={type.value} className="ml-2 text-sm text-gray-700">
                      {type.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* GST Number Field - Conditionally rendered */}
            {formData.gstType !== 'nogst' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GST Number *
                </label>
                <input
                  type="text"
                  name="gstNo"
                  value={formData.gstNo}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="2"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shipping Address
              </label>
              <textarea
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleInputChange}
                rows="2"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Product Entry Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Product List (Enter Product details and press "Add Product To List" to add product)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={productEntry.category}
                  onChange={handleProductChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product *</label>
                <input
                  type="text"
                  name="product"
                  value={productEntry.product}
                  onChange={handleProductChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
                <input
                  type="text"
                  name="batch"
                  value={productEntry.batch}
                  onChange={handleProductChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rack</label>
                <input
                  type="text"
                  name="rack"
                  value={productEntry.rack}
                  onChange={handleProductChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  value={productEntry.quantity}
                  onChange={handleProductChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Units</label>
                <select
                  name="units"
                  value={productEntry.units}
                  onChange={handleProductChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Select Unit</option>
                  {unitOptions.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price *</label>
                <input
                  type="number"
                  name="salePrice"
                  value={productEntry.salePrice}
                  onChange={handleProductChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  required
                  step="0.01"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                <select
                  name="discountType"
                  value={productEntry.discountType}
                  onChange={handleProductChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  {discountTypeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount {productEntry.discountType === 'Percentage' ? '(%)' : '(Cash)'}
                </label>
                <input
                  type="number"
                  name="discountValue"
                  value={productEntry.discountValue}
                  onChange={handleProductChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  step="0.01"
                  min="0"
                />
              </div>
             
            </div>

            <button
              type="button"
              onClick={addProductToList}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Product To List
            </button>
          </div>

          {/* Product List Table */}
          {productList.length > 0 && (
            <div className="mb-8 overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Product</th>
                    <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Batch</th>
                    <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Quantity</th>
                    <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Units</th>
                    <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Sale Price</th>
                    <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Discount Type</th>
                    <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Discount</th>
                    <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">CGST</th>
                    <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">SGST</th>
                    <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">IGST</th>
                    <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Total Amount</th>
                    <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {productList.map(product => (
                    <tr key={product.id}>
                      <td className="px-4 py-2 border-b text-sm">{product.product}</td>
                      <td className="px-4 py-2 border-b text-sm">{product.batch}</td>
                      <td className="px-4 py-2 border-b text-sm">{product.quantity}</td>
                      <td className="px-4 py-2 border-b text-sm">{product.units}</td>
                      <td className="px-4 py-2 border-b text-sm">${product.salePrice.toFixed(2)}</td>
                      <td className="px-4 py-2 border-b text-sm">{product.discountType}</td>
                      <td className="px-4 py-2 border-b text-sm">
                        {product.discountType === 'Percentage' 
                          ? `${product.discountValue}%` 
                          : `$${product.discountValue.toFixed(2)}`
                        }
                      </td>
                      <td className="px-4 py-2 border-b text-sm">
                        {product.cgst > 0 ? `${product.cgst}% ($${product.cgstAmount.toFixed(2)})` : '-'}
                      </td>
                      <td className="px-4 py-2 border-b text-sm">
                        {product.sgst > 0 ? `${product.sgst}% ($${product.sgstAmount.toFixed(2)})` : '-'}
                      </td>
                      <td className="px-4 py-2 border-b text-sm">
                        {product.igst > 0 ? `${product.igst}% ($${product.igstAmount.toFixed(2)})` : '-'}
                      </td>
                      <td className="px-4 py-2 border-b text-sm font-semibold">
                        ${product.totalAmount.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 border-b text-sm">
                        <button
                          type="button"
                          onClick={() => removeProduct(product.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
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

          {/* Sale Summary Section */}
          {productList.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sale Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gross Price</label>
                  <input
                    type="text"
                    value={`$${formData.grossPrice.toFixed(2)}`}
                    readOnly
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Discount</label>
                  <input
                    type="text"
                    value={`$${formData.totalDiscount.toFixed(2)}`}
                    readOnly
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
                  />
                </div>
                {formData.gstType !== 'nogst' && (
                  <>
                    {formData.gstType === 'intrastate' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Total CGST</label>
                          <input
                            type="text"
                            value={`$${formData.cgstTotal.toFixed(2)}`}
                            readOnly
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Total SGST</label>
                          <input
                            type="text"
                            value={`$${formData.sgstTotal.toFixed(2)}`}
                            readOnly
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
                          />
                        </div>
                      </>
                    )}
                    {formData.gstType === 'interstate' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Total IGST</label>
                        <input
                          type="text"
                          value={`$${formData.igstTotal.toFixed(2)}`}
                          readOnly
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
                        />
                      </div>
                    )}
                  </>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Net Price</label>
                  <input
                    type="text"
                    value={`$${formData.netPrice.toFixed(2)}`}
                    readOnly
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Payment Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paid Amount *
              </label>
              <input
                type="number"
                name="paidAmount"
                value={formData.paidAmount}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Account *
              </label>
              <select
                name="toAccount"
                value={formData.toAccount}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Account</option>
                {accounts.map(account => (
                  <option key={account} value={account}>{account}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end border-t pt-6">
            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors font-medium text-lg"
            >
              Complete Sale
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaleEntry;