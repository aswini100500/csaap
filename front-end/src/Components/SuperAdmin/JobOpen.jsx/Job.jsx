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
  FiEdit,
  FiTrash2
} from "react-icons/fi";

const Job = () => {
  const [currentView, setCurrentView] = useState("list"); // 'list' or 'create'
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateJob = (newJob) => {
    setJobs([...jobs, { id: Date.now(), ...newJob }]);
    setCurrentView("list");
  };

  const handleDeleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {currentView === "list" ? (
        <JobList
          onCreateJob={() => setCurrentView("create")}
          jobs={jobs}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isLoading={isLoading}
          onDeleteJob={handleDeleteJob}
        />
      ) : (
        <JobCreate
          onViewList={() => setCurrentView("list")}
          onCreateJob={handleCreateJob}
        />
      )}
    </div>
  );
};

const JobList = ({
  onCreateJob,
  jobs,
  searchTerm,
  setSearchTerm,
  isLoading,
  onDeleteJob
}) => {
  const filteredJobs = jobs.filter(job =>
    job.jobPositionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Job Openings</h1>
        <p className="text-gray-500 font-bold text-sm">
          Manage your job openings and applications.
        </p>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <button
          onClick={onCreateJob}
          className="flex items-center gap-2 bg-purple-700 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-800 transition mt-4 md:mt-0"
        >
          <FiPlus size={18} />
          Create Job Opening
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
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  State
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  City
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Industry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Opened
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
              ) : filteredJobs.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No job openings found. Click "Create Job Opening" to add one.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr key={job.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {job.jobPositionName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.country}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.state}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.city}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.industry}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.jobType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.workExperience}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.dateOpened}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-purple-600 hover:text-purple-900 mr-3">
                        <FiEdit size={16} />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => onDeleteJob(job.id)}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 bg-gray-50 flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-gray-700 mb-4 md:mb-0">
            Showing <span className="font-semibold">{filteredJobs.length}</span> of{" "}
            <span className="font-semibold">{filteredJobs.length}</span> entries
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

const JobCreate = ({ onViewList, onCreateJob }) => {
  const [formData, setFormData] = useState({
    jobPositionName: "",
    country: "",
    city: "",
    state: "",
    industry: "",
    jobType: "",
    workExperience: "",
    dateOpened: "",
    jobDescription: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateJob(formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Job Opening Create</h1>
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
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Job Position Name <span className="text-red-500">*</span>
              </label>
              <input
                name="jobPositionName"
                type="text"
                value={formData.jobPositionName}
                onChange={handleChange}
                placeholder="Job Position Name"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-gray-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                name="country"
                type="text"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-gray-400"
                required
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <input
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-gray-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                State <span className="text-red-500">*</span>
              </label>
              <input
                name="state"
                type="text"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-gray-400"
                required
              />
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Industry <span className="text-red-500">*</span>
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-gray-400"
                required
              >
                <option value="">Select Industry</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Manufacturing">Manufacturing</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Job Type <span className="text-red-500">*</span>
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-gray-400"
                required
              >
                <option value="">Select Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Work Experience <span className="text-red-500">*</span>
              </label>
              <select
                name="workExperience"
                value={formData.workExperience}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-gray-400"
                required
              >
                <option value="">Select Experience</option>
                <option value="Entry Level">Entry Level (0-2 years)</option>
                <option value="Mid Level">Mid Level (2-5 years)</option>
                <option value="Senior Level">Senior Level (5+ years)</option>
                <option value="Executive">Executive</option>
              </select>
            </div>
          </div>

          {/* Fourth Row */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Date Opened <span className="text-red-500">*</span>
            </label>
            <input
              name="dateOpened"
              type="date"
              value={formData.dateOpened}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-gray-400"
              required
            />
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              placeholder="Enter job description"
              rows="5"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-gray-400"
              required
            />
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors font-medium"
            >
              Save Job Opening
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Job;