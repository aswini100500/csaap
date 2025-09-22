import React, { useState, useEffect } from 'react';
import { FiUpload, FiEye, FiX, FiSearch, FiPrinter, FiFileText, FiDownload, FiPlus } from 'react-icons/fi';

const DownloadCreate = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'upload'
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleUpload = (newFile) => {
    setFiles([...files, { id: Date.now(), ...newFile }]);
    setCurrentView('list');
  };

  const handleDelete = (id) => {
    setFiles(files.filter(file => file.id !== id));
  };

  return (
    <div className="rounded-2xl bg-gray-50 p-6">
      {currentView === 'list' ? (
        <ApplicationList 
          onAdd={() => setCurrentView('upload')} 
          files={files}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isLoading={isLoading}
          onDelete={handleDelete}
        />
      ) : (
        <FileUpload 
          onViewList={() => setCurrentView('list')}
          onUpload={handleUpload}
        />
      )}
    </div>
  );
};

const ApplicationList = ({ onAdd, files, searchTerm, setSearchTerm, isLoading, onDelete }) => {
  // Filter files by search term
  const filteredFiles = files.filter(file =>
    file.applicationName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.fileName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Download Application List</h1>
        <p className="text-gray-500 font-bold text-sm">
          Manage your downloadable applications and files
        </p>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-purple-700 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-800 transition"
        >
          <FiPlus size={18} />
          Add Download
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="3" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mb-3"></div>
                    <span>Loading applications...</span>
                  </div>
                </td>
              </tr>
            ) : filteredFiles.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-6 py-12 text-center text-gray-500">
                  {files.length === 0 ? 'No applications found. Add your first download.' : 'No matching applications found.'}
                </td>
              </tr>
            ) : (
              filteredFiles.map(file => (
                <tr key={file.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {file.applicationName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center gap-2">
                      <FiFileText className="text-gray-400" />
                      <span>{file.fileName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a
                      href={file.fileUrl}
                      download={file.fileName}
                      className="text-purple-600 hover:text-purple-900 mr-4 inline-flex items-center gap-1"
                    >
                      <FiDownload size={14} />
                      Download
                    </a>
                    <button 
                      onClick={() => onDelete(file.id)}
                      className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                    >
                      <FiX size={14} />
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
            Showing <span className="font-semibold">{filteredFiles.length > 0 ? 1 : 0}</span> to <span className="font-semibold">{filteredFiles.length}</span> of <span className="font-semibold">{filteredFiles.length}</span> entries
          </div>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 text-gray-600 hover:text-purple-700 disabled:opacity-50 px-3 py-1 rounded border border-gray-300" disabled>
              Previous
            </button>
            
            <div className="flex gap-1">
              <button className="w-8 h-8 rounded-lg bg-purple-700 text-white flex items-center justify-center text-sm">1</button>
            </div>
            
            <button className="flex items-center gap-1 text-gray-600 hover:text-purple-700 disabled:opacity-50 px-3 py-1 rounded border border-gray-300" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FileUpload = ({ onViewList, onUpload }) => {
  const [form, setForm] = useState({
    applicationName: "",
    file: null,
  });
  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setForm({ ...form, file });
      setFileName(file ? file.name : "");
      setFileUrl(file ? URL.createObjectURL(file) : "");
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.applicationName.trim()) newErrors.applicationName = "Application Name is required";
    if (!form.file) newErrors.file = "File is required";
    return newErrors;
  };

  const handleRemoveFile = () => {
    setForm({ ...form, file: null });
    setFileName("");
    setFileUrl("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    onUpload({
      applicationName: form.applicationName,
      fileName: fileName,
      fileUrl: fileUrl,
    });
    
    // Reset form
    setForm({ applicationName: "", file: null });
    setFileName("");
    setFileUrl("");
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add Download Application</h1>
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
          {/* Application Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Application Name</label>
            <input
              type="text"
              name="applicationName"
              value={form.applicationName}
              onChange={handleChange}
              placeholder="Enter application name"
              className={`w-full rounded-xl border bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.applicationName ? "border-red-500" : "border-gray-300 hover:border-gray-400"
              }`}
            />
            {errors.applicationName && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.applicationName}
              </p>
            )}
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">File Upload</label>
            <div
              className="border-2 border-dashed border-purple-300 rounded-xl p-6 text-center cursor-pointer bg-purple-50 hover:bg-purple-100 transition-colors"
              onClick={() => document.getElementById('download-upload').click()}
            >
              <FiUpload className="mx-auto text-purple-500 mb-3" size={36} />
              <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">PDF, DOCX, XLSX, PNG, JPG (max. 10MB)</p>
              <input
                id="download-upload"
                type="file"
                name="file"
                onChange={handleChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,image/*"
              />
            </div>
            
            {fileName && (
              <div className="mt-4 flex items-center justify-between bg-purple-50 rounded-lg p-3">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <FiFileText size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{fileName}</p>
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
            
            {errors.file && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.file}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onViewList}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors font-medium"
            >
              Save Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DownloadCreate;