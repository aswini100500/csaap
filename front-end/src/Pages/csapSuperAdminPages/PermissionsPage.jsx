import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PermissionsPage = () => {
  const [permissions, setPermissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validGuards = ['sanctum', 'web', 'api'];

  const [newPermission, setNewPermission] = useState({
    name: '',
    guard_name: 'sanctum',
    description: '',
  });

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const token = localStorage.getItem('authToken');
        console.log('Auth token for fetch:', token ? 'Present' : 'Missing');
        if (!token) throw new Error('No authentication token found');

        setLoading(true);
        const response = await axios.get('https://api.csaap.com/api/superadmin/permissions', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        console.log('Fetch API Response:', JSON.stringify(response.data, null, 2));

        let fetchedPermissions = [];
        if (Array.isArray(response.data)) {
          fetchedPermissions = response.data;
        } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
          fetchedPermissions = response.data.data;
        } else if (response.data && Array.isArray(response.data.permissions)) {
          fetchedPermissions = response.data.permissions;
        }

        const validPermissions = fetchedPermissions.filter(
          (permission) => permission && typeof permission === 'object' && permission.name
        );

        setPermissions(validPermissions);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch permissions. Please try again later.');
        setLoading(false);
        console.error('Fetch API Error:', err);
        if (err.response) {
          console.error('Response data:', err.response.data);
          console.error('Response status:', err.response.status);
        }
      }
    };

    fetchPermissions();
  }, []);

  useEffect(() => {
    console.log('showAddForm state:', showAddForm);
  }, [showAddForm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPermissions = permissions.filter((permission) => {
    if (!permission || typeof permission !== 'object') return false;

    const name = permission.name ? permission.name.toLowerCase() : '';
    const description = permission.description ? permission.description.toLowerCase() : '';
    const guard_name = permission.guard_name ? permission.guard_name.toLowerCase() : '';

    return (
      name.includes(searchTerm.toLowerCase()) ||
      description.includes(searchTerm.toLowerCase()) ||
      guard_name.includes(searchTerm.toLowerCase())
    );
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPermission({
      ...newPermission,
      [name]: value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with:', newPermission);

    if (!newPermission.name.trim()) {
      console.log('Validation failed: Empty name');
      setError('Permission name cannot be empty.');
      return;
    }
    if (!/^[a-z][a-z0-9_]*$/.test(newPermission.name)) {
      console.log('Validation failed: Invalid name format');
      setError('Permission name must start with a lowercase letter and contain only lowercase letters, numbers, or underscores (e.g., view_users).');
      return;
    }
    if (permissions.some((p) => p.name === newPermission.name)) {
      console.log('Validation failed: Duplicate name');
      setError('A permission with this name already exists.');
      return;
    }
    if (!validGuards.includes(newPermission.guard_name)) {
      console.log('Validation failed: Invalid guard name');
      setError('Invalid guard name selected.');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      console.log('Auth token for submit:', token ? 'Present' : 'Missing');
      if (!token) {
        setError('Please log in to add permissions.');
        return;
      }

      setError('');
      setSuccess('');
      setIsSubmitting(true);

      const response = await axios.post(
        'https://api.csaap.com/api/superadmin/permissions',
        newPermission,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );

      console.log('Create API Response:', JSON.stringify(response.data, null, 2));

      let createdPermission = response.data;
      if (response.data.permission) createdPermission = response.data.permission;
      else if (response.data.data) createdPermission = response.data.data;

      if (!createdPermission.id || !createdPermission.name) {
        throw new Error('Invalid permission data returned from API');
      }

      setPermissions((prev) => {
        console.log('Updating permissions with:', createdPermission);
        return [...prev, createdPermission];
      });
      setNewPermission({ name: '', guard_name: 'sanctum', description: '' });
      setSearchTerm('');
      setSuccess('Permission created successfully!');
      setIsSubmitting(false);

      setTimeout(() => {
        setShowAddForm(false);
        setSuccess('');
      }, 3000);
    } catch (err) {
      setIsSubmitting(false);
      console.error('Create API Error:', err);
      if (err.response) {
        console.error('Response data:', err.response.data);
        console.error('Response status:', err.response.status);
        if (err.response.status === 401) {
          setError('Authentication failed: Invalid or expired token. Please log in again.');
        } else if (err.response.status === 422) {
          const errorMessages = Object.values(err.response.data.errors || {}).flat();
          setError(`Failed to create permission: ${errorMessages.join(', ') || 'Invalid input.'}`);
        } else {
          setError(`Failed to create permission: ${err.response.data.message || err.response.statusText || 'Unknown error'}`);
        }
      } else {
        setError(`Failed to create permission: ${err.message || 'Network error. Please check your connection.'}`);
      }
    }
  };

  const formatPermissionName = (name) => {
    if (!name) return 'N/A';
    return name.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this permission?')) {
      try {
        const token = localStorage.getItem('authToken');
        console.log('Auth token for delete:', token ? 'Present' : 'Missing');
        if (!token) throw new Error('No authentication token found');

        await axios.delete(`https://api.csaap.com/api/superadmin/permissions/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        setPermissions(permissions.filter((permission) => permission.id !== id));
        setSuccess('Permission deleted successfully!');

        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        console.error('Delete API Error:', err);
        if (err.response) {
          setError(`Failed to delete permission: ${err.response.data.message || 'Unknown error'}`);
        } else {
          setError('Failed to delete permission: Network error. Please check your connection.');
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading permissions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Permissions Management</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          {error}
          <button onClick={() => setError('')} className="absolute top-3 right-3 text-red-700">
            ✕
          </button>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
          {success}
          <button onClick={() => setSuccess('')} className="absolute top-3 right-3 text-green-700">
            ✕
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search permissions by name, description or guard..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-0 top-0 h-full px-4 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        <button
          onClick={() => {
            console.log('Add Permission button clicked, showAddForm:', !showAddForm);
            setShowAddForm(!showAddForm);
          }}
          className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Permission
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Permission</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Permission Name *</label>
                <input
                  type="text"
                  name="name"
                  value={newPermission.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., view_users"
                />
                <p className="text-xs text-gray-500 mt-1">Use underscore_case format (e.g., view_users)</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Guard Name *</label>
                <select
                  name="guard_name"
                  value={newPermission.guard_name}
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
                  value={newPermission.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe what this permission allows..."
                />
              </div> */}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setError('');
                  setNewPermission({
                    name: '',
                    guard_name: 'sanctum',
                    description: '',
                  });
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z" />
                    </svg>
                    Adding...
                  </>
                ) : (
                  'Add Permission'
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Permission Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Guard Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created At
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPermissions.length > 0 ? (
              filteredPermissions.map((permission) => (
                <tr key={permission.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {permission.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                    {formatPermissionName(permission.name)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {permission.guard_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{permission.description || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {formatDate(permission.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(permission.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                  {searchTerm ? 'No permissions found matching your search.' : 'No permissions available.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Total Permissions</h3>
          <p className="text-2xl font-bold text-blue-600">{permissions.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Sanctum Guard</h3>
          <p className="text-2xl font-bold text-indigo-600">
            {permissions.filter((p) => p.guard_name === 'sanctum').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Web Guard</h3>
          <p className="text-2xl font-bold text-purple-600">
            {permissions.filter((p) => p.guard_name === 'web').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">API Guard</h3>
          <p className="text-2xl font-bold text-green-600">
            {permissions.filter((p) => p.guard_name === 'api').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PermissionsPage;