import React from 'react';
import { Building2, Users, HardHat, DollarSign } from 'lucide-react';
import ProjectsTable from './ProjectsTable';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-gray-900">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  </div>
);

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Superadmin Overview</h1>
        <p className="text-gray-500 text-sm">Welcome back! Here is what's happening with your projects.</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Projects" value="12" icon={Building2} color="bg-blue-600" />
        <StatCard title="Total Contractors" value="48" icon={HardHat} color="bg-orange-500" />
        <StatCard title="Active Brokers" value="156" icon={Users} color="bg-green-600" />
        <StatCard title="Total Revenue" value="$4.2M" icon={DollarSign} color="bg-purple-600" />
      </div>

      {/* Recent Projects Table */}
      <div className="mt-8">
        <ProjectsTable />
      </div>
    </div>
  );
};

export default DashboardHome;