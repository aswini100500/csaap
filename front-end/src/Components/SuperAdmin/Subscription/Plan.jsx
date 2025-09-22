import React, { useState, useEffect } from "react";
import {
  FiUpload,
  FiEye,
  FiX,
  FiSearch,
  FiPrinter,
  FiFileText,
  FiDownload,
  FiPlus,
  FiEdit2,
  FiTrash2
} from "react-icons/fi";

const Plan = () => {
  const [currentView, setCurrentView] = useState("list"); // 'list' or 'upload'
  const [plans, setPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    planName: "",
    planDesc: "",
    validity: "",
  });

  // Simulate loading completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleUpload = (newPlan) => {
    if (editingId) {
      // Update existing plan
      setPlans(plans.map(plan => 
        plan.id === editingId ? { ...newPlan, id: editingId } : plan
      ));
      setEditingId(null);
    } else {
      // Add new plan
      setPlans([...plans, { id: Date.now(), ...newPlan }]);
    }
    setCurrentView("list");
  };

  const handleEdit = (id) => {
    const planToEdit = plans.find(plan => plan.id === id);
    if (planToEdit) {
      setForm(planToEdit);
      setEditingId(id);
      setCurrentView("upload");
    }
  };

  const handleDelete = (id) => {
    setPlans(plans.filter(plan => plan.id !== id));
  };

  return (
    <div className="rounded-2xl bg-gray-50 p-6">
      {currentView === "list" ? (
        <PlanList
          onAdd={() => {
            setForm({
              planName: "",
              planDesc: "",
              validity: "",
            });
            setEditingId(null);
            setCurrentView("upload");
          }}
          plans={plans}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <PlanUpload
          onViewList={() => {
            setCurrentView("list");
            setEditingId(null);
          }}
          onUpload={handleUpload}
          editingId={editingId}
          form={form}
          setForm={setForm}
        />
      )}
    </div>
  );
};

const PlanList = ({
  onAdd,
  plans,
  searchTerm,
  setSearchTerm,
  isLoading,
  onEdit,
  onDelete
}) => {
  // Filter plans by search term
  const filteredPlans = plans.filter((plan) =>
    plan.planName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.planDesc?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Plan List
          </h1>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-purple-700 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-800 transition"
        >
          <FiPlus size={18} />
          Create
        </button>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-all">
            <FiDownload size={16} />
            CSV
          </button>
          <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-all">
            <FiFileText size={16} />
            Excel
          </button>
          <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-all">
            <FiDownload size={16} />
            PDF
          </button>
          <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-all">
            <FiPrinter size={16} />
            Print
          </button>

          <div className="ml-auto flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
            <FiSearch size={16} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search plans..."
              className="bg-transparent outline-none text-sm w-40 md:w-56"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Table */}
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Validity (Days)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mb-3"></div>
                    <span>Loading...</span>
                  </div>
                </td>
              </tr>
            ) : filteredPlans.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  {plans.length === 0 ? 'No plans found. Create your first plan.' : 'No matching plans found.'}
                </td>
              </tr>
            ) : (
              filteredPlans.map((plan) => (
                <tr key={plan.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {plan.planName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {plan.planDesc}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {plan.validity} days
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => onEdit(plan.id)}
                      className="text-purple-600 hover:text-purple-900 mr-4 inline-flex items-center gap-1"
                    >
                      <FiEdit2 size={14} />
                      Edit
                    </button>
                    <button 
                      onClick={() => onDelete(plan.id)}
                      className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                    >
                      <FiTrash2 size={14} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Table Footer */}
        <div className="px-6 py-4 bg-gray-50 flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-gray-700 mb-4 md:mb-0">
            Showing{" "}
            <span className="font-semibold">
              {filteredPlans.length > 0 ? 1 : 0}
            </span>{" "}
            to <span className="font-semibold">{filteredPlans.length}</span>{" "}
            of <span className="font-semibold">{filteredPlans.length}</span>{" "}
            entries
          </div>

          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1 text-gray-600 hover:text-purple-700 disabled:opacity-50 px-3 py-1 rounded border border-gray-300"
              disabled
            >
              Previous
            </button>

            <div className="flex gap-1">
              <button className="w-8 h-8 rounded-lg bg-purple-700 text-white flex items-center justify-center text-sm">
                1
              </button>
            </div>

            <button
              className="flex items-center gap-1 text-gray-600 hover:text-purple-700 disabled:opacity-50 px-3 py-1 rounded border border-gray-300"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlanUpload = ({ onViewList, onUpload, editingId, form, setForm }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.planName.trim()) newErrors.planName = "Plan Name is required";
    if (!form.planDesc.trim()) newErrors.planDesc = "Plan Description is required";
    if (!form.validity || parseInt(form.validity) <= 0) newErrors.validity = "Valid validity period is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Convert validity to number
    const formattedData = {
      planName: form.planName,
      planDesc: form.planDesc,
      validity: parseInt(form.validity),
    };
    
    onUpload(formattedData);
    setForm({
      planName: "",
      planDesc: "",
      validity: "",
    });
    setErrors({});
  };

  const handleReset = () => {
    setForm({
      planName: "",
      planDesc: "",
      validity: "",
    });
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {editingId ? "Edit Plan" : "Create Plan"}
        </h1>
        <button
          onClick={onViewList}
          className="flex items-center gap-2 bg-purple-700 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-800 transition"
        >
          <FiEye size={18} />
          View List
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Plan Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Plan Name <span className="text-red-500">*</span>
            </label>
            <input
              name="planName"
              type="text"
              value={form.planName}
              onChange={handleChange}
              placeholder="Enter plan name"
              className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.planName ? "border-red-500" : "border-gray-300 hover:border-gray-400"
              }`}
            />
            {errors.planName && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.planName}
              </p>
            )}
          </div>

          {/* Plan Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Plan Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="planDesc"
              value={form.planDesc}
              onChange={handleChange}
              placeholder="Enter plan description"
              rows="3"
              className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.planDesc ? "border-red-500" : "border-gray-300 hover:border-gray-400"
              }`}
            />
            {errors.planDesc && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.planDesc}
              </p>
            )}
          </div>

          {/* Validity */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Validity (Days) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                name="validity"
                type="number"
                min="1"
                value={form.validity}
                onChange={handleChange}
                placeholder="Enter validity in days"
                className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.validity ? "border-red-500" : "border-gray-300 hover:border-gray-400"
                }`}
              />
            </div>
            {errors.validity && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.validity}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors font-medium"
            >
              {editingId ? "Update Plan" : "Add Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Plan;