import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editCompanyId, setEditCompanyId] = useState(null);

  // Form data
  const [newCompany, setNewCompany] = useState({
    name: '',
    domain: '',
    category: '',
    modules: [],
    company_size: '',
    gstin: '',
    logo: null,
    validity: '',
    admin_name: '',
    admin_email: '',
    admin_phone: '',
    address_line: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    plan: ''
  });

  // Available options for dropdowns
  const [categories, setCategories] = useState(['Finance', 'Technology', 'Healthcare', 'Retail', 'Education', 'Manufacturing', 'Other']);
  const [modulesList, setModulesList] = useState(['HR', 'CRM', 'Billing', 'Inventory', 'Accounting', 'Project Management']);
  const [companySizes] = useState(['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']);
  const [plans, setPlans] = useState(['Basic', 'Pro', 'Enterprise', 'Custom']);

  useEffect(() => {
    fetchCompanies();
    fetchCategories();
    fetchPlans();
    fetchModules();
  }, []);

  useEffect(() => {
    const filtered = companies.filter(company =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (company.domain && company.domain.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (company.admin_email && company.admin_email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredCompanies(filtered);
  }, [searchTerm, companies]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('https://api.csaap.com/api/superadmin/categories', {
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });
      
      let categoriesData = [];
      if (Array.isArray(response.data)) {
        categoriesData = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        categoriesData = response.data.data;
      } else if (response.data && response.data.categories && Array.isArray(response.data.categories)) {
        categoriesData = response.data.categories;
      }
      
      if (categoriesData.length > 0) {
        const categoryNames = categoriesData.map(cat => cat.name || cat.title || cat.category_name || cat);
        setCategories(categoryNames);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchPlans = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('https://api.csaap.com/api/superadmin/plans', {
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });
      
      let plansData = [];
      if (Array.isArray(response.data)) {
        plansData = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        plansData = response.data.data;
      } else if (response.data && response.data.plans && Array.isArray(response.data.plans)) {
        plansData = response.data.plans;
      }
      
      if (plansData.length > 0) {
        const planNames = plansData.map(plan => plan.name || plan.plan_name || plan.title || plan);
        setPlans(planNames);
      }
    } catch (err) {
      console.error('Error fetching plans:', err);
    }
  };

  const fetchModules = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('https://api.csaap.com/api/superadmin/modules', {
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });
      
      let modulesData = [];
      if (Array.isArray(response.data)) {
        modulesData = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        modulesData = response.data.data;
      } else if (response.data && response.data.modules && Array.isArray(response.data.modules)) {
        modulesData = response.data.modules;
      }
      
      if (modulesData.length > 0) {
        const moduleNames = modulesData.map(mod => mod.name || mod.module_name || mod.title || mod);
        setModulesList(moduleNames);
      }
    } catch (err) {
      console.error('Error fetching modules:', err);
    }
  };

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('authToken');
      const response = await axios.get('https://api.csaap.com/api/superadmin/tenants', {
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });
      
      let companiesData = [];
      if (Array.isArray(response.data)) {
        companiesData = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        companiesData = response.data.data;
      } else if (response.data && response.data.tenants && Array.isArray(response.data.tenants)) {
        companiesData = response.data.tenants;
      }
      
      if (companiesData.length > 0) {
        setCompanies(companiesData);
        setFilteredCompanies(companiesData);
      } else {
        throw new Error('No companies data received from API');
      }
      
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error fetching companies');
      console.error('Error fetching companies:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCompany = async (companyId) => {
    if (!window.confirm(`Are you sure you want to delete company ID ${companyId}?`)) {
      return;
    }

    try {
      setIsDeleting(true);
      setError(null);
      setMessage('');

      const token = localStorage.getItem('authToken');
      if (!token) {
        setMessage('Authentication token is missing. Please log in.');
        return;
      }

      await axios.delete(`https://api.csaap.com/api/superadmin/tenants/${companyId}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      const updatedCompanies = companies.filter((company) => company.id !== companyId);
      setCompanies(updatedCompanies);
      setFilteredCompanies(updatedCompanies);
      setMessage('Company deleted successfully!');
    } catch (err) {
      console.error('Error deleting company:', err);
      if (err.response) {
        if (err.response.status === 401) {
          setMessage('Authentication failed. Please login again.');
        } else if (err.response.status === 403) {
          setMessage('You do not have permission to delete companies.');
        } else if (err.response.status === 404) {
          setMessage('Company not found.');
          await fetchCompanies();
        } else {
          setMessage(err.response?.data?.message || 'Failed to delete company');
        }
      } else if (err.request) {
        setMessage('Network error: Please check your connection');
      } else {
        setMessage('Error: ' + err.message);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditCompany = (company) => {
    setNewCompany({
      name: company.name || '',
      domain: company.domain || '',
      category: company.category || '',
      modules: company.modules || [],
      company_size: company.company_size || '',
      gstin: company.gstin || '',
      logo: company.logo || null,
      validity: company.validity || '',
      admin_name: company.admin_name || '',
      admin_email: company.admin_email || '',
      admin_phone: company.admin_phone || '',
      address_line: company.address_line || '',
      city: company.city || '',
      state: company.state || '',
      postal_code: company.postal_code || '',
      country: company.country || '',
      plan: company.plan || ''
    });
    setEditCompanyId(company.id);
    setIsEditing(true);
    setShowAddForm(true);
    setMessage('');
  };

  const updateCompany = async (e) => {
    e.preventDefault();
    try {
      setIsAdding(true);
      setMessage('');

      const token = localStorage.getItem('authToken');
      if (!token) {
        setMessage('Authentication token is missing. Please log in.');
        return;
      }

      const formData = new FormData();
      Object.keys(newCompany).forEach(key => {
        if (key === 'modules') {
          newCompany.modules.forEach(module => {
            formData.append('modules[]', module);
          });
        } else if (key === 'logo') {
          if (newCompany.logo) {
            formData.append('logo', newCompany.logo);
          }
        } else if (newCompany[key] !== null && newCompany[key] !== '') {
          formData.append(key, newCompany[key]);
        }
      });

      const response = await axios.put(
        `https://api.csaap.com/api/superadmin/tenants/${editCompanyId}`,
        formData,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            ...(token && { 'Authorization': `Bearer ${token}` }),
          },
        }
      );

      setMessage('Company updated successfully!');
      setNewCompany({
        name: '',
        domain: '',
        category: '',
        modules: [],
        company_size: '',
        gstin: '',
        logo: null,
        validity: '',
        admin_name: '',
        admin_email: '',
        admin_phone: '',
        address_line: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        plan: ''
      });
      setShowAddForm(false);
      setIsEditing(false);
      setEditCompanyId(null);
      fetchCompanies();
    } catch (err) {
      console.error('Error updating company:', err);
      if (err.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat().join(', ');
        setMessage(`Validation errors: ${errorMessages}`);
      } else {
        setMessage(err.response?.data?.message || 'Error updating company. Please try again.');
      }
    } finally {
      setIsAdding(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompany(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCompany(prev => ({
          ...prev,
          logo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setNewCompany(prev => ({
        ...prev,
        logo: null
      }));
    }
  };

  const handleModuleToggle = (module) => {
    setNewCompany(prev => {
      if (prev.modules.includes(module)) {
        return {
          ...prev,
          modules: prev.modules.filter(m => m !== module)
        };
      } else {
        return {
          ...prev,
          modules: [...prev.modules, module]
        };
      }
    });
  };

  const addCompany = async (e) => {
    e.preventDefault();
    try {
      setIsAdding(true);
      setMessage('');
      
      const token = localStorage.getItem('authToken');
      if (!token) {
        setMessage('Authentication token is missing. Please log in.');
        return;
      }
      
      const formData = new FormData();
      Object.keys(newCompany).forEach(key => {
        if (key === 'modules') {
          newCompany.modules.forEach(module => {
            formData.append('modules[]', module);
          });
        } else if (key === 'logo') {
          if (newCompany.logo) {
            formData.append('logo', newCompany.logo);
          }
        } else if (newCompany[key] !== null && newCompany[key] !== '') {
          formData.append(key, newCompany[key]);
        }
      });
      
      const response = await axios.post(
        'https://api.csaap.com/api/superadmin/tenants',
        formData,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            ...(token && { 'Authorization': `Bearer ${token}` }),
          },
        }
      );
      
      setMessage('Company added successfully!');
      setNewCompany({
        name: '',
        domain: '',
        category: '',
        modules: [],
        company_size: '',
        gstin: '',
        logo: null,
        validity: '',
        admin_name: '',
        admin_email: '',
        admin_phone: '',
        address_line: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        plan: ''
      });
      setShowAddForm(false);
      fetchCompanies();
    } catch (err) {
      console.error('Error adding company:', err);
      if (err.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat().join(', ');
        setMessage(`Validation errors: ${errorMessages}`);
      } else {
        setMessage(err.response?.data?.message || 'Error adding company. Please try again.');
      }
    } finally {
      setIsAdding(false);
    }
  };

  const handleFormSubmit = (e) => {
    if (isEditing) {
      updateCompany(e);
    } else {
      addCompany(e);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div>Loading companies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto mt-8">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
        <button
          onClick={fetchCompanies}
          className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Company Management</h1>

      {message && (
        <div
          className={`mb-4 p-3 rounded-md ${
            message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-gray-700">Companies</h2>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => {
                setShowAddForm(true);
                setIsEditing(false);
                setEditCompanyId(null);
                setNewCompany({
                  name: '',
                  domain: '',
                  category: '',
                  modules: [],
                  company_size: '',
                  gstin: '',
                  logo: null,
                  validity: '',
                  admin_name: '',
                  admin_email: '',
                  admin_phone: '',
                  address_line: '',
                  city: '',
                  state: '',
                  postal_code: '',
                  country: '',
                  plan: ''
                });
                setMessage('');
              }}
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
              Add Company
            </button>
          </div>
        </div>

        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {isEditing ? 'Edit Company' : 'Add New Company'}
            </h3>
            <form onSubmit={handleFormSubmit} className="space-y-4" encType="multipart/form-data">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={newCompany.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Domain *</label>
                  <input
                    type="text"
                    name="domain"
                    value={newCompany.domain}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    name="category"
                    value={newCompany.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    required
                    style={{ zIndex: 1 }}
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-5 text-gray-700">
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                  <select
                    name="company_size"
                    value={newCompany.company_size}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    style={{ zIndex: 1 }}
                  >
                    <option value="">Select Size</option>
                    {companySizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-5 text-gray-700">
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GSTIN</label>
                  <input
                    type="text"
                    name="gstin"
                    value={newCompany.gstin}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Validity Date</label>
                  <input
                    type="date"
                    name="validity"
                    value={newCompany.validity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
                  <select
                    name="plan"
                    value={newCompany.plan}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    style={{ zIndex: 1 }}
                  >
                    <option value="">Select Plan</option>
                    {plans.map(plan => (
                      <option key={plan} value={plan}>{plan}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-5 text-gray-700">
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
                  <input
                    type="file"
                    name="logo"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {newCompany.logo && (
                    <p className="text-sm text-gray-500 mt-1">Selected: Logo uploaded (base64)</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Modules</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {modulesList.map(module => (
                    <div key={module} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`module-${module}`}
                        checked={newCompany.modules.includes(module)}
                        onChange={() => handleModuleToggle(module)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`module-${module}`} className="ml-2 block text-sm text-gray-700">
                        {module}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-lg font-medium text-gray-800 mb-3">Admin Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Admin Name *</label>
                    <input
                      type="text"
                      name="admin_name"
                      value={newCompany.admin_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email *</label>
                    <input
                      type="email"
                      name="admin_email"
                      value={newCompany.admin_email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Admin Phone</label>
                    <input
                      type="text"
                      name="admin_phone"
                      value={newCompany.admin_phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-lg font-medium text-gray-800 mb-3">Address Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Line</label>
                    <input
                      type="text"
                      name="address_line"
                      value={newCompany.address_line}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={newCompany.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={newCompany.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                    <input
                      type="text"
                      name="postal_code"
                      value={newCompany.postal_code}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={newCompany.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setIsEditing(false);
                    setEditCompanyId(null);
                    setNewCompany({
                      name: '',
                      domain: '',
                      category: '',
                      modules: [],
                      company_size: '',
                      gstin: '',
                      logo: null,
                      validity: '',
                      admin_name: '',
                      admin_email: '',
                      admin_phone: '',
                      address_line: '',
                      city: '',
                      state: '',
                      postal_code: '',
                      country: '',
                      plan: ''
                    });
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
                  {isAdding ? (isEditing ? 'Updating...' : 'Adding...') : (isEditing ? 'Update Company' : 'Add Company')}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
                  <tr key={company.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {company.logo ? (
                        <img 
                          src={company.logo} 
                          alt={`${company.name} logo`} 
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-xs">No Logo</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{company.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{company.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{company.domain}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{company.category || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{company.admin_email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {company.plan || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleEditCompany(company)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        disabled={isAdding || isDeleting}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCompany(company.id)}
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
                  <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                    No companies found. {searchTerm ? 'Try a different search term.' : 'Add a new company to get started.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Total Companies</h3>
          <p className="text-2xl font-bold text-blue-600">{companies.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Pro Plans</h3>
          <p className="text-2xl font-bold text-green-600">
            {companies.filter(c => c.plan === 'Pro').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Finance Category</h3>
          <p className="text-2xl font-bold text-purple-600">
            {companies.filter(c => c.category === 'Finance').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Active Companies</h3>
          <p className="text-2xl font-bold text-indigo-600">
            {companies.filter(c => c.validity && new Date(c.validity) > new Date()).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyManagement;