// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   FaHome,
//   FaThLarge,
//   FaUser,
//   FaList,
//   FaGlobe,
//   FaFileAlt,
//   FaCreditCard,
//   FaBriefcase,
//   FaHeadset,
//   FaQuestionCircle,
//   FaInfoCircle,
//   FaShieldAlt,
//   FaCog,
//   FaChevronDown,
//   FaCaretRight,
// } from "react-icons/fa";
// import { MdOutlineSell } from "react-icons/md";

// const navItems = [
//   { name: "Dashboard", icon: FaHome, path: "/dashboard" },
//   {
//     name: "Menu",
//     icon: FaThLarge,
//     path: "/menu",
//     dropdown: true,
//     subItems: [
//       { label: "Menu List", path: "/menulist" },
//       { label: "Menu Group List", path: "/menugroups" },
//     ],
//   },
//   {
//     name: "User",
//     icon: FaUser,
//     path: "#",
//     dropdown: true,
//     subItems: [
//       { label: "Users List", path: "/users" },
//       { label: "Role List", path: "/rolelist" },
//     ],
//   },
//   {
//     name: "Category",
//     icon: FaList,
//     path: "#",
//     dropdown: true,
//     subItems: [
//       { label: "All Categories", path: "/allcategories" },
//       { label: "Category Create", path: "/create-category" },
//     ],
//   },
//   {
//     name: "Homepage",
//     icon: FaGlobe,
//     path: "#",
//     dropdown: true,
//     subItems: [
//       { label: "Add Banner", path: "/addbanner" },
//       { label: "Homepage Create", path: "/homepage" },
//       { label: "Better Product", path: "/better-product" },
//       { label: "Best for Business", path: "/best-for-business" },
//       { label: "Industry Support", path: "/industry-support" },
//     ],
//   },
//   {
//     name: "Website Page",
//     icon: FaFileAlt,
//     path: "#",
//     dropdown: true,
//     subItems: [
//       { label: "Category Page Section Create", path: "/create" },
//       { label: "Website Banner Content", path: "/banner-content" },
//     ],
//   },
//   {
//     name: "Subscription",
//     icon: FaCreditCard,
//     path: "#",
//     dropdown: true,
//     subItems: [
//       { label: "Planning Mastrer Create", path: "/planning" },
//       { label: "Application Mastrer Create", path: "/Application" },
//       { label: "Planning & Application Create", path: "/planning-application" },
//       { label: "Download Application", path: "/download" },
//       { label: "Plan", path: "/plan" },
//       { label: "App", path: "/app" },
//       { label: "App Price", path: "/app-price" },
//       { label: "App Group", path: "/app-group" },
//       { label: "User Company App", path: "/user-company-app" },
//     ],
//   },
//   {
//     name: "Job Opening",
//     icon: FaBriefcase,
//     path: "#",
//     dropdown: true,
//     subItems: [{ label: "Job Opening Create", path: "/job-create" }],
//   },
//   {
//     name: "Customer Support",
//     icon: FaHeadset,
//     path: "#",
//     dropdown: true,
//     subItems: [
//       { label: "Customer Subscribed Apps", path: "/customer-subscribed" },
//       { label: "Customer Receipt", path: "/customer-receipt" },
//       { label: "Demo Request", path: "/demo-request" },
//       { label: "Customer List", path: "/customer-list" },
//       { label: "Customer Company", path: "/customer-company" },
//     ],
//   },
//   {
//     name: "Question & Answer",
//     icon: FaQuestionCircle,
//     path: "#",
//     dropdown: true,
//     subItems: [{ label: " Q & A Create", path: "/create" }],
//   },
//   {
//     name: "Reseller",
//     icon: MdOutlineSell,
//     path: "#",
//     dropdown: true,
//     subItems: [{ label: "Commission", path: "/commission" }],
//   },
//   {
//     name: "About Us",
//     icon: FaInfoCircle,
//     path: "#",
//     dropdown: true,
//     subItems: [{ label: "About Us Create", path: "/create" }],
//   },
//   {
//     name: "Privacy Policy Terms",
//     icon: FaShieldAlt,
//     path: "#",
//     dropdown: true,
//     subItems: [
//       { label: "Privacy Policy Create", path: "/privacypolicy" },
//       { label: "Terms & Condition Create", path: "/termscreate" },
//     ],
//   },
//   {
//     name: "Settings",
//     icon: FaCog,
//     path: "#",
//     dropdown: true,
//     subItems: [
//       { label: "General", path: "/general" },
//       { label: "Appearance", path: "/appearance" },
//       { label: "Notifications", path: "/notifications" },
//       { label: "Security", path: "/security" },
//       { label: "Backups", path: "/backups" },
//     ],
//   },
// ];

// const Sidebar = () => {
//   const location = useLocation();
//   const [openDropdown, setOpenDropdown] = useState(null);

//   // Set active item based on current path
//   const getActiveItem = () => {
//     const currentPath = location.pathname;
    
//     // Check if current path matches any main nav item
//     const mainItem = navItems.find(item => item.path === currentPath);
//     if (mainItem) return mainItem.name;
    
//     // Check if current path matches any sub item
//     for (const item of navItems) {
//       if (item.subItems) {
//         const subItem = item.subItems.find(sub => sub.path === currentPath);
//         if (subItem) return item.name;
//       }
//     }
    
//     // Default to Dashboard if no match
//     return "Dashboard";
//   };

//   const activeItem = getActiveItem();

//   const toggleDropdown = (itemName) => {
//     if (openDropdown === itemName) {
//       setOpenDropdown(null);
//     } else {
//       setOpenDropdown(itemName);
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-50 rounded-2xl">
//       {/* Sidebar */}
//       <aside className="w-64 min-h-screen bg-white rounded-r-2xl shadow-xl flex flex-col">
//         {/* Navigation Items */}
//         <nav className="p-4 flex-1 overflow-y-auto">
//           <ul className="space-y-2">
//             {navItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = activeItem === item.name;
//               const isDropdownOpen = openDropdown === item.name;

//               return (
//                 <li key={item.name}>
//                   {item.dropdown ? (
//                     // Dropdown items
//                     <div
//                       className={`relative flex items-center py-3 px-4 rounded-lg overflow-hidden group cursor-pointer ${
//                         isActive ? "bg-blue-600" : ""
//                       }`}
//                       onClick={() => toggleDropdown(item.name)}
//                     >
//                       {/* Decorative gradient on hover */}
//                       <div
//                         className={`absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-200 transition-all duration-500 ease-out ${
//                           isActive
//                             ? "opacity-100 translate-x-0"
//                             : "opacity-0 -translate-x-full group-hover:opacity-100 group-hover:translate-x-0"
//                         }`}
//                       ></div>

//                       {/* Active state background */}
//                       <div
//                         className={`absolute inset-0 bg-blue-600 transition-all duration-300 ${
//                           isActive ? "opacity-100" : "opacity-0"
//                         }`}
//                       ></div>

//                       {/* Icon */}
//                       <Icon
//                         className={`relative z-10 mr-3 transition-all duration-300 ${
//                           isActive
//                             ? "text-white transform scale-110"
//                             : "text-blue-700 group-hover:text-blue-800 group-hover:transform group-hover:scale-110"
//                         }`}
//                       />

//                       {/* Text */}
//                       <span
//                         className={`relative z-10 font-medium transition-all duration-300 flex-grow ${
//                           isActive
//                             ? "text-white"
//                             : "text-gray-700 group-hover:text-blue-900"
//                         }`}
//                       >
//                         {item.name}
//                       </span>

//                       {/* Dropdown icon */}
//                       <span
//                         className={`relative z-10 ml-2 transform transition-all duration-300 ${
//                           isActive
//                             ? "text-white"
//                             : "text-gray-500 group-hover:text-blue-800"
//                         } ${isDropdownOpen ? "rotate-0" : "-rotate-90"}`}
//                       >
//                         <FaChevronDown className="w-3 h-3" />
//                       </span>
//                     </div>
//                   ) : (
//                     // Regular link items (like Dashboard)
//                     <Link to={item.path}>
//                       <div
//                         className={`relative flex items-center py-3 px-4 rounded-lg overflow-hidden group cursor-pointer ${
//                           isActive ? "bg-blue-600" : ""
//                         }`}
//                       >
//                         {/* Decorative gradient on hover */}
//                         <div
//                           className={`absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-200 transition-all duration-500 ease-out ${
//                             isActive
//                               ? "opacity-100 translate-x-0"
//                               : "opacity-0 -translate-x-full group-hover:opacity-100 group-hover:translate-x-0"
//                           }`}
//                         ></div>

//                         {/* Active state background */}
//                         <div
//                           className={`absolute inset-0 bg-blue-600 transition-all duration-300 ${
//                             isActive ? "opacity-100" : "opacity-0"
//                           }`}
//                         ></div>

//                         {/* Icon */}
//                         <Icon
//                           className={`relative z-10 mr-3 transition-all duration-300 ${
//                             isActive
//                               ? "text-white transform scale-110"
//                               : "text-blue-700 group-hover:text-blue-800 group-hover:transform group-hover:scale-110"
//                           }`}
//                         />

//                         {/* Text */}
//                         <span
//                           className={`relative z-10 font-medium transition-all duration-300 flex-grow ${
//                             isActive
//                               ? "text-white"
//                               : "text-gray-700 group-hover:text-blue-900"
//                           }`}
//                         >
//                           {item.name}
//                         </span>
//                       </div>
//                     </Link>
//                   )}

//                   {/* Dropdown content */}
//                   {item.dropdown && isDropdownOpen && (
//                     <div className="mt-1 ml-6 pl-2 border-l-2 border-blue-200">
//                       <ul className="space-y-2 py-2">
//                         {item.subItems.map((subItem, index) => (
//                           <li key={index}>
//                             <Link
//                               to={subItem.path}
//                               className="flex items-center py-2 px-4 text-sm text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group/sub"
//                             >
//                               <FaCaretRight className="w-3 h-3 mr-2 text-blue-400 group-hover/sub:text-blue-600" />
//                               {subItem.label}
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         {/* Profile Section */}
//         <div className="p-4 border-t border-gray-200 mt-auto">
//           <div className="flex items-center space-x-3">
//             <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
//               <span className="font-bold text-white">A</span>
//             </div>
//             <div>
//               <h4 className="font-medium text-gray-800">Admin User</h4>
//               <p className="text-xs text-gray-500">Administrator</p>
//             </div>
//           </div>
//         </div>
//       </aside>
//     </div>
//   );
// };

// export default Sidebar;





import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaThLarge,
  FaUser,
  FaList,
  FaGlobe,
  FaFileAlt,
  FaCreditCard,
  FaBriefcase,
  FaHeadset,
  FaQuestionCircle,
  FaInfoCircle,
  FaShieldAlt,
  FaCog,
  FaChevronDown,
  FaCaretRight,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { MdOutlineSell } from "react-icons/md";

const navItems = [
  { name: "Dashboard", icon: FaHome, path: "/dashboard" },
  {
    name: "Menu",
    icon: FaThLarge,
    path: "/menu",
    dropdown: true,
    subItems: [
      { label: "Menu List", path: "/menulist" },
      { label: "Menu Group List", path: "/menugroups" },
    ],
  },
 {
    name: "User",
    icon: FaUser,
    path: "#",
    dropdown: true,
    subItems: [
      { label: "Users List", path: "/users" },
      { label: "Role List", path: "/rolelist" },
    ],
  },
  {
    name: "Category",
    icon: FaList,
    path: "#",
    dropdown: true,
    subItems: [
      { label: "All Categories", path: "/allcategories" },
      { label: "Category Create", path: "/create-category" },
    ],
  },
  {
    name: "Homepage",
    icon: FaGlobe,
    path: "#",
    dropdown: true,
    subItems: [
      { label: "Add Banner", path: "/addbanner" },
      { label: "Homepage Create", path: "/homepage" },
      { label: "Better Product", path: "/better-product" },
      { label: "Best for Business", path: "/best-for-business" },
      { label: "Industry Support", path: "/industry-support" },
    ],
  },
  {
    name: "Website Page",
    icon: FaFileAlt,
    path: "#",
    dropdown: true,
    subItems: [
      { label: "Category Page Section Create", path: "/create" },
      { label: "Website Banner Content", path: "/banner-content" },
    ],
  },
  {
    name: "Subscription",
    icon: FaCreditCard,
    path: "#",
    dropdown: true,
    subItems: [
      { label: "Planning Mastrer Create", path: "/planning" },
      { label: "Application Mastrer Create", path: "/Application" },
      { label: "Planning & Application Create", path: "/planning-application" },
      { label: "Download Application", path: "/download" },
      { label: "Plan", path: "/plan" },
      { label: "App", path: "/app" },
      { label: "App Price", path: "/app-price" },
      { label: "App Group", path: "/app-group" },
      { label: "User Company App", path: "/user-company-app" },
    ],
  },
  {
    name: "Job Opening",
    icon: FaBriefcase,
    path: "#",
    dropdown: true,
    subItems: [{ label: "Job Opening Create", path: "/job-create" }],
  },
  {
    name: "Customer Support",
    icon: FaHeadset,
    path: "#",
    dropdown: true,
    subItems: [
      { label: "Customer Subscribed Apps", path: "/customer-subscribed" },
      { label: "Customer Receipt", path: "/customer-receipt" },
      { label: "Demo Request", path: "/demo-request" },
      { label: "Customer List", path: "/customer-list" },
      { label: "Customer Company", path: "/customer-company" },
    ],
  },
  {
    name: "Question & Answer",
    icon: FaQuestionCircle,
    path: "#",
    dropdown: true,
    subItems: [{ label: " Q & A Create", path: "/create" }],
  },
  {
    name: "Reseller",
    icon: MdOutlineSell,
    path: "#",
    dropdown: true,
    subItems: [{ label: "Commission", path: "/commission" }],
  },
  {
    name: "About Us",
    icon: FaInfoCircle,
    path: "#",
    dropdown: true,
    subItems: [{ label: "About Us Create", path: "/create" }],
  },
  {
    name: "Privacy Policy Terms",
    icon: FaShieldAlt,
    path: "#",
    dropdown: true,
    subItems: [
      { label: "Privacy Policy Create", path: "/privacypolicy" },
      { label: "Terms & Condition Create", path: "/termscreate" },
    ],
  },
  {
    name: "Settings",
    icon: FaCog,
    path: "#",
    dropdown: true,
    subItems: [
      { label: "General", path: "/general" },
      { label: "Appearance", path: "/appearance" },
      { label: "Notifications", path: "/notifications" },
      { label: "Security", path: "/security" },
      { label: "Backups", path: "/backups" },
    ],
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      // Auto-close sidebar on resize to mobile
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    
    // Set initial state based on screen width
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location, isMobile]);

  // Set active item based on current path
  const getActiveItem = () => {
    const currentPath = location.pathname;
    
    // Check if current path matches any main nav item
    const mainItem = navItems.find(item => item.path === currentPath);
    if (mainItem) return mainItem.name;
    
    // Check if current path matches any sub item
    for (const item of navItems) {
      if (item.subItems) {
        const subItem = item.subItems.find(sub => sub.path === currentPath);
        if (subItem) return item.name;
      }
    }
    
    // Default to Dashboard if no match
    return "Dashboard";
  };

  const activeItem = getActiveItem();

  const toggleDropdown = (itemName) => {
    if (openDropdown === itemName) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(itemName);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white lg:hidden"
        >
          {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-40 min-h-screen bg-white rounded-r-2xl shadow-xl flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        w-64
      `}>
        {/* Close button for mobile */}
        {isMobile && (
          <div className="flex justify-end p-4 lg:hidden">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <FaTimes className="text-gray-500" />
            </button>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.name;
              const isDropdownOpen = openDropdown === item.name;

              return (
                <li key={item.name}>
                  {item.dropdown ? (
                    // Dropdown items
                    <div
                      className={`relative flex items-center py-3 px-4 rounded-lg overflow-hidden group cursor-pointer ${
                        isActive ? "bg-blue-600" : ""
                      }`}
                      onClick={() => toggleDropdown(item.name)}
                    >
                      {/* Decorative gradient on hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-200 transition-all duration-500 ease-out ${
                          isActive
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-full group-hover:opacity-100 group-hover:translate-x-0"
                        }`}
                      ></div>

                      {/* Active state background */}
                      <div
                        className={`absolute inset-0 bg-blue-600 transition-all duration-300 ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      ></div>

                      {/* Icon */}
                      <Icon
                        className={`relative z-10 mr-3 transition-all duration-300 ${
                          isActive
                            ? "text-white transform scale-110"
                            : "text-blue-700 group-hover:text-blue-800 group-hover:transform group-hover:scale-110"
                        }`}
                      />

                      {/* Text */}
                      <span
                        className={`relative z-10 font-medium transition-all duration-300 flex-grow ${
                          isActive
                            ? "text-white"
                            : "text-gray-700 group-hover:text-blue-900"
                        }`}
                      >
                        {item.name}
                      </span>

                      {/* Dropdown icon */}
                      <span
                        className={`relative z-10 ml-2 transform transition-all duration-300 ${
                          isActive
                            ? "text-white"
                            : "text-gray-500 group-hover:text-blue-800"
                        } ${isDropdownOpen ? "rotate-0" : "-rotate-90"}`}
                      >
                        <FaChevronDown className="w-3 h-3" />
                      </span>
                    </div>
                  ) : (
                    // Regular link items (like Dashboard)
                    <Link 
                      to={item.path}
                      onClick={() => isMobile && setIsSidebarOpen(false)}
                    >
                      <div
                        className={`relative flex items-center py-3 px-4 rounded-lg overflow-hidden group cursor-pointer ${
                          isActive ? "bg-blue-600" : ""
                        }`}
                      >
                        {/* Decorative gradient on hover */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-200 transition-all duration-500 ease-out ${
                            isActive
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 -translate-x-full group-hover:opacity-100 group-hover:translate-x-0"
                          }`}
                        ></div>

                        {/* Active state background */}
                        <div
                          className={`absolute inset-0 bg-blue-600 transition-all duration-300 ${
                            isActive ? "opacity-100" : "opacity-0"
                          }`}
                        ></div>

                        {/* Icon */}
                        <Icon
                          className={`relative z-10 mr-3 transition-all duration-300 ${
                            isActive
                              ? "text-white transform scale-110"
                              : "text-blue-700 group-hover:text-blue-800 group-hover:transform group-hover:scale-110"
                          }`}
                        />

                        {/* Text */}
                        <span
                          className={`relative z-10 font-medium transition-all duration-300 flex-grow ${
                            isActive
                              ? "text-white"
                              : "text-gray-700 group-hover:text-blue-900"
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>
                    </Link>
                  )}

                  {/* Dropdown content */}
                  {item.dropdown && isDropdownOpen && (
                    <div className="mt-1 ml-6 pl-2 border-l-2 border-blue-200">
                      <ul className="space-y-2 py-2">
                        {item.subItems.map((subItem, index) => (
                          <li key={index}>
                            <Link
                              to={subItem.path}
                              className="flex items-center py-2 px-4 text-sm text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group/sub"
                              onClick={() => isMobile && setIsSidebarOpen(false)}
                            >
                              <FaCaretRight className="w-3 h-3 mr-2 text-blue-400 group-hover/sub:text-blue-600" />
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Profile Section */}
        <div className="p-4 border-t border-gray-200 mt-auto">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="font-bold text-white">A</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Admin User</h4>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;