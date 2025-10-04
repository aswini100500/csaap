import React, { useState } from 'react';

const PurchaseEntry = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    billNo: '',
    toStore: '',
    supplierName: '',
    contactNo: '',
    supplierGST: '',
    storeGST: '',
    gstType: 'NoGST',
    purchaseDate: '',
    discount: 0,
    netPrice: 0,
    paidAmount: 0,
    toAccount: ''
  });

  // State for stores list
  const [stores, setStores] = useState([
    {
      id: 1,
      name: 'Main Store',
      address: '123 Main Street, City',
      gst: 'GST123456789',
      location: 'City Center',
      mobile: '9876543210',
      alternateMobile: '9876543211'
    },
    {
      id: 2,
      name: 'Branch Store 1',
      address: '456 Branch Road, Town',
      gst: 'GST987654321',
      location: 'Suburb',
      mobile: '9876543222',
      alternateMobile: '9876543223'
    }
  ]);
  
  // State for suppliers list
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: 'ABC Suppliers',
      email: 'abc@suppliers.com',
      phone: '9876543200',
      alternatePhone: '9876543201',
      gst: 'GST111111111'
    },
    {
      id: 2,
      name: 'XYZ Traders',
      email: 'xyz@traders.com',
      phone: '9876543300',
      alternatePhone: '9876543301',
      gst: 'GST222222222'
    }
  ]);

  // State for add store form visibility
  const [showAddStoreForm, setShowAddStoreForm] = useState(false);
  const [newStore, setNewStore] = useState({
    name: '',
    address: '',
    gst: '',
    location: '',
    mobile: '',
    alternateMobile: ''
  });

  // State for add supplier form visibility
  const [showAddSupplierForm, setShowAddSupplierForm] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    email: '',
    phone: '',
    alternatePhone: '',
    gst: ''
  });

  // State for product entry
  const [product, setProduct] = useState({
    category: '',
    product: '',
    batch: '',
    quantity: 0,
    units: '',
    pieces: 0,
    rack: '',
    mrp: 0,
    purchaseUnitPrice: 0,
    saleUnitPrice: 0,
    cgst: 0,
    sgst: 0,
    igst: 0,
    totalPrice: 0
  });

  // State for product list
  const [productList, setProductList] = useState([]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle store input changes
  const handleStoreChange = (e) => {
    const { name, value } = e.target;
    setNewStore({
      ...newStore,
      [name]: value
    });
  };

  // Handle supplier input changes
  const handleSupplierChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier({
      ...newSupplier,
      [name]: value
    });
  };

  // Handle product input changes
  const handleProductChange = (e) => {
    const { name, value, type } = e.target;
    
    const numericFields = [
      'quantity', 'pieces', 'mrp', 'purchaseUnitPrice', 
      'saleUnitPrice', 'cgst', 'sgst', 'igst', 'totalPrice'
    ];
    
    const processedValue = numericFields.includes(name) 
      ? parseFloat(value) || 0 
      : value;
    
    setProduct({
      ...product,
      [name]: processedValue
    });
  };

  // Add new store
  const handleAddStore = (e) => {
    e.preventDefault();
    if (newStore.name.trim() && !stores.find(store => store.name === newStore.name.trim())) {
      const store = {
        id: Date.now(),
        ...newStore
      };
      
      setStores([...stores, store]);
      setFormData({
        ...formData,
        toStore: store.name,
        storeGST: store.gst
      });
      setNewStore({
        name: '',
        address: '',
        gst: '',
        location: '',
        mobile: '',
        alternateMobile: ''
      });
      setShowAddStoreForm(false);
    }
  };

  // Cancel adding new store
  const handleCancelAddStore = () => {
    setNewStore({
      name: '',
      address: '',
      gst: '',
      location: '',
      mobile: '',
      alternateMobile: ''
    });
    setShowAddStoreForm(false);
  };

  // Add new supplier
  const handleAddSupplier = (e) => {
    e.preventDefault();
    if (newSupplier.name.trim() && !suppliers.find(supplier => supplier.name === newSupplier.name.trim())) {
      const supplier = {
        id: Date.now(),
        ...newSupplier
      };
      
      setSuppliers([...suppliers, supplier]);
      setFormData({
        ...formData,
        supplierName: supplier.name,
        contactNo: supplier.phone,
        supplierGST: supplier.gst
      });
      setNewSupplier({
        name: '',
        email: '',
        phone: '',
        alternatePhone: '',
        gst: ''
      });
      setShowAddSupplierForm(false);
    }
  };

  // Cancel adding new supplier
  const handleCancelAddSupplier = () => {
    setNewSupplier({
      name: '',
      email: '',
      phone: '',
      alternatePhone: '',
      gst: ''
    });
    setShowAddSupplierForm(false);
  };

  // Handle store selection
  const handleStoreSelect = (e) => {
    const selectedStore = stores.find(store => store.name === e.target.value);
    setFormData({
      ...formData,
      toStore: e.target.value,
      storeGST: selectedStore ? selectedStore.gst : ''
    });
  };

  // Handle supplier selection
  const handleSupplierSelect = (e) => {
    const selectedSupplier = suppliers.find(supplier => supplier.name === e.target.value);
    setFormData({
      ...formData,
      supplierName: e.target.value,
      contactNo: selectedSupplier ? selectedSupplier.phone : '',
      supplierGST: selectedSupplier ? selectedSupplier.gst : ''
    });
  };

  // Add product to list
  const addProductToList = () => {
    const totalPrice = product.quantity * product.purchaseUnitPrice;
    const productWithTotal = {
      ...product,
      totalPrice: totalPrice
    };
    
    setProductList([...productList, productWithTotal]);
    
    // Reset product form
    setProduct({
      category: '',
      product: '',
      batch: '',
      quantity: 0,
      units: '',
      pieces: 0,
      rack: '',
      mrp: 0,
      purchaseUnitPrice: 0,
      saleUnitPrice: 0,
      cgst: 0,
      sgst: 0,
      igst: 0,
      totalPrice: 0
    });
  };

  // Remove product from list
  const removeProduct = (index) => {
    const newList = [...productList];
    newList.splice(index, 1);
    setProductList(newList);
  };

  // Calculate totals
  const calculateTotals = () => {
    let totalNetPrice = 0;
    let totalCGST = 0;
    let totalSGST = 0;
    let totalIGST = 0;

    productList.forEach(item => {
      totalNetPrice += item.totalPrice || 0;
      totalCGST += item.cgst || 0;
      totalSGST += item.sgst || 0;
      totalIGST += item.igst || 0;
    });

    totalNetPrice -= parseFloat(formData.discount) || 0;

    return {
      netPrice: totalNetPrice,
      cgst: totalCGST,
      sgst: totalSGST,
      igst: totalIGST
    };
  };

  const totals = calculateTotals();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...formData,
      products: productList,
      netPrice: totals.netPrice
    });
    alert('Purchase entry saved successfully!');
  };

  // Helper function to safely format numbers
  const formatNumber = (value, decimals = 2) => {
    const num = parseFloat(value);
    return isNaN(num) ? '0.00' : num.toFixed(decimals);
  };

  // Function to render GST fields based on selected GST type
  const renderGSTFields = () => {
    switch(formData.gstType) {
      case 'NoGST':
        return null;
      
      case 'IntraState':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">CGST (%)</label>
              <input
                type="number"
                step="0.1"
                name="cgst"
                value={product.cgst}
                onChange={handleProductChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">SGST (%)</label>
              <input
                type="number"
                step="0.1"
                name="sgst"
                value={product.sgst}
                onChange={handleProductChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </>
        );
      
      case 'Unregistered':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700">IGST (%)</label>
            <input
              type="number"
              step="0.1"
              name="igst"
              value={product.igst}
              onChange={handleProductChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-800">Purchase Entry</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Basic Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Bill No</label>
            <input
              type="text"
              name="billNo"
              value={formData.billNo}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">To Store</label>
            
            {showAddStoreForm ? (
              // Add Store Form (modal style)
              <div className="bg-gray-100 p-4 rounded-md border border-gray-300">
                <h3 className="font-medium mb-3">Add New Store</h3>
                <div className="grid grid-cols-1 gap-2 mb-3">
                  <input
                    type="text"
                    name="name"
                    value={newStore.name}
                    onChange={handleStoreChange}
                    className="border border-gray-300 rounded-md p-2 text-sm"
                    placeholder="Store Name"
                    autoFocus
                  />
                  <input
                    type="text"
                    name="address"
                    value={newStore.address}
                    onChange={handleStoreChange}
                    className="border border-gray-300 rounded-md p-2 text-sm"
                    placeholder="Address"
                  />
                  <input
                    type="text"
                    name="gst"
                    value={newStore.gst}
                    onChange={handleStoreChange}
                    className="border border-gray-300 rounded-md p-2 text-sm"
                    placeholder="GST Number"
                  />
                  <input
                    type="text"
                    name="location"
                    value={newStore.location}
                    onChange={handleStoreChange}
                    className="border border-gray-300 rounded-md p-2 text-sm"
                    placeholder="Location"
                  />
                  <input
                    type="text"
                    name="mobile"
                    value={newStore.mobile}
                    onChange={handleStoreChange}
                    className="border border-gray-300 rounded-md p-2 text-sm"
                    placeholder="Mobile Number"
                  />
                  <input
                    type="text"
                    name="alternateMobile"
                    value={newStore.alternateMobile}
                    onChange={handleStoreChange}
                    className="border border-gray-300 rounded-md p-2 text-sm"
                    placeholder="Alternate Mobile"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={handleAddStore}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 text-sm"
                  >
                    Add Store
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelAddStore}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Store Selection Dropdown with Add Button
              <div className="flex space-x-2">
                <select
                  name="toStore"
                  value={formData.toStore}
                  onChange={handleStoreSelect}
                  className="flex-1 border border-gray-300 rounded-md p-2"
                  required
                >
                  <option value="">Select a store</option>
                  {stores.map((store) => (
                    <option key={store.id} value={store.name}>{store.name}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setShowAddStoreForm(true)}
                  className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 flex items-center"
                  title="Add new store"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Supplier Name</label>
            
            {showAddSupplierForm ? (
              // Add Supplier Form (modal style)
              <div className="bg-gray-100 p-4 rounded-md border border-gray-300">
                <h3 className="font-medium mb-3">Add New Supplier</h3>
                <div className="grid grid-cols-1 gap-2 mb-3">
                  <input
                    type="text"
                    name="name"
                    value={newSupplier.name}
                    onChange={handleSupplierChange}
                    className="border border-gray-300 rounded-md p-2 text-sm"
                    placeholder="Supplier Name"
                    autoFocus
                  />
                  <input
                    type="email"
                    name="email"
                    value={newSupplier.email}
                    onChange={handleSupplierChange}
                    className="border border-gray-300 rounded-md p-2 text-sm"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={newSupplier.phone}
                    onChange={handleSupplierChange}
                    className="border border-gray-300 rounded-md p-2 text-sm"
                    placeholder="Phone"
                  />
                  <input
                    type="text"
                    name="alternatePhone"
                    value={newSupplier.alternatePhone}
                    onChange={handleSupplierChange}
                    className="border border-gray-300 rounded-md p-2 text-sm"
                    placeholder="Alternate Phone"
                  />
                  <input
                    type="text"
                    name="gst"
                    value={newSupplier.gst}
                    onChange={handleSupplierChange}
                    className="border border-gray-300 rounded-md p-2 text-sm"
                    placeholder="GST Number"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={handleAddSupplier}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 text-sm"
                  >
                    Add Supplier
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelAddSupplier}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Supplier Selection Dropdown with Add Button
              <div className="flex space-x-2">
                <select
                  name="supplierName"
                  value={formData.supplierName}
                  onChange={handleSupplierSelect}
                  className="flex-1 border border-gray-300 rounded-md p-2"
                  required
                >
                  <option value="">Select a supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.name}>{supplier.name}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setShowAddSupplierForm(true)}
                  className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 flex items-center"
                  title="Add new supplier"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact No</label>
            <input
              type="text"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Supplier GST</label>
            <input
              type="text"
              name="supplierGST"
              value={formData.supplierGST}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Store GST</label>
            <input
              type="text"
              name="storeGST"
              value={formData.storeGST}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">GST Type</label>
            <select
              name="gstType"
              value={formData.gstType}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="NoGST">No GST</option>
              <option value="IntraState">Intra State (CGST/SGST)</option>
              <option value="Unregistered">Inter State (IGST)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Purchase Date</label>
            <input
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
        </div>

        {/* Product Entry Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Product List</h2>
          <p className="text-sm text-gray-600 mb-4">Enter Product details and press "Add Product To List" to add product</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleProductChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Product</label>
              <input
                type="text"
                name="product"
                value={product.product}
                onChange={handleProductChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Batch</label>
              <input
                type="text"
                name="batch"
                value={product.batch}
                onChange={handleProductChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleProductChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Units</label>
              <input
                type="text"
                name="units"
                value={product.units}
                onChange={handleProductChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Rack</label>
              <input
                type="text"
                name="rack"
                value={product.rack}
                onChange={handleProductChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">MRP</label>
              <input
                type="number"
                step="0.01"
                name="mrp"
                value={product.mrp}
                onChange={handleProductChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Purchase Unit Price</label>
              <input
                type="number"
                step="0.01"
                name="purchaseUnitPrice"
                value={product.purchaseUnitPrice}
                onChange={handleProductChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Sale Unit Price</label>
              <input
                type="number"
                step="0.01"
                name="saleUnitPrice"
                value={product.saleUnitPrice}
                onChange={handleProductChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            
            {/* Dynamic GST Fields */}
            {renderGSTFields()}
          </div>
          
          <button
            type="button"
            onClick={addProductToList}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Add Product To List
          </button>
        </div>

        {/* Product List Table */}
        {productList.length > 0 && (
          <div className="mb-6 overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Product</th>
                  <th className="px-4 py-2">Batch</th>
                  <th className="px-4 py-2">Rack</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Units</th>
                  <th className="px-4 py-2">MRP</th>
                  <th className="px-4 py-2">Purchase Price</th>
                  <th className="px-4 py-2">Sale Price</th>
                  {formData.gstType === 'IntraState' && (
                    <>
                      <th className="px-4 py-2">CGST</th>
                      <th className="px-4 py-2">SGST</th>
                    </>
                  )}
                  {formData.gstType === 'Unregistered' && (
                    <th className="px-4 py-2">IGST</th>
                  )}
                  <th className="px-4 py-2">Total Price</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="border px-4 py-2">{item.product}</td>
                    <td className="border px-4 py-2">{item.batch}</td>
                    <td className="border px-4 py-2">{item.rack}</td>
                    <td className="border px-4 py-2">{item.quantity}</td>
                    <td className="border px-4 py-2">{item.units}</td>
                    <td className="border px-4 py-2">{formatNumber(item.mrp)}</td>
                    <td className="border px-4 py-2">{formatNumber(item.purchaseUnitPrice)}</td>
                    <td className="border px-4 py-2">{formatNumber(item.saleUnitPrice)}</td>
                    {formData.gstType === 'IntraState' && (
                      <>
                        <td className="border px-4 py-2">{formatNumber(item.cgst, 1)}%</td>
                        <td className="border px-4 py-2">{formatNumber(item.sgst, 1)}%</td>
                      </>
                    )}
                    {formData.gstType === 'Unregistered' && (
                      <td className="border px-4 py-2">{formatNumber(item.igst, 1)}%</td>
                    )}
                    <td className="border px-4 py-2">{formatNumber(item.totalPrice)}</td>
                    <td className="border px-4 py-2">
                      <button
                        type="button"
                        onClick={() => removeProduct(index)}
                        className="text-red-500 hover:text-red-700"
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

        {/* Totals Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {formData.gstType === 'IntraState' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">CGST</label>
                <input
                  type="number"
                  value={totals.cgst}
                  readOnly
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">SGST</label>
                <input
                  type="number"
                  value={totals.sgst}
                  readOnly
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                />
              </div>
            </>
          )}
          
          {formData.gstType === 'Unregistered' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">IGST</label>
              <input
                type="number"
                value={totals.igst}
                readOnly
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Discount</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Net Price</label>
            <input
              type="number"
              value={totals.netPrice}
              readOnly
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100 font-bold"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Paid Amount</label>
            <input
              type="number"
              name="paidAmount"
              value={formData.paidAmount}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">To Account</label>
            <input
              type="text"
              name="toAccount"
              value={formData.toAccount}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Save Purchase Entry
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseEntry;