import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCompanyForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    companyDomain: '',
    category: '',
    modules: [],
    companySize: '',
    gstin: '',
    companyLogo: null,
    validityDate: '',
    adminName: '',
    adminEmail: '',
    adminPhone: '',
    adminPassword: '',
    addressLine: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    plan: 'Trial (14 days)'
  });

  const [selectedModules, setSelectedModules] = useState({
    CRM: false,
    ERP: false,
    Builder: false,
    HRMS: false,
    POS: false,
    Inventory: false
  });

  const categories = ['IT Services', 'Manufacturing', 'Retail', 'Healthcare', 'Education', 'Construction', 'Real Estate', 'Other'];
  const companySizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      setSelectedModules(prev => ({
        ...prev,
        [name]: checked
      }));
      
      const moduleArray = Object.entries({...selectedModules, [name]: checked})
        .filter(([_, isSelected]) => isSelected)
        .map(([module]) => module);
        
      setFormData(prev => ({
        ...prev,
        modules: moduleArray
      }));
    } else if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSelectAll = () => {
    const allModules = {
      CRM: true,
      ERP: true,
      Builder: true,
      HRMS: true,
      POS: true,
      Inventory: true
    };
    setSelectedModules(allModules);
    setFormData(prev => ({
      ...prev,
      modules: Object.keys(allModules)
    }));
  };

  const handleDeselectAll = () => {
    setSelectedModules({
      CRM: false,
      ERP: false,
      Builder: false,
      HRMS: false,
      POS: false,
      Inventory: false
    });
    setFormData(prev => ({
      ...prev,
      modules: []
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
    alert('Company created successfully!');
    navigate('/admin/companies'); // Redirect to companies list
  };

  const handleReset = () => {
    setFormData({
      companyName: '',
      companyDomain: '',
      category: '',
      modules: [],
      companySize: '',
      gstin: '',
      companyLogo: null,
      validityDate: '',
      adminName: '',
      adminEmail: '',
      adminPhone: '',
      adminPassword: '',
      addressLine: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India',
      plan: 'Trial (14 days)'
    });
    setSelectedModules({
      CRM: false,
      ERP: false,
      Builder: false,
      HRMS: false,
      POS: false,
      Inventory: false
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Company</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                Company Name *
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="companyDomain" className="block text-sm font-medium text-gray-700">
                Company Domain *
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  example.com
                </span>
                <input
                  type="text"
                  id="companyDomain"
                  name="companyDomain"
                  value={formData.companyDomain}
                  onChange={handleInputChange}
                  required
                  className="flex-1 block w-full rounded-none rounded-r-md border border-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="yourcompany"
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Category...</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Assign Module */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign Module
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(selectedModules).map(([module, isSelected]) => (
                <div key={module} className="flex items-center">
                  <input
                    type="checkbox"
                    id={module}
                    name={module}
                    checked={isSelected}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor={module} className="ml-2 block text-sm text-gray-900">
                    {module}
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-2 flex space-x-4">
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={handleDeselectAll}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Deselect All
              </button>
            </div>
          </div> */}

          {/* Company Size and GSTIN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="companySize" className="block text-sm font-medium text-gray-700">
                Company Size
              </label>
              <select
                id="companySize"
                name="companySize"
                value={formData.companySize}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select...</option>
                {companySizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="gstin" className="block text-sm font-medium text-gray-700">
                GSTIN (India)
              </label>
              <input
                type="text"
                id="gstin"
                name="gstin"
                value={formData.gstin}
                onChange={handleInputChange}
                placeholder="22AAAAA0000"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Company Logo */}
          <div>
            <label htmlFor="companyLogo" className="block text-sm font-medium text-gray-700">
              Company Logo
            </label>
            <input
              type="file"
              id="companyLogo"
              name="companyLogo"
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              accept="image/*"
            />
          </div>

          {/* Validity */}
          <div>
            <label htmlFor="validityDate" className="block text-sm font-medium text-gray-700">
              Validity
            </label>
            <input
              type="date"
              id="validityDate"
              name="validityDate"
              value={formData.validityDate}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Admin Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="adminName" className="block text-sm font-medium text-gray-700">
                Admin Name *
              </label>
              <input
                type="text"
                id="adminName"
                name="adminName"
                value={formData.adminName}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700">
                Admin Email *
              </label>
              <input
                type="email"
                id="adminEmail"
                name="adminEmail"
                value={formData.adminEmail}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="adminPhone" className="block text-sm font-medium text-gray-700">
                Admin Phone
              </label>
              <input
                type="tel"
                id="adminPhone"
                name="adminPhone"
                value={formData.adminPhone}
                onChange={handleInputChange}
                placeholder="+91 98765-43210"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700">
                Password *
              </label>
              <input
                type="password"
                id="adminPassword"
                name="adminPassword"
                value={formData.adminPassword}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Registered Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Registered Address
            </label>
            
            <div className="mb-4">
              <label htmlFor="addressLine" className="block text-sm font-medium text-gray-700">
                Address Line
              </label>
              <input
                type="text"
                id="addressLine"
                name="addressLine"
                value={formData.addressLine}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="India">India</option>
                <option value="USA">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Plan */}
          <div>
            <label htmlFor="plan" className="block text-sm font-medium text-gray-700">
              Plan
            </label>
            <select
              id="plan"
              name="plan"
              value={formData.plan}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Trial (14 days)">Trial (14 days)</option>
              <option value="Basic">Basic</option>
              <option value="Professional">Professional</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCompanyForm;