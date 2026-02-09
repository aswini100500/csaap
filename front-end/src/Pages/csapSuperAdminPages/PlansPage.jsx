import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // New state for delete loading

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration_in_days: '',
    description: '',
    status: 'active',
  });

  const [errors, setErrors] = useState({});

  // Fetch plans from the API
  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('https://api.csaap.com/api/superadmin/plans', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      

      if (response.data && response.data.plans) {
        setPlans(response.data.plans);
        setFilteredPlans(response.data.plans);
      } else if (Array.isArray(response.data)) {
        setPlans(response.data);
        setFilteredPlans(response.data);
      } else {
        throw new Error('Unexpected API response structure');
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
      if (error.response) {
        if (error.response.status === 401) {
          setError('Authentication failed. Please login again.');
        } else if (error.response.status === 403) {
          setError('You do not have permission to view plans.');
        } else if (error.response.status === 500) {
          setError('Server error: Please try again later or contact support.');
        } else {
          setError(error.response.data.message || 'Failed to fetch plans');
        }
      } else if (error.request) {
        setError('Network error: Could not connect to server');
      } else {
        setError('Error: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Delete a plan
  const deletePlan = async (planId) => {
    // Optional: Add confirmation prompt
    if (!window.confirm(`Are you sure you want to delete plan ID ${planId}?`)) {
      return;
    }

    try {
      setIsDeleting(true);
      setError(null);
      setMessage('');

      await axios.delete(`https://api.csaap.com/api/superadmin/plans/${planId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      // Remove the deleted plan from the state
      const updatedPlans = plans.filter((plan) => plan.id !== planId);
      setPlans(updatedPlans);
      setFilteredPlans(updatedPlans);
      setMessage('Plan deleted successfully!');
    } catch (error) {
      console.error('Error deleting plan:', error);
      if (error.response) {
        if (error.response.status === 401) {
          setMessage('Authentication failed. Please login again.');
        } else if (error.response.status === 403) {
          setMessage('You do not have permission to delete plans.');
        } else if (error.response.status === 404) {
          setMessage('Plan not found.');
          await fetchPlans(); // Refetch to ensure consistency
        } else {
          setMessage(`Error: ${error.response.data.message || 'Failed to delete plan'}`);
        }
      } else if (error.request) {
        setMessage('Network error: Please check your connection');
      } else {
        setMessage('Error: ' + error.message);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  // Run fetchPlans on component mount
  useEffect(() => {
    fetchPlans();
  }, []);

  // Filter plans based on search term
  useEffect(() => {
    const filtered = plans.filter(
      (plan) =>
        plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (plan.description && plan.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredPlans(filtered);
  }, [searchTerm, plans]);

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Plan name is required';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (!formData.duration_in_days || parseInt(formData.duration_in_days) <= 0) {
      newErrors.duration_in_days = 'Valid duration is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add a new plan
  const addPlan = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage('Please fix the form errors');
      return;
    }

    try {
      setIsAdding(true);
      setMessage('');

      const submissionData = {
        ...formData,
        price: parseFloat(formData.price),
        duration_in_days: parseInt(formData.duration_in_days),
      };

      const response = await axios.post(
        'https://api.csaap.com/api/superadmin/plans',
        submissionData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data && response.data.plan) {
        const newPlan = response.data.plan;
        if (newPlan.id && newPlan.name && newPlan.price && newPlan.duration_in_days) {
          setPlans([...plans, newPlan]);
          setMessage('Plan added successfully!');
          setShowPlanForm(false);
          setFormData({ name: '', price: '', duration_in_days: '', description: '', status: 'active' });
          setErrors({});
        } else {
          setMessage('Unexpected plan data format from server');
          await fetchPlans();
        }
      } else {
        setMessage('Unexpected response format from server');
        await fetchPlans();
      }
    } catch (error) {
      console.error('Error adding plan:', error);
      if (error.response) {
        if (error.response.status === 422) {
          setMessage('Validation error: Please check your input');
          if (error.response.data.errors) {
            setErrors(error.response.data.errors);
          }
        } else if (error.response.status === 401) {
          setMessage('Authentication failed. Please login again.');
        } else if (error.response.status === 403) {
          setMessage('You do not have permission to add plans.');
        } else {
          setMessage(`Error: ${error.response.data.message || 'Failed to add plan'}`);
        }
      } else if (error.request) {
        setMessage('Network error: Please check your connection');
      } else {
        setMessage('Error: ' + error.message);
      }
    } finally {
      setIsAdding(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    let bgColor = status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor}`}>
        {status || 'Inactive'}
      </span>
    );
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div>Loading plans...</div>
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
          onClick={fetchPlans}
          className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Plan Management</h1>

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

      {/* Plans Section */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-gray-700">Subscription Plans</h2>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowPlanForm(true)}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center"
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
              Add Plan
            </button>
          </div>
        </div>

        {/* Add Plan Form - Inline on the same page */}
        {showPlanForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Plan</h3>
            <form onSubmit={addPlan}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                    step="0.01"
                    min="0"
                  />
                  {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    name="duration_in_days"
                    value={formData.duration_in_days}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.duration_in_days ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                    min="1"
                  />
                  {errors.duration_in_days && <p className="mt-1 text-sm text-red-500">{errors.duration_in_days}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the plan features and benefits..."
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowPlanForm(false);
                    setErrors({});
                    setMessage('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding}
                  className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
                    isAdding ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isAdding ? 'Adding...' : 'Add Plan'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Plans Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPlans.length > 0 ? (
                filteredPlans.map((plan) => (
                  <tr key={plan.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{plan.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{plan.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${plan.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{plan.duration_in_days} days</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <StatusBadge status={plan.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{plan.description || 'No description'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button
                        onClick={() => deletePlan(plan.id)}
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
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    No plans found. {searchTerm ? 'Try a different search term.' : 'Add a new plan to get started.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Total Plans</h3>
          <p className="text-2xl font-bold text-blue-600">{plans.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Active Plans</h3>
          <p className="text-2xl font-bold text-green-600">{plans.filter((p) => p.status === 'active').length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Average Price</h3>
          <p className="text-2xl font-bold text-purple-600">
            ${plans.length > 0 ? (plans.reduce((sum, plan) => sum + parseFloat(plan.price), 0) / plans.length).toFixed(2) : 0}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Average Duration</h3>
          <p className="text-2xl font-bold text-indigo-600">
            {plans.length > 0
              ? Math.round(plans.reduce((sum, plan) => sum + parseInt(plan.duration_in_days), 0) / plans.length)
              : 0}{' '}
            days
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;