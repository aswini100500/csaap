import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  BriefcaseBusiness,
  Package,
  Truck,
  Users,
  FileSignature,
  LifeBuoy,
  User,
  Settings,
  ChevronDown,
  ChevronRight,
  ShoppingCart,
  Warehouse,
  TrendingUp,
  FileText,
  Barcode
} from "lucide-react";

const Sidebar = ({ isCollapsed, onNavigate }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const location = useLocation();

  const toggleExpanded = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // All paths should be prefixed with /admin since that's your base route
  const menuItems = [
    {
      id: "dashboard",
      icon: Home,
      label: "Dashboard",
      color: "text-blue-500",
      path: "/builder-erp/admin"  // This is the index route for /admin
    },
    {
      id: "projects",
      icon: BriefcaseBusiness,
      label: "Projects",
      color: "text-purple-500",
      path: "/builder-erp/admin/projects"
    },
    {
      id: "stock",
      icon: Package,
      label: "Stock & Inventory",
      color: "text-amber-500",
      subItems: [
        {
          id: "purchase",
          label: "Purchase",
          icon: ShoppingCart,
          subItems: [
            { id: "purchase-entry", label: "Purchase Entry", icon: FileText, path: "/builder-erp/admin/purchase-entry" },
            { id: "purchase-history", label: "Purchase History", icon: FileText, path: "/builder-erp/admin/purchase-history" },
            { id: "purchase-ledger", label: "Purchase Ledger", icon: FileText, path: "/builder-erp/admin/purchase-ledger" }
          ]
        },
        {
          id: "stock-management",
          label: "Stock Management",
          icon: Warehouse,
          subItems: [
            { id: "stock-entry", label: "Stock entry", icon: FileText, path: "/builder-erp/admin/stock-entry" },
            { id: "stock-list", label: "Stock List", icon: FileText, path: "/builder-erp/admin/stock-list" },
            { id: "stock-transfer-entry", label: "Stock Transfer Entry", icon: FileText, path: "/builder-erp/admin/stock-transfer-entry" },
            { id: "stock-transfer-accept", label: "Stock Transfer Accept", icon: FileText, path: "/builder-erp/admin/stock-transfer-accept" }
          ]
        },
        {
          id: "sale",
          label: "Sale",
          icon: TrendingUp,
          subItems: [
            { id: "sale-entry", label: "Sale Entry", icon: FileText, path: "/builder-erp/admin/sale-entry" },
            { id: "sale-history", label: "Sale History", icon: FileText, path: "/builder-erp/admin/sale-history" }
          ]
        },
        {
          id: "indent",
          label: "Indent",
          icon: FileText,
          subItems: [
            { id: "indent-entry", label: "Indent Entry", icon: FileText, path: "/builder-erp/admin/indent-entry" },
            { id: "indent-list", label: "Indent List", icon: FileText, path: "/builder-erp/admin/indent-history" }
          ]
        },
        { id: "supplier-list", label: "Supplier List", icon: Users, path: "/builder-erp/admin/supplier-list" },
        { id: "barcode-sale", label: "Barcode Sale", icon: Barcode, path: "/builder-erp/admin/barcode-sale" }
      ]
    },
    {
      id: "supplierpage",
      icon: Truck,
      label: "Supplier",
      color: "text-indigo-500",
      path: "/builder-erp/admin/supplierpage"
    },
    {
      id: "broker",
      icon: Users,
      label: "Broker",
      color: "text-pink-500",
      path: "/builder-erp/admin/broker"
    },
    {
      id: "contractors",
      icon: FileSignature,
      label: "Contractor",
      color: "text-green-500",
      path: "/builder-erp/admin/contractors"
    },
    {
      id: "customer",
      icon: User,
      label: "Customer",
      color: "text-teal-500",
      path: "/builder-erp/admin/customer"
    },
    {
      id: "operation",
      icon: Settings,
      label: "Operation",
      color: "text-orange-500",
      path: "/builder-erp/admin/operation"
    },
    {
      id: "support",
      icon: LifeBuoy,
      label: "Support",
      color: "text-red-500",
      path: "/builder-erp/admin/support"
    }
  ];

  const handleItemClick = (item) => {
    if (item.subItems) {
      toggleExpanded(item.id);
    } else {
      onNavigate && onNavigate(item.id);
    }
  };

  // Check if a menu item is active based on current path
  const isActiveItem = (item) => {
    if (item.path) {
      return location.pathname === item.path;
    }
    
    if (item.subItems) {
      return item.subItems.some(subItem => {
        if (subItem.subItems) {
          return subItem.subItems.some(nestedItem => nestedItem.path === location.pathname);
        }
        return subItem.path === location.pathname;
      });
    }
    
    return false;
  };

  // Auto-expand parent items when a child is active
  const shouldAutoExpand = (item) => {
    if (item.subItems) {
      return item.subItems.some(subItem => {
        if (subItem.subItems) {
          return subItem.subItems.some(nestedItem => nestedItem.path === location.pathname);
        }
        return subItem.path === location.pathname;
      });
    }
    return false;
  };

  const renderSubItems = (subItems, level = 1) => {
    return (
      <div className={`ml-${level * 3} mt-1 transition-all duration-300`}>
        {subItems.map((subItem) => (
          <div key={subItem.id}>
            {subItem.subItems ? (
              <>
                <button
                  className={`w-full flex items-center p-2 rounded-lg mb-1 cursor-pointer transition-all duration-200 text-left group
                    ${
                      isActiveItem(subItem)
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium shadow-sm"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                  onClick={() => toggleExpanded(subItem.id)}
                >
                  <span className="mr-2 transition-transform duration-200">
                    {expandedItems[subItem.id] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </span>
                  <span className="text-sm">{subItem.label}</span>
                </button>
                {expandedItems[subItem.id] && (
                  <div className="overflow-hidden transition-all duration-300">
                    {renderSubItems(subItem.subItems, level + 1)}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={subItem.path}
                className={`w-full flex items-center p-2 rounded-lg mb-1 cursor-pointer transition-all duration-200 text-left group
                  ${
                    location.pathname === subItem.path
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium shadow-sm"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}
                onClick={() => onNavigate && onNavigate(subItem.id)}
              >
                <span className="mr-2 w-4 flex justify-center">
                  {subItem.icon ? <subItem.icon size={14} className="text-gray-500 group-hover:text-blue-500" /> : <div className="w-1 h-1 rounded-full bg-gray-400"></div>}
                </span>
                <span className="text-sm">{subItem.label}</span>
              </Link>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`h-full bg-white dark:bg-gray-800 shadow-sm flex flex-col ${
        isCollapsed ? "w-16" : "w-64"
      } transition-all duration-300`}
    >
      {/* Logo/Brand */}
      {!isCollapsed && (
        <div className="flex items-center justify-center p-4 border-b border-gray-200 dark:border-gray-700">
          <Link to="/admin" className="text-xl font-bold text-gray-800 dark:text-white">
            builderAdmin Dashboard
          </Link>
        </div>
      )}

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-4 px-2">
        {menuItems.map((item) => (
          <div key={item.id}>
            {item.subItems ? (
              <>
                <button
                  className={`w-full flex items-center p-3 rounded-lg mb-1 cursor-pointer transition-all duration-200 group
                    ${
                      isActiveItem(item)
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium shadow-sm"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  onClick={() => handleItemClick(item)}
                >
                  <item.icon
                    className={`h-6 w-6 ${item.color} ${
                      isCollapsed ? "mx-auto" : "mr-3"
                    }`}
                  />
                  {!isCollapsed && (
                    <>
                      <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                      <span className={`transition-transform duration-200 ${expandedItems[item.id] ? 'rotate-180' : ''}`}>
                        <ChevronDown size={16} />
                      </span>
                    </>
                  )}
                </button>
                {!isCollapsed && (expandedItems[item.id] || shouldAutoExpand(item)) && (
                  <div className="overflow-hidden transition-all duration-300">
                    {renderSubItems(item.subItems)}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={`w-full flex items-center p-3 rounded-lg mb-1 cursor-pointer transition-all duration-200 group
                  ${
                    location.pathname === item.path
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium shadow-sm"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                onClick={() => onNavigate && onNavigate(item.id)}
              >
                <item.icon
                  className={`h-6 w-6 ${item.color} ${
                    isCollapsed ? "mx-auto" : "mr-3"
                  }`}
                />
                {!isCollapsed && (
                  <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                )}
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* User info at bottom */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
              B
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                builderAdmin
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Licensed Broker
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;