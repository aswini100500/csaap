import { useState } from "react";
import { Users, UserCheck, UserX, Shield, Search, Download, FileText, Printer } from "lucide-react";

const columns = [
  "Name", "Email", "Phone", "Message", "Experience in Years", "Status",
  "Job Position Name", "Country", "City", "State", "Industry", "Job Type"
];

function Dashboard() {
  const [loading] = useState(true);

  const stats = [
    { label: "Cloudsat Admin Users", value: "1,245", icon: Users, color: "blue" },
    { label: "Active Users", value: "892", icon: UserCheck, color: "green" },
    { label: "Inactive Users", value: "353", icon: UserX, color: "gray" },
    { label: "Admin Users", value: "47", icon: Shield, color: "purple" },
  ];

  const colorMap = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    green: "text-emerald-600 bg-emerald-50 border-emerald-100", 
    gray: "text-slate-600 bg-slate-50 border-slate-100",
    purple: "text-purple-600 bg-purple-50 border-purple-100"
  };

  return (
    <div className="min-h-screen bg-slate-50 rounded-2xl ">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 rounded-2xl py-4">
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1">Overview of your system users and activity</p>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg border ${colorMap[stat.color]}`}>
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Data Table Section */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          {/* Table Header */}
          <div className="px-4 py-3 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">User Management</h2>
            <p className="text-slate-600 text-xs mt-1">Manage and view all system users</p>
          </div>

          {/* Table Controls */}
          <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
              {/* Export Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium text-slate-700 mr-2">Export:</span>
                <button className="inline-flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors">
                  <FileText size={14} />
                  CSV
                </button>
                <button className="inline-flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors">
                  <Download size={14} />
                  Excel
                </button>
                <button className="inline-flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors">
                  <FileText size={14} />
                  PDF
                </button>
                <button className="inline-flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors">
                  <Printer size={14} />
                  Print
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400" size={14} />
                <input
                  className="pl-8 pr-3 py-1.5 border border-slate-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  placeholder="Search users..."
                  type="search"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-100">
                  {columns.map(col => (
                    <th
                      key={col}
                      className="px-3 py-2 text-left font-medium text-slate-500 uppercase tracking-wider border-b border-slate-200 whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={columns.length} className="px-3 py-8 text-center">
                    {loading ? (
                      <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2"></div>
                        <p className="text-slate-600 text-xs">Loading user data...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Users className="h-8 w-8 text-slate-300 mb-2" />
                        <p className="text-slate-600 text-xs">No users found</p>
                        <p className="text-slate-400 text-xs mt-1">Try adjusting your search criteria</p>
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-4 py-3 border-t border-slate-200 bg-slate-50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-slate-600">Showing 0 to 0 of 0 entries</p>
              <div className="flex items-center gap-1">
                <button className="px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  <button className="px-2 py-1 text-xs font-medium text-white bg-blue-600 border border-blue-600 rounded-md">
                    1
                  </button>
                </div>
                <button className="px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;