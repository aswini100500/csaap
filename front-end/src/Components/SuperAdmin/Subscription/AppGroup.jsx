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

const Appgroup = () => {
  const [currentView, setCurrentView] = useState("list"); // 'list' or 'upload'
  const [apps, setApps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    groupName: "",
    groupDescription: "",
    caption: "",
    icon: "",
    showInPricingPage: false
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
              groupName: "",
              groupDescription: "",
              caption: "",
              icon: "",
              showInPricingPage: false
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
    app.groupName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.groupDescription?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto rounded-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Application Group List
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
              placeholder="Search application groups..."
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
                Application Group Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Application Group Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Caption
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Show in Pricing
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mb-3"></div>
                    <span>Loading...</span>
                  </div>
                </td>
              </tr>
            ) : filteredApps.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  {apps.length === 0 ? 'No application groups found. Create your first group.' : 'No matching application groups found.'}
                </td>
              </tr>
            ) : (
              filteredApps.map((app) => (
                <tr key={app.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {app.groupName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.groupDescription}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.caption}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.showInPricingPage ? "Yes" : "No"}
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
    const { name, value, type, checked } = e.target;
    setForm({ 
      ...form, 
      [name]: type === 'checkbox' ? checked : value 
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, icon: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.groupName.trim()) newErrors.groupName = "Application Group Name is required";
    if (!form.groupDescription.trim()) newErrors.groupDescription = "Application Group Description is required";
    if (!form.caption.trim()) newErrors.caption = "Caption is required";
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
      groupName: "",
      groupDescription: "",
      caption: "",
      icon: "",
      showInPricingPage: false
    });
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {editingId ? "Edit Application Group" : "Create Application Group"}
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
          {/* Application Group Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Application Group Name <span className="text-red-500">*</span>
            </label>
            <input
              name="groupName"
              type="text"
              value={form.groupName}
              onChange={handleChange}
              placeholder="Enter application group name"
              className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.groupName ? "border-red-500" : "border-gray-300 hover:border-gray-400"
              }`}
            />
            {errors.groupName && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.groupName}
              </p>
            )}
          </div>

          {/* Application Group Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Application Group Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="groupDescription"
              value={form.groupDescription}
              onChange={handleChange}
              placeholder="Enter application group description"
              rows="3"
              className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.groupDescription ? "border-red-500" : "border-gray-300 hover:border-gray-400"
              }`}
            />
            {errors.groupDescription && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V极狐6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.groupDescription}
              </p>
            )}
          </div>

          {/* Caption */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Caption <span className="text-red-500">*</span>
            </label>
            <input
              name="caption"
              type="text"
              value={form.caption}
              onChange={handleChange}
              placeholder="Enter caption"
              className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.caption ? "border-red-500" : "border-gray-300 hover:border-gray-400"
              }`}
            />
            {errors.caption && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 极狐11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.caption}
              </p>
            )}
          </div>

          {/* Icon Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Icon
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
              {form.icon && (
                <div className="relative">
                  <img src={form.icon} alt="Group icon" className="h-12 w-12 object-contain rounded" />
                </div>
              )}
            </div>
          </div>

          {/* Show in Pricing Page */}
          <div className="flex items-center">
            <input
              name="showInPricingPage"
              type="checkbox"
              checked={form.showInPricingPage}
              onChange={handleChange}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Show in pricing page
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="submit"
              className="px-5 py-2.5 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors font-medium"
            >
              {editingId ? "Update Group" : "Add Group"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Appgroup;