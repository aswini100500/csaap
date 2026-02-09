import React from 'react';
import AdminNavbar from './AdminNavbar'; // Import your navbar component

const AdminMainContent = () => {
  // Sample data - replace with your actual data
  const stats = [
    { name: 'Total Users', value: '2,345', change: '+12%', changeType: 'positive' },
    { name: 'Active Sessions', value: '893', change: '+8%', changeType: 'positive' },
    { name: 'Tasks Completed', value: '1,234', change: '-3%', changeType: 'negative' },
    { name: 'Revenue', value: '$12,345', change: '+24%', changeType: 'positive' },
  ];

  const recentActivity = [
    { id: 1, user: 'John Doe', action: 'Created new project', time: '2 min ago' },
    { id: 2, user: 'Jane Smith', action: 'Updated settings', time: '10 min ago' },
    { id: 3, user: 'Robert Johnson', action: 'Completed task', time: '1 hour ago' },
    { id: 4, user: 'Emily Davis', action: 'Uploaded files', time: '3 hours ago' },
    { id: 5, user: 'Michael Brown', action: 'Commented on ticket', time: '5 hours ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      
      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-sm text-gray-600">Welcome back! Here's what's happening today.</p>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-10">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                      {/* Icon would go here */}
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change}
                        </div>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {/* Recent Activity */}
            <div className="bg-white shadow rounded-lg lg:col-span-2">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="min-w-0 flex-1 flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-600 text-sm">
                              {activity.user.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1 px-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {activity.user}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {activity.action}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 whitespace-nowrap">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6">
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-3"
                >
                  Create New Project
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-3"
                >
                  Invite Team Member
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  View Reports
                </button>
              </div>
            </div>
          </div>

          {/* Additional content to enable scrolling */}
          <div className="mt-10 bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">System Overview</h3>
            <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center text-gray-400">
              Chart/Graph Placeholder
            </div>
          </div>

          <div className="mt-10 bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Projects</h3>
            <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center text-gray-400">
              Projects Table Placeholder
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminMainContent;