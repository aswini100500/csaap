import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';

const BrokerAdminDashboard = () => {
  const [brokers, setBrokers] = useState([]);
  const [filteredBrokers, setFilteredBrokers] = useState([]);
  const [stats, setStats] = useState({
    totalBrokers: 0,
    totalAmount: 0,
    pendingProjects: 0,
    completedProjects: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBroker, setSelectedBroker] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newBroker, setNewBroker] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active'
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const mockBrokers = [
        { 
          id: 1, 
          name: 'John Smith', 
          email: 'john@example.com', 
          phone: '555-1234', 
          joinedDate: '2023-01-15', 
          status: 'active',
          totalIncome: 125000,
          pendingCash: 15000,
          totalCustomers: 42,
          projects: ['Sunrise Villa', 'Ocean View', 'Mountain Retreat', 'Urban Loft']
        },
        { 
          id: 2, 
          name: 'Sarah Johnson', 
          email: 'sarah@example.com', 
          phone: '555-5678', 
          joinedDate: '2023-02-20', 
          status: 'active',
          totalIncome: 98000,
          pendingCash: 0,
          totalCustomers: 31,
          projects: ['Garden Apartments', 'Downtown Plaza']
        },
        { 
          id: 3, 
          name: 'Michael Brown', 
          email: 'michael@example.com', 
          phone: '555-9012', 
          joinedDate: '2023-03-10', 
          status: 'inactive',
          totalIncome: 45000,
          pendingCash: 7500,
          totalCustomers: 15,
          projects: ['Lakeside Cottage']
        },
        { 
          id: 4, 
          name: 'Emily Davis', 
          email: 'emily@example.com', 
          phone: '555-3456', 
          joinedDate: '2023-04-05', 
          status: 'active',
          totalIncome: 210000,
          pendingCash: 32000,
          totalCustomers: 68,
          projects: ['Sky Tower', 'Beachfront Condos', 'Hillside Estate', 'Business Center', 'Park Residences']
        }
      ];

      setBrokers(mockBrokers);
      setFilteredBrokers(mockBrokers);
      
      setStats({
        totalBrokers: 24,
        totalAmount: 125000,
        pendingProjects: 8,
        completedProjects: 42,
      });

      setLoading(false);
    }, 1000);
  }, []);

  // Filter brokers based on search term
  useEffect(() => {
    const filtered = brokers.filter(broker => 
      broker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      broker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      broker.phone.includes(searchTerm)
    );
    setFilteredBrokers(filtered);
  }, [searchTerm, brokers]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateBroker = () => {
    // In a real app, you would make an API call here
    const newBrokerWithId = {
      ...newBroker,
      id: Math.max(...brokers.map(b => b.id)) + 1,
      joinedDate: new Date().toISOString().split('T')[0],
      totalIncome: 0,
      pendingCash: 0,
      totalCustomers: 0,
      projects: []
    };
    
    setBrokers([...brokers, newBrokerWithId]);
    setFilteredBrokers([...brokers, newBrokerWithId]);
    setShowCreateModal(false);
    setNewBroker({
      name: '',
      email: '',
      phone: '',
      status: 'active'
    });
  };

  const handleNewBrokerChange = (e) => {
    const { name, value } = e.target;
    setNewBroker(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Broker Details Modal */}
      {selectedBroker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Broker Details</h3>
              <button 
                onClick={() => setSelectedBroker(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <h4 className="text-xl font-semibold">{selectedBroker.name}</h4>
                <p className="text-gray-600">{selectedBroker.email}</p>
                <p className="text-gray-600">{selectedBroker.phone}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className={`font-medium ${
                    selectedBroker.status === 'active' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {selectedBroker.status.charAt(0).toUpperCase() + selectedBroker.status.slice(1)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Joined Date</p>
                  <p className="font-medium">{selectedBroker.joinedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Income</p>
                  <p className="font-medium">${selectedBroker.totalIncome.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending Cash</p>
                  <p className={`font-medium ${
                    selectedBroker.pendingCash > 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    ${selectedBroker.pendingCash.toLocaleString()}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Projects</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedBroker.projects.map(project => (
                    <span key={project} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {project}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Broker Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Create New Broker</h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newBroker.name}
                  onChange={handleNewBrokerChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newBroker.email}
                  onChange={handleNewBrokerChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={newBroker.phone}
                  onChange={handleNewBrokerChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={newBroker.status}
                  onChange={handleNewBrokerChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBroker}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Create Broker
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Broker Management Dashboard</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create Broker
        </button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Brokers</h3>
          <p className="text-2xl font-bold text-gray-800">{stats.totalBrokers}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Amount</h3>
          <p className="text-2xl font-bold text-gray-800">${stats.totalAmount.toLocaleString()}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Pending Projects</h3>
          <p className="text-2xl font-bold text-yellow-600">{stats.pendingProjects}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Completed Projects</h3>
          <p className="text-2xl font-bold text-green-600">{stats.completedProjects}</p>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search brokers..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
      
      {/* Brokers List - Full Width */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Brokers List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Income</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending Cash</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Customers</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBrokers.map((broker, index) => (
                  <tr key={broker.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">BRK-{broker.id.toString().padStart(4, '0')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <button 
                        onClick={() => setSelectedBroker(broker)}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {broker.name}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col">
                        <span>{broker.email}</span>
                        <span className="text-gray-400">{broker.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      ${broker.totalIncome?.toLocaleString() || '0'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`font-medium ${broker.pendingCash > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        ${broker.pendingCash?.toLocaleString() || '0'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {broker.totalCustomers || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {broker.projects?.slice(0, 3).map(project => (
                          <span key={project} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                            {project}
                          </span>
                        ))}
                        {broker.projects?.length > 3 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            +{broker.projects.length - 3} more
                          </span>
                        )}
                        {(!broker.projects || broker.projects.length === 0) && (
                          <span className="text-gray-400 text-xs">No projects</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${broker.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {broker.status.charAt(0).toUpperCase() + broker.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Performance Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Broker Performance</h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
          <p className="text-gray-500">Performance charts will be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default BrokerAdminDashboard;