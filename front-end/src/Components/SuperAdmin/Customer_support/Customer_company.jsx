import { useState } from "react";
import {
  Users,
  Search,
  Download,
  Printer,
  FileText,
  Grid3X3,
} from "lucide-react";

const columns = [
  "Customer Name",
  "Company Name",
  "Address", // Fixed typo: "Adress" → "Address"
  "Email",
  "Mobile",
  "Phone", // Removed extra space
  "GST No.",
];

function Customer_company() {
  const [loading] = useState(true);

  return (
    <div className="flex-1 bg-gray-50 p-4 rounded-2xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Customer Company List
        </h1>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-3">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: "CSV", icon: FileText },
                { label: "Excel", icon: Grid3X3 },
                { label: "PDF", icon: Download },
                { label: "Print", icon: Printer },
              ].map((btn, idx) => {
                const Icon = btn.icon;
                return (
                  <button
                    key={idx}
                    className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-all"
                  >
                    <Icon size={13} />
                    {btn.label}
                  </button>
                );
              })}
            </div>
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="search"
                placeholder="Search companies..."
                className="pl-9 pr-3 py-2 w-48 lg:w-64 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {columns.map((col, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase border-b border-gray-200"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-8 text-center"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                      <p className="text-gray-500 font-medium text-sm">
                        Loading company data...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-8 text-center"
                  >
                    <Users className="w-10 h-10 text-gray-300 mb-3 mx-auto" />
                    <p className="text-gray-500 font-medium text-sm">
                      No companies found
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-xs text-gray-600">
              Showing <span className="font-medium">0</span> to{" "}
              <span className="font-medium">0</span> of{" "}
              <span className="font-medium">0</span> results
            </div>
            <div className="flex items-center gap-1">
              {["First", "Previous", "Next", "Last"].map((label, idx) => (
                <button
                  key={idx}
                  disabled
                  className="px-3 py-1 text-xs font-medium text-gray-400 bg-white border border-gray-200 rounded cursor-not-allowed"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customer_company;