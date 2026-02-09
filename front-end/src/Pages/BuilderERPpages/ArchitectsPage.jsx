import React, { useState } from 'react';

const ArchitectsPage = () => {
  // Sample initial data
  const initialArchitects = [
    {
      id: 1,
      name: 'Robert Stevens',
      specialization: 'Residential Design',
      projectsCompleted: 12,
      experience: '10 years',
      contact: 'robert.stevens@example.com',
      licenseNumber: 'ARC-12345',
      status: 'Available'
    },
    {
      id: 2,
      name: 'Jennifer Lee',
      specialization: 'Commercial Architecture',
      projectsCompleted: 8,
      experience: '7 years',
      contact: 'jennifer.lee@example.com',
      licenseNumber: 'ARC-23456',
      status: 'On Project'
    },
    {
      id: 3,
      name: 'Marcus Johnson',
      specialization: 'Urban Planning',
      projectsCompleted: 15,
      experience: '14 years',
      contact: 'marcus.j@example.com',
      licenseNumber: 'ARC-34567',
      status: 'Available'
    },
    {
      id: 4,
      name: 'Sophia Rodriguez',
      specialization: 'Sustainable Design',
      projectsCompleted: 9,
      experience: '6 years',
      contact: 'sophia.r@example.com',
      licenseNumber: 'ARC-45678',
      status: 'On Leave'
    },
    {
      id: 5,
      name: 'Alexander Wong',
      specialization: 'Interior Architecture',
      projectsCompleted: 11,
      experience: '9 years',
      contact: 'alex.wong@example.com',
      licenseNumber: 'ARC-56789',
      status: 'Available'
    }
  ];

  // State for architects and search
  const [architects, setArchitects] = useState(initialArchitects);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  // State for new architect form
  const [newArchitect, setNewArchitect] = useState({
    name: '',
    specialization: '',
    projectsCompleted: '',
    experience: '',
    contact: '',
    licenseNumber: '',
    status: 'Available'
  });

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter architects based on search term
  const filteredArchitects = architects.filter(architect =>
    architect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    architect.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    architect.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArchitect({
      ...newArchitect,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = architects.length > 0 ? Math.max(...architects.map(a => a.id)) + 1 : 1;
    
    setArchitects([
      ...architects,
      {
        id: newId,
        name: newArchitect.name,
        specialization: newArchitect.specialization,
        projectsCompleted: parseInt(newArchitect.projectsCompleted),
        experience: newArchitect.experience,
        contact: newArchitect.contact,
        licenseNumber: newArchitect.licenseNumber,
        status: newArchitect.status
      }
    ]);
    
    // Reset form
    setNewArchitect({
      name: '',
      specialization: '',
      projectsCompleted: '',
      experience: '',
      contact: '',
      licenseNumber: '',
      status: 'Available'
    });
    
    setShowAddForm(false);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    let bgColor = '';
    switch(status) {
      case 'Available':
        bgColor = 'bg-green-100 text-green-800';
        break;
      case 'On Project':
        bgColor = 'bg-blue-100 text-blue-800';
        break;
      case 'On Leave':
        bgColor = 'bg-yellow-100 text-yellow-800';
        break;
      default:
        bgColor = 'bg-gray-100 text-gray-800';
    }
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Architects Management</h1>
      
      {/* Search and Add Button Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search architects by name, specialization or license..."
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
          className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Architect
        </button>
      </div>
      
      {/* Add Architect Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Architect</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newArchitect.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                <select
                  name="specialization"
                  value={newArchitect.specialization}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Specialization</option>
                  <option value="Residential Design">Residential Design</option>
                  <option value="Commercial Architecture">Commercial Architecture</option>
                  <option value="Urban Planning">Urban Planning</option>
                  <option value="Sustainable Design">Sustainable Design</option>
                  <option value="Interior Architecture">Interior Architecture</option>
                  <option value="Landscape Architecture">Landscape Architecture</option>
                  <option value="Industrial Design">Industrial Design</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Projects Completed</label>
                <input
                  type="number"
                  name="projectsCompleted"
                  value={newArchitect.projectsCompleted}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                <select
                  name="experience"
                  value={newArchitect.experience}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Experience</option>
                  <option value="0-2 years">0-2 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="6-10 years">6-10 years</option>
                  <option value="11-15 years">11-15 years</option>
                  <option value="15+ years">15+ years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                <input
                  type="email"
                  name="contact"
                  value={newArchitect.contact}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={newArchitect.licenseNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., ARC-12345"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={newArchitect.status}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Available">Available</option>
                  <option value="On Project">On Project</option>
                  <option value="On Leave">On Leave</option>
                </select>
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
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
              >
                Add Architect
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Architects Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects Completed</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License Number</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredArchitects.length > 0 ? (
              filteredArchitects.map((architect) => (
                <tr key={architect.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{architect.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{architect.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{architect.specialization}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">{architect.projectsCompleted}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{architect.experience}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{architect.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-mono">{architect.licenseNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <StatusBadge status={architect.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
                  No architects found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Summary Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Total Architects</h3>
          <p className="text-2xl font-bold text-blue-600">{architects.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Available Architects</h3>
          <p className="text-2xl font-bold text-green-600">
            {architects.filter(a => a.status === 'Available').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Total Projects Completed</h3>
          <p className="text-2xl font-bold text-purple-600">
            {architects.reduce((total, architect) => total + architect.projectsCompleted, 0)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">On Leave</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {architects.filter(a => a.status === 'On Leave').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArchitectsPage;