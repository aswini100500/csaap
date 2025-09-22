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

const PlanningCreate = () => {
  const [currentView, setCurrentView] = useState("list"); // 'list' or 'upload'
  const [plannings, setPlannings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

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
      setPlannings(plannings.map(plan => 
        plan.id === editingId ? { ...newPlan, id: editingId } : plan
      ));
      setEditingId(null);
    } else {
      // Add new plan
      setPlannings([...plannings, { id: Date.now(), ...newPlan }]);
    }
    setCurrentView("list");
  };

  const handleEdit = (id) => {
    const planToEdit = plannings.find(plan => plan.id === id);
    if (planToEdit) {
      setForm(planToEdit);
      setEditingId(id);
      setCurrentView("upload");
    }
  };

  const handleDelete = (id) => {
    setPlannings(plannings.filter(plan => plan.id !== id));
  };

  return (
    <div className="rounded-2xl bg-gray-50 p-6">
      {currentView === "list" ? (
        <PlanList
          onAdd={() => {
            setForm({
              planningName: "",
              monthlyPlan: "",
              quarterlyPlan: "",
              halfYearlyPlan: "",
              annuallyPlan: "",
            });
            setEditingId(null);
            setCurrentView("upload");
          }}
          plannings={plannings}
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
        />
      )}
    </div>
  );
};

const PlanList = ({
  onAdd,
  plannings,
  searchTerm,
  setSearchTerm,
  isLoading,
  onEdit,
  onDelete
}) => {
  // Filter plans by search term
  const filteredPlans = plannings.filter((plan) =>
    plan.planningName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Planning Master List
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your planning master records and pricing
          </p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-purple-700 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-800 transition"
        >
          <FiPlus size={18} />
          Create Planning Master
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
                Planning Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Monthly Plan ($)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quarterly Plan ($)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Half-Yearly Plan ($)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Annually Plan ($)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mb-3"></div>
                    <span>Loading planning data...</span>
                  </div>
                </td>
              </tr>
            ) : filteredPlans.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  {plannings.length === 0 ? 'No planning records found. Create your first plan.' : 'No matching plans found.'}
                </td>
              </tr>
            ) : (
              filteredPlans.map((plan) => (
                <tr key={plan.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {plan.planningName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${parseFloat(plan.monthlyPlan).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${parseFloat(plan.quarterlyPlan).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${parseFloat(plan.halfYearlyPlan).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${parseFloat(plan.annuallyPlan).toFixed(2)}
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

const PlanUpload = ({ onViewList, onUpload, editingId }) => {
  const [form, setForm] = useState({
    planningName: "",
    monthlyPlan: "",
    quarterlyPlan: "",
    halfYearlyPlan: "",
    annuallyPlan: "",
  });
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
    if (!form.planningName.trim()) newErrors.planningName = "Planning Name is required";
    if (!form.monthlyPlan || parseFloat(form.monthlyPlan) <= 0) newErrors.monthlyPlan = "Valid monthly plan is required";
    if (!form.quarterlyPlan || parseFloat(form.quarterlyPlan) <= 0) newErrors.quarterlyPlan = "Valid quarterly plan is required";
    if (!form.halfYearlyPlan || parseFloat(form.halfYearlyPlan) <= 0) newErrors.halfYearlyPlan = "Valid half-yearly plan is required";
    if (!form.annuallyPlan || parseFloat(form.annuallyPlan) <= 0) newErrors.annuallyPlan = "Valid annual plan is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Convert string values to numbers
    const formattedData = {
      planningName: form.planningName,
      monthlyPlan: parseFloat(form.monthlyPlan),
      quarterlyPlan: parseFloat(form.quarterlyPlan),
      halfYearlyPlan: parseFloat(form.halfYearlyPlan),
      annuallyPlan: parseFloat(form.annuallyPlan),
    };
    
    onUpload(formattedData);
    setForm({
      planningName: "",
      monthlyPlan: "",
      quarterlyPlan: "",
      halfYearlyPlan: "",
      annuallyPlan: "",
    });
    setErrors({});
  };

  const handleReset = () => {
    setForm({
      planningName: "",
      monthlyPlan: "",
      quarterlyPlan: "",
      halfYearlyPlan: "",
      annuallyPlan: "",
    });
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {editingId ? "Edit Planning Master" : "Create Planning Master"}
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
          {/* Planning Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Planning Name <span className="text-red-500">*</span>
            </label>
            <input
              name="planningName"
              type="text"
              value={form.planningName}
              onChange={handleChange}
              placeholder="Enter planning name"
              className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.planningName ? "border-red-500" : "border-gray-300 hover:border-gray-400"
              }`}
            />
            {errors.planningName && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.planningName}
              </p>
            )}
          </div>

          {/* Monthly Plan */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Monthly Plan ($) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-gray-500">$</span>
              <input
                name="monthlyPlan"
                type="number"
                min="0"
                step="0.01"
                value={form.monthlyPlan}
                onChange={handleChange}
                placeholder="0.00"
                className={`w-full rounded-xl border bg-white pl-8 pr-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.monthlyPlan ? "border-red-500" : "border-gray-300 hover:border-gray-400"
                }`}
              />
            </div>
            {errors.monthlyPlan && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.monthlyPlan}
              </p>
            )}
          </div>

          {/* Quarterly Plan */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Quarterly Plan ($) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-gray-500">$</span>
              <input
                name="quarterlyPlan"
                type="number"
                min="0"
                step="0.01"
                value={form.quarterlyPlan}
                onChange={handleChange}
                placeholder="0.00"
                className={`w-full rounded-xl border bg-white pl-8 pr-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.quarterlyPlan ? "border-red-500" : "border-gray-300 hover:border-gray-400"
                }`}
              />
            </div>
            {errors.quarterlyPlan && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.quarterlyPlan}
              </p>
            )}
          </div>

          {/* Half-Yearly Plan */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Half-Yearly Plan ($) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-gray-500">$</span>
              <input
                name="halfYearlyPlan"
                type="number"
                min="0"
                step="0.01"
                value={form.halfYearlyPlan}
                onChange={handleChange}
                placeholder="0.00"
                className={`w-full rounded-xl border bg-white pl-8 pr-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.halfYearlyPlan ? "border-red-500" : "border-gray-300 hover:border-gray-400"
                }`}
              />
            </div>
            {errors.halfYearlyPlan && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.halfYearlyPlan}
              </p>
            )}
          </div>

          {/* Annually Plan */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Annually Plan ($) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-gray-500">$</span>
              <input
                name="annuallyPlan"
                type="number"
                min="0"
                step="0.01"
                value={form.annuallyPlan}
                onChange={handleChange}
                placeholder="0.00"
                className={`w-full rounded-xl border bg-white pl-8 pr-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.annuallyPlan ? "border-red-500" : "border-gray-300 hover:border-gray-400"
                }`}
              />
            </div>
            {errors.annuallyPlan && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.annuallyPlan}
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

export default PlanningCreate;