import React from 'react';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';


const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md h-screen fixed">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Dashboard Section */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
            <Dashboard />
          </section>

    
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;