import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RolesPage = () => {
  // State for roles and search
  const [roles, setRoles] = useState([]); // Initialize as empty array
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  // State for new role form
  const [newRole, setNewRole] = useState({
    name: '',
    guard_name: 'sanctum',
    description: ''
  });

  // Fetch roles from API when component mounts
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('No authentication token found');
        setLoading(true);
        const response = await axios.get('https://api.csaap.com/api/superadmin/roles', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Log response for debugging
        console.log('API Response:', response.data);

        // Ensure response.data is an array; adjust if wrapped in an object
        const fetchedRoles = Array.isArray(response.data) ? response.data : response.data.data || [];

        // Validate each role object
        const validRoles = fetchedRoles.filter(
          role => role && typeof role === 'object' && role.name && typeof role.name === 'string'
        );

        setRoles(validRoles);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch roles. Please try again later.');
        setLoading(false);
        console.error('API Error:', err);
      }
    };

    fetchRoles();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter roles based on search term with validation
  const filteredRoles = roles.filter(role => {
    if (!role || typeof role !== 'object') return false;
    const nameMatch = role.name && typeof role.name === 'string'
      ? role.name.toLowerCase().includes(searchTerm.toLowerCase())
      : false;
    const descriptionMatch = role.description && typeof role.description === 'string'
      ? role.description.toLowerCase().includes(searchTerm.toLowerCase())
      : false;
    return nameMatch || descriptionMatch;
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRole({
      ...newRole,
      [name]: value
    });
  };

  // Handle form submission (for adding new role)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('No authentication token found');

      const newRoleData = {
        name: newRole.name,
        guard_name: newRole.guard_name,
        description: newRole.description || '',
      };

      // Send POST request to create new role
      const response = await axios.post(
        'https://api.csaap.com/api/superadmin/roles',
        newRoleData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Log response for debugging
      console.log('POST Response:', response.data);

      // Update local state with the newly created role
      setRoles([...roles, response.data]);

      // Reset form
      setNewRole({
        name: '',
        guard_name: 'sanctum',
        description: ''
      });
      setShowAddForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to add role. Please try again.');
      console.error('Add Role Error:', err);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Roles Management</h1>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Search and Add Button Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search roles by name or description..."
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
          Add Role
        </button>
      </div>

      {/* Add Role Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Role</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                <input
                  type="text"
                  name="name"
                  value={newRole.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., SuperAdmin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Guard Name</label>
                <select
                  name="guard_name"
                  value={newRole.guard_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="sanctum">Sanctum</option>
                  <option value="web">Web</option>
                  <option value="api">API</option>
                </select>
              </div>
              {/* <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={newRole.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the role and its purpose..."
                />
              </div> */}
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
                Add Role
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Roles Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guard Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                  Loading roles...
                </td>
              </tr>
            ) : filteredRoles.length > 0 ? (
              filteredRoles.map((role) => (
                <tr key={role.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{role.id || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{role.name || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{role.guard_name || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(role.created_at)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                  No roles found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      {!loading && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">Total Roles</h3>
            <p className="text-2xl font-bold text-blue-600">{roles.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">Total Users</h3>
            <p className="text-2xl font-bold text-green-600">
              {roles.reduce((total, role) => total + (role.users_count || 0), 0)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">Sanctum Guard</h3>
            <p className="text-2xl font-bold text-purple-600">
              {roles.filter(r => r && r.guard_name === 'sanctum').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">Total Permissions</h3>
            <p className="text-2xl font-bold text-indigo-600">
              {roles.reduce((total, role) => total + (role.permissions_count || 0), 0)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesPage;