import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter categories based on search term
  useEffect(() => {
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Retrieve token from localStorage or your auth system
      const token = localStorage.getItem('authToken');
      
      const response = await axios.get('https://api.csaap.com/api/superadmin/categories', {
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });
      
      // Handle different response structures
      if (Array.isArray(response.data)) {
        setCategories(response.data);
        setFilteredCategories(response.data);
      } else if (response.data.data && Array.isArray(response.data.data)) {
        setCategories(response.data.data);
        setFilteredCategories(response.data.data);
      } else if (response.data.categories && Array.isArray(response.data.categories)) {
        setCategories(response.data.categories);
        setFilteredCategories(response.data.categories);
      } else {
        throw new Error('Unexpected API response format');
      }
      
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error fetching categories');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      setIsAdding(true);
      setMessage('');
      
      const token = localStorage.getItem('authToken');
      if (!token) {
        setMessage('Authentication token is missing. Please log in.');
        return;
      }
      
      const response = await axios.post('https://api.csaap.com/api/superadmin/categories', newCategory, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });
      
      setMessage('Category added successfully!');
      setNewCategory({ name: '', description: '' });
      setShowAddForm(false);
      fetchCategories();
    } catch (err) {
      console.error('Error adding category:', err);
      setMessage(err.response?.data?.message || 'Error adding category. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();
    try {
      setIsEditing(true);
      setMessage('');
      
      const token = localStorage.getItem('authToken');
      if (!token) {
        setMessage('Authentication token is missing. Please log in.');
        return;
      }
      
      const response = await axios.put(`https://api.csaap.com/api/superadmin/categories/${selectedCategory.id}`, selectedCategory, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });
      
      setMessage('Category updated successfully!');
      setShowEditForm(false);
      setSelectedCategory(null);
      fetchCategories();
    } catch (err) {
      console.error('Error updating category:', err);
      setMessage(err.response?.data?.message || 'Error updating category. Please try again.');
    } finally {
      setIsEditing(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }
    
    try {
      setIsDeleting(id);
      setMessage('');
      
      const token = localStorage.getItem('authToken');
      if (!token) {
        setMessage('Authentication token is missing. Please log in.');
        return;
      }
      
      const response = await axios.delete(`https://api.csaap.com/api/superadmin/categories/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });
      
      setMessage('Category deleted successfully!');
      fetchCategories();
    } catch (err) {
      console.error('Error deleting category:', err);
      setMessage(err.response?.data?.message || 'Error deleting category. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCategory(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openEditForm = (category) => {
    setSelectedCategory({...category});
    setShowEditForm(true);
    setMessage('');
  };

  // Mock data for testing if API continues to fail
  const mockCategories = [
    { id: 1, name: "Electronics", description: "Electronic devices and components" },
    { id: 2, name: "Clothing", description: "Apparel and fashion items" },
    { id: 3, name: "Books", description: "Various books and publications" },
    { id: 4, name: "Home & Garden", description: "Home improvement and gardening supplies" },
    { id: 5, name: "Sports", description: "Sports equipment and accessories" }
  ];

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div>Loading categories...</div>
      </div>
    );
  }

  // Show error state with mock data
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <h2 className="font-bold mb-2">Error loading categories</h2>
          <p>{error}</p>
          <p className="mt-2 text-sm">Showing mock data for demonstration purposes.</p>
        </div>
        
        {/* Show mock data when API fails */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-semibold text-gray-700">Categories</h2>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Category
              </button>
            </div>
          </div>
          
          {/* Categories Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockCategories.map((category) => (
                  <tr key={category.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{category.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{category.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Summary Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">Total Categories</h3>
            <p className="text-2xl font-bold text-blue-600">{mockCategories.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">Demo Mode</h3>
            <p className="text-2xl font-bold text-yellow-600">Active</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">Last Updated</h3>
            <p className="text-2xl font-bold text-purple-600">Just now</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Category Management</h1>
      
      {/* Categories Section */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-gray-700">Categories</h2>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Category
            </button>
          </div>
        </div>
        
        {/* Add Category Form - Inline on the same page */}
        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Category</h3>
            {message && (
              <div className={`mb-4 p-3 rounded-md ${
                message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {message}
              </div>
            )}
            <form onSubmit={handleAddCategory}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newCategory.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Enter category name"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={newCategory.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter category description (optional)"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
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
                  {isAdding ? 'Adding...' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Edit Category Form - Inline on the same page */}
        {showEditForm && selectedCategory && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Edit Category</h3>
            {message && (
              <div className={`mb-4 p-3 rounded-md ${
                message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {message}
              </div>
            )}
            <form onSubmit={handleEditCategory}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                  <input
                    type="text"
                    name="name"
                    value={selectedCategory.name}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Enter category name"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={selectedCategory.description}
                    onChange={handleEditInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter category description (optional)"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditForm(false);
                    setSelectedCategory(null);
                    setMessage('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isEditing}
                  className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isEditing ? 'Updating...' : 'Update Category'}
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Categories Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <tr key={category.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{category.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{category.description || 'No description'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => openEditForm(category)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteCategory(category.id)}
                        disabled={isDeleting === category.id}
                        className={`text-red-600 hover:text-red-900 ${isDeleting === category.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isDeleting === category.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                    No categories found. {searchTerm ? 'Try a different search term.' : 'Add a new category to get started.'}
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
          <h3 className="text-lg font-semibold text-gray-800">Total Categories</h3>
          <p className="text-2xl font-bold text-blue-600">{categories.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">With Descriptions</h3>
          <p className="text-2xl font-bold text-green-600">
            {categories.filter(c => c.description && c.description.trim() !== '').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Last Updated</h3>
          <p className="text-2xl font-bold text-purple-600">Just now</p>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;