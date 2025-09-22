import React, { useState } from "react";
import {
  FiUpload,
  FiEye,
  FiX,
  FiSearch,
  FiPrinter,
  FiFileText,
  FiDownload,
  FiPlus,
} from "react-icons/fi";

const ApplicationCreate = () => {
  const [currentView, setCurrentView] = useState("list"); // 'list' or 'upload'
  const [banners, setBanners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading completion
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleUpload = (newBanner) => {
    setBanners([...banners, { id: Date.now(), ...newBanner }]);
    setCurrentView("list");
  };

  return (
    <div className="rounded-2xl bg-gray-50 p-6">
      {currentView === "list" ? (
        <BannerList
          onAddBanner={() => setCurrentView("upload")}
          banners={banners}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isLoading={isLoading}
        />
      ) : (
        <BannerUpload
          onViewList={() => setCurrentView("list")}
          onUpload={handleUpload}
        />
      )}
    </div>
  );
};

const BannerList = ({
  onAddBanner,
  banners,
  searchTerm,
  setSearchTerm,
  isLoading,
}) => {
  // Filter banners by search term
  const filteredBanners = banners.filter((banner) =>
    banner.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Application List
          </h1>
          <p className="text-gray-500 font-bold text-sm">
            Welcome back! Here's what's happening with your users today.
          </p>
        </div>
        <button
          onClick={onAddBanner}
          className="flex items-center gap-2 bg-purple-700 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-800 transition mt-4 md:mt-0"
        >
          <FiPlus size={18} />
          Create Application
        </button>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 transition-all">
            <FiDownload size={16} />
            CSV
          </button>
          <button className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 transition-all">
            <FiFileText size={16} />
            Excel
          </button>
          <button className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 transition-all">
            <FiDownload size={16} />
            PDF
          </button>
          <button className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 transition-all">
            <FiPrinter size={16} />
            Print
          </button>

          <div className="ml-auto flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
            <FiSearch size={16} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm"
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
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Planning Name
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Monthly Price
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quarterly Price
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Half-Yearly Price
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Yearly Price
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Package Name
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Logo Upload
              </th>
              <th className="px-6 py-3  text-xs font-medium text-center text-gray-500 uppercase tracking-wider">
                Front Page Display
              </th>
              <th className="px-6 py-3 text-center  text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="10" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mb-3"></div>
                    <span>Loading...</span>
                  </div>
                </td>
              </tr>
            ) : filteredBanners.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              filteredBanners.map((banner) => (
                <tr key={banner.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {banner.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {banner.planningName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {banner.monthlyPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {banner.quarterlyPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {banner.halfYearlyPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {banner.yearlyPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {banner.packageName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {banner.logo ? (
                      <img src={banner.logo} alt="Logo" className="h-8 w-8 object-contain" />
                    ) : (
                      "No Logo"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {banner.frontPageDisplay === "yes" ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-purple-600 hover:text-purple-900 mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
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
              {filteredBanners.length > 0 ? 1 : 0}
            </span>{" "}
            to <span className="font-semibold">{filteredBanners.length}</span>{" "}
            of <span className="font-semibold">{filteredBanners.length}</span>{" "}
            entries
          </div>

          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1 text-gray-600 hover:text-purple-700 disabled:opacity-50"
              disabled
            >
              Previous
            </button>

            <div className="flex gap-1">
              <button className="w-8 h-8 rounded-lg bg-purple-700 text-white">
                1
              </button>
            </div>

            <button
              className="flex items-center gap-1 text-gray-600 hover:text-purple-700 disabled:opacity-50"
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

const BannerUpload = ({ onViewList, onUpload }) => {
  const [form, setForm] = useState({
    name: "",
    planningName: "",
    monthlyPrice: "",
    quarterlyPrice: "",
    halfYearlyPrice: "",
    yearlyPrice: "",
    packageName: "",
    logo: null,
    frontPageDisplay: "no",
  });
  const [errors, setErrors] = useState({});
  const [logoPreview, setLogoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setForm({ ...form, logo: file });
      setLogoPreview(file ? URL.createObjectURL(file) : null);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.planningName) newErrors.planningName = "Planning Name is required";
    if (!form.monthlyPrice) newErrors.monthlyPrice = "Monthly Price is required";
    if (!form.quarterlyPrice) newErrors.quarterlyPrice = "Quarterly Price is required";
    if (!form.halfYearlyPrice) newErrors.halfYearlyPrice = "Half-Yearly Price is required";
    if (!form.yearlyPrice) newErrors.yearlyPrice = "Yearly Price is required";
    if (!form.packageName) newErrors.packageName = "Package Name is required";
    // Logo is optional
    if (!form.frontPageDisplay) newErrors.frontPageDisplay = "Choose Yes or No";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // For demo, convert logo file to URL for preview in list
    let logoUrl = logoPreview;
    if (form.logo && !logoUrl) {
      logoUrl = URL.createObjectURL(form.logo);
    }
    onUpload({ ...form, logo: logoUrl });
    setForm({
      name: "",
      planningName: "",
      monthlyPrice: "",
      quarterlyPrice: "",
      halfYearlyPrice: "",
      yearlyPrice: "",
      packageName: "",
      logo: null,
      frontPageDisplay: "no",
    });
    setLogoPreview(null);
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Create Application
        </h1>
        <button
          onClick={onViewList}
          className="flex items-center gap-2 bg-purple-700 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-800 transition"
        >
          <FiEye size={18} />
          View List
        </button>
      </div>

      <div className="p-6">
  <form
    onSubmit={handleSubmit}
    className="bg-white rounded-2xl shadow-lg p-8 space-y-8 border border-gray-100"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Name */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter application name"
          className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            errors.name ? "border-red-500" : "border-gray-300 hover:border-gray-400"
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.name}
          </p>
        )}
      </div>

      {/* Planning Name */}
      <div className="space-y-2">
        <label
          htmlFor="planningName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Planning Name <span className="text-red-500">*</span>
        </label>
        <input
          id="planningName"
          name="planningName"
          type="text"
          value={form.planningName}
          onChange={handleChange}
          placeholder="Enter planning name"
          className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
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

      {/* Monthly Price */}
      <div className="space-y-2">
        <label
          htmlFor="monthlyPrice"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Monthly Price ($) <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-3.5 text-gray-500">$</span>
          <input
            id="monthlyPrice"
            name="monthlyPrice"
            type="number"
            min="0"
            step="0.01"
            value={form.monthlyPrice}
            onChange={handleChange}
            placeholder="0.00"
            className={`w-full rounded-xl border bg-white pl-8 pr-4 py-3 outline-none transition-all focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              errors.monthlyPrice ? "border-red-500" : "border-gray-300 hover:border-gray-400"
            }`}
          />
        </div>
        {errors.monthlyPrice && (
          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.monthlyPrice}
          </p>
        )}
      </div>

      {/* Quarterly Price */}
      <div className="space-y-2">
        <label
          htmlFor="quarterlyPrice"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Quarterly Price ($) <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-3.5 text-gray-500">$</span>
          <input
            id="quarterlyPrice"
            name="quarterlyPrice"
            type="number"
            min="0"
            step="0.01"
            value={form.quarterlyPrice}
            onChange={handleChange}
            placeholder="0.00"
            className={`w-full rounded-xl border bg-white pl-8 pr-4 py-3 outline-none transition-all focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              errors.quarterlyPrice ? "border-red-500" : "border-gray-300 hover:border-gray-400"
            }`}
          />
        </div>
        {errors.quarterlyPrice && (
          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.quarterlyPrice}
          </p>
        )}
      </div>

      {/* Half-Yearly Price */}
      <div className="space-y-2">
        <label
          htmlFor="halfYearlyPrice"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Half-Yearly Price ($) <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-3.5 text-gray-500">$</span>
          <input
            id="halfYearlyPrice"
            name="halfYearlyPrice"
            type="number"
            min="0"
            step="0.01"
            value={form.halfYearlyPrice}
            onChange={handleChange}
            placeholder="0.00"
            className={`w-full rounded-xl border bg-white pl-8 pr-4 py-3 outline-none transition-all focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              errors.halfYearlyPrice ? "border-red-500" : "border-gray-300 hover:border-gray-400"
            }`}
          />
        </div>
        {errors.halfYearlyPrice && (
          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.halfYearlyPrice}
          </p>
        )}
      </div>

      {/* Yearly Price */}
      <div className="space-y-2">
        <label
          htmlFor="yearlyPrice"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Yearly Price ($) <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-3.5 text-gray-500">$</span>
          <input
            id="yearlyPrice"
            name="yearlyPrice"
            type="number"
            min="0"
            step="0.01"
            value={form.yearlyPrice}
            onChange={handleChange}
            placeholder="0.00"
            className={`w-full rounded-xl border bg-white pl-8 pr-4 py-3 outline-none transition-all focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              errors.yearlyPrice ? "border-red-500" : "border-gray-300 hover:border-gray-400"
            }`}
          />
        </div>
        {errors.yearlyPrice && (
          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.yearlyPrice}
          </p>
        )}
      </div>

      {/* Package Name */}
      <div className="space-y-2">
        <label
          htmlFor="packageName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Package Name <span className="text-red-500">*</span>
        </label>
        <input
          id="packageName"
          name="packageName"
          type="text"
          value={form.packageName}
          onChange={handleChange}
          placeholder="Enter package name"
          className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            errors.packageName ? "border-red-500" : "border-gray-300 hover:border-gray-400"
          }`}
        />
        {errors.packageName && (
          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.packageName}
          </p>
        )}
      </div>

      {/* Logo Upload */}
      <div className="space-y-2">
        <label
          htmlFor="logo"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Logo Upload
        </label>
        <div className="flex items-center gap-4">
          <label
            htmlFor="logo"
            className="flex flex-col items-center justify-center w-72 h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span className="text-xs text-gray-500 text-center px-2">Click to upload logo</span>
            <input
              id="logo"
              name="logo"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
          {logoPreview && (
            <div className="relative">
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="h-32 w-32 object-contain border rounded-xl shadow-sm"
              />
              <button
                type="button"
                onClick={() => {
                  setForm({...form, logo: null});
                  setLogoPreview(null);
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Front Page Display */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Front Page Display <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-6">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="frontPageDisplay"
              value="yes"
              checked={form.frontPageDisplay === "yes"}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
            />
            <span className="ml-2 text-gray-700">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="frontPageDisplay"
              value="no"
              checked={form.frontPageDisplay === "no"}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
            />
            <span className="ml-2 text-gray-700">No</span>
          </label>
        </div>
        {errors.frontPageDisplay && (
          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.frontPageDisplay}
          </p>
        )}
      </div>
    </div>

    <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
      <button
        type="button"
        onClick={() => {
          setForm({
            name: "",
            planningName: "",
            monthlyPrice: "",
            quarterlyPrice: "",
            halfYearlyPrice: "",
            yearlyPrice: "",
            packageName: "",
            logo: null,
            frontPageDisplay: "no",
          });
          setLogoPreview(null);
          setErrors({});
        }}
        className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
      >
        Reset Form
      </button>
      <button
        type="submit"
        className="rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-3 text-sm font-medium text-white shadow-md hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
      >
        Add Application
      </button>
    </div>
  </form>
</div>
    </div>
  );
};

export default ApplicationCreate;