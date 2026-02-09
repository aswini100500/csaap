import React, { useState } from 'react';

const EngineersPage = () => {
  // Sample initial data
  const initialEngineers = [
    {
      id: 1,
      name: 'Michael Chen',
      specialization: 'Structural Engineering',
      projectsAssigned: 5,
      experience: '8 years',
      contact: 'michael.chen@example.com',
      status: 'Available'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      specialization: 'Electrical Engineering',
      projectsAssigned: 3,
      experience: '6 years',
      contact: 'sarah.j@example.com',
      status: 'On Leave'
    },
    {
      id: 3,
      name: 'David Martinez',
      specialization: 'Civil Engineering',
      projectsAssigned: 7,
      experience: '12 years',
      contact: 'david.m@example.com',
      status: 'Available'
    },
    {
      id: 4,
      name: 'Emily Wilson',
      specialization: 'Mechanical Engineering',
      projectsAssigned: 4,
      experience: '5 years',
      contact: 'emily.w@example.com',
      status: 'Available'
    },
    {
      id: 5,
      name: 'James Anderson',
      specialization: 'Project Management',
      projectsAssigned: 2,
      experience: '15 years',
      contact: 'james.a@example.com',
      status: 'On Project'
    }
  ];

  // State for engineers and search
  const [engineers, setEngineers] = useState(initialEngineers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  // State for new engineer form
  const [newEngineer, setNewEngineer] = useState({
    name: '',
    specialization: '',
    projectsAssigned: '',
    experience: '',
    contact: '',
    status: 'Available'
  });

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter engineers based on search term
  const filteredEngineers = engineers.filter(engineer =>
    engineer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    engineer.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEngineer({
      ...newEngineer,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = engineers.length > 0 ? Math.max(...engineers.map(e => e.id)) + 1 : 1;
    
    setEngineers([
      ...engineers,
      {
        id: newId,
        name: newEngineer.name,
        specialization: newEngineer.specialization,
        projectsAssigned: parseInt(newEngineer.projectsAssigned),
        experience: newEngineer.experience,
        contact: newEngineer.contact,
        status: newEngineer.status
      }
    ]);
    
    // Reset form
    setNewEngineer({
      name: '',
      specialization: '',
      projectsAssigned: '',
      experience: '',
      contact: '',
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Engineers Management</h1>
      
      {/* Search and Add Button Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search engineers by name or specialization..."
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
          className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Engineer
        </button>
      </div>
      
      {/* Add Engineer Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Engineer</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newEngineer.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                <select
                  name="specialization"
                  value={newEngineer.specialization}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Specialization</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Structural Engineering">Structural Engineering</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Project Management">Project Management</option>
                  <option value="Quality Assurance">Quality Assurance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Projects Assigned</label>
                <input
                  type="number"
                  name="projectsAssigned"
                  value={newEngineer.projectsAssigned}
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
                  value={newEngineer.experience}
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
                  value={newEngineer.contact}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={newEngineer.status}
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
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add Engineer
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Engineers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects Assigned</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEngineers.length > 0 ? (
              filteredEngineers.map((engineer) => (
                <tr key={engineer.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{engineer.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{engineer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{engineer.specialization}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{engineer.projectsAssigned}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{engineer.experience}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{engineer.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <StatusBadge status={engineer.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                  No engineers found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Summary Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Total Engineers</h3>
          <p className="text-2xl font-bold text-blue-600">{engineers.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Available Engineers</h3>
          <p className="text-2xl font-bold text-green-600">
            {engineers.filter(e => e.status === 'Available').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Total Projects</h3>
          <p className="text-2xl font-bold text-purple-600">
            {engineers.reduce((total, engineer) => total + engineer.projectsAssigned, 0)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">On Leave</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {engineers.filter(e => e.status === 'On Leave').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EngineersPage;