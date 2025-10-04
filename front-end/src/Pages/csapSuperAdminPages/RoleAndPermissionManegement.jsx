import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RolePermissionManagement = () => {
  // State for roles and permissions
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Search terms
  const [roleSearchTerm, setRoleSearchTerm] = useState('');
  
  // Form states
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [showAssignPermissionForm, setShowAssignPermissionForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  
  const [isAdding, setIsAdding] = useState(false);
  const [formError, setFormError] = useState(null);
  
  // Form data
  const [newRole, setNewRole] = useState({
    name: '',
    guard_name: 'sanctum',
    description: ''
  });
  
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  // Fetch roles and permissions from API
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch roles
      const rolesResponse = await axios.get('https://api.csaap.com/api/superadmin/roles', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      // Fetch permissions (needed for assignment form)
      const permissionsResponse = await axios.get('https://api.csaap.com/api/superadmin/permissions', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (rolesResponse.status >= 200 && rolesResponse.status < 300 && 
          permissionsResponse.status >= 200 && permissionsResponse.status < 300) {
        
        // Process roles
        const rolesData = rolesResponse.data;
        if (rolesData.roles) {
          setRoles(rolesData.roles);
          setFilteredRoles(rolesData.roles);
        } else if (Array.isArray(rolesData)) {
          setRoles(rolesData);
          setFilteredRoles(rolesData);
        }
        
        // Process permissions (for assignment form only)
        const permissionsData = permissionsResponse.data;
        if (permissionsData.permissions) {
          setPermissions(permissionsData.permissions);
        } else if (Array.isArray(permissionsData)) {
          setPermissions(permissionsData);
        }
        
      } else {
        throw new Error('Unexpected status code from server');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      if (err.response) {
        if (err.response.status === 401) {
          setError('Authentication failed. Please login again.');
        } else if (err.response.status === 403) {
          setError('You do not have permission to view this data.');
        } else if (err.response.status === 500) {
          setError('Server error: Please try again later or contact support.');
        } else {
          setError(err.response.data.message || 'Failed to fetch data');
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

  // Add role API call
  const addRole = async () => {
    try {
      setIsAdding(true);
      setFormError(null);
      
      if (!newRole.name) {
        setFormError('Role name is required');
        return;
      }

      const response = await axios.post(
        'https://api.csaap.com/api/superadmin/roles',
        newRole,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setShowRoleForm(false);
        setNewRole({ name: '', guard_name: 'sanctum', description: '' });
        fetchData(); // Refresh data from server
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (err) {
      console.error('Error adding role:', err);
      if (err.response) {
        if (err.response.status === 401) {
          setFormError('Authentication failed. Please login again.');
        } else if (err.response.status === 403) {
          setFormError('You do not have permission to add roles.');
        } else if (err.response.status === 500) {
          setFormError(err.response.data.message || 'Server error: Please try again later or contact support.');
        } else {
          setFormError(err.response.data.message || 'Failed to add role');
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

  // Assign permissions to role API call
  const assignPermissionsToRole = async () => {
    try {
      setIsAdding(true);
      setFormError(null);
      
      if (!selectedRole || selectedPermissions.length === 0) {
        setFormError('Please select a role and at least one permission');
        return;
      }

      const response = await axios.post(
        `https://api.csaap.com/api/superadmin/roles/${selectedRole.id}/permissions`,
        { permissions: selectedPermissions },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setShowAssignPermissionForm(false);
        setSelectedPermissions([]);
        setSelectedRole(null);
        fetchData(); // Refresh data from server
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (err) {
      console.error('Error assigning permissions:', err);
      if (err.response) {
        if (err.response.status === 401) {
          setFormError('Authentication failed. Please login again.');
        } else if (err.response.status === 403) {
          setFormError('You do not have permission to assign permissions.');
        } else if (err.response.status === 500) {
          setFormError(err.response.data.message || 'Server error: Please try again later or contact support.');
        } else {
          setFormError(err.response.data.message || 'Failed to assign permissions');
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

  useEffect(() => {
    fetchData();
  }, []);

  // Filter roles based on search term
  useEffect(() => {
    const filtered = roles.filter(role =>
      role.name.toLowerCase().includes(roleSearchTerm.toLowerCase()) ||
      (role.description && role.description.toLowerCase().includes(roleSearchTerm.toLowerCase()))
    );
    setFilteredRoles(filtered);
  }, [roleSearchTerm, roles]);

  // Handle form input changes
  const handleRoleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRole({ ...newRole, [name]: value });
  };

  const handlePermissionToggle = (permissionId) => {
    if (selectedPermissions.includes(permissionId)) {
      setSelectedPermissions(selectedPermissions.filter(id => id !== permissionId));
    } else {
      setSelectedPermissions([...selectedPermissions, permissionId]);
    }
  };

  // Open assign permissions form
  const openAssignPermissionForm = (role) => {
    setSelectedRole(role);
    setSelectedPermissions([]);
    setShowAssignPermissionForm(true);
  };

  // Format permission name for display
  const formatPermissionName = (name) => {
    return name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div>Loading...</div>
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
          onClick={fetchData}
          className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Role Management</h1>
      
      {/* Roles Section */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-gray-700">Roles</h2>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search roles..."
                value={roleSearchTerm}
                onChange={(e) => setRoleSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowRoleForm(true)}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Role
            </button>
          </div>
        </div>
        
        {/* Add Role Form */}
        {showRoleForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Role</h3>
            {formError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                {formError}
              </div>
            )}
            <form onSubmit={(e) => { e.preventDefault(); addRole(); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newRole.name}
                    onChange={handleRoleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Admin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guard Name</label>
                  <select
                    name="guard_name"
                    value={newRole.guard_name}
                    onChange={handleRoleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="sanctum">Sanctum</option>
                    <option value="web">Web</option>
                    <option value="api">API</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={newRole.description}
                    onChange={handleRoleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the role's purpose and permissions..."
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowRoleForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding}
                  className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isAdding ? 'Adding...' : 'Add Role'}
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Assign Permission Form */}
        {showAssignPermissionForm && selectedRole && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Assign Permissions to {selectedRole.name}</h3>
            {formError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                {formError}
              </div>
            )}
            <div className="mb-4">
              <p className="text-sm text-gray-600">Select permissions to assign to this role:</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto p-2 border border-gray-200 rounded-md">
              {permissions.map(permission => (
                <div key={permission.id} className="flex items-center">
                  <input
                    id={`permission-${permission.id}`}
                    type="checkbox"
                    checked={selectedPermissions.includes(permission.id)}
                    onChange={() => handlePermissionToggle(permission.id)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`permission-${permission.id}`} className="ml-2 block text-sm text-gray-700">
                    {formatPermissionName(permission.name)}
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-500">
              {selectedPermissions.length} permission(s) selected
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowAssignPermissionForm(false);
                  setSelectedPermissions([]);
                  setSelectedRole(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={assignPermissionsToRole}
                disabled={isAdding}
                className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isAdding ? 'Assigning...' : 'Assign Permissions'}
              </button>
            </div>
          </div>
        )}
        
        {/* Roles Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RollName</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guard</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRoles.length > 0 ? (
                filteredRoles.map((role) => (
                  <tr key={role.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{role.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{role.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{role.guard_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{role.description || 'No description'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {role.permissions_count || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => openAssignPermissionForm(role)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Assign Permissions
                      </button>
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    No roles found. {roleSearchTerm ? 'Try a different search term.' : 'Add a new role to get started.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Summary Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Total Roles</h3>
          <p className="text-2xl font-bold text-blue-600">{roles.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Total Permissions</h3>
          <p className="text-2xl font-bold text-indigo-600">{permissions.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Average Permissions per Role</h3>
          <p className="text-2xl font-bold text-green-600">
            {roles.length > 0 ? Math.round(permissions.length / roles.length) : 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RolePermissionManagement;