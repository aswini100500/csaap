import {
  Eye,
  Plus,
  Search,
  X,
  Download,
  Filter,
  ChevronDown,
  ChevronUp,
  DownloadIcon,
  MailIcon,
  MessageSquare,
  Phone,
  User,
  Calendar,
  Square,
  IndianRupee,
  CheckCircle,
  Edit,
  Verified,
  Clock,
  FileText,
  Edit2,
} from "lucide-react";

import React, { useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io5";

const ContractorPage = () => {
  // State for uploaded work order file
  const [workOrderFile, setWorkOrderFile] = useState(null);
  // Equipment modal and verification states
  const [showEquipmentEditModal, setShowEquipmentEditModal] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState("");
  const [editingField, setEditingField] = useState(""); // Add this line
  const [showVerificationSuccess, setShowVerificationSuccess] = useState(false);
  const [showEditSuccess, setShowEditSuccess] = useState(false);
  // Sample initial data
  const initialContractors = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "555-1234",
      projectName: "Office Building A",
      projectAllotted: "2023-05-15",
      totalContractedSqft: 12500,
      advanceAmount: 25000,
      status: "Active",
      completion: 75,
      report: "Quarterly progress report submitted",
      workmanship: "Verified",
      employees: 15,
      representative: "Michael Brown",
      equipmentOwned: "Excavator, Crane, Concrete Mixer",
      equipmentFromStore: "Safety Gear, Measuring Tools",
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria.garcia@email.com",
      phone: "555-5678",
      projectName: "Residential Complex B",
      projectAllotted: "2023-06-20",
      totalContractedSqft: 18500,
      advanceAmount: 37000,
      status: "Pending",
      completion: 30,
      report: "Initial assessment pending",
      workmanship: "Under Review",
      employees: 22,
      representative: "Sarah Wilson",
      equipmentOwned: "Bulldozer, Dump Trucks (3)",
      equipmentFromStore: "Scaffolding, Power Tools",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.johnson@email.com",
      phone: "555-9012",
      projectName: "Shopping Mall C",
      projectAllotted: "2023-04-10",
      totalContractedSqft: 32500,
      advanceAmount: 65000,
      status: "Completed",
      completion: 100,
      report: "Final project report approved",
      workmanship: "Excellent",
      employees: 35,
      representative: "David Chen",
      equipmentOwned: "Tower Crane, Concrete Pumps",
      equipmentFromStore: "Survey Equipment, Temporary Fencing",
    },
  ];
  // state for contractors and search
  const [contractors, setContractors] = useState(initialContractors);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilters] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // State for new contractor form
  const [newContractor, setNewContractor] = useState({
    name: '',
    profilePhoto:"",
    email: '',
    phone: '',
    alternatePhone: '',
    projectName: '',
    projectAllotted: '',
    totalContractedSqft: '',
    advanceAmount: '',
    status: 'Active',
    description: '',
    workmanship: 'Under Review',
    employees: '',
    representatives: [
      { name: '', position: '', phone: '' }
    ],
    equipmentOwned: '',
    equipmentFromStore: '',
    report: '',
  });

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter contractors based on search term and status filter
  const filteredContractors = contractors.filter((contractor) => {
    const matchesSearch =
      contractor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractor.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractor.representative
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || contractor.status === statusFilter;

    // Date filter logic
    let matchesDate = true;
    if (fromDate) {
      matchesDate = new Date(contractor.projectAllotted) >= new Date(fromDate);
    }
    if (toDate) {
      matchesDate =
        matchesDate && new Date(contractor.projectAllotted) <= new Date(toDate);
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Handle sorting
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to contractors
  const sortedContractors = [...filteredContractors].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Handle representative fields
    if (name.startsWith('representative_')) {
      const [_, idx, field] = name.split('_');
      const index = parseInt(idx, 10);
      const updatedReps = [...newContractor.representatives];
      updatedReps[index][field] = value;
      setNewContractor({
        ...newContractor,
        representatives: updatedReps
      });
    } else {
      setNewContractor({
        ...newContractor,
        [name]: value
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newId =
      contractors.length > 0
        ? Math.max(...contractors.map((c) => c.id)) + 1
        : 1;

    setContractors([
      ...contractors,
      {
        id: newId,
        name: newContractor.name,
        profilePhoto:newContractor.profilePhoto,
        email: newContractor.email,
        phone: newContractor.phone,
        alternatePhone: newContractor.alternatePhone,
        projectName: newContractor.projectName,
        projectAllotted: newContractor.projectAllotted,
        totalContractedSqft: parseFloat(newContractor.totalContractedSqft),
        advanceAmount: parseFloat(newContractor.advanceAmount),
        status: newContractor.status,
        completion: 0,
        report: newContractor.report,
        workmanship: newContractor.workmanship,
        workOrder: newContractor.workOrder,
        employees: parseInt(newContractor.employees),
        representative: newContractor.representative,
        representativePhone: newContractor.representativePhone,
        representativePosition: newContractor.representativePosition,
        equipmentOwned: newContractor.equipmentOwned,
        equipmentFromStore: newContractor.equipmentFromStore,
      },
    ]);

    // Reset form
    setNewContractor({
      name: "",
      profilePhoto:"",
      email: "",
      phone: "",
      alternatePhone: "",
      projectName: "",
      projectAllotted: "",
      totalContractedSqft: "",
      advanceAmount: "",
      status: "Active",
      description: "",
      workmanship: "Under Review",
      employees: "",
      representative: "",
      representativePhone: "",
      representativePosition: "",
      equipmentOwned: "",
      equipmentFromStore: "",
      report: "",
      workOrder:""
    });

    setShowAddForm(false);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format square footage
  const formatSqft = (sqft) => {
    return new Intl.NumberFormat("en-US").format(sqft);
  };

  // Get status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get workmanship badge class
  const getWorkmanshipClass = (workmanship) => {
    switch (workmanship) {
      case "Verified":
        return "bg-green-100 text-green-800";
      case "Excellent":
        return "bg-blue-100 text-blue-800";
      case "Under Review":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Export data function
  const exportData = () => {
    const dataStr = JSON.stringify(contractors, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = "contractors.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  // View contractor details
  const viewContractorDetails = (contractor) => {
    setSelectedContractor(contractor);
    setShowDetailModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Contractor Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage all contractors and their project details
          </p>
        </div>

        <button
          onClick={exportData}
          className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Download size={18} className="mr-2" />
          Export Data
        </button>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <User className="text-blue-600" size={20} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">
                Total Contractors
              </h3>
              <p className="text-2xl font-bold text-gray-800">
                {contractors.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <Square className="text-green-600" size={20} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Sq Ft</h3>
              <p className="text-2xl font-bold text-gray-800">
                {formatSqft(
                  contractors.reduce(
                    (total, contractor) =>
                      total + contractor.totalContractedSqft,
                    0
                  )
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 mr-4">
              <IndianRupee className="text-purple-600" size={20} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">
                Total Advance
              </h3>
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency(
                  contractors.reduce(
                    (total, contractor) => total + contractor.advanceAmount,
                    0
                  )
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100 mr-4">
              <FileText className="text-orange-600" size={20} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">
                Avg. Completion
              </h3>
              <p className="text-2xl font-bold text-gray-800">
                {Math.round(
                  contractors.reduce(
                    (total, contractor) => total + contractor.completion,
                    0
                  ) / contractors.length
                )}
                %
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Date Filter Section */}
          <div className="flex gap-2 items-center mb-2 md:mb-0">
            <label className="text-sm text-gray-700">From:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="text-sm text-gray-700 ml-2">To:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative flex-grow">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name, project or representative..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2">
            {/* <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter size={18} className="mr-2" />
              Filters
              {showFilters ? <ChevronUp size={18} className="ml-2" /> : <ChevronDown size={18} className="ml-2" />}
            </button> */}

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} className="mr-2" />
              {showAddForm ? "Close Form" : "Add Contractor"}
            </button>
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortConfig.key || ""}
                  onChange={(e) => handleSort(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Default</option>
                  <option value="name">Name</option>
                  <option value="projectName">Project Name</option>
                  <option value="projectAllotted">Project Date</option>
                  <option value="totalContractedSqft">Square Footage</option>
                  <option value="advanceAmount">Advance Amount</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setStatusFilter("All");
                    setSortConfig({ key: null, direction: "ascending" });
                    setSearchTerm("");
                  }}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Contractor Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Add New Contractor
            </h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={newContractor.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter contractor name"
                />
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                 Profile Photo
                </label>
                <input
                  type="file"
                  name="profilePhoto"
                  value={newContractor.profilePhoto}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter contractor name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={newContractor.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={newContractor.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alternate Phone *
                </label>
                <input
                  type="tel"
                  name="alternatePhone"
                  value={newContractor.alternatePhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={newContractor.projectName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Allotted Date *
                </label>
                <input
                  type="date"
                  name="projectAllotted"
                  value={newContractor.projectAllotted}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Contracted Sq Ft *
                </label>
                <input
                  type="number"
                  name="totalContractedSqft"
                  value={newContractor.totalContractedSqft}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter square footage"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Advance Amount (₹) *
                </label>
                <input
                  type="number"
                  name="advanceAmount"
                  value={newContractor.advanceAmount}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter advance amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <select
                  name="status"
                  value={newContractor.status}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Employees
                </label>
                <input
                  type="number"
                  name="employees"
                  value={newContractor.employees}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter number of employees"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Representatives
                </label>
                {newContractor.representatives.map((rep, idx) => (
                  <div key={idx} className="mb-2 grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                    <input
                      type="text"
                      name={`representative_${idx}_name`}
                      value={rep.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Name"
                    />
                    <input
                      type="text"
                      name={`representative_${idx}_position`}
                      value={rep.position}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Position"
                    />
                    <input
                      type="tel"
                      name={`representative_${idx}_phone`}
                      value={rep.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Phone"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm flex items-center"
                  onClick={() => {
                    setNewContractor({
                      ...newContractor,
                      representatives: [
                        ...newContractor.representatives,
                        { name: '', position: '', phone: '' }
                      ]
                    });
                  }}
                >
                  <Plus size={16} className="mr-1" /> Add Representative
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="report"
                  value={newContractor.report}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter project report details"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Workmanship Verification
                </label>
                <select
                  name="workmanship"
                  value={newContractor.workmanship}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Under Review">Under Review</option>
                  <option value="Verified">Verified</option>
                  <option value="Excellent">Excellent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Equipment Owned
                </label>
                <textarea
                  name="equipmentOwned"
                  value={newContractor.equipmentOwned}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="List equipment owned by contractor"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Equipment from Store
                </label>
                <textarea
                  name="equipmentFromStore"
                  value={newContractor.equipmentFromStore}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="List equipment received from store"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">
                Upload Work Order
              </p>

              <label
                htmlFor="workOrder"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
              >
                <svg
                  className="w-8 h-8 mb-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6H16a5 5 0 010 10h-1m-4-4v6m0 0l-3-3m3 3l3-3"
                  />
                </svg>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Click to upload</span> or drag &
                  drop
                </p>
                <p className="text-xs text-gray-500">
                  PDF, DOC, or JPG (max 5MB)
                </p>
              </label>

              <input
                id="workOrder"
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  // Validate file size (max 5MB)
                  if (file.size > 5 * 1024 * 1024) {
                    alert("File size exceeds 5MB limit.");
                    return;
                  }
                  // Validate file type
                  const allowedTypes = [
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    "image/jpeg",
                    "image/png",
                  ];
                  if (!allowedTypes.includes(file.type)) {
                    alert(
                      "Invalid file type. Only PDF, DOC, JPG, PNG allowed."
                    );
                    return;
                  }
                  setWorkOrderFile(file);
                }}
              />
            </div>

            {workOrderFile && (
              <div className="mt-2 text-sm text-green-700 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {workOrderFile.name}
                <button
                  type="button"
                  className="ml-2 text-red-500 hover:underline"
                  onClick={() => setWorkOrderFile(null)}
                >
                  Remove
                </button>
              </div>
            )}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Contractor
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Contractors Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Contractor
                    {sortConfig.key === "name" &&
                      (sortConfig.direction === "ascending" ? (
                        <ChevronUp size={16} className="ml-1" />
                      ) : (
                        <ChevronDown size={16} className="ml-1" />
                      ))}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contact
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("projectName")}
                >
                  <div className="flex items-center">
                    Project
                    {sortConfig.key === "projectName" &&
                      (sortConfig.direction === "ascending" ? (
                        <ChevronUp size={16} className="ml-1" />
                      ) : (
                        <ChevronDown size={16} className="ml-1" />
                      ))}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("totalContractedSqft")}
                >
                  <div className="flex items-center">
                    Area (Sq Ft)
                    {sortConfig.key === "totalContractedSqft" &&
                      (sortConfig.direction === "ascending" ? (
                        <ChevronUp size={16} className="ml-1" />
                      ) : (
                        <ChevronDown size={16} className="ml-1" />
                      ))}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("advanceAmount")}
                >
                  <div className="flex items-center">
                    Advance (₹)
                    {sortConfig.key === "advanceAmount" &&
                      (sortConfig.direction === "ascending" ? (
                        <ChevronUp size={16} className="ml-1" />
                      ) : (
                        <ChevronDown size={16} className="ml-1" />
                      ))}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Due
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Paid
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
              {sortedContractors.length > 0 ? (
                sortedContractors.map((contractor) => (
                  <tr
                    key={contractor.id}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <User className="text-blue-600" size={20} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {contractor.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {contractor.id}
                          </div>
                          <div>
                            <button
                              title="Click to see Profile"
                              className="text-blue-600 cursor-pointer hover:bg-blue-700 hover:text-white hover:px-2 py-1 hover:rounded-md text-[13px]"
                            >
                              {" "}
                              View Profile
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <MailIcon
                            size={16}
                            className="text-gray-400 flex-shrink-0"
                          />
                          <a
                            href={`mailto:${contractor.email}`}
                            className="text-sm text-gray-700 hover:text-blue-600 transition-colors truncate max-w-[180px]"
                            title={contractor.email}
                          >
                            {contractor.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone
                            size={16}
                            className="text-gray-400 flex-shrink-0"
                          />
                          <a
                            href={`tel:${contractor.phone}`}
                            className="text-sm text-gray-700 hover:text-blue-600 transition-colors"
                          >
                            {contractor.phone}
                          </a>
                          <a
                            href={`https://wa.me/${contractor.phone.replace(
                              /\D/g,
                              ""
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-700 transition-colors ml-2"
                            title="Send WhatsApp message"
                          >
                            <IoLogoWhatsapp size={18} />
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className="text-sm font-medium text-gray-900 max-w-[200px] truncate"
                        title={contractor.projectName}
                      >
                        {contractor.projectName}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(
                          contractor.projectAllotted
                        ).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatSqft(contractor.totalContractedSqft)}
                      </div>
                      <div className="text-xs text-gray-500">sq ft</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <IndianRupee size={14} className="text-gray-600 mr-1" />
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency(contractor.advanceAmount)}
                        </span>
                      </div>
                      {contractor.advanceAmount > 0 && (
                        <div className="text-xs text-green-600 mt-1">
                          Advance Paid
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">00</td>
                    <td className="px-6 py-4 whitespace-nowrap">00</td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => viewContractorDetails(contractor)}
                          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors px-3 py-1 rounded-md hover:bg-blue-50"
                          title="View Details"
                        >
                          <Eye size={16} className="mr-1" />
                          View
                        </button>
                        <button
                          className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-md hover:bg-gray-100"
                          title="Download Report"
                          onClick={() => {
                            // Generate and download report
                            const reportData = `Contractor Report\n\nName: ${
                              contractor.name
                            }\nProject: ${
                              contractor.projectName
                            }\nArea: ${formatSqft(
                              contractor.totalContractedSqft
                            )} sq ft\nAdvance: ${formatCurrency(
                              contractor.advanceAmount
                            )}\nStatus: ${contractor.status}`;
                            const blob = new Blob([reportData], {
                              type: "text/plain",
                            });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = `${contractor.name}_Report.txt`;
                            a.click();
                            URL.revokeObjectURL(url);
                          }}
                        >
                          <DownloadIcon size={16} />
                        </button>
                        <a
                          href={`mailto:${contractor.email}`}
                          className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-md hover:bg-gray-100"
                          title="Send Email"
                        >
                          <MailIcon size={16} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Search size={48} className="mb-3 opacity-50" />
                      <div className="text-lg font-medium text-gray-500 mb-1">
                        No contractors found
                      </div>
                      <div className="text-sm text-gray-400">
                        {searchTerm
                          ? `No results for "${searchTerm}"`
                          : "Try adjusting your search or filters"}
                      </div>
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm("")}
                          className="mt-3 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          Clear search
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {sortedContractors.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">{sortedContractors.length}</span> of{" "}
              <span className="font-medium">{sortedContractors.length}</span>{" "}
              contractors
            </div>
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                Previous
              </button>
              <button
                className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Contractor Detail Modal */}
      {showDetailModal && selectedContractor && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Contractor Details
              </h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Work Order Download Section */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Work Order
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {selectedContractor.workOrderFile ? (
                      <div className="flex items-center gap-2">
                        <FileText size={20} className="text-blue-600" />
                        <span className="text-sm text-gray-700">
                          {selectedContractor.workOrderFile.name}
                        </span>
                        <button
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center gap-1"
                          onClick={() => {
                            const url = URL.createObjectURL(
                              selectedContractor.workOrderFile
                            );
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = selectedContractor.workOrderFile.name;
                            a.click();
                            URL.revokeObjectURL(url);
                          }}
                        >
                          <DownloadIcon size={16} /> Download
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">
                        No work order uploaded.
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Contractor Information
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="text-blue-600" size={24} />
                      </div>
                      <div className="ml-4">
                        <div className="text-lg font-medium text-gray-900">
                          {selectedContractor.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {selectedContractor.id}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <MailIcon size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm">
                          {selectedContractor.email}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Phone size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm">
                          {selectedContractor.phone}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <User size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm">
                          {selectedContractor.representative} (Representative)
                        </span>
                      </div>
                      <div className="flex items-center">
                        <User size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm">
                          {selectedContractor.employees} Employees
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Project Information
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-2">
                      <div className="text-lg font-medium text-gray-900">
                        {selectedContractor.projectName}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Calendar size={14} className="mr-1" />
                        Allotted: {selectedContractor.projectAllotted}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Contracted Area:</span>
                        <span className="text-sm font-medium">
                          {formatSqft(selectedContractor.totalContractedSqft)}{" "}
                          sq ft
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Advance Amount:</span>
                        <span className="text-sm font-medium">
                          {formatCurrency(selectedContractor.advanceAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Status:</span>
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                            selectedContractor.status
                          )}`}
                        >
                          {selectedContractor.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Workmanship:</span>
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getWorkmanshipClass(
                            selectedContractor.workmanship
                          )}`}
                        >
                          {selectedContractor.workmanship}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
  <h4 className="text-sm font-medium text-gray-500 mb-1">
    Equipment Details
  </h4>
  <div className="bg-gray-50 p-4 rounded-lg">
    {/* Equipment Owned */}
    <div className="mb-3">
      <div className="text-sm font-medium text-gray-700 mb-1">
        Equipment Owned:
      </div>
      <div className="text-sm text-gray-600 flex items-center gap-2">
        {selectedContractor.equipmentOwned}

        {/* Status label */}
        {selectedContractor.equipmentVerified ? (
          <span className="flex items-center text-green-600 text-sm">
            <Verified size={16} className="mr-1" />
            Verified
          </span>
        ) : (
          <span className="text-yellow-600 text-sm flex items-center">
            <Clock size={14} className="mr-1" /> Not Verified
          </span>
        )}

        {/* Verify button */}
        <button
          className="flex items-center border border-blue-700 px-2 py-1 text-sm rounded hover:bg-blue-100 transition-colors"
          onClick={() => {
            const currentDate = new Date().toISOString().split("T")[0];
            const updatedContractors = contractors.map((c) =>
              c.id === selectedContractor.id
                ? { ...c, equipmentVerified: true, lastVerified: currentDate }
                : c
            );
            setContractors(updatedContractors);
            setSelectedContractor({
              ...selectedContractor,
              equipmentVerified: true,
              lastVerified: currentDate,
            });

            setShowVerificationSuccess(true);
            setTimeout(() => setShowVerificationSuccess(false), 3000);
          }}
        >
          <CheckCircle size={16} className="mr-1" /> Verify
        </button>

        {/* Edit button */}
        <button
          className="flex items-center border border-gray-400 px-2 py-1 text-sm rounded hover:bg-gray-100 transition-colors"
          onClick={() => {
            setEditingEquipment(selectedContractor.equipmentOwned);
            setShowEquipmentEditModal(true);
            setEditingField("owned"); // <-- so modal knows what to edit
          }}
        >
          <Edit size={16} className="mr-1" /> Edit
        </button>
      </div>

      {selectedContractor.lastVerified && (
        <div className="text-xs text-gray-500 mt-1 flex items-center">
          <Clock size={12} className="mr-1" />
          Last verified:{" "}
          {new Date(selectedContractor.lastVerified).toLocaleDateString()}
        </div>
      )}
    </div>

    {/* Equipment from Store */}
    <div>
      <div className="text-sm font-medium text-gray-700 mb-1">
        Equipment from Store:
      </div>
      <div className="text-sm text-gray-600 flex items-center gap-2">
        {selectedContractor.equipmentFromStore}

        {/* Verify button */}
        <button
          className="flex items-center border border-blue-700 px-2 py-1 text-sm rounded hover:bg-blue-100 transition-colors"
          onClick={() => {
            const currentDate = new Date().toISOString().split("T")[0];
            const updatedContractors = contractors.map((c) =>
              c.id === selectedContractor.id
                ? { ...c, equipmentVerified: true, lastVerified: currentDate }
                : c
            );
            setContractors(updatedContractors);
            setSelectedContractor({
              ...selectedContractor,
              equipmentVerified: true,
              lastVerified: currentDate,
            });

            setShowVerificationSuccess(true);
            setTimeout(() => setShowVerificationSuccess(false), 3000);
          }}
        >
          <CheckCircle size={16} className="mr-1" /> Verify
        </button>

        {/* Edit button */}
        <button
          className="flex items-center border border-gray-400 px-2 py-1 text-sm rounded hover:bg-gray-100 transition-colors"
          onClick={() => {
            setEditingEquipment(selectedContractor.equipmentFromStore);
            setShowEquipmentEditModal(true);
            setEditingField("store"); // <-- so modal knows what to edit
          }}
        >
          <Edit size={16} className="mr-1" /> Edit
        </button>
      </div>
    </div>
  </div>

  {/* Reusable Equipment Edit Modal */}
  {showEquipmentEditModal && (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Edit Equipment {editingField === "owned" ? "Owned" : "from Store"}
          </h3>
          <button
            onClick={() => setShowEquipmentEditModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <textarea
            value={editingEquipment}
            onChange={(e) => setEditingEquipment(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={() => setShowEquipmentEditModal(false)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              const updatedContractors = contractors.map((c) =>
                c.id === selectedContractor.id
                  ? {
                      ...c,
                      equipmentOwned:
                        editingField === "owned"
                          ? editingEquipment
                          : c.equipmentOwned,
                      equipmentFromStore:
                        editingField === "store"
                          ? editingEquipment
                          : c.equipmentFromStore,
                    }
                  : c
              );
              setContractors(updatedContractors);
              setSelectedContractor({
                ...selectedContractor,
                equipmentOwned:
                  editingField === "owned"
                    ? editingEquipment
                    : selectedContractor.equipmentOwned,
                equipmentFromStore:
                  editingField === "store"
                    ? editingEquipment
                    : selectedContractor.equipmentFromStore,
              });
              setShowEquipmentEditModal(false);

              setShowEditSuccess(true);
              setTimeout(() => setShowEditSuccess(false), 3000);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )}

  {/* Success Notifications */}
  {showVerificationSuccess && (
    <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg flex items-center">
      <CheckCircle size={20} className="mr-2" />
      Equipment verified successfully!
    </div>
  )}
  {showEditSuccess && (
    <div className="fixed bottom-4 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded shadow-lg flex items-center">
      <CheckCircle size={20} className="mr-2" />
      Equipment updated successfully!
    </div>
  )}
</div>




                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Project Report
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">
                      {selectedContractor.report}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractorPage;

