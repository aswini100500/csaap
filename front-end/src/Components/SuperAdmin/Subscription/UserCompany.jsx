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

const UserCompany = () => {
  const [currentView, setCurrentView] = useState("list"); // 'list' or 'upload'
  const [apps, setApps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    appName: "",
    plan: "",
    packageName: "",
    packageVersion: "",
    userName: "",
    companyName: "",
    installDate: "",
    expiryDate: ""
  });

  // Simulate loading completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleUpload = (newApp) => {
    if (editingId) {
      // Update existing app
      setApps(apps.map(app =>
        app.id === editingId ? { ...newApp, id: editingId } : app
      ));
      setEditingId(null);
    } else {
      // Add new app
      setApps([...apps, { id: Date.now(), ...newApp }]);
    }
    setCurrentView("list");
  };

  const handleEdit = (id) => {
    const appToEdit = apps.find(app => app.id === id);
    if (appToEdit) {
      setForm(appToEdit);
      setEditingId(id);
      setCurrentView("upload");
    }
  };

  const handleDelete = (id) => {
    setApps(apps.filter(app => app.id !== id));
  };

  return (
    <div className="rounded-2xl bg-gray-50 p-6">
      {currentView === "list" ? (
        <AppList
          onAdd={() => {
            setForm({
              appName: "",
              plan: "",
              packageName: "",
              packageVersion: "",
              userName: "",
              companyName: "",
              installDate: "",
              expiryDate: ""
            });
            setEditingId(null);
            setCurrentView("upload");
          }}
          apps={apps}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <AppUpload
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

const AppList = ({
  onAdd,
  apps,
  searchTerm,
  setSearchTerm,
  isLoading,
  onEdit,
  onDelete
}) => {
  // Filter apps by search term
  const filteredApps = apps.filter((app) =>
    (app.appName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (app.userName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (app.companyName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            User Company Applications
          </h1>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-purple-700 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-800 transition"
        >
          <FiPlus size={18} />
          Add Application
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
              placeholder="Search applications..."
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
                App Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Package Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Package Version
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                App Install Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                App Expiry Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="9" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mb-3"></div>
                    <span>Loading...</span>
                  </div>
                </td>
              </tr>
            ) : filteredApps.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  {apps.length === 0 ? 'No applications found. Add your first application.' : 'No matching applications found.'}
                </td>
              </tr>
            ) : (
              filteredApps.map((app) => (
                <tr key={app.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {app.appName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.plan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.packageName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.packageVersion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.userName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.companyName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.installDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.expiryDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => onEdit(app.id)}
                      className="text-purple-600 hover:text-purple-900 mr-4 inline-flex items-center gap-1"
                    >
                      <FiEdit2 size={14} />
                      Edit
                    </button>
                    <button 
                      onClick={() => onDelete(app.id)}
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
              {filteredApps.length > 0 ? 1 : 0}
            </span>{" "}
            to <span className="font-semibold">{filteredApps.length}</span>{" "}
            of <span className="font-semibold">{filteredApps.length}</span>{" "}
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

const AppUpload = ({ onViewList, onUpload, editingId, form, setForm }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.appName.trim()) newErrors.appName = "App Name is required";
    if (!form.plan.trim()) newErrors.plan = "Plan is required";
    if (!form.packageName.trim()) newErrors.packageName = "Package Name is required";
    if (!form.packageVersion.trim()) newErrors.packageVersion = "Package Version is required";
    if (!form.userName.trim()) newErrors.userName = "User Name is required";
    if (!form.companyName.trim()) newErrors.companyName = "Company Name is required";
    if (!form.installDate.trim()) newErrors.installDate = "Install Date is required";
    if (!form.expiryDate.trim()) newErrors.expiryDate = "Expiry Date is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onUpload(form);
    setForm({
      appName: "",
      plan: "",
      packageName: "",
      packageVersion: "",
      userName: "",
      companyName: "",
      installDate: "",
      expiryDate: ""
    });
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {editingId ? "Edit User Company Application" : "Add User Company Application"}
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
          {/* App Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              App Name <span className="text-red-500">*</span>
            </label>
            <input
              name="appName"
              type="text"
              value={form.appName}
              onChange={handleChange}
              placeholder="Enter app name"
              className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.appName ? "border-red-500" : "border-gray-300 hover:border-gray-400"
              }`}
            />
            {errors.appName && (
              <p className="mt-1 text-xs text-red-600">{errors.appName}</p>
            )}
          </div>

          {/* Plan */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Plan <span className="text-red-500">*</span>
            </label>
            <input
              name="plan"
              type="text"
              value={form.plan}
              onChange={handleChange}
              placeholder="Enter plan"
              className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.plan ? "border-red-500" : "border-gray-300 hover:border-gray-400"
              }`}
            />
            {errors.plan && (
              <p className="mt-1 text-xs text-red-600">{errors.plan}</p>
            )}
          </div>

          {/* Package Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Package Name <span className="text-red-500">*</span>
            </label>
            <input
              name="packageName"
              type="text"
              value={form.packageName}
              onChange={handleChange}
              placeholder="Enter package name"
              className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.packageName ? "border-red-500" : "border-gray-300 hover:border-gray-400"
              }`}
            />
            {errors.packageName && (
              <p className="mt-1 text-xs text-red-600">{errors.packageName}</p>
            )}
          </div>

          {/* Package Version */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Package Version <span className="text-red-500">*</span>
            </label>
            <input
              name="packageVersion"
              type="text"
              value={form.packageVersion}
              onChange={handleChange}
              placeholder="Enter package version"
              className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.packageVersion ? "border-red-500" : "border-gray-300 hover:border-gray-400"
              }`}
            />
            {errors.packageVersion && (
              <p className="mt-1 text-xs text-red-600">{errors.packageVersion}</p>
            )}
          </div>

          {/* User Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              User Name <span className="text-red-500">*</span>
            </label>
            <input
              name="userName"
              type="text"
              value={form.userName}
              onChange={handleChange}
              placeholder="Enter user name"
              className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.userName ? "border-red-500" : "border-gray-300 hover:border-gray-400"
              }`}
            />
            {errors.userName && (
              <p className="mt-1 text-xs text-red-600">{errors.userName}</p>
            )}
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              name="companyName"
              type="text"
              value={form.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
              className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.companyName ? "border-red-500" : "border-gray-300 hover:border-gray-400"
              }`}
            />
            {errors.companyName && (
              <p className="mt-1 text-xs text-red-600">{errors.companyName}</p>
            )}
          </div>

          {/* Install Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Install Date <span className="text-red-500">*</span>
            </label>
            <input
              name="installDate"
              type="date"
              value={form.installDate}
              onChange={handleChange}
              className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.installDate ? "border-red-500" : "border-gray-300 hover:border-gray-400"
              }`}
            />
            {errors.installDate && (
              <p className="mt-1 text-xs text-red-600">{errors.installDate}</p>
            )}
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Expiry Date <span className="text-red-500">*</span>
            </label>
            <input
              name="expiryDate"
              type="date"
              value={form.expiryDate}
              onChange={handleChange}
              className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.expiryDate ? "border-red-500" : "border-gray-300 hover:border-gray-400"
              }`}
            />
            {errors.expiryDate && (
              <p className="mt-1 text-xs text-red-600">{errors.expiryDate}</p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="submit"
              className="px-5 py-2.5 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors font-medium"
            >
              {editingId ? "Update Application" : "Add Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserCompany;