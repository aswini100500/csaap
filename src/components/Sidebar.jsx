import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ChevronDown, 
  HardHat, 
  Building2, 
  Users, 
  Truck, 
  ChevronRight,
  Package,
  FileText,
  Settings,
  UserPlus,
  Home,
  ShoppingCart,
  TrendingUp,
  Warehouse,
  Barcode,
  Phone,
  Mail,
  MessageSquare,
  HeadphonesIcon,
  Briefcase,
  UserCircle,
  Clock,
  Calendar,
  DollarSign,
  CreditCard,
  PieChart,
  Wallet,
  Handshake,
  Building,
  Target,
  BarChart,
  Wrench,
  ClipboardCheck,
  AlertTriangle,
  Shield,
  Layers,
  ClipboardList,
  Clock as ClockIcon,
  FileCheck,
} from 'lucide-react';

const Sidebar = ({ isOpen }) => {
  const [expandedMenus, setExpandedMenus] = useState({
    users: false,
    operations: false,
    'stock-inventory': false,
    hrms: false,
    crm: false,
    accounting: false,
    support: false
  });

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const sidebarItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} className="text-amber-500" />,
      path: '/dashboard',
      exact: true
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: <Home size={20} className="text-amber-500" />,
      path: '/projects'
    },
    {
      id: 'contractors',
      label: 'Contractors',
      icon: <HardHat size={20} className="text-amber-500" />,
      path: '/contractors'
    },
    {
      id: 'brokers',
      label: 'Brokers',
      icon: <Users size={20} className="text-amber-500" />,
      path: '/brokers'
    },
    {
      id: 'suppliers',
      label: 'Suppliers',
      icon: <Truck size={20} className="text-amber-500" />,
      path: '/suppliers'
    },
    {
      id: 'users',
      label: 'User Management',
      icon: <Users size={20} className="text-amber-500" />,
      path: '/users',
      isMainFolder: true,
      subItems: [
        { label: 'All Users', path: '/users/all', icon: <Users size={18} /> },
        { label: 'Add User', path: '/users/add', icon: <UserPlus size={18} /> },
        { label: 'Roles & Permissions', path: '/users/roles', icon: <Settings size={18} /> },
      ]
    },
    {
      id: 'operations',
      icon: <Wrench size={20} className="text-amber-500" />,
      label: 'OPERATIONS',
      color: 'text-amber-500',
      isMainFolder: true,
      subItems: [
        {
          id: 'work-orders',
          label: 'Work Orders',
          icon: <ClipboardList size={18} className="text-amber-500" />,
          path: '/operations/work-orders',
        },
        {
          id: 'maintenance',
          label: 'Maintenance',
          icon: <Wrench size={18} className="text-amber-500" />,
          path: '/operations/maintenance',
        },
        {
          id: 'fleet-management',
          label: 'Fleet Management',
          icon: <Truck size={18} className="text-amber-500" />,
          path: '/operations/fleet',
        },
        {
          id: 'time-tracking',
          label: 'Time Tracking',
          icon: <ClockIcon size={18} className="text-amber-500" />,
          path: '/operations/time-tracking',
        },
        {
          id: 'quality-control',
          label: 'Quality Control',
          icon: <ClipboardCheck size={18} className="text-amber-500" />,
          path: '/operations/quality-control',
        },
        {
          id: 'safety-compliance',
          label: 'Safety & Compliance',
          icon: <Shield size={18} className="text-amber-500" />,
          path: '/operations/safety',
        },
        {
          id: 'task-management',
          label: 'Task Management',
          icon: <ClipboardCheck size={18} className="text-amber-500" />,
          path: '/operations/tasks',
        },
        {
          id: 'project-timeline',
          label: 'Project Timeline',
          icon: <BarChart size={18} className="text-amber-500" />,
          path: '/operations/timeline',
        }
      ]
    },
    {
      id: 'stock-inventory',
      icon: <Warehouse size={20} className="text-amber-500" />,
      label: 'STOCK & INVENTORY',
      color: 'text-amber-500',
      isMainFolder: true,
      subItems: [
        {
          id: 'purchase',
          label: 'Purchase',
          icon: <ShoppingCart size={18} className="text-amber-500" />,
          path: '/builder-erp/admin/purchase-main',
        },
        {
          id: 'stock-management',
          label: 'Stock Management',
          icon: <Warehouse size={18} className="text-amber-500" />,
          path: '/builder-erp/admin/stock-entry',
        },
        {
          id: 'sale',
          label: 'Sale',
          icon: <TrendingUp size={18} className="text-amber-500" />,
          path: '/builder-erp/admin/sale-main',
        },
        {
          id: 'indent',
          label: 'Indent',
          icon: <FileText size={18} className="text-amber-500" />,
          path: '/builder-erp/admin/indent-main',
        },
        { 
          id: 'supplier-list', 
          label: 'Supplier List', 
          icon: <Users size={18} className="text-amber-500" />, 
          path: '/builder-erp/admin/supplier-list',
        },
        { 
          id: 'barcode-sale', 
          label: 'Barcode Sale', 
          icon: <Barcode size={18} className="text-amber-500" />, 
          path: '/builder-erp/admin/barcode-sale',
        }
      ]
    },
    {
      id: 'hrms',
      icon: <Briefcase size={20} className="text-amber-500" />,
      label: 'HRMS',
      color: 'text-amber-500',
      isMainFolder: true,
      subItems: [
        {
          id: 'employees',
          label: 'Employees',
          icon: <UserCircle size={18} className="text-amber-500" />,
          path: '/hrms/employees',
        },
        {
          id: 'attendance',
          label: 'Attendance',
          icon: <Clock size={18} className="text-amber-500" />,
          path: '/hrms/attendance',
        },
        {
          id: 'payroll',
          label: 'Payroll',
          icon: <DollarSign size={18} className="text-amber-500" />,
          path: '/hrms/payroll',
        },
        {
          id: 'leave',
          label: 'Leave Management',
          icon: <Calendar size={18} className="text-amber-500" />,
          path: '/hrms/leave',
        },
        {
          id: 'recruitment',
          label: 'Recruitment',
          icon: <Users size={18} className="text-amber-500" />,
          path: '/hrms/recruitment',
        }
      ]
    },
    {
      id: 'crm',
      icon: <Handshake size={20} className="text-amber-500" />,
      label: 'CRM',
      color: 'text-amber-500',
      isMainFolder: true,
      subItems: [
        {
          id: 'leads',
          label: 'Leads',
          icon: <Target size={18} className="text-amber-500" />,
          path: '/crm/leads',
        },
        {
          id: 'clients',
          label: 'Clients',
          icon: <Building size={18} className="text-amber-500" />,
          path: '/crm/clients',
        },
        {
          id: 'contacts',
          label: 'Contacts',
          icon: <Users size={18} className="text-amber-500" />,
          path: '/crm/contacts',
        },
        {
          id: 'deals',
          label: 'Deals Pipeline',
          icon: <BarChart size={18} className="text-amber-500" />,
          path: '/crm/deals',
        },
        {
          id: 'tasks',
          label: 'Tasks',
          icon: <Calendar size={18} className="text-amber-500" />,
          path: '/crm/tasks',
        }
      ]
    },
    {
      id: 'accounting',
      icon: <PieChart size={20} className="text-amber-500" />,
      label: 'ACCOUNTING',
      color: 'text-amber-500',
      isMainFolder: true,
      subItems: [
        {
          id: 'chart-of-accounts',
          label: 'Chart of Accounts',
          icon: <FileText size={18} className="text-amber-500" />,
          path: '/accounting/coa',
        },
        {
          id: 'invoices',
          label: 'Invoices',
          icon: <CreditCard size={18} className="text-amber-500" />,
          path: '/accounting/invoices',
        },
        {
          id: 'expenses',
          label: 'Expenses',
          icon: <DollarSign size={18} className="text-amber-500" />,
          path: '/accounting/expenses',
        },
        {
          id: 'reports',
          label: 'Financial Reports',
          icon: <BarChart size={18} className="text-amber-500" />,
          path: '/accounting/reports',
        },
        {
          id: 'banking',
          label: 'Banking',
          icon: <Wallet size={18} className="text-amber-500" />,
          path: '/accounting/banking',
        }
      ]
    },
    {
      id: 'support',
      icon: <HeadphonesIcon size={20} className="text-amber-500" />,
      label: 'SUPPORT',
      color: 'text-amber-500',
      isMainFolder: true,
      subItems: [
        {
          id: 'tickets',
          label: 'Support Tickets',
          icon: <MessageSquare size={18} className="text-amber-500" />,
          path: '/support/tickets',
        },
        {
          id: 'knowledge-base',
          label: 'Knowledge Base',
          icon: <FileText size={18} className="text-amber-500" />,
          path: '/support/knowledge-base',
        },
        {
          id: 'live-chat',
          label: 'Live Chat',
          icon: <MessageSquare size={18} className="text-amber-500" />,
          path: '/support/live-chat',
        },
        {
          id: 'contact-us',
          label: 'Contact Us',
          icon: <Phone size={18} className="text-amber-500" />,
          path: '/support/contact',
        }
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen sticky top-0">
      {/* Fixed header section */}
      <NavLink 
        to="/dashboard" 
        className="p-5 text-xl font-bold border-b border-slate-800 hover:bg-slate-800 transition-colors shrink-0"
      >
        BuilderERP <span className="text-blue-400">Pro</span>
      </NavLink>

      {/* Scrollable navigation section */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-3 space-y-1">
          {sidebarItems.map((item) => {
            const isExpanded = expandedMenus[item.id];
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isMainFolder = item.isMainFolder;

            return (
              <div key={item.id} className="mb-1">
                {hasSubItems ? (
                  <>
                    <button 
                      onClick={() => toggleMenu(item.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors text-sm ${
                        isExpanded ? 'bg-slate-800' : 'hover:bg-slate-800'
                      } ${isMainFolder ? 'border-l-2 border-amber-500' : ''}`}
                    >
                      <div className="flex items-center">
                        <span className={`mr-3 ${item.color || 'text-slate-300'}`}>
                          {item.icon}
                        </span>
                        <span className={`font-medium ${isMainFolder ? 'uppercase tracking-wide text-xs' : ''}`}>
                          {item.label}
                        </span>
                      </div>
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>

                    {isExpanded && (
                      <div className={`ml-9 mt-1 space-y-1 ${isMainFolder ? 'border-l border-amber-700' : 'border-l border-slate-700'}`}>
                        {item.subItems.map((subItem) => (
                          <NavLink
                            key={subItem.path}
                            to={subItem.path}
                            className={({ isActive }) =>
                              `flex items-center p-2 pl-4 rounded-md transition-colors text-sm ${
                                isActive
                                  ? 'text-white bg-amber-600 border-l-2 border-amber-400'
                                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
                              }`
                            }
                          >
                            {subItem.icon && (
                              <span className={`mr-2 ${subItem.icon.props?.className || 'text-slate-400'}`}>
                                {subItem.icon}
                              </span>
                            )}
                            <div className="flex flex-col">
                              <span>{subItem.label}</span>
                            </div>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    end={item.exact}
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-lg transition-colors text-sm ${
                        isActive
                          ? 'text-white bg-blue-600'
                          : 'hover:bg-slate-800 text-slate-200'
                      }`
                    }
                  >
                    <span className="mr-3 text-slate-300">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Fixed footer section */}
      <div className="p-4 border-t border-slate-800 shrink-0">
        <div className="flex items-center p-3 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center mr-3">
            <span className="font-bold text-sm">SA</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Super Admin</p>
            <p className="text-xs text-slate-400">admin@example.com</p>
          </div>
          <Settings size={18} className="text-slate-400" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;