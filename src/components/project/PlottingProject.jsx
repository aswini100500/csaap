// import React, { useState, useEffect } from "react";

// import projectService from "./projectService";
// import {
//   FaPlus,
//   FaTrash,
//   FaCheck,
//   FaCheckCircle,
//   FaQuestionCircle,
//   FaRulerCombined,
//   FaList,
//   FaBuilding,
//   FaCalendarAlt,
//   FaMoneyBill,
//   FaSave,
//   FaEdit,
//   FaChevronRight,
//   FaMapMarkerAlt,
//   FaLayerGroup,
//   FaCogs,
//   FaChartLine,
//   FaSortAmountUp,
//   FaInfoCircle,
//   FaArrowRight,
//   FaTimes,
//   FaChevronUp,
//   FaChevronDown,
//   FaArrowLeft
// } from "react-icons/fa";

// const PlottingProject = ({
//   projectName,
//   setProjectName,
//   projectType,
//   setProjectType,
//   city,
//   setCity,
//   locality,
//   setLocality,
//   landZone,
//   setLandZone,
//   onSaveProject,
//   PROJECT_TYPES = {
//     APARTMENT: "Apartment",
//     PLOTTING: "Plotting",
//     DUPLEX: "Duplex",
//     TRIPLEX: "Triplex",
//     COMMERCIAL: "Commercial",
//     CUSTOM: "Custom",
//   },
//   editingProjectId,
//   selectedProject,
// }) => {
//   // Initialize states
//   const [plots, setPlots] = useState([]);
//   const [selectedPlot, setSelectedPlot] = useState(null);
//   const [isCornerPlot, setIsCornerPlot] = useState(false);
//   const [priceDetails, setPriceDetails] = useState({ expectedPrice: "", tokenAmount: "" });
//   const [propertyFeatures, setPropertyFeatures] = useState({ landArea: "", propertyStatus: "" });
//   const [areaDetails, setAreaDetails] = useState({ plotArea: "", plotLength: "", plotBreadth: "" });
//   const [kissama, setKissama] = useState("");
//   const [purchaser, setPurchaser] = useState("");
//   const [constructor, setConstructor] = useState("");
//   const [landArea, setLandArea] = useState("");

//   // Revenue plots state
//   const [revenuePlots, setRevenuePlots] = useState(0);
//   const [plotsData, setPlotsData] = useState([]);
//   const [attachment, setAttachment] = useState(null);

//   // Manual inputs for adding plots
//   const [manualPlotCount, setManualPlotCount] = useState(0);
//   const [expandedPlots, setExpandedPlots] = useState({});

//   // Additional plot details states
//   const [boundary, setBoundary] = useState("");
//   const [reference, setReference] = useState("");
//   const [staffEngaged, setStaffEngaged] = useState("");
//   const [loanProvider, setLoanProvider] = useState("");
//   const [plotCustomFacilities, setPlotCustomFacilities] = useState([]);
//   const [approvalStatus, setApprovalStatus] = useState([{ authority: "", status: "" }]);
//   const [brokerList] = useState([
//     { id: 1, name: "Broker 1", phone: "9999999999" },
//     { id: 2, name: "Broker 2", phone: "8888888888" },
//   ]);

//   // FACILITIES constant
//   const FACILITIES = [
//     { key: "parking", label: "Parking" },
//     { key: "gym", label: "Gym" },
//     { key: "pool", label: "Swimming Pool" },
//     { key: "garden", label: "Garden" },
//     { key: "security", label: "Security" },
//     { key: "elevator", label: "Elevator" },
//   ];

//   // Tab navigation
//   const [activeTab, setActiveTab] = useState("project-info");

//   // Load existing project data
//   useEffect(() => {
//     if (selectedProject && editingProjectId) {
//       const projectData = selectedProject;
//       setPlots(projectData.plots || []);
//       setLandArea(projectData.landArea || "");
//     }
//   }, [selectedProject, editingProjectId]);

//   // Generate unique ID
//   const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

//   // Handle approval status changes
//   const handleApprovalChange = (index, field, value) => {
//     const updatedApprovals = [...approvalStatus];
//     updatedApprovals[index] = { ...updatedApprovals[index], [field]: value };
//     setApprovalStatus(updatedApprovals);
//   };

//   // Add new approval authority
//   const addApprovalAuthority = () => {
//     setApprovalStatus([...approvalStatus, { authority: "", status: "" }]);
//   };

//   // Remove approval authority
//   const removeApprovalAuthority = (index) => {
//     setApprovalStatus(approvalStatus.filter((_, i) => i !== index));
//   };

//   // Render broker select
//   const renderBrokerSelect = () => (
//     <div>
//       <label className="block text-sm font-medium text-slate-600 mb-1">
//         Broker
//       </label>
//       <select
//         value={reference}
//         onChange={(e) => setReference(e.target.value)}
//         className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//       >
//         <option value="">Select broker</option>
//         {brokerList.map((broker) => (
//           <option key={broker.id} value={broker.id}>
//             {broker.name} - {broker.phone}
//           </option>
//         ))}
//       </select>
//     </div>
//   );

//   // Save project handler
//   const handleSaveProject = async () => {
//     if (!projectName || !projectType) {
//       alert("Please enter project name and type");
//       return;
//     }

//     try {
//       const projectData = {
//         name: projectName,
//         type: projectType,
//         city,
//         locality,
//         landZone,
//         landArea,
//         plots: [...plots],
//         revenuePlots: revenuePlots,
//         plotsData: plotsData
//         // attachment handling would need file upload logic, skipping for JSON payload simple example
//       };

//       if (editingProjectId) { // Use editingProjectId or internal ID if you had one state for it
//         // Assuming editingProjectId is passed in prop or we should have a local id state like others
//         // For now using editingProjectId prop if present, else create
//         await projectService.updatePlotting(editingProjectId, projectData);
//         alert("Plotting project updated successfully!");
//       } else {
//         const response = await projectService.createPlotting(projectData);
//         alert(`Plotting project created successfully with ID: ${response.id}`);
//       }

//       if (onSaveProject) {
//         onSaveProject(projectData);
//       }
//     } catch (error) {
//       console.error("Error saving plotting project:", error);
//       alert("Failed to save project.");
//     }
//   };

//   // Add multiple plots
//   const addMultiplePlots = () => {
//     if (manualPlotCount <= 0) {
//       alert("Please enter a valid number of plots");
//       return;
//     }

//     const newPlots = [];
//     for (let i = 1; i <= manualPlotCount; i++) {
//       const plotNumber = plots.length + i;
//       const plotName = `Plot ${plotNumber}`;

//       const newPlot = {
//         id: generateId(),
//         name: plotName,
//         isCornerPlot: false,
//         priceDetails: { expectedPrice: "", tokenAmount: "" },
//         propertyFeatures: { landArea: "", propertyStatus: "" },
//         areaDetails: { plotArea: "", plotLength: "", plotBreadth: "" },
//         kissama: "",
//         purchaser: "",
//         constructor: "",
//         isComplete: false,
//         status: "draft",
//       };
//       newPlots.push(newPlot);
//     }

//     setPlots([...plots, ...newPlots]);
//     setManualPlotCount(0);
//     alert(`Added ${manualPlotCount} plots successfully!`);
//   };

//   // Toggle plot expansion
//   const togglePlotExpansion = (plotId) => {
//     setExpandedPlots(prev => ({
//       ...prev,
//       [plotId]: !prev[plotId]
//     }));
//   };

//   // Handle plot click
//   const handlePlotClick = (plot) => {
//     // Set the selected plot
//     setSelectedPlot(plot);

//     // Set all the form states from the plot data
//     setIsCornerPlot(plot.isCornerPlot || false);
//     setPriceDetails({
//       expectedPrice: plot.priceDetails?.expectedPrice || "",
//       tokenAmount: plot.priceDetails?.tokenAmount || ""
//     });
//     setPropertyFeatures({
//       landArea: plot.propertyFeatures?.landArea || "",
//       propertyStatus: plot.propertyFeatures?.propertyStatus || ""
//     });
//     setAreaDetails({
//       plotArea: plot.areaDetails?.plotArea || "",
//       plotLength: plot.areaDetails?.plotLength || "",
//       plotBreadth: plot.areaDetails?.plotBreadth || ""
//     });
//     setKissama(plot.kissama || "");
//     setPurchaser(plot.purchaser || "");
//     setConstructor(plot.constructor || "");
//   };

//   // Update plot details
//   const updatePlotDetails = () => {
//     if (!selectedPlot) return;

//     const updatedPlots = plots.map((plot) => {
//       if (plot.id === selectedPlot.id) {
//         const updatedPlot = {
//           ...plot,
//           isCornerPlot,
//           priceDetails,
//           propertyFeatures,
//           areaDetails,
//           kissama,
//           purchaser,
//           constructor,
//         };
//         updatedPlot.isComplete = !!(
//           priceDetails.expectedPrice &&
//           areaDetails.plotArea &&
//           purchaser &&
//           constructor
//         );
//         return updatedPlot;
//       }
//       return plot;
//     });

//     setPlots(updatedPlots);
//     setSelectedPlot(updatedPlots.find((p) => p.id === selectedPlot.id));
//     alert("Plot details updated successfully!");
//   };

//   // Remove plot
//   const removePlot = (plotId) => {
//     if (window.confirm("Are you sure you want to remove this plot?")) {
//       const updatedPlots = plots.filter(plot => plot.id !== plotId);
//       setPlots(updatedPlots);

//       if (selectedPlot?.id === plotId) {
//         setSelectedPlot(null);
//       }

//       alert("Plot removed successfully!");
//     }
//   };

//   // Update plot function
//   const updatePlot = (plotId, field, value) => {
//     const updatedPlots = plots.map(plot =>
//       plot.id === plotId ? { ...plot, [field]: value } : plot
//     );
//     setPlots(updatedPlots);
//   };

//   // Revenue plot handlers
//   const handlePlotChange = (index, field, value) => {
//     const updatedPlotsData = [...plotsData];
//     if (!updatedPlotsData[index]) {
//       updatedPlotsData[index] = {};
//     }
//     updatedPlotsData[index][field] = value;
//     setPlotsData(updatedPlotsData);
//   };

//   const handlePlotFileChange = (index, file) => {
//     const updatedPlotsData = [...plotsData];
//     if (!updatedPlotsData[index]) {
//       updatedPlotsData[index] = {};
//     }
//     updatedPlotsData[index].fileName = file ? file.name : "";
//     updatedPlotsData[index].file = file;
//     setPlotsData(updatedPlotsData);
//   };

//   const calculateTotalPlotsArea = () => {
//     return plotsData.reduce((total, plot) => {
//       return total + (parseFloat(plot?.area) || 0);
//     }, 0);
//   };

//   const getFilledPlotsCount = () => {
//     return plotsData.filter(
//       (plot) => plot && (plot.area || plot.entryPlotNo || plot.khataNo)
//     ).length;
//   };

//   // Handle save revenue plots and go to next tab
//   const handleSaveRevenuePlots = () => {
//     alert("Revenue plots saved successfully!");
//     setActiveTab("plots");
//   };

//   // Navigation Tabs Component
//   const NavigationTabs = () => (
//     <div className="bg-white rounded-xl border border-slate-200 p-1 mb-6 shadow-sm">
//       <div className="flex flex-wrap gap-1">
//         <button
//           onClick={() => setActiveTab("project-info")}
//           className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 ${activeTab === "project-info"
//             ? "bg-indigo-600 text-white shadow-md"
//             : "text-slate-600 hover:bg-slate-100"
//             }`}
//         >
//           <FaBuilding className="mr-2 h-4 w-4" />
//           Project Info
//         </button>

//         <button
//           onClick={() => setActiveTab("revenue-plots")}
//           className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 ${activeTab === "revenue-plots"
//             ? "bg-indigo-600 text-white shadow-md"
//             : "text-slate-600 hover:bg-slate-100"
//             }`}
//         >
//           <FaChartLine className="mr-2 h-4 w-4" />
//           Revenue Plots
//         </button>

//         <button
//           onClick={() => setActiveTab("plots")}
//           className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 ${activeTab === "plots"
//             ? "bg-indigo-600 text-white shadow-md"
//             : "text-slate-600 hover:bg-slate-100"
//             }`}
//         >
//           <FaLayerGroup className="mr-2 h-4 w-4" />
//           Plots & Details
//         </button>
//       </div>
//     </div>
//   );

//   // Enhanced Project Info Section
//   const renderProjectInfo = () => (
//     <div className="space-y-6">
//       {/* Project Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
//           <div className="flex items-center">
//             <div className={`p-3 rounded-lg bg-indigo-50 mr-4`}>
//               <FaLayerGroup className="h-6 w-6 text-indigo-600" />
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-slate-900">{plots.length}</div>
//               <div className="text-sm text-slate-500">Total Plots</div>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
//           <div className="flex items-center">
//             <div className={`p-3 rounded-lg bg-emerald-50 mr-4`}>
//               <FaChartLine className="h-6 w-6 text-emerald-600" />
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-slate-900">{revenuePlots}</div>
//               <div className="text-sm text-slate-500">Revenue Plots</div>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
//           <div className="flex items-center">
//             <div className={`p-3 rounded-lg bg-blue-50 mr-4`}>
//               <FaCheckCircle className="h-6 w-6 text-blue-600" />
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-slate-900">{plots.filter(p => p.isComplete).length}</div>
//               <div className="text-sm text-slate-500">Completed Plots</div>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
//           <div className="flex items-center">
//             <div className={`p-3 rounded-lg bg-amber-50 mr-4`}>
//               <FaRulerCombined className="h-6 w-6 text-amber-600" />
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-slate-900">{calculateTotalPlotsArea()} sq.ft</div>
//               <div className="text-sm text-slate-500">Total Area</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Project Basic Info */}
//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
//           <h2 className="text-lg font-semibold mb-4 text-slate-800 flex items-center">
//             <FaBuilding className="mr-2 text-indigo-600 h-5 w-5" />
//             Project Information
//           </h2>

//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center">
//                 <span className="text-red-500 mr-1">*</span>
//                 Project Name
//               </label>
//               <input
//                 type="text"
//                 value={projectName}
//                 onChange={(e) => setProjectName(e.target.value)}
//                 className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//                 placeholder="Enter project name"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center">
//                 <span className="text-red-500 mr-1">*</span>
//                 Project Type
//               </label>
//               <select
//                 value={projectType}
//                 onChange={(e) => setProjectType(e.target.value)}
//                 className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none bg-white"
//               >
//                 <option value="">Select project type</option>
//                 {Object.values(PROJECT_TYPES).map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
//           <h2 className="text-lg font-semibold mb-4 text-slate-800 flex items-center">
//             <FaMapMarkerAlt className="mr-2 text-indigo-600 h-5 w-5" />
//             Property Location
//           </h2>

//           <div className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">
//                   City
//                 </label>
//                 <input
//                   type="text"
//                   value={city}
//                   onChange={(e) => setCity(e.target.value)}
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//                   placeholder="Enter City"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">
//                   Locality
//                 </label>
//                 <input
//                   type="text"
//                   value={locality}
//                   onChange={(e) => setLocality(e.target.value)}
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//                   placeholder="Enter Locality"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">
//                   Land Zone
//                 </label>
//                 <input
//                   type="text"
//                   value={landZone}
//                   onChange={(e) => setLandZone(e.target.value)}
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//                   placeholder="Enter Land Zone"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center">
//                   <FaRulerCombined className="mr-2 text-slate-400 h-4 w-4" />
//                   Total Land Area (sq. ft)
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={landArea}
//                   onChange={(e) => setLandArea(parseFloat(e.target.value))}
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//                   placeholder="Enter total land area"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Next Button at bottom */}
//       <div className="pt-6">
//         <button
//           onClick={() => setActiveTab('revenue-plots')}
//           className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg transition-all duration-200"
//         >
//           <span>Continue to Revenue Plots</span>
//           <FaChevronRight className="h-5 w-5" />
//         </button>
//       </div>
//     </div>
//   );

//   // Enhanced Revenue Plots Section
//   const renderRevenuePlots = () => (
//     <div className="space-y-6">
//       {/* Navigation Back Button */}
//       <button
//         onClick={() => setActiveTab('project-info')}
//         className="flex items-center text-slate-600 hover:text-slate-800 hover:bg-slate-100 px-4 py-2 rounded-lg transition-all duration-200"
//       >
//         <FaArrowLeft className="mr-2 h-4 w-4" />
//         Back to Project Info
//       </button>

//       <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
//         <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
//           <FaChartLine className="mr-3 text-indigo-600" />
//           Revenue Plots Configuration
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Total Number of Revenue Plots
//             </label>
//             <input
//               type="number"
//               min="0"
//               max="50"
//               value={revenuePlots}
//               onChange={(e) => setRevenuePlots(parseInt(e.target.value) || 0)}
//               className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//               placeholder="Enter total plots"
//             />
//           </div>

//           <div className="md:col-span-3">
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Upload Attachment (if any)
//             </label>
//             <input
//               type="file"
//               onChange={(e) => setAttachment(e.target.files[0])}
//               className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//             />
//             {attachment && (
//               <p className="text-sm text-emerald-600 mt-2">
//                 ✓ {attachment.name}
//               </p>
//             )}
//           </div>
//         </div>

//         {revenuePlots > 0 && (
//           <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 mt-6">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-semibold text-slate-800">
//                 Revenue Plot Details ({revenuePlots} {revenuePlots === 1 ? "Plot" : "Plots"})
//               </h3>
//               <span className="text-sm text-slate-500">
//                 Enter details for each revenue plot
//               </span>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               {Array.from({ length: revenuePlots }, (_, index) => (
//                 <div
//                   key={index}
//                   className="bg-white rounded-xl border border-slate-300 p-4 space-y-4 hover:shadow-md transition-shadow duration-200"
//                 >
//                   <div className="flex items-center justify-between border-b border-slate-200 pb-3">
//                     <h5 className="font-semibold text-slate-800">
//                       Plot {index + 1}
//                     </h5>
//                     <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
//                       #{index + 1}
//                     </span>
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-slate-600 mb-1">
//                       Plot Area (sq. ft)
//                     </label>
//                     <input
//                       type="number"
//                       min="0"
//                       value={plotsData[index]?.area || ""}
//                       onChange={(e) =>
//                         handlePlotChange(index, "area", e.target.value)
//                       }
//                       className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//                       placeholder="Enter area"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-slate-600 mb-1">
//                       Entry Plot No.
//                     </label>
//                     <input
//                       type="text"
//                       value={plotsData[index]?.entryPlotNo || ""}
//                       onChange={(e) =>
//                         handlePlotChange(index, "entryPlotNo", e.target.value)
//                       }
//                       className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//                       placeholder="Enter plot number"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-slate-600 mb-1">
//                       Khata No.
//                     </label>
//                     <input
//                       type="text"
//                       value={plotsData[index]?.khataNo || ""}
//                       onChange={(e) =>
//                         handlePlotChange(index, "khataNo", e.target.value)
//                       }
//                       className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//                       placeholder="Enter khata number"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-slate-600 mb-1">
//                       Plot Document
//                     </label>
//                     <input
//                       type="file"
//                       onChange={(e) =>
//                         handlePlotFileChange(index, e.target.files[0])
//                       }
//                       className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//                     />
//                     {plotsData[index]?.fileName && (
//                       <p className="text-xs text-emerald-600 mt-2 truncate">
//                         ✓ {plotsData[index].fileName}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Summary Card */}
//             <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h4 className="text-lg font-semibold text-indigo-800">
//                     Summary
//                   </h4>
//                   <p className="text-sm text-indigo-600 mt-1">
//                     Total Plots Area: <span className="font-bold">{calculateTotalPlotsArea()}</span> sq. ft
//                   </p>
//                   <p className="text-sm text-slate-600 mt-1">
//                     {getFilledPlotsCount()} of {revenuePlots} plots filled
//                   </p>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <button
//                     onClick={handleSaveRevenuePlots}
//                     className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center"
//                   >
//                     <FaSave className="mr-2" />
//                     Save Revenue Plots & Continue
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Next Button at bottom if no revenue plots */}
//         {revenuePlots === 0 && (
//           <div className="pt-6">
//             <button
//               onClick={() => setActiveTab('plots')}
//               className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg transition-all duration-200"
//             >
//               <span>Continue to Plots & Details</span>
//               <FaChevronRight className="h-5 w-5" />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   // Enhanced Plots Section
//   const renderPlots = () => (
//     <div className="space-y-6">
//       {/* Navigation Back Button */}
//       <button
//         onClick={() => setActiveTab('revenue-plots')}
//         className="flex items-center text-slate-600 hover:text-slate-800 hover:bg-slate-100 px-4 py-2 rounded-lg transition-all duration-200"
//       >
//         <FaArrowLeft className="mr-2 h-4 w-4" />
//         Back to Revenue Plots
//       </button>

//       {/* Split Layout: Plots List on Left, Details on Right */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column: Plots List */}
//         <div className="lg:col-span-1 space-y-6">
//           {/* Add Multiple Plots Section */}
//           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
//             <h3 className="text-lg font-semibold mb-4 text-slate-800 flex items-center">
//               <FaSortAmountUp className="mr-2 text-indigo-600 h-5 w-5" />
//               Add Multiple Plots
//             </h3>
//             <div className="flex items-center space-x-4">
//               <div className="flex-1">
//                 <label className="block text-sm font-medium text-slate-700 mb-1">
//                   Number of Plots to Add
//                 </label>
//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="number"
//                     min="1"
//                     max="50"
//                     value={manualPlotCount}
//                     onChange={(e) => setManualPlotCount(parseInt(e.target.value) || 0)}
//                     className="flex-1 border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//                     placeholder="Enter number of plots"
//                   />
//                   <button
//                     onClick={addMultiplePlots}
//                     className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center"
//                   >
//                     <FaPlus className="mr-2 h-4 w-4" />
//                     Add Plots
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Plots List */}
//           <div className="space-y-2">
//             {plots.length === 0 ? (
//               <div className="bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 p-12 text-center">
//                 <FaLayerGroup className="mx-auto h-16 w-16 text-slate-300 mb-4" />
//                 <h3 className="text-lg font-semibold text-slate-700 mb-2">No Plots Created</h3>
//                 <p className="text-slate-500 mb-4">Start by adding plots to the project</p>
//                 <div className="flex items-center justify-center space-x-4">
//                   <input
//                     type="number"
//                     min="1"
//                     max="50"
//                     value={manualPlotCount}
//                     onChange={(e) => setManualPlotCount(parseInt(e.target.value) || 0)}
//                     className="w-32 border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//                     placeholder="Number"
//                   />
//                   <button
//                     onClick={addMultiplePlots}
//                     className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg transition-all duration-200 flex items-center"
//                   >
//                     <FaPlus className="mr-2 h-4 w-4" />
//                     Add Plots
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               plots.map((plot) => (
//                 <div
//                   key={plot.id}
//                   onClick={() => handlePlotClick(plot)}
//                   className={`bg-white rounded-xl border-2 shadow-sm overflow-hidden cursor-pointer transition-all duration-200 ${selectedPlot?.id === plot.id
//                     ? 'border-indigo-500 shadow-lg'
//                     : 'border-slate-200 hover:border-indigo-300 hover:shadow-md'
//                     }`}
//                 >
//                   {/* Plot Header */}
//                   <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-white">
//                     <div className="flex items-center space-x-4">
//                       <div className={` rounded-lg ${plot.isComplete ? 'bg-emerald-100' : 'bg-indigo-100'}`}>
//                         <FaLayerGroup className={`h-4 w-4 ${plot.isComplete ? 'text-emerald-600' : 'text-indigo-600'}`} />
//                       </div>
//                       <div>
//                         <div className="flex items-center space-x-3">
//                           <h3 className="text-md font-semibold text-slate-900">{plot.name}</h3>
//                           {/* <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                             plot.isCornerPlot ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
//                           }`}>
//                             {plot.isCornerPlot ? 'Corner Plot' : 'Regular Plot'}
//                           </span> */}
//                           <span className={`px-2 py-1 rounded-full text-xs font-medium ${plot.isComplete ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
//                             }`}>
//                             {plot.isComplete ? 'Complete' : 'In Progress'}
//                           </span>
//                         </div>
//                         <div className="text-sm text-slate-500 mt-1">
//                           Area: {plot.areaDetails?.plotArea || '0'} Sq-yd
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center">
//                       {selectedPlot?.id === plot.id && (
//                         <FaCheckCircle className="h-4 w-4 text-green-800" />
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Right Column: Plot Details Panel */}
//         <div className="lg:col-span-2">
//           {renderPlotDetailsPanel()}
//         </div>
//       </div>

//       {/* Save Project Button at bottom */}
//       <div className="pt-6">
//         <button
//           onClick={handleSaveProject}
//           className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg transition-all duration-200"
//         >
//           <FaSave className="mr-2 h-5 w-5" />
//           <span>Save Complete Project</span>
//         </button>
//       </div>
//     </div>
//   );

//   // Plot Details Panel
//   const renderPlotDetailsPanel = () => {
//     if (!selectedPlot) {
//       return (
//         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full plot-details-panel">
//           <div className="text-center py-12">
//             <FaBuilding className="mx-auto h-16 w-16 text-indigo-300 mb-4" />
//             <h3 className="text-lg font-semibold text-slate-900 mb-2">
//               Select a Plot
//             </h3>
//             <p className="text-slate-500 mb-4">
//               Click on a plot's <FaEdit className="inline h-3 w-3 mx-1" /> edit icon
//               to view and edit detailed information
//             </p>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full plot-details-panel">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h2 className="text-xl font-bold text-slate-900">{selectedPlot.name}</h2>
//             <p className="text-slate-500 text-sm">
//               Plot ID: {selectedPlot.id}
//             </p>
//           </div>
//           <div className="flex items-center space-x-2">
//             <span className={`px-2 py-1 rounded-full text-xs font-medium ${selectedPlot.isComplete
//               ? "bg-emerald-100 text-emerald-800"
//               : "bg-indigo-100 text-indigo-800"
//               }`}>
//               {selectedPlot.isComplete ? "Complete" : "In Progress"}
//             </span>
//             <span className={`px-2 py-1 rounded-full text-xs font-medium ${isCornerPlot
//               ? "bg-amber-100 text-amber-800"
//               : "bg-blue-100 text-blue-800"
//               }`}>
//               {isCornerPlot ? "Corner Plot" : "Regular Plot"}
//             </span>
//           </div>
//         </div>

//         <div className="space-y-6">
//           {/* Corner Plot Selection */}
//           <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
//             <h3 className="text-sm font-semibold mb-3 text-slate-800 flex items-center">
//               <FaQuestionCircle className="mr-2 text-indigo-600 h-4 w-4" />
//               Plot Configuration
//             </h3>
//             <div className="space-y-3">
//               <div>
//                 <label className="block text-xs font-medium text-slate-600 mb-2">
//                   Is this a corner plot?
//                 </label>
//                 <div className="flex space-x-4">
//                   <label className="inline-flex items-center cursor-pointer">
//                     <input
//                       type="radio"
//                       checked={isCornerPlot}
//                       onChange={() => setIsCornerPlot(true)}
//                       className="text-indigo-600 focus:ring-indigo-500 h-3 w-3"
//                     />
//                     <span className="ml-2 text-xs text-slate-700">Yes</span>
//                   </label>
//                   <label className="inline-flex items-center cursor-pointer">
//                     <input
//                       type="radio"
//                       checked={!isCornerPlot}
//                       onChange={() => setIsCornerPlot(false)}
//                       className="text-indigo-600 focus:ring-indigo-500 h-3 w-3"
//                     />
//                     <span className="ml-2 text-xs text-slate-700">No</span>
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Property Features */}
//           <div className="border-t border-gray-200 pt-6">
//             <h3 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center">
//               <FaBuilding className="mr-2" />
//               Property Features
//             </h3>

//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Property Status
//               </label>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                 {["prehold", "lease", "vacant"].map((status) => (
//                   <label
//                     key={status}
//                     className="inline-flex items-center cursor-pointer"
//                   >
//                     <input
//                       type="radio"
//                       name="propertyStatus"
//                       checked={propertyFeatures.propertyStatus === status}
//                       onChange={() =>
//                         setPropertyFeatures({
//                           ...propertyFeatures,
//                           propertyStatus: status,
//                         })
//                       }
//                       className="text-indigo-600 focus:ring-indigo-500 rounded"
//                     />
//                     <span className="ml-2 text-sm text-gray-700 capitalize">
//                       {status}
//                     </span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Land Area */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Land Area (sqft)
//               </label>
//               <input
//                 type="number"
//                 value={propertyFeatures.landArea}
//                 onChange={(e) =>
//                   setPropertyFeatures({
//                     ...propertyFeatures,
//                     landArea: e.target.value,
//                   })
//                 }
//                 className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Enter land area in square feet"
//               />
//             </div>

//             {/* Outhouse + Possession Status Section */}
//             <div className="grid grid-cols-1 md:grid-cols-2 mb-4">
//               {/* Outhouse Section */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Outhouse Available
//                 </label>
//                 <div className="flex space-x-6 mb-3">
//                   <label className="inline-flex items-center cursor-pointer">
//                     <input
//                       type="radio"
//                       name="hasOuthouse"
//                       checked={propertyFeatures.hasOuthouse === "Yes"}
//                       onChange={() =>
//                         setPropertyFeatures({
//                           ...propertyFeatures,
//                           hasOuthouse: "Yes",
//                         })
//                       }
//                       className="text-indigo-600 focus:ring-indigo-500 rounded"
//                     />
//                     <span className="ml-2 text-sm text-gray-700">Yes</span>
//                   </label>
//                   <label className="inline-flex items-center cursor-pointer">
//                     <input
//                       type="radio"
//                       name="hasOuthouse"
//                       checked={propertyFeatures.hasOuthouse === "No"}
//                       onChange={() =>
//                         setPropertyFeatures({
//                           ...propertyFeatures,
//                           hasOuthouse: "No",
//                           outhouseArea: "",
//                         })
//                       }
//                       className="text-indigo-600 focus:ring-indigo-500 rounded"
//                     />
//                     <span className="ml-2 text-sm text-gray-700">No</span>
//                   </label>
//                 </div>

//                 {propertyFeatures.hasOuthouse === "Yes" && (
//                   <div className="mt-3">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Outhouse Area (sqft)
//                     </label>
//                     <input
//                       type="number"
//                       value={propertyFeatures.outhouseArea}
//                       onChange={(e) =>
//                         setPropertyFeatures({
//                           ...propertyFeatures,
//                           outhouseArea: e.target.value,
//                         })
//                       }
//                       className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                       placeholder="Enter outhouse area"
//                     />
//                   </div>
//                 )}
//               </div>

//               {/* Possession Status */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Possession Status
//                 </label>
//                 <div className="flex flex-wrap space-x-6">
//                   <label className="inline-flex items-center cursor-pointer">
//                     <input
//                       type="radio"
//                       name="possessionStatus"
//                       checked={
//                         propertyFeatures.possessionStatus ===
//                         "Under Construction"
//                       }
//                       onChange={() =>
//                         setPropertyFeatures({
//                           ...propertyFeatures,
//                           possessionStatus: "Under Construction",
//                         })
//                       }
//                       className="text-indigo-600 focus:ring-indigo-500 rounded"
//                     />
//                     <span className="ml-2 text-sm text-gray-700">
//                       Under Construction
//                     </span>
//                   </label>
//                   <label className="inline-flex items-center cursor-pointer">
//                     <input
//                       type="radio"
//                       name="possessionStatus"
//                       checked={
//                         propertyFeatures.possessionStatus === "Ready to Move"
//                       }
//                       onChange={() =>
//                         setPropertyFeatures({
//                           ...propertyFeatures,
//                           possessionStatus: "Ready to Move",
//                         })
//                       }
//                       className="text-indigo-600 focus:ring-indigo-500 rounded"
//                     />
//                     <span className="ml-2 text-sm text-gray-700">
//                       Ready to Move
//                     </span>
//                   </label>
//                 </div>
//               </div>
//             </div>

//             {/* Available From */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Available From
//               </label>
//               <div className="flex space-x-4">
//                 <select
//                   value={propertyFeatures.availableFromMonth}
//                   onChange={(e) =>
//                     setPropertyFeatures({
//                       ...propertyFeatures,
//                       availableFromMonth: e.target.value,
//                     })
//                   }
//                   className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value="">Month</option>
//                   <option value="January">January</option>
//                   <option value="February">February</option>
//                   <option value="March">March</option>
//                   <option value="April">April</option>
//                   <option value="May">May</option>
//                   <option value="June">June</option>
//                   <option value="July">July</option>
//                   <option value="August">August</option>
//                   <option value="September">September</option>
//                   <option value="October">October</option>
//                   <option value="November">November</option>
//                   <option value="December">December</option>
//                 </select>
//                 <select
//                   value={propertyFeatures.availableFromYear}
//                   onChange={(e) =>
//                     setPropertyFeatures({
//                       ...propertyFeatures,
//                       availableFromYear: e.target.value,
//                     })
//                   }
//                   className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value="">Year</option>
//                   {Array.from(
//                     { length: 10 },
//                     (_, i) => new Date().getFullYear() + i
//                   ).map((year) => (
//                     <option key={year} value={year}>
//                       {year}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Original Property Features */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   No. of Open Sides
//                 </label>
//                 <select
//                   value={propertyFeatures.openSides}
//                   onChange={(e) =>
//                     setPropertyFeatures({
//                       ...propertyFeatures,
//                       openSides: e.target.value,
//                     })
//                   }
//                   className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value="">Select</option>
//                   <option value="1">1 Side</option>
//                   <option value="2">2 Sides</option>
//                   <option value="3">3 Sides</option>
//                   <option value="4">4 Sides</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Width of Road Facing the Plot (Meters)
//                 </label>
//                 <input
//                   type="number"
//                   value={propertyFeatures.roadWidth}
//                   onChange={(e) =>
//                     setPropertyFeatures({
//                       ...propertyFeatures,
//                       roadWidth: e.target.value,
//                     })
//                   }
//                   className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Meters"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Boundary Wall Made
//                 </label>
//                 <select
//                   value={propertyFeatures.boundaryWall}
//                   onChange={(e) =>
//                     setPropertyFeatures({
//                       ...propertyFeatures,
//                       boundaryWall: e.target.value,
//                     })
//                   }
//                   className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value="">Select</option>
//                   <option value="yes">Yes</option>
//                   <option value="no">No</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Gated Colony
//                 </label>
//                 <select
//                   value={propertyFeatures.gatedColony}
//                   onChange={(e) =>
//                     setPropertyFeatures({
//                       ...propertyFeatures,
//                       gatedColony: e.target.value,
//                     })
//                   }
//                   className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value="">Select</option>
//                   <option value="yes">Yes</option>
//                   <option value="no">No</option>
//                 </select>
//               </div>
//             </div>

//             {/* Facilities */}
//             <div className="mt-4">
//               <label className="block text-sm font-medium text-gray-700 mb-3">
//                 Facilities
//               </label>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                 {FACILITIES.map((facility) => (
//                   <label
//                     key={facility.key}
//                     className="inline-flex items-center cursor-pointer"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={propertyFeatures[facility.key] || false}
//                       onChange={(e) =>
//                         setPropertyFeatures({
//                           ...propertyFeatures,
//                           [facility.key]: e.target.checked,
//                         })
//                       }
//                       className="rounded text-indigo-600 focus:ring-indigo-500"
//                     />
//                     <span className="ml-2 text-sm text-gray-700">
//                       {facility.label}
//                     </span>
//                   </label>
//                 ))}
//                 {plotCustomFacilities.map((facility, idx) => (
//                   <label
//                     key={idx}
//                     className="inline-flex items-center cursor-pointer"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={propertyFeatures[facility] || false}
//                       onChange={(e) =>
//                         setPropertyFeatures({
//                           ...propertyFeatures,
//                           [facility]: e.target.checked,
//                         })
//                       }
//                       className="rounded text-indigo-600 focus:ring-indigo-500"
//                     />
//                     <span className="ml-2 text-sm text-gray-700">
//                       {facility}
//                     </span>
//                     <button
//                       type="button"
//                       className="ml-2 text-gray-500"
//                       onClick={() =>
//                         setPlotCustomFacilities(
//                           plotCustomFacilities.filter((f) => f !== facility)
//                         )
//                       }
//                     >
//                       <FaTrash />
//                     </button>
//                   </label>
//                 ))}
//               </div>
//               <div className="flex mt-2">
//                 <input
//                   type="text"
//                   placeholder="Add custom facility"
//                   className="border border-gray-300 rounded-md p-2 flex-1"
//                   value={propertyFeatures.newFacility || ""}
//                   onChange={(e) =>
//                     setPropertyFeatures({
//                       ...propertyFeatures,
//                       newFacility: e.target.value,
//                     })
//                   }
//                 />
//                 <button
//                   type="button"
//                   className="ml-2 bg-indigo-500 text-white px-3 py-1 rounded"
//                   onClick={() => {
//                     if (
//                       propertyFeatures.newFacility &&
//                       !plotCustomFacilities.includes(
//                         propertyFeatures.newFacility.trim()
//                       )
//                     ) {
//                       setPlotCustomFacilities([
//                         ...plotCustomFacilities,
//                         propertyFeatures.newFacility.trim(),
//                       ]);
//                       setPropertyFeatures({
//                         ...propertyFeatures,
//                         newFacility: "",
//                       });
//                     }
//                   }}
//                 >
//                   Add More
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Area Details */}
//           <div className="border-t border-gray-200 pt-4">
//             <h3 className="text-sm font-semibold mb-3 text-slate-800 flex items-center">
//               <FaRulerCombined className="mr-2 text-indigo-600 h-4 w-4" />
//               Area Details
//             </h3>
//             <div className="grid grid-cols-2 gap-3">
//               <div>
//                 <label className="block text-sm font-medium text-slate-600 mb-1">
//                   Plot Area (Sq-yd)
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={areaDetails.plotArea || ""}
//                   onChange={(e) =>
//                     setAreaDetails({
//                       ...areaDetails,
//                       plotArea: e.target.value,
//                     })
//                   }
//                   className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
//                   placeholder="Sq-yd"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-600 mb-1">
//                   Plot Length (yd)
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={areaDetails.plotLength || ""}
//                   onChange={(e) =>
//                     setAreaDetails({
//                       ...areaDetails,
//                       plotLength: e.target.value,
//                     })
//                   }
//                   className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
//                   placeholder="yd"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-600 mb-1">
//                   Plot Breadth (yd)
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={areaDetails.plotBreadth || ""}
//                   onChange={(e) =>
//                     setAreaDetails({
//                       ...areaDetails,
//                       plotBreadth: e.target.value,
//                     })
//                   }
//                   className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
//                   placeholder="yd"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-600 mb-1">
//                   Land Area (sqft)
//                 </label>
//                 <input
//                   type="number"
//                   value={propertyFeatures.landArea || ""}
//                   onChange={(e) =>
//                     setPropertyFeatures({
//                       ...propertyFeatures,
//                       landArea: e.target.value,
//                     })
//                   }
//                   className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
//                   placeholder="sqft"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Additional Information */}
//           <div className="border-t border-gray-200 pt-6">
//             <h3 className="text-lg font-semibold mb-4 text-indigo-700">
//               Additional Information
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Kissama */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Kissama
//                 </label>
//                 <input
//                   type="text"
//                   value={kissama}
//                   onChange={(e) => setKissama(e.target.value)}
//                   className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Enter Kissama details"
//                 />
//               </div>

//               {/* Boundary Type */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Boundary Type
//                 </label>
//                 <select
//                   value={boundary}
//                   onChange={(e) => setBoundary(e.target.value)}
//                   className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value="">Select boundary type</option>
//                   <option value="brick">Brick</option>
//                   <option value="concrete">Concrete</option>
//                   <option value="iron">Iron</option>
//                   <option value="wood">Wood</option>
//                   <option value="none">None</option>
//                 </select>
//               </div>

//               {/* Broker */}
//               <div>
//                 {renderBrokerSelect()}
//               </div>

//               {/* Reference */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Reference
//                 </label>
//                 <select
//                   value={reference}
//                   onChange={(e) => setReference(e.target.value)}
//                   className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value="">Select reference</option>
//                   {brokerList.map((r) => (
//                     <option key={r.id} value={r.id}>
//                       {r.name} - {r.phone}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Staff Engaged */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Staff Engaged (if any)
//                 </label>
//                 <input
//                   type="text"
//                   value={staffEngaged}
//                   onChange={(e) => setStaffEngaged(e.target.value)}
//                   className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Enter staff name or ID"
//                 />
//               </div>

//               {/* Loan Provider */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Loan Provider
//                 </label>
//                 <input
//                   type="text"
//                   value={loanProvider}
//                   onChange={(e) => setLoanProvider(e.target.value)}
//                   className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Enter loan provider name"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Approval Status */}
//           <div className="border-t border-gray-200 pt-6">
//             <h3 className="text-lg font-semibold mb-4 text-indigo-700">
//               Approval Status
//             </h3>
//             <div className="space-y-4">
//               {approvalStatus.map((approval, index) => (
//                 <div
//                   key={index}
//                   className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
//                 >
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Approval Authority
//                     </label>
//                     <input
//                       type="text"
//                       value={approval.authority}
//                       onChange={(e) =>
//                         handleApprovalChange(index, "authority", e.target.value)
//                       }
//                       className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                       placeholder="e.g., RERA, Local Authority"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Status
//                     </label>
//                     <select
//                       value={approval.status}
//                       onChange={(e) =>
//                         handleApprovalChange(index, "status", e.target.value)
//                       }
//                       className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     >
//                       <option value="">Select status</option>
//                       <option value="Approved">Approved</option>
//                       <option value="Pending">Pending</option>
//                       <option value="Rejected">Rejected</option>
//                       <option value="Applied">Applied</option>
//                     </select>
//                   </div>
//                   <div>
//                     {index === approvalStatus.length - 1 ? (
//                       <button
//                         onClick={addApprovalAuthority}
//                         className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md transition duration-300"
//                       >
//                         + Add More
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => removeApprovalAuthority(index)}
//                         className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300"
//                       >
//                         Remove
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Price Details */}
//           <div className=" border-t border-gray-200 pt-4">
//             <h3 className="text-sm font-semibold mb-3 text-slate-800 flex items-center">
//               <FaMoneyBill className="mr-2 text-indigo-600 h-4 w-4" />
//               Price Details
//             </h3>
//             <div className="flex gap-4">
//               <div className="w-1/2">
//                 <label className="block text-sm font-medium text-slate-600 mb-1">
//                   Expected Price (₹)
//                 </label>
//                 <input
//                   type="text"
//                   value={priceDetails.expectedPrice || ""}
//                   onChange={(e) =>
//                     setPriceDetails({
//                       ...priceDetails,
//                       expectedPrice: e.target.value,
//                     })
//                   }
//                   className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
//                   placeholder="e.g., 5000000"
//                 />
//               </div>

//               <div className="w-1/2">
//                 <label className="block text-sm font-medium text-slate-600 mb-1">
//                   Token Amount (₹)
//                 </label>
//                 <input
//                   type="text"
//                   value={priceDetails.tokenAmount || ""}
//                   onChange={(e) =>
//                     setPriceDetails({
//                       ...priceDetails,
//                       tokenAmount: e.target.value,
//                     })
//                   }
//                   className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
//                   placeholder="e.g., 50000"
//                 />
//               </div>
//             </div>

//           </div>

//           {/* Update Button */}
//           <button
//             onClick={updatePlotDetails}
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-xl transition-all duration-200 text-sm font-medium flex items-center justify-center"
//           >
//             <FaCheck className="mr-2 h-3 w-3" />
//             Update Plot Details
//           </button>

//           {/* Clear Selection Button */}
//           <button
//             onClick={() => setSelectedPlot(null)}
//             className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded-xl transition-all duration-200 text-sm font-medium flex items-center justify-center"
//           >
//             <FaTimes className="mr-2 h-3 w-3" />
//             Clear Selection
//           </button>
//         </div>
//       </div>
//     );
//   };

//   // Main render with tab navigation
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white p-4 md:p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Navigation Tabs */}
//         <NavigationTabs />

//         {/* Content based on active tab */}
//         {activeTab === "project-info" && renderProjectInfo()}
//         {activeTab === "revenue-plots" && renderRevenuePlots()}
//         {activeTab === "plots" && renderPlots()}
//       </div>
//     </div>
//   );
// };

// export default PlottingProject;





// import React, { useState, useEffect } from "react";
// import projectService from "./projectService";
// import {
//   FaPlus,
//   FaTrash,
//   FaCheck,
//   FaCheckCircle,
//   FaQuestionCircle,
//   FaRulerCombined,
//   FaList,
//   FaBuilding,
//   FaCalendarAlt,
//   FaMoneyBill,
//   FaSave,
//   FaEdit,
//   FaChevronRight,
//   FaMapMarkerAlt,
//   FaLayerGroup,
//   FaCogs,
//   FaChartLine,
//   FaSortAmountUp,
//   FaInfoCircle,
//   FaArrowRight,
//   FaTimes,
//   FaChevronUp,
//   FaChevronDown,
//   FaArrowLeft,
//   FaEye,
//   FaTable,
//   FaFileAlt,
//   FaPen,
//   FaSave as FaSaveIcon,
//   FaLongArrowAltLeft
// } from "react-icons/fa";

// const PlottingProject = ({
//   projectName,
//   setProjectName,
//   projectType,
//   setProjectType,
//   city,
//   setCity,
//   locality,
//   setLocality,
//   landZone,
//   setLandZone,
//   onSaveProject,
//   PROJECT_TYPES = {
//     APARTMENT: "Apartment",
//     PLOTTING: "Plotting",
//     DUPLEX: "Duplex",
//     TRIPLEX: "Triplex",
//     COMMERCIAL: "Commercial",
//     CUSTOM: "Custom",
//   },
//   editingProjectId,
//   selectedProject,
//   editingPlotId, // NEW: Receive plot ID to edit
// }) => {
//   // Initialize states
//   const [plots, setPlots] = useState([]);
//   const [selectedPlots, setSelectedPlots] = useState([]);
//   const [isCornerPlot, setIsCornerPlot] = useState(false);
//   const [priceDetails, setPriceDetails] = useState({ expectedPrice: "", tokenAmount: "" });
//   const [propertyFeatures, setPropertyFeatures] = useState({ 
//     landArea: "", 
//     propertyStatus: "",
//     hasOuthouse: "",
//     outhouseArea: "",
//     possessionStatus: "",
//     availableFromMonth: "",
//     availableFromYear: "",
//     openSides: "",
//     roadWidth: "",
//     boundaryWall: "",
//     gatedColony: ""
//   });
//   const [areaDetails, setAreaDetails] = useState({ plotArea: "", plotLength: "", plotBreadth: "" });
//   const [kissama, setKissama] = useState("");
//   const [purchaser, setPurchaser] = useState("");
//   const [constructor, setConstructor] = useState("");

//   // Revenue plots state
//   const [revenuePlots, setRevenuePlots] = useState(0);
//   const [plotsData, setPlotsData] = useState([]);
//   const [attachment, setAttachment] = useState(null);

//   // Manual inputs for adding plots
//   const [manualPlotCount, setManualPlotCount] = useState(0);

//   // Additional plot details states
//   const [boundary, setBoundary] = useState("");
//   const [reference, setReference] = useState("");
//   const [staffEngaged, setStaffEngaged] = useState("");
//   const [loanProvider, setLoanProvider] = useState("");
//   const [plotCustomFacilities, setPlotCustomFacilities] = useState([]);
//   const [approvalStatus, setApprovalStatus] = useState([{ authority: "", status: "" }]);
//   const [brokerList] = useState([
//     { id: 1, name: "Broker 1", phone: "9999999999" },
//     { id: 2, name: "Broker 2", phone: "8888888888" },
//   ]);

//   // New states for table view and editing mode
//   const [showTableOverview, setShowTableOverview] = useState(false);
//   const [editingPlotIdInternal, setEditingPlotIdInternal] = useState(null);
//   const [currentPlotData, setCurrentPlotData] = useState(null);
//   const [directEditMode, setDirectEditMode] = useState(false); // NEW: Track if we came from overview

//   // FACILITIES constant
//   const FACILITIES = [
//     { key: "parking", label: "Parking" },
//     { key: "gym", label: "Gym" },
//     { key: "pool", label: "Swimming Pool" },
//     { key: "garden", label: "Garden" },
//     { key: "security", label: "Security" },
//     { key: "elevator", label: "Elevator" },
//   ];

//   // Tab navigation
//   const [activeTab, setActiveTab] = useState("project-info");

//   // Load existing project data
//   useEffect(() => {
//     if (selectedProject && editingProjectId) {
//       const projectData = selectedProject;
//       const plotsFromProject = projectData.plots || [];
//       setPlots(plotsFromProject);
      
//       // Check if we have a specific plot to edit (coming from overview)
//       if (editingPlotId && plotsFromProject.length > 0) {
//         const plotToEdit = plotsFromProject.find(p => p.id === editingPlotId);
//         if (plotToEdit) {
//           console.log("Found plot to edit directly:", plotToEdit.name);
//           setDirectEditMode(true);
//           setEditingPlotIdInternal(editingPlotId);
//           setCurrentPlotData(plotToEdit);
//           loadPlotDataForEditing(plotToEdit);
          
//           // Mark this plot as being edited
//           const updatedPlots = plotsFromProject.map(plot => ({
//             ...plot,
//             isBeingEdited: plot.id === editingPlotId
//           }));
//           setPlots(updatedPlots);
          
//           // Go directly to plots tab and edit mode
//           setTimeout(() => {
//             setActiveTab("plots");
//             setSelectedPlots([editingPlotId]);
//           }, 100);
//         }
//       }
//     }
//   }, [selectedProject, editingProjectId, editingPlotId]);

//   // Load plot data when editingPlotIdInternal changes
//   useEffect(() => {
//     if (editingPlotIdInternal) {
//       const plotToEdit = plots.find(p => p.id === editingPlotIdInternal);
//       if (plotToEdit) {
//         setCurrentPlotData(plotToEdit);
//         loadPlotDataForEditing(plotToEdit);
//       }
//     }
//   }, [editingPlotIdInternal, plots]);

//   // Generate unique ID
//   const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

//   // Handle approval status changes
//   const handleApprovalChange = (index, field, value) => {
//     const updatedApprovals = [...approvalStatus];
//     updatedApprovals[index] = { ...updatedApprovals[index], [field]: value };
//     setApprovalStatus(updatedApprovals);
//   };

//   // Add new approval authority
//   const addApprovalAuthority = () => {
//     setApprovalStatus([...approvalStatus, { authority: "", status: "" }]);
//   };

//   // Remove approval authority
//   const removeApprovalAuthority = (index) => {
//     setApprovalStatus(approvalStatus.filter((_, i) => i !== index));
//   };

//   // Render broker select
//   const renderBrokerSelect = () => (
//     <div>
//       <label className="block text-sm font-medium text-slate-600 mb-1">
//         Broker
//       </label>
//       <select
//         value={reference}
//         onChange={(e) => setReference(e.target.value)}
//         className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//       >
//         <option value="">Select broker</option>
//         {brokerList.map((broker) => (
//           <option key={broker.id} value={broker.id}>
//             {broker.name} - {broker.phone}
//           </option>
//         ))}
//       </select>
//     </div>
//   );

//   // Save project handler
//   const handleSaveProject = async () => {
//     if (!projectName || !projectType) {
//       alert("Please enter project name and type");
//       return;
//     }

//     try {
//       const projectData = {
//         name: projectName,
//         type: projectType,
//         city,
//         locality,
//         landZone,
//         plots: [...plots],
//         revenuePlots: revenuePlots,
//         plotsData: plotsData
//       };

//       if (editingProjectId) {
//         await projectService.updatePlotting(editingProjectId, projectData);
//         alert("Plotting project updated successfully!");
//       } else {
//         const response = await projectService.createPlotting(projectData);
//         alert(`Plotting project created successfully with ID: ${response.id}`);
//       }

//       if (onSaveProject) {
//         onSaveProject(projectData);
//       }
//     } catch (error) {
//       console.error("Error saving plotting project:", error);
//       alert("Failed to save project.");
//     }
//   };

//   // Add multiple plots
//   const addMultiplePlots = () => {
//     if (manualPlotCount <= 0) {
//       alert("Please enter a valid number of plots");
//       return;
//     }

//     const newPlots = [];
//     for (let i = 1; i <= manualPlotCount; i++) {
//       const plotNumber = plots.length + i;
//       const plotName = `Plot ${plotNumber}`;

//       const newPlot = {
//         id: generateId(),
//         name: plotName,
//         isCornerPlot: false,
//         priceDetails: { expectedPrice: "", tokenAmount: "" },
//         propertyFeatures: { 
//           landArea: "", 
//           propertyStatus: "",
//           hasOuthouse: "",
//           outhouseArea: "",
//           possessionStatus: "",
//           availableFromMonth: "",
//           availableFromYear: "",
//           openSides: "",
//           roadWidth: "",
//           boundaryWall: "",
//           gatedColony: ""
//         },
//         areaDetails: { plotArea: "", plotLength: "", plotBreadth: "" },
//         kissama: "",
//         purchaser: "",
//         constructor: "",
//         isComplete: false,
//         status: "draft",
//         isBeingEdited: false,
//         lastSaved: null,
//       };
//       newPlots.push(newPlot);
//     }

//     setPlots([...plots, ...newPlots]);
//     setManualPlotCount(0);
//     alert(`Added ${manualPlotCount} plots successfully!`);
//   };

//   // Handle plot selection for editing
//   const handlePlotSelection = (plotId, isChecked) => {
//     if (isChecked) {
//       setSelectedPlots(prev => [...prev, plotId]);
//     } else {
//       setSelectedPlots(prev => prev.filter(id => id !== plotId));
//     }
//   };

//   // Start editing multiple plots
//   const startMultiPlotEditing = () => {
//     if (selectedPlots.length === 0) {
//       alert("Please select at least one plot to edit");
//       return;
//     }
    
//     // Mark selected plots as being edited
//     const updatedPlots = plots.map(plot => ({
//       ...plot,
//       isBeingEdited: selectedPlots.includes(plot.id)
//     }));
    
//     setPlots(updatedPlots);
//     setShowTableOverview(true);
//   };

//   // Navigate to edit a specific plot from table
//   const navigateToPlotEdit = (plotId) => {
//     setShowTableOverview(false);
//     setEditingPlotIdInternal(plotId);
//     setDirectEditMode(false);
//   };

//   // Load plot data for editing
//   const loadPlotDataForEditing = (plot) => {
//     setIsCornerPlot(plot.isCornerPlot || false);
//     setPriceDetails({
//       expectedPrice: plot.priceDetails?.expectedPrice || "",
//       tokenAmount: plot.priceDetails?.tokenAmount || ""
//     });
//     setPropertyFeatures({
//       landArea: plot.propertyFeatures?.landArea || "",
//       propertyStatus: plot.propertyFeatures?.propertyStatus || "",
//       hasOuthouse: plot.propertyFeatures?.hasOuthouse || "",
//       outhouseArea: plot.propertyFeatures?.outhouseArea || "",
//       possessionStatus: plot.propertyFeatures?.possessionStatus || "",
//       availableFromMonth: plot.propertyFeatures?.availableFromMonth || "",
//       availableFromYear: plot.propertyFeatures?.availableFromYear || "",
//       openSides: plot.propertyFeatures?.openSides || "",
//       roadWidth: plot.propertyFeatures?.roadWidth || "",
//       boundaryWall: plot.propertyFeatures?.boundaryWall || "",
//       gatedColony: plot.propertyFeatures?.gatedColony || "",
//     });
//     setAreaDetails({
//       plotArea: plot.areaDetails?.plotArea || "",
//       plotLength: plot.areaDetails?.plotLength || "",
//       plotBreadth: plot.areaDetails?.plotBreadth || ""
//     });
//     setKissama(plot.kissama || "");
//     setPurchaser(plot.purchaser || "");
//     setConstructor(plot.constructor || "");
//   };

//   // Save current plot and continue editing
//   const saveCurrentPlot = () => {
//     if (!editingPlotIdInternal) return;

//     const updatedPlots = plots.map((plot) => {
//       if (plot.id === editingPlotIdInternal) {
//         const updatedPlot = {
//           ...plot,
//           isCornerPlot,
//           priceDetails,
//           propertyFeatures,
//           areaDetails,
//           kissama,
//           purchaser,
//           constructor,
//           isBeingEdited: false, // Clear editing flag when saved
//           lastSaved: new Date().toISOString(),
//         };
//         updatedPlot.isComplete = !!(
//           priceDetails.expectedPrice &&
//           areaDetails.plotArea &&
//           purchaser &&
//           constructor
//         );
//         return updatedPlot;
//       }
//       return plot;
//     });

//     setPlots(updatedPlots);
//     alert("Plot details saved!");
    
//     // If we came from direct edit mode, go to table view
//     if (directEditMode) {
//       setShowTableOverview(true);
//       setDirectEditMode(false);
//     } else {
//       // Otherwise go back to table view
//       setShowTableOverview(true);
//     }
    
//     setEditingPlotIdInternal(null);
//     setCurrentPlotData(null);
//     setSelectedPlots([]);
//   };

//   // Complete editing and return to main view
//   const completeMultiPlotEditing = () => {
//     // Clear editing flags
//     const updatedPlots = plots.map(plot => ({
//       ...plot,
//       isBeingEdited: false
//     }));
    
//     setPlots(updatedPlots);
//     setSelectedPlots([]);
//     setShowTableOverview(false);
//     setEditingPlotIdInternal(null);
//     setCurrentPlotData(null);
//     setDirectEditMode(false);
//     alert("Plot editing completed!");
//   };

//   // Remove plot
//   const removePlot = (plotId) => {
//     if (window.confirm("Are you sure you want to remove this plot?")) {
//       const updatedPlots = plots.filter(plot => plot.id !== plotId);
//       setPlots(updatedPlots);
//       setSelectedPlots(prev => prev.filter(id => id !== plotId));
//       alert("Plot removed successfully!");
//     }
//   };

//   // Revenue plot handlers
//   const handlePlotChange = (index, field, value) => {
//     const updatedPlotsData = [...plotsData];
//     if (!updatedPlotsData[index]) {
//       updatedPlotsData[index] = {};
//     }
//     updatedPlotsData[index][field] = value;
//     setPlotsData(updatedPlotsData);
//   };

//   const handlePlotFileChange = (index, file) => {
//     const updatedPlotsData = [...plotsData];
//     if (!updatedPlotsData[index]) {
//       updatedPlotsData[index] = {};
//     }
//     updatedPlotsData[index].fileName = file ? file.name : "";
//     updatedPlotsData[index].file = file;
//     setPlotsData(updatedPlotsData);
//   };

//   const calculateTotalPlotsArea = () => {
//     return plotsData.reduce((total, plot) => {
//       return total + (parseFloat(plot?.area) || 0);
//     }, 0);
//   };

//   const getFilledPlotsCount = () => {
//     return plotsData.filter(
//       (plot) => plot && (plot.area || plot.entryPlotNo || plot.khataNo)
//     ).length;
//   };

//   // Handle save revenue plots and go to next tab
//   const handleSaveRevenuePlots = () => {
//     alert("Revenue plots saved successfully!");
//     setActiveTab("plots");
//   };

//   // Navigation Tabs Component
//   const NavigationTabs = () => (
//     <div className="bg-white rounded-xl border border-slate-200 p-1 mb-6 shadow-sm">
//       <div className="flex flex-wrap gap-1">
//         <button
//           onClick={() => setActiveTab("project-info")}
//           className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 ${activeTab === "project-info"
//             ? "bg-indigo-600 text-white shadow-md"
//             : "text-slate-600 hover:bg-slate-100"
//             }`}
//         >
//           <FaBuilding className="mr-2 h-4 w-4" />
//           Project Info
//         </button>

//         <button
//           onClick={() => setActiveTab("revenue-plots")}
//           className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 ${activeTab === "revenue-plots"
//             ? "bg-indigo-600 text-white shadow-md"
//             : "text-slate-600 hover:bg-slate-100"
//             }`}
//         >
//           <FaChartLine className="mr-2 h-4 w-4" />
//           Revenue Plots
//         </button>

//         <button
//           onClick={() => setActiveTab("plots")}
//           className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 ${activeTab === "plots"
//             ? "bg-indigo-600 text-white shadow-md"
//             : "text-slate-600 hover:bg-slate-100"
//             }`}
//         >
//           <FaLayerGroup className="mr-2 h-4 w-4" />
//           Plots & Details
//         </button>
//       </div>
//     </div>
//   );

//   // Enhanced Project Info Section
//   const renderProjectInfo = () => (
//     <div className="space-y-6">
//       {/* Project Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
//           <div className="flex items-center">
//             <div className={`p-3 rounded-lg bg-indigo-50 mr-4`}>
//               <FaLayerGroup className="h-6 w-6 text-indigo-600" />
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-slate-900">{plots.length}</div>
//               <div className="text-sm text-slate-500">Total Plots</div>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
//           <div className="flex items-center">
//             <div className={`p-3 rounded-lg bg-emerald-50 mr-4`}>
//               <FaChartLine className="h-6 w-6 text-emerald-600" />
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-slate-900">{revenuePlots}</div>
//               <div className="text-sm text-slate-500">Revenue Plots</div>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
//           <div className="flex items-center">
//             <div className={`p-3 rounded-lg bg-blue-50 mr-4`}>
//               <FaCheckCircle className="h-6 w-6 text-blue-600" />
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-slate-900">{plots.filter(p => p.isComplete).length}</div>
//               <div className="text-sm text-slate-500">Completed Plots</div>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
//           <div className="flex items-center">
//             <div className={`p-3 rounded-lg bg-amber-50 mr-4`}>
//               <FaRulerCombined className="h-6 w-6 text-amber-600" />
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-slate-900">{calculateTotalPlotsArea()} sq.ft</div>
//               <div className="text-sm text-slate-500">Total Area</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Project Basic Info */}
//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
//           <h2 className="text-lg font-semibold mb-4 text-slate-800 flex items-center">
//             <FaBuilding className="mr-2 text-indigo-600 h-5 w-5" />
//             Project Information
//           </h2>

//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center">
//                 <span className="text-red-500 mr-1">*</span>
//                 Project Name
//               </label>
//               <input
//                 type="text"
//                 value={projectName}
//                 onChange={(e) => setProjectName(e.target.value)}
//                 className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//                 placeholder="Enter project name"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center">
//                 <span className="text-red-500 mr-1">*</span>
//                 Project Type
//               </label>
//               <select
//                 value={projectType}
//                 onChange={(e) => setProjectType(e.target.value)}
//                 className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none bg-white"
//               >
//                 <option value="">Select project type</option>
//                 {Object.values(PROJECT_TYPES).map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
//           <h2 className="text-lg font-semibold mb-4 text-slate-800 flex items-center">
//             <FaMapMarkerAlt className="mr-2 text-indigo-600 h-5 w-5" />
//             Property Location
//           </h2>

//           <div className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">
//                   City
//                 </label>
//                 <input
//                   type="text"
//                   value={city}
//                   onChange={(e) => setCity(e.target.value)}
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//                   placeholder="Enter City"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">
//                   Locality
//                 </label>
//                 <input
//                   type="text"
//                   value={locality}
//                   onChange={(e) => setLocality(e.target.value)}
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//                   placeholder="Enter Locality"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">
//                   Land Zone
//                 </label>
//                 <input
//                   type="text"
//                   value={landZone}
//                   onChange={(e) => setLandZone(e.target.value)}
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//                   placeholder="Enter Land Zone"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center">
//                   <FaRulerCombined className="mr-2 text-slate-400 h-4 w-4" />
//                   Total Land Area (sq. ft)
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={propertyFeatures.landArea}
//                   onChange={(e) => setPropertyFeatures({...propertyFeatures, landArea: e.target.value})}
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//                   placeholder="Enter total land area"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Next Button at bottom */}
//       <div className="pt-6">
//         <button
//           onClick={() => setActiveTab('revenue-plots')}
//           className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg transition-all duration-200"
//         >
//           <span>Continue to Revenue Plots</span>
//           <FaChevronRight className="h-5 w-5" />
//         </button>
//       </div>
//     </div>
//   );

//   // Enhanced Revenue Plots Section
//   const renderRevenuePlots = () => (
//     <div className="space-y-6">
//       {/* Navigation Back Button */}
//       <button
//         onClick={() => setActiveTab('project-info')}
//         className="flex items-center text-slate-600 hover:text-slate-800 hover:bg-slate-100 px-4 py-2 rounded-lg transition-all duration-200"
//       >
//         <FaArrowLeft className="mr-2 h-4 w-4" />
//         Back to Project Info
//       </button>

//       <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
//         <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
//           <FaChartLine className="mr-3 text-indigo-600" />
//           Revenue Plots Configuration
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Total Number of Revenue Plots
//             </label>
//             <input
//               type="number"
//               min="0"
//               max="50"
//               value={revenuePlots}
//               onChange={(e) => setRevenuePlots(parseInt(e.target.value) || 0)}
//               className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//               placeholder="Enter total plots"
//             />
//           </div>

//           <div className="md:col-span-3">
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Upload Attachment (if any)
//             </label>
//             <input
//               type="file"
//               onChange={(e) => setAttachment(e.target.files[0])}
//               className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//             />
//             {attachment && (
//               <p className="text-sm text-emerald-600 mt-2">
//                 ✓ {attachment.name}
//               </p>
//             )}
//           </div>
//         </div>

//         {revenuePlots > 0 && (
//           <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 mt-6">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-semibold text-slate-800">
//                 Revenue Plot Details ({revenuePlots} {revenuePlots === 1 ? "Plot" : "Plots"})
//               </h3>
//               <span className="text-sm text-slate-500">
//                 Enter details for each revenue plot
//               </span>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               {Array.from({ length: revenuePlots }, (_, index) => (
//                 <div
//                   key={index}
//                   className="bg-white rounded-xl border border-slate-300 p-4 space-y-4 hover:shadow-md transition-shadow duration-200"
//                 >
//                   <div className="flex items-center justify-between border-b border-slate-200 pb-3">
//                     <h5 className="font-semibold text-slate-800">
//                       Plot {index + 1}
//                     </h5>
//                     <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
//                       #{index + 1}
//                     </span>
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-slate-600 mb-1">
//                       Plot Area (sq. ft)
//                     </label>
//                     <input
//                       type="number"
//                       min="0"
//                       value={plotsData[index]?.area || ""}
//                       onChange={(e) =>
//                         handlePlotChange(index, "area", e.target.value)
//                       }
//                       className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//                       placeholder="Enter area"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-slate-600 mb-1">
//                       Entry Plot No.
//                     </label>
//                     <input
//                       type="text"
//                       value={plotsData[index]?.entryPlotNo || ""}
//                       onChange={(e) =>
//                         handlePlotChange(index, "entryPlotNo", e.target.value)
//                       }
//                       className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//                       placeholder="Enter plot number"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-slate-600 mb-1">
//                       Khata No.
//                     </label>
//                     <input
//                       type="text"
//                       value={plotsData[index]?.khataNo || ""}
//                       onChange={(e) =>
//                         handlePlotChange(index, "khataNo", e.target.value)
//                       }
//                       className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//                       placeholder="Enter khata number"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-slate-600 mb-1">
//                       Plot Document
//                     </label>
//                     <input
//                       type="file"
//                       onChange={(e) =>
//                         handlePlotFileChange(index, e.target.files[0])
//                       }
//                       className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//                     />
//                     {plotsData[index]?.fileName && (
//                       <p className="text-xs text-emerald-600 mt-2 truncate">
//                         ✓ {plotsData[index].fileName}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Summary Card */}
//             <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h4 className="text-lg font-semibold text-indigo-800">
//                     Summary
//                   </h4>
//                   <p className="text-sm text-indigo-600 mt-1">
//                     Total Plots Area: <span className="font-bold">{calculateTotalPlotsArea()}</span> sq. ft
//                   </p>
//                   <p className="text-sm text-slate-600 mt-1">
//                     {getFilledPlotsCount()} of {revenuePlots} plots filled
//                   </p>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <button
//                     onClick={handleSaveRevenuePlots}
//                     className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center"
//                   >
//                     <FaSave className="mr-2" />
//                     Save Revenue Plots & Continue
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Next Button at bottom if no revenue plots */}
//         {revenuePlots === 0 && (
//           <div className="pt-6">
//             <button
//               onClick={() => setActiveTab('plots')}
//               className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg transition-all duration-200"
//             >
//               <span>Continue to Plots & Details</span>
//               <FaChevronRight className="h-5 w-5" />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   // Table Overview Component for multiple plot editing
//   const renderTableOverview = () => {
//     const selectedPlotData = plots.filter(plot => selectedPlots.includes(plot.id));
    
//     return (
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setShowTableOverview(false)}
//               className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
//             >
//               <FaArrowLeft />
//             </button>
//             <div>
//               <h2 className="text-xl font-bold text-slate-900">Plot Editing Overview</h2>
//               <p className="text-slate-500 text-sm">
//                 {selectedPlots.length} plot(s) selected for editing
//               </p>
//             </div>
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={completeMultiPlotEditing}
//               className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center"
//             >
//               <FaCheck className="mr-2" />
//               Complete Editing
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-slate-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
//                     Plot
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
//                     Area Details
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
//                     Price
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
//                     Last Saved
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {selectedPlotData.map((plot) => (
//                   <tr 
//                     key={plot.id} 
//                     className={`hover:bg-slate-50 transition-colors ${
//                       plot.isBeingEdited 
//                         ? 'bg-blue-50' 
//                         : plot.lastSaved 
//                           ? 'bg-white' 
//                           : 'bg-slate-50/30 opacity-60'
//                     }`}
//                   >
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0 h-10 w-10">
//                           <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
//                             plot.isBeingEdited 
//                               ? 'bg-blue-100' 
//                               : plot.lastSaved 
//                                 ? 'bg-emerald-100' 
//                                 : 'bg-slate-200'
//                           }`}>
//                             <FaLayerGroup className={`h-5 w-5 ${
//                               plot.isBeingEdited 
//                                 ? 'text-blue-600' 
//                                 : plot.lastSaved 
//                                   ? 'text-emerald-600' 
//                                   : 'text-slate-400'
//                             }`} />
//                           </div>
//                         </div>
//                         <div className="ml-4">
//                           <div className={`text-sm font-medium ${
//                             plot.isBeingEdited 
//                               ? 'text-blue-900 font-bold' 
//                               : plot.lastSaved 
//                                 ? 'text-slate-900' 
//                                 : 'text-slate-500 italic'
//                           }`}>
//                             {plot.name}
//                           </div>
//                           <div className="text-xs text-slate-500">
//                             {plot.isCornerPlot ? 'Corner Plot' : 'Regular Plot'}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className={`text-sm ${
//                         plot.areaDetails?.plotArea 
//                           ? 'text-slate-900' 
//                           : 'text-slate-500 italic'
//                       }`}>
//                         {plot.areaDetails?.plotArea ? `${plot.areaDetails.plotArea} sq-yd` : 'Not set'}
//                       </div>
//                       {plot.areaDetails?.plotLength && plot.areaDetails?.plotBreadth && (
//                         <div className="text-xs text-slate-500">
//                           {plot.areaDetails.plotLength} × {plot.areaDetails.plotBreadth} yd
//                         </div>
//                       )}
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className={`text-sm ${
//                         plot.priceDetails?.expectedPrice 
//                           ? 'text-slate-900' 
//                           : 'text-slate-500 italic'
//                       }`}>
//                         {plot.priceDetails?.expectedPrice 
//                           ? `₹${parseInt(plot.priceDetails.expectedPrice).toLocaleString()}` 
//                           : 'Not set'
//                         }
//                       </div>
//                       {plot.priceDetails?.tokenAmount && (
//                         <div className="text-xs text-slate-500">
//                           Token: ₹{parseInt(plot.priceDetails.tokenAmount).toLocaleString()}
//                         </div>
//                       )}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
//                         plot.isBeingEdited 
//                           ? 'bg-blue-100 text-blue-800' 
//                           : plot.lastSaved 
//                             ? 'bg-emerald-100 text-emerald-800' 
//                             : 'bg-slate-100 text-slate-500 italic'
//                       }`}>
//                         {plot.isBeingEdited ? 'Being Edited' : plot.lastSaved ? 'Saved' : 'Not Edited'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-slate-500">
//                       {plot.lastSaved 
//                         ? new Date(plot.lastSaved).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
//                         : 'Never'
//                       }
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => navigateToPlotEdit(plot.id)}
//                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                           title="Edit this plot"
//                         >
//                           <FaPen />
//                         </button>
//                         <button
//                           onClick={() => {
//                             alert(`Plot Details:\n\nName: ${plot.name}\nArea: ${plot.areaDetails?.plotArea || 'N/A'} sq-yd\nPrice: ${plot.priceDetails?.expectedPrice || 'N/A'}\nPurchaser: ${plot.purchaser || 'N/A'}\nConstructor: ${plot.constructor || 'N/A'}\nStatus: ${plot.isComplete ? 'Complete' : 'In Progress'}`);
//                           }}
//                           className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
//                           title="View details"
//                         >
//                           <FaEye />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Instructions */}
//         <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
//           <div className="flex items-start gap-3">
//             <FaInfoCircle className="text-blue-600 mt-1" />
//             <div>
//               <h4 className="font-semibold text-blue-800 mb-1">How to Edit Multiple Plots</h4>
//               <ul className="text-sm text-blue-700 space-y-1">
//                 <li>• Click on a plot's <FaPen className="inline text-xs" /> icon to edit it</li>
//                 <li>• Plots with <span className="italic text-slate-500">blurry text</span> haven't been edited yet</li>
//                 <li>• Blue highlighted rows indicate plots currently being edited</li>
//                 <li>• Green rows indicate plots that have been saved</li>
//                 <li>• Click "Complete Editing" when you're done with all plots</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Enhanced Plots Section with multi-edit functionality
//   const renderPlots = () => {
//     // If showing table overview
//     if (showTableOverview) {
//       return renderTableOverview();
//     }

//     // If editing a specific plot (from overview or direct click)
//     if (editingPlotIdInternal || (directEditMode && currentPlotData)) {
//       return (
//         <div className="space-y-6">
//           {/* Navigation Header */}
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => {
//                   setShowTableOverview(true);
//                   setEditingPlotIdInternal(null);
//                   setCurrentPlotData(null);
//                   setDirectEditMode(false);
//                 }}
//                 className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
//               >
//                 <FaArrowLeft />
//               </button>
//               <div>
//                 <h2 className="text-xl font-bold text-slate-900">Editing: {currentPlotData?.name || 'Plot'}</h2>
//                 <p className="text-slate-500 text-sm">
//                   Make changes and save to continue editing other plots
//                 </p>
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <button
//                 onClick={saveCurrentPlot}
//                 className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center"
//               >
//                 <FaSaveIcon className="mr-2" />
//                 Save & Return
//               </button>
//             </div>
//           </div>

//           {/* Render the plot details panel */}
//           {renderPlotDetailsPanel(true)}
//         </div>
//       );
//     }

//     // Default plots list view
//     return (
//       <div className="space-y-6">
//         {/* Navigation Back Button */}
//         <button
//           onClick={() => setActiveTab('revenue-plots')}
//           className="flex items-center text-slate-600 hover:text-slate-800 hover:bg-slate-100 px-4 py-2 rounded-lg transition-all duration-200"
//         >
//           <FaArrowLeft className="mr-2 h-4 w-4" />
//           Back to Revenue Plots
//         </button>

//         {/* Direct Edit Mode Notice */}
//         {directEditMode && (
//           <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
//             <div className="flex items-center gap-3">
//               <FaInfoCircle className="text-blue-600" />
//               <div>
//                 <h4 className="font-semibold text-blue-800">Direct Edit Mode</h4>
//                 <p className="text-sm text-blue-700">
//                   You came here directly from the Plot Editing Overview. Select a plot from the list or go to table view.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Split Layout: Plots List on Left, Details on Right */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column: Plots List */}
//           <div className="lg:col-span-1 space-y-6">
//             {/* Multi-Edit Controls */}
//             {selectedPlots.length > 0 && (
//               <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <h3 className="text-lg font-semibold text-blue-900 flex items-center">
//                     <FaTable className="mr-2" />
//                     {selectedPlots.length} Plot(s) Selected
//                   </h3>
//                   <button
//                     onClick={() => setSelectedPlots([])}
//                     className="text-sm text-blue-700 hover:text-blue-900"
//                   >
//                     Clear All
//                   </button>
//                 </div>
//                 <button
//                   onClick={startMultiPlotEditing}
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center font-medium"
//                 >
//                   <FaEdit className="mr-2" />
//                   Edit Selected Plots in Table View
//                 </button>
//               </div>
//             )}

//             {/* Add Multiple Plots Section */}
//             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
//               <h3 className="text-lg font-semibold mb-4 text-slate-800 flex items-center">
//                 <FaSortAmountUp className="mr-2 text-indigo-600 h-5 w-5" />
//                 Add Multiple Plots
//               </h3>
//               <div className="flex items-center space-x-4">
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium text-slate-700 mb-1">
//                     Number of Plots to Add
//                   </label>
//                   <div className="flex items-center space-x-2">
//                     <input
//                       type="number"
//                       min="1"
//                       max="50"
//                       value={manualPlotCount}
//                       onChange={(e) => setManualPlotCount(parseInt(e.target.value) || 0)}
//                       className="flex-1 border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//                       placeholder="Enter number of plots"
//                     />
//                     <button
//                       onClick={addMultiplePlots}
//                       className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center"
//                     >
//                       <FaPlus className="mr-2 h-4 w-4" />
//                       Add Plots
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Plots List with Checkboxes */}
//             <div className="space-y-2">
//               {plots.length === 0 ? (
//                 <div className="bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 p-12 text-center">
//                   <FaLayerGroup className="mx-auto h-16 w-16 text-slate-300 mb-4" />
//                   <h3 className="text-lg font-semibold text-slate-700 mb-2">No Plots Created</h3>
//                   <p className="text-slate-500 mb-4">Start by adding plots to the project</p>
//                   <div className="flex items-center justify-center space-x-4">
//                     <input
//                       type="number"
//                       min="1"
//                       max="50"
//                       value={manualPlotCount}
//                       onChange={(e) => setManualPlotCount(parseInt(e.target.value) || 0)}
//                       className="w-32 border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//                       placeholder="Number"
//                     />
//                     <button
//                       onClick={addMultiplePlots}
//                       className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg transition-all duration-200 flex items-center"
//                     >
//                       <FaPlus className="mr-2 h-4 w-4" />
//                       Add Plots
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 plots.map((plot) => (
//                   <div
//                     key={plot.id}
//                     className={`bg-white rounded-xl border-2 shadow-sm overflow-hidden transition-all duration-200 ${selectedPlots.includes(plot.id)
//                       ? 'border-blue-500 shadow-lg'
//                       : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
//                       }`}
//                   >
//                     {/* Plot Header with Checkbox */}
//                     <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-white">
//                       <div className="flex items-center space-x-4">
//                         <input
//                           type="checkbox"
//                           checked={selectedPlots.includes(plot.id)}
//                           onChange={(e) => handlePlotSelection(plot.id, e.target.checked)}
//                           className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
//                         />
//                         <div className={`p-2 rounded-lg ${plot.isComplete ? 'bg-emerald-100' : 'bg-indigo-100'}`}>
//                           <FaLayerGroup className={`h-4 w-4 ${plot.isComplete ? 'text-emerald-600' : 'text-indigo-600'}`} />
//                         </div>
//                         <div>
//                           <div className="flex items-center space-x-3">
//                             <h3 className="text-md font-semibold text-slate-900">{plot.name}</h3>
//                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${plot.isComplete ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
//                               }`}>
//                               {plot.isComplete ? 'Complete' : 'In Progress'}
//                             </span>
//                           </div>
//                           <div className="text-sm text-slate-500 mt-1">
//                             Area: {plot.areaDetails?.plotArea || '0'} Sq-yd
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => {
//                             setSelectedPlots([plot.id]);
//                             startMultiPlotEditing();
//                           }}
//                           className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                           title="Edit this plot"
//                         >
//                           <FaPen size={12} />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Right Column: Plot Details Panel */}
//           <div className="lg:col-span-2">
//             {selectedPlots.length === 1 ? (
//               // Show details for single selected plot
//               (() => {
//                 const plot = plots.find(p => p.id === selectedPlots[0]);
//                 return plot ? renderPlotDetailsPanel(false, plot) : (
//                   <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">
//                     <div className="text-center py-12">
//                       <FaBuilding className="mx-auto h-16 w-16 text-indigo-300 mb-4" />
//                       <h3 className="text-lg font-semibold text-slate-900 mb-2">
//                         Select a Plot
//                       </h3>
//                       <p className="text-slate-500 mb-4">
//                         Select a plot to view and edit detailed information
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })()
//             ) : (
//               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">
//                 <div className="text-center py-12">
//                   <FaTable className="mx-auto h-16 w-16 text-indigo-300 mb-4" />
//                   <h3 className="text-lg font-semibold text-slate-900 mb-2">
//                     {selectedPlots.length === 0 ? 'Select Plots' : 'Multiple Plots Selected'}
//                   </h3>
//                   <p className="text-slate-500 mb-4">
//                     {selectedPlots.length === 0 
//                       ? 'Select one or more plots to edit them together' 
//                       : `${selectedPlots.length} plots selected. Click "Edit Selected Plots" to edit them in table view.`
//                     }
//                   </p>
//                   {selectedPlots.length > 0 && (
//                     <button
//                       onClick={startMultiPlotEditing}
//                       className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center mx-auto"
//                     >
//                       <FaEdit className="mr-2" />
//                       Edit {selectedPlots.length} Selected Plots
//                     </button>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Save Project Button at bottom */}
//         <div className="pt-6">
//           <button
//             onClick={handleSaveProject}
//             className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg transition-all duration-200"
//           >
//             <FaSave className="mr-2 h-5 w-5" />
//             <span>Save Complete Project</span>
//           </button>
//         </div>
//       </div>
//     );
//   };

//   // Plot Details Panel
//   const renderPlotDetailsPanel = (isInEditMode = false, plot = null) => {
//     const currentPlot = plot || currentPlotData;
    
//     if (!currentPlot && !isInEditMode) {
//       return (
//         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">
//           <div className="text-center py-12">
//             <FaBuilding className="mx-auto h-16 w-16 text-indigo-300 mb-4" />
//             <h3 className="text-lg font-semibold text-slate-900 mb-2">
//               {isInEditMode ? 'No Plot Selected' : 'Select a Plot'}
//             </h3>
//             <p className="text-slate-500 mb-4">
//               {isInEditMode 
//                 ? 'Return to table view to select a plot' 
//                 : 'Select a plot from the list to view and edit details'}
//             </p>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full plot-details-panel">
//         {!isInEditMode && (
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h2 className="text-xl font-bold text-slate-900">{currentPlot.name}</h2>
//               <p className="text-slate-500 text-sm">
//                 Plot ID: {currentPlot.id}
//               </p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <span className={`px-2 py-1 rounded-full text-xs font-medium ${currentPlot.isComplete
//                 ? "bg-emerald-100 text-emerald-800"
//                 : "bg-indigo-100 text-indigo-800"
//                 }`}>
//                 {currentPlot.isComplete ? "Complete" : "In Progress"}
//               </span>
//               <span className={`px-2 py-1 rounded-full text-xs font-medium ${isCornerPlot
//                 ? "bg-amber-100 text-amber-800"
//                 : "bg-blue-100 text-blue-800"
//                 }`}>
//                 {isCornerPlot ? "Corner Plot" : "Regular Plot"}
//               </span>
//             </div>
//           </div>
//         )}

//         <div className="space-y-6">
//           {/* Corner Plot Selection */}
//           <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
//             <h3 className="text-sm font-semibold mb-3 text-slate-800 flex items-center">
//               <FaQuestionCircle className="mr-2 text-indigo-600 h-4 w-4" />
//               Plot Configuration
//             </h3>
//             <div className="space-y-3">
//               <div>
//                 <label className="block text-xs font-medium text-slate-600 mb-2">
//                   Is this a corner plot?
//                 </label>
//                 <div className="flex space-x-4">
//                   <label className="inline-flex items-center cursor-pointer">
//                     <input
//                       type="radio"
//                       checked={isCornerPlot}
//                       onChange={() => setIsCornerPlot(true)}
//                       className="text-indigo-600 focus:ring-indigo-500 h-3 w-3"
//                     />
//                     <span className="ml-2 text-xs text-slate-700">Yes</span>
//                   </label>
//                   <label className="inline-flex items-center cursor-pointer">
//                     <input
//                       type="radio"
//                       checked={!isCornerPlot}
//                       onChange={() => setIsCornerPlot(false)}
//                       className="text-indigo-600 focus:ring-indigo-500 h-3 w-3"
//                     />
//                     <span className="ml-2 text-xs text-slate-700">No</span>
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Property Features */}
//           <div className="border-t border-gray-200 pt-6">
//             <h3 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center">
//               <FaBuilding className="mr-2" />
//               Property Features
//             </h3>

//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Property Status
//               </label>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                 {["prehold", "lease", "vacant"].map((status) => (
//                   <label
//                     key={status}
//                     className="inline-flex items-center cursor-pointer"
//                   >
//                     <input
//                       type="radio"
//                       name="propertyStatus"
//                       checked={propertyFeatures.propertyStatus === status}
//                       onChange={() =>
//                         setPropertyFeatures({
//                           ...propertyFeatures,
//                           propertyStatus: status,
//                         })
//                       }
//                       className="text-indigo-600 focus:ring-indigo-500 rounded"
//                     />
//                     <span className="ml-2 text-sm text-gray-700 capitalize">
//                       {status}
//                     </span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Land Area */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Land Area (sqft)
//               </label>
//               <input
//                 type="number"
//                 value={propertyFeatures.landArea}
//                 onChange={(e) =>
//                   setPropertyFeatures({
//                     ...propertyFeatures,
//                     landArea: e.target.value,
//                   })
//                 }
//                 className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Enter land area in square feet"
//               />
//             </div>

//             {/* Outhouse + Possession Status Section */}
//             <div className="grid grid-cols-1 md:grid-cols-2 mb-4">
//               {/* Outhouse Section */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Outhouse Available
//                 </label>
//                 <div className="flex space-x-6 mb-3">
//                   <label className="inline-flex items-center cursor-pointer">
//                     <input
//                       type="radio"
//                       name="hasOuthouse"
//                       checked={propertyFeatures.hasOuthouse === "Yes"}
//                       onChange={() =>
//                         setPropertyFeatures({
//                           ...propertyFeatures,
//                           hasOuthouse: "Yes",
//                         })
//                       }
//                       className="text-indigo-600 focus:ring-indigo-500 rounded"
//                     />
//                     <span className="ml-2 text-sm text-gray-700">Yes</span>
//                   </label>
//                   <label className="inline-flex items-center cursor-pointer">
//                     <input
//                       type="radio"
//                       name="hasOuthouse"
//                       checked={propertyFeatures.hasOuthouse === "No"}
//                       onChange={() =>
//                         setPropertyFeatures({
//                           ...propertyFeatures,
//                           hasOuthouse: "No",
//                           outhouseArea: "",
//                         })
//                       }
//                       className="text-indigo-600 focus:ring-indigo-500 rounded"
//                     />
//                     <span className="ml-2 text-sm text-gray-700">No</span>
//                   </label>
//                 </div>

//                 {propertyFeatures.hasOuthouse === "Yes" && (
//                   <div className="mt-3">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Outhouse Area (sqft)
//                     </label>
//                     <input
//                       type="number"
//                       value={propertyFeatures.outhouseArea}
//                       onChange={(e) =>
//                         setPropertyFeatures({
//                           ...propertyFeatures,
//                           outhouseArea: e.target.value,
//                         })
//                       }
//                       className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                       placeholder="Enter outhouse area"
//                     />
//                   </div>
//                 )}
//               </div>

//               {/* Possession Status */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Possession Status
//                 </label>
//                 <div className="flex flex-wrap space-x-6">
//                   <label className="inline-flex items-center cursor-pointer">
//                     <input
//                       type="radio"
//                       name="possessionStatus"
//                       checked={
//                         propertyFeatures.possessionStatus ===
//                         "Under Construction"
//                       }
//                       onChange={() =>
//                         setPropertyFeatures({
//                           ...propertyFeatures,
//                           possessionStatus: "Under Construction",
//                         })
//                       }
//                       className="text-indigo-600 focus:ring-indigo-500 rounded"
//                     />
//                     <span className="ml-2 text-sm text-gray-700">
//                       Under Construction
//                     </span>
//                   </label>
//                   <label className="inline-flex items-center cursor-pointer">
//                     <input
//                       type="radio"
//                       name="possessionStatus"
//                       checked={
//                         propertyFeatures.possessionStatus === "Ready to Move"
//                       }
//                       onChange={() =>
//                         setPropertyFeatures({
//                           ...propertyFeatures,
//                           possessionStatus: "Ready to Move",
//                         })
//                       }
//                       className="text-indigo-600 focus:ring-indigo-500 rounded"
//                     />
//                     <span className="ml-2 text-sm text-gray-700">
//                       Ready to Move
//                     </span>
//                   </label>
//                 </div>
//               </div>
//             </div>

//             {/* Available From */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Available From
//               </label>
//               <div className="flex space-x-4">
//                 <select
//                   value={propertyFeatures.availableFromMonth}
//                   onChange={(e) =>
//                     setPropertyFeatures({
//                       ...propertyFeatures,
//                       availableFromMonth: e.target.value,
//                     })
//                   }
//                   className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value="">Month</option>
//                   <option value="January">January</option>
//                   <option value="February">February</option>
//                   <option value="March">March</option>
//                   <option value="April">April</option>
//                   <option value="May">May</option>
//                   <option value="June">June</option>
//                   <option value="July">July</option>
//                   <option value="August">August</option>
//                   <option value="September">September</option>
//                   <option value="October">October</option>
//                   <option value="November">November</option>
//                   <option value="December">December</option>
//                 </select>
//                 <select
//                   value={propertyFeatures.availableFromYear}
//                   onChange={(e) =>
//                     setPropertyFeatures({
//                       ...propertyFeatures,
//                       availableFromYear: e.target.value,
//                     })
//                   }
//                   className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value="">Year</option>
//                   {Array.from(
//                     { length: 10 },
//                     (_, i) => new Date().getFullYear() + i
//                   ).map((year) => (
//                     <option key={year} value={year}>
//                       {year}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Original Property Features */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   No. of Open Sides
//                 </label>
//                 <select
//                   value={propertyFeatures.openSides}
//                   onChange={(e) =>
//                     setPropertyFeatures({
//                       ...propertyFeatures,
//                       openSides: e.target.value,
//                     })
//                   }
//                   className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value="">Select</option>
//                   <option value="1">1 Side</option>
//                   <option value="2">2 Sides</option>
//                   <option value="3">3 Sides</option>
//                   <option value="4">4 Sides</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Width of Road Facing the Plot (Meters)
//                 </label>
//                 <input
//                   type="number"
//                   value={propertyFeatures.roadWidth}
//                   onChange={(e) =>
//                     setPropertyFeatures({
//                       ...propertyFeatures,
//                       roadWidth: e.target.value,
//                     })
//                   }
//                   className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Meters"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Boundary Wall Made
//                 </label>
//                 <select
//                   value={propertyFeatures.boundaryWall}
//                   onChange={(e) =>
//                     setPropertyFeatures({
//                       ...propertyFeatures,
//                       boundaryWall: e.target.value,
//                     })
//                   }
//                   className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value="">Select</option>
//                   <option value="yes">Yes</option>
//                   <option value="no">No</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Gated Colony
//                 </label>
//                 <select
//                   value={propertyFeatures.gatedColony}
//                   onChange={(e) =>
//                     setPropertyFeatures({
//                       ...propertyFeatures,
//                       gatedColony: e.target.value,
//                     })
//                   }
//                   className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value="">Select</option>
//                   <option value="yes">Yes</option>
//                   <option value="no">No</option>
//                 </select>
//               </div>
//             </div>

//             {/* Facilities */}
//             <div className="mt-4">
//               <label className="block text-sm font-medium text-gray-700 mb-3">
//                 Facilities
//               </label>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                 {FACILITIES.map((facility) => (
//                   <label
//                     key={facility.key}
//                     className="inline-flex items-center cursor-pointer"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={propertyFeatures[facility.key] || false}
//                       onChange={(e) =>
//                         setPropertyFeatures({
//                           ...propertyFeatures,
//                           [facility.key]: e.target.checked,
//                         })
//                       }
//                       className="rounded text-indigo-600 focus:ring-indigo-500"
//                     />
//                     <span className="ml-2 text-sm text-gray-700">
//                       {facility.label}
//                     </span>
//                   </label>
//                 ))}
//                 {plotCustomFacilities.map((facility, idx) => (
//                   <label
//                     key={idx}
//                     className="inline-flex items-center cursor-pointer"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={propertyFeatures[facility] || false}
//                       onChange={(e) =>
//                         setPropertyFeatures({
//                           ...propertyFeatures,
//                           [facility]: e.target.checked,
//                         })
//                       }
//                       className="rounded text-indigo-600 focus:ring-indigo-500"
//                     />
//                     <span className="ml-2 text-sm text-gray-700">
//                       {facility}
//                     </span>
//                     <button
//                       type="button"
//                       className="ml-2 text-gray-500"
//                       onClick={() =>
//                         setPlotCustomFacilities(
//                           plotCustomFacilities.filter((f) => f !== facility)
//                         )
//                       }
//                     >
//                       <FaTrash />
//                     </button>
//                   </label>
//                 ))}
//               </div>
//               <div className="flex mt-2">
//                 <input
//                   type="text"
//                   placeholder="Add custom facility"
//                   className="border border-gray-300 rounded-md p-2 flex-1"
//                   value={propertyFeatures.newFacility || ""}
//                   onChange={(e) =>
//                     setPropertyFeatures({
//                       ...propertyFeatures,
//                       newFacility: e.target.value,
//                     })
//                   }
//                 />
//                 <button
//                   type="button"
//                   className="ml-2 bg-indigo-500 text-white px-3 py-1 rounded"
//                   onClick={() => {
//                     if (
//                       propertyFeatures.newFacility &&
//                       !plotCustomFacilities.includes(
//                         propertyFeatures.newFacility.trim()
//                       )
//                     ) {
//                       setPlotCustomFacilities([
//                         ...plotCustomFacilities,
//                         propertyFeatures.newFacility.trim(),
//                       ]);
//                       setPropertyFeatures({
//                         ...propertyFeatures,
//                         newFacility: "",
//                       });
//                     }
//                   }}
//                 >
//                   Add More
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Area Details */}
//           <div className="border-t border-gray-200 pt-4">
//             <h3 className="text-sm font-semibold mb-3 text-slate-800 flex items-center">
//               <FaRulerCombined className="mr-2 text-indigo-600 h-4 w-4" />
//               Area Details
//             </h3>
//             <div className="grid grid-cols-2 gap-3">
//               <div>
//                 <label className="block text-sm font-medium text-slate-600 mb-1">
//                   Plot Area (Sq-yd)
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={areaDetails.plotArea || ""}
//                   onChange={(e) =>
//                     setAreaDetails({
//                       ...areaDetails,
//                       plotArea: e.target.value,
//                     })
//                   }
//                   className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
//                   placeholder="Sq-yd"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-600 mb-1">
//                   Plot Length (yd)
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={areaDetails.plotLength || ""}
//                   onChange={(e) =>
//                     setAreaDetails({
//                       ...areaDetails,
//                       plotLength: e.target.value,
//                     })
//                   }
//                   className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
//                   placeholder="yd"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-600 mb-1">
//                   Plot Breadth (yd)
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={areaDetails.plotBreadth || ""}
//                   onChange={(e) =>
//                     setAreaDetails({
//                       ...areaDetails,
//                       plotBreadth: e.target.value,
//                     })
//                   }
//                   className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
//                   placeholder="yd"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-600 mb-1">
//                   Land Area (sqft)
//                 </label>
//                 <input
//                   type="number"
//                   value={propertyFeatures.landArea || ""}
//                   onChange={(e) =>
//                     setPropertyFeatures({
//                       ...propertyFeatures,
//                       landArea: e.target.value,
//                     })
//                   }
//                   className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
//                   placeholder="sqft"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Additional Information */}
//           <div className="border-t border-gray-200 pt-6">
//             <h3 className="text-lg font-semibold mb-4 text-indigo-700">
//               Additional Information
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Kissama */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Kissama
//                 </label>
//                 <input
//                   type="text"
//                   value={kissama}
//                   onChange={(e) => setKissama(e.target.value)}
//                   className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Enter Kissama details"
//                 />
//               </div>

//               {/* Boundary Type */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Boundary Type
//                 </label>
//                 <select
//                   value={boundary}
//                   onChange={(e) => setBoundary(e.target.value)}
//                   className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value="">Select boundary type</option>
//                   <option value="brick">Brick</option>
//                   <option value="concrete">Concrete</option>
//                   <option value="iron">Iron</option>
//                   <option value="wood">Wood</option>
//                   <option value="none">None</option>
//                 </select>
//               </div>

//               {/* Broker */}
//               <div>
//                 {renderBrokerSelect()}
//               </div>

//               {/* Reference */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Reference
//                 </label>
//                 <select
//                   value={reference}
//                   onChange={(e) => setReference(e.target.value)}
//                   className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value="">Select reference</option>
//                   {brokerList.map((r) => (
//                     <option key={r.id} value={r.id}>
//                       {r.name} - {r.phone}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Staff Engaged */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Staff Engaged (if any)
//                 </label>
//                 <input
//                   type="text"
//                   value={staffEngaged}
//                   onChange={(e) => setStaffEngaged(e.target.value)}
//                   className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Enter staff name or ID"
//                 />
//               </div>

//               {/* Loan Provider */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Loan Provider
//                 </label>
//                 <input
//                   type="text"
//                   value={loanProvider}
//                   onChange={(e) => setLoanProvider(e.target.value)}
//                   className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Enter loan provider name"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Approval Status */}
//           <div className="border-t border-gray-200 pt-6">
//             <h3 className="text-lg font-semibold mb-4 text-indigo-700">
//               Approval Status
//             </h3>
//             <div className="space-y-4">
//               {approvalStatus.map((approval, index) => (
//                 <div
//                   key={index}
//                   className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
//                 >
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Approval Authority
//                     </label>
//                     <input
//                       type="text"
//                       value={approval.authority}
//                       onChange={(e) =>
//                         handleApprovalChange(index, "authority", e.target.value)
//                       }
//                       className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                       placeholder="e.g., RERA, Local Authority"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Status
//                     </label>
//                     <select
//                       value={approval.status}
//                       onChange={(e) =>
//                         handleApprovalChange(index, "status", e.target.value)
//                       }
//                       className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     >
//                       <option value="">Select status</option>
//                       <option value="Approved">Approved</option>
//                       <option value="Pending">Pending</option>
//                       <option value="Rejected">Rejected</option>
//                       <option value="Applied">Applied</option>
//                     </select>
//                   </div>
//                   <div>
//                     {index === approvalStatus.length - 1 ? (
//                       <button
//                         onClick={addApprovalAuthority}
//                         className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md transition duration-300"
//                       >
//                         + Add More
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => removeApprovalAuthority(index)}
//                         className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300"
//                       >
//                         Remove
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Price Details */}
//           <div className=" border-t border-gray-200 pt-4">
//             <h3 className="text-sm font-semibold mb-3 text-slate-800 flex items-center">
//               <FaMoneyBill className="mr-2 text-indigo-600 h-4 w-4" />
//               Price Details
//             </h3>
//             <div className="flex gap-4">
//               <div className="w-1/2">
//                 <label className="block text-sm font-medium text-slate-600 mb-1">
//                   Expected Price (₹)
//                 </label>
//                 <input
//                   type="text"
//                   value={priceDetails.expectedPrice || ""}
//                   onChange={(e) =>
//                     setPriceDetails({
//                       ...priceDetails,
//                       expectedPrice: e.target.value,
//                     })
//                   }
//                   className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
//                   placeholder="e.g., 5000000"
//                 />
//               </div>

//               <div className="w-1/2">
//                 <label className="block text-sm font-medium text-slate-600 mb-1">
//                   Token Amount (₹)
//                 </label>
//                 <input
//                   type="text"
//                   value={priceDetails.tokenAmount || ""}
//                   onChange={(e) =>
//                     setPriceDetails({
//                       ...priceDetails,
//                       tokenAmount: e.target.value,
//                     })
//                   }
//                   className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
//                   placeholder="e.g., 50000"
//                 />
//               </div>
//             </div>

//           </div>

//           {/* Update/Save Button */}
//           {isInEditMode ? (
//             <button
//               onClick={saveCurrentPlot}
//               className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-4 rounded-xl transition-all duration-200 text-sm font-medium flex items-center justify-center"
//             >
//               <FaSaveIcon className="mr-2 h-3 w-3" />
//               Save Plot & Return to Table
//             </button>
//           ) : (
//             <button
//               onClick={() => {
//                 if (currentPlot) {
//                   const updatedPlots = plots.map((plot) => {
//                     if (plot.id === currentPlot.id) {
//                       const updatedPlot = {
//                         ...plot,
//                         isCornerPlot,
//                         priceDetails,
//                         propertyFeatures,
//                         areaDetails,
//                         kissama,
//                         purchaser,
//                         constructor,
//                       };
//                       updatedPlot.isComplete = !!(
//                         priceDetails.expectedPrice &&
//                         areaDetails.plotArea &&
//                         purchaser &&
//                         constructor
//                       );
//                       return updatedPlot;
//                     }
//                     return plot;
//                   });
//                   setPlots(updatedPlots);
//                   alert("Plot details updated successfully!");
//                 }
//               }}
//               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-xl transition-all duration-200 text-sm font-medium flex items-center justify-center"
//             >
//               <FaCheck className="mr-2 h-3 w-3" />
//               Update Plot Details
//             </button>
//           )}

//           {/* Clear Selection/Return Button */}
//           {!isInEditMode && (
//             <button
//               onClick={() => {
//                 setSelectedPlots([]);
//               }}
//               className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded-xl transition-all duration-200 text-sm font-medium flex items-center justify-center"
//             >
//               <FaTimes className="mr-2 h-3 w-3" />
//               Clear Selection
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // Main render with tab navigation
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white p-4 md:p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Navigation Tabs */}
//         <NavigationTabs />

//         {/* Content based on active tab */}
//         {activeTab === "project-info" && renderProjectInfo()}
//         {activeTab === "revenue-plots" && renderRevenuePlots()}
//         {activeTab === "plots" && renderPlots()}
//       </div>
//     </div>
//   );
// };

// export default PlottingProject;



import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaTrash,
  FaCheck,
  FaCheckCircle,
  FaQuestionCircle,
  FaRulerCombined,
  FaBuilding,
  FaMoneyBill,
  FaSave,
  FaEdit,
  FaChevronRight,
  FaMapMarkerAlt,
  FaChartLine,
  FaSortAmountUp,
  FaInfoCircle,
  FaArrowRight,
  FaTimes,
  FaChevronUp,
  FaChevronDown,
  FaArrowLeft,
  FaEye,
  FaTable,
  FaFileAlt,
  FaPen,
  FaSave as FaSaveIcon,
  FaLongArrowAltLeft,
  FaCalendarAlt,
  FaCogs
} from "react-icons/fa";
import axios from "axios";

const PlottingProject = ({
  projectName,
  setProjectName,
  projectType,
  setProjectType,
  city,
  setCity,
  locality,
  setLocality,
  landZone,
  setLandZone,
  onSaveProject,
  PROJECT_TYPES = {
    APARTMENT: "Apartment",
    PLOTTING: "Plotting",
    DUPLEX: "Duplex",
    TRIPLEX: "Triplex",
    COMMERCIAL: "Commercial",
    CUSTOM: "Custom",
  },
   onClose,
  editingProjectId,
  selectedProject,
  editingPlotId,
  initialLandArea = "",
  initialRevenuePlots = 0,
  initialParsedPlotsData = [], // Main plots from plots_data
  initialParsedRevenuePlotsData = [] // Revenue plots from revenue_plots_data
}) => {
  // Initialize states with initial values from database
  const [revenuePlots, setRevenuePlots] = useState(initialRevenuePlots);

  const [plots, setPlots] = useState(initialParsedPlotsData); // Main plots array
  const [plotsData, setPlotsData] = useState(initialParsedRevenuePlotsData);

  const [selectedPlots, setSelectedPlots] = useState([]);
  const [isCornerPlot, setIsCornerPlot] = useState(false);
  const [priceDetails, setPriceDetails] = useState({ expectedPrice: "", tokenAmount: "" });
  
  // Initialize propertyFeatures with landArea from database
  const [propertyFeatures, setPropertyFeatures] = useState({ 
    landArea: initialLandArea,
    propertyStatus: "",
    hasOuthouse: "",
    outhouseArea: "",
    possessionStatus: "",
    availableFromMonth: "",
    availableFromYear: "",
    openSides: "",
    roadWidth: "",
    boundaryWall: "",
    gatedColony: ""
  });
  
  const [areaDetails, setAreaDetails] = useState({ plotArea: "", plotLength: "", plotBreadth: "" });
  const [kissama, setKissama] = useState("");
  const [purchaser, setPurchaser] = useState("");
  const [constructor, setConstructor] = useState("");

  // Revenue plots state
  const [attachment, setAttachment] = useState(null);

  // Manual inputs for adding plots
  const [manualPlotCount, setManualPlotCount] = useState(0);

  // Additional plot details states
  const [boundary, setBoundary] = useState("");
  const [reference, setReference] = useState("");
  const [staffEngaged, setStaffEngaged] = useState("");

  const [loanProvider, setLoanProvider] = useState("");
  const [plotCustomFacilities, setPlotCustomFacilities] = useState([]);
  const [approvalStatus, setApprovalStatus] = useState([{ authority: "", status: "" }]);
const [brokerList, setBrokerList] = useState([]);
const [loadingBrokers, setLoadingBrokers] = useState(false);


  // New states for table view and editing mode
  const [showTableOverview, setShowTableOverview] = useState(false);
  const [editingPlotIdInternal, setEditingPlotIdInternal] = useState(null);
  const [currentPlotData, setCurrentPlotData] = useState(null);
  const [directEditMode, setDirectEditMode] = useState(false);

  // Tab navigation
  const [activeTab, setActiveTab] = useState("project-info");

  // FACILITIES constant
  const FACILITIES = [
    { key: "parking", label: "Parking" },
    { key: "gym", label: "Gym" },
    { key: "pool", label: "Swimming Pool" },
    { key: "garden", label: "Garden" },
    { key: "security", label: "Security" },
    { key: "elevator", label: "Elevator" },
  ];

  // Load existing project data from database
  useEffect(() => {
    console.log("PlottingProject: selectedProject received:", selectedProject);
    console.log("PlottingProject: initialParsedPlotsData received:", initialParsedPlotsData);
    console.log("PlottingProject: initialParsedRevenuePlotsData received:", initialParsedRevenuePlotsData);
    console.log("PlottingProject: initialRevenuePlots received:", initialRevenuePlots);
    console.log("PlottingProject: initialLandArea received:", initialLandArea);
    
    if (selectedProject && editingProjectId) {
      const projectData = selectedProject;
      
      // Load main plots from database (plots_data field)
      if (projectData.plots_data && initialParsedPlotsData.length === 0) {
        try {
          let parsedPlots = [];
          if (typeof projectData.plots_data === 'string') {
            parsedPlots = JSON.parse(projectData.plots_data);
          } else if (Array.isArray(projectData.plots_data)) {
            parsedPlots = projectData.plots_data;
          }
          
          if (parsedPlots.length > 0) {
            setPlots(parsedPlots);
            console.log("Set plots from database plots_data:", parsedPlots);
          }
        } catch (error) {
          console.error("Error parsing plots_data:", error);
        }
      }
      
      // Load revenue plots data from database (revenue_plots_data field)
      if (projectData.revenue_plots_data && initialParsedRevenuePlotsData.length === 0) {
        try {
          let parsedRevenuePlots = [];
          if (typeof projectData.revenue_plots_data === 'string') {
            parsedRevenuePlots = JSON.parse(projectData.revenue_plots_data);
          } else if (Array.isArray(projectData.revenue_plots_data)) {
            parsedRevenuePlots = projectData.revenue_plots_data;
          }
          
          if (parsedRevenuePlots.length > 0) {
            setPlotsData(parsedRevenuePlots);
            console.log("Set revenue plots from database revenue_plots_data:", parsedRevenuePlots);
          }
        } catch (error) {
          console.error("Error parsing revenue_plots_data:", error);
        }
      }
      
      // Set revenue plots count from database
      if (projectData.revenue_plots && revenuePlots === 0) {
        setRevenuePlots(projectData.revenue_plots);
        console.log("Set revenue plots count from database:", projectData.revenue_plots);
      }
      
      // Set land area from database
      if (projectData.land_area && !propertyFeatures.landArea) {
        setPropertyFeatures(prev => ({
          ...prev,
          landArea: projectData.land_area
        }));
        console.log("Set land area from database:", projectData.land_area);
      }
      
      // Check if we have a specific plot to edit
      if (editingPlotId && plots.length > 0) {
        const plotToEdit = plots.find(p => p.id === editingPlotId);
        if (plotToEdit) {
          setDirectEditMode(true);
          setEditingPlotIdInternal(editingPlotId);
          setCurrentPlotData(plotToEdit);
          loadPlotDataForEditing(plotToEdit);
          
          const updatedPlots = plots.map(plot => ({
            ...plot,
            isBeingEdited: plot.id === editingPlotId
          }));
          setPlots(updatedPlots);
          
          setTimeout(() => {
            setActiveTab("plots");
            setSelectedPlots([editingPlotId]);
          }, 100);
        }
      }
    }
    
    // Also load from initial props if provided
    if (initialParsedPlotsData.length > 0 && plots.length === 0) {
      setPlots(initialParsedPlotsData);
      console.log("Set plots from initialParsedPlotsData:", initialParsedPlotsData);
    }
    
    if (initialParsedRevenuePlotsData.length > 0 && plotsData.length === 0) {
      setPlotsData(initialParsedRevenuePlotsData);
      console.log("Set revenue plots from initialParsedRevenuePlotsData:", initialParsedRevenuePlotsData);
    }
    
  }, [selectedProject, editingProjectId, editingPlotId, initialParsedPlotsData, initialParsedRevenuePlotsData, initialRevenuePlots, initialLandArea]);

  // Load plot data when editingPlotIdInternal changes
  useEffect(() => {
    if (editingPlotIdInternal) {
      const plotToEdit = plots.find(p => p.id === editingPlotIdInternal);
      if (plotToEdit) {
        setCurrentPlotData(plotToEdit);
        loadPlotDataForEditing(plotToEdit);
      }
    }
  }, [editingPlotIdInternal, plots]);


  useEffect(() => {
  const fetchBrokers = async () => {
    try {
      setLoadingBrokers(true);

      const res = await axios.get(
        "https://csaapnodeapibackend.csaap.com/api/tenant/broker",
        {
          headers: {
            "Content-Type": "application/json",
            
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // ✅ adjust if backend response shape differs
      if (res.data?.success && Array.isArray(res.data.data)) {
        setBrokerList(res.data.data);
      } else {
        console.warn("Unexpected broker response:", res.data);
        setBrokerList([]);
      }
    } catch (error) {
      console.error("❌ Error fetching brokers:", error);
      setBrokerList([]);
    } finally {
      setLoadingBrokers(false);
    }
  };

  fetchBrokers();
}, []);

  // Generate unique ID
  const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

  // Handle approval status changes
  const handleApprovalChange = (index, field, value) => {
    const updatedApprovals = [...approvalStatus];
    updatedApprovals[index] = { ...updatedApprovals[index], [field]: value };
    setApprovalStatus(updatedApprovals);
  };

  // Add new approval authority
  const addApprovalAuthority = () => {
    setApprovalStatus([...approvalStatus, { authority: "", status: "" }]);
  };

  // Remove approval authority
  const removeApprovalAuthority = (index) => {
    setApprovalStatus(approvalStatus.filter((_, i) => i !== index));
  };

const renderBrokerSelect = () => (
  <div>
    <label className="block text-sm font-medium text-slate-600 mb-1">
      Broker
    </label>

    <select
      value={reference}
      onChange={(e) => setReference(e.target.value)}
      disabled={loadingBrokers}
      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm
                 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                 outline-none transition-all"
    >
      <option value="">
        {loadingBrokers ? "Loading brokers..." : "Select broker"}
      </option>

      {brokerList.map((broker) => (
        <option
          key={broker.id || broker._id}
          value={broker.id || broker._id}
        >
          {broker.name}
          {broker.phone || broker.mobile
            ? ` - ${broker.phone || broker.mobile}`
            : ""}
        </option>
      ))}
    </select>
  </div>
);


  // Load plot data for editing
  const loadPlotDataForEditing = (plot) => {
    setIsCornerPlot(plot.isCornerPlot || false);
    setPriceDetails({
      expectedPrice: plot.priceDetails?.expectedPrice || "",
      tokenAmount: plot.priceDetails?.tokenAmount || ""
    });
    setPropertyFeatures(prev => ({
      ...prev,
      landArea: plot.propertyFeatures?.landArea || prev.landArea,
      propertyStatus: plot.propertyFeatures?.propertyStatus || "",
      hasOuthouse: plot.propertyFeatures?.hasOuthouse || "",
      outhouseArea: plot.propertyFeatures?.outhouseArea || "",
      possessionStatus: plot.propertyFeatures?.possessionStatus || "",
      availableFromMonth: plot.propertyFeatures?.availableFromMonth || "",
      availableFromYear: plot.propertyFeatures?.availableFromYear || "",
      openSides: plot.propertyFeatures?.openSides || "",
      roadWidth: plot.propertyFeatures?.roadWidth || "",
      boundaryWall: plot.propertyFeatures?.boundaryWall || "",
      gatedColony: plot.propertyFeatures?.gatedColony || "",
    }));
    setAreaDetails({
      plotArea: plot.areaDetails?.plotArea || "",
      plotLength: plot.areaDetails?.plotLength || "",
      plotBreadth: plot.areaDetails?.plotBreadth || ""
    });
    setKissama(plot.kissama || "");
    setPurchaser(plot.purchaser || "");
    setConstructor(plot.constructor || "");
  };

  // Save project handler
const handleSaveProject = async () => {
  if (!projectName || !projectType) {
    alert("Please enter project name and type");
    return;
  }

  try {
    // ✅ SEND DATA IN BACKEND-EXPECTED FORMAT
    const projectData = {
      name: projectName,
      type: projectType,
      city,
      locality,
      landZone,                          // ✅ camelCase
      landArea: propertyFeatures.landArea || null,
      plots,                             // ✅ array
      revenuePlots: revenuePlots || 0,   // ✅ number
      plotsData                          // ✅ array
    };

    console.log("🚀 Sending plotting project:", projectData);

    if (onSaveProject) {
      await onSaveProject(projectData);
    }

    alert("Project saved successfully!");

  } catch (error) {
    console.error("❌ Error saving plotting project:", error);
    alert("Failed to save project.");
  }
};


  // Add multiple plots
  const addMultiplePlots = () => {
    if (manualPlotCount <= 0) {
      alert("Please enter a valid number of plots");
      return;
    }

    const newPlots = [];
    for (let i = 1; i <= manualPlotCount; i++) {
      const plotNumber = plots.length + i;
      const plotName = `Plot ${plotNumber}`;

      const newPlot = {
        id: generateId(),
        name: plotName,
        isCornerPlot: false,
        priceDetails: { expectedPrice: "", tokenAmount: "" },
        propertyFeatures: { 
          landArea: propertyFeatures.landArea || "", 
          propertyStatus: "",
          hasOuthouse: "",
          outhouseArea: "",
          possessionStatus: "",
          availableFromMonth: "",
          availableFromYear: "",
          openSides: "",
          roadWidth: "",
          boundaryWall: "",
          gatedColony: ""
        },
        areaDetails: { plotArea: "", plotLength: "", plotBreadth: "" },
        kissama: "",
        purchaser: "",
        constructor: "",
        isComplete: false,
        status: "draft",
        isBeingEdited: false,
        lastSaved: null,
      };
      newPlots.push(newPlot);
    }

    setPlots([...plots, ...newPlots]);
    setManualPlotCount(0);
    alert(`Added ${manualPlotCount} plots successfully!`);
  };

  // Handle plot selection for editing
  const handlePlotSelection = (plotId, isChecked) => {
    if (isChecked) {
      setSelectedPlots(prev => [...prev, plotId]);
    } else {
      setSelectedPlots(prev => prev.filter(id => id !== plotId));
    }
  };

  // Start editing multiple plots
  const startMultiPlotEditing = () => {
    if (selectedPlots.length === 0) {
      alert("Please select at least one plot to edit");
      return;
    }
    
    // Mark selected plots as being edited
    const updatedPlots = plots.map(plot => ({
      ...plot,
      isBeingEdited: selectedPlots.includes(plot.id)
    }));
    
    setPlots(updatedPlots);
    setShowTableOverview(true);
  };

  // Navigate to edit a specific plot from table
  const navigateToPlotEdit = (plotId) => {
    setShowTableOverview(false);
    setEditingPlotIdInternal(plotId);
    setDirectEditMode(false);
  };

  // Save current plot and continue editing
  const saveCurrentPlot = () => {
    if (!editingPlotIdInternal) return;

    const updatedPlots = plots.map((plot) => {
      if (plot.id === editingPlotIdInternal) {
        const updatedPlot = {
          ...plot,
          isCornerPlot,
          priceDetails,
          propertyFeatures,
          areaDetails,
          kissama,
          purchaser,
          constructor,
          isBeingEdited: false, // Clear editing flag when saved
          lastSaved: new Date().toISOString(),
        };
        updatedPlot.isComplete = !!(
          priceDetails.expectedPrice &&
          areaDetails.plotArea &&
          purchaser &&
          constructor
        );
        return updatedPlot;
      }
      return plot;
    });

    setPlots(updatedPlots);
    alert("Plot details saved!");
    
    // If we came from direct edit mode, go to table view
    if (directEditMode) {
      setShowTableOverview(true);
      setDirectEditMode(false);
    } else {
      // Otherwise go back to table view
      setShowTableOverview(true);
    }
    
    setEditingPlotIdInternal(null);
    setCurrentPlotData(null);
    setSelectedPlots([]);
  };

  // Complete editing and return to main view
  const completeMultiPlotEditing = () => {
    // Clear editing flags
    const updatedPlots = plots.map(plot => ({
      ...plot,
      isBeingEdited: false
    }));
    
    setPlots(updatedPlots);
    setSelectedPlots([]);
    setShowTableOverview(false);
    setEditingPlotIdInternal(null);
    setCurrentPlotData(null);
    setDirectEditMode(false);
    alert("Plot editing completed!");
  };

  // Remove plot
  const removePlot = (plotId) => {
    if (window.confirm("Are you sure you want to remove this plot?")) {
      const updatedPlots = plots.filter(plot => plot.id !== plotId);
      setPlots(updatedPlots);
      setSelectedPlots(prev => prev.filter(id => id !== plotId));
      alert("Plot removed successfully!");
    }
  };

  // Revenue plot handlers
  const handlePlotChange = (index, field, value) => {
    const updatedPlotsData = [...plotsData];
    if (!updatedPlotsData[index]) {
      updatedPlotsData[index] = {};
    }
    updatedPlotsData[index][field] = value;
    setPlotsData(updatedPlotsData);
  };

  const handlePlotFileChange = (index, file) => {
    const updatedPlotsData = [...plotsData];
    if (!updatedPlotsData[index]) {
      updatedPlotsData[index] = {};
    }
    updatedPlotsData[index].fileName = file ? file.name : "";
    updatedPlotsData[index].file = file;
    setPlotsData(updatedPlotsData);
  };

  const calculateTotalPlotsArea = () => {
    return plotsData.reduce((total, plot) => {
      return total + (parseFloat(plot?.area) || 0);
    }, 0);
  };

  const getFilledPlotsCount = () => {
    return plotsData.filter(
      (plot) => plot && (plot.area || plot.entryPlotNo || plot.khataNo)
    ).length;
  };

  // Handle save revenue plots and go to next tab
  const handleSaveRevenuePlots = () => {
    alert("Revenue plots saved successfully!");
    setActiveTab("plots");
  };

  // Navigation Tabs Component
  const NavigationTabs = () => (
    <div className="bg-white rounded-xl border border-slate-200 p-1 mb-6 shadow-sm">
      <div className="flex flex-wrap gap-1">
        <button
          onClick={() => setActiveTab("project-info")}
          className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 ${activeTab === "project-info"
            ? "bg-indigo-600 text-white shadow-md"
            : "text-slate-600 hover:bg-slate-100"
            }`}
        >
          <FaBuilding className="mr-2 h-4 w-4" />
          Project Info
        </button>

        <button
          onClick={() => setActiveTab("revenue-plots")}
          disabled={revenuePlots === 0}
          className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 ${activeTab === "revenue-plots"
            ? "bg-indigo-600 text-white shadow-md"
            : revenuePlots === 0 
              ? "text-slate-400 cursor-not-allowed"
              : "text-slate-600 hover:bg-slate-100"
            }`}
        >
          <FaChartLine className="mr-2 h-4 w-4" />
          Revenue Plots ({revenuePlots})
        </button>

        <button
          onClick={() => setActiveTab("plots")}
          className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 ${activeTab === "plots"
            ? "bg-indigo-600 text-white shadow-md"
            : "text-slate-600 hover:bg-slate-100"
            }`}
        >
          <FaTable className="mr-2 h-4 w-4" />
          Plots & Details ({plots.length})
        </button>
      </div>
    </div>
  );

  // Enhanced Project Info Section
  const renderProjectInfo = () => (
    <div className="space-y-6">
      {/* Project Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg bg-indigo-50 mr-4`}>
              <FaTable className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{plots.length}</div>
              <div className="text-sm text-slate-500">Total Plots</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg bg-emerald-50 mr-4`}>
              <FaChartLine className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{revenuePlots}</div>
              <div className="text-sm text-slate-500">Revenue Plots</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg bg-blue-50 mr-4`}>
              <FaCheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{plots.filter(p => p.isComplete).length}</div>
              <div className="text-sm text-slate-500">Completed Plots</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg bg-amber-50 mr-4`}>
              <FaRulerCombined className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{propertyFeatures.landArea || '0'} sq.ft</div>
              <div className="text-sm text-slate-500">Land Area</div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Basic Info */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-slate-800 flex items-center">
            <FaBuilding className="mr-2 text-indigo-600 h-5 w-5" />
            Project Information
          </h2>

          <div className="space-y-4">
            <div>
              <label className=" text-sm font-medium text-slate-700 mb-1 flex items-center">
                <span className="text-red-500 mr-1">*</span>
                Project Name
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="Enter project name"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 flex items-center">
                <span className="text-red-500 mr-1">*</span>
                Project Type
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none bg-white"
              >
                <option value="">Select project type</option>
                {Object.values(PROJECT_TYPES).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-slate-800 flex items-center">
            <FaMapMarkerAlt className="mr-2 text-indigo-600 h-5 w-5" />
            Property Location
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Enter City"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Locality
                </label>
                <input
                  type="text"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Enter Locality"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Land Zone
                </label>
                <input
                  type="text"
                  value={landZone}
                  onChange={(e) => setLandZone(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Enter Land Zone"
                />
              </div>
              <div>
                <label className=" text-sm font-medium text-slate-700 mb-1 flex items-center">
                  <FaRulerCombined className="mr-2 text-slate-400 h-4 w-4" />
                  Total Land Area (sq. ft)
                </label>
                <input
                  type="number"
                  min="0"
                  value={propertyFeatures.landArea}
                  onChange={(e) => setPropertyFeatures({...propertyFeatures, landArea: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Enter total land area"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Button at bottom */}
      <div className="pt-6">
        <button
          onClick={() => setActiveTab('revenue-plots')}
          className="w-full bg-linear-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg transition-all duration-200"
        >
          <span>Continue to Revenue Plots</span>
          <FaChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );

  // Enhanced Revenue Plots Section
  const renderRevenuePlots = () => (
    <div className="space-y-6">
      {/* Navigation Back Button */}
      <button
        onClick={() => setActiveTab('project-info')}
        className="flex items-center text-slate-600 hover:text-slate-800 hover:bg-slate-100 px-4 py-2 rounded-lg transition-all duration-200"
      >
        <FaArrowLeft className="mr-2 h-4 w-4" />
        Back to Project Info
      </button>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <FaChartLine className="mr-3 text-indigo-600" />
          Revenue Plots Configuration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Total Number of Revenue Plots
            </label>
            <input
              type="number"
              min="0"
              max="50"
              value={revenuePlots}
              onChange={(e) => {
                const newCount = parseInt(e.target.value) || 0;
                setRevenuePlots(newCount);
                // Initialize plotsData array if increasing count
                if (newCount > plotsData.length) {
                  const newPlotsData = [...plotsData];
                  while (newPlotsData.length < newCount) {
                    newPlotsData.push({});
                  }
                  setPlotsData(newPlotsData);
                }
              }}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="Enter total plots"
            />
            <p className="text-xs text-slate-500 mt-1">
              Currently have {plotsData.length} revenue plots configured
            </p>
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Upload Attachment (if any)
            </label>
            <input
              type="file"
              onChange={(e) => setAttachment(e.target.files[0])}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {attachment && (
              <p className="text-sm text-emerald-600 mt-2">
                ✓ {attachment.name}
              </p>
            )}
          </div>
        </div>

        {revenuePlots > 0 && (
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 mt-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-800">
                Revenue Plot Details ({revenuePlots} {revenuePlots === 1 ? "Plot" : "Plots"})
              </h3>
              <span className="text-sm text-slate-500">
                {getFilledPlotsCount()} of {revenuePlots} plots filled
              </span>
            </div>

            {plotsData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {plotsData.map((plot, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-slate-300 p-4 space-y-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <h5 className="font-semibold text-slate-800">
                        Plot {index + 1}
                      </h5>
                      <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                        #{index + 1}
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Plot Area (sq. ft)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={plot?.area || ""}
                        onChange={(e) =>
                          handlePlotChange(index, "area", e.target.value)
                        }
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="Enter area"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Entry Plot No.
                      </label>
                      <input
                        type="text"
                        value={plot?.entryPlotNo || ""}
                        onChange={(e) =>
                          handlePlotChange(index, "entryPlotNo", e.target.value)
                        }
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="Enter plot number"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Khata No.
                      </label>
                      <input
                        type="text"
                        value={plot?.khataNo || ""}
                        onChange={(e) =>
                          handlePlotChange(index, "khataNo", e.target.value)
                        }
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="Enter khata number"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Plot Document
                      </label>
                      <input
                        type="file"
                        onChange={(e) =>
                          handlePlotFileChange(index, e.target.files[0])
                        }
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                      />
                      {plot?.fileName && (
                        <p className="text-xs text-emerald-600 mt-2 truncate">
                          ✓ {plot.fileName}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-500">No revenue plots configured yet.</p>
                <p className="text-sm text-slate-400 mt-1">Adjust the number of revenue plots above to start adding details.</p>
              </div>
            )}

            {/* Summary Card */}
            <div className="mt-6 p-4 bg-linear-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-indigo-800">
                    Summary
                  </h4>
                  <p className="text-sm text-indigo-600 mt-1">
                    Total Plots Area: <span className="font-bold">{calculateTotalPlotsArea()}</span> sq. ft
                  </p>
                  <p className="text-sm text-slate-600 mt-1">
                    {getFilledPlotsCount()} of {revenuePlots} plots filled
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleSaveRevenuePlots}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center"
                  >
                    <FaSave className="mr-2" />
                    Save Revenue Plots & Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next Button at bottom if no revenue plots */}
        {revenuePlots === 0 && (
          <div className="pt-6">
            <button
              onClick={() => setActiveTab('plots')}
              className="w-full bg-linear-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg transition-all duration-200"
            >
              <span>Continue to Plots & Details</span>
              <FaChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Table Overview Component for multiple plot editing
  const renderTableOverview = () => {
    const selectedPlotData = plots.filter(plot => selectedPlots.includes(plot.id));
    
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowTableOverview(false)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <FaArrowLeft />
            </button>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Plot Editing Overview</h2>
              <p className="text-slate-500 text-sm">
                {selectedPlots.length} plot(s) selected for editing
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={completeMultiPlotEditing}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center"
            >
              <FaCheck className="mr-2" />
              Complete Editing
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Plot
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Area Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Last Saved
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selectedPlotData.map((plot) => (
                  <tr 
                    key={plot.id} 
                    className={`hover:bg-slate-50 transition-colors ${
                      plot.isBeingEdited 
                        ? 'bg-blue-50' 
                        : plot.lastSaved 
                          ? 'bg-white' 
                          : 'bg-slate-50/30 opacity-60'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="shrink-0 h-10 w-10">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            plot.isBeingEdited 
                              ? 'bg-blue-100' 
                              : plot.lastSaved 
                                ? 'bg-emerald-100' 
                                : 'bg-slate-200'
                          }`}>
                            <FaTable className={`h-5 w-5 ${
                              plot.isBeingEdited 
                                ? 'text-blue-600' 
                                : plot.lastSaved 
                                  ? 'text-emerald-600' 
                                  : 'text-slate-400'
                            }`} />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className={`text-sm font-medium ${
                            plot.isBeingEdited 
                              ? 'text-blue-900 font-bold' 
                              : plot.lastSaved 
                                ? 'text-slate-900' 
                                : 'text-slate-500 italic'
                          }`}>
                            {plot.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {plot.isCornerPlot ? 'Corner Plot' : 'Regular Plot'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-sm ${
                        plot.areaDetails?.plotArea 
                          ? 'text-slate-900' 
                          : 'text-slate-500 italic'
                      }`}>
                        {plot.areaDetails?.plotArea ? `${plot.areaDetails.plotArea} sq-yd` : 'Not set'}
                      </div>
                      {plot.areaDetails?.plotLength && plot.areaDetails?.plotBreadth && (
                        <div className="text-xs text-slate-500">
                          {plot.areaDetails.plotLength} × {plot.areaDetails.plotBreadth} yd
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-sm ${
                        plot.priceDetails?.expectedPrice 
                          ? 'text-slate-900' 
                          : 'text-slate-500 italic'
                      }`}>
                        {plot.priceDetails?.expectedPrice 
                          ? `₹${parseInt(plot.priceDetails.expectedPrice).toLocaleString()}` 
                          : 'Not set'
                        }
                      </div>
                      {plot.priceDetails?.tokenAmount && (
                        <div className="text-xs text-slate-500">
                          Token: ₹{parseInt(plot.priceDetails.tokenAmount).toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        plot.isBeingEdited 
                          ? 'bg-blue-100 text-blue-800' 
                          : plot.lastSaved 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-slate-100 text-slate-500 italic'
                      }`}>
                        {plot.isBeingEdited ? 'Being Edited' : plot.lastSaved ? 'Saved' : 'Not Edited'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {plot.lastSaved 
                        ? new Date(plot.lastSaved).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                        : 'Never'
                      }
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigateToPlotEdit(plot.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit this plot"
                        >
                          <FaPen />
                        </button>
                        <button
                          onClick={() => {
                            alert(`Plot Details:\n\nName: ${plot.name}\nArea: ${plot.areaDetails?.plotArea || 'N/A'} sq-yd\nPrice: ${plot.priceDetails?.expectedPrice || 'N/A'}\nPurchaser: ${plot.purchaser || 'N/A'}\nConstructor: ${plot.constructor || 'N/A'}\nStatus: ${plot.isComplete ? 'Complete' : 'In Progress'}`);
                          }}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="View details"
                        >
                          <FaEye />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <FaInfoCircle className="text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">How to Edit Multiple Plots</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Click on a plot's <FaPen className="inline text-xs" /> icon to edit it</li>
                <li>• Plots with <span className="italic text-slate-500">blurry text</span> haven't been edited yet</li>
                <li>• Blue highlighted rows indicate plots currently being edited</li>
                <li>• Green rows indicate plots that have been saved</li>
                <li>• Click "Complete Editing" when you're done with all plots</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Plots Section with multi-edit functionality
  const renderPlots = () => {
    // If showing table overview
    if (showTableOverview) {
      return renderTableOverview();
    }

    // If editing a specific plot (from overview or direct click)
    if (editingPlotIdInternal || (directEditMode && currentPlotData)) {
      return (
        <div className="space-y-6">
          {/* Navigation Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShowTableOverview(true);
                  setEditingPlotIdInternal(null);
                  setCurrentPlotData(null);
                  setDirectEditMode(false);
                }}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <FaArrowLeft />
              </button>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Editing: {currentPlotData?.name || 'Plot'}</h2>
                <p className="text-slate-500 text-sm">
                  Make changes and save to continue editing other plots
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={saveCurrentPlot}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center"
              >
                <FaSaveIcon className="mr-2" />
                Save & Return
              </button>
            </div>
          </div>

          {/* Render the plot details panel */}
          {renderPlotDetailsPanel(true)}
        </div>
      );
    }

    // Default plots list view
    return (
      <div className="space-y-6">
        {/* Navigation Back Button */}
        <button
          onClick={() => setActiveTab('revenue-plots')}
          className="flex items-center text-slate-600 hover:text-slate-800 hover:bg-slate-100 px-4 py-2 rounded-lg transition-all duration-200"
        >
          <FaArrowLeft className="mr-2 h-4 w-4" />
          Back to Revenue Plots
        </button>

        {/* Direct Edit Mode Notice */}
        {directEditMode && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <FaInfoCircle className="text-blue-600" />
              <div>
                <h4 className="font-semibold text-blue-800">Direct Edit Mode</h4>
                <p className="text-sm text-blue-700">
                  You came here directly from the Plot Editing Overview. Select a plot from the list or go to table view.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Split Layout: Plots List on Left, Details on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Plots List */}
          <div className="lg:col-span-1 space-y-6">
            {/* Multi-Edit Controls */}
            {selectedPlots.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-blue-900 flex items-center">
                    <FaTable className="mr-2" />
                    {selectedPlots.length} Plot(s) Selected
                  </h3>
                  <button
                    onClick={() => setSelectedPlots([])}
                    className="text-sm text-blue-700 hover:text-blue-900"
                  >
                    Clear All
                  </button>
                </div>
                <button
                  onClick={startMultiPlotEditing}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center font-medium"
                >
                  <FaEdit className="mr-2" />
                  Edit Selected Plots in Table View
                </button>
              </div>
            )}

            {/* Add Multiple Plots Section */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-slate-800 flex items-center">
                <FaSortAmountUp className="mr-2 text-indigo-600 h-5 w-5" />
                Add Multiple Plots
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Number of Plots to Add
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={manualPlotCount}
                      onChange={(e) => setManualPlotCount(parseInt(e.target.value) || 0)}
                      className="flex-1 border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      placeholder="Enter number of plots"
                    />
                    <button
                      onClick={addMultiplePlots}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center"
                    >
                      <FaPlus className="mr-2 h-4 w-4" />
                      Add Plots
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Plots List with Checkboxes */}
            <div className="space-y-2">
              {plots.length === 0 ? (
                <div className="bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 p-12 text-center">
                  <FaTable className="mx-auto h-16 w-16 text-slate-300 mb-4" />
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">No Plots Created</h3>
                  <p className="text-slate-500 mb-4">Start by adding plots to the project</p>
                  <div className="flex items-center justify-center space-x-4">
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={manualPlotCount}
                      onChange={(e) => setManualPlotCount(parseInt(e.target.value) || 0)}
                      className="w-32 border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      placeholder="Number"
                    />
                    <button
                      onClick={addMultiplePlots}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg transition-all duration-200 flex items-center"
                    >
                      <FaPlus className="mr-2 h-4 w-4" />
                      Add Plots
                    </button>
                  </div>
                </div>
              ) : (
                plots.map((plot) => (
                  <div
                    key={plot.id}
                    className={`bg-white rounded-xl border-2 shadow-sm overflow-hidden transition-all duration-200 ${selectedPlots.includes(plot.id)
                      ? 'border-blue-500 shadow-lg'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                      }`}
                  >
                    {/* Plot Header with Checkbox */}
                    <div className="flex items-center justify-between p-3 bg-linear-to-r from-slate-50 to-white">
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={selectedPlots.includes(plot.id)}
                          onChange={(e) => handlePlotSelection(plot.id, e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <div className={`p-2 rounded-lg ${plot.isComplete ? 'bg-emerald-100' : 'bg-indigo-100'}`}>
                          <FaTable className={`h-4 w-4 ${plot.isComplete ? 'text-emerald-600' : 'text-indigo-600'}`} />
                        </div>
                        <div>
                          <div className="flex items-center space-x-3">
                            <h3 className="text-md font-semibold text-slate-900">{plot.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${plot.isComplete ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                              {plot.isComplete ? 'Complete' : 'In Progress'}
                            </span>
                          </div>
                          <div className="text-sm text-slate-500 mt-1">
                            Area: {plot.areaDetails?.plotArea || '0'} Sq-yd
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedPlots([plot.id]);
                            startMultiPlotEditing();
                          }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit this plot"
                        >
                          <FaPen size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Column: Plot Details Panel */}
          <div className="lg:col-span-2">
            {selectedPlots.length === 1 ? (
              // Show details for single selected plot
              (() => {
                const plot = plots.find(p => p.id === selectedPlots[0]);
                return plot ? renderPlotDetailsPanel(false, plot) : (
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">
                    <div className="text-center py-12">
                      <FaBuilding className="mx-auto h-16 w-16 text-indigo-300 mb-4" />
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        Select a Plot
                      </h3>
                      <p className="text-slate-500 mb-4">
                        Select a plot to view and edit detailed information
                      </p>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">
                <div className="text-center py-12">
                  <FaTable className="mx-auto h-16 w-16 text-indigo-300 mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {selectedPlots.length === 0 ? 'Select Plots' : 'Multiple Plots Selected'}
                  </h3>
                  <p className="text-slate-500 mb-4">
                    {selectedPlots.length === 0 
                      ? 'Select one or more plots to edit them together' 
                      : `${selectedPlots.length} plots selected. Click "Edit Selected Plots" to edit them in table view.`
                    }
                  </p>
                  {selectedPlots.length > 0 && (
                    <button
                      onClick={startMultiPlotEditing}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center mx-auto"
                    >
                      <FaEdit className="mr-2" />
                      Edit {selectedPlots.length} Selected Plots
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Save Project Button at bottom */}
        <div className="pt-6">
          <button
            onClick={handleSaveProject}
            className="w-full bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg transition-all duration-200"
          >
            <FaSave className="mr-2 h-5 w-5" />
            <span>Save Complete Project</span>
          </button>
        </div>
      </div>
    );
  };

  // Plot Details Panel
  const renderPlotDetailsPanel = (isInEditMode = false, plot = null) => {
    const currentPlot = plot || currentPlotData;
    
    if (!currentPlot && !isInEditMode) {
      return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">
          <div className="text-center py-12">
            <FaBuilding className="mx-auto h-16 w-16 text-indigo-300 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {isInEditMode ? 'No Plot Selected' : 'Select a Plot'}
            </h3>
            <p className="text-slate-500 mb-4">
              {isInEditMode 
                ? 'Return to table view to select a plot' 
                : 'Select a plot from the list to view and edit details'}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full plot-details-panel">
        {!isInEditMode && (
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">{currentPlot.name}</h2>
              <p className="text-slate-500 text-sm">
                Plot ID: {currentPlot.id}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${currentPlot.isComplete
                ? "bg-emerald-100 text-emerald-800"
                : "bg-indigo-100 text-indigo-800"
                }`}>
                {currentPlot.isComplete ? "Complete" : "In Progress"}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${isCornerPlot
                ? "bg-amber-100 text-amber-800"
                : "bg-blue-100 text-blue-800"
                }`}>
                {isCornerPlot ? "Corner Plot" : "Regular Plot"}
              </span>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Corner Plot Selection */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h3 className="text-sm font-semibold mb-3 text-slate-800 flex items-center">
              <FaQuestionCircle className="mr-2 text-indigo-600 h-4 w-4" />
              Plot Configuration
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  Is this a corner plot?
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      checked={isCornerPlot}
                      onChange={() => setIsCornerPlot(true)}
                      className="text-indigo-600 focus:ring-indigo-500 h-3 w-3"
                    />
                    <span className="ml-2 text-xs text-slate-700">Yes</span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      checked={!isCornerPlot}
                      onChange={() => setIsCornerPlot(false)}
                      className="text-indigo-600 focus:ring-indigo-500 h-3 w-3"
                    />
                    <span className="ml-2 text-xs text-slate-700">No</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Property Features */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center">
              <FaBuilding className="mr-2" />
              Property Features
            </h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Status
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {["prehold", "lease", "vacant"].map((status) => (
                  <label
                    key={status}
                    className="inline-flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="propertyStatus"
                      checked={propertyFeatures.propertyStatus === status}
                      onChange={() =>
                        setPropertyFeatures({
                          ...propertyFeatures,
                          propertyStatus: status,
                        })
                      }
                      className="text-indigo-600 focus:ring-indigo-500 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">
                      {status}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Land Area */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Land Area (sqft)
              </label>
              <input
                type="number"
                value={propertyFeatures.landArea}
                onChange={(e) =>
                  setPropertyFeatures({
                    ...propertyFeatures,
                    landArea: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter land area in square feet"
              />
            </div>

            {/* Outhouse + Possession Status Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 mb-4">
              {/* Outhouse Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Outhouse Available
                </label>
                <div className="flex space-x-6 mb-3">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="hasOuthouse"
                      checked={propertyFeatures.hasOuthouse === "Yes"}
                      onChange={() =>
                        setPropertyFeatures({
                          ...propertyFeatures,
                          hasOuthouse: "Yes",
                        })
                      }
                      className="text-indigo-600 focus:ring-indigo-500 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="hasOuthouse"
                      checked={propertyFeatures.hasOuthouse === "No"}
                      onChange={() =>
                        setPropertyFeatures({
                          ...propertyFeatures,
                          hasOuthouse: "No",
                          outhouseArea: "",
                        })
                      }
                      className="text-indigo-600 focus:ring-indigo-500 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>

                {propertyFeatures.hasOuthouse === "Yes" && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Outhouse Area (sqft)
                    </label>
                    <input
                      type="number"
                      value={propertyFeatures.outhouseArea}
                      onChange={(e) =>
                        setPropertyFeatures({
                          ...propertyFeatures,
                          outhouseArea: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter outhouse area"
                    />
                  </div>
                )}
              </div>

              {/* Possession Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Possession Status
                </label>
                <div className="flex flex-wrap space-x-6">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="possessionStatus"
                      checked={
                        propertyFeatures.possessionStatus ===
                        "Under Construction"
                      }
                      onChange={() =>
                        setPropertyFeatures({
                          ...propertyFeatures,
                          possessionStatus: "Under Construction",
                        })
                      }
                      className="text-indigo-600 focus:ring-indigo-500 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Under Construction
                    </span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="possessionStatus"
                      checked={
                        propertyFeatures.possessionStatus === "Ready to Move"
                      }
                      onChange={() =>
                        setPropertyFeatures({
                          ...propertyFeatures,
                          possessionStatus: "Ready to Move",
                        })
                      }
                      className="text-indigo-600 focus:ring-indigo-500 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Ready to Move
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Available From */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available From
              </label>
              <div className="flex space-x-4">
                <select
                  value={propertyFeatures.availableFromMonth}
                  onChange={(e) =>
                    setPropertyFeatures({
                      ...propertyFeatures,
                      availableFromMonth: e.target.value,
                    })
                  }
                  className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
                <select
                  value={propertyFeatures.availableFromYear}
                  onChange={(e) =>
                    setPropertyFeatures({
                      ...propertyFeatures,
                      availableFromYear: e.target.value,
                    })
                  }
                  className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Year</option>
                  {Array.from(
                    { length: 10 },
                    (_, i) => new Date().getFullYear() + i
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Original Property Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  No. of Open Sides
                </label>
                <select
                  value={propertyFeatures.openSides}
                  onChange={(e) =>
                    setPropertyFeatures({
                      ...propertyFeatures,
                      openSides: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select</option>
                  <option value="1">1 Side</option>
                  <option value="2">2 Sides</option>
                  <option value="3">3 Sides</option>
                  <option value="4">4 Sides</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Width of Road Facing the Plot (Meters)
                </label>
                <input
                  type="number"
                  value={propertyFeatures.roadWidth}
                  onChange={(e) =>
                    setPropertyFeatures({
                      ...propertyFeatures,
                      roadWidth: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Meters"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Boundary Wall Made
                </label>
                <select
                  value={propertyFeatures.boundaryWall}
                  onChange={(e) =>
                    setPropertyFeatures({
                      ...propertyFeatures,
                      boundaryWall: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gated Colony
                </label>
                <select
                  value={propertyFeatures.gatedColony}
                  onChange={(e) =>
                    setPropertyFeatures({
                      ...propertyFeatures,
                      gatedColony: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            {/* Facilities */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Facilities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {FACILITIES.map((facility) => (
                  <label
                    key={facility.key}
                    className="inline-flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={propertyFeatures[facility.key] || false}
                      onChange={(e) =>
                        setPropertyFeatures({
                          ...propertyFeatures,
                          [facility.key]: e.target.checked,
                        })
                      }
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {facility.label}
                    </span>
                  </label>
                ))}
                {plotCustomFacilities.map((facility, idx) => (
                  <label
                    key={idx}
                    className="inline-flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={propertyFeatures[facility] || false}
                      onChange={(e) =>
                        setPropertyFeatures({
                          ...propertyFeatures,
                          [facility]: e.target.checked,
                        })
                      }
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {facility}
                    </span>
                    <button
                      type="button"
                      className="ml-2 text-gray-500"
                      onClick={() =>
                        setPlotCustomFacilities(
                          plotCustomFacilities.filter((f) => f !== facility)
                        )
                      }
                    >
                      <FaTrash />
                    </button>
                  </label>
                ))}
              </div>
              <div className="flex mt-2">
                <input
                  type="text"
                  placeholder="Add custom facility"
                  className="border border-gray-300 rounded-md p-2 flex-1"
                  value={propertyFeatures.newFacility || ""}
                  onChange={(e) =>
                    setPropertyFeatures({
                      ...propertyFeatures,
                      newFacility: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  className="ml-2 bg-indigo-500 text-white px-3 py-1 rounded"
                  onClick={() => {
                    if (
                      propertyFeatures.newFacility &&
                      !plotCustomFacilities.includes(
                        propertyFeatures.newFacility.trim()
                      )
                    ) {
                      setPlotCustomFacilities([
                        ...plotCustomFacilities,
                        propertyFeatures.newFacility.trim(),
                      ]);
                      setPropertyFeatures({
                        ...propertyFeatures,
                        newFacility: "",
                      });
                    }
                  }}
                >
                  Add More
                </button>
              </div>
            </div>
          </div>

          {/* Area Details */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-semibold mb-3 text-slate-800 flex items-center">
              <FaRulerCombined className="mr-2 text-indigo-600 h-4 w-4" />
              Area Details
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Plot Area (Sq-yd)
                </label>
                <input
                  type="number"
                  min="0"
                  value={areaDetails.plotArea || ""}
                  onChange={(e) =>
                    setAreaDetails({
                      ...areaDetails,
                      plotArea: e.target.value,
                    })
                  }
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  placeholder="Sq-yd"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Plot Length (yd)
                </label>
                <input
                  type="number"
                  min="0"
                  value={areaDetails.plotLength || ""}
                  onChange={(e) =>
                    setAreaDetails({
                      ...areaDetails,
                      plotLength: e.target.value,
                    })
                  }
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  placeholder="yd"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Plot Breadth (yd)
                </label>
                <input
                  type="number"
                  min="0"
                  value={areaDetails.plotBreadth || ""}
                  onChange={(e) =>
                    setAreaDetails({
                      ...areaDetails,
                      plotBreadth: e.target.value,
                    })
                  }
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  placeholder="yd"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Land Area (sqft)
                </label>
                <input
                  type="number"
                  value={propertyFeatures.landArea || ""}
                  onChange={(e) =>
                    setPropertyFeatures({
                      ...propertyFeatures,
                      landArea: e.target.value,
                    })
                  }
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  placeholder="sqft"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold mb-4 text-indigo-700">
              Additional Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Kissama */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kissama
                </label>
                <input
                  type="text"
                  value={kissama}
                  onChange={(e) => setKissama(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter Kissama details"
                />
              </div>

              {/* Boundary Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Boundary Type
                </label>
                <select
                  value={boundary}
                  onChange={(e) => setBoundary(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select boundary type</option>
                  <option value="brick">Brick</option>
                  <option value="concrete">Concrete</option>
                  <option value="iron">Iron</option>
                  <option value="wood">Wood</option>
                  <option value="none">None</option>
                </select>
              </div>

              {/* Broker */}
              <div>
                {renderBrokerSelect()}
              </div>

              {/* Reference */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reference
                </label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter staff name or ID"
                />
              </div>

              {/* Staff Engaged */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Staff Engaged (if any)
                </label>
                <input
                  type="text"
                  value={staffEngaged}
                  onChange={(e) => setStaffEngaged(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter staff name or ID"
                />
              </div>

              {/* Loan Provider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Provider
                </label>
                <input
                  type="text"
                  value={loanProvider}
                  onChange={(e) => setLoanProvider(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter loan provider name"
                />
              </div>
            </div>
          </div>

          {/* Approval Status */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold mb-4 text-indigo-700">
              Approval Status
            </h3>
            <div className="space-y-4">
              {approvalStatus.map((approval, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Approval Authority
                    </label>
                    <input
                      type="text"
                      value={approval.authority}
                      onChange={(e) =>
                        handleApprovalChange(index, "authority", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="e.g., RERA, Local Authority"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={approval.status}
                      onChange={(e) =>
                        handleApprovalChange(index, "status", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select status</option>
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Applied">Applied</option>
                    </select>
                  </div>
                  <div>
                    {index === approvalStatus.length - 1 ? (
                      <button
                        onClick={addApprovalAuthority}
                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md transition duration-300"
                      >
                        + Add More
                      </button>
                    ) : (
                      <button
                        onClick={() => removeApprovalAuthority(index)}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Details */}
          <div className=" border-t border-gray-200 pt-4">
            <h3 className="text-sm font-semibold mb-3 text-slate-800 flex items-center">
              <FaMoneyBill className="mr-2 text-indigo-600 h-4 w-4" />
              Price Details
            </h3>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Expected Price (₹)
                </label>
                <input
                  type="text"
                  value={priceDetails.expectedPrice || ""}
                  onChange={(e) =>
                    setPriceDetails({
                      ...priceDetails,
                      expectedPrice: e.target.value,
                    })
                  }
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  placeholder="e.g., 5000000"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Token Amount (₹)
                </label>
                <input
                  type="text"
                  value={priceDetails.tokenAmount || ""}
                  onChange={(e) =>
                    setPriceDetails({
                      ...priceDetails,
                      tokenAmount: e.target.value,
                    })
                  }
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  placeholder="e.g., 50000"
                />
              </div>
            </div>

          </div>

          {/* Update/Save Button */}
          {isInEditMode ? (
               <div className="pt-6">
            <button
              onClick={saveCurrentPlot}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-4 rounded-xl transition-all duration-200 text-sm font-medium flex items-center justify-center"
            >
              <FaSaveIcon className="mr-2 h-3 w-3" />
              Save Plot & Return to Table
            </button>
            </div>
          ) : (
            
<button
  onClick={() => {
    if (currentPlot) {
      const updatedPlots = plots.map((plot) => {
        if (plot.id === currentPlot.id) {
          const updatedPlot = {
            ...plot,
            isCornerPlot,
            priceDetails,
            propertyFeatures,
            areaDetails,
            kissama,
            purchaser,
            constructor,
            lastSaved: new Date().toISOString(), // ✅
            isBeingEdited: false                 // ✅
          };

          updatedPlot.isComplete = !!(
            priceDetails.expectedPrice &&
            areaDetails.plotArea &&
            purchaser &&
            constructor
          );

          return updatedPlot;
        }
        return plot;
      });

      setPlots(updatedPlots);
      alert("Plot details updated successfully!");
    }
  }}
  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-xl"
>
  Update Plot Details
</button>

          )}

          {/* Clear Selection/Return Button */}
          {!isInEditMode && (
            <button
              onClick={() => {
                setSelectedPlots([]);
              }}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded-xl transition-all duration-200 text-sm font-medium flex items-center justify-center"
            >
              <FaTimes className="mr-2 h-3 w-3" />
              Clear Selection
            </button>
          )}
        </div>
      </div>
    );
  };

  // Main render with tab navigation
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-white p-4 relative md:p-6">
                {/* ❌ Back to PABC */}
    {editingProjectId && (
      <button
        onClick={onClose}
        className="absolute  right-0 top-0 z-20
                   w-10 h-10 rounded-full
                   flex items-center justify-center
                   text-slate-500 hover:text-slate-800
                   hover:bg-slate-200 transition"
        title="Back to Project List"
      >
        <FaTimes size={18} />
      </button>
    )}
     <div className="max-w-7xl mx-auto space-y-6 ">

        {/* Navigation Tabs */}
        <NavigationTabs />

        {/* Content based on active tab */}
        {activeTab === "project-info" && renderProjectInfo()}
        {activeTab === "revenue-plots" && renderRevenuePlots()}
        {activeTab === "plots" && renderPlots()}
      </div>
    </div>
  );
};

export default PlottingProject;