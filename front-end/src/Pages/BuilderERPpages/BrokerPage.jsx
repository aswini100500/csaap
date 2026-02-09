import React, { useState, useEffect } from 'react';

const BrokerPage = () => {
  // Sample initial data
  const initialBrokers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '555-1234',
      projectName: 'Office Building A',
      joinedDate: '2023-05-15',
      totalIncome: 125000,
      pendingCash: 15000,
      totalCustomers: 42,
      projects: ['Sunrise Villa', 'Ocean View']
    },
    {
      id: 2,
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '555-5678',
      projectName: 'Residential Complex B',
      joinedDate: '2023-06-20',
      totalIncome: 98000,
      pendingCash: 0,
      totalCustomers: 31,
      projects: ['Garden Apartments']
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert.johnson@email.com',
      phone: '555-9012',
      projectName: 'Shopping Mall C',
      joinedDate: '2023-04-10',
      totalIncome: 32500,
      pendingCash: 7500,
      totalCustomers: 15,
      projects: ['Lakeside Cottage']
    }
  ];

  // State for brokers and search
  const [brokers, setBrokers] = useState(initialBrokers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  // State for new broker form
  const [newBroker, setNewBroker] = useState({
    name: '',
    email: '',
    phone: '',
    alternatePhone: '',
    joinedDate: '',

    commission: '',

   
  });

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter brokers based on search term
  const filteredBrokers = brokers.filter(broker =>
    broker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    broker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    broker.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBroker({
      ...newBroker,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = brokers.length > 0 ? Math.max(...brokers.map(b => b.id)) + 1 : 1;
    
    setBrokers([
      ...brokers,
      {
        id: newId,
        name: newBroker.name,
        email: newBroker.email,
        phone: newBroker.phone,
        projectName: newBroker.projectName,
        joinedDate: newBroker.joinedDate,
        totalIncome: parseFloat(newBroker.totalIncome) || 0,
        pendingCash: parseFloat(newBroker.pendingCash) || 0,
        totalCustomers: parseInt(newBroker.totalCustomers) || 0,
        projects: newBroker.projects ? newBroker.projects.split(',').map(p => p.trim()) : []
      }
    ]);
    
    // Reset form
    setNewBroker({
      name: '',
      email: '',
      phone: '',
      projectName: '',
      joinedDate: '',
      totalIncome: '',
      pendingCash: '',
      totalCustomers: '',
      projects: ''
    });
    
    setShowAddForm(false);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Format number
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Broker Management Dashboard</h1>
      
      {/* Search and Add Button Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search brokers by name, email or project..."
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
          onClick={() => setShowAddForm(true)}
          className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add New Broker
        </button>
      </div>
      
      {/* Add Broker Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Broker</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newBroker.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newBroker.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={newBroker.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Phonenumber</label>
                <input
                  type="text"
                  name="alternatePhone"
                  value={newBroker.alternatePhone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Joined Date</label>
                <input
                  type="date"
                  name="joinedDate"
                  value={newBroker.joinedDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Commission</label>
                <input
                  type="number"
                  name="commission"
                  value={newBroker.commission}
                  onChange={handleInputChange}
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
                Add Broker
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Brokers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Income</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending Cash</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Customers</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBrokers.length > 0 ? (
              filteredBrokers.map((broker) => (
                <tr key={broker.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{broker.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{broker.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div>{broker.email}</div>
                    <div className="text-xs text-gray-500">{broker.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{broker.projectName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{broker.joinedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(broker.totalIncome)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <span className={broker.pendingCash > 0 ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
                      {formatCurrency(broker.pendingCash)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {formatNumber(broker.totalCustomers)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <div className="flex flex-wrap gap-1">
                      {broker.projects.slice(0, 2).map((project, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
                          {project}
                        </span>
                      ))}
                      {broker.projects.length > 2 && (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          +{broker.projects.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
                  No brokers found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Summary Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Total Brokers</h3>
          <p className="text-2xl font-bold text-blue-600">{brokers.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Total Income</h3>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(brokers.reduce((total, broker) => total + broker.totalIncome, 0))}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Pending Cash</h3>
          <p className="text-2xl font-bold text-red-600">
            {formatCurrency(brokers.reduce((total, broker) => total + broker.pendingCash, 0))}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Total Customers</h3>
          <p className="text-2xl font-bold text-purple-600">
            {formatNumber(brokers.reduce((total, broker) => total + broker.totalCustomers, 0))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrokerPage;