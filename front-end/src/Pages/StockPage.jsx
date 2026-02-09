import React, { useState } from 'react';

const StockPage = () => {
  // Sample initial data
  const initialStock = [
    {
      id: 1,
      itemName: 'Cement',
      category: 'Construction Material',
      quantity: 500,
      unit: 'bags',
      purchaseDate: '2023-05-15',
      purchaseCost: 35000,
      utilized: 320,
      balance: 180,
      utilization: [
        { project: 'Tower A - Flat 101', quantity: 50, date: '2023-05-20' },
        { project: 'Tower B - Common Area', quantity: 120, date: '2023-05-25' },
        { project: 'Tower C - Flat 205', quantity: 150, date: '2023-06-01' }
      ],
      status: 'In Stock'
    },
    {
      id: 2,
      itemName: 'Steel Rods',
      category: 'Construction Material',
      quantity: 200,
      unit: 'tons',
      purchaseDate: '2023-06-10',
      purchaseCost: 1200000,
      utilized: 150,
      balance: 50,
      utilization: [
        { project: 'Tower A - Structure', quantity: 80, date: '2023-06-15' },
        { project: 'Tower B - Structure', quantity: 70, date: '2023-06-20' }
      ],
      status: 'Low Stock'
    },
    {
      id: 3,
      itemName: 'Floor Tiles',
      category: 'Finishing Material',
      quantity: 1000,
      unit: 'boxes',
      purchaseDate: '2023-07-05',
      purchaseCost: 250000,
      utilized: 650,
      balance: 350,
      utilization: [
        { project: 'Tower A - All Flats', quantity: 400, date: '2023-07-10' },
        { project: 'Common - Lobby Area', quantity: 150, date: '2023-07-15' },
        { project: 'Tower B - Flat 301', quantity: 100, date: '2023-07-20' }
      ],
      status: 'In Stock'
    },
    {
      id: 4,
      itemName: 'Paint',
      category: 'Finishing Material',
      quantity: 300,
      unit: 'cans',
      purchaseDate: '2023-08-12',
      purchaseCost: 180000,
      utilized: 300,
      balance: 0,
      utilization: [
        { project: 'Tower A - Interior', quantity: 150, date: '2023-08-15' },
        { project: 'Tower B - Interior', quantity: 100, date: '2023-08-20' },
        { project: 'Common - Exterior', quantity: 50, date: '2023-08-25' }
      ],
      status: 'Out of Stock'
    },
    {
      id: 5,
      itemName: 'Electrical Wires',
      category: 'Electrical',
      quantity: 2000,
      unit: 'meters',
      purchaseDate: '2023-09-01',
      purchaseCost: 150000,
      utilized: 1200,
      balance: 800,
      utilization: [
        { project: 'Tower A - Wiring', quantity: 600, date: '2023-09-05' },
        { project: 'Tower B - Wiring', quantity: 400, date: '2023-09-10' },
        { project: 'Common - Lighting', quantity: 200, date: '2023-09-15' }
      ],
      status: 'In Stock'
    }
  ];

  // State for stock and search
  const [stock, setStock] = useState(initialStock);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUtilizationForm, setShowUtilizationForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // State for new stock form
  const [newStock, setNewStock] = useState({
    itemName: '',
    category: '',
    quantity: '',
    unit: '',
    purchaseDate: '',
    purchaseCost: ''
  });

  // State for utilization form
  const [utilization, setUtilization] = useState({
    project: '',
    quantity: '',
    date: ''
  });

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter stock based on search term
  const filteredStock = stock.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStock({
      ...newStock,
      [name]: value
    });
  };

  // Handle utilization form input changes
  const handleUtilizationChange = (e) => {
    const { name, value } = e.target;
    setUtilization({
      ...utilization,
      [name]: value
    });
  };

  // Handle stock form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = stock.length > 0 ? Math.max(...stock.map(s => s.id)) + 1 : 1;
    
    setStock([
      ...stock,
      {
        id: newId,
        itemName: newStock.itemName,
        category: newStock.category,
        quantity: parseFloat(newStock.quantity),
        unit: newStock.unit,
        purchaseDate: newStock.purchaseDate,
        purchaseCost: parseFloat(newStock.purchaseCost),
        utilized: 0,
        balance: parseFloat(newStock.quantity),
        utilization: [],
        status: 'In Stock'
      }
    ]);
    
    // Reset form
    setNewStock({
      itemName: '',
      category: '',
      quantity: '',
      unit: '',
      purchaseDate: '',
      purchaseCost: ''
    });
    
    setShowAddForm(false);
  };

  // Handle utilization form submission
  const handleUtilizationSubmit = (e) => {
    e.preventDefault();
    const utilizedQty = parseFloat(utilization.quantity);
    
    const updatedStock = stock.map(item => {
      if (item.id === selectedItem.id) {
        const newUtilized = item.utilized + utilizedQty;
        const newBalance = item.quantity - newUtilized;
        
        let newStatus = item.status;
        if (newBalance === 0) {
          newStatus = 'Out of Stock';
        } else if (newBalance < item.quantity * 0.2) {
          newStatus = 'Low Stock';
        }
        
        return {
          ...item,
          utilized: newUtilized,
          balance: newBalance,
          status: newStatus,
          utilization: [
            ...item.utilization,
            {
              project: utilization.project,
              quantity: utilizedQty,
              date: utilization.date
            }
          ]
        };
      }
      return item;
    });
    
    setStock(updatedStock);
    setShowUtilizationForm(false);
    setUtilization({
      project: '',
      quantity: '',
      date: ''
    });
  };

  // Open utilization form for a specific item
  const openUtilizationForm = (item) => {
    setSelectedItem(item);
    setShowUtilizationForm(true);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    let bgColor = '';
    switch(status) {
      case 'In Stock':
        bgColor = 'bg-green-100 text-green-800';
        break;
      case 'Low Stock':
        bgColor = 'bg-yellow-100 text-yellow-800';
        break;
      case 'Out of Stock':
        bgColor = 'bg-red-100 text-red-800';
        break;
      default:
        bgColor = 'bg-gray-100 text-gray-800';
    }
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Stock Management</h1>
      
      {/* Search and Add Button Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search stock by item name, category or status..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-0 top-0 h-full px-4 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Stock
        </button>
      </div>
      
      {/* Add Stock Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Stock Item</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                <input
                  type="text"
                  name="itemName"
                  value={newStock.itemName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={newStock.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="Construction Material">Construction Material</option>
                  <option value="Finishing Material">Finishing Material</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={newStock.quantity}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                <select
                  name="unit"
                  value={newStock.unit}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Unit</option>
                  <option value="bags">Bags</option>
                  <option value="tons">Tons</option>
                  <option value="boxes">Boxes</option>
                  <option value="cans">Cans</option>
                  <option value="meters">Meters</option>
                  <option value="pieces">Pieces</option>
                  <option value="liters">Liters</option>
                  <option value="kg">Kilograms</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date</label>
                <input
                  type="date"
                  name="purchaseDate"
                  value={newStock.purchaseDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Cost</label>
                <input
                  type="number"
                  name="purchaseCost"
                  value={newStock.purchaseCost}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Stock
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Utilization Form */}
      {showUtilizationForm && selectedItem && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Utilize Stock - {selectedItem.itemName}</h2>
          <form onSubmit={handleUtilizationSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project/Area</label>
                <input
                  type="text"
                  name="project"
                  value={utilization.project}
                  onChange={handleUtilizationChange}
                  required
                  placeholder="e.g., Tower A - Flat 101 or Common Area"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={utilization.quantity}
                  onChange={handleUtilizationChange}
                  required
                  min="0"
                  max={selectedItem.balance}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Available: {selectedItem.balance} {selectedItem.unit}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={utilization.date}
                  onChange={handleUtilizationChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowUtilizationForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Record Utilization
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Stock Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilized</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Cost</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStock.length > 0 ? (
              filteredStock.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{item.itemName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.quantity} {item.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.utilized} {item.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.balance} {item.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(item.purchaseCost)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => openUtilizationForm(item)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      disabled={item.balance === 0}
                    >
                      Utilize
                    </button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
                  No stock items found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Utilization History Modal */}
      {selectedItem && !showUtilizationForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative bg-white p-6 rounded-lg shadow-md max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Utilization History - {selectedItem.itemName}</h2>
              <button 
                onClick={() => setSelectedItem(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <p><span className="font-medium">Total Quantity:</span> {selectedItem.quantity} {selectedItem.unit}</p>
              <p><span className="font-medium">Utilized:</span> {selectedItem.utilized} {selectedItem.unit}</p>
              <p><span className="font-medium">Balance:</span> {selectedItem.balance} {selectedItem.unit}</p>
            </div>
            
            <div className="overflow-y-auto max-h-96">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project/Area</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedItem.utilization.map((use, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{use.project}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{use.quantity} {selectedItem.unit}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{use.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Summary Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Total Items</h3>
          <p className="text-2xl font-bold text-blue-600">{stock.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Total Inventory Value</h3>
          <p className="text-2xl font-bold text-purple-600">
            {formatCurrency(stock.reduce((total, item) => total + (item.purchaseCost / item.quantity * item.balance), 0))}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Low Stock Items</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {stock.filter(item => item.status === 'Low Stock').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Out of Stock</h3>
          <p className="text-2xl font-bold text-red-600">
            {stock.filter(item => item.status === 'Out of Stock').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StockPage;