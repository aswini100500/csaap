import React, { useState } from 'react';
import jsPDF from 'jspdf';

const StockEntry = () => {
  // Sample data
  const stores = ['Sarita Vihar', 'Govindpuri Extension', 'Kalkaji', 'Nehru Place'];
  const [categories, setCategories] = useState(['Electronics', 'Components', 'Batteries', 'Sensors']);
  const [racks, setRacks] = useState(['16', '17', '18', '19', '20']);
  const products = [
    'UNO Dip HQ', 
    '1s to 8s Battery Level Indicator', 
    'ACS 712 5A', 
    'PAM8403',
    'Mlx90614',
    '2xcellholder',
    'Esp32 Cam Module',
    'Forwarding and Shipping Charges',
    'CR2032',
    '0.91" I2C Oled 4 Pin'
  ];
  const units = ['Pieces', 'Boxes', 'Packets', 'Units'];

  // Sample stock entries
  const stockEntries = [
    { store: 'Sarita Vihar', product: 'UNO Dip HQ', batch: 'Import', rack: '16', quantity: '40', units: 'Pieces', purchaseAmount: '0', salePrice: '310' },
    { store: 'Govindpuri Extension', product: '1s to 8s Battery Level Indicator', batch: 'O', rack: '16', quantity: '5', units: 'Pieces', purchaseAmount: '0', salePrice: '66' },
    { store: 'Govindpuri Extension', product: 'ACS 712 5A', batch: 'O', rack: '16', quantity: '125', units: 'Pieces', purchaseAmount: '0', salePrice: '66' },
    { store: 'Sarita Vihar', product: 'PAM8403', batch: 'Import', rack: '16', quantity: '500', units: 'Pieces', purchaseAmount: '0', salePrice: '12.5' },
    { store: 'Govindpuri Extension', product: 'Mlx90614', batch: 'O', rack: '16', quantity: '5', units: 'Pieces', purchaseAmount: '0', salePrice: '435' },
    { store: 'Govindpuri Extension', product: '2xcellholder', batch: 'O', rack: '16', quantity: '500', units: 'Pieces', purchaseAmount: '0', salePrice: '5.75' },
    { store: 'Govindpuri Extension', product: 'Esp32 Cam Module', batch: 'O', rack: '16', quantity: '23', units: 'Pieces', purchaseAmount: '0', salePrice: '430' },
    { store: 'Sarita Vihar', product: 'Forwarding and Shipping Charges', batch: 'O', rack: '16', quantity: '130', units: 'Pieces', purchaseAmount: '0', salePrice: '130' },
    { store: 'Sarita Vihar', product: 'CR2032', batch: 'Purchase', rack: '16', quantity: '25', units: 'Pieces', purchaseAmount: '0', salePrice: '5' },
    { store: 'Sarita Vihar', product: '0.91" I2C Oled 4 Pin', batch: 'Purchase', rack: '16', quantity: '2330', units: 'Pieces', purchaseAmount: '0', salePrice: '95' },
  ];

  // State for form
  const [formData, setFormData] = useState({
    store: '',
    category: '',
    product: '',
    batch: '',
    rack: '',
    mrp: '',
    salePrice: '',
    quantity: '',
    units: '',
  
  });

  // State for adding new items
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddRack, setShowAddRack] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newRack, setNewRack] = useState('');

  // State for CSV upload
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [csvFile, setCsvFile] = useState(null);

  // State for search and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    alert('Stock entry added successfully!');
    // Reset form
    setFormData({
      store: '',
      category: '',
      product: '',
      batch: '',
      rack: '',
      mrp: '',
      salePrice: '',
      quantity: '',
      units: '',
   
    });
  };

  // Add new category
  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setFormData({ ...formData, category: newCategory.trim() });
      setNewCategory('');
      setShowAddCategory(false);
    }
  };

  // Add new rack
  const handleAddRack = () => {
    if (newRack.trim() && !racks.includes(newRack.trim())) {
      setRacks([...racks, newRack.trim()]);
      setFormData({ ...formData, rack: newRack.trim() });
      setNewRack('');
      setShowAddRack(false);
    }
  };

  // Download CSV template
  const downloadCSVTemplate = () => {
    const headers = ['Store', 'Category', 'Product', 'Batch', 'Rack', 'MRP', 'Sale Price', 'Quantity', 'Units', 'Pieces'];
    const csvContent = headers.join(',') + '\n\n' +
      'Example:,Electronics,UNO Dip HQ,Import,16,300,310,40,Pieces,40\n' +
      'Example:,Components,ACS 712 5A,Purchase,17,60,66,125,Pieces,125';
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'stock_entry_template.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Handle CSV file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCsvFile(file);
    }
  };

  // Process uploaded CSV
  const processCSVUpload = () => {
    if (!csvFile) {
      alert('Please select a CSV file first.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const csvText = e.target.result;
      // Here you would process the CSV data and add to your database
      console.log('CSV Content:', csvText);
      alert('CSV file processed successfully!');
      setShowUploadForm(false);
      setCsvFile(null);
      
      // Reset file input
      const fileInput = document.getElementById('csv-upload');
      if (fileInput) fileInput.value = '';
    };
    reader.readAsText(csvFile);
  };

  // Filter data based on search term
  const filteredData = stockEntries.filter(entry => 
    entry.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.batch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentEntries = filteredData.slice(startIndex, startIndex + entriesPerPage);

  // Download as CSV (for Excel)
  const downloadExcel = () => {
    const headers = ['Store', 'Product', 'Batch', 'Rack', 'Quantity', 'Units', 'Purchase Amount', 'Sale Price'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(entry => [
        entry.store,
        entry.product,
        entry.batch,
        entry.rack,
        entry.quantity,
        entry.units,
        entry.purchaseAmount,
        entry.salePrice
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'stock_entries.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Download as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Stock Entries', 10, 10);

    let y = 20;
    const headers = ['Store', 'Product', 'Batch', 'Rack', 'Quantity', 'Units', 'Purchase Amount', 'Sale Price'];
    doc.text(headers.join('   '), 10, y);
    y += 10;

    filteredData.forEach((entry) => {
      const row = [
        entry.store,
        entry.product,
        entry.batch,
        entry.rack,
        entry.quantity,
        entry.units,
        entry.purchaseAmount,
        entry.salePrice
      ].join('   ');
      doc.text(row, 10, y);
      y += 10;
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save('stock_entries.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Stock Entry</h1>
        
        {/* CSV Actions Buttons */}
        <div className="mb-6 flex space-x-4">
          <button 
            onClick={downloadCSVTemplate}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download CSV Format
          </button>
          <button 
            onClick={() => setShowUploadForm(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Upload CSV Format
          </button>
        </div>

        {/* CSV Upload Form */}
        {showUploadForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Upload CSV File</h3>
            <div className="mb-4">
              <input 
                type="file"
                id="csv-upload"
                accept=".csv"
                onChange={handleFileUpload}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <p className="text-sm text-gray-600 mt-2">
                Upload a CSV file with the correct format. Download the template for reference.
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => {
                  setShowUploadForm(false);
                  setCsvFile(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button 
                onClick={processCSVUpload}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Upload
              </button>
            </div>
          </div>
        )}
        
        {/* Stock Entry Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Stock Entry</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store</label>
              <select 
                name="store"
                value={formData.store}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Store</option>
                {stores.map(store => (
                  <option key={store} value={store}>{store}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              {!showAddCategory ? (
                <div className="flex">
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <button 
                    type="button"
                    onClick={() => setShowAddCategory(true)}
                    className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    title="Add New Category"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="flex">
                  <input 
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter new category"
                    className="w-full p-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                    autoFocus
                  />
                  <button 
                    type="button"
                    onClick={handleAddCategory}
                    className="bg-green-500 text-white p-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    title="Save Category"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setShowAddCategory(false);
                      setNewCategory('');
                    }}
                    className="bg-red-500 text-white p-2 rounded-r-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    title="Cancel"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
              <select 
                name="product"
                value={formData.product}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Product</option>
                {products.map(product => (
                  <option key={product} value={product}>{product}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
              <input 
                type="text"
                name="batch"
                value={formData.batch}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rack</label>
              {!showAddRack ? (
                <div className="flex">
                  <select 
                    name="rack"
                    value={formData.rack}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Rack</option>
                    {racks.map(rack => (
                      <option key={rack} value={rack}>{rack}</option>
                    ))}
                  </select>
                  <button 
                    type="button"
                    onClick={() => setShowAddRack(true)}
                    className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    title="Add New Rack"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="flex">
                  <input 
                    type="text"
                    value={newRack}
                    onChange={(e) => setNewRack(e.target.value)}
                    placeholder="Enter new rack"
                    className="w-full p-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                    autoFocus
                  />
                  <button 
                    type="button"
                    onClick={handleAddRack}
                    className="bg-green-500 text-white p-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    title="Save Rack"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setShowAddRack(false);
                      setNewRack('');
                    }}
                    className="bg-red-500 text-white p-2 rounded-r-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    title="Cancel"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">MRP</label>
              <input 
                type="number"
                name="mrp"
                value={formData.mrp}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
                step="0.01"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price</label>
              <input 
                type="number"
                name="salePrice"
                value={formData.salePrice}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
                step="0.01"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input 
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Units</label>
              <select 
                name="units"
                value={formData.units}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Units</option>
                {units.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
            
           
            
            <div className="md:col-span-2 lg:col-span-3 flex justify-end mt-4">
              <button 
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add Stock
              </button>
            </div>
          </form>
        </div>
        
        {/* Stock Entry List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Stock Entry List</h2>
            <div className="flex space-x-2">
              <button 
                onClick={downloadExcel}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Export to Excel
              </button>
              <button 
                onClick={downloadPDF}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Export to PDF
              </button>
            </div>
          </div>
          
          {/* Search Box */}
          <div className="mb-4">
            <input 
              type="text"
              placeholder="Search..."
              className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Stock Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rack</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sale Price</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentEntries.map((entry, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 whitespace-nowrap">{entry.store}</td>
                    <td className="px-4 py-3">{entry.product}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{entry.batch}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{entry.rack}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{entry.quantity}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{entry.units}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{entry.purchaseAmount}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{entry.salePrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, filteredData.length)} of {filteredData.length} entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === pageNum
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {totalPages > 5 && <span className="px-2 py-1">...</span>}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockEntry;