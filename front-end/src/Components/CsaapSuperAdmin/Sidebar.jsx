import {
  HomeIcon,
  BuildingOffice2Icon,
  UsersIcon,
  PuzzlePieceIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  RectangleStackIcon,
  ChartBarIcon,
  ArrowLeftOnRectangleIcon,
  ShieldCheckIcon,
  KeyIcon,
  // Add this new icon for Role & Permission Management
  LockClosedIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ 
  isCollapsed, 
  onNavigate,
  activeContent
}) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', icon: HomeIcon, label: 'Dashboard', color: 'text-purple-500' },
    { id: 'company', icon: BuildingOffice2Icon, label: 'Company', color: 'text-blue-500' },
    // { id: 'users', icon: UsersIcon, label: 'Users', color: 'text-green-500' },
    // Add the new Role & Permission Management item
    // { id: 'role-permission-management', icon: LockClosedIcon, label: 'Role & Permission', color: 'text-cyan-500' },
    // { id: 'roles', icon: ShieldCheckIcon, label: 'Roles', color: 'text-amber-500' },
    // { id: 'permissions', icon: KeyIcon, label: 'Permissions', color: 'text-orange-500' },
    { id: 'modules', icon: PuzzlePieceIcon, label: 'Modules', color: 'text-yellow-500' },
    { id: 'plan', icon: CurrencyDollarIcon, label: 'Plan', color: 'text-red-500' },
    { id: 'category', icon: RectangleStackIcon, label: 'Category', color: 'text-indigo-500' },
    // { id: 'reports', icon: ChartBarIcon, label: 'Reports', color: 'text-teal-500' },
    { id: 'settings', icon: Cog6ToothIcon, label: 'Settings', color: 'text-gray-500' },
    { id: 'logout', icon: ArrowLeftOnRectangleIcon, label: 'Logout', color: 'text-pink-500' }
  ];

  const handleNavigate = async (id) => {
    if (id === 'logout') {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error('No authentication token found');
          navigate('/login');
          return;
        }

        await axios.post('https://api.csaap.com/api/logout', {}, {
          headers: { Authorization: `Bearer ${token}` },
        });

        localStorage.removeItem('authToken');
        alert('Logged out successfully!');
        navigate('/login');
      } catch (error) {
        console.error('Error logging out:', error.message);
        if (error.response?.status === 401) {
          alert('Session expired. Please log in again.');
        } else {
          alert('Failed to log out. Please try again.');
        }
        localStorage.removeItem('authToken');
        navigate('/login');
      }
    } else {
      onNavigate(id);
    }
  };

  return (
    <div className={`h-full bg-white dark:bg-gray-800 shadow-sm flex flex-col ${isCollapsed ? 'w-16' : 'w-56'}`}>
      {/* Logo/Brand */}
      {!isCollapsed && (
       <>
       </>
      )}
      
      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-4 px-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`w-full flex items-center p-3 rounded-lg mb-1 cursor-pointer transition-colors
              ${activeContent === item.id ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 
                'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            onClick={() => handleNavigate(item.id)}
          >
            <item.icon className={`h-6 w-6 ${item.color} ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
          </button>
        ))}
      </div>
      
      {/* User info at bottom (optional) */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              A
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800 dark:text-white">Admin User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Super Admin</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;