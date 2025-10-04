import React, { useState } from 'react';

const ProjectsPage = () => {
  // Sample initial data
  const initialProjects = [
    {
      id: 1,
      projectName: 'Tower A - Residential Complex',
      projectType: 'Apartment',
      client: 'Skyline Developers',
      startDate: '2023-01-15',
      endDate: '2024-06-30',
      status: 'In Progress',
      budget: 2500000,
      spent: 1850000,
      progress: 65,
      manager: 'Robert Johnson',
      teamSize: 24,
      priority: 'High',
      tasks: [
        { id: 1, name: 'Foundation Work', status: 'Completed', assignedTo: 'Construction Team A', dueDate: '2023-03-15' },
        { id: 2, name: 'Structural Framework', status: 'Completed', assignedTo: 'Construction Team B', dueDate: '2023-06-30' },
        { id: 3, name: 'Electrical Wiring', status: 'In Progress', assignedTo: 'Electrical Team', dueDate: '2023-11-30' },
        { id: 4, name: 'Interior Finishing', status: 'Not Started', assignedTo: 'Interior Team', dueDate: '2024-03-15' }
      ]
    },
    {
      id: 2,
      projectName: 'Commercial Plaza Renovation',
      projectType: 'Commercial',
      client: 'Metro Business Group',
      startDate: '2023-03-10',
      endDate: '2023-12-20',
      status: 'In Progress',
      budget: 1200000,
      spent: 950000,
      progress: 75,
      manager: 'Sarah Williams',
      teamSize: 18,
      priority: 'Medium',
      tasks: [
        { id: 1, name: 'Demolition Work', status: 'Completed', assignedTo: 'Demolition Team', dueDate: '2023-04-30' },
        { id: 2, name: 'Structural Reinforcement', status: 'Completed', assignedTo: 'Construction Team C', dueDate: '2023-06-15' },
        { id: 3, name: 'Facade Redesign', status: 'In Progress', assignedTo: 'Design Team', dueDate: '2023-10-31' },
        { id: 4, name: 'Landscaping', status: 'Not Started', assignedTo: 'Landscape Team', dueDate: '2023-11-30' }
      ]
    },
    {
      id: 3,
      projectName: 'Villa Compound - Phase 2',
      projectType: 'Duplex',
      client: 'Elite Properties',
      startDate: '2022-11-01',
      endDate: '2023-09-30',
      status: 'Completed',
      budget: 1800000,
      spent: 1750000,
      progress: 100,
      manager: 'Michael Chen',
      teamSize: 22,
      priority: 'High',
      tasks: [
        { id: 1, name: 'Site Preparation', status: 'Completed', assignedTo: 'Site Team', dueDate: '2023-01-15' },
        { id: 2, name: 'Construction', status: 'Completed', assignedTo: 'Construction Team D', dueDate: '2023-06-30' },
        { id: 3, name: 'Finishing Work', status: 'Completed', assignedTo: 'Finishing Team', dueDate: '2023-08-15' },
        { id: 4, name: 'Quality Inspection', status: 'Completed', assignedTo: 'QA Team', dueDate: '2023-09-15' }
      ]
    },
    {
      id: 4,
      projectName: 'Hospital Wing Extension',
      projectType: 'Commercial',
      client: 'City Healthcare',
      startDate: '2023-05-01',
      endDate: '2024-02-28',
      status: 'On Hold',
      budget: 3200000,
      spent: 850000,
      progress: 25,
      manager: 'David Miller',
      teamSize: 28,
      priority: 'Critical',
      tasks: [
        { id: 1, name: 'Planning Approval', status: 'Completed', assignedTo: 'Planning Team', dueDate: '2023-04-15' },
        { id: 2, name: 'Foundation Work', status: 'In Progress', assignedTo: 'Construction Team A', dueDate: '2023-07-31' },
        { id: 3, name: 'Specialized Installation', status: 'On Hold', assignedTo: 'Specialist Team', dueDate: '2023-10-31' },
        { id: 4, name: 'Interior Setup', status: 'Not Started', assignedTo: 'Interior Team', dueDate: '2024-01-15' }
      ]
    },
    {
      id: 5,
      projectName: 'Road Infrastructure Project',
      projectType: 'Infrastructure',
      client: 'Urban Development Authority',
      startDate: '2023-02-20',
      endDate: '2023-11-30',
      status: 'Delayed',
      budget: 2800000,
      spent: 2100000,
      progress: 70,
      manager: 'Emma Thompson',
      teamSize: 35,
      priority: 'High',
      tasks: [
        { id: 1, name: 'Land Acquisition', status: 'Completed', assignedTo: 'Legal Team', dueDate: '2023-03-31' },
        { id: 2, name: 'Earthwork', status: 'Completed', assignedTo: 'Earthmoving Team', dueDate: '2023-05-15' },
        { id: 3, name: 'Paving', status: 'Delayed', assignedTo: 'Paving Team', dueDate: '2023-09-30' },
        { id: 4, name: 'Signage Installation', status: 'Not Started', assignedTo: 'Signage Team', dueDate: '2023-10-31' }
      ]
    }
  ];

  // State for projects and search
  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // State for new project form
  const [newProject, setNewProject] = useState({
    projectName: '',
    projectType: 'Plotting',
    client: '',
    startDate: '',
    endDate: '',
    budget: '',
    manager: '',
    teamSize: '',
    priority: 'Medium',
    plots: [{ area: '', boundary: '', broker: '', purchaser: '', finalPrice: '' }],
    numPlots: 1
  });

  // State for new task form
  const [newTask, setNewTask] = useState({
    name: '',
    assignedTo: '',
    dueDate: ''
  });

  // Broker list
  const brokerList = ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'Robert Wilson'];

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter projects based on search term
  const filteredProjects = projects.filter(project =>
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.projectType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({
      ...newProject,
      [name]: value
    });
  };

  // Handle plot input changes
  const handlePlotChange = (index, e) => {
    const { name, value } = e.target;
    const plots = [...newProject.plots];
    plots[index][name] = value;
    setNewProject({
      ...newProject,
      plots
    });
  };

  // Handle number of plots change
  const handleNumPlotsChange = (e) => {
    const numPlots = parseInt(e.target.value);
    const plots = [];
    
    for (let i = 0; i < numPlots; i++) {
      if (i < newProject.plots.length) {
        plots.push(newProject.plots[i]);
      } else {
        plots.push({ area: '', boundary: '', broker: '', purchaser: '', finalPrice: '' });
      }
    }
    
    setNewProject({
      ...newProject,
      numPlots,
      plots
    });
  };

  // Handle task form input changes
  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value
    });
  };

  // Handle project form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    
    const projectData = {
      id: newId,
      projectName: newProject.projectName,
      projectType: newProject.projectType,
      client: newProject.client,
      startDate: newProject.startDate,
      endDate: newProject.endDate,
      status: 'Not Started',
      budget: parseFloat(newProject.budget),
      spent: 0,
      progress: 0,
      manager: newProject.manager,
      teamSize: parseInt(newProject.teamSize),
      priority: newProject.priority,
      tasks: []
    };
    
    // Add plots data if project type is Plotting
    if (newProject.projectType === 'Plotting') {
      projectData.plots = newProject.plots;
    }
    
    setProjects([
      ...projects,
      projectData
    ]);
    
    // Reset form
    setNewProject({
      projectName: '',
      projectType: 'Plotting',
      client: '',
      startDate: '',
      endDate: '',
      budget: '',
      manager: '',
      teamSize: '',
      priority: 'Medium',
      plots: [{ area: '', boundary: '', broker: '', purchaser: '', finalPrice: '' }],
      numPlots: 1
    });
    
    setShowAddForm(false);
  };

  // Handle task form submission
  const handleTaskSubmit = (e) => {
    e.preventDefault();
    const taskId = selectedProject.tasks.length > 0 ? Math.max(...selectedProject.tasks.map(t => t.id)) + 1 : 1;
    
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject.id) {
        return {
          ...project,
          tasks: [
            ...project.tasks,
            {
              id: taskId,
              name: newTask.name,
              status: 'Not Started',
              assignedTo: newTask.assignedTo,
              dueDate: newTask.dueDate
            }
          ]
        };
      }
      return project;
    });
    
    setProjects(updatedProjects);
    setShowTaskForm(false);
    setNewTask({
      name: '',
      assignedTo: '',
      dueDate: ''
    });
  };

  // Open task form for a specific project
  const openTaskForm = (project) => {
    setSelectedProject(project);
    setShowTaskForm(true);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    let bgColor = '';
    switch(status) {
      case 'Completed':
        bgColor = 'bg-green-100 text-green-800';
        break;
      case 'In Progress':
        bgColor = 'bg-blue-100 text-blue-800';
        break;
      case 'On Hold':
        bgColor = 'bg-yellow-100 text-yellow-800';
        break;
      case 'Delayed':
        bgColor = 'bg-orange-100 text-orange-800';
        break;
      case 'Not Started':
        bgColor = 'bg-gray-100 text-gray-800';
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

  // Priority badge component
  const PriorityBadge = ({ priority }) => {
    let bgColor = '';
    switch(priority) {
      case 'Critical':
        bgColor = 'bg-red-100 text-red-800';
        break;
      case 'High':
        bgColor = 'bg-orange-100 text-orange-800';
        break;
      case 'Medium':
        bgColor = 'bg-yellow-100 text-yellow-800';
        break;
      case 'Low':
        bgColor = 'bg-green-100 text-green-800';
        break;
      default:
        bgColor = 'bg-gray-100 text-gray-800';
    }
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor}`}>
        {priority}
      </span>
    );
  };

  // Progress bar component
  const ProgressBar = ({ progress }) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Project Management</h1>
      
      {/* Search and Add Button Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search projects by name, client, status, type or manager..."
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
          Add Project
        </button>
      </div>
      
      {/* Add Project Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Project</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input
                  type="text"
                  name="projectName"
                  value={newProject.projectName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
                <select
                  name="projectType"
                  value={newProject.projectType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Plotting">Plotting</option>
                  <option value="Duplex">Duplex</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Infrastructure">Infrastructure</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                <input
                  type="text"
                  name="client"
                  value={newProject.client}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={newProject.startDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={newProject.endDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                <input
                  type="number"
                  name="budget"
                  value={newProject.budget}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Manager</label>
                <input
                  type="text"
                  name="manager"
                  value={newProject.manager}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                <input
                  type="number"
                  name="teamSize"
                  value={newProject.teamSize}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  name="priority"
                  value={newProject.priority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>
            
            {/* Plotting-specific fields */}
            {newProject.projectType === 'Plotting' && (
              <div className="mt-4 border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Plot Details</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Plots</label>
                  <input
                    type="number"
                    min="1"
                    value={newProject.numPlots}
                    onChange={handleNumPlotsChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {newProject.plots.map((plot, index) => (
                    <div key={index} className="border p-4 rounded-md">
                      <h4 className="font-medium text-gray-700 mb-3">Plot {index + 1}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Area (sq ft)</label>
                          <input
                            type="text"
                            name="area"
                            value={plot.area}
                            onChange={(e) => handlePlotChange(index, e)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Boundary</label>
                          <input
                            type="text"
                            name="boundary"
                            value={plot.boundary}
                            onChange={(e) => handlePlotChange(index, e)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Broker</label>
                          <select
                            name="broker"
                            value={plot.broker}
                            onChange={(e) => handlePlotChange(index, e)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select Broker</option>
                            {brokerList.map((broker, i) => (
                              <option key={i} value={broker}>{broker}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Purchaser</label>
                          <input
                            type="text"
                            name="purchaser"
                            value={plot.purchaser}
                            onChange={(e) => handlePlotChange(index, e)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Final Price</label>
                          <input
                            type="number"
                            name="finalPrice"
                            value={plot.finalPrice}
                            onChange={(e) => handlePlotChange(index, e)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
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
                Add Project
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Add Task Form */}
      {showTaskForm && selectedProject && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Task to {selectedProject.projectName}</h2>
          <form onSubmit={handleTaskSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
                <input
                  type="text"
                  name="name"
                  value={newTask.name}
                  onChange={handleTaskChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                <input
                  type="text"
                  name="assignedTo"
                  value={newTask.assignedTo}
                  onChange={handleTaskChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={newTask.dueDate}
                  onChange={handleTaskChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowTaskForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Projects Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeline</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{project.projectName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{project.projectType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{project.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {project.startDate} to {project.endDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(project.budget)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div className="flex items-center">
                      <div className="w-16 mr-2">{project.progress}%</div>
                      <div className="w-32">
                        <ProgressBar progress={project.progress} />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <StatusBadge status={project.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <PriorityBadge priority={project.priority} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => openTaskForm(project)}
                      className="text-green-600 hover:text-green-900 mr-3"
                    >
                      Add Task
                    </button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="px-6 py-4 text-center text-sm text-gray-500">
                  No projects found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Project Details Modal */}
      {selectedProject && !showTaskForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative bg-white p-6 rounded-lg shadow-md max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{selectedProject.projectName} - Details</h2>
              <button 
                onClick={() => setSelectedProject(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p><span className="font-medium">Type:</span> {selectedProject.projectType}</p>
                <p><span className="font-medium">Client:</span> {selectedProject.client}</p>
                <p><span className="font-medium">Timeline:</span> {selectedProject.startDate} to {selectedProject.endDate}</p>
                <p><span className="font-medium">Budget:</span> {formatCurrency(selectedProject.budget)}</p>
              </div>
              <div>
                <p><span className="font-medium">Project Manager:</span> {selectedProject.manager}</p>
                <p><span className="font-medium">Team Size:</span> {selectedProject.teamSize} people</p>
                <p><span className="font-medium">Status:</span> <StatusBadge status={selectedProject.status} /></p>
                <p><span className="font-medium">Priority:</span> <PriorityBadge priority={selectedProject.priority} /></p>
              </div>
            </div>
            
            {/* Plot details for plotting projects */}
            {selectedProject.projectType === 'Plotting' && selectedProject.plots && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Plot Details</h3>
                <div className="overflow-y-auto max-h-96">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plot #</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area (sq ft)</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Boundary</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Broker</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchaser</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Final Price</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedProject.plots.map((plot, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{plot.area}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{plot.boundary}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{plot.broker}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{plot.purchaser}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(plot.finalPrice)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tasks</h3>
            <div className="overflow-y-auto max-h-96 mb-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedProject.tasks.map((task) => (
                    <tr key={task.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{task.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{task.assignedTo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{task.dueDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <StatusBadge status={task.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Summary Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Total Projects</h3>
          <p className="text-2xl font-bold text-blue-600">{projects.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Total Budget</h3>
          <p className="text-2xl font-bold text-purple-600">
            {formatCurrency(projects.reduce((total, project) => total + project.budget, 0))}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">In Progress</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {projects.filter(project => project.status === 'In Progress').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Completed</h3>
          <p className="text-2xl font-bold text-green-600">
            {projects.filter(project => project.status === 'Completed').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;