
// import React, { useState, useRef, useEffect } from 'react';
// import { PiDotsNineBold } from 'react-icons/pi';
// import { 
//   FiBox, FiUsers, FiDollarSign, FiLayers, FiGrid, 
//   FiClock, FiTruck, FiFileText, FiPercent, FiDatabase, 
//   FiCreditCard, FiSmartphone, FiUserCheck, FiBarChart2, 
//   FiMap, FiMail, FiMessageCircle, FiAward, FiBook, FiShoppingBag,
//   FiHome, FiPackage, FiShoppingCart, FiCoffee, 
//   FiMapPin, FiServer, FiSettings, FiLink, FiHelpCircle, 
//   FiBookOpen, FiUser, FiFile, FiLogIn, FiShield, FiUserPlus,
//   FiLogOut, FiSettings as FiSettingsIcon, FiLayout
// } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
//   const [isSoftwareDropdownOpen, setIsSoftwareDropdownOpen] = useState(false);
//   const [isLogoDropdownOpen, setIsLogoDropdownOpen] = useState(false);
//   const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
//   const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const navigate = useNavigate();
  
//   // Refs to track dropdown elements
//   const productDropdownRef = useRef(null);
//   const productButtonRef = useRef(null);
//   const softwareDropdownRef = useRef(null);
//   const softwareButtonRef = useRef(null);
//   const logoDropdownRef = useRef(null);
//   const logoButtonRef = useRef(null);
//   const resourcesDropdownRef = useRef(null);
//   const resourcesButtonRef = useRef(null);
//   const userDropdownRef = useRef(null);
//   const userButtonRef = useRef(null);

//   // Timeout refs for delayed closing
//   const productTimeoutRef = useRef(null);
//   const softwareTimeoutRef = useRef(null);
//   const logoTimeoutRef = useRef(null);
//   const resourcesTimeoutRef = useRef(null);
//   const userTimeoutRef = useRef(null);

//   // Check if user is logged in on component mount
//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   // Check authentication status
//   const checkAuthStatus = () => {
//     const token = localStorage.getItem('authToken');
//     const user = localStorage.getItem('userData');
    
//     if (token && user) {
//       setIsLoggedIn(true);
//       setUserData(JSON.parse(user));
//     } else {
//       setIsLoggedIn(false);
//       setUserData(null);
//     }
//   };

//   // Login handler
//   const handleLogin = () => {
//     navigate('/login');
//     setIsMenuOpen(false);
//   };

//   // Signup handler
//   const handleSignup = () => {
//     navigate('/signup');
//     setIsMenuOpen(false);
//   };

//   // Logout handler
//   const handleLogout = () => {
//     // Clear authentication data
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userData');
//     setIsLoggedIn(false);
//     setUserData(null);
//     setIsUserDropdownOpen(false);
//     setIsMenuOpen(false);
//     navigate('/');
//   };

//   // User dropdown handlers
//   const handleUserMouseEnter = () => {
//     clearTimeout(userTimeoutRef.current);
//     setIsUserDropdownOpen(true);
//   };

//   const handleUserMouseLeave = () => {
//     userTimeoutRef.current = setTimeout(() => {
//       setIsUserDropdownOpen(false);
//     }, 200);
//   };

//   // Product dropdown handlers
//   const handleProductMouseEnter = () => {
//     clearTimeout(productTimeoutRef.current);
//     setIsProductDropdownOpen(true);
//     setIsSoftwareDropdownOpen(false);
//     setIsLogoDropdownOpen(false);
//     setIsResourcesDropdownOpen(false);
//     setIsUserDropdownOpen(false);
//   };

//   const handleProductMouseLeave = () => {
//     productTimeoutRef.current = setTimeout(() => {
//       setIsProductDropdownOpen(false);
//     }, 200);
//   };

//   // Software dropdown handlers
//   const handleSoftwareMouseEnter = () => {
//     clearTimeout(softwareTimeoutRef.current);
//     setIsSoftwareDropdownOpen(true);
//     setIsProductDropdownOpen(false);
//     setIsLogoDropdownOpen(false);
//     setIsResourcesDropdownOpen(false);
//     setIsUserDropdownOpen(false);
//   };

//   const handleSoftwareMouseLeave = () => {
//     softwareTimeoutRef.current = setTimeout(() => {
//       setIsSoftwareDropdownOpen(false);
//     }, 200);
//   };

//   // Logo dropdown handlers
//   const handleLogoMouseEnter = () => {
//     clearTimeout(logoTimeoutRef.current);
//     setIsLogoDropdownOpen(true);
//     setIsProductDropdownOpen(false);
//     setIsSoftwareDropdownOpen(false);
//     setIsResourcesDropdownOpen(false);
//     setIsUserDropdownOpen(false);
//   };

//   const handleLogoMouseLeave = () => {
//     logoTimeoutRef.current = setTimeout(() => {
//       setIsLogoDropdownOpen(false);
//     }, 200);
//   };

//   // Resources dropdown handlers
//   const handleResourcesMouseEnter = () => {
//     clearTimeout(resourcesTimeoutRef.current);
//     setIsResourcesDropdownOpen(true);
//     setIsProductDropdownOpen(false);
//     setIsSoftwareDropdownOpen(false);
//     setIsLogoDropdownOpen(false);
//     setIsUserDropdownOpen(false);
//   };

//   const handleResourcesMouseLeave = () => {
//     resourcesTimeoutRef.current = setTimeout(() => {
//       setIsResourcesDropdownOpen(false);
//     }, 200);
//   };

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         productDropdownRef.current && !productDropdownRef.current.contains(event.target) && 
//         productButtonRef.current && !productButtonRef.current.contains(event.target)
//       ) {
//         setIsProductDropdownOpen(false);
//       }
//       if (
//         softwareDropdownRef.current && !softwareDropdownRef.current.contains(event.target) && 
//         softwareButtonRef.current && !softwareButtonRef.current.contains(event.target)
//       ) {
//         setIsSoftwareDropdownOpen(false);
//       }
//       if (
//         logoDropdownRef.current && !logoDropdownRef.current.contains(event.target) && 
//         logoButtonRef.current && !logoButtonRef.current.contains(event.target)
//       ) {
//         setIsLogoDropdownOpen(false);
//       }
//       if (
//         resourcesDropdownRef.current && !resourcesDropdownRef.current.contains(event.target) && 
//         resourcesButtonRef.current && !resourcesButtonRef.current.contains(event.target)
//       ) {
//         setIsResourcesDropdownOpen(false);
//       }
//       if (
//         userDropdownRef.current && !userDropdownRef.current.contains(event.target) && 
//         userButtonRef.current && !userButtonRef.current.contains(event.target)
//       ) {
//         setIsUserDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   // Clear timeouts on component unmount
//   useEffect(() => {
//     return () => {
//       clearTimeout(productTimeoutRef.current);
//       clearTimeout(softwareTimeoutRef.current);
//       clearTimeout(logoTimeoutRef.current);
//       clearTimeout(resourcesTimeoutRef.current);
//       clearTimeout(userTimeoutRef.current);
//     };
//   }, []);

//   // User Dropdown Component
//   const UserDropdown = () => (
//     <div 
//       ref={userDropdownRef} 
//       className="absolute right-0 mt-7 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200"
//       onMouseEnter={handleUserMouseEnter}
//       onMouseLeave={handleUserMouseLeave}
//     >
//       <div className="p-2">
//         <div className="px-3 py-2 border-b border-gray-100">
//           <p className="text-sm font-medium text-gray-800">
//             {userData?.name || 'User Name'}
//           </p>
//           <p className="text-xs text-gray-500">
//             {userData?.email || 'user@example.com'}
//           </p>
//         </div>
        
//         <div className="space-y-1 mt-2">
//           <Link 
//             to="/dashboard" 
//             className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-2 px-3 rounded hover:bg-gray-50 transition-colors"
//             onClick={() => setIsUserDropdownOpen(false)}
//           >
//             <FiLayout className="mr-2 text-blue-500" /> 
//             Dashboard
//           </Link>
          
//           <Link 
//             to="/profile" 
//             className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-2 px-3 rounded hover:bg-gray-50 transition-colors"
//             onClick={() => setIsUserDropdownOpen(false)}
//           >
//             <FiUser className="mr-2 text-green-500" /> 
//             Profile
//           </Link>
          
//           <Link 
//             to="/settings" 
//             className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-2 px-3 rounded hover:bg-gray-50 transition-colors"
//             onClick={() => setIsUserDropdownOpen(false)}
//           >
//             <FiSettingsIcon className="mr-2 text-purple-500" /> 
//             Settings
//           </Link>
          
//           <button 
//             onClick={handleLogout}
//             className="flex items-center w-full text-left text-gray-700 hover:text-red-600 text-sm py-2 px-3 rounded hover:bg-gray-50 transition-colors"
//           >
//             <FiLogOut className="mr-2 text-red-500" /> 
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   const LogoDropdown = () => (
//     <div 
//       ref={logoDropdownRef} 
//       className="absolute right-0 mt-7 w-64 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200"
//       onMouseEnter={handleLogoMouseEnter}
//       onMouseLeave={handleLogoMouseLeave}
//     >
//       <div className="p-4">
//         <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase">Our Brands</h3>
//         <div className="grid grid-cols-2 mb-8 gap-4">
       
//           {/* Audit Filing */}
//           <a 
//             href="https://www.cloudsat.in" 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="flex flex-col items-center p-2 border border-gray-100 rounded hover:bg-gray-50 transition-colors cursor-pointer"
//           >
//             <img src="Cloudsat-logo.png" alt="Audit Filing Logo" className="h-8 object-contain mb-1" />
//             <span className="text-xs text-gray-600">cloudsat</span>
//           </a>
//           <a 
//             href="https://www.auditfiling.com" 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="flex flex-col items-center p-2 border border-gray-100 rounded hover:bg-gray-50 transition-colors cursor-pointer"
//           >
//             <img src="auditfiling-logo-bg.png" alt="Audit Filing Logo" className="h-8 object-contain mb-1" />
//             <span className="text-xs text-gray-600">Audit Filing</span>
//           </a>
//           <a 
//             href="https://www.tracolab.com" 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="flex flex-col items-center p-2 border border-gray-100 rounded hover:bg-gray-50 transition-colors cursor-pointer"
//           >
//             <img src="tracolab-1.png" alt="tracolab Logo" className="h-8 object-contain mb-1" />
//             <span className="text-xs text-gray-600">tracolab</span>
//           </a>
//           {/* coddor */}
//           <a 
//             href="https://www.coddor.com "
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="flex flex-col items-center p-2 border border-gray-100 rounded hover:bg-gray-50 transition-colors cursor-pointer"
//           >
//             <img src="coddor-logo.png" alt="coddor-Logo" className="h-8 object-contain mb-1" />
//             <span className="text-xs text-gray-600">coddor</span>
//           </a>
//           {/* sociomint */}
//           <a 
//             href="https://www.sociomint.com "
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="flex flex-col items-center p-2 border border-gray-100 rounded hover:bg-gray-50 transition-colors cursor-pointer"
//           >
//             <img src="sociomint_logo.png" alt="sociomint-Logo" className="h-8 object-contain mb-1" />
//             <span className="text-xs text-gray-600">sociomint</span>
//           </a>
          
//           <div className="flex flex-col items-center p-2 border border-gray-100 rounded hover:bg-gray-50 transition-colors cursor-pointer">
//             <img src="iq.png" alt="IQ Logo" className="h-8 object-contain mb-1" />
//             <span className="text-xs text-gray-600">IQ Note</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="header-container sticky top-0 z-50">
//       {/* Top banner section */}
//       <section className="bg-[#112c75] text-white py-2 text-center transition-all duration-300 hover:bg-[#0a1f5a]">
//         Call For Demo: +91-9910877219 | Email: info@csaap.com
//       </section>

//       {/* Navigation section */}
//       <section className="bg-white shadow-md">
//         <nav className="w-full px-4 py-4 flex items-center justify-between">
//           {/* Left section with logo */}
//           <div className="flex items-center">
//             <Link to="/">
//               <img
//                 src="/logo.png"
//                 alt="Company Logo"
//                 className="h-12 object-contain transition-transform duration-300 hover:scale-105 animate-jump"
//                 onError={(e) => {
//                   e.target.src =
//                     'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjYwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iNjAiIGZpbGw9IiMxMTJjNzUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSJ3aGl0ZSI+TE9HTyBJTUFHRTwvdGV4dD48L3N2Zz4=';
//                 }}
//               />
//             </Link>
//           </div>

//           {/* Desktop Navigation links - Centered */}
//           <div className="hidden md:flex items-center space-x-8 mx-4 flex-grow justify-center">
//             {/* Product dropdown */}
//             <div 
//               className="relative group"
//               ref={productDropdownRef}
//               onMouseEnter={handleProductMouseEnter}
//               onMouseLeave={handleProductMouseLeave}
//             >
//               <button 
//                 ref={productButtonRef}
//                 className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 flex items-center"
//                 onClick={() => {
//                   setIsProductDropdownOpen(!isProductDropdownOpen);
//                   setIsSoftwareDropdownOpen(false);
//                   setIsLogoDropdownOpen(false);
//                   setIsResourcesDropdownOpen(false);
//                   setIsUserDropdownOpen(false);
//                 }}
//               >
//                 Product
//                 <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>
              
//               {isProductDropdownOpen && (
//                 <div 
//                   className="absolute left-0 mt-8 w-[1050px] bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200"
//                   onMouseEnter={handleProductMouseEnter}
//                   onMouseLeave={handleProductMouseLeave}
//                 >
//                   <div className="flex flex-nowrap gap-8 p-6 min-w-max">
//                     {/* Solutions Column */}
//                     <div className="flex-shrink-0 w-56">
//                       <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase flex items-center">
//                         <FiBox className="mr-2" /> Solutions
//                       </h3>
//                       <div className="space-y-2">
//                         <Link to="/ERPSolutions" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiGrid className="mr-2 text-blue-500" /> ERP (Corporate Solutions)
//                         </Link>
//                         <Link to="/employee-manegement" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiUsers className="mr-2 text-blue-500" /> Employee Management
//                         </Link>
//                         <Link to="/accounting" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiDollarSign className="mr-2 text-blue-500" /> Accounting
//                         </Link>
//                         <Link to="/inventory" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiLayers className="mr-2 text-blue-500" /> Stock & Inventory
//                         </Link>
                        
//                         <Link to="/PayrollSoftware" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiClock className="mr-2 text-blue-500" /> Attendance & Payroll Software
//                         </Link>
//                         <Link to="/sales-automation" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiTruck className="mr-2 text-blue-500" /> Sale Force Automation
//                         </Link>
//                       </div>
//                     </div>

//                     {/* Software Column */}
//                     <div className="flex-shrink-0 w-56">
//                       <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase flex items-center">
//                         <FiFileText className="mr-2" /> Software
//                       </h3>
//                       <div className="space-y-2">
//                         <Link to="/billing" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiFileText className="mr-2 text-green-500" /> Billing Software
//                         </Link>
//                         <Link to="/gst-software" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiPercent className="mr-2 text-green-500" /> GST Software
//                         </Link>
//                         <Link to="/inventory-software" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiDatabase className="mr-2 text-green-500" /> Inventory Software
//                         </Link>
//                         <Link to="/invoice-software" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiCreditCard className="mr-2 text-green-500" /> Invoice Software
//                         </Link>
//                         <Link to="/accountingsoftware" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiDollarSign className="mr-2 text-green-500" /> Accounting Software
//                         </Link>
//                       </div>
//                     </div>

//                     {/* Mobile Apps Column */}
//                     <div className="flex-shrink-0 w-56">
//                       <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase flex items-center">
//                         <FiSmartphone className="mr-2" /> Mobile Apps
//                       </h3>
//                       <div className="space-y-2">
//                         <Link to="/e-owner-app" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiUserCheck className="mr-2 text-purple-500" /> e-Owner App
//                         </Link>
//                         <Link to="/e-retailer-app" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiShoppingBag className="mr-2 text-purple-500" /> e-Retailer App
//                         </Link>
//                         <Link to="/e-attendance-app" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiClock className="mr-2 text-purple-500" /> e-Attendance App
//                         </Link>
//                         <Link to="/e-reporting-app" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiBarChart2 className="mr-2 text-purple-500" /> e-Reporting App
//                         </Link>
//                       </div>
//                     </div>

//                     {/* Other Services Column */}
//                     <div className="flex-shrink-0 w-56">
//                       <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase flex items-center">
//                         <FiAward className="mr-2" /> Other Services
//                       </h3>
//                       <div className="space-y-2">
//                         <Link to="/gps-tracking" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiMap className="mr-2 text-orange-500" /> GPS Tracking
//                         </Link>
//                         <Link to="/email-marketing" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiMail className="mr-2 text-orange-500" /> Email Marketing
//                         </Link>
                     
//                         <Link to="/corporate-email" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiMail className="mr-2 text-orange-500" /> Corporate Email Account
//                         </Link>
//                         <Link to="/school-management" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiBook className="mr-2 text-orange-500" /> School Management System
//                         </Link>
//                         <Link to="/Transport-management" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiTruck className="mr-2 text-orange-500" /> Transport Management System
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Software dropdown */}
//             <div 
//               className="relative group"
//               ref={softwareDropdownRef}
//               onMouseEnter={handleSoftwareMouseEnter}
//               onMouseLeave={handleSoftwareMouseLeave}
//             >
//               <button 
//                 ref={softwareButtonRef}
//                 className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 flex items-center"
//                 onClick={() => {
//                   setIsSoftwareDropdownOpen(!isSoftwareDropdownOpen);
//                   setIsProductDropdownOpen(false);
//                   setIsLogoDropdownOpen(false);
//                   setIsResourcesDropdownOpen(false);
//                   setIsUserDropdownOpen(false);
//                 }}
//               >
//                 Software
//                 <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>
              
//               {isSoftwareDropdownOpen && (
//                 <div 
//                   className="absolute left-0 mt-8 w-[900px] bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200"
//                   onMouseEnter={handleSoftwareMouseEnter}
//                   onMouseLeave={handleSoftwareMouseLeave}
//                 >
//                   <div className="flex flex-nowrap gap-8 p-6 min-w-max">
//                     {/* Retail & Shop Software Column */}
//                     <div className="flex-shrink-0 w-64">
//                       <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase flex items-center">
//                         <FiShoppingBag className="mr-2" /> Retail & Shop Software
//                       </h3>
//                       <div className="space-y-2">
//                         <Link to="/retail-chain" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiHome className="mr-2 text-blue-500" /> Retail Chain Software
//                         </Link>
//                         <Link to="/pharmacy-software" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiPackage className="mr-2 text-blue-500" /> Pharmacy Shop Software
//                         </Link>
//                         <Link to="/grocery-software" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiShoppingCart className="mr-2 text-blue-500" /> Grocery Shop Software
//                         </Link>
//                         <Link to="/pos-software" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiCreditCard className="mr-2 text-blue-500" /> POS Software
//                         </Link>
//                         <Link to="/restaurant-software" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiCoffee className="mr-2 text-blue-500" /> Restaurant Software
//                         </Link>
//                         <Link to="/garment-software" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiShoppingBag className="mr-2 text-blue-500" /> Garment Software
//                         </Link>
//                       </div>
//                     </div>

//                     {/* Distribution Software Column */}
//                     <div className="flex-shrink-0 w-64">
//                       <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase flex items-center">
//                         <FiTruck className="mr-2" /> Distribution Software
//                       </h3>
//                       <div className="space-y-2">
//                         <Link to="/distribution-software" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiTruck className="mr-2 text-green-500" /> Distribution Software
//                         </Link>
//                         <Link to="/pharma-distribution" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiPackage className="mr-2 text-green-500" /> Pharma Distribution Software
//                         </Link>
//                         <Link to="/fmcg-distribution" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiBox className="mr-2 text-green-500" /> FMCG Distribution Software
//                         </Link>
//                         <Link to="/mandi-software" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiMapPin className="mr-2 text-green-500" /> Mandi Software
//                         </Link>
//                         <Link to="/wholesale-distribution" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiDatabase className="mr-2 text-green-500" /> Wholesale Distribution Software
//                         </Link>
//                         <Link to="/warehouse-management" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiDatabase className="mr-2 text-green-500" /> Warehouse Management Software
//                         </Link>
//                       </div>
//                     </div>

//                     {/* Industry & Manufacturing Software Column */}
//                     <div className="flex-shrink-0 w-64">
//                       <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase flex items-center">
//                         <FiLayers className="mr-2" /> Industry & Manufacturing
//                       </h3>
//                       <div className="space-y-2">
//                         <Link to="/automobile-software" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiTruck className="mr-2 text-purple-500" /> Automobile Software
//                         </Link>
//                         <Link to="/supply-chain" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiLink className="mr-2 text-purple-500" /> Supply Chain Management
//                         </Link>
//                         <Link to="/manufacturing-management" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiSettings className="mr-2 text-purple-500" /> Manufacturing Management Software
//                         </Link>
//                         <Link to="/erp-software" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiServer className="mr-2 text-purple-500" /> All in One ERP Software
//                         </Link>
//                         <Link to="/process-manufacturing" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiSettings className="mr-2 text-purple-500" /> Process Manufacturing Software
//                         </Link>
//                         <Link to="/food-beverage" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiCoffee className="mr-2 text-purple-500" /> Food & Beverage Industry Software
//                         </Link>
//                         <Link to="/assembling-industry" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiSettings className="mr-2 text-purple-500" /> Assembling Industry Software
//                         </Link>
//                         <Link to="/textile-industry" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                           <FiShoppingBag className="mr-2 text-purple-500" /> Textile Industry Software
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Resources dropdown */}
//             <div 
//               className="relative group"
//               ref={resourcesDropdownRef}
//               onMouseEnter={handleResourcesMouseEnter}
//               onMouseLeave={handleResourcesMouseLeave}
//             >
//               <button 
//                 ref={resourcesButtonRef}
//                 className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 flex items-center"
//                 onClick={() => {
//                   setIsResourcesDropdownOpen(!isResourcesDropdownOpen);
//                   setIsProductDropdownOpen(false);
//                   setIsSoftwareDropdownOpen(false);
//                   setIsLogoDropdownOpen(false);
//                   setIsUserDropdownOpen(false);
//                 }}
//               >
//                 Resources
//                 <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>
              
//               {isResourcesDropdownOpen && (
//                 <div 
//                   className="absolute left-0 mt-8 w-64 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200"
//                   onMouseEnter={handleResourcesMouseEnter}
//                   onMouseLeave={handleResourcesMouseLeave}
//                 >
//                   <div className="space-y-3 p-4">
//                     <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase flex items-center">
//                       <FiBookOpen className="mr-2" /> Resources
//                     </h3>
//                     <div className="space-y-2">
//                       <Link to="/resources/question-and-answer" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                         <FiHelpCircle className="mr-2 text-blue-500" /> Question and Answer
//                       </Link>
//                       <Link to="/resources/training-and-certification" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                         <FiBookOpen className="mr-2 text-blue-500" /> Training and Certification
//                       </Link>
//                       <Link to="/resources/user-and-deployment" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                         <FiUser className="mr-2 text-blue-500" /> User and Deployment
//                       </Link>
//                       <Link to="/resources/product-brochure" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
//                         <FiFile className="mr-2 text-blue-500" /> Product Brochure
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Other navigation links */}
//             <a 
//               href="https://domain.cloudsat.in" 
//               className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
//             >
//               Hosting
//             </a>

//             <Link to="/builder-erp" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300">
//               BuilderERP
//             </Link>
//             <Link to="/pricing" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300">
//               Pricing
//             </Link>
//             <Link to="/partners" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300">
//               Partners
//             </Link>
//           </div>

//           {/* Right section with PiDotsNineBold, cart, and buttons */}
//           <div className="flex items-center space-x-4 ml-auto">
//             {/* PiDotsNineBold icon with dropdown */}
//             <div className="relative">
//               <button 
//                 ref={logoButtonRef}
//                 onClick={() => {
//                   setIsLogoDropdownOpen(!isLogoDropdownOpen);
//                   setIsProductDropdownOpen(false);
//                   setIsSoftwareDropdownOpen(false);
//                   setIsResourcesDropdownOpen(false);
//                   setIsUserDropdownOpen(false);
//                 }}
//                 className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
//                 onMouseEnter={handleLogoMouseEnter}
//               >
//                 <PiDotsNineBold className="h-6 w-6 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-300" />
//               </button>
              
//               {isLogoDropdownOpen && <LogoDropdown />}
//             </div>

//             {/* Cart Icon - desktop */}
//             <Link to="/cartpage">  
//               <div className="hidden md:block relative group">
//                 <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors duration-300"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                     />
//                   </svg>
//                 </button>
//                 <span className="absolute -top-1 -right-1 bg-[#ff4081] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
//                   3
//                 </span>
//               </div>
//             </Link>

//             {/* Buttons - desktop */}
//             <div className="hidden md:flex items-center space-x-4">
//               <Link to="/bookdemo">
//                 <button className="bg-[#3f51b5] hover:bg-[#303f9f] text-white px-4 py-2 rounded-md transition-colors duration-300 transform hover:-translate-y-0.5 shadow-md">
//                   Book a Demo
//                 </button>
//               </Link>
              
//               {/* Conditional rendering based on login status */}
//               {!isLoggedIn ? (
//                 <>
//                   <button 
//                     onClick={handleLogin}
//                     className="bg-[#ff4081] hover:bg-[#f50057] text-white px-4 py-2 rounded-md transition-colors duration-300 transform hover:-translate-y-0.5 shadow-md"
//                   >
//                     Login
//                   </button>
//                   {/* <button 
//                     onClick={handleSignup}
//                     className="bg-[#4caf50] hover:bg-[#45a049] text-white px-4 py-2 rounded-md transition-colors duration-300 transform hover:-translate-y-0.5 shadow-md"
//                   >
//                     Sign Up
//                   </button> */}
//                 </>
//               ) : (
//                 /* User dropdown when logged in */
//                 <div className="relative">
//                   <button 
//                     ref={userButtonRef}
//                     onClick={() => {
//                       setIsUserDropdownOpen(!isUserDropdownOpen);
//                       setIsProductDropdownOpen(false);
//                       setIsSoftwareDropdownOpen(false);
//                       setIsLogoDropdownOpen(false);
//                       setIsResourcesDropdownOpen(false);
//                     }}
//                     className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 flex items-center"
//                     onMouseEnter={handleUserMouseEnter}
//                   >
//                     <FiUser className="h-6 w-6 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-300" />
//                   </button>
                  
//                   {isUserDropdownOpen && <UserDropdown />}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Mobile menu button with hamburger icon */}
//           <div className="md:hidden flex items-center space-x-4">
//             {/* Cart Icon for mobile */}
//             <div className="relative">
//               <button className="p-2 rounded-full hover:bg-gray-100">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6 text-gray-700"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                   />
//                 </svg>
//               </button>
//               <span className="absolute -top-1 -right-1 bg-[#ff4081] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                 3
//               </span>
//             </div>

//             {/* Hamburger menu button */}
//             <button
//               className="text-gray-700 focus:outline-none"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             </button>
//           </div>
//         </nav>

//         {/* Mobile menu dropdown */}
//         {isMenuOpen && (
//           <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 transition-all duration-300 ease-in-out">
//             <div className="flex flex-col space-y-4">
//               {/* Product dropdown for mobile */}
//               <div className="border-b border-gray-100 pb-2">
//                 <button 
//                   className="flex justify-between items-center w-full text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300"
//                   onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
//                 >
//                   <span>Product</span>
//                   <svg className={`w-4 h-4 transform transition-transform ${isProductDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
                
//                 {isProductDropdownOpen && (
//                   <div className="pl-4 mt-2 space-y-3">
//                     <h3 className="font-bold text-gray-800 text-sm uppercase flex items-center">
//                       <FiBox className="mr-2" /> Solutions
//                     </h3>
//                     <Link to="/ERPSolutions" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiGrid className="mr-2 text-blue-500" /> ERP (Corporate Solutions)
//                     </Link>
//                     <Link to="/employee-management" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiUsers className="mr-2 text-blue-500" /> Employee Management
//                     </Link>
//                     <Link to="/accounting" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiDollarSign className="mr-2 text-blue-500" /> Accounting
//                     </Link>
//                     <Link to="/inventory" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiLayers className="mr-2 text-blue-500" /> Stock & Inventory
//                     </Link>
                  
//                     <Link to="/PayrollSoftware" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiClock className="mr-2 text-blue-500" /> Attendance & Payroll Software
//                     </Link>
//                     <Link to="/sales-automation" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiTruck className="mr-2 text-blue-500" /> Sale Force Automation
//                     </Link>
                    
//                     <h3 className="font-bold text-gray-800 text-sm uppercase mt-3 flex items-center">
//                       <FiFileText className="mr-2" /> Software
//                     </h3>
//                     <Link to="/billing" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiFileText className="mr-2 text-green-500" /> Billing Software
//                     </Link>
//                     <Link to="/gst-software" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiPercent className="mr-2 text-green-500" /> GST Software
//                     </Link>
//                     <Link to="/inventory-software" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiDatabase className="mr-2 text-green-500" /> Inventory Software
//                     </Link>
//                     <Link to="/invoice-software" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiCreditCard className="mr-2 text-green-500" /> Invoice Software
//                     </Link>
//                     <Link to="/accountingsoftware" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiDollarSign className="mr-2 text-green-500" /> Accounting Software
//                     </Link>
                    
//                     <h3 className="font-bold text-gray-800 text-sm uppercase mt-3 flex items-center">
//                       <FiSmartphone className="mr-2" /> Mobile Apps
//                     </h3>
//                     <Link to="/e-owner-app" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiUserCheck className="mr-2 text-purple-500" /> e-Owner App
//                     </Link>
//                     <Link to="/e-retailer-app" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiShoppingBag className="mr-2 text-purple-500" /> e-Retailer App
//                     </Link>
//                     <Link to="/e-attendance-app" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiClock className="mr-2 text-purple-500" /> e-Attendance App
//                     </Link>
//                     <Link to="/e-reporting-app" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiBarChart2 className="mr-2 text-purple-500" /> e-Reporting App
//                     </Link>
                    
//                     <h3 className="font-bold text-gray-800 text-sm uppercase mt-3 flex items-center">
//                       <FiAward className="mr-2" /> Other Services
//                     </h3>
//                     <Link to="/gps-tracking" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiMap className="mr-2 text-orange-500" /> GPS Tracking
//                     </Link>
//                     <Link to="/email-marketing" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiMail className="mr-2 text-orange-500" /> Email Marketing
//                     </Link>
                   
//                     <Link to="/corporate-email" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiMail className="mr-2 text-orange-500" /> Corporate Email Account
//                     </Link>
//                     <Link to="/school-management" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiBook className="mr-2 text-orange-500" /> School Management System
//                     </Link>
//                         <Link to="/Transport-management" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiTruck className="mr-2 text-orange-500" /> Transport Management System
//                     </Link>
//                   </div>
//                 )}
//               </div>

//               {/* Software dropdown for mobile */}
//               <div className="border-b border-gray-100 pb-2">
//                 <button 
//                   className="flex justify-between items-center w-full text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300"
//                   onClick={() => setIsSoftwareDropdownOpen(!isSoftwareDropdownOpen)}
//                 >
//                   <span>Software</span>
//                   <svg className={`w-4 h-4 transform transition-transform ${isSoftwareDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
                
//                 {isSoftwareDropdownOpen && (
//                   <div className="pl-4 mt-2 space-y-3">
//                     <h3 className="font-bold text-gray-800 text-sm uppercase flex items-center">
//                       <FiShoppingBag className="mr-2" /> Retail & Shop Software
//                     </h3>
//                     <Link to="/retail-chain" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiHome className="mr-2 text-blue-500" /> Retail Chain Software
//                     </Link>
//                     <Link to="/pharmacy-software" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiPackage className="mr-2 text-blue-500" /> Pharmacy Shop Software
//                     </Link>
//                     <Link to="/grocery-software" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiShoppingCart className="mr-2 text-blue-500" /> Grocery Shop Software
//                     </Link>
//                     <Link to="/pos-software" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiCreditCard className="mr-2 text-blue-500" /> POS Software
//                     </Link>
//                     <Link to="/restaurant-software" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiCoffee className="mr-2 text-blue-500" /> Restaurant Software
//                     </Link>
//                     <Link to="/garment-software" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiShoppingBag className="mr-2 text-blue-500" /> Garment Software
//                     </Link>
                    
//                     <h3 className="font-bold text-gray-800 text-sm uppercase mt-3 flex items-center">
//                       <FiTruck className="mr-2" /> Distribution Software
//                     </h3>
//                     <Link to="/distribution-software" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiTruck className="mr-2 text-green-500" /> Distribution Software
//                     </Link>
//                     <Link to="/pharma-distribution" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiPackage className="mr-2 text-green-500" /> Pharma Distribution Software
//                     </Link>
//                     <Link to="/fmcg-distribution" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiBox className="mr-2 text-green-500" /> FMCG Distribution Software
//                     </Link>
//                     <Link to="/mandi-software" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiMapPin className="mr-2 text-green-500" /> Mandi Software
//                     </Link>
//                     <Link to="/wholesale-distribution" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiDatabase className="mr-2 text-green-500" /> Wholesale Distribution Software
//                     </Link>
//                     <Link to="/warehouse-management" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiDatabase className="mr-2 text-green-500" /> Warehouse Management Software
//                     </Link>
                    
//                     <h3 className="font-bold text-gray-800 text-sm uppercase mt-3 flex items-center">
//                       <FiLayers className="mr-2" /> Industry & Manufacturing
//                     </h3>
//                     <Link to="/automobile-software" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiTruck className="mr-2 text-purple-500" /> Automobile Software
//                     </Link>
//                     <Link to="/supply-chain" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiLink className="mr-2 text-purple-500" /> Supply Chain Management
//                     </Link>
//                     <Link to="/manufacturing-management" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiSettings className="mr-2 text-purple-500" /> Manufacturing Management Software
//                     </Link>
//                     <Link to="/erp-software" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiServer className="mr-2 text-purple-500" /> All in One ERP Software
//                     </Link>
//                     <Link to="/process-manufacturing" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiSettings className="mr-2 text-purple-500" /> Process Manufacturing Software
//                     </Link>
//                     <Link to="/food-beverage" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiCoffee className="mr-2 text-purple-500" /> Food & Beverage Industry Software
//                     </Link>
//                     <Link to="/assembling-industry" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiSettings className="mr-2 text-purple-500" /> Assembling Industry Software
//                     </Link>
//                     <Link to="/textile-industry" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiShoppingBag className="mr-2 text-purple-500" /> Textile Industry Software
//                     </Link>
//                   </div>
//                 )}
//               </div>

//               {/* Resources dropdown for mobile */}
//               <div className="border-b border-gray-100 pb-2">
//                 <button 
//                   className="flex justify-between items-center w-full text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300"
//                   onClick={() => setIsResourcesDropdownOpen(!isResourcesDropdownOpen)}
//                 >
//                   <span>Resources</span>
//                   <svg className={`w-4 h-4 transform transition-transform ${isResourcesDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
                
//                 {isResourcesDropdownOpen && (
//                   <div className="pl-4 mt-2 space-y-3">
//                     <Link to="/resources/question-and-answer" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiHelpCircle className="mr-2 text-blue-500" /> Question and Answer
//                     </Link>
//                     <Link to="/resources/training-and-certification" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiBookOpen className="mr-2 text-blue-500" /> Training and Certification
//                     </Link>
//                     <Link to="/resources/user-and-deployment" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiUser className="mr-2 text-blue-500" /> User and Deployment
//                     </Link>
//                     <Link to="/resources/product-brochure" className="flex items-center text-gray-700 hover:text-blue-600 text-sm py-1">
//                       <FiFile className="mr-2 text-blue-500" /> Product Brochure
//                     </Link>
//                   </div>
//                 )}
//               </div>

//               {/* Other mobile menu items */}
//               <Link to="/hosting" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300 border-b border-gray-100">
//                 Hosting
//               </Link>
//               <Link to="/bulk-sms" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300 border-b border-gray-100">
//                 Bulk SMS
//               </Link>
//               <Link to="/pricing" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300 border-b border-gray-100">
//                 Pricing
//               </Link>
//               <Link to="/partners" className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300 border-b border-gray-100">
//                 Partners
//               </Link>
              
//               {/* Logo dropdown in mobile menu */}
//               <div className="border-b border-gray-100 pb-2">
//                 <button 
//                   className="flex justify-between items-center w-full text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300"
//                   onClick={() => setIsLogoDropdownOpen(!isLogoDropdownOpen)}
//                 >
//                   <span>Our Brands</span>
//                   <svg className={`w-4 h-4 transform transition-transform ${isLogoDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
                
//                 {isLogoDropdownOpen && (
//                   <div className="pl-4 mt-2 grid grid-cols-2 gap-2">
//                     <div className="flex flex-col items-center p-2 border border-gray-100 rounded hover:bg-gray-50 transition-colors cursor-pointer">
//                       <img src="iq.png" alt="IQ Logo" className="h-6 object-contain mb-1" />
//                       <span className="text-xs text-gray-600">IQ Logo</span>
//                     </div>
//                     <div className="flex flex-col items-center p-2 border border-gray-100 rounded hover:bg-gray-50 transition-colors cursor-pointer">
//                       <img src="logo.png" alt="Company Logo" className="h-6 object-contain mb-1" />
//                       <span className="text-xs text-gray-600">Main Logo</span>
//                     </div>
//                     <div className="flex flex-col items-center p-2 border border-gray-100 rounded hover:bg-gray-50 transition-colors cursor-pointer">
//                       <img src="auditfiling-logo-bg.png" alt="Audit Filing Logo" className="h-6 object-contain mb-1" />
//                       <span className="text-xs text-gray-600">Audit Filing</span>
//                     </div>
//                     <div className="flex flex-col items-center p-2 border border-gray-100 rounded hover:bg-gray-50 transition-colors cursor-pointer">
//                       <img src="tracolab-logo.png" alt="Tracolab Logo" className="h-6 object-contain mb-1" />
//                       <span className="text-xs text-gray-600">Tracolab</span>
//                     </div>
//                     <div className="flex flex-col items-center p-2 border border-gray-100 rounded hover:bg-gray-50 transition-colors cursor-pointer col-span-2">
//                       <img src="sociomint_logo.png" alt="Sociomint Logo" className="h-6 object-contain mb-1" />
//                       <span className="text-xs text-gray-600">Sociomint</span>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             <div className="mt-4 space-y-3 pt-4 border-t border-gray-200">
//               <Link to="/bookdemo">
//                 <button className="w-full bg-[#3f51b5] hover:bg-[#303f9f] text-white px-4 py-2 rounded-md transition-colors duration-300">
//                   Book a Demo
//                 </button>
//               </Link>
              
//               {/* Conditional rendering for mobile */}
//               {!isLoggedIn ? (
//                 <>
//                   <button 
//                     onClick={handleLogin}
//                     className="w-full bg-[#ff4081] hover:bg-[#f50057] text-white px-4 py-2 rounded-md transition-colors duration-300"
//                   >
//                     Login
//                   </button>
//                   {/* <button 
//                     onClick={handleSignup}
//                     className="w-full bg-[#4caf50] hover:bg-[#45a049] text-white px-4 py-2 rounded-md transition-colors duration-300"
//                   >
//                     Sign Up
//                   </button> */}
//                 </>
//               ) : (
//                 <div className="space-y-2">
//                   <Link 
//                     to="/dashboard" 
//                     className="block w-full text-center bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-md transition-colors duration-300"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Dashboard
//                   </Link>
//                   <Link 
//                     to="/profile" 
//                     className="block w-full text-center bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-md transition-colors duration-300"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Profile
//                   </Link>
//                   <Link 
//                     to="/settings" 
//                     className="block w-full text-center bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-md transition-colors duration-300"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Settings
//                   </Link>
//                   <button 
//                     onClick={handleLogout}
//                     className="w-full bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-md transition-colors duration-300"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default Header;
import React, { useState, useRef, useEffect } from 'react';
import { PiDotsNineBold } from 'react-icons/pi';
import { 
  FiBox, FiUsers, FiDollarSign, FiLayers, FiGrid, 
  FiClock, FiTruck, FiFileText, FiPercent, FiDatabase, 
  FiCreditCard, FiSmartphone, FiUserCheck, FiBarChart2, 
  FiMap, FiMail, FiMessageCircle, FiAward, FiBook, FiShoppingBag,
  FiHome, FiPackage, FiShoppingCart, FiCoffee, 
  FiMapPin, FiServer, FiSettings, FiLink, FiHelpCircle, 
  FiBookOpen, FiUser, FiFile, FiLogIn, FiShield, FiUserPlus,
  FiLogOut, FiSettings as FiSettingsIcon, FiLayout
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isSoftwareDropdownOpen, setIsSoftwareDropdownOpen] = useState(false);
  const [isLogoDropdownOpen, setIsLogoDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  
  // Refs to track dropdown elements
  const productDropdownRef = useRef(null);
  const productButtonRef = useRef(null);
  const softwareDropdownRef = useRef(null);
  const softwareButtonRef = useRef(null);
  const logoDropdownRef = useRef(null);
  const logoButtonRef = useRef(null);
  const resourcesDropdownRef = useRef(null);
  const resourcesButtonRef = useRef(null);
  const userDropdownRef = useRef(null);
  const userButtonRef = useRef(null);

  // Timeout refs for delayed closing
  const productTimeoutRef = useRef(null);
  const softwareTimeoutRef = useRef(null);
  const logoTimeoutRef = useRef(null);
  const resourcesTimeoutRef = useRef(null);
  const userTimeoutRef = useRef(null);

  // Scroll to top function
  const scrollToTop = () => {
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } catch (error) {
      // Fallback for older browsers
      window.scrollTo(0, 0);
    }
  };

  // Navigation handler with scroll
  const handleNavClick = (path, closeMenus = true) => {
    scrollToTop();
    if (closeMenus) {
      setIsMenuOpen(false);
      setIsProductDropdownOpen(false);
      setIsSoftwareDropdownOpen(false);
      setIsLogoDropdownOpen(false);
      setIsResourcesDropdownOpen(false);
      setIsUserDropdownOpen(false);
    }
    navigate(path);
  };

  // Check if user is logged in on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Check authentication status
  const checkAuthStatus = () => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('userData');
    
    if (token && user) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(user));
    } else {
      setIsLoggedIn(false);
      setUserData(null);
    }
  };

  // Login handler
  const handleLogin = () => {
    scrollToTop();
    navigate('/login');
    setIsMenuOpen(false);
  };

  // Signup handler
  const handleSignup = () => {
    scrollToTop();
    navigate('/signup');
    setIsMenuOpen(false);
  };

  // Logout handler
  const handleLogout = () => {
    scrollToTop();
    // Clear authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUserData(null);
    setIsUserDropdownOpen(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  // User dropdown handlers
  const handleUserMouseEnter = () => {
    clearTimeout(userTimeoutRef.current);
    setIsUserDropdownOpen(true);
  };

  const handleUserMouseLeave = () => {
    userTimeoutRef.current = setTimeout(() => {
      setIsUserDropdownOpen(false);
    }, 200);
  };

  // Product dropdown handlers
  const handleProductMouseEnter = () => {
    clearTimeout(productTimeoutRef.current);
    setIsProductDropdownOpen(true);
    setIsSoftwareDropdownOpen(false);
    setIsLogoDropdownOpen(false);
    setIsResourcesDropdownOpen(false);
    setIsUserDropdownOpen(false);
  };

  const handleProductMouseLeave = () => {
    productTimeoutRef.current = setTimeout(() => {
      setIsProductDropdownOpen(false);
    }, 200);
  };

  // Software dropdown handlers
  const handleSoftwareMouseEnter = () => {
    clearTimeout(softwareTimeoutRef.current);
    setIsSoftwareDropdownOpen(true);
    setIsProductDropdownOpen(false);
    setIsLogoDropdownOpen(false);
    setIsResourcesDropdownOpen(false);
    setIsUserDropdownOpen(false);
  };

  const handleSoftwareMouseLeave = () => {
    softwareTimeoutRef.current = setTimeout(() => {
      setIsSoftwareDropdownOpen(false);
    }, 200);
  };

  // Logo dropdown handlers
  const handleLogoMouseEnter = () => {
    clearTimeout(logoTimeoutRef.current);
    setIsLogoDropdownOpen(true);
    setIsProductDropdownOpen(false);
    setIsSoftwareDropdownOpen(false);
    setIsResourcesDropdownOpen(false);
    setIsUserDropdownOpen(false);
  };

  const handleLogoMouseLeave = () => {
    logoTimeoutRef.current = setTimeout(() => {
      setIsLogoDropdownOpen(false);
    }, 200);
  };

  // Resources dropdown handlers
  const handleResourcesMouseEnter = () => {
    clearTimeout(resourcesTimeoutRef.current);
    setIsResourcesDropdownOpen(true);
    setIsProductDropdownOpen(false);
    setIsSoftwareDropdownOpen(false);
    setIsLogoDropdownOpen(false);
    setIsUserDropdownOpen(false);
  };

  const handleResourcesMouseLeave = () => {
    resourcesTimeoutRef.current = setTimeout(() => {
      setIsResourcesDropdownOpen(false);
    }, 200);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        productDropdownRef.current && !productDropdownRef.current.contains(event.target) && 
        productButtonRef.current && !productButtonRef.current.contains(event.target)
      ) {
        setIsProductDropdownOpen(false);
      }
      if (
        softwareDropdownRef.current && !softwareDropdownRef.current.contains(event.target) && 
        softwareButtonRef.current && !softwareButtonRef.current.contains(event.target)
      ) {
        setIsSoftwareDropdownOpen(false);
      }
      if (
        logoDropdownRef.current && !logoDropdownRef.current.contains(event.target) && 
        logoButtonRef.current && !logoButtonRef.current.contains(event.target)
      ) {
        setIsLogoDropdownOpen(false);
      }
      if (
        resourcesDropdownRef.current && !resourcesDropdownRef.current.contains(event.target) && 
        resourcesButtonRef.current && !resourcesButtonRef.current.contains(event.target)
      ) {
        setIsResourcesDropdownOpen(false);
      }
      if (
        userDropdownRef.current && !userDropdownRef.current.contains(event.target) && 
        userButtonRef.current && !userButtonRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Clear timeouts on component unmount
  useEffect(() => {
    return () => {
      clearTimeout(productTimeoutRef.current);
      clearTimeout(softwareTimeoutRef.current);
      clearTimeout(logoTimeoutRef.current);
      clearTimeout(resourcesTimeoutRef.current);
      clearTimeout(userTimeoutRef.current);
    };
  }, []);

  // User Dropdown Component
  const UserDropdown = () => (
    <div 
      ref={userDropdownRef} 
      className="absolute right-0 mt-7 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200"
      onMouseEnter={handleUserMouseEnter}
      onMouseLeave={handleUserMouseLeave}
    >
      <div className="p-2">
        <div className="px-3 py-2 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-800">
            {userData?.name || 'User Name'}
          </p>
          <p className="text-xs text-gray-500">
            {userData?.email || 'user@example.com'}
          </p>
        </div>
        
        <div className="space-y-1 mt-2">
          <button 
            onClick={() => handleNavClick('/dashboard')}
            className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-2 px-3 rounded hover:bg-gray-50 transition-colors"
          >
            <FiLayout className="mr-2 text-blue-500" /> 
            Dashboard
          </button>
          
          <button 
            onClick={() => handleNavClick('/profile')}
            className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-2 px-3 rounded hover:bg-gray-50 transition-colors"
          >
            <FiUser className="mr-2 text-green-500" /> 
            Profile
          </button>
          
          <button 
            onClick={() => handleNavClick('/settings')}
            className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-2 px-3 rounded hover:bg-gray-50 transition-colors"
          >
            <FiSettingsIcon className="mr-2 text-purple-500" /> 
            Settings
          </button>
          
          <button 
            onClick={handleLogout}
            className="flex items-center w-full text-left text-gray-700 hover:text-red-600 text-sm py-2 px-3 rounded hover:bg-gray-50 transition-colors"
          >
            <FiLogOut className="mr-2 text-red-500" /> 
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  const LogoDropdown = () => (
    <div 
      ref={logoDropdownRef} 
      className="absolute right-0 mt-7 w-64 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200"
      onMouseEnter={handleLogoMouseEnter}
      onMouseLeave={handleLogoMouseLeave}
    >
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase">Our Brands</h3>
        <div className="grid grid-cols-2 mb-8 gap-4">
       
          {/* Audit Filing */}
          <a 
            href="https://www.cloudsat.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center p-2 border border-gray-100 rounded hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={scrollToTop}
          >
            <img src="Cloudsat-logo.png" alt="Audit Filing Logo" className="h-8 object-contain mb-1" />
            <span className="text-xs text-gray-600">cloudsat</span>
          </a>
          <a 
            href="https://www.auditfiling.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center p-2 border border-gray-100 rounded hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={scrollToTop}
          >
            <img src="auditfiling-logo-bg.png" alt="Audit Filing Logo" className="h-8 object-contain mb-1" />
            <span className="text-xs text-gray-600">Audit Filing</span>
          </a>
          <a 
            href="https://www.tracolab.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center p-2 border border-gray-100 rounded hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={scrollToTop}
          >
            <img src="tracolab-1.png" alt="tracolab Logo" className="h-8 object-contain mb-1" />
            <span className="text-xs text-gray-600">tracolab</span>
          </a>
          {/* coddor */}
          <a 
            href="https://www.coddor.com "
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center p-2 border border-gray-100 rounded hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={scrollToTop}
          >
            <img src="coddor-logo.png" alt="coddor-Logo" className="h-8 object-contain mb-1" />
            <span className="text-xs text-gray-600">coddor</span>
          </a>
          {/* sociomint */}
          <a 
            href="https://www.sociomint.com "
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center p-2 border border-gray-100 rounded hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={scrollToTop}
          >
            <img src="sociomint_logo.png" alt="sociomint-Logo" className="h-8 object-contain mb-1" />
            <span className="text-xs text-gray-600">sociomint</span>
          </a>
          
          <div className="flex flex-col items-center p-2 border border-gray-100 rounded hover:bg-gray-50 transition-colors cursor-pointer">
            <img src="iq.png" alt="IQ Logo" className="h-8 object-contain mb-1" />
            <span className="text-xs text-gray-600">IQ Note</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="header-container sticky top-0 z-50">
      {/* Top banner section */}
      <section className="bg-[#112c75] text-white py-2 text-center transition-all duration-300 hover:bg-[#0a1f5a]">
        Call For Demo: +91-9910877219 | Email: info@csaap.com
      </section>

      {/* Navigation section */}
      <section className="bg-white shadow-md">
        <nav className="w-full px-4 py-4 flex items-center justify-between">
          {/* Left section with logo */}
          <div className="flex items-center">
            <button 
              onClick={() => handleNavClick('/', false)}
              className="focus:outline-none"
            >
              <img
                src="/logo.png"
                alt="Company Logo"
                className="h-12 object-contain transition-transform duration-300 hover:scale-105 animate-jump"
                onError={(e) => {
                  e.target.src =
                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjYwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iNjAiIGZpbGw9IiMxMTJjNzUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSJ3aGl0ZSI+TE9HTyBJTUFHRTwvdGV4dD48L3N2Zz4=';
                }}
              />
            </button>
          </div>

          {/* Desktop Navigation links - Centered */}
          <div className="hidden md:flex items-center space-x-8 mx-4 flex-grow justify-center">
            {/* Product dropdown */}
            <div 
              className="relative group"
              ref={productDropdownRef}
              onMouseEnter={handleProductMouseEnter}
              onMouseLeave={handleProductMouseLeave}
            >
              <button 
                ref={productButtonRef}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 flex items-center"
                onClick={() => {
                  setIsProductDropdownOpen(!isProductDropdownOpen);
                  setIsSoftwareDropdownOpen(false);
                  setIsLogoDropdownOpen(false);
                  setIsResourcesDropdownOpen(false);
                  setIsUserDropdownOpen(false);
                }}
              >
                Product
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isProductDropdownOpen && (
                <div 
                  className="absolute left-0 mt-8 w-[1050px] bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200"
                  onMouseEnter={handleProductMouseEnter}
                  onMouseLeave={handleProductMouseLeave}
                >
                  <div className="flex flex-nowrap gap-8 p-6 min-w-max">
                    {/* Solutions Column */}
                    <div className="flex-shrink-0 w-56">
                      <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase flex items-center">
                        <FiBox className="mr-2" /> Solutions
                      </h3>
                      <div className="space-y-2">
                        <button onClick={() => handleNavClick('/ERPSolutions')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiGrid className="mr-2 text-blue-500" /> ERP (Corporate Solutions)
                        </button>
                        <button onClick={() => handleNavClick('/employee-manegement')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiUsers className="mr-2 text-blue-500" /> Employee Management
                        </button>
                        <button onClick={() => handleNavClick('/accounting')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiDollarSign className="mr-2 text-blue-500" /> Accounting
                        </button>
                        <button onClick={() => handleNavClick('/inventory')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiLayers className="mr-2 text-blue-500" /> Stock & Inventory
                        </button>
                        
                        <button onClick={() => handleNavClick('/PayrollSoftware')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiClock className="mr-2 text-blue-500" /> Attendance & Payroll Software
                        </button>
                        <button onClick={() => handleNavClick('/sales-automation')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiTruck className="mr-2 text-blue-500" /> Sale Force Automation
                        </button>
                      </div>
                    </div>

                    {/* Software Column */}
                    <div className="flex-shrink-0 w-56">
                      <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase flex items-center">
                        <FiFileText className="mr-2" /> Software
                      </h3>
                      <div className="space-y-2">
                        <button onClick={() => handleNavClick('/billing')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiFileText className="mr-2 text-green-500" /> Billing Software
                        </button>
                        <button onClick={() => handleNavClick('/gst-software')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiPercent className="mr-2 text-green-500" /> GST Software
                        </button>
                        <button onClick={() => handleNavClick('/inventory-software')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiDatabase className="mr-2 text-green-500" /> Inventory Software
                        </button>
                        <button onClick={() => handleNavClick('/invoice-software')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiCreditCard className="mr-2 text-green-500" /> Invoice Software
                        </button>
                        <button onClick={() => handleNavClick('/accountingsoftware')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiDollarSign className="mr-2 text-green-500" /> Accounting Software
                        </button>
                      </div>
                    </div>

                    {/* Mobile Apps Column */}
                    <div className="flex-shrink-0 w-56">
                      <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase flex items-center">
                        <FiSmartphone className="mr-2" /> Mobile Apps
                      </h3>
                      <div className="space-y-2">
                        <button onClick={() => handleNavClick('/e-owner-app')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiUserCheck className="mr-2 text-purple-500" /> e-Owner App
                        </button>
                        <button onClick={() => handleNavClick('/e-retailer-app')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiShoppingBag className="mr-2 text-purple-500" /> e-Retailer App
                        </button>
                        <button onClick={() => handleNavClick('/e-attendance-app')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiClock className="mr-2 text-purple-500" /> e-Attendance App
                        </button>
                        <button onClick={() => handleNavClick('/e-reporting-app')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiBarChart2 className="mr-2 text-purple-500" /> e-Reporting App
                        </button>
                      </div>
                    </div>

                    {/* Other Services Column */}
                    <div className="flex-shrink-0 w-56">
                      <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase flex items-center">
                        <FiAward className="mr-2" /> Other Services
                      </h3>
                      <div className="space-y-2">
                        <button onClick={() => handleNavClick('/gps-tracking')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiMap className="mr-2 text-orange-500" /> GPS Tracking
                        </button>
                        <button onClick={() => handleNavClick('/email-marketing')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiMail className="mr-2 text-orange-500" /> Email Marketing
                        </button>
                     
                        <button onClick={() => handleNavClick('/corporate-email')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiMail className="mr-2 text-orange-500" /> Corporate Email Account
                        </button>
                        <button onClick={() => handleNavClick('/school-management')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiBook className="mr-2 text-orange-500" /> School Management System
                        </button>
                        <button onClick={() => handleNavClick('/Transport-management')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiTruck className="mr-2 text-orange-500" /> Transport Management System
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Software dropdown */}
            <div 
              className="relative group"
              ref={softwareDropdownRef}
              onMouseEnter={handleSoftwareMouseEnter}
              onMouseLeave={handleSoftwareMouseLeave}
            >
              <button 
                ref={softwareButtonRef}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 flex items-center"
                onClick={() => {
                  setIsSoftwareDropdownOpen(!isSoftwareDropdownOpen);
                  setIsProductDropdownOpen(false);
                  setIsLogoDropdownOpen(false);
                  setIsResourcesDropdownOpen(false);
                  setIsUserDropdownOpen(false);
                }}
              >
                Software
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isSoftwareDropdownOpen && (
                <div 
                  className="absolute left-0 mt-8 w-[900px] bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200"
                  onMouseEnter={handleSoftwareMouseEnter}
                  onMouseLeave={handleSoftwareMouseLeave}
                >
                  <div className="flex flex-nowrap gap-8 p-6 min-w-max">
                    {/* Retail & Shop Software Column */}
                    <div className="flex-shrink-0 w-64">
                      <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase flex items-center">
                        <FiShoppingBag className="mr-2" /> Retail & Shop Software
                      </h3>
                      <div className="space-y-2">
                        <button onClick={() => handleNavClick('/retail-chain')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiHome className="mr-2 text-blue-500" /> Retail Chain Software
                        </button>
                        <button onClick={() => handleNavClick('/pharmacy-software')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiPackage className="mr-2 text-blue-500" /> Pharmacy Shop Software
                        </button>
                        <button onClick={() => handleNavClick('/grocery-software')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiShoppingCart className="mr-2 text-blue-500" /> Grocery Shop Software
                        </button>
                        <button onClick={() => handleNavClick('/pos-software')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiCreditCard className="mr-2 text-blue-500" /> POS Software
                        </button>
                        <button onClick={() => handleNavClick('/restaurant-software')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiCoffee className="mr-2 text-blue-500" /> Restaurant Software
                        </button>
                        <button onClick={() => handleNavClick('/garment-software')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiShoppingBag className="mr-2 text-blue-500" /> Garment Software
                        </button>
                      </div>
                    </div>

                    {/* Distribution Software Column */}
                    <div className="flex-shrink-0 w-64">
                      <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase flex items-center">
                        <FiTruck className="mr-2" /> Distribution Software
                      </h3>
                      <div className="space-y-2">
                        <button onClick={() => handleNavClick('/distribution-software')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiTruck className="mr-2 text-green-500" /> Distribution Software
                        </button>
                        <button onClick={() => handleNavClick('/pharma-distribution')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiPackage className="mr-2 text-green-500" /> Pharma Distribution Software
                        </button>
                        <button onClick={() => handleNavClick('/fmcg-distribution')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiBox className="mr-2 text-green-500" /> FMCG Distribution Software
                        </button>
                        <button onClick={() => handleNavClick('/mandi-software')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiMapPin className="mr-2 text-green-500" /> Mandi Software
                        </button>
                        <button onClick={() => handleNavClick('/wholesale-distribution')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiDatabase className="mr-2 text-green-500" /> Wholesale Distribution Software
                        </button>
                        <button onClick={() => handleNavClick('/warehouse-management')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiDatabase className="mr-2 text-green-500" /> Warehouse Management Software
                        </button>
                      </div>
                    </div>

                    {/* Industry & Manufacturing Software Column */}
                    <div className="flex-shrink-0 w-64">
                      <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase flex items-center">
                        <FiLayers className="mr-2" /> Industry & Manufacturing
                      </h3>
                      <div className="space-y-2">
                        <button onClick={() => handleNavClick('/automobile-software')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiTruck className="mr-2 text-purple-500" /> Automobile Software
                        </button>
                        <button onClick={() => handleNavClick('/supply-chain')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiLink className="mr-2 text-purple-500" /> Supply Chain Management
                        </button>
                        <button onClick={() => handleNavClick('/manufacturing-management')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiSettings className="mr-2 text-purple-500" /> Manufacturing Management Software
                        </button>
                        <button onClick={() => handleNavClick('/erp-software')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiServer className="mr-2 text-purple-500" /> All in One ERP Software
                        </button>
                        <button onClick={() => handleNavClick('/process-manufacturing')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiSettings className="mr-2 text-purple-500" /> Process Manufacturing Software
                        </button>
                        <button onClick={() => handleNavClick('/food-beverage')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiCoffee className="mr-2 text-purple-500" /> Food & Beverage Industry Software
                        </button>
                        <button onClick={() => handleNavClick('/assembling-industry')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiSettings className="mr-2 text-purple-500" /> Assembling Industry Software
                        </button>
                        <button onClick={() => handleNavClick('/textile-industry')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                          <FiShoppingBag className="mr-2 text-purple-500" /> Textile Industry Software
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Resources dropdown */}
            <div 
              className="relative group"
              ref={resourcesDropdownRef}
              onMouseEnter={handleResourcesMouseEnter}
              onMouseLeave={handleResourcesMouseLeave}
            >
              <button 
                ref={resourcesButtonRef}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 flex items-center"
                onClick={() => {
                  setIsResourcesDropdownOpen(!isResourcesDropdownOpen);
                  setIsProductDropdownOpen(false);
                  setIsSoftwareDropdownOpen(false);
                  setIsLogoDropdownOpen(false);
                  setIsUserDropdownOpen(false);
                }}
              >
                Resources
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isResourcesDropdownOpen && (
                <div 
                  className="absolute left-0 mt-8 w-64 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200"
                  onMouseEnter={handleResourcesMouseEnter}
                  onMouseLeave={handleResourcesMouseLeave}
                >
                  <div className="space-y-3 p-4">
                    <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase flex items-center">
                      <FiBookOpen className="mr-2" /> Resources
                    </h3>
                    <div className="space-y-2">
                      <button onClick={() => handleNavClick('/resources/question-and-answer')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                        <FiHelpCircle className="mr-2 text-blue-500" /> Question and Answer
                      </button>
                      <button onClick={() => handleNavClick('/resources/training-and-certification')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                        <FiBookOpen className="mr-2 text-blue-500" /> Training and Certification
                      </button>
                      <button onClick={() => handleNavClick('/resources/user-and-deployment')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                        <FiUser className="mr-2 text-blue-500" /> User and Deployment
                      </button>
                      <button onClick={() => handleNavClick('/resources/product-brochure')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1 px-2 rounded hover:bg-gray-50 transition-colors">
                        <FiFile className="mr-2 text-blue-500" /> Product Brochure
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Other navigation links */}
            <a 
              href="https://domain.cloudsat.in" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
              onClick={scrollToTop}
            >
              Hosting
            </a>

            <button 
              onClick={() => handleNavClick('/builder-erp')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
            >
              BuilderERP
            </button>
            <button 
              onClick={() => handleNavClick('/pricing')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
            >
              Pricing
            </button>
            <button 
              onClick={() => handleNavClick('/partners')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
            >
              Partners
            </button>
          </div>

          {/* Right section with PiDotsNineBold, cart, and buttons */}
          <div className="flex items-center space-x-4 ml-auto">
            {/* PiDotsNineBold icon with dropdown */}
            <div className="relative">
              <button 
                ref={logoButtonRef}
                onClick={() => {
                  setIsLogoDropdownOpen(!isLogoDropdownOpen);
                  setIsProductDropdownOpen(false);
                  setIsSoftwareDropdownOpen(false);
                  setIsResourcesDropdownOpen(false);
                  setIsUserDropdownOpen(false);
                }}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
                onMouseEnter={handleLogoMouseEnter}
              >
                <PiDotsNineBold className="h-6 w-6 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-300" />
              </button>
              
              {isLogoDropdownOpen && <LogoDropdown />}
            </div>

            {/* Cart Icon - desktop */}
            <button onClick={() => handleNavClick('/cartpage')}>  
              <div className="hidden md:block relative group">
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </button>
                <span className="absolute -top-1 -right-1 bg-[#ff4081] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  3
                </span>
              </div>
            </button>

            {/* Buttons - desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => handleNavClick('/bookdemo')}
                className="bg-[#3f51b5] hover:bg-[#303f9f] text-white px-4 py-2 rounded-md transition-colors duration-300 transform hover:-translate-y-0.5 shadow-md"
              >
                Book a Demo
              </button>
              
              {/* Conditional rendering based on login status */}
              {!isLoggedIn ? (
                <>
                  <button 
                    onClick={handleLogin}
                    className="bg-[#ff4081] hover:bg-[#f50057] text-white px-4 py-2 rounded-md transition-colors duration-300 transform hover:-translate-y-0.5 shadow-md"
                  >
                    Login
                  </button>
                </>
              ) : (
                /* User dropdown when logged in */
                <div className="relative">
                  <button 
                    ref={userButtonRef}
                    onClick={() => {
                      setIsUserDropdownOpen(!isUserDropdownOpen);
                      setIsProductDropdownOpen(false);
                      setIsSoftwareDropdownOpen(false);
                      setIsLogoDropdownOpen(false);
                      setIsResourcesDropdownOpen(false);
                    }}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 flex items-center"
                    onMouseEnter={handleUserMouseEnter}
                  >
                    <FiUser className="h-6 w-6 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-300" />
                  </button>
                  
                  {isUserDropdownOpen && <UserDropdown />}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button with hamburger icon */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Cart Icon for mobile */}
            <div className="relative">
              <button 
                onClick={() => handleNavClick('/cartpage')}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
              <span className="absolute -top-1 -right-1 bg-[#ff4081] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </div>

            {/* Hamburger menu button */}
            <button
              className="text-gray-700 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 transition-all duration-300 ease-in-out">
            <div className="flex flex-col space-y-4">
              {/* Product dropdown for mobile */}
              <div className="border-b border-gray-100 pb-2">
                <button 
                  className="flex justify-between items-center w-full text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300"
                  onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                >
                  <span>Product</span>
                  <svg className={`w-4 h-4 transform transition-transform ${isProductDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isProductDropdownOpen && (
                  <div className="pl-4 mt-2 space-y-3">
                    <h3 className="font-bold text-gray-800 text-sm uppercase flex items-center">
                      <FiBox className="mr-2" /> Solutions
                    </h3>
                    <button onClick={() => handleNavClick('/ERPSolutions')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiGrid className="mr-2 text-blue-500" /> ERP (Corporate Solutions)
                    </button>
                    <button onClick={() => handleNavClick('/employee-management')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiUsers className="mr-2 text-blue-500" /> Employee Management
                    </button>
                    <button onClick={() => handleNavClick('/accounting')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiDollarSign className="mr-2 text-blue-500" /> Accounting
                    </button>
                    <button onClick={() => handleNavClick('/inventory')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiLayers className="mr-2 text-blue-500" /> Stock & Inventory
                    </button>
                  
                    <button onClick={() => handleNavClick('/PayrollSoftware')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiClock className="mr-2 text-blue-500" /> Attendance & Payroll Software
                    </button>
                    <button onClick={() => handleNavClick('/sales-automation')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiTruck className="mr-2 text-blue-500" /> Sale Force Automation
                    </button>
                    
                    <h3 className="font-bold text-gray-800 text-sm uppercase mt-3 flex items-center">
                      <FiFileText className="mr-2" /> Software
                    </h3>
                    <button onClick={() => handleNavClick('/billing')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiFileText className="mr-2 text-green-500" /> Billing Software
                    </button>
                    <button onClick={() => handleNavClick('/gst-software')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiPercent className="mr-2 text-green-500" /> GST Software
                    </button>
                    <button onClick={() => handleNavClick('/inventory-software')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiDatabase className="mr-2 text-green-500" /> Inventory Software
                    </button>
                    <button onClick={() => handleNavClick('/invoice-software')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiCreditCard className="mr-2 text-green-500" /> Invoice Software
                    </button>
                    <button onClick={() => handleNavClick('/accountingsoftware')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiDollarSign className="mr-2 text-green-500" /> Accounting Software
                    </button>
                    
                    <h3 className="font-bold text-gray-800 text-sm uppercase mt-3 flex items-center">
                      <FiSmartphone className="mr-2" /> Mobile Apps
                    </h3>
                    <button onClick={() => handleNavClick('/e-owner-app')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiUserCheck className="mr-2 text-purple-500" /> e-Owner App
                    </button>
                    <button onClick={() => handleNavClick('/e-retailer-app')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiShoppingBag className="mr-2 text-purple-500" /> e-Retailer App
                    </button>
                    <button onClick={() => handleNavClick('/e-attendance-app')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiClock className="mr-2 text-purple-500" /> e-Attendance App
                    </button>
                    <button onClick={() => handleNavClick('/e-reporting-app')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiBarChart2 className="mr-2 text-purple-500" /> e-Reporting App
                    </button>
                    
                    <h3 className="font-bold text-gray-800 text-sm uppercase mt-3 flex items-center">
                      <FiAward className="mr-2" /> Other Services
                    </h3>
                    <button onClick={() => handleNavClick('/gps-tracking')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiMap className="mr-2 text-orange-500" /> GPS Tracking
                    </button>
                    <button onClick={() => handleNavClick('/email-marketing')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiMail className="mr-2 text-orange-500" /> Email Marketing
                    </button>
                   
                    <button onClick={() => handleNavClick('/corporate-email')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiMail className="mr-2 text-orange-500" /> Corporate Email Account
                    </button>
                    <button onClick={() => handleNavClick('/school-management')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiBook className="mr-2 text-orange-500" /> School Management System
                    </button>
                    <button onClick={() => handleNavClick('/Transport-management')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiTruck className="mr-2 text-orange-500" /> Transport Management System
                    </button>
                  </div>
                )}
              </div>

              {/* Software dropdown for mobile */}
              <div className="border-b border-gray-100 pb-2">
                <button 
                  className="flex justify-between items-center w-full text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300"
                  onClick={() => setIsSoftwareDropdownOpen(!isSoftwareDropdownOpen)}
                >
                  <span>Software</span>
                  <svg className={`w-4 h-4 transform transition-transform ${isSoftwareDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isSoftwareDropdownOpen && (
                  <div className="pl-4 mt-2 space-y-3">
                    <h3 className="font-bold text-gray-800 text-sm uppercase flex items-center">
                      <FiShoppingBag className="mr-2" /> Retail & Shop Software
                    </h3>
                    <button onClick={() => handleNavClick('/retail-chain')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiHome className="mr-2 text-blue-500" /> Retail Chain Software
                    </button>
                    <button onClick={() => handleNavClick('/pharmacy-software')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiPackage className="mr-2 text-blue-500" /> Pharmacy Shop Software
                    </button>
                    <button onClick={() => handleNavClick('/grocery-software')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiShoppingCart className="mr-2 text-blue-500" /> Grocery Shop Software
                    </button>
                    <button onClick={() => handleNavClick('/pos-software')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiCreditCard className="mr-2 text-blue-500" /> POS Software
                    </button>
                    <button onClick={() => handleNavClick('/restaurant-software')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiCoffee className="mr-2 text-blue-500" /> Restaurant Software
                    </button>
                    <button onClick={() => handleNavClick('/garment-software')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiShoppingBag className="mr-2 text-blue-500" /> Garment Software
                    </button>
                    
                    <h3 className="font-bold text-gray-800 text-sm uppercase mt-3 flex items-center">
                      <FiTruck className="mr-2" /> Distribution Software
                    </h3>
                    <button onClick={() => handleNavClick('/distribution-software')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiTruck className="mr-2 text-green-500" /> Distribution Software
                    </button>
                    <button onClick={() => handleNavClick('/pharma-distribution')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiPackage className="mr-2 text-green-500" /> Pharma Distribution Software
                    </button>
                    <button onClick={() => handleNavClick('/fmcg-distribution')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiBox className="mr-2 text-green-500" /> FMCG Distribution Software
                    </button>
                    <button onClick={() => handleNavClick('/mandi-software')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiMapPin className="mr-2 text-green-500" /> Mandi Software
                    </button>
                    <button onClick={() => handleNavClick('/wholesale-distribution')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiDatabase className="mr-2 text-green-500" /> Wholesale Distribution Software
                    </button>
                    <button onClick={() => handleNavClick('/warehouse-management')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiDatabase className="mr-2 text-green-500" /> Warehouse Management Software
                    </button>
                    
                    <h3 className="font-bold text-gray-800 text-sm uppercase mt-3 flex items-center">
                      <FiLayers className="mr-2" /> Industry & Manufacturing
                    </h3>
                    <button onClick={() => handleNavClick('/automobile-software')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiTruck className="mr-2 text-purple-500" /> Automobile Software
                    </button>
                    <button onClick={() => handleNavClick('/supply-chain')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiLink className="mr-2 text-purple-500" /> Supply Chain Management
                    </button>
                    <button onClick={() => handleNavClick('/manufacturing-management')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiSettings className="mr-2 text-purple-500" /> Manufacturing Management Software
                    </button>
                    <button onClick={() => handleNavClick('/erp-software')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiServer className="mr-2 text-purple-500" /> All in One ERP Software
                    </button>
                    <button onClick={() => handleNavClick('/process-manufacturing')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiSettings className="mr-2 text-purple-500" /> Process Manufacturing Software
                    </button>
                    <button onClick={() => handleNavClick('/food-beverage')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiCoffee className="mr-2 text-purple-500" /> Food & Beverage Industry Software
                    </button>
                    <button onClick={() => handleNavClick('/assembling-industry')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiSettings className="mr-2 text-purple-500" /> Assembling Industry Software
                    </button>
                    <button onClick={() => handleNavClick('/textile-industry')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiShoppingBag className="mr-2 text-purple-500" /> Textile Industry Software
                    </button>
                  </div>
                )}
              </div>

              {/* Resources dropdown for mobile */}
              <div className="border-b border-gray-100 pb-2">
                <button 
                  className="flex justify-between items-center w-full text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300"
                  onClick={() => setIsResourcesDropdownOpen(!isResourcesDropdownOpen)}
                >
                  <span>Resources</span>
                  <svg className={`w-4 h-4 transform transition-transform ${isResourcesDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isResourcesDropdownOpen && (
                  <div className="pl-4 mt-2 space-y-3">
                    <button onClick={() => handleNavClick('/resources/question-and-answer')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiHelpCircle className="mr-2 text-blue-500" /> Question and Answer
                    </button>
                    <button onClick={() => handleNavClick('/resources/training-and-certification')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiBookOpen className="mr-2 text-blue-500" /> Training and Certification
                    </button>
                    <button onClick={() => handleNavClick('/resources/user-and-deployment')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiUser className="mr-2 text-blue-500" /> User and Deployment
                    </button>
                    <button onClick={() => handleNavClick('/resources/product-brochure')} className="flex items-center w-full text-left text-gray-700 hover:text-blue-600 text-sm py-1">
                      <FiFile className="mr-2 text-blue-500" /> Product Brochure
                    </button>
                  </div>
                )}
              </div>

              {/* Other mobile menu items */}
              <button 
                onClick={() => {
                  scrollToTop();
                  window.open('https://domain.cloudsat.in', '_blank');
                }}
                className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300 border-b border-gray-100 text-left"
              >
                Hosting
              </button>
              <button 
                onClick={() => handleNavClick('/builder-erp')}
                className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300 border-b border-gray-100 text-left"
              >
                BuilderERP
              </button>
              <button 
                onClick={() => handleNavClick('/pricing')}
                className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300 border-b border-gray-100 text-left"
              >
                Pricing
              </button>
              <button 
                onClick={() => handleNavClick('/partners')}
                className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300 border-b border-gray-100 text-left"
              >
                Partners
              </button>
              
              {/* Logo dropdown in mobile menu */}
              <div className="border-b border-gray-100 pb-2">
                <button 
                  className="flex justify-between items-center w-full text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-300"
                  onClick={() => setIsLogoDropdownOpen(!isLogoDropdownOpen)}
                >
                  <span>Our Brands</span>
                  <svg className={`w-4 h-4 transform transition-transform ${isLogoDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isLogoDropdownOpen && (
                  <div className="pl-4 mt-2 grid grid-cols-2 gap-2">
                    <div className="flex flex-col items-center p-2 border border-gray-100 rounded hover:bg-gray-50 transition-colors cursor-pointer">
                      <img src="iq.png" alt="IQ Logo" className="h-6 object-contain mb-1" />
                      <span className="text-xs text-gray-600">IQ Note</span>
                    </div>
                    <div className="flex flex-col items-center p-2 border border-gray-100 rounded hover:bg-gray-50 transition-colors cursor-pointer">
                      <img src="logo.png" alt="Company Logo" className="h-6 object-contain mb-1" />
                      <span className="text-xs text-gray-600">Main Logo</span>
                    </div>
                    <div className="flex flex-col items-center p-2 border border-gray-100 rounded hover:bg-gray-50 transition-colors cursor-pointer">
                      <img src="auditfiling-logo-bg.png" alt="Audit Filing Logo" className="h-6 object-contain mb-1" />
                      <span className="text-xs text-gray-600">Audit Filing</span>
                    </div>
                    <div className="flex flex-col items-center p-2 border border-gray-100 rounded hover:bg-gray-50 transition-colors cursor-pointer">
                      <img src="tracolab-logo.png" alt="Tracolab Logo" className="h-6 object-contain mb-1" />
                      <span className="text-xs text-gray-600">Tracolab</span>
                    </div>
                    <div className="flex flex-col items-center p-2 border border-gray-100 rounded hover:bg-gray-50 transition-colors cursor-pointer col-span-2">
                      <img src="sociomint_logo.png" alt="Sociomint Logo" className="h-6 object-contain mb-1" />
                      <span className="text-xs text-gray-600">Sociomint</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4 space-y-3 pt-4 border-t border-gray-200">
              <button 
                onClick={() => handleNavClick('/bookdemo')}
                className="w-full bg-[#3f51b5] hover:bg-[#303f9f] text-white px-4 py-2 rounded-md transition-colors duration-300"
              >
                Book a Demo
              </button>
              
              {/* Conditional rendering for mobile */}
              {!isLoggedIn ? (
                <>
                  <button 
                    onClick={handleLogin}
                    className="w-full bg-[#ff4081] hover:bg-[#f50057] text-white px-4 py-2 rounded-md transition-colors duration-300"
                  >
                    Login
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <button 
                    onClick={() => handleNavClick('/dashboard')}
                    className="block w-full text-center bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-md transition-colors duration-300"
                  >
                    Dashboard
                  </button>
                  <button 
                    onClick={() => handleNavClick('/profile')}
                    className="block w-full text-center bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-md transition-colors duration-300"
                  >
                    Profile
                  </button>
                  <button 
                    onClick={() => handleNavClick('/settings')}
                    className="block w-full text-center bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-md transition-colors duration-300"
                  >
                    Settings
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-md transition-colors duration-300"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Header;