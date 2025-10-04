import React, { useState } from 'react';
import LedgerDetails from './LedgerDetails';

const CustomersPage = () => {
  // Sample initial data
  const initialCustomers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@techinnovations.com',
      phone: '+1 (555) 123-4567',
      alternatePhone: '+1 (555) 123-0000',
      address: '123 Main St, New York, NY 10001',
      project: 'Luxury Apartments',
      unit: 'A101 (Flat)',
      budget: 250000,
      status: 'Active',
      downloads: 12,
      brokerName: 'John Smith',
      paymentSlabs: [
        { milestone: 'Booking Amount', percentage: 10, amount: 25000, dueDate: '2023-05-15', status: 'Paid' },
        { milestone: 'At Time of Agreement', percentage: 15, amount: 37500, dueDate: '2023-06-30', status: 'Pending' },
        { milestone: 'On Foundation Complete', percentage: 20, amount: 50000, dueDate: '2023-08-15', status: 'Pending' },
        { milestone: 'On Superstructure', percentage: 25, amount: 62500, dueDate: '2023-10-30', status: 'Pending' },
        { milestone: 'On Possession', percentage: 30, amount: 75000, dueDate: '2024-02-15', status: 'Pending' }
      ]
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@globalsolutions.com',
      phone: '+1 (555) 234-5678',
      alternatePhone: '+1 (555) 234-0000',
      address: '456 Oak Ave, Los Angeles, CA 90001',
      project: 'Green Valley Homes',
      unit: 'GV201 (Duplex)',
      budget: 420000,
      status: 'Negotiation',
      downloads: 8,
      brokerName: 'Emma Wilson',
      paymentSlabs: [
        { milestone: 'Booking Amount', percentage: 5, amount: 21000, dueDate: '2023-06-10', status: 'Paid' },
        { milestone: 'At Time of Agreement', percentage: 10, amount: 42000, dueDate: '2023-07-25', status: 'Pending' },
        { milestone: 'On Foundation Complete', percentage: 15, amount: 63000, dueDate: '2023-09-10', status: 'Pending' },
        { milestone: 'On Superstructure', percentage: 25, amount: 105000, dueDate: '2023-11-30', status: 'Pending' },
        { milestone: 'On Possession', percentage: 45, amount: 189000, dueDate: '2024-03-15', status: 'Pending' }
      ]
    },
    {
      id: 3,
      name: 'Emma Williams',
      email: 'emma.w@williamsassociates.com',
      phone: '+1 (555) 345-6789',
      alternatePhone: '+1 (555) 345-0000',
      address: '789 Pine Rd, Chicago, IL 60007',
      project: 'Ocean View Residences',
      unit: 'OV102 (Flat)',
      budget: 370000,
      status: 'Completed',
      downloads: 15,
      brokerName: 'Robert Brown',
      paymentSlabs: [
        { milestone: 'Booking Amount', percentage: 10, amount: 37000, dueDate: '2023-01-15', status: 'Paid' },
        { milestone: 'At Time of Agreement', percentage: 15, amount: 55500, dueDate: '2023-02-28', status: 'Paid' },
        { milestone: 'On Foundation Complete', percentage: 20, amount: 74000, dueDate: '2023-04-15', status: 'Paid' },
        { milestone: 'On Superstructure', percentage: 25, amount: 92500, dueDate: '2023-06-30', status: 'Paid' },
        { milestone: 'On Possession', percentage: 30, amount: 111000, dueDate: '2023-09-15', status: 'Paid' }
      ]
    },
    {
      id: 4,
      name: 'David Rodriguez',
      email: 'd.rodriguez@primerealestate.com',
      phone: '+1 (555) 456-7890',
      alternatePhone: '+1 (555) 456-0000',
      address: '101 Elm St, Miami, FL 33101',
      project: 'Luxury Apartments',
      unit: 'A202 (Duplex)',
      budget: 480000,
      status: 'Active',
      downloads: 5,
      brokerName: 'John Smith',
      paymentSlabs: [
        { milestone: 'Booking Amount', percentage: 10, amount: 48000, dueDate: '2023-07-05', status: 'Paid' },
        { milestone: 'At Time of Agreement', percentage: 15, amount: 72000, dueDate: '2023-08-20', status: 'Pending' },
        { milestone: 'On Foundation Complete', percentage: 20, amount: 96000, dueDate: '2023-10-05', status: 'Pending' },
        { milestone: 'On Superstructure', percentage: 25, amount: 120000, dueDate: '2023-12-20', status: 'Pending' },
        { milestone: 'On Possession', percentage: 30, amount: 144000, dueDate: '2024-04-05', status: 'Pending' }
      ]
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      email: 'lisa@thompsonenterprises.com',
      phone: '+1 (555) 567-8901',
      alternatePhone: '+1 (555) 567-0000',
      address: '202 Maple Dr, Seattle, WA 98101',
      project: 'Green Valley Homes',
      unit: 'GV101 (Flat)',
      budget: 220000,
      status: 'On Hold',
      downloads: 3,
      brokerName: 'Sarah Davis',
      paymentSlabs: [
        { milestone: 'Booking Amount', percentage: 5, amount: 11000, dueDate: '2023-08-20', status: 'Paid' },
        { milestone: 'At Time of Agreement', percentage: 10, amount: 22000, dueDate: '2023-10-05', status: 'Pending' },
        { milestone: 'On Foundation Complete', percentage: 15, amount: 33000, dueDate: '2023-11-20', status: 'Pending' },
        { milestone: 'On Superstructure', percentage: 25, amount: 55000, dueDate: '2024-02-05', status: 'Pending' },
        { milestone: 'On Possession', percentage: 45, amount: 99000, dueDate: '2024-05-20', status: 'Pending' }
      ]
    }
  ];

  // Sample projects with units and prices
  const projectList = [
    {
      id: 1,
      name: 'Luxury Apartments',
      units: [
        { id: 'A101', type: 'Flat', price: 250000 },
        { id: 'A102', type: 'Flat', price: 275000 },
        { id: 'A201', type: 'Duplex', price: 450000 },
        { id: 'A202', type: 'Duplex', price: 480000 }
      ]
    },
    {
      id: 2,
      name: 'Green Valley Homes',
      units: [
        { id: 'GV101', type: 'Flat', price: 220000 },
        { id: 'GV102', type: 'Flat', price: 230000 },
        { id: 'GV201', type: 'Duplex', price: 420000 },
        { id: 'GV202', type: 'Duplex', price: 440000 }
      ]
    },
    {
      id: 3,
      name: 'Ocean View Residences',
      units: [
        { id: 'OV101', type: 'Flat', price: 350000 },
        { id: 'OV102', type: 'Flat', price: 370000 },
        { id: 'OV201', type: 'Duplex', price: 650000 },
        { id: 'OV202', type: 'Duplex', price: 680000 }
      ]
    }
  ];

  // Sample broker list
  const brokerList = [
    { id: 1, name: 'John Smith' },
    { id: 2, name: 'Emma Wilson' },
    { id: 3, name: 'Robert Brown' },
    { id: 4, name: 'Sarah Davis' },
    { id: 5, name: 'Michael Johnson' }
  ];

  // Payment slab templates
  const paymentTemplates = [
    {
      id: 1,
      name: 'Standard 5-Slab Plan',
      slabs: [
        { milestone: 'Booking Amount', percentage: 10 },
        { milestone: 'At Time of Agreement', percentage: 15 },
        { milestone: 'On Foundation Complete', percentage: 20 },
        { milestone: 'On Superstructure', percentage: 25 },
        { milestone: 'On Possession', percentage: 30 }
      ]
    },
    {
      id: 2,
      name: 'Flexi 5-Slab Plan',
      slabs: [
        { milestone: 'Booking Amount', percentage: 5 },
        { milestone: 'At Time of Agreement', percentage: 10 },
        { milestone: 'On Foundation Complete', percentage: 15 },
        { milestone: 'On Superstructure', percentage: 25 },
        { milestone: 'On Possession', percentage: 45 }
      ]
    },
    {
      id: 3,
      name: 'Quick 4-Slab Plan',
      slabs: [
        { milestone: 'Booking Amount', percentage: 15 },
        { milestone: 'At Time of Agreement', percentage: 20 },
        { milestone: 'On Superstructure', percentage: 30 },
        { milestone: 'On Possession', percentage: 35 }
      ]
    }
  ];

  // State for customers and search
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  // State for new customer form
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    alternatePhone: '',
    address: '',
    brokerName: '',
    purchaseHistory: {
      projectId: '',
      unitId: '',
      originalPrice: 0,
      negotiatedPrice: 0
    },
    paymentSlabs: []
  });

  // State for selected project units
  const [selectedProjectUnits, setSelectedProjectUnits] = useState([]);
  const [selectedPaymentTemplate, setSelectedPaymentTemplate] = useState('');

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.brokerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('purchaseHistory.')) {
      const field = name.split('.')[1];
      
      if (field === 'projectId') {
        const project = projectList.find(p => p.id === parseInt(value));
        const units = project ? project.units : [];
        setSelectedProjectUnits(units);
        
        // Reset unit selection when project changes
        setNewCustomer({
          ...newCustomer,
          purchaseHistory: {
            ...newCustomer.purchaseHistory,
            projectId: value,
            unitId: '',
            originalPrice: 0,
            negotiatedPrice: 0
          }
        });
      } else if (field === 'unitId') {
        const selectedUnit = selectedProjectUnits.find(unit => unit.id === value);
        setNewCustomer({
          ...newCustomer,
          purchaseHistory: {
            ...newCustomer.purchaseHistory,
            unitId: value,
            originalPrice: selectedUnit ? selectedUnit.price : 0,
            negotiatedPrice: selectedUnit ? selectedUnit.price : 0
          }
        });
      } else {
        setNewCustomer({
          ...newCustomer,
          purchaseHistory: {
            ...newCustomer.purchaseHistory,
            [field]: field === 'negotiatedPrice' ? parseFloat(value) || 0 : value
          }
        });
      }
    } else {
      setNewCustomer({
        ...newCustomer,
        [name]: value
      });
    }
  };

  // Handle payment template selection
  const handleTemplateChange = (e) => {
    const templateId = parseInt(e.target.value);
    setSelectedPaymentTemplate(templateId);
    
    if (templateId && newCustomer.purchaseHistory.negotiatedPrice > 0) {
      const template = paymentTemplates.find(t => t.id === templateId);
      if (template) {
        const totalPrice = newCustomer.purchaseHistory.negotiatedPrice;
        const today = new Date();
        
        const slabs = template.slabs.map((slab, index) => {
          // Calculate due dates (30 days apart for demonstration)
          const dueDate = new Date(today);
          dueDate.setDate(today.getDate() + (index + 1) * 30);
          
          return {
            milestone: slab.milestone,
            percentage: slab.percentage,
            amount: Math.round(totalPrice * (slab.percentage / 100)),
            dueDate: dueDate.toISOString().split('T')[0],
            status: index === 0 ? 'Pending' : 'Pending' // First payment is usually paid at booking
          };
        });
        
        setNewCustomer({
          ...newCustomer,
          paymentSlabs: slabs
        });
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
    
    // Get project and unit details
    const selectedProject = projectList.find(p => p.id === parseInt(newCustomer.purchaseHistory.projectId));
    const selectedUnit = selectedProjectUnits.find(u => u.id === newCustomer.purchaseHistory.unitId);
    
    setCustomers([
      ...customers,
      {
        id: newId,
        name: newCustomer.name,
        email: newCustomer.email,
        phone: newCustomer.phone,
        alternatePhone: newCustomer.alternatePhone,
        address: newCustomer.address,
        brokerName: newCustomer.brokerName,
        project: selectedProject ? selectedProject.name : '',
        unit: selectedUnit ? `${selectedUnit.id} (${selectedUnit.type})` : '',
        budget: parseFloat(newCustomer.purchaseHistory.negotiatedPrice),
        status: 'Active',
        downloads: 0,
        purchaseHistory: newCustomer.purchaseHistory,
        paymentSlabs: newCustomer.paymentSlabs
      }
    ]);
    
    // Reset form
    setNewCustomer({
      name: '',
      email: '',
      phone: '',
      alternatePhone: '',
      address: '',
      brokerName: '',
      purchaseHistory: {
        projectId: '',
        unitId: '',
        originalPrice: 0,
        negotiatedPrice: 0
      },
      paymentSlabs: []
    });
    
    setSelectedProjectUnits([]);
    setSelectedPaymentTemplate('');
    setShowAddForm(false);
  };

  // Function to download customer details as PDF
  const downloadCustomerPDF = (customer) => {
    // In a real application, you would use a library like jsPDF or pdfmake
    // For this example, we'll create a simple text representation and download it
    
    const customerDetails = `
      CUSTOMER DETAILS
      =================
      ID: ${customer.id}
      Name: ${customer.name}
      Email: ${customer.email}
      Phone: ${customer.phone}
      Alternate Phone: ${customer.alternatePhone || 'N/A'}
      Address: ${customer.address}
      Broker: ${customer.brokerName}
      Project: ${customer.project}
      Unit: ${customer.unit}
      Budget: ${formatCurrency(customer.budget)}
      Status: ${customer.status}
      Downloads: ${customer.downloads}
      Purchase History:
        - Original Price: ${formatCurrency(customer.purchaseHistory?.originalPrice || 0)}
        - Negotiated Price: ${formatCurrency(customer.purchaseHistory?.negotiatedPrice || 0)}
      Payment Plan:
      ${customer.paymentSlabs ? customer.paymentSlabs.map(slab => `
        - ${slab.milestone}: ${slab.percentage}% (${formatCurrency(slab.amount)}) Due: ${slab.dueDate} [${slab.status}]
      `).join('') : 'No payment plan defined'}
      Generated on: ${new Date().toLocaleString()}
    `;
    
    // Create a blob and download link
    const blob = new Blob([customerDetails], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `customer_${customer.id}_${customer.name.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Update download count
    setCustomers(customers.map(c => 
      c.id === customer.id ? { ...c, downloads: c.downloads + 1 } : c
    ));
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    let bgColor = '';
    switch(status) {
      case 'Active':
        bgColor = 'bg-green-100 text-green-800';
        break;
      case 'Negotiation':
        bgColor = 'bg-blue-100 text-blue-800';
        break;
      case 'Completed':
        bgColor = 'bg-purple-100 text-purple-800';
        break;
      case 'On Hold':
        bgColor = 'bg-yellow-100 text-yellow-800';
        break;
      case 'Lost':
        bgColor = 'bg-red-100 text-red-800';
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

  // Payment status badge component
  const PaymentStatusBadge = ({ status }) => {
    let bgColor = '';
    switch(status) {
      case 'Paid':
        bgColor = 'bg-green-100 text-green-800';
        break;
      case 'Pending':
        bgColor = 'bg-yellow-100 text-yellow-800';
        break;
      case 'Overdue':
        bgColor = 'bg-red-100 text-red-800';
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

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Customers Management</h1>
      
      {/* Search and Add Button Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search customers by name, email, project or broker..."
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
          Add Customer
        </button>
      </div>
      
      {/* Add Customer Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Customer</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={newCustomer.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={newCustomer.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={newCustomer.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Phone</label>
                <input
                  type="tel"
                  name="alternatePhone"
                  value={newCustomer.alternatePhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Broker Name</label>
                <select
                  name="brokerName"
                  value={newCustomer.brokerName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a broker</option>
                  {brokerList.map(broker => (
                    <option key={broker.id} value={broker.name}>
                      {broker.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                <textarea
                  name="address"
                  value={newCustomer.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            {/* Purchase History Section */}
            <div className="border-t border-gray-200 pt-4 mb-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Purchase History</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project *</label>
                  <select
                    name="purchaseHistory.projectId"
                    value={newCustomer.purchaseHistory.projectId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a project</option>
                    {projectList.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit (Flat/Duplex) *</label>
                  <select
                    name="purchaseHistory.unitId"
                    value={newCustomer.purchaseHistory.unitId}
                    onChange={handleInputChange}
                    required
                    disabled={!newCustomer.purchaseHistory.projectId}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a unit</option>
                    {selectedProjectUnits.map(unit => (
                      <option key={unit.id} value={unit.id}>
                        {unit.id} ({unit.type}) - {formatCurrency(unit.price)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
                  <input
                    type="text"
                    value={formatCurrency(newCustomer.purchaseHistory.originalPrice)}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Negotiated Price *</label>
                  <input
                    type="number"
                    name="purchaseHistory.negotiatedPrice"
                    value={newCustomer.purchaseHistory.negotiatedPrice}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Payment Slabs Section */}
            {newCustomer.purchaseHistory.negotiatedPrice > 0 && (
              <div className="border-t border-gray-200 pt-4 mb-4">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Payment Plan</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Payment Template</label>
                  <select
                    value={selectedPaymentTemplate}
                    onChange={handleTemplateChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a payment template</option>
                    {paymentTemplates.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {newCustomer.paymentSlabs.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-md font-medium text-gray-700 mb-3">Payment Schedule</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Milestone</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {newCustomer.paymentSlabs.map((slab, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2 text-sm text-gray-700">{slab.milestone}</td>
                              <td className="px-4 py-2 text-sm text-gray-700">{slab.percentage}%</td>
                              <td className="px-4 py-2 text-sm text-gray-700">{formatCurrency(slab.amount)}</td>
                              <td className="px-4 py-2 text-sm text-gray-700">{slab.dueDate}</td>
                              <td className="px-4 py-2 text-sm">
                                <PaymentStatusBadge status={slab.status} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
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
                Add Customer
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Broker</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project/Unit</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{customer.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <div>{customer.email}</div>
                      <div className="text-xs text-gray-500">{customer.phone}</div>
                      {customer.alternatePhone && (
                        <div className="text-xs text-gray-500">Alt: {customer.alternatePhone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">{customer.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {customer.brokerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <div className="font-medium">{customer.project}</div>
                      <div className="text-xs text-gray-500">{customer.unit}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(customer.budget)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <StatusBadge status={customer.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                      <div className="flex flex-col items-center">
                        <span className="mb-1">{customer.downloads}</span>
                        <button
                          onClick={() => downloadCustomerPDF(customer)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors"
                          title="Download Customer Details as PDF"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                         <button className="text-blue-600 hover:text-blue-900 mr-3">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="px-6 py-4 text-center text-sm text-gray-500">
                    No customers found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Customer Details Modal (would be implemented in a real application) */}
      <div className="mt-4 text-sm text-gray-500">
        <p>Total customers: {filteredCustomers.length}</p>
      </div>
      <LedgerDetails/>
    </div>
  );
};

export default CustomersPage;