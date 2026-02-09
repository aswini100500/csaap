// import React, { useState, useEffect, useCallback, useRef } from "react";
// import {
//   FaPlus,
//   FaTimes,
//   FaBuilding,
//   FaMapMarkerAlt,
//   FaSync,
//   FaTrash,
//   FaFileExcel,
//   FaDownload,
//   FaHome,
//   FaLayerGroup,
//   FaMapMarkedAlt,
//   FaFileInvoice,
//   FaEdit,
// } from "react-icons/fa";
// import PlottingProject from "./PlottingProject";
// import DuplexTriplexProject from "./DuplexTriplexProject";
// import ApartmentProject from "./ApartmentProject";
// import CommercialProject from "./CommercialProject";
// import CustomProject from "./CustomProject";
// import * as XLSX from "xlsx";

// // Shared imports
// import {
//   PROJECT_TYPES,
//   FACILITIES,
//   FACING_OPTIONS,
//   BROKER_LIST,
// } from "./shared/Constants";
// import {
//   INITIAL_MAIN_INFO,
//   INITIAL_FLOOR_DETAILS,
//   INITIAL_PROPERTY_FEATURES,
//   INITIAL_AREA_DETAILS,
//   INITIAL_APPROVAL_STATUS,
//   INITIAL_TRANSACTION_TYPE,
//   INITIAL_PRICE_DETAILS,
// } from "./shared/initialStates";

// // Common Components
// import ProjectDetailsTable from "./ProjectDetailsTable";
// import ProjectViewForm from "./ProjectViewForm";
// import CustomizeSelect from "./CustomizeSelect";

// // Create constants object for DuplexTriplexProject
// const DUPLEX_TRIPLEX_CONSTANTS = {
//   INITIAL_MAIN_INFO,
//   INITIAL_FLOOR_DETAILS,
//   INITIAL_PROPERTY_FEATURES,
//   INITIAL_AREA_DETAILS,
//   INITIAL_APPROVAL_STATUS,
//   INITIAL_TRANSACTION_TYPE,
//   INITIAL_PRICE_DETAILS,
//   FACILITIES: FACILITIES || [],
//   FACING_OPTIONS: FACING_OPTIONS || [
//     "North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West"
//   ],
//   BROKER_LIST: BROKER_LIST || [],
// };

// const PABC = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [projects, setProjects] = useState([]);
//   const [expandedProject, setExpandedProject] = useState(null);
//   const [viewProjectId, setViewProjectId] = useState(null);
//   const [viewProjectData, setViewProjectData] = useState(null);
//   const [showCustomizeSelect, setShowCustomizeSelect] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Project Form State
//   const [projectName, setProjectName] = useState("");
//   const [projectType, setProjectType] = useState("");
//   const [city, setCity] = useState("");
//   const [locality, setLocality] = useState("");
//   const [landZone, setLandZone] = useState("");
//   const [commercialSubType, setCommercialSubType] = useState("");
//   const [editingProjectId, setEditingProjectId] = useState(null);

//   // Additional state for Duplex/Triplex projects
//   const [landArea, setLandArea] = useState("");
//   const [revenuePlots, setRevenuePlots] = useState("");
//   const [addRevenuePlotNumber, setAddRevenuePlotNumber] = useState("");
//   const [attachment, setAttachment] = useState(null);

//   const [selectedCustomTypes, setSelectedCustomTypes] = useState([]);
//   const [currentCustomType, setCurrentCustomType] = useState("");

//   // Load projects from localStorage on mount
//   useEffect(() => {
//     const savedProjects = localStorage.getItem("local_projects");
//     if (savedProjects) {
//       try {
//         setProjects(JSON.parse(savedProjects));
//       } catch (err) {
//         console.error("Failed to parse projects from localStorage", err);
//       }
//     }
//   }, []);

//   // Save projects to localStorage whenever state changes
//   useEffect(() => {
//     localStorage.setItem("local_projects", JSON.stringify(projects));
//   }, [projects]);

//   const resetForm = useCallback(() => {
//     setProjectName("");
//     setProjectType("");
//     setCity("");
//     setLocality("");
//     setLandZone("");
//     setCommercialSubType("");
//     setLandArea("");
//     setRevenuePlots("");
//     setAddRevenuePlotNumber("");
//     setAttachment(null);
//     setEditingProjectId(null);
//     setShowCustomizeSelect(false);
//     setSelectedCustomTypes([]);
//     setCurrentCustomType("");
//   }, []);

//   const formatDate = useCallback((dateString) => {
//     if (!dateString) return "-";
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return dateString;
//       return date.toLocaleDateString();
//     } catch {
//       return dateString;
//     }
//   }, []);

//   const handleSaveProject = useCallback((projectData) => {
//     setLoading(true);

//     // Simulate slight delay for consistency
//     setTimeout(() => {
//       if (editingProjectId) {
//         setProjects(prev => prev.map(p =>
//           p.id === editingProjectId ? { ...projectData, updatedAt: new Date().toISOString() } : p
//         ));
//         alert("Project updated locally!");
//       } else {
//         const newProject = {
//           ...projectData,
//           id: projectData.id || `PRJ-${Math.floor(100000 + Math.random() * 899999)}`,
//           createdAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString(),
//           status: "locally_saved"
//         };
//         setProjects(prev => [newProject, ...prev]);
//         alert("Project saved locally!");
//       }

//       setLoading(false);
//       resetForm();
//       setShowForm(false);
//     }, 500);
//   }, [editingProjectId, resetForm]);

//   const deleteProject = useCallback((id) => {
//     if (window.confirm("Are you sure you want to delete this project?")) {
//       setProjects(prev => prev.filter(p => p.id !== id));
//       if (expandedProject === id) setExpandedProject(null);
//       alert("Project deleted locally.");
//     }
//   }, [expandedProject]);

//   const editProject = useCallback((project) => {
//     setEditingProjectId(project.id);
//     setProjectName(project.name || "");
//     setProjectType(project.type || "");
//     setCity(project.city || "");
//     setLocality(project.locality || "");
//     setLandZone(project.land_zone || project.landZone || "");
//     setCommercialSubType(project.commercial_sub_type || project.commercialSubType || "");
//     setLandArea(project.total_land_area || project.landArea || "");
//     setRevenuePlots(project.revenue_plots || project.revenuePlots || "");
//     setAddRevenuePlotNumber(project.addRevenuePlotNumber || "");
//     setAttachment(project.attachment || null);

//     if (project.type === PROJECT_TYPES.CUSTOM) {
//       const customTypes = project.custom_selected_types || [];
//       setSelectedCustomTypes(customTypes);
//       if (customTypes.length > 0) setCurrentCustomType(customTypes[0]);
//     }

//     setShowForm(true);
//   }, []);

//   const handleViewProject = useCallback((project) => {
//     setViewProjectData(project);
//     setViewProjectId(project.id);
//   }, []);

//   const closeViewProject = useCallback(() => {
//     setViewProjectId(null);
//     setViewProjectData(null);
//   }, []);

//   const toggleProjectExpansion = useCallback((id) => {
//     setExpandedProject(expandedProject === id ? null : id);
//   }, [expandedProject]);

//   const handleProjectTypeChange = (e) => {
//     const newType = e.target.value;
//     setProjectType(newType);
//     setShowCustomizeSelect(newType === PROJECT_TYPES.CUSTOM);
//   };

//   const handleCustomizeTypeSelect = (selectedTypes) => {
//     const typesArray = Array.isArray(selectedTypes) ? selectedTypes : [selectedTypes];
//     setSelectedCustomTypes(typesArray);
//     if (typesArray.length > 0) setCurrentCustomType(typesArray[0]);
//     setShowCustomizeSelect(false);
//     setProjectType(PROJECT_TYPES.CUSTOM);
//   };

//   const exportAllProjectsToExcel = () => {
//     if (projects.length === 0) {
//       alert("No projects to export.");
//       return;
//     }
//     const ws = XLSX.utils.json_to_sheet(projects);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "All Projects");
//     XLSX.writeFile(wb, `All_Projects_${new Date().toISOString().slice(0, 10)}.xlsx`);
//   };

//   const renderProjectForm = () => {
//     if (showCustomizeSelect) {
//       return (
//         <CustomizeSelect
//           initialSelected={selectedCustomTypes}
//           onBack={() => setShowCustomizeSelect(false)}
//           onSelectType={handleCustomizeTypeSelect}
//         />
//       );
//     }

//     const commonProps = {
//       projectName,
//       setProjectName,
//       projectType,
//       setProjectType,
//       city,
//       setCity,
//       locality,
//       setLocality,
//       landZone,
//       setLandZone,
//       commercialSubType,
//       setCommercialSubType,
//       onSaveProject: handleSaveProject,
//       PROJECT_TYPES,
//       editingProjectId,
//     };

//     const duplexTriplexProps = {
//       ...commonProps,
//       landArea,
//       setLandArea,
//       revenuePlots,
//       setRevenuePlots,
//       addRevenuePlotNumber,
//       setAddRevenuePlotNumber,
//       attachment,
//       setAttachment,
//       constants: DUPLEX_TRIPLEX_CONSTANTS,
//       selectedProject: editingProjectId ? projects.find(p => p.id === editingProjectId) : null,
//     };

//     if (projectType === PROJECT_TYPES.CUSTOM && selectedCustomTypes.length > 0) {
//       return (
//         <div className="space-y-4">
//           <div className="flex gap-2 flex-wrap">
//             {selectedCustomTypes.map(type => (
//               <button
//                 key={type}
//                 onClick={() => setCurrentCustomType(type)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currentCustomType === type ? "bg-indigo-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }`}
//               >
//                 {type.toUpperCase()}
//               </button>
//             ))}
//           </div>
//           <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50">
//             {currentCustomType === "plotting" ? (
//               <PlottingProject {...commonProps} />
//             ) : currentCustomType === "duplex" || currentCustomType === "triplex" ? (
//               <DuplexTriplexProject {...duplexTriplexProps} projectType={currentCustomType} />
//             ) : currentCustomType === "apartment" ? (
//               <ApartmentProject {...commonProps} />
//             ) : currentCustomType === "commercial" ? (
//               <CommercialProject {...commonProps} />
//             ) : (
//               <CustomProject {...commonProps} activeType={currentCustomType} />
//             )}
//           </div>
//         </div>
//       );
//     }

//     switch (projectType) {
//       case PROJECT_TYPES.PLOTTING: return <PlottingProject {...commonProps} />;
//       case PROJECT_TYPES.DUPLEX: return <DuplexTriplexProject {...duplexTriplexProps} projectType="duplex" />;
//       case PROJECT_TYPES.TRIPLEX: return <DuplexTriplexProject {...duplexTriplexProps} projectType="triplex" />;
//       case PROJECT_TYPES.APARTMENT: return <ApartmentProject {...commonProps} />;
//       case PROJECT_TYPES.COMMERCIAL: return <CommercialProject {...commonProps} />;
//       case PROJECT_TYPES.CUSTOM: return (
//         <div className="p-8 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
//           <p className="text-gray-500 mb-4">Select custom project types to continue</p>
//           <button onClick={() => setShowCustomizeSelect(true)} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium shadow-md">
//             Choose Types
//           </button>
//         </div>
//       );
//       default: return null;
//     }
//   };

//   return (
//     <div className=" bg-slate-50 text-slate-900">
//       <div className="max-w-7xl mx-auto py-8">
//         <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//           <div className="space-y-1">
//             <h1 className="text-4xl font-extrabold text-indigo-900 tracking-tight">Project Management</h1>
//             <p className="text-slate-500 font-medium">Create and track your property projects locally</p>
//           </div>
//           <div className="flex gap-3">
//             <button
//               onClick={exportAllProjectsToExcel}
//               className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-emerald-100 transition-all font-semibold"
//             >
//               <FaFileExcel /> Export
//             </button>
//             <button
//               onClick={() => setShowForm(true)}
//               className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 font-semibold"
//             >
//               <FaPlus /> New Project
//             </button>
//           </div>
//         </header>

//         {!showForm ? (
//           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
//             <div className="p-6 border-b border-slate-100 bg-slate-50/50">
//               <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
//                 <FaLayerGroup className="text-indigo-500" />
//                 Active Projects ({projects.length})
//               </h2>
//             </div>

//             <div className="overflow-x-auto">
//               {projects.length === 0 ? (
//                 <div className="py-20 text-center space-y-4">
//                   <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
//                     <FaBuilding className="text-slate-400 text-2xl" />
//                   </div>
//                   <div className="space-y-1">
//                     <h3 className="text-lg font-bold text-slate-700">No projects yet</h3>
//                     <p className="text-slate-500">Create your first project to get started</p>
//                   </div>
//                 </div>
//               ) : (
//                 <table className="w-full text-left border-collapse">
//                   <thead>
//                     <tr className="bg-slate-50/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
//                       <th className="px-6 py-4">Project</th>
//                       <th className="px-6 py-4">Type</th>
//                       <th className="px-6 py-4">Location</th>
//                       <th className="px-6 py-4">Created At</th>
//                       <th className="px-6 py-4 text-right">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-100">
//                     {projects.map(project => (
//                       <React.Fragment key={project.id}>
//                         <tr className="group hover:bg-indigo-50/30 transition-colors">
//                           <td className="px-6 py-4">
//                             <div className="flex items-center gap-3">
//                               <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
//                                 {project.name?.charAt(0) || "P"}
//                               </div>
//                               <div>
//                                 <div className="font-bold text-slate-800">{project.name}</div>
//                                 <div className="text-xs text-slate-400 font-mono">{project.id}</div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
//                               {project.type}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="flex items-center gap-1.5 text-slate-600 font-medium">
//                               <FaMapMarkerAlt className="text-rose-500 text-xs" />
//                               {project.city || "Not set"}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 text-slate-500 text-sm">
//                             {formatDate(project.createdAt)}
//                           </td>
//                           <td className="px-6 py-4 text-right">
//                             <div className="flex items-center justify-end gap-2">
//                               <button onClick={() => editProject(project)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
//                                 <FaEdit />
//                               </button>
//                               <button onClick={() => deleteProject(project.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
//                                 <FaTrash />
//                               </button>
//                               <button onClick={() => toggleProjectExpansion(project.id)} className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
//                                 {expandedProject === project.id ? <FaTimes /> : <FaSync className="text-xs" />}
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                         {expandedProject === project.id && (
//                           <tr className="bg-slate-50/80">
//                             <td colSpan="5" className="px-6 py-6 border-b border-indigo-100">
//                               <div className="bg-white rounded-xl p-6 border border-indigo-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
//                                 <div className="space-y-1">
//                                   <label className="text-[10px] font-bold text-slate-400 uppercase">Locality</label>
//                                   <p className="font-semibold text-slate-700">{project.locality || "Not specified"}</p>
//                                 </div>
//                                 <div className="space-y-1">
//                                   <label className="text-[10px] font-bold text-slate-400 uppercase">Land Area</label>
//                                   <p className="font-semibold text-slate-700">{project.total_land_area || project.landArea || "N/A"}</p>
//                                 </div>
//                                 <div className="space-y-1 text-right">
//                                   <button onClick={() => handleViewProject(project)} className="text-indigo-600 font-bold text-sm hover:underline">
//                                     View Detailed Stats &rarr;
//                                   </button>
//                                 </div>
//                               </div>
//                             </td>
//                           </tr>
//                         )}
//                       </React.Fragment>
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         ) : (
//           <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
//             {/* <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
//                   <FaPlus className="w-4 h-4" />
//                 </div>
//                 <h2 className="text-xl font-bold text-slate-800">
//                   {editingProjectId ? "Update Project" : "Initialize New Project"}
//                 </h2>
//               </div>
//               <button
//                 onClick={() => {
//                   if (window.confirm("Abandon changes?")) { resetForm(); setShowForm(false); }
//                 }}
//                 className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"
//               >
//                 <FaTimes />
//               </button>
//             </div> */}

//             <div className="">
//               {!projectType && !showCustomizeSelect ? (
//                 <div className="max-w-2xl mx-auto space-y-8">
//                   <div className="space-y-2 text-center mb-8">
//                     <h3 className="text-2xl font-bold text-indigo-900">Let's get started</h3>
//                     <p className="text-slate-500">Enter the basic details to build your project configuration</p>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2 col-span-2">
//                       <label className="text-sm font-bold text-slate-700 ml-1">Project Name</label>
//                       <input
//                         type="text"
//                         value={projectName}
//                         onChange={(e) => setProjectName(e.target.value)}
//                         className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//                         placeholder="e.g. Skyline Heights"
//                       />
//                     </div>
//                     <div className="space-y-2 col-span-2">
//                       <label className="text-sm font-bold text-slate-700 ml-1">Project Type</label>
//                       <select
//                         value={projectType}
//                         onChange={handleProjectTypeChange}
//                         className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none bg-white"
//                       >
//                         <option value="">Select a category</option>
//                         <option value={PROJECT_TYPES.PLOTTING}>Plotting</option>
//                         <option value={PROJECT_TYPES.DUPLEX}>Duplex</option>
//                         <option value={PROJECT_TYPES.TRIPLEX}>Triplex</option>
//                         <option value={PROJECT_TYPES.APARTMENT}>Apartment</option>
//                         <option value={PROJECT_TYPES.COMMERCIAL}>Commercial</option>
//                         <option value={PROJECT_TYPES.CUSTOM}>Custom / Multiple</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 renderProjectForm()
//               )}
//             </div>
//           </div>
//         )}

//         {viewProjectId && viewProjectData && (
//           <ProjectViewForm project={viewProjectData} onClose={closeViewProject} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default PABC;

// Correct But problem in edit part
// import React, { useState, useEffect, useCallback, useRef } from "react";
// // Add these imports
// import projectService from "./projectService"; // Your API service

// import {
//   FaPlus,
//   FaTimes,
//   FaBuilding,
//   FaMapMarkerAlt,
//   FaSync,
//     FaSpinner,
//   FaCloudDownloadAlt,
//   FaCloudUploadAlt,
//   FaDatabase,
//   FaTrash,
//   FaFileExcel,
//   FaDownload,
//   FaHome,
//   FaLayerGroup,
//   FaMapMarkedAlt,
//   FaFileInvoice,
//   FaEdit,
//   FaEye,
//   FaTable,
//   FaCheckCircle,
//   FaPen,
//   FaArrowLeft,
//   FaSave,
//   FaList,
//   FaChartBar,
//   FaExclamationCircle,
//   FaCheck,
//   FaTimesCircle
// } from "react-icons/fa";
// import PlottingProject from "./PlottingProject";
// import DuplexTriplexProject from "./DuplexTriplexProject";
// import ApartmentProject from "./ApartmentProject";
// import CommercialProject from "./CommercialProject";
// import CustomProject from "./CustomProject";
// import * as XLSX from "xlsx";

// // Shared imports
// import {
//   PROJECT_TYPES,
//   FACILITIES,
//   FACING_OPTIONS,
//   BROKER_LIST,
// } from "./shared/Constants";
// import {
//   INITIAL_MAIN_INFO,
//   INITIAL_FLOOR_DETAILS,
//   INITIAL_PROPERTY_FEATURES,
//   INITIAL_AREA_DETAILS,
//   INITIAL_APPROVAL_STATUS,
//   INITIAL_TRANSACTION_TYPE,
//   INITIAL_PRICE_DETAILS,
// } from "./shared/initialStates";

// // Common Components
// import ProjectDetailsTable from "./ProjectDetailsTable";
// import ProjectViewForm from "./ProjectViewForm";
// import CustomizeSelect from "./CustomizeSelect";

// // Create constants object for DuplexTriplexProject
// const DUPLEX_TRIPLEX_CONSTANTS = {
//   INITIAL_MAIN_INFO,
//   INITIAL_FLOOR_DETAILS,
//   INITIAL_PROPERTY_FEATURES,
//   INITIAL_AREA_DETAILS,
//   INITIAL_APPROVAL_STATUS,
//   INITIAL_TRANSACTION_TYPE,
//   INITIAL_PRICE_DETAILS,
//   FACILITIES: FACILITIES || [],
//   FACING_OPTIONS: FACING_OPTIONS || [
//     "North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West"
//   ],
//   BROKER_LIST: BROKER_LIST || [],
// };

// const PABC = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [projects, setProjects] = useState([]);
//   const [expandedProject, setExpandedProject] = useState(null);
//   const [viewProjectId, setViewProjectId] = useState(null);
//   const [viewProjectData, setViewProjectData] = useState(null);
//   const [showCustomizeSelect, setShowCustomizeSelect] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Plot Editing Overview state
//   const [showPlotEditingOverview, setShowPlotEditingOverview] = useState(false);
//   const [selectedProjectForEditing, setSelectedProjectForEditing] = useState(null);
//   const [editingPlots, setEditingPlots] = useState([]);
//   const [editingPlotId, setEditingPlotId] = useState(null); // NEW: Track specific plot to edit

//   // Project Form State
//   const [projectName, setProjectName] = useState("");
//   const [projectType, setProjectType] = useState("");
//   const [city, setCity] = useState("");
//   const [locality, setLocality] = useState("");
//   const [landZone, setLandZone] = useState("");
//   const [commercialSubType, setCommercialSubType] = useState("");
//   const [editingProjectId, setEditingProjectId] = useState(null);

//   // Additional state for Duplex/Triplex projects
//   const [landArea, setLandArea] = useState("");
//   const [revenuePlots, setRevenuePlots] = useState("");
//   const [addRevenuePlotNumber, setAddRevenuePlotNumber] = useState("");
//   const [attachment, setAttachment] = useState(null);

//   const [selectedCustomTypes, setSelectedCustomTypes] = useState([]);
//   const [currentCustomType, setCurrentCustomType] = useState("");

//   // Add these states
// const [apiLoading, setApiLoading] = useState(false);
// const [syncStatus, setSyncStatus] = useState({
//   local: 0,
//   server: 0,
//   lastSynced: null
// });

// // Replace the first useEffect with this
// useEffect(() => {
//   loadAllProjects();
// }, []);

// // Add this function after the useEffect
// const loadAllProjects = async () => {
//   try {
//     setApiLoading(true);

//     // Load from localStorage first
//     const savedProjects = localStorage.getItem("local_projects");
//     let localProjects = [];

//     if (savedProjects) {
//       try {
//         localProjects = JSON.parse(savedProjects);
//       } catch (err) {
//         console.error("Failed to parse projects from localStorage", err);
//       }
//     }

//     // Try to load from API
//     let serverProjects = [];
//     try {
//       // Fetch all project types from API
//       const [apartments, commercials, plottings, duplexes, triplexes] = await Promise.all([
//         projectService.getAllApartments(),
//         projectService.getAllCommercials(),
//         projectService.getAllPlottings(),
//         projectService.getAllDuplexes(),
//         projectService.getAllTriplexes()
//       ]);

//       // Combine all projects from API
//       serverProjects = [
//         ...apartments.map(p => ({ ...p, source: 'server', type: 'apartment' })),
//         ...commercials.map(p => ({ ...p, source: 'server', type: 'commercial' })),
//         ...plottings.map(p => ({ ...p, source: 'server', type: 'plotting' })),
//         ...duplexes.map(p => ({ ...p, source: 'server', type: 'duplex' })),
//         ...triplexes.map(p => ({ ...p, source: 'server', type: 'triplex' }))
//       ];
//     } catch (apiError) {
//       console.warn("API not available, using local storage only", apiError);
//     }

//     // Merge local and server projects
//     const allProjects = [...serverProjects];

//     // Add local projects that don't exist on server
//     localProjects.forEach(localProject => {
//       const existsOnServer = allProjects.some(serverProject =>
//         serverProject.id === localProject.id
//       );
//       if (!existsOnServer) {
//         allProjects.push({ ...localProject, source: 'local' });
//       }
//     });

//     setProjects(allProjects);

//     // Update sync status
//     setSyncStatus({
//       local: localProjects.length,
//       server: serverProjects.length,
//       lastSynced: new Date().toISOString()
//     });

//   } catch (error) {
//     console.error("Error loading projects:", error);
//     setError("Failed to load projects. Please check your connection.");
//   } finally {
//     setApiLoading(false);
//   }
// };

//   // Save projects to localStorage whenever state changes
//   useEffect(() => {
//     localStorage.setItem("local_projects", JSON.stringify(projects));
//   }, [projects]);

//   // Clear editing plot flag when closing form
//   useEffect(() => {
//     if (!showForm && editingPlotId) {
//       setEditingPlotId(null);
//     }
//   }, [showForm, editingPlotId]);

//   const resetForm = useCallback(() => {
//     setProjectName("");
//     setProjectType("");
//     setCity("");
//     setLocality("");
//     setLandZone("");
//     setCommercialSubType("");
//     setLandArea("");
//     setRevenuePlots("");
//     setAddRevenuePlotNumber("");
//     setAttachment(null);
//     setEditingProjectId(null);
//     setEditingPlotId(null); // Clear editing plot ID
//     setShowCustomizeSelect(false);
//     setSelectedCustomTypes([]);
//     setCurrentCustomType("");
//   }, []);

//   const formatDate = useCallback((dateString) => {
//     if (!dateString) return "-";
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return dateString;
//       return date.toLocaleDateString();
//     } catch {
//       return dateString;
//     }
//   }, []);

// const handleSaveProject = useCallback(async (projectData) => {
//   setLoading(true);

//   try {
//     let savedProject;

//     if (editingProjectId) {
//       // Check if project exists on server
//       const existingProject = projects.find(p => p.id === editingProjectId);
//       const isServerProject = existingProject?.source === 'server';

//       if (isServerProject) {
//         // Update on server based on project type
//         switch (projectData.type) {
//           case 'apartment':
//             savedProject = await projectService.updateApartment(editingProjectId, projectData);
//             break;
//           case 'commercial':
//             savedProject = await projectService.updateCommercial(editingProjectId, projectData);
//             break;
//           case 'plotting':
//             savedProject = await projectService.updatePlotting(editingProjectId, projectData);
//             break;
//           case 'duplex':
//             savedProject = await projectService.updateDuplex(editingProjectId, projectData);
//             break;
//           case 'triplex':
//             savedProject = await projectService.updateTriplex(editingProjectId, projectData);
//             break;
//           default:
//             throw new Error(`Unknown project type: ${projectData.type}`);
//         }
//         savedProject = { ...savedProject, source: 'server' };
//         alert("Project updated on server!");
//       } else {
//         // Update locally
//         savedProject = {
//           ...projectData,
//           updatedAt: new Date().toISOString(),
//           plots: projectData.plots?.map(plot => ({
//             ...plot,
//             isBeingEdited: false
//           })) || [],
//           source: 'local'
//         };
//         alert("Project updated locally!");
//       }

//       setProjects(prev => prev.map(p =>
//         p.id === editingProjectId ? savedProject : p
//       ));
//     } else {
//       // Create new project
//       try {
//         // Try to save to server first
//         let serverResponse;
//         switch (projectData.type) {
//           case 'apartment':
//             serverResponse = await projectService.createApartment(projectData);
//             break;
//           case 'commercial':
//             serverResponse = await projectService.createCommercial(projectData);
//             break;
//           case 'plotting':
//             serverResponse = await projectService.createPlotting(projectData);
//             break;
//           case 'duplex':
//             serverResponse = await projectService.createDuplex(projectData);
//             break;
//           case 'triplex':
//             serverResponse = await projectService.createTriplex(projectData);
//             break;
//           default:
//             // For custom or unknown types, save locally
//             throw new Error("Custom projects saved locally only");
//         }

//         savedProject = {
//           ...serverResponse,
//           source: 'server',
//           createdAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString()
//         };
//         alert("Project created on server!");
//       } catch (serverError) {
//         console.warn("Server not available, saving locally:", serverError);
//         // Save locally if server fails
//         savedProject = {
//           ...projectData,
//           id: projectData.id || `PRJ-${Math.floor(100000 + Math.random() * 899999)}`,
//           createdAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString(),
//           status: "locally_saved",
//           source: 'local'
//         };
//         alert("Project saved locally (server unavailable)!");
//       }

//       setProjects(prev => [savedProject, ...prev]);
//     }

//     // Reload projects to sync
//     await loadAllProjects();

//   } catch (error) {
//     console.error("Error saving project:", error);
//     alert(`Failed to save project: ${error.message}`);
//   } finally {
//     setLoading(false);
//     resetForm();
//     setShowForm(false);
//   }
// }, [editingProjectId, resetForm, projects]);

// const deleteProject = useCallback(async (id) => {
//   if (window.confirm("Are you sure you want to delete this project?")) {
//     const projectToDelete = projects.find(p => p.id === id);
//     const isServerProject = projectToDelete?.source === 'server';

//     try {
//       if (isServerProject) {
//         // Delete from server based on type
//         switch (projectToDelete.type) {
//           case 'apartment':
//             await projectService.deleteApartment(id);
//             break;
//           case 'commercial':
//             await projectService.deleteCommercial(id);
//             break;
//           case 'plotting':
//             await projectService.deletePlotting(id);
//             break;
//           case 'duplex':
//             await projectService.deleteDuplex(id);
//             break;
//           case 'triplex':
//             await projectService.deleteTriplex(id);
//             break;
//           default:
//             // Just remove locally for unknown types
//             break;
//         }
//         alert("Project deleted from server!");
//       } else {
//         alert("Project deleted locally.");
//       }

//       // Remove from state
//       setProjects(prev => prev.filter(p => p.id !== id));

//       if (expandedProject === id) setExpandedProject(null);
//       if (selectedProjectForEditing?.id === id) {
//         setSelectedProjectForEditing(null);
//         setShowPlotEditingOverview(false);
//       }

//     } catch (error) {
//       console.error("Error deleting project:", error);
//       alert("Failed to delete project from server. Project removed from local view only.");

//       // Still remove from local state even if server delete fails
//       setProjects(prev => prev.filter(p => p.id !== id));
//     }
//   }
// }, [expandedProject, selectedProjectForEditing, projects]);

//   const editProject = useCallback((project, plotId = null) => {
//     setEditingProjectId(project.id);
//     setProjectName(project.name || "");
//     setProjectType(project.type || "");
//     setCity(project.city || "");
//     setLocality(project.locality || "");
//     setLandZone(project.land_zone || project.landZone || "");
//     setCommercialSubType(project.commercial_sub_type || project.commercialSubType || "");
//     setLandArea(project.total_land_area || project.landArea || "");
//     setRevenuePlots(project.revenue_plots || project.revenuePlots || "");
//     setAddRevenuePlotNumber(project.addRevenuePlotNumber || "");
//     setAttachment(project.attachment || null);

//     // Set plot ID if provided (for editing specific plot)
//     if (plotId) {
//       setEditingPlotId(plotId);
//     }

//     if (project.type === PROJECT_TYPES.CUSTOM) {
//       const customTypes = project.custom_selected_types || [];
//       setSelectedCustomTypes(customTypes);
//       if (customTypes.length > 0) setCurrentCustomType(customTypes[0]);
//     }

//     setShowForm(true);
//   }, []);

//   const handleViewProject = useCallback((project) => {
//     setViewProjectData(project);
//     setViewProjectId(project.id);
//   }, []);

//   const closeViewProject = useCallback(() => {
//     setViewProjectId(null);
//     setViewProjectData(null);
//   }, []);

//   const toggleProjectExpansion = useCallback((id) => {
//     setExpandedProject(expandedProject === id ? null : id);
//   }, [expandedProject]);

//   const handleProjectTypeChange = (e) => {
//     const newType = e.target.value;
//     setProjectType(newType);
//     setShowCustomizeSelect(newType === PROJECT_TYPES.CUSTOM);
//   };

//   const handleCustomizeTypeSelect = (selectedTypes) => {
//     const typesArray = Array.isArray(selectedTypes) ? selectedTypes : [selectedTypes];
//     setSelectedCustomTypes(typesArray);
//     if (typesArray.length > 0) setCurrentCustomType(typesArray[0]);
//     setShowCustomizeSelect(false);
//     setProjectType(PROJECT_TYPES.CUSTOM);
//   };

//   const exportAllProjectsToExcel = () => {
//     if (projects.length === 0) {
//       alert("No projects to export.");
//       return;
//     }
//     const ws = XLSX.utils.json_to_sheet(projects);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "All Projects");
//     XLSX.writeFile(wb, `All_Projects_${new Date().toISOString().slice(0, 10)}.xlsx`);
//   };

//   // Open Plot Editing Overview for a project
//   const openPlotEditingOverview = (project) => {
//     setSelectedProjectForEditing(project);

//     // Get all plots from the project
//     const projectPlots = project.plots || [];
//     setEditingPlots(projectPlots);
//     setShowPlotEditingOverview(true);
//   };

//   // Navigate to edit a specific plot from overview
//   const navigateToPlotEditFromOverview = (plotId) => {
//     if (!selectedProjectForEditing) return;

//     // Update the project to mark this plot as being edited
//     const updatedProjects = projects.map(project => {
//       if (project.id === selectedProjectForEditing.id) {
//         const updatedPlots = (project.plots || []).map(plot => ({
//           ...plot,
//           isBeingEdited: plot.id === plotId
//         }));

//         return {
//           ...project,
//           plots: updatedPlots,
//           updatedAt: new Date().toISOString()
//         };
//       }
//       return project;
//     });

//     setProjects(updatedProjects);

//     // Close overview
//     setShowPlotEditingOverview(false);

//     // Open the project in edit mode with the specific plot ID
//     editProject(selectedProjectForEditing, plotId);
//   };

//   // Complete editing for all plots in a project
//   const completeAllPlotEditing = () => {
//     if (!selectedProjectForEditing) return;

//     const updatedProjects = projects.map(project => {
//       if (project.id === selectedProjectForEditing.id) {
//         // Mark all plots as not being edited
//         const updatedPlots = (project.plots || []).map(plot => ({
//           ...plot,
//           isBeingEdited: false
//         }));

//         return {
//           ...project,
//           plots: updatedPlots,
//           updatedAt: new Date().toISOString()
//         };
//       }
//       return project;
//     });

//     setProjects(updatedProjects);
//     setShowPlotEditingOverview(false);
//     setSelectedProjectForEditing(null);
//     alert("All plot editing completed!");
//   };

//   // Render Plot Editing Overview
//   const renderPlotEditingOverview = () => {
//     if (!selectedProjectForEditing) return null;

//     const project = selectedProjectForEditing;
//     const projectPlots = editingPlots;

//     // Calculate statistics
//     const stats = {
//       total: projectPlots.length,
//       beingEdited: projectPlots.filter(p => p.isBeingEdited).length,
//       saved: projectPlots.filter(p => p.lastSaved && !p.isBeingEdited).length,
//       notEdited: projectPlots.filter(p => !p.lastSaved && !p.isBeingEdited).length,
//       complete: projectPlots.filter(p => p.isComplete).length
//     };

//     return (
//       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 overflow-y-auto p-4">
//         <div className="bg-white rounded-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
//           {/* Header */}
//           <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl p-6 z-10">
//             <div className="flex justify-between items-start gap-4">
//               <div className="flex-1">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
//                     <FaTable className="text-white text-xl" />
//                   </div>
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900">
//                       Plot Editing Overview
//                     </h2>
//                     <p className="text-sm text-gray-600">
//                       Project: <span className="font-semibold">{project.name}</span>
//                     </p>
//                   </div>
//                 </div>

//                 {/* Stats Cards */}
//                 <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
//                   <div className="bg-gray-50 rounded-xl p-3">
//                     <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
//                     <div className="text-xs text-gray-500">Total Plots</div>
//                   </div>
//                   <div className="bg-blue-50 rounded-xl p-3">
//                     <div className="text-2xl font-bold text-blue-700">{stats.beingEdited}</div>
//                     <div className="text-xs text-blue-600">Being Edited</div>
//                   </div>
//                   <div className="bg-emerald-50 rounded-xl p-3">
//                     <div className="text-2xl font-bold text-emerald-700">{stats.saved}</div>
//                     <div className="text-xs text-emerald-600">Saved</div>
//                   </div>
//                   <div className="bg-amber-50 rounded-xl p-3">
//                     <div className="text-2xl font-bold text-amber-700">{stats.notEdited}</div>
//                     <div className="text-xs text-amber-600">Not Edited</div>
//                   </div>
//                   <div className="bg-purple-50 rounded-xl p-3">
//                     <div className="text-2xl font-bold text-purple-700">{stats.complete}</div>
//                     <div className="text-xs text-purple-600">Complete</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={completeAllPlotEditing}
//                   className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center"
//                 >
//                   <FaCheck className="mr-2" />
//                   Complete All Editing
//                 </button>
//                 <button
//                   onClick={() => setShowPlotEditingOverview(false)}
//                   className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
//                   title="Close"
//                 >
//                   <FaTimes />
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="p-6">
//             {/* Instructions */}
//             <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
//               <div className="flex items-start gap-3">
//                 <FaExclamationCircle className="text-blue-600 mt-1" />
//                 <div>
//                   <h4 className="font-semibold text-blue-800 mb-1">Editing Status Guide</h4>
//                   <ul className="text-sm text-blue-700 space-y-1">
//                     <li className="flex items-center">
//                       <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
//                       <span><span className="font-semibold">Blue</span> - Plot is currently being edited</span>
//                     </li>
//                     <li className="flex items-center">
//                       <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
//                       <span><span className="font-semibold">Green</span> - Plot has been saved/edited</span>
//                     </li>
//                     <li className="flex items-center">
//                       <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
//                       <span><span className="font-semibold">Gray</span> - Plot has not been edited yet</span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {/* Plots Table */}
//             <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         Plot
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         Area Details
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         Price
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         Status
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         Last Saved
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         Completion
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-100">
//                     {projectPlots.map((plot) => (
//                       <tr
//                         key={plot.id}
//                         className={`hover:bg-gray-50 transition-colors ${
//                           plot.isBeingEdited
//                             ? 'bg-blue-50'
//                             : plot.lastSaved
//                               ? 'bg-emerald-50'
//                               : 'bg-gray-50/30'
//                         }`}
//                       >
//                         <td className="px-6 py-4">
//                           <div className="flex items-center">
//                             <div className="flex-shrink-0 h-10 w-10">
//                               <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
//                                 plot.isBeingEdited
//                                   ? 'bg-blue-100'
//                                   : plot.lastSaved
//                                     ? 'bg-emerald-100'
//                                     : 'bg-gray-200'
//                               }`}>
//                                 <FaLayerGroup className={`h-5 w-5 ${
//                                   plot.isBeingEdited
//                                     ? 'text-blue-600'
//                                     : plot.lastSaved
//                                       ? 'text-emerald-600'
//                                       : 'text-gray-400'
//                                 }`} />
//                               </div>
//                             </div>
//                             <div className="ml-4">
//                               <div className={`text-sm font-medium ${
//                                 plot.isBeingEdited
//                                   ? 'text-blue-900 font-bold'
//                                   : plot.lastSaved
//                                     ? 'text-gray-900'
//                                     : 'text-gray-500 italic'
//                               }`}>
//                                 {plot.name}
//                               </div>
//                               <div className="text-xs text-gray-500">
//                                 {plot.isCornerPlot ? 'Corner Plot' : 'Regular Plot'}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className={`text-sm ${
//                             plot.areaDetails?.plotArea
//                               ? 'text-gray-900'
//                               : 'text-gray-500 italic'
//                           }`}>
//                             {plot.areaDetails?.plotArea ? `${plot.areaDetails.plotArea} sq-yd` : 'Not set'}
//                           </div>
//                           {plot.areaDetails?.plotLength && plot.areaDetails?.plotBreadth && (
//                             <div className="text-xs text-gray-500">
//                               {plot.areaDetails.plotLength} × {plot.areaDetails.plotBreadth} yd
//                             </div>
//                           )}
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className={`text-sm ${
//                             plot.priceDetails?.expectedPrice
//                               ? 'text-gray-900'
//                               : 'text-gray-500 italic'
//                           }`}>
//                             {plot.priceDetails?.expectedPrice
//                               ? `₹${parseInt(plot.priceDetails.expectedPrice).toLocaleString()}`
//                               : 'Not set'
//                             }
//                           </div>
//                           {plot.priceDetails?.tokenAmount && (
//                             <div className="text-xs text-gray-500">
//                               Token: ₹{parseInt(plot.priceDetails.tokenAmount).toLocaleString()}
//                             </div>
//                           )}
//                         </td>
//                         <td className="px-6 py-4">
//                           <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
//                             plot.isBeingEdited
//                               ? 'bg-blue-100 text-blue-800'
//                               : plot.lastSaved
//                                 ? 'bg-emerald-100 text-emerald-800'
//                                 : 'bg-gray-100 text-gray-500 italic'
//                           }`}>
//                             {plot.isBeingEdited ? 'Being Edited' : plot.lastSaved ? 'Saved' : 'Not Edited'}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-500">
//                           {plot.lastSaved
//                             ? new Date(plot.lastSaved).toLocaleDateString() + ' ' +
//                               new Date(plot.lastSaved).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
//                             : 'Never'
//                           }
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex items-center">
//                             {plot.isComplete ? (
//                               <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-800">
//                                 <FaCheckCircle className="mr-1" />
//                                 Complete
//                               </span>
//                             ) : (
//                               <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">
//                                 <FaTimesCircle className="mr-1" />
//                                 In Progress
//                               </span>
//                             )}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-2">
//                             <button
//                               onClick={() => navigateToPlotEditFromOverview(plot.id)}
//                               className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                               title="Edit this plot"
//                             >
//                               <FaPen />
//                             </button>
//                             <button
//                               onClick={() => {
//                                 alert(`Plot Details:\n\nName: ${plot.name}\nArea: ${plot.areaDetails?.plotArea || 'N/A'} sq-yd\nPrice: ${plot.priceDetails?.expectedPrice || 'N/A'}\nPurchaser: ${plot.purchaser || 'N/A'}\nConstructor: ${plot.constructor || 'N/A'}\nStatus: ${plot.isComplete ? 'Complete' : 'In Progress'}\nLast Edited: ${plot.lastSaved || 'Never'}`);
//                               }}
//                               className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
//                               title="View details"
//                             >
//                               <FaEye />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {projectPlots.length === 0 && (
//                 <div className="py-12 text-center">
//                   <FaLayerGroup className="mx-auto h-16 w-16 text-gray-300 mb-4" />
//                   <h3 className="text-lg font-semibold text-gray-700 mb-2">No Plots Created</h3>
//                   <p className="text-gray-500">This project doesn't have any plots yet.</p>
//                 </div>
//               )}
//             </div>

//             {/* Action Buttons */}
//             <div className="mt-6 flex justify-between items-center">
//               <div className="text-sm text-gray-500">
//                 Showing {projectPlots.length} plot(s)
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => {
//                     setShowPlotEditingOverview(false);
//                     editProject(project);
//                   }}
//                   className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center"
//                 >
//                   <FaEdit className="mr-2" />
//                   Edit Project
//                 </button>
//                 <button
//                   onClick={completeAllPlotEditing}
//                   className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center"
//                 >
//                   <FaCheck className="mr-2" />
//                   Complete All Editing
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderProjectForm = () => {
//     if (showCustomizeSelect) {
//       return (
//         <CustomizeSelect
//           initialSelected={selectedCustomTypes}
//           onBack={() => setShowCustomizeSelect(false)}
//           onSelectType={handleCustomizeTypeSelect}
//         />
//       );
//     }

//     const commonProps = {
//       projectName,
//       setProjectName,
//       projectType,
//       setProjectType,
//       city,
//       setCity,
//       locality,
//       setLocality,
//       landZone,
//       setLandZone,
//       commercialSubType,
//       setCommercialSubType,
//       onSaveProject: handleSaveProject,
//       PROJECT_TYPES,
//       editingProjectId,
//     };

//     const duplexTriplexProps = {
//       ...commonProps,
//       landArea,
//       setLandArea,
//       revenuePlots,
//       setRevenuePlots,
//       addRevenuePlotNumber,
//       setAddRevenuePlotNumber,
//       attachment,
//       setAttachment,
//       constants: DUPLEX_TRIPLEX_CONSTANTS,
//       selectedProject: editingProjectId ? projects.find(p => p.id === editingProjectId) : null,
//     };

//     // NEW: Pass editingPlotId to PlottingProject
//     const plottingProps = {
//       ...commonProps,
//       editingPlotId, // Pass the plot ID to edit
//       selectedProject: editingProjectId ? projects.find(p => p.id === editingProjectId) : null,
//     };

//     if (projectType === PROJECT_TYPES.CUSTOM && selectedCustomTypes.length > 0) {
//       return (
//         <div className="space-y-4">
//           <div className="flex gap-2 flex-wrap">
//             {selectedCustomTypes.map(type => (
//               <button
//                 key={type}
//                 onClick={() => setCurrentCustomType(type)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currentCustomType === type ? "bg-indigo-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }`}
//               >
//                 {type.toUpperCase()}
//               </button>
//             ))}
//           </div>
//           <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50">
//             {currentCustomType === "plotting" ? (
//               <PlottingProject {...plottingProps} />
//             ) : currentCustomType === "duplex" || currentCustomType === "triplex" ? (
//               <DuplexTriplexProject {...duplexTriplexProps} projectType={currentCustomType} />
//             ) : currentCustomType === "apartment" ? (
//               <ApartmentProject {...commonProps} />
//             ) : currentCustomType === "commercial" ? (
//               <CommercialProject {...commonProps} />
//             ) : (
//               <CustomProject {...commonProps} activeType={currentCustomType} />
//             )}
//           </div>
//         </div>
//       );
//     }

//     switch (projectType) {
//       case PROJECT_TYPES.PLOTTING:
//         return <PlottingProject {...plottingProps} />;
//       case PROJECT_TYPES.DUPLEX:
//         return <DuplexTriplexProject {...duplexTriplexProps} projectType="duplex" />;
//       case PROJECT_TYPES.TRIPLEX:
//         return <DuplexTriplexProject {...duplexTriplexProps} projectType="triplex" />;
//       case PROJECT_TYPES.APARTMENT:
//         return <ApartmentProject {...commonProps} />;
//       case PROJECT_TYPES.COMMERCIAL:
//         return <CommercialProject {...commonProps} />;
//       case PROJECT_TYPES.CUSTOM:
//         return (
//           <div className="p-8 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
//             <p className="text-gray-500 mb-4">Select custom project types to continue</p>
//             <button onClick={() => setShowCustomizeSelect(true)} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium shadow-md">
//               Choose Types
//             </button>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="bg-slate-50 text-slate-900">
//       <div className="max-w-7xl mx-auto py-8">
//         <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//           <div className="space-y-1">
//             <h1 className="text-4xl font-extrabold text-indigo-900 tracking-tight">Project Management</h1>
//             <p className="text-slate-500 font-medium">Create and track your property projects locally</p>
//           </div>
//           <div className="flex gap-3">
//             <button
//               onClick={exportAllProjectsToExcel}
//               className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-emerald-100 transition-all font-semibold"
//             >
//               <FaFileExcel /> Export
//             </button>
//             <button
//               onClick={() => setShowForm(true)}
//               className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 font-semibold"
//             >
//               <FaPlus /> New Project
//             </button>
//           </div>
//         </header>

//         {!showForm ? (
//           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
//             <div className="p-6 border-b border-slate-100 bg-slate-50/50">
//               <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
//                 <FaLayerGroup className="text-indigo-500" />
//                 Active Projects ({projects.length})
//               </h2>
//             </div>

//             <div className="overflow-x-auto">
//               {projects.length === 0 ? (
//                 <div className="py-20 text-center space-y-4">
//                   <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
//                     <FaBuilding className="text-slate-400 text-2xl" />
//                   </div>
//                   <div className="space-y-1">
//                     <h3 className="text-lg font-bold text-slate-700">No projects yet</h3>
//                     <p className="text-slate-500">Create your first project to get started</p>
//                   </div>
//                 </div>
//               ) : (
//                 <table className="w-full text-left border-collapse">
//                   <thead>
//                     <tr className="bg-slate-50/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
//                       <th className="px-6 py-4">Project</th>
//                       <th className="px-6 py-4">Type</th>
//                       <th className="px-6 py-4">Location</th>
//                       <th className="px-6 py-4">Plots Status</th>
//                       <th className="px-6 py-4">Created At</th>
//                       <th className="px-6 py-4 text-right">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-100">
//                     {projects.map(project => {
//                       const projectPlots = project.plots || [];
//                       const editingPlotsCount = projectPlots.filter(p => p.isBeingEdited).length;
//                       const savedPlotsCount = projectPlots.filter(p => p.lastSaved && !p.isBeingEdited).length;
//                       const totalPlots = projectPlots.length;

//                       return (
//                         <React.Fragment key={project.id}>
//                           <tr className="group hover:bg-indigo-50/30 transition-colors">
//                             <td className="px-6 py-4">
//                               <div className="flex items-center gap-3">
//                                 <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
//                                   {project.name?.charAt(0) || "P"}
//                                 </div>
//                                 <div>
//                                   <div className="font-bold text-slate-800">{project.name}</div>
//                                   <div className="text-xs text-slate-400 font-mono">{project.id}</div>
//                                 </div>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4">
//                               <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
//                                 {project.type}
//                               </span>
//                             </td>
//                             <td className="px-6 py-4">
//                               <div className="flex items-center gap-1.5 text-slate-600 font-medium">
//                                 <FaMapMarkerAlt className="text-rose-500 text-xs" />
//                                 {project.city || "Not set"}
//                               </div>
//                             </td>
//                             <td className="px-6 py-4">
//                               {totalPlots > 0 ? (
//                                 <div className="flex items-center gap-2">
//                                   <div className="text-sm font-semibold text-slate-700">
//                                     {totalPlots} plot(s)
//                                   </div>
//                                   <div className="flex items-center gap-1">
//                                     {editingPlotsCount > 0 && (
//                                       <span className="w-2 h-2 bg-blue-500 rounded-full" title={`${editingPlotsCount} being edited`}></span>
//                                     )}
//                                     {savedPlotsCount > 0 && (
//                                       <span className="w-2 h-2 bg-emerald-500 rounded-full" title={`${savedPlotsCount} saved`}></span>
//                                     )}
//                                     {totalPlots - editingPlotsCount - savedPlotsCount > 0 && (
//                                       <span className="w-2 h-2 bg-gray-300 rounded-full" title={`${totalPlots - editingPlotsCount - savedPlotsCount} not edited`}></span>
//                                     )}
//                                   </div>
//                                   {editingPlotsCount > 0 && (
//                                     <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
//                                       {editingPlotsCount} editing
//                                     </span>
//                                   )}
//                                 </div>
//                               ) : (
//                                 <span className="text-sm text-slate-400">No plots</span>
//                               )}
//                             </td>
//                             <td className="px-6 py-4 text-slate-500 text-sm">
//                               {formatDate(project.createdAt)}
//                             </td>
//                             <td className="px-6 py-4 text-right">
//                               <div className="flex items-center justify-end gap-2">
//                                 {project.type === "plotting" && totalPlots > 0 && (
//                                   <button
//                                     onClick={() => openPlotEditingOverview(project)}
//                                     className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                                     title="View Plot Editing Overview"
//                                   >
//                                     <FaTable />
//                                   </button>
//                                 )}
//                                 <button onClick={() => editProject(project)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
//                                   <FaEdit />
//                                 </button>
//                                 <button onClick={() => deleteProject(project.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
//                                   <FaTrash />
//                                 </button>
//                                 <button onClick={() => toggleProjectExpansion(project.id)} className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
//                                   {expandedProject === project.id ? <FaTimes /> : <FaSync className="text-xs" />}
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                           {expandedProject === project.id && (
//                             <tr className="bg-slate-50/80">
//                               <td colSpan="6" className="px-6 py-6 border-b border-indigo-100">
//                                 <div className="bg-white rounded-xl p-6 border border-indigo-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
//                                   <div className="space-y-1">
//                                     <label className="text-[10px] font-bold text-slate-400 uppercase">Locality</label>
//                                     <p className="font-semibold text-slate-700">{project.locality || "Not specified"}</p>
//                                   </div>
//                                   <div className="space-y-1">
//                                     <label className="text-[10px] font-bold text-slate-400 uppercase">Total Plots</label>
//                                     <p className="font-semibold text-slate-700">{totalPlots || "0"}</p>
//                                   </div>
//                                   <div className="space-y-1 text-right">
//                                     <button onClick={() => handleViewProject(project)} className="text-indigo-600 font-bold text-sm hover:underline">
//                                       View Detailed Stats &rarr;
//                                     </button>
//                                   </div>
//                                 </div>
//                               </td>
//                             </tr>
//                           )}
//                         </React.Fragment>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         ) : (
//           <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
//             <div className="">
//               {!projectType && !showCustomizeSelect ? (
//                 <div className="max-w-2xl mx-auto space-y-8">
//                   <div className="space-y-2 text-center mb-8">
//                     <h3 className="text-2xl font-bold text-indigo-900">Let's get started</h3>
//                     <p className="text-slate-500">Enter the basic details to build your project configuration</p>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2 col-span-2">
//                       <label className="text-sm font-bold text-slate-700 ml-1">Project Name</label>
//                       <input
//                         type="text"
//                         value={projectName}
//                         onChange={(e) => setProjectName(e.target.value)}
//                         className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//                         placeholder="e.g. Skyline Heights"
//                       />
//                     </div>
//                     <div className="space-y-2 col-span-2">
//                       <label className="text-sm font-bold text-slate-700 ml-1">Project Type</label>
//                       <select
//                         value={projectType}
//                         onChange={handleProjectTypeChange}
//                         className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none bg-white"
//                       >
//                         <option value="">Select a category</option>
//                         <option value={PROJECT_TYPES.PLOTTING}>Plotting</option>
//                         <option value={PROJECT_TYPES.DUPLEX}>Duplex</option>
//                         <option value={PROJECT_TYPES.TRIPLEX}>Triplex</option>
//                         <option value={PROJECT_TYPES.APARTMENT}>Apartment</option>
//                         <option value={PROJECT_TYPES.COMMERCIAL}>Commercial</option>
//                         <option value={PROJECT_TYPES.CUSTOM}>Custom / Multiple</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 renderProjectForm()
//               )}
//             </div>
//           </div>
//         )}

//         {viewProjectId && viewProjectData && (
//           <ProjectViewForm project={viewProjectData} onClose={closeViewProject} />
//         )}

//         {/* Plot Editing Overview Modal */}
//         {showPlotEditingOverview && renderPlotEditingOverview()}
//       </div>
//     </div>
//   );
// };

// export default PABC;

// 5/02/26
import React, { useState, useEffect, useCallback } from "react";
import {
  FaPlus,
  FaTimes,
  FaBuilding,
  FaMapMarkerAlt,
  FaSync,
  FaTrash,
  FaFileExcel,
  FaEdit,
  FaEye,
  FaTable,
  FaCheckCircle,
  FaPen,
  FaArrowLeft,
  FaSave,


  FaLayerGroup, 
  FaDoorOpen,
  FaDoorClosed,
  FaExclamationCircle,
  FaCheck,
  FaTimesCircle,
  FaSpinner,
  FaCloudDownloadAlt,
  FaDatabase,
  FaHome,
} from "react-icons/fa";
import PlottingProject from "./PlottingProject";
import DuplexTriplexProject from "./DuplexTriplexProject";
import ApartmentProject from "./ApartmentProject";
import CommercialProject from "./CommercialProject";

import * as XLSX from "xlsx";
import projectService from "./projectService";

// Shared imports
import {
  PROJECT_TYPES,
  FACILITIES,
  FACING_OPTIONS,
  BROKER_LIST,
} from "./shared/Constants";
import CustomizeSelect from "./CustomizeSelect";

// Create constants object for DuplexTriplexProject
const DUPLEX_TRIPLEX_CONSTANTS = {
  FACILITIES: FACILITIES || [],
  FACING_OPTIONS: FACING_OPTIONS || [
    "North",
    "South",
    "East",
    "West",
    "North-East",
    "North-West",
    "South-East",
    "South-West",
  ],
  BROKER_LIST: BROKER_LIST || [],
};

const PABC = () => {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [expandedProject, setExpandedProject] = useState(null);
  const [viewProjectId, setViewProjectId] = useState(null);
  const [viewProjectData, setViewProjectData] = useState(null);
  const [showCustomizeSelect, setShowCustomizeSelect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState({
    local: 0,
    server: 0,
    lastSynced: null,
  });

  // Plot Editing Overview state
  const [showPlotEditingOverview, setShowPlotEditingOverview] = useState(false);
  const [selectedProjectForEditing, setSelectedProjectForEditing] =
    useState(null);
  const [editingPlots, setEditingPlots] = useState([]);
  const [editingPlotId, setEditingPlotId] = useState(null);
  const [showUnitOverview, setShowUnitOverview] = useState(false);

  // Project Form State
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [city, setCity] = useState("");
  const [locality, setLocality] = useState("");
  const [landZone, setLandZone] = useState("");
  const [commercialSubType, setCommercialSubType] = useState("");
  const [editingProjectId, setEditingProjectId] = useState(null);

  // Additional state for Duplex/Triplex projects
  const [landArea, setLandArea] = useState("");
  const [revenuePlots, setRevenuePlots] = useState("");
  const [addRevenuePlotNumber, setAddRevenuePlotNumber] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [parsedPlotsData, setParsedPlotsData] = useState([]); // Store parsed plots_data
  const [parsedRevenuePlotsData, setParsedRevenuePlotsData] = useState([]); // Store parsed revenue_plots_data

  const [selectedCustomTypes, setSelectedCustomTypes] = useState([]);
  const [currentCustomType, setCurrentCustomType] = useState("");
  const [openInOverview, setOpenInOverview] = useState(false);

  const [showUnitEditingOverview, setShowUnitEditingOverview] = useState(false);
  const [unitOverviewProject, setUnitOverviewProject] = useState(null);
  const [unitOverviewUnits, setUnitOverviewUnits] = useState([]);

  // Apartment Editing Overview
  const [showApartmentOverview, setShowApartmentOverview] = useState(false);
  const [apartmentOverviewProject, setApartmentOverviewProject] =
    useState(null);
  const [apartmentOverviewBlocks, setApartmentOverviewBlocks] = useState([]);

  // commercial
  const [showCommercialEditingOverview, setShowCommercialEditingOverview] = useState(false);
const [commercialOverviewProject, setCommercialOverviewProject] = useState(null);
const [commercialOverviewUnits, setCommercialOverviewUnits] = useState([]);

  // Add this useEffect to reset showUnitOverview
  useEffect(() => {
    if (showForm && editingProjectId) {
      // Check if this is a duplex/triplex project with units
      const project = projects.find((p) => p.id === editingProjectId);
      if (
        (project?.type === "duplex" || project?.type === "triplex") &&
        project?.units_data
      ) {
        try {
          const units =
            typeof project.units_data === "string"
              ? JSON.parse(project.units_data)
              : project.units_data;
          if (units && units.length > 0) {
            // Check if we should show unit overview
            const shouldShow =
              window.location.hash === "#unit-overview" ||
              localStorage.getItem(`show_unit_overview_${editingProjectId}`);
            if (shouldShow) {
              setShowUnitOverview(true);
              localStorage.removeItem(`show_unit_overview_${editingProjectId}`);
            }
          }
        } catch (e) {
          console.error("Error parsing units_data:", e);
        }
      }
    }
  }, [showForm, editingProjectId, projects]);

  // Load projects from localStorage on mount AND from API
  useEffect(() => {
    loadAllProjects();
  }, []);

  const parseUnits = (project) => {
    if (!project?.units_data) return [];

    try {
      return typeof project.units_data === "string"
        ? JSON.parse(project.units_data)
        : project.units_data;
    } catch (e) {
      console.error("Failed to parse units_data", e);
      return [];
    }
  };

  const openApartmentEditingOverview = (project) => {
  setApartmentOverviewProject(project);

  let blocks = [];
  try {
    if (project.blocks_data) {
      blocks =
        typeof project.blocks_data === "string"
          ? JSON.parse(project.blocks_data)
          : project.blocks_data;
    }
  } catch (e) {
    console.error("Failed to parse blocks_data", e);
    blocks = [];
  }

  setApartmentOverviewBlocks(blocks);
  setShowApartmentOverview(true);
};


  // Function to load projects from both localStorage and API
  const loadAllProjects = async () => {
    try {
      setApiLoading(true);

      // Load from localStorage first
      const savedProjects = localStorage.getItem("local_projects");
      let localProjects = [];

      if (savedProjects) {
        try {
          localProjects = JSON.parse(savedProjects);
        } catch (err) {
          console.error("Failed to parse projects from localStorage", err);
        }
      }

      // Try to load from API
      let serverProjects = [];
      try {
        // Fetch all project types from API
        const [apartments, commercials, plottings, duplexes, triplexes] =
          await Promise.all([
            projectService.getAllApartments(),
            projectService.getAllCommercials(),
            projectService.getAllPlottings(),
            projectService.getAllDuplexes(),
            projectService.getAllTriplexes(),
          ]);

        // Combine all projects from API
        serverProjects = [
          ...apartments.map((p) => ({
            ...p,
            source: "server",
            type: "apartment",
          })),
          ...commercials.map((p) => ({
            ...p,
            source: "server",
            type: "commercial",
          })),
          ...plottings.map((p) => ({
            ...p,
            source: "server",
            type: "plotting",
          })),
          ...duplexes.map((p) => ({ ...p, source: "server", type: "duplex" })),
          ...triplexes.map((p) => ({
            ...p,
            source: "server",
            type: "triplex",
          })),
        ];
      } catch (apiError) {
        console.warn("API not available, using local storage only", apiError);
      }

      // Merge local and server projects
      const allProjects = [...serverProjects];

      // Add local projects that don't exist on server
      localProjects.forEach((localProject) => {
        const existsOnServer = allProjects.some(
          (serverProject) => serverProject.id === localProject.id,
        );
        if (!existsOnServer) {
          allProjects.push({ ...localProject, source: "local" });
        }
      });

      // 🔥 SORT PROJECTS: newest → oldest
      allProjects.sort((a, b) => {
        const dateA = new Date(a.created_at || a.createdAt || 0);
        const dateB = new Date(b.created_at || b.createdAt || 0);
        return dateB - dateA;
      });

      setProjects(allProjects);

      // Update sync status
      setSyncStatus({
        local: localProjects.length,
        server: serverProjects.length,
        lastSynced: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error loading projects:", error);
      setError("Failed to load projects. Please check your connection.");
    } finally {
      setApiLoading(false);
    }
  };

  //   const openEditingOverview = (project) => {
  //   let items = [];
  //   let type = project.type;

  //   try {
  //     if (type === "plotting") {
  //       items = typeof project.plots_data === "string"
  //         ? JSON.parse(project.plots_data)
  //         : project.plots_data || [];
  //     }

  //     if (type === "duplex" || type === "triplex") {
  //       items = typeof project.units_data === "string"
  //         ? JSON.parse(project.units_data)
  //         : project.units_data || [];
  //     }

  //     if (type === "apartment") {
  //       items = typeof project.blocks_data === "string"
  //         ? JSON.parse(project.blocks_data)
  //         : project.blocks_data || [];
  //     }
  //   } catch (e) {
  //     console.error("Failed to parse overview data", e);
  //   }

  //   setEditingOverview({
  //     open: true,
  //     type,
  //     project,
  //     items
  //   });
  // };

  // Save projects to localStorage whenever state changes
  useEffect(() => {
    // Filter only local projects (not from server)
    const localProjects = projects.filter(
      (p) => p.source === "local" || !p.source,
    );
if (localProjects.length > 0) {
  localStorage.setItem("local_projects", JSON.stringify(localProjects));
} else {
  localStorage.removeItem("local_projects"); // 🔥 REQUIRED
}

  }, [projects]);

  // Clear editing plot flag when closing form
  useEffect(() => {
    if (!showForm && editingPlotId) {
      setEditingPlotId(null);
    }
  }, [showForm, editingPlotId]);

  const resetForm = useCallback(() => {
    setProjectName("");
    setProjectType("");
    setCity("");
    setLocality("");
    setLandZone("");
    setCommercialSubType("");
    setLandArea("");
    setRevenuePlots("");
    setAddRevenuePlotNumber("");
    setAttachment(null);
    setEditingProjectId(null);
    setEditingPlotId(null);
    setParsedPlotsData([]);
    setParsedRevenuePlotsData([]);
    setShowCustomizeSelect(false);
    setSelectedCustomTypes([]);
    setCurrentCustomType("");
  }, []);

  const formatDate = useCallback((dateString) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  }, []);

  const handleSaveProject = useCallback(
    async (projectData) => {
      console.log("🔥 PABC handleSaveProject received:", projectData);
      console.log("🔥 projectData.units:", projectData.units);
      console.log("🔥 projectData.plots_data:", projectData.plots_data);
      setLoading(true);

      try {
        let savedProject;

        if (projectData.id) {
          // When editing, preserve units from the existing project if not included in projectData
          let mergedData = { ...projectData };

          if (editingProjectId) {
            const existingProject = projects.find(
              (p) => p.id === editingProjectId,
            );

            // Handle units_data (new database field name)
            if (existingProject?.units_data) {
              let existingUnits = existingProject.units_data;
              // Parse if it's a JSON string
              if (typeof existingUnits === "string") {
                try {
                  existingUnits = JSON.parse(existingUnits);
                } catch (e) {
                  console.error("Failed to parse existing units_data:", e);
                  existingUnits = [];
                }
              }

              if (Array.isArray(existingUnits) && existingUnits.length > 0) {
                let incomingUnits =
                  projectData.units_data || projectData.units || [];
                // Parse if it's a JSON string
                if (typeof incomingUnits === "string") {
                  try {
                    incomingUnits = JSON.parse(incomingUnits);
                  } catch (e) {
                    incomingUnits = [];
                  }
                }

                if (Array.isArray(incomingUnits)) {
                  // Merge: keep existing units, update those that are in incoming
                  const mergedUnits = existingUnits.map((u) => {
                    const updated = incomingUnits.find((iu) => iu.id === u.id);
                    return updated ? { ...u, ...updated } : u;
                  });
                  // Add any new incoming units not in existing
                  incomingUnits.forEach((iu) => {
                    if (!mergedUnits.find((u) => u.id === iu.id)) {
                      mergedUnits.push(iu);
                    }
                  });
                  projectData.units_data = mergedUnits;
                }
              }
            }
            // Fallback for old units field
            else if (existingProject?.units?.length) {
              const incomingUnits = projectData.units || [];

              const mergedUnits = existingProject.units.map((u) => {
                const updated = incomingUnits.find((iu) => iu.id === u.id);
                return updated ? { ...u, ...updated } : u;
              });

              projectData.units = mergedUnits;
            }
          }

          savedProject = {
            ...mergedData,
            updatedAt: new Date().toISOString(),
            // Ensure source is set correctly
            source:
              mergedData.source ||
              (editingProjectId
                ? projects.find((p) => p.id === editingProjectId)?.source ||
                  "local"
                : "server"),
          };

          if (editingProjectId) {
            setProjects((prev) =>
              prev.map((p) => (p.id === editingProjectId ? savedProject : p)),
            );
            alert("Project updated successfully!");
          } else {
            setProjects((prev) => [savedProject, ...prev]);
            alert("Project saved successfully!");
          }
        } else {
          // Fallback for cases where ID is missing (should not happen with new child components)
          try {
            // Try to save to server first
            let serverResponse;
            switch (projectData.type) {
              case "apartment":
                serverResponse =
                  await projectService.createApartment(projectData);
                break;
              case "commercial":
                serverResponse =
                  await projectService.createCommercial(projectData);
                break;
              case "plotting":
                serverResponse =
                  await projectService.createPlotting(projectData);
                break;
              case "duplex":
                serverResponse = await projectService.createDuplex(projectData);
                break;
              case "triplex":
                serverResponse =
                  await projectService.createTriplex(projectData);
                break;
              default:
                throw new Error("Custom projects saved locally only");
            }

            savedProject = {
              ...serverResponse,
              source: "server",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            setProjects((prev) => [savedProject, ...prev]);
            alert("Project created and synced!");
          } catch (serverError) {
            console.warn(
              "Server not available or custom project:",
              serverError,
            );
            // Save locally if server fails or is custom
            savedProject = {
              ...projectData,
              id:
                projectData.id ||
                `PRJ-${Math.floor(100000 + Math.random() * 899999)}`,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              status: "locally_saved",
              source: "local",
            };
            setProjects((prev) => [savedProject, ...prev]);
            alert("Project saved locally!");
          }
        }

        // Reload projects to sync everything from the server
        await loadAllProjects();
      } catch (error) {
        console.error("Error saving project:", error);
        alert(`Failed to save project: ${error.message}`);
      } finally {
        setLoading(false);
        resetForm();
        setShowForm(false);
        setOpenInOverview(false);
      }
    },
    [editingProjectId, resetForm, projects, loadAllProjects],
  );

  const deleteProject = useCallback(
    async (id) => {
      if (window.confirm("Are you sure you want to delete this project?")) {
        const projectToDelete = projects.find((p) => p.id === id);
        const isServerProject = projectToDelete?.source === "server";

        try {
          if (isServerProject) {
            // Delete from server based on type
            switch (projectToDelete.type) {
              case "apartment":
                await projectService.deleteApartment(id);
                break;
              case "commercial":
                await projectService.deleteCommercial(id);
                break;
              case "plotting":
                await projectService.deletePlotting(id);
                break;
              case "duplex":
                await projectService.deleteDuplex(id);
                break;
              case "triplex":
                await projectService.deleteTriplex(id);
                break;
              default:
                // Just remove locally for unknown types
                break;
            }
            alert("Project deleted from server!");
          } else {
            alert("Project deleted locally.");
          }

          // Remove from state
          setProjects((prev) => prev.filter((p) => p.id !== id));

          if (expandedProject === id) setExpandedProject(null);
          if (selectedProjectForEditing?.id === id) {
            setSelectedProjectForEditing(null);
            setShowPlotEditingOverview(false);
          }
        } catch (error) {
          console.error("Error deleting project:", error);
          alert(
            "Failed to delete project from server. Project removed from local view only.",
          );

          // Still remove from local state even if server delete fails
          setProjects((prev) => prev.filter((p) => p.id !== id));
        }
      }
    },
    [expandedProject, selectedProjectForEditing, projects],
  );

  const editProject = useCallback((project, plotId = null) => {
    console.log("Editing project data:", project);
    console.log("Database fields received:");
    console.log("- revenue_plots:", project.revenue_plots);
    console.log("- revenue_plots_data:", project.revenue_plots_data);
    console.log("- plots_data:", project.plots_data);
    console.log("- land_area:", project.land_area);

    // 🔥 FIX: preserve existing units when editing
    if (project.units && Array.isArray(project.units)) {
      project = {
        ...project,
        units: project.units,
      };
    }

    setEditingProjectId(project.id);
    setProjectName(project.name || "");
    setProjectType(project.type || "");
    setCity(project.city || "");
    setLocality(project.locality || "");
    setLandZone(project.land_zone || "");

    // Set land area from database field
    setLandArea(project.land_area || "");

    // Set revenue plots from database field
    const revPlots = project.revenue_plots || 0;
    setRevenuePlots(revPlots);

    // Parse plots_data from database (main plots array)
    let parsedPlots = [];
    if (project.plots_data) {
      try {
        if (typeof project.plots_data === "string") {
          parsedPlots = JSON.parse(project.plots_data);
        } else if (Array.isArray(project.plots_data)) {
          parsedPlots = project.plots_data;
        }
      } catch (error) {
        console.error("Error parsing plots_data:", error);
        parsedPlots = [];
      }
    }
    setParsedPlotsData(parsedPlots);

    // Parse revenue_plots_data from database (revenue plots array)
    let parsedRevenuePlots = [];
    if (project.revenue_plots_data) {
      try {
        if (typeof project.revenue_plots_data === "string") {
          parsedRevenuePlots = JSON.parse(project.revenue_plots_data);
        } else if (Array.isArray(project.revenue_plots_data)) {
          parsedRevenuePlots = project.revenue_plots_data;
        }
      } catch (error) {
        console.error("Error parsing revenue_plots_data:", error);
        parsedRevenuePlots = [];
      }
    }
    setParsedRevenuePlotsData(parsedRevenuePlots);

    setAddRevenuePlotNumber(project.addRevenuePlotNumber || "");
    setAttachment(project.attachment || null);

    // Set plot ID if provided (for editing specific plot)
    if (plotId) {
      setEditingPlotId(plotId);
    }

    if (project.type === PROJECT_TYPES.CUSTOM) {
      const customTypes = project.custom_selected_types || [];
      setSelectedCustomTypes(customTypes);
      if (customTypes.length > 0) setCurrentCustomType(customTypes[0]);
    }
    setOpenInOverview(true);
    setShowForm(true);
  }, []);

  const handleViewProject = useCallback((project) => {
    setViewProjectData(project);
    setViewProjectId(project.id);
  }, []);

  const closeViewProject = useCallback(() => {
    setViewProjectId(null);
    setViewProjectData(null);
  }, []);

  const toggleProjectExpansion = useCallback(
    (id) => {
      setExpandedProject(expandedProject === id ? null : id);
    },
    [expandedProject],
  );

  const handleProjectTypeChange = (e) => {
    const newType = e.target.value;
    setProjectType(newType);
    setShowCustomizeSelect(newType === PROJECT_TYPES.CUSTOM);
  };

  const handleCustomizeTypeSelect = (selectedTypes) => {
    const typesArray = Array.isArray(selectedTypes)
      ? selectedTypes
      : [selectedTypes];
    setSelectedCustomTypes(typesArray);
    if (typesArray.length > 0) setCurrentCustomType(typesArray[0]);
    setShowCustomizeSelect(false);
    setProjectType(PROJECT_TYPES.CUSTOM);
  };

  const exportAllProjectsToExcel = () => {
    if (projects.length === 0) {
      alert("No projects to export.");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(projects);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "All Projects");
    XLSX.writeFile(
      wb,
      `All_Projects_${new Date().toISOString().slice(0, 10)}.xlsx`,
    );
  };

  // Open Plot Editing Overview for a project
  const openPlotEditingOverview = (project) => {
    setSelectedProjectForEditing(project);

    // Get all plots from the project
    let projectPlots = [];
    if (project.plots_data) {
      try {
        if (typeof project.plots_data === "string") {
          projectPlots = JSON.parse(project.plots_data);
        } else if (Array.isArray(project.plots_data)) {
          projectPlots = project.plots_data;
        }
      } catch (error) {
        console.error("Error parsing plots_data for overview:", error);
        projectPlots = [];
      }
    }

    setEditingPlots(projectPlots);
    setShowPlotEditingOverview(true);
  };

  const openCommercialEditingOverview = (project) => {
  setCommercialOverviewProject(project);

  let units = [];
  if (project.units_data) {
    try {
      units =
        typeof project.units_data === "string"
          ? JSON.parse(project.units_data)
          : project.units_data;
    } catch (e) {
      console.error("Failed to parse commercial units_data", e);
      units = [];
    }
  }

  setCommercialOverviewUnits(units);
  setShowCommercialEditingOverview(true);
};


  // Navigate to edit a specific plot from overview
  const navigateToPlotEditFromOverview = (plotId) => {
    if (!selectedProjectForEditing) return;

    // Update the project to mark this plot as being edited
    const updatedProjects = projects.map((project) => {
      if (project.id === selectedProjectForEditing.id) {
        // Parse existing plots
        let existingPlots = [];
        if (project.plots_data) {
          try {
            if (typeof project.plots_data === "string") {
              existingPlots = JSON.parse(project.plots_data);
            } else if (Array.isArray(project.plots_data)) {
              existingPlots = project.plots_data;
            }
          } catch (error) {
            console.error("Error parsing plots_data:", error);
            existingPlots = [];
          }
        }

        // Mark plot as being edited
        const updatedPlots = existingPlots.map((plot) => ({
          ...plot,
          isBeingEdited: plot.id === plotId,
        }));

        return {
          ...project,
          plots_data: JSON.stringify(updatedPlots),
          updated_at: new Date().toISOString(),
        };
      }
      return project;
    });

    setProjects(updatedProjects);

    // Close overview
    setShowPlotEditingOverview(false);

    // Open the project in edit mode with the specific plot ID
    editProject(selectedProjectForEditing, plotId);
  };

  // Complete editing for all plots in a project
  const completeAllPlotEditing = () => {
    if (!selectedProjectForEditing) return;

    const updatedProjects = projects.map((project) => {
      if (project.id === selectedProjectForEditing.id) {
        // Parse existing plots
        let existingPlots = [];
        if (project.plots_data) {
          try {
            if (typeof project.plots_data === "string") {
              existingPlots = JSON.parse(project.plots_data);
            } else if (Array.isArray(project.plots_data)) {
              existingPlots = project.plots_data;
            }
          } catch (error) {
            console.error("Error parsing plots_data:", error);
            existingPlots = [];
          }
        }

        // Mark all plots as not being edited
        const updatedPlots = existingPlots.map((plot) => ({
          ...plot,
          isBeingEdited: false,
        }));

        return {
          ...project,
          plots_data: JSON.stringify(updatedPlots),
          updated_at: new Date().toISOString(),
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    setShowPlotEditingOverview(false);
    setSelectedProjectForEditing(null);
    alert("All plot editing completed!");
  };

  // Render Plot Editing Overview
  const renderPlotEditingOverview = () => {
    if (!selectedProjectForEditing) return null;

    const project = selectedProjectForEditing;
    const projectPlots = editingPlots;

    // Calculate statistics
    const stats = {
      total: projectPlots.length,
      beingEdited: projectPlots.filter((p) => p.isBeingEdited).length,
      saved: projectPlots.filter((p) => p.lastSaved && !p.isBeingEdited).length,
      notEdited: projectPlots.filter((p) => !p.lastSaved && !p.isBeingEdited)
        .length,
      complete: projectPlots.filter((p) => p.isComplete).length,
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 overflow-y-auto p-4">
        <div className="bg-white rounded-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl p-6 z-10">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <FaTable className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Plot Editing Overview
                    </h2>
                    <p className="text-sm text-gray-600">
                      Project:{" "}
                      <span className="font-semibold">{project.name}</span>
                    </p>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="text-2xl font-bold text-gray-900">
                      {stats.total}
                    </div>
                    <div className="text-xs text-gray-500">Total Plots</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3">
                    <div className="text-2xl font-bold text-blue-700">
                      {stats.beingEdited}
                    </div>
                    <div className="text-xs text-blue-600">Being Edited</div>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-3">
                    <div className="text-2xl font-bold text-emerald-700">
                      {stats.saved}
                    </div>
                    <div className="text-xs text-emerald-600">Saved</div>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-3">
                    <div className="text-2xl font-bold text-amber-700">
                      {stats.notEdited}
                    </div>
                    <div className="text-xs text-amber-600">Not Edited</div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-3">
                    <div className="text-2xl font-bold text-purple-700">
                      {stats.complete}
                    </div>
                    <div className="text-xs text-purple-600">Complete</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={completeAllPlotEditing}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center"
                >
                  <FaCheck className="mr-2" />
                  Complete All Editing
                </button>
                <button
                  onClick={() => setShowPlotEditingOverview(false)}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                  title="Close"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">


            {/* Plots Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Plot
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Area Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Last Saved
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Completion
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {projectPlots.map((plot) => (
                      <tr
                        key={plot.id}
                        className={`hover:bg-gray-50 transition-colors ${
                          plot.isBeingEdited
                            ? "bg-blue-50"
                            : plot.lastSaved
                              ? "bg-emerald-50"
                              : "bg-gray-50/30"
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="shrink-0 h-10 w-10">
                              <div
                                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                                  plot.isBeingEdited
                                    ? "bg-blue-100"
                                    : plot.lastSaved
                                      ? "bg-emerald-100"
                                      : "bg-gray-200"
                                }`}
                              >
                                <FaTable
                                  className={`h-5 w-5 ${
                                    plot.isBeingEdited
                                      ? "text-blue-600"
                                      : plot.lastSaved
                                        ? "text-emerald-600"
                                        : "text-gray-400"
                                  }`}
                                />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div
                                className={`text-sm font-medium ${
                                  plot.isBeingEdited
                                    ? "text-blue-900 font-bold"
                                    : plot.lastSaved
                                      ? "text-gray-900"
                                      : "text-gray-500 italic"
                                }`}
                              >
                                {plot.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {plot.isCornerPlot
                                  ? "Corner Plot"
                                  : "Regular Plot"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className={`text-sm ${
                              plot.areaDetails?.plotArea
                                ? "text-gray-900"
                                : "text-gray-500 italic"
                            }`}
                          >
                            {plot.areaDetails?.plotArea
                              ? `${plot.areaDetails.plotArea} sq-yd`
                              : "Not set"}
                          </div>
                          {plot.areaDetails?.plotLength &&
                            plot.areaDetails?.plotBreadth && (
                              <div className="text-xs text-gray-500">
                                {plot.areaDetails.plotLength} ×{" "}
                                {plot.areaDetails.plotBreadth} yd
                              </div>
                            )}
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className={`text-sm ${
                              plot.priceDetails?.expectedPrice
                                ? "text-gray-900"
                                : "text-gray-500 italic"
                            }`}
                          >
                            {plot.priceDetails?.expectedPrice
                              ? `₹${parseInt(plot.priceDetails.expectedPrice).toLocaleString()}`
                              : "Not set"}
                          </div>
                          {plot.priceDetails?.tokenAmount && (
                            <div className="text-xs text-gray-500">
                              Token: ₹
                              {parseInt(
                                plot.priceDetails.tokenAmount,
                              ).toLocaleString()}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                              plot.isBeingEdited
                                ? "bg-blue-100 text-blue-800"
                                : plot.lastSaved
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-gray-100 text-gray-500 italic"
                            }`}
                          >
                            {plot.isBeingEdited
                              ? "Being Edited"
                              : plot.lastSaved
                                ? "Saved"
                                : "Not Edited"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {plot.lastSaved
                            ? new Date(plot.lastSaved).toLocaleDateString() +
                              " " +
                              new Date(plot.lastSaved).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "Never"}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {plot.isComplete ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-800">
                                <FaCheckCircle className="mr-1" />
                                Complete
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">
                                <FaTimesCircle className="mr-1" />
                                In Progress
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                navigateToPlotEditFromOverview(plot.id)
                              }
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit this plot"
                            >
                              <FaPen />
                            </button>
                            <button
                              onClick={() => {
                                alert(
                                  `Plot Details:\n\nName: ${plot.name}\nArea: ${plot.areaDetails?.plotArea || "N/A"} sq-yd\nPrice: ${plot.priceDetails?.expectedPrice || "N/A"}\nPurchaser: ${plot.purchaser || "N/A"}\nConstructor: ${plot.constructor || "N/A"}\nStatus: ${plot.isComplete ? "Complete" : "In Progress"}\nLast Edited: ${plot.lastSaved || "Never"}`,
                                );
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

              {projectPlots.length === 0 && (
                <div className="py-12 text-center">
                  <FaTable className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    No Plots Created
                  </h3>
                  <p className="text-gray-500">
                    This project doesn't have any plots yet.
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Showing {projectPlots.length} plot(s)
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowPlotEditingOverview(false);
                    editProject(project);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center"
                >
                  <FaEdit className="mr-2" />
                  Edit Project
                </button>
                <button
                  onClick={completeAllPlotEditing}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center"
                >
                  <FaCheck className="mr-2" />
                  Complete All Editing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderUnitEditingOverview = () => {
    if (!unitOverviewProject) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 p-6 overflow-y-auto">
        <div className="bg-white max-w-4xl mx-auto rounded-xl shadow-xl">
          <div className="p-6 border-b flex justify-between">
            <h2 className="text-xl font-bold">
              Unit Overview — {unitOverviewProject.name}
            </h2>
            <button onClick={() => setShowUnitEditingOverview(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="p-6 space-y-3">
            {unitOverviewUnits.map((unit) => (
              <div
                key={unit.id}
                className={`p-4 rounded-lg flex justify-between items-center
                ${
                  unit.isBeingEdited
                    ? "bg-blue-50"
                    : unit.lastSaved
                      ? "bg-emerald-50"
                      : "bg-slate-100 opacity-70 italic"
                }`}
              >
                <div>
                  <div className="font-semibold">{unit.unitNo}</div>
                  <div className="text-xs text-slate-500">
                    {unit.isBeingEdited
                      ? "Being edited"
                      : unit.lastSaved
                        ? "Saved"
                        : "Not edited"}
                  </div>
                </div>

                <button
                  className="bg-indigo-600 text-white px-3 py-1 rounded"
                  onClick={() => {
                    setShowUnitEditingOverview(false);
                    editProject(unitOverviewProject, unit.id);
                  }}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

const renderApartmentEditingOverview = () => {
  if (!apartmentOverviewProject) return null;

  const project = apartmentOverviewProject;
  const blocks = apartmentOverviewBlocks;

  // Calculate statistics
  const allUnits = blocks.flatMap(block => {
    let units = [];
    if (block.units_data) {
      try {
        units = typeof block.units_data === "string"
          ? JSON.parse(block.units_data)
          : block.units_data;
      } catch {
        units = [];
      }
    } else if (Array.isArray(block.floors)) {
      units = block.floors.flatMap(floor => floor.units || []);
    }
    return Array.isArray(units) ? units : [];
  });

  const stats = {
    totalBlocks: blocks.length,
    totalUnits: allUnits.length,
    beingEdited: allUnits.filter(u => u.isBeingEdited).length,
    saved: allUnits.filter(u => u.lastSaved && !u.isBeingEdited).length,
    notEdited: allUnits.filter(u => !u.lastSaved && !u.isBeingEdited).length,
    complete: allUnits.filter(u => u.isComplete).length,
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl p-6 z-10">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <FaBuilding className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Apartment Editing Overview
                  </h2>
                  <p className="text-sm text-gray-600">
                    Project:{" "}
                    <span className="font-semibold">{project.name}</span>
                  </p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6">
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.totalBlocks}
                  </div>
                  <div className="text-xs text-gray-500">Total Blocks</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-3">
                  <div className="text-2xl font-bold text-purple-700">
                    {stats.totalUnits}
                  </div>
                  <div className="text-xs text-purple-600">Total Units</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-3">
                  <div className="text-2xl font-bold text-blue-700">
                    {stats.beingEdited}
                  </div>
                  <div className="text-xs text-blue-600">Being Edited</div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-3">
                  <div className="text-2xl font-bold text-emerald-700">
                    {stats.saved}
                  </div>
                  <div className="text-xs text-emerald-600">Saved</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-3">
                  <div className="text-2xl font-bold text-amber-700">
                    {stats.notEdited}
                  </div>
                  <div className="text-xs text-amber-600">Not Edited</div>
                </div>
                <div className="bg-indigo-50 rounded-xl p-3">
                  <div className="text-2xl font-bold text-indigo-700">
                    {stats.complete}
                  </div>
                  <div className="text-xs text-indigo-600">Complete</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowApartmentOverview(false)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center"
              >
                <FaCheck className="mr-2" />
                Complete All Editing
              </button>
              <button
                onClick={() => setShowApartmentOverview(false)}
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                title="Close"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <FaExclamationCircle className="text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">
                  Editing Status Guide
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span>
                      <span className="font-semibold">Blue</span> - Unit is
                      currently being edited
                    </span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                    <span>
                      <span className="font-semibold">Green</span> - Unit has
                      been saved/edited
                    </span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                    <span>
                      <span className="font-semibold">Gray</span> - Unit has
                      not been edited yet
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Blocks & Units Grid */}
          <div className="space-y-6">
            {blocks.map((block) => {
              let blockUnits = [];
              
              // Extract units from block
              if (block.units_data) {
                try {
                  blockUnits = typeof block.units_data === "string"
                    ? JSON.parse(block.units_data)
                    : block.units_data;
                } catch {
                  blockUnits = [];
                }
              } else if (Array.isArray(block.floors)) {
                blockUnits = block.floors.flatMap(floor => floor.units || []);
              }
              
              if (!Array.isArray(blockUnits)) blockUnits = [];
              
              const blockStats = {
                total: blockUnits.length,
                beingEdited: blockUnits.filter(u => u.isBeingEdited).length,
                saved: blockUnits.filter(u => u.lastSaved && !u.isBeingEdited).length,
                notEdited: blockUnits.filter(u => !u.lastSaved && !u.isBeingEdited).length,
                complete: blockUnits.filter(u => u.isComplete).length,
              };

              return (
                <div
                  key={block.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
                >
                  {/* Block Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <FaBuilding className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">
                            Block {block.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {block.floors?.length || 0} floors • {blockStats.total} units
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {blockStats.beingEdited > 0 && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {blockStats.beingEdited} editing
                          </span>
                        )}
                        {blockStats.saved > 0 && (
                          <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                            {blockStats.saved} saved
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Units Grid */}
                  <div className="p-6">
                    {blockUnits.length === 0 ? (
                      <div className="text-center py-8">
                        <FaDoorClosed className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                        <p className="text-gray-500">No units in this block</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {blockUnits.map((unit) => (
                          <div
                            key={unit.id}
                            className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
                              unit.isBeingEdited
                                ? "border-blue-300 bg-blue-50"
                                : unit.lastSaved
                                ? "border-emerald-200 bg-emerald-50"
                                : "border-gray-200 bg-gray-50 opacity-70"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center gap-2">
                                <div className={`p-2 rounded-lg ${
                                  unit.isBeingEdited
                                    ? "bg-blue-100"
                                    : unit.lastSaved
                                    ? "bg-emerald-100"
                                    : "bg-gray-100"
                                }`}>
                                  <FaHome className={`h-4 w-4 ${
                                    unit.isBeingEdited
                                      ? "text-blue-600"
                                      : unit.lastSaved
                                      ? "text-emerald-600"
                                      : "text-gray-400"
                                  }`} />
                                </div>
                                <div>
                                  <div className={`font-medium ${
                                    unit.isBeingEdited
                                      ? "text-blue-900"
                                      : unit.lastSaved
                                      ? "text-gray-900"
                                      : "text-gray-500"
                                  }`}>
                                    {unit.unitNo || unit.name || "Unit"}
                                  </div>
                                  {unit.type && (
                                    <div className="text-xs text-gray-500">
                                      {unit.type}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                unit.isBeingEdited
                                  ? "bg-blue-100 text-blue-800"
                                  : unit.lastSaved
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-gray-100 text-gray-500 italic"
                              }`}>
                                {unit.isBeingEdited ? "Editing" : unit.lastSaved ? "Saved" : "Not Edited"}
                              </span>
                            </div>

                            {/* Unit Details */}
                            <div className="space-y-2">
                              {(unit.area || unit.area_details?.carpet_area) && (
                                <div className="text-sm text-gray-600">
                                  Area: {unit.area || unit.area_details?.carpet_area} sqft
                                </div>
                              )}
                              {unit.status && (
                                <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                                  unit.status === 'Sold' ? 'bg-red-100 text-red-800' :
                                  unit.status === 'Available' ? 'bg-green-100 text-green-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {unit.status}
                                </div>
                              )}
                            </div>

                            <div className="mt-4 flex justify-end">
                              <button
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                  unit.isBeingEdited
                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                    : unit.lastSaved
                                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                                }`}
                                onClick={() => {
                                  setShowApartmentOverview(false);
                                  editProject(project, unit.id);
                                }}
                              >
                                {unit.isBeingEdited ? "Continue Editing" : "Edit Unit"}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-between items-center pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Showing {stats.totalUnits} unit(s) across {stats.totalBlocks} block(s)
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowApartmentOverview(false);
                  editProject(project);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center"
              >
                <FaEdit className="mr-2" />
                Edit Project Details
              </button>
              <button
                onClick={() => setShowApartmentOverview(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-all duration-200 flex items-center"
              >
                <FaTimes className="mr-2" />
                Close Overview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

  const renderCommercialEditingOverview = () => {
  if (!commercialOverviewProject) return null;

  const units = commercialOverviewUnits;

  const stats = {
    total: units.length,
    beingEdited: units.filter(u => u.isBeingEdited).length,
    saved: units.filter(u => u.lastSaved && !u.isBeingEdited).length,
    notEdited: units.filter(u => !u.lastSaved && !u.isBeingEdited).length,
    complete: units.filter(u => u.isComplete).length,
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">

        {/* HEADER */}
        <div className="sticky top-0 bg-white border-b p-6 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              Commercial Editing Overview — {commercialOverviewProject.name}
            </h2>
            <button onClick={() => setShowCommercialEditingOverview(false)}>
              <FaTimes />
            </button>
          </div>

          {/* STATS */}
          {/* <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            <Stat label="Total Units" value={stats.total} />
            <Stat label="Being Edited" value={stats.beingEdited} color="blue" />
            <Stat label="Saved" value={stats.saved} color="emerald" />
            <Stat label="Not Edited" value={stats.notEdited} color="amber" />
            <Stat label="Complete" value={stats.complete} color="purple" />
          </div> */}
        </div>

        {/* TABLE */}
        <div className="p-6">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-semibold">Floor</th>
                <th className="px-6 py-3 text-left text-xs font-semibold">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold">Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {units.map(unit => (
                <tr key={unit.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{unit.name}</td>
                  <td className="px-6 py-4">{unit.floor}</td>
                  <td className="px-6 py-4">{unit.roomType}</td>
                  <td className="px-6 py-4">
                    {unit.isBeingEdited
                      ? "Being Edited"
                      : unit.lastSaved
                        ? "Saved"
                        : "Not Edited"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => {
                        setShowCommercialEditingOverview(false);
                        editProject(commercialOverviewProject, unit.id);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <FaPen />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};


  //   const renderEditingOverview = () => {
  //   if (!editingOverview.open) return null;

  //   const { project, type, items } = editingOverview;

  //   return (
  //     <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start p-6 overflow-y-auto">
  //       <div className="bg-white w-full max-w-6xl rounded-xl shadow-xl">

  //         {/* Header */}
  //         <div className="flex justify-between items-center p-6 border-b">
  //           <h2 className="text-xl font-bold">
  //             {type.toUpperCase()} Editing Overview — {project.name}
  //           </h2>
  //           <button onClick={() => setEditingOverview({ open: false })}>
  //             <FaTimes />
  //           </button>
  //         </div>

  //         {/* Body */}
  //         <div className="p-6 space-y-4">

  //           {items.map(item => {
  //             const isEditing = item.isBeingEdited;
  //             const isSaved = item.lastSaved;

  //             return (
  //               <div
  //                 key={item.id}
  //                 className={`p-4 rounded-lg flex justify-between items-center
  //                   ${isEditing
  //                     ? "bg-blue-50"
  //                     : isSaved
  //                       ? "bg-emerald-50"
  //                       : "bg-slate-100 opacity-70 italic blur-[0.4px]"
  //                   }`}
  //               >
  //                 <div>
  //                   <div className="font-semibold">
  //                     {item.name || item.unitNo || item.blockName}
  //                   </div>
  //                   <div className="text-xs text-slate-500">
  //                     {isEditing ? "Being edited" : isSaved ? "Saved" : "Not edited"}
  //                   </div>
  //                 </div>

  //                 <button
  //                   className="px-3 py-1 text-sm bg-indigo-600 text-white rounded"
  //                   onClick={() => {
  //                     setEditingOverview({ open: false });
  //                     editProject(project, item.id);
  //                   }}
  //                 >
  //                   Edit
  //                 </button>
  //               </div>
  //             );
  //           })}

  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  const renderProjectForm = () => {
    if (showCustomizeSelect) {
      return (
        <div className="p-8">
          {/* <CustomProject */}
          <CustomizeSelect
            initialSelected={selectedCustomTypes}
            onBack={() => setShowCustomizeSelect(false)}
            onSelectType={handleCustomizeTypeSelect}
          />
        </div>
      );
    }

    const commonProps = {
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
      commercialSubType,
      setCommercialSubType,
      onSaveProject: handleSaveProject,
      PROJECT_TYPES,
      editingProjectId,
    };

    const selectedProject = editingProjectId
      ? projects.find((p) => p.id === editingProjectId)
      : null;

    const duplexTriplexProps = {
      ...commonProps,
      landArea,
      setLandArea,
      revenuePlots,
      setRevenuePlots,
      addRevenuePlotNumber,
      setAddRevenuePlotNumber,
      attachment,
      setAttachment,
      constants: DUPLEX_TRIPLEX_CONSTANTS,
      selectedProject,
      
      initialUnits: selectedProject?.units_data
        ? typeof selectedProject.units_data === "string"
          ? JSON.parse(selectedProject.units_data)
          : selectedProject.units_data
        : [],
      showUnitOverviewOnLoad:
        editingProjectId &&
        (projectType === "duplex" || projectType === "triplex")
          ? window.showUnitOverview
          : false,

  // ✅ ADD THIS (THIS IS ALL YOU NEED)
  onClose: () => {
    resetForm();
    setShowForm(false);
    setEditingProjectId(null);
  },
    };

    // Pass all parsed data to PlottingProject
    const plottingProps = {
      ...commonProps,
      editingPlotId,
      selectedProject: editingProjectId
        ? projects.find((p) => p.id === editingProjectId)
        : null,
      // Pass parsed database data
      initialLandArea: landArea,
      initialRevenuePlots: revenuePlots,
      initialParsedPlotsData: parsedPlotsData, // Main plots array
      initialParsedRevenuePlotsData: parsedRevenuePlotsData, // Revenue plots array

        // ✅ ADD THIS
  onClose: () => {
    resetForm();
    setShowForm(false);
    setEditingProjectId(null);
  },
    };

    if (
      projectType === PROJECT_TYPES.CUSTOM &&
      selectedCustomTypes.length > 0
    ) {
      return (
        <div className="space-y-4 p-6">
          <div className="flex gap-2 flex-wrap">
            {selectedCustomTypes.map((type) => (
              <button
                key={type}
                onClick={() => setCurrentCustomType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  currentCustomType === type
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50">
            {currentCustomType === "plotting" ? (
              <PlottingProject {...plottingProps} />
            ) : currentCustomType === "duplex" ||
              currentCustomType === "triplex" ? (
              <DuplexTriplexProject
                {...duplexTriplexProps}
                projectType={currentCustomType}
              />
            ) : currentCustomType === "apartment" ? (
              <ApartmentProject {...commonProps} />
            ) : currentCustomType === "commercial" ? (
              <CommercialProject {...commonProps} />
            ) : (
              <CustomProject {...commonProps} activeType={currentCustomType} />
            )}
          </div>
        </div>
      );
    }

    switch (projectType) {
      case PROJECT_TYPES.PLOTTING:
        return <PlottingProject {...plottingProps} />;
      case PROJECT_TYPES.DUPLEX:
        return (
          <DuplexTriplexProject {...duplexTriplexProps} projectType="duplex" />
        );
      case PROJECT_TYPES.TRIPLEX:
        return (
          <DuplexTriplexProject {...duplexTriplexProps} projectType="triplex" />
        );
      case PROJECT_TYPES.APARTMENT:
        return (
          <ApartmentProject
            {...commonProps}
            selectedProject={selectedProject}
            openInUnitsTab={!!editingProjectId}
            openInOverview={openInOverview}
              onClose={() => {
    resetForm();
    setShowForm(false);
    setEditingProjectId(null);
  }}
          />
        );

      case PROJECT_TYPES.COMMERCIAL:
  return (
    <CommercialProject
      {...commonProps}
      selectedProject={selectedProject}
    />
  );

      case PROJECT_TYPES.CUSTOM:
        return (
          <div className="p-8 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 mb-4">
              Select custom project types to continue
            </p>
            <button
              onClick={() => setShowCustomizeSelect(true)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium shadow-md"
            >
              Choose Types
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900">
      <div className="mx-auto py-3">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold text-indigo-900 tracking-tight">
              Project Management
            </h1>
            <p className="text-slate-500 font-medium">
              Create and track your property projects
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={exportAllProjectsToExcel}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all font-semibold"
            >
              <FaFileExcel /> Export
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-indigo-200 font-semibold"
            >
              <FaPlus /> New Project
            </button>
          </div>
        </header>

        {!showForm ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <FaDatabase className="text-indigo-500" />
                  Active Projects ({projects.length})
                </h2>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <FaCloudDownloadAlt className="text-blue-500" />
                    Server: {syncStatus.server}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaHome className="text-emerald-500" />
                    Local: {syncStatus.local}
                  </span>
                  {syncStatus.lastSynced && (
                    <span className="text-xs text-slate-400">
                      Synced: {formatDate(syncStatus.lastSynced)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              {projects.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <FaBuilding className="text-slate-400 text-2xl" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-700">
                      No projects yet
                    </h3>
                    <p className="text-slate-500">
                      Create your first project to get started
                    </p>
                  </div>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                      <th className="px-6 py-4">Project</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">Location</th>
                      <th className="px-6 py-4">Plots Status</th>
                      <th className="px-6 py-4">Created At</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {projects.map((project) => {
                      // Parse plots_data to get plot information
                      let projectPlots = [];
                      let totalPlots = 0;
                      let editingPlotsCount = 0;
                      let savedPlotsCount = 0;

                      if (project.plots_data) {
                        try {
                          const parsedPlots =
                            typeof project.plots_data === "string"
                              ? JSON.parse(project.plots_data)
                              : project.plots_data;

                          if (Array.isArray(parsedPlots)) {
                            projectPlots = parsedPlots;
                            totalPlots = parsedPlots.length;
                            editingPlotsCount = parsedPlots.filter(
                              (p) => p.isBeingEdited,
                            ).length;
                            savedPlotsCount = parsedPlots.filter(
                              (p) => p.lastSaved && !p.isBeingEdited,
                            ).length;
                          }
                        } catch (error) {
                          console.error("Error parsing plots_data:", error);
                        }
                      }

                      return (
                        <React.Fragment key={project.id}>
                          <tr className="group hover:bg-indigo-50/30 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                                  {project.name?.charAt(0) || "P"}
                                </div>
                                <div>
                                  <div className="font-bold text-slate-800">
                                    {project.name}
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <div className="text-xs text-slate-400 font-mono">
                                      {project.id}
                                    </div>
                                    <div
                                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${project.source === "server" ? "bg-blue-100 text-blue-800" : "bg-emerald-100 text-emerald-800"}`}
                                    >
                                      {project.source === "server"
                                        ? "SERVER"
                                        : "LOCAL"}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                                {project.type}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                                <FaMapMarkerAlt className="text-rose-500 text-xs" />
                                {project.city || "Not set"}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {project.type === "duplex" ||
                              project.type === "triplex" ? (
                                (() => {
                                  let units = [];

                                  // 🔥 SOURCE OF TRUTH: units_data
                                  if (project.units_data) {
                                    try {
                                      units =
                                        typeof project.units_data === "string"
                                          ? JSON.parse(project.units_data)
                                          : project.units_data;
                                    } catch (e) {
                                      console.error(
                                        "Failed to parse units_data",
                                        e,
                                      );
                                      units = [];
                                    }
                                  }

                                  const total = units.length;
                                  const editing = units.filter(
                                    (u) => u.isBeingEdited,
                                  ).length;
                                  const saved = units.filter(
                                    (u) => u.lastSaved && !u.isBeingEdited,
                                  ).length;
                                  const notEdited = total - editing - saved;

                                  return total > 0 ? (
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-semibold text-slate-700">
                                        {total} unit(s)
                                      </span>

                                      {/* Status dots */}
                                      <div className="flex items-center gap-1">
                                        {editing > 0 && (
                                          <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                        )}
                                        {saved > 0 && (
                                          <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                                        )}
                                        {notEdited > 0 && (
                                          <span className="w-2 h-2 bg-slate-400 rounded-full" />
                                        )}
                                      </div>

                                      {/* Badges */}
                                      {editing > 0 && (
                                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                          {editing} editing
                                        </span>
                                      )}
                                      {saved > 0 && (
                                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                                          {saved} saved
                                        </span>
                                      )}
                                    </div>
                                  ) : (
                                    <span className="text-sm text-slate-400">
                                      No units
                                    </span>
                                  );
                                })()
                              ) : /* plotting fallback (keep your existing plotting code) */
                              totalPlots > 0 ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-slate-700">
                                    {totalPlots} plot(s)
                                  </span>
                                </div>
                              ) : (
                                <span className="text-sm text-slate-400">
                                  No plots
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-slate-500 text-sm">
                              {formatDate(
                                project.created_at || project.createdAt,
                              )}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                {/* Unit Editing Overview button for duplex/triplex projects */}
                                {(project.type === "duplex" ||
                                  project.type === "triplex") &&
                                  (() => {
                                    let units = [];

                                    if (project.units_data) {
                                      try {
                                        units =
                                          typeof project.units_data === "string"
                                            ? JSON.parse(project.units_data)
                                            : project.units_data;
                                      } catch (e) {
                                        units = [];
                                      }
                                    }

                                    return units.length > 0 ? (
                                      <button
                                        onClick={() => {
                                          setEditingProjectId(project.id);
                                          setProjectName(project.name || "");
                                          setProjectType(project.type || "");
                                          setCity(project.city || "");
                                          setLocality(project.locality || "");
                                          setLandArea(project.land_area || "");
                                          setRevenuePlots(
                                            project.revenue_plots || "",
                                          );

                                          // Show the form
                                          setShowForm(true);

                                          // Trigger unit overview to show immediately
                                          setTimeout(() => {
                                            const duplexTriplexProps = {
                                              projectName: project.name || "",
                                              setProjectName: setProjectName,
                                              projectType: project.type || "",
                                              setProjectType: setProjectType,
                                              city: project.city || "",
                                              setCity: setCity,
                                              locality: project.locality || "",
                                              setLocality: setLocality,
                                              landArea: project.land_area || "",
                                              setLandArea: setLandArea,
                                              revenuePlots:
                                                project.revenue_plots || "",
                                              setRevenuePlots: setRevenuePlots,
                                              onSaveProject: handleSaveProject,
                                              constants:
                                                DUPLEX_TRIPLEX_CONSTANTS,
                                              PROJECT_TYPES: PROJECT_TYPES,
                                              selectedProject: project,
                                              initialUnits: units,
                                              showUnitOverviewOnLoad: true, // This will trigger the overview
                                            };

                                            // Force re-render with showUnitOverviewOnLoad
                                            window.dispatchEvent(
                                              new CustomEvent(
                                                "OPEN_UNIT_OVERVIEW",
                                              ),
                                            );
                                          }, 100);
                                        }}
                                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                        title="View Unit Editing Overview"
                                      >
                                        <FaTable />
                                      </button>
                                    ) : null;
                                  })()}
                                  
  {/* Apartment Block & Unit Editing Overview */}
 {project.type === "apartment" && (
                                  <button
                                    onClick={() => {
                                      // Open apartment project
                                     openApartmentEditingOverview(project)

                                      // Trigger block & unit overview inside ApartmentProject
                                      setTimeout(() => {
                                        window.dispatchEvent(
                                          new CustomEvent(
                                            "OPEN_BLOCK_UNIT_OVERVIEW",
                                          ),
                                        );
                                      }, 100);
                                    }}
                                    className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                                    title="Block & Unit Editing Overview"
                                  >
                                    <FaTable />
                                  </button>
  )}

   {/* Commercial Editing Overview */}
{project.type === "commercial" && (
  <button
    onClick={() => openCommercialEditingOverview(project)}
    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
    title="Commercial Editing Overview"
  >
    <FaTable />
  </button>
)}


                                {/* Plot Editing Overview button for plotting projects */}
{project.type === "plotting" && (
  <button
    onClick={() => openPlotEditingOverview(project)}
    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
    title="View Plot Editing Overview"
  >
    <FaTable />
  </button>
)}


                                {/* Apartment Block & Unit Editing Overview */}
                                {/* {project.type === "apartment" && (
  <button
    onClick={() => {
      // 1️⃣ Open Apartment project normally
      setEditingProjectId(project.id);
      setProjectType("apartment");

      // 2️⃣ Trigger Block & Unit overview INSIDE ApartmentProject
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent("OPEN_BLOCK_UNIT_OVERVIEW")
        );
      }, 100);
    }}
    className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
    title="Block & Unit Editing Overview"
  >
    <FaTable />
  </button>
)} */}

                                {/* <button
  onClick={() => openEditingOverview(project)}
  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
>
  <FaEdit />
</button> */}

                                <button
                                  onClick={() => editProject(project)}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                  title="Edit Project"
                                >
                                  <FaEdit />
                                </button>

                                {/* Delete Project button */}
                                <button
                                  onClick={() => deleteProject(project.id)}
                                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <FaTrash />
                                </button>

                                {/* Expand/Collapse button */}
                                <button
                                  onClick={() =>
                                    toggleProjectExpansion(project.id)
                                  }
                                  className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors"
                                  title={
                                    expandedProject === project.id
                                      ? "Collapse"
                                      : "Expand"
                                  }
                                >
                                  {expandedProject === project.id ? (
                                    <FaTimes />
                                  ) : (
                                    <FaSync className="text-xs" />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>

                          {expandedProject === project.id && (
                            <tr className="bg-slate-50/80">
                              <td
                                colSpan="6"
                                className="px-6 py-6 border-b border-indigo-100"
                              >
                                <div className="bg-white rounded-xl p-6 border border-indigo-100 shadow-sm">
                                  <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-lg font-bold text-slate-800">
                                      Project Details
                                    </h4>
                                    <span className="text-sm text-slate-500">
                                      ID: {project.id}
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Basic Information Column */}
                                    <div className="space-y-4">
                                      <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                                          <FaBuilding />
                                        </div>
                                        <div>
                                          <h5 className="font-semibold text-slate-800">
                                            Basic Information
                                          </h5>
                                          <p className="text-sm text-slate-500">
                                            Core project details
                                          </p>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-2 gap-3">
                                        <div>
                                          <label className="text-xs font-bold text-slate-400 uppercase">
                                            Project Type
                                          </label>
                                          <p className="font-semibold text-slate-700">
                                            {project.type}
                                          </p>
                                        </div>
                                        <div>
                                          <label className="text-xs font-bold text-slate-400 uppercase">
                                            Status
                                          </label>
                                          <p
                                            className={`font-semibold ${project.status === "active" ? "text-emerald-600" : "text-amber-600"}`}
                                          >
                                            {project.status || "draft"}
                                          </p>
                                        </div>
                                        <div>
                                          <label className="text-xs font-bold text-slate-400 uppercase">
                                            Created
                                          </label>
                                          <p className="font-semibold text-slate-700">
                                            {formatDate(
                                              project.created_at ||
                                                project.createdAt,
                                            )}
                                          </p>
                                        </div>
                                        <div>
                                          <label className="text-xs font-bold text-slate-400 uppercase">
                                            Last Updated
                                          </label>
                                          <p className="font-semibold text-slate-700">
                                            {formatDate(
                                              project.updated_at ||
                                                project.updatedAt,
                                            )}
                                          </p>
                                        </div>
                                        <div className="col-span-2">
                                          <label className="text-xs font-bold text-slate-400 uppercase">
                                            Source
                                          </label>
                                          <p
                                            className={`font-semibold ${project.source === "server" ? "text-blue-600" : "text-emerald-600"}`}
                                          >
                                            {project.source === "server"
                                              ? "Synced with Server"
                                              : "Local Storage"}
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Location Information Column */}
                                    <div className="space-y-4">
                                      <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                                          <FaMapMarkerAlt />
                                        </div>
                                        <div>
                                          <h5 className="font-semibold text-slate-800">
                                            Location Details
                                          </h5>
                                          <p className="text-sm text-slate-500">
                                            Geographic information
                                          </p>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-2 gap-3">
                                        <div>
                                          <label className="text-xs font-bold text-slate-400 uppercase">
                                            City
                                          </label>
                                          <p className="font-semibold text-slate-700">
                                            {project.city || "Not specified"}
                                          </p>
                                        </div>
                                        <div>
                                          <label className="text-xs font-bold text-slate-400 uppercase">
                                            Locality
                                          </label>
                                          <p className="font-semibold text-slate-700">
                                            {project.locality ||
                                              "Not specified"}
                                          </p>
                                        </div>
                                        {project.land_zone && (
                                          <div className="col-span-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase">
                                              Land Zone
                                            </label>
                                            <p className="font-semibold text-slate-700">
                                              {project.land_zone}
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Project Type Specific Details */}
                                  <div className="mt-6 pt-6 border-t border-slate-200">
                                    <div className="flex items-center gap-3 mb-4">
                                      <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                                        {project.type === "plotting" && (
                                          <FaTable />
                                        )}
                                        {project.type === "duplex" && (
                                          <FaHome />
                                        )}
                                        {project.type === "triplex" && (
                                          <FaBuilding />
                                        )}
                                        {project.type === "apartment" && (
                                          <FaHome />
                                        )}
                                        {project.type === "commercial" && (
                                          <FaBuilding />
                                        )}
                                        {project.type === "custom" && (
                                          <FaHome />
                                        )}
                                      </div>
                                      <div>
                                        <h5 className="font-semibold text-slate-800">
                                          {project.type?.toUpperCase()} Specific
                                          Details
                                        </h5>
                                        <p className="text-sm text-slate-500">
                                          Type-specific saved data
                                        </p>
                                      </div>
                                    </div>

                                    {/* Plotting Project Details */}
                                    {project.type === "plotting" && (
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                          <label className="text-xs font-bold text-slate-400 uppercase">
                                            Land Area
                                          </label>
                                          <p className="font-semibold text-slate-700">
                                            {project.land_area
                                              ? `${project.land_area} sq.ft`
                                              : "Not specified"}
                                          </p>
                                        </div>
                                        <div>
                                          <label className="text-xs font-bold text-slate-400 uppercase">
                                            Revenue Plots
                                          </label>
                                          <p className="font-semibold text-slate-700">
                                            {project.revenue_plots || 0}
                                          </p>
                                        </div>
                                        <div>
                                          <label className="text-xs font-bold text-slate-400 uppercase">
                                            Total Plots
                                          </label>
                                          <p className="font-semibold text-slate-700">
                                            {(() => {
                                              try {
                                                const plots = project.plots_data
                                                  ? typeof project.plots_data ===
                                                    "string"
                                                    ? JSON.parse(
                                                        project.plots_data,
                                                      )
                                                    : project.plots_data
                                                  : [];
                                                return plots.length || 0;
                                              } catch {
                                                return 0;
                                              }
                                            })()}
                                          </p>
                                        </div>
                                      </div>
                                    )}

                                    {/* Duplex/Triplex Project Details */}
                                    {(project.type === "duplex" ||
                                      project.type === "triplex") && (
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                          <label className="text-xs font-bold text-slate-400 uppercase">
                                            Land Area
                                          </label>
                                          <p className="font-semibold text-slate-700">
                                            {project.land_area
                                              ? `${project.land_area} sq.ft`
                                              : "Not specified"}
                                          </p>
                                        </div>
                                        <div>
                                          <label className="text-xs font-bold text-slate-400 uppercase">
                                            Total Units
                                          </label>
                                          <p className="font-semibold text-slate-700">
                                            {(() => {
                                              try {
                                                const units = project.units_data
                                                  ? typeof project.units_data ===
                                                    "string"
                                                    ? JSON.parse(
                                                        project.units_data,
                                                      )
                                                    : project.units_data
                                                  : [];
                                                return units.length || 0;
                                              } catch {
                                                return project.num_units || 0;
                                              }
                                            })()}
                                          </p>
                                        </div>
                                        <div>
                                          <label className="text-xs font-bold text-slate-400 uppercase">
                                            Unit Prefix
                                          </label>
                                          <p className="font-semibold text-slate-700">
                                            {project.unit_prefix ||
                                              "Not specified"}
                                          </p>
                                        </div>
                                        {project.facilities && (
                                          <div className="col-span-3">
                                            <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
                                              Facilities
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                              {(() => {
                                                try {
                                                  const facilities =
                                                    project.facilities
                                                      ? typeof project.facilities ===
                                                        "string"
                                                        ? JSON.parse(
                                                            project.facilities,
                                                          )
                                                        : project.facilities
                                                      : {};
                                                  return Object.entries(
                                                    facilities,
                                                  )
                                                    .filter(
                                                      ([key, value]) =>
                                                        value === true,
                                                    )
                                                    .map(([key]) => (
                                                      <span
                                                        key={key}
                                                        className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium"
                                                      >
                                                        {key.replace(/_/g, " ")}
                                                      </span>
                                                    ));
                                                } catch {
                                                  return (
                                                    <span className="text-slate-500 text-sm">
                                                      No facilities
                                                    </span>
                                                  );
                                                }
                                              })()}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )}

                                    {/* Apartment Project Details */}
                                    {project.type === "apartment" && (
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                          <label className="text-xs font-bold text-slate-400 uppercase">
                                            Total Floors
                                          </label>
                                          <p className="font-semibold text-slate-700">
                                            {project.total_floors ||
                                              "Not specified"}
                                          </p>
                                        </div>
                                        <div>
                                          <label className="text-xs font-bold text-slate-400 uppercase">
                                            Units per Floor
                                          </label>
                                          <p className="font-semibold text-slate-700">
                                            {project.units_per_floor ||
                                              "Not specified"}
                                          </p>
                                        </div>
                                        <div>
                                          <label className="text-xs font-bold text-slate-400 uppercase">
                                            Total Units
                                          </label>
                                          <p className="font-semibold text-slate-700">
                                            {(project.total_floors || 0) *
                                              (project.units_per_floor || 0) ||
                                              "Not specified"}
                                          </p>
                                        </div>
                                      </div>
                                    )}

                                    {/* Commercial Project Details */}
                                    {project.type === "commercial" && (
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                          <label className="text-xs font-bold text-slate-400 uppercase">
                                            Commercial Type
                                          </label>
                                          <p className="font-semibold text-slate-700">
                                            {project.commercial_sub_type ||
                                              "Not specified"}
                                          </p>
                                        </div>
                                        <div>
                                          <label className="text-xs font-bold text-slate-400 uppercase">
                                            Built-up Area
                                          </label>
                                          <p className="font-semibold text-slate-700">
                                            {project.built_up_area
                                              ? `${project.built_up_area} sq.ft`
                                              : "Not specified"}
                                          </p>
                                        </div>
                                        <div>
                                          <label className="text-xs font-bold text-slate-400 uppercase">
                                            Shops/Offices
                                          </label>
                                          <p className="font-semibold text-slate-700">
                                            {project.total_shops ||
                                              project.total_offices ||
                                              "Not specified"}
                                          </p>
                                        </div>
                                      </div>
                                    )}

                                    {/* Custom Project Details */}
                                    {project.type === "custom" && (
                                      <div className="space-y-3">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                          <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase">
                                              Custom Types
                                            </label>
                                            <p className="font-semibold text-slate-700">
                                              {project.custom_selected_types?.join(
                                                ", ",
                                              ) || "Not specified"}
                                            </p>
                                          </div>
                                        </div>
                                        {project.custom_details && (
                                          <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
                                              Custom Details
                                            </label>
                                            <pre className="text-xs bg-slate-50 p-3 rounded-lg overflow-x-auto text-slate-700">
                                              {JSON.stringify(
                                                project.custom_details,
                                                null,
                                                2,
                                              )}
                                            </pre>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>

                                  {/* Data Summary */}
                                  <div className="mt-6 pt-6 border-t border-slate-200">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <h6 className="text-sm font-semibold text-slate-700 mb-2">
                                          Data Summary
                                        </h6>
                                        <p className="text-xs text-slate-500">
                                          Last saved:{" "}
                                          {formatDate(
                                            project.updated_at ||
                                              project.updatedAt,
                                          )}
                                        </p>
                                      </div>
                                      <div className="flex gap-3">
                                        <button
                                          onClick={() =>
                                            handleViewProject(project)
                                          }
                                          className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold hover:underline"
                                        >
                                          View Full Details →
                                        </button>
                                        <button
                                          onClick={() => editProject(project)}
                                          className="text-blue-600 hover:text-blue-700 text-sm font-semibold hover:underline"
                                        >
                                          Edit Project
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="">
              
              {!projectType && !showCustomizeSelect ? (
                
               <div className="max-w-2xl mx-auto p-8 relative">
                {/* ❌ Close Button */}
  <button
    onClick={() => {
      resetForm();
      setShowForm(false);
    }}
    className="absolute top-4 right-4 w-10 h-10 rounded-full 
               flex items-center justify-center 
               text-slate-500 hover:text-slate-700 
               hover:bg-slate-100 transition"
    title="Cancel project creation"
  >
    <FaTimes size={18} />
  </button>
                  <div className="space-y-2 text-center mb-8">
                    <h3 className="text-2xl font-bold text-indigo-900">
                      Let's get started
                    </h3>
                    <p className="text-slate-500">
                      Enter the basic details to build your project
                      configuration
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 col-span-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">
                        Project Name
                      </label>
                      <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="e.g. Skyline Heights"
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">
                        Project Type
                      </label>
                      <select
                        value={projectType}
                        onChange={handleProjectTypeChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none bg-white"
                      >
                        <option value="">Select a category</option>
                        <option value={PROJECT_TYPES.PLOTTING}>Plotting</option>
                        <option value={PROJECT_TYPES.DUPLEX}>Duplex</option>
                        <option value={PROJECT_TYPES.TRIPLEX}>Triplex</option>
                        <option value={PROJECT_TYPES.APARTMENT}>
                          Apartment
                        </option>
                        <option value={PROJECT_TYPES.COMMERCIAL}>
                          Commercial
                        </option>
                        <option value={PROJECT_TYPES.CUSTOM}>
                          Custom / Multiple
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                renderProjectForm()
              )}
            </div>
          </div>
        )}

        {showPlotEditingOverview && renderPlotEditingOverview()}
        {/* {editingOverview.open && renderEditingOverview()} */}
        {showUnitEditingOverview && renderUnitEditingOverview()}
        {showApartmentOverview && renderApartmentEditingOverview()}
        {showCommercialEditingOverview && renderCommercialEditingOverview()}

      </div>
    </div>
  );
};

export default PABC;
