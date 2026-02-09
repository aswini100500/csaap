import React from 'react';
import { MoreVertical, ExternalLink, Filter, Download } from 'lucide-react';

const ProjectsTable = () => {
  const projects = [
    { id: 1, name: "Skyline Residency", manager: "John Doe", progress: 75, status: "In Progress", budget: "$1.2M" },
    { id: 2, name: "Blue Harbor Mall", manager: "Sarah Smith", progress: 100, status: "Completed", budget: "$4.5M" },
    { id: 3, name: "Green Valley Villas", manager: "Mike Ross", progress: 30, status: "Delayed", budget: "$800K" },
    { id: 4, name: "Industrial Hub X", manager: "Harvey Specter", progress: 10, status: "Planning", budget: "$2.1M" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Delayed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Table Header / Toolbar */}
      <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-gray-800">Active Projects</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
            <Filter size={16} /> Filter
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
              <th className="px-6 py-4">Project Name</th>
              <th className="px-6 py-4">Project Manager</th>
              <th className="px-6 py-4">Progress</th>
              <th className="px-6 py-4">Budget</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{project.name}</td>
                <td className="px-6 py-4 text-gray-600 text-sm">{project.manager}</td>
                <td className="px-6 py-4">
                  <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{project.progress}%</span>
                </td>
                <td className="px-6 py-4 text-sm font-semibold">{project.budget}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsTable;