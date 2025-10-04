import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModuleManagement = () => {
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingModuleId, setEditingModuleId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [message, setMessage] = useState('');

  const [newModule, setNewModule] = useState({
    name: '',
    description: '',
    category_id: '',
    status: 'active'
  });

  // Categories for reference (not used in dropdown anymore)
  const categories = [
    { id: 1, name: 'User Management' },
    { id: 2, name: 'Property Management' },
    { id: 3, name: 'CRM' },
    { id: 4, name: 'Reporting' },
    { id: 5, name: 'Settings' },
    { id: 6, name: 'Administration' },
    { id: 7, name: 'Integrations' },
    { id: 8, name: 'Billing' },
    { id: 9, name: 'Support' },
    { id: 10, name: 'Marketing' },
    { id: 11, name: 'Analytics' },
    { id: 12, name: 'Notifications' },
    { id: 13, name: 'Security' },   
    { id: 14, name: 'Mobile' },
    { id: 15, name: 'API' },
    { id: 16, name: 'Other' }
  ];

  // Fetch modules from API
  const fetchModules = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get('https://api.csaap.com/api/superadmin/modules', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        const data = response.data;
        let modulesData = [];
        if (data.modules) {
          modulesData = data.modules;
        } else if (Array.isArray(data)) {
          modulesData = data;
        } else {
          console.error('Unexpected API response structure in fetchModules:', data);
          setError('Unexpected response format from server');
          return;
        }

        // Normalize data to ensure status is set
        const normalizedModules = modulesData.map(module => ({
          ...module,
          status: module.status || 'active' // Default to 'active' if status is missing
        }));

        setModules(normalizedModules);
        setFilteredModules(normalizedModules);
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (err) {
      console.error('Error fetching modules:', err);
      if (err.response) {
        if (err.response.status === 401) {
          setError('Authentication failed. Please login again.');
        } else if (err.response.status === 403) {
          setError('You do not have permission to view modules.');
        } else if (err.response.status === 500) {
          setError('Server error: Please try again later or contact support.');
        } else {
          setError(err.response.data.message || 'Failed to fetch modules');
        }
      } else if (err.request) {
        setError('Network error: Could not connect to server');
      } else {
        setError('Error: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Add module API call
  const addModule = async () => {
    try {
      setIsAdding(true);
      setFormError(null);
      setMessage('');

      if (!newModule.name || !newModule.category_id) {
        setFormError('Name and Category ID are required');
        return;
      }

      const response = await axios.post(
        'https://api.csaap.com/api/superadmin/modules',
        newModule,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setMessage('Module added successfully!');
        setShowAddForm(false);
        setNewModule({ name: '', description: '', category_id: '', status: 'active' });
        fetchModules();
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (err) {
      console.error('Error adding module:', err);
      if (err.response) {
        if (err.response.status === 401) {
          setFormError('Authentication failed. Please login again.');
        } else if (err.response.status === 403) {
          setFormError('You do not have permission to add modules.');
        } else if (err.response.status === 500) {
          setFormError(err.response.data.message || 'Server error: Please try again later or contact support.');
        } else {
          setFormError(err.response.data.message || 'Failed to add module');
        }
      } else if (err.request) {
        setFormError('Network error: Could not connect to server');
      } else {
        setFormError('Error: ' + err.message);
      }
    } finally {
      setIsAdding(false);
    }
  };

  // Update module API call
  const updateModule = async () => {
    try {
      setIsAdding(true);
      setFormError(null);
      setMessage('');

      if (!newModule.name || !newModule.category_id) {
        setFormError('Name and Category ID are required');
        return;
      }

      const response = await axios.put(
        `https://api.csaap.com/api/superadmin/modules/${editingModuleId}`,
        newModule,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setMessage('Module updated successfully!');
        setShowAddForm(false);
        setIsEditing(false);
        setEditingModuleId(null);
        setNewModule({ name: '', description: '', category_id: '', status: 'active' });
        fetchModules();
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (err) {
      console.error('Error updating module:', err);
      if (err.response) {
        if (err.response.status === 401) {
          setFormError('Authentication failed. Please login again.');
        } else if (err.response.status === 403) {
          setFormError('You do not have permission to update modules.');
        } else if (err.response.status === 404) {
          setFormError('Module not found.');
          await fetchModules();
        } else if (err.response.status === 500) {
          setFormError(err.response.data.message || 'Server error: Please try again later or contact support.');
        } else {
          setFormError(err.response.data.message || 'Failed to update module');
        }
      } else if (err.request) {
        setFormError('Network error: Could not connect to server');
      } else {
        setFormError('Error: ' + err.message);
      }
    } finally {
      setIsAdding(false);
    }
  };

  // Delete module API call
  const deleteModule = async (moduleId) => {
    if (!window.confirm(`Are you sure you want to delete module ID ${moduleId}?`)) {
      return;
    }

    try {
      setIsDeleting(true);
      setError(null);
      setMessage('');

      const response = await axios.delete(
        `https://api.csaap.com/api/superadmin/modules/${moduleId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setMessage('Module deleted successfully!');
        const updatedModules = modules.filter((module) => module.id !== moduleId);
        setModules(updatedModules);
        setFilteredModules(updatedModules);
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (err) {
      console.error('Error deleting module:', err);
      if (err.response) {
        if (err.response.status === 401) {
          setMessage('Authentication failed. Please login again.');
        } else if (err.response.status === 403) {
          setMessage('You do not have permission to delete modules.');
        } else if (err.response.status === 404) {
          setMessage('Module not found.');
          await fetchModules();
        } else if (err.response.status === 500) {
          setMessage(err.response.data.message || 'Server error: Please try again later or contact support.');
        } else {
          setMessage(err.response.data.message || 'Failed to delete module');
        }
      } else if (err.request) {
        setMessage('Network error: Could not connect to server');
      } else {
        setMessage('Error: ' + err.message);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  // Filter modules based on search term
  useEffect(() => {
    if (searchTerm) {
      setSearchLoading(true);
      
      const timer = setTimeout(() => {
        const filtered = modules.filter(module =>
          module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (module.description && module.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredModules(filtered);
        setSearchLoading(false);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setFilteredModules(modules);
      setSearchLoading(false);
    }
  }, [searchTerm, modules]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewModule({ ...newModule, [name]: value });
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle edit button click
  const handleEdit = (module) => {
    setNewModule({
      name: module.name,
      description: module.description || '',
      category_id: module.category_id,
      status: module.status || 'active'
    });
    setIsEditing(true);
    setEditingModuleId(module.id);
    setShowAddForm(true);
    setFormError(null);
    setMessage('');
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const displayStatus = status || 'unknown'; // Fallback to 'unknown' if status is undefined
    let bgColor = '';
    switch(displayStatus.toLowerCase()) {
      case 'active':
        bgColor = 'bg-green-100 text-green-800';
        break;
      case 'inactive':
        bgColor = 'bg-red-100 text-red-800';
        break;
      case 'pending':
        bgColor = 'bg-yellow-100 text-yellow-800';
        break;
      default:
        bgColor = 'bg-gray-100 text-gray-800';
    }
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor}`}>
        {displayStatus.charAt(0).toUpperCase() + displayStatus.slice(1)}
      </span>
    );
  };

  // Get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id == categoryId);
    return category ? category.name : 'Unknown';
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto mt-8">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
        <button
          onClick={fetchModules}
          className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Module Management</h1>

      {/* Message Display */}
      {message && (
        <div
          className={`mb-4 p-3 rounded-md ${
            message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      {/* Search and Add Button Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search modules by name or description..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchLoading ? (
            <div className="absolute right-3 top-3 text-gray-500">
              Loading...
            </div>
          ) : (
            <div className="absolute right-3 top-3 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          )}
        </div>
        
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setIsEditing(false);
            setEditingModuleId(null);
            setNewModule({ name: '', description: '', category_id: '', status: 'active' });
            setFormError(null);
            setMessage('');
          }}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Module
        </button>
      </div>
      
      {/* Add/Edit Module Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{isEditing ? 'Edit Module' : 'Add New Module'}</h2>
          {formError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
              {formError}
            </div>
          )}
          <form onSubmit={(e) => {
            e.preventDefault();
            isEditing ? updateModule() : addModule();
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newModule.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., User Management"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category ID</label>
                <input
                  type="number"
                  name="category_id"
                  value={newModule.category_id}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter category ID"
                  min="1"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={newModule.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the module's purpose and functionality..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={newModule.status}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setIsEditing(false);
                  setEditingModuleId(null);
                  setNewModule({ name: '', description: '', category_id: '', status: 'active' });
                  setFormError(null);
                  setMessage('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isAdding}
                className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isAdding ? (isEditing ? 'Updating...' : 'Adding...') : (isEditing ? 'Update Module' : 'Add Module')}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Modules Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {searchLoading ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : filteredModules.length > 0 ? (
              filteredModules.map((module) => (
                <tr key={module.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{module.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{module.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{module.description || 'No description'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {module.category_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <StatusBadge status={module.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(module)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteModule(module.id)}
                      disabled={isDeleting}
                      className={`text-red-600 hover:text-red-900 ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                  No modules found. {searchTerm ? 'Try a different search term.' : 'Add a new module to get started.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Summary Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Total Modules</h3>
          <p className="text-2xl font-bold text-blue-600">{modules.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
          <p className="text-2xl font-bold text-purple-600">
            {new Set(modules.map(m => m.category_id)).size}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Inactive Modules</h3>
          <p className="text-2xl font-bold text-red-600">
            {modules.filter(m => m.status === 'inactive').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Search Results</h3>
          <p className="text-2xl font-bold text-green-600">
            {filteredModules.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModuleManagement;