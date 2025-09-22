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

const BestforBuss = () => {
  const [currentView, setCurrentView] = useState("list"); // 'list' or 'upload'
  const [banners, setBanners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading completion
  setTimeout(() => {
    setIsLoading(false);
  }, 1500);

  const handleUpload = (newBanner) => {
    setBanners([...banners, { id: Date.now(), ...newBanner }]);
    setCurrentView("list");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 rounded-3xl">
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
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Best for Business
          </h1>
          <p className="text-gray-500 font-bold text-lg">
            Welcome back! Here's what's happening with your users today.
          </p>
        </div>

        <button
          onClick={onAddBanner}
          className="flex items-center gap-2 bg-purple-700 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-800 transition mt-4 md:mt-0"
        >
          <FiPlus size={18} />
          Add Image
        </button>

        {/* Header */}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image Upload{" "}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
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
            ) : banners.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No images found. Click "Add Image" to upload one.
                </td>
              </tr>
            ) : (
              banners.map((banner) => (
                <tr key={banner.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-10 w-16 bg-gray-200 rounded flex items-center justify-center">
                      <FiFileText className="text-gray-500" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {banner.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date().toLocaleDateString()}
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
            Showing <span className="font-semibold">0</span> to{" "}
            <span className="font-semibold">0</span> of{" "}
            <span className="font-semibold">0</span> entries
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      onUpload({
        title: selectedFile.name,
        file: selectedFile,
      });
    } else {
      alert("Please select a file first!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Image Upload</h1>
        <button
          onClick={onViewList}
          className="flex items-center gap-2 bg-purple-700 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-800 transition"
        >
          <FiEye size={18} />
          View
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Image Upload
            </label>

            <div
              className="border-2 border-dashed border-purple-300 rounded-xl p-6 text-center cursor-pointer bg-purple-50 hover:bg-purple-100 transition-colors"
              onClick={() => document.getElementById("banner-upload").click()}
            >
              <FiUpload className="mx-auto text-purple-500 mb-3" size={36} />
              <p className="text-gray-600 mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-gray-500">
                SVG, PNG, JPG or GIF (max. 5MB)
              </p>
              <input
                id="banner-upload"
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </div>

            {selectedFile && (
              <div className="mt-4 flex items-center justify-between bg-purple-50 rounded-lg p-3">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <FiUpload size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="text-gray-500 hover:text-red-500"
                >
                  <FiX size={18} />
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-3 px-4 rounded-lg shadow hover:bg-purple-800 transition font-semibold"
          >
            Save Banner
          </button>
        </form>
      </div>
    </div>
  );
};

export default BestforBuss;
