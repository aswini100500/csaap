// only for plotting comeercial projects view - deprecated
// import React from "react";
// import {
//   FaTimes,
//   FaBuilding,
//   FaRulerCombined,
//   FaClipboardList,
//   FaMoneyBill,
//   FaCheckCircle,
//   FaList,
// } from "react-icons/fa";

// const ProjectViewForm = ({ project = {}, onClose }) => {
//   // helpers: tolerate different naming conventions from CommercialProject / PlottingProject
//   const pf =
//     project.propertyFeatures ||
//     project.property_features ||
//     project.property_feature ||
//     {};

//   const price =
//     project.priceDetails ||
//     project.price_details ||
//     project.unit_price_details ||
//     {};

//   const transaction =
//     project.transactionDetails ||
//     project.transaction_details ||
//     project.transaction_type ||
//     {};

//   const approval =
//     project.approvalStatus ||
//     project.approval_status ||
//     project.approvals ||
//     [];

//   // revenue plots array (handles plotsData / revenue_plots_data / revenuePlots)
//   const revenuePlots =
//     project.plotsData ||
//     project.revenue_plots_data ||
//     (project.revenuePlots && project.revenuePlots.plotsData) ||
//     project.revenue_plots ||
//     [];

//   // "plots" and "units" (plotting vs commercial)
//   const plots = project.plots || [];
//   const units = project.units || [];

//   // commercial features / common facilities
//   const commercialFeatures =
//     project.commercialFeatures ||
//     project.common_facilities ||
//     project.facilities ||
//     [];

//   // additional info fields
//   const additional = {
//     kissama: project.kissama || project.kissama_details || "",
//     boundary: project.boundary || project.boundary_type || "",
//     broker: project.broker || project.broker_id || "",
//     purchaser: project.purchaser || "",
//     constructor: project.constructor || "",
//     staffEngaged: project.staffEngaged || project.staff_engaged || "",
//     loanProvider: project.loanProvider || project.loan_provider || "",
//     attachment: project.attachment || project.attachmentName || project.attachment?.name || "",
//   };

//   const formatMoney = (v) => {
//     if (v === undefined || v === null || v === "") return "N/A";
//     const n = Number(String(v).replace(/[^0-9.-]+/g, ""));
//     if (Number.isNaN(n)) return v;
//     return `₹${n.toLocaleString("en-IN")}`;
//   };

//   const safeNumber = (v) => {
//     const n = Number(v);
//     return Number.isFinite(n) ? n : 0;
//   };

//   const totalRevenueArea = revenuePlots.reduce(
//     (s, p) => s + safeNumber(p.area || p.plot_area || p.plotArea),
//     0
//   );

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto p-4">
//       <div className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
//         <div className="p-6 border-b">
//           <div className="flex justify-between items-start gap-4">
//             <div>
//               <h2 className="text-2xl font-bold">{project.name || "Project"}</h2>
//               <p className="text-sm text-gray-600">
//                 {project.type ? `${project.type}` : "Type unknown"}{" "}
//                 {project.commercial_sub_type || project.commercialSubType
//                   ? `(${project.commercial_sub_type || project.commercialSubType})`
//                   : ""}
//               </p>
//             </div>

//             <button
//               onClick={onClose}
//               className="text-gray-600 hover:text-gray-800 p-2 rounded"
//               title="Close"
//             >
//               <FaTimes />
//             </button>
//           </div>

//           {/* BASIC INFO */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//             <Info label="Location" value={`${project.city || "N/A"}${project.locality ? `, ${project.locality}` : ""}`} />
//             <Info label="Land Zone" value={project.landZone || project.land_zone || "N/A"} />
//             <Info label="Created" value={project.createdAt || project.created_at || "N/A"} />
//             <Info label="Updated" value={project.updatedAt || project.updated_at || "N/A"} />
//             <Info label="Total Land Area" value={project.total_land_area || project.landArea || project.land_area || "N/A"} />
//             <Info label="Revenue Plots Count" value={project.revenue_plots || project.revenuePlots || (revenuePlots.length || 0)} />
//           </div>

//           {/* PROPERTY FEATURES */}
//           <Section title="Property Features" icon={<FaBuilding className="text-indigo-600 mr-2" />}>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <KeyValue label="Property Status" value={pf.propertyStatus || pf.property_status || pf.status || "N/A"} />
//               <KeyValue label="Land Area (sqft)" value={pf.landArea || pf.land_area || pf.land_area_sqft || "N/A"} />
//               <KeyValue label="No. of Open Sides" value={pf.openSides || pf.open_sides || "N/A"} />
//               <KeyValue label="Road Width (m)" value={pf.roadWidth || pf.road_width || "N/A"} />
//               <KeyValue label="Boundary Wall Made" value={pf.boundaryWall || pf.boundary_wall || "N/A"} />
//               <KeyValue label="Gated Colony" value={pf.gatedColony || pf.gated_colony || "N/A"} />
//               <KeyValue label="Possession Status" value={pf.possessionStatus || pf.possession_status || "N/A"} />
//               <KeyValue label="Available From" value={(pf.availableFromMonth || pf.available_from_month || pf.availableFrom?.month || "") + (pf.availableFromYear || pf.available_from_year || pf.availableFrom?.year ? ` ${pf.availableFromYear || pf.available_from_year || pf.availableFrom?.year}` : "") || "N/A"} />
//               <KeyValue label="Outhouse" value={pf.hasOuthouse || pf.has_outhouse || "N/A"} />
//               {pf.hasOuthouse === "Yes" || pf.has_outhouse === "Yes" ? (
//                 <KeyValue label="Outhouse Area" value={pf.outhouseArea || pf.outhouse_area || "N/A"} />
//               ) : null}
//             </div>

//             {/* Facilities list */}
//             <div className="mt-4">
//               <h4 className="font-semibold text-sm text-gray-700 mb-2">Facilities</h4>
//               <div className="flex flex-wrap gap-2">
//                 {Array.isArray(commercialFeatures) && commercialFeatures.length > 0 ? (
//                   commercialFeatures.map((f, i) => (
//                     <span key={i} className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-800">
//                       {typeof f === "string" ? f : f.name || f.label || JSON.stringify(f)}
//                     </span>
//                   ))
//                 ) : (
//                   <span className="text-sm text-gray-500">No facilities listed</span>
//                 )}
//               </div>
//             </div>
//           </Section>

//           {/* REVENUE PLOTS CONFIGURATION */}
//           <Section title={`Revenue Plots Configuration (${revenuePlots.length})`} icon={<FaRulerCombined className="text-indigo-600 mr-2" />}>
//             {revenuePlots.length === 0 ? (
//               <p className="text-sm text-gray-500">No revenue plots data available.</p>
//             ) : (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {revenuePlots.map((rp, i) => (
//                     <div key={i} className="p-3 border rounded bg-gray-50">
//                       <h5 className="font-semibold">Plot {i + 1}</h5>
//                       <p className="text-sm">Area: {rp.area || rp.plot_area || rp.plotArea || "N/A"} sq-ft</p>
//                       <p className="text-sm">Entry Plot No: {rp.entryPlotNo || rp.entry_plot_no || "N/A"}</p>
//                       <p className="text-sm">Khata No: {rp.khataNo || rp.khata_no || "N/A"}</p>
//                       <p className="text-sm">Document: {rp.fileName || rp.file_name || rp.plot_document || "N/A"}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded">
//                   <p className="text-sm text-blue-800">
//                     <strong>Total Revenue Area:</strong> {totalRevenueArea.toLocaleString()} sq-ft
//                   </p>
//                 </div>
//               </>
//             )}
//           </Section>

//           {/* ADDITIONAL INFORMATION */}
//           <Section title="Additional Information" icon={<FaClipboardList className="text-indigo-600 mr-2" />}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <KeyValue label="Kissama" value={additional.kissama || "N/A"} />
//               <KeyValue label="Boundary Type" value={additional.boundary || "N/A"} />
//               <KeyValue label="Broker" value={additional.broker || "N/A"} />
//               <KeyValue label="Reference" value={project.reference || project.ref || "N/A"} />
//               <KeyValue label="Purchaser" value={additional.purchaser || "N/A"} />
//               <KeyValue label="Constructor" value={additional.constructor || "N/A"} />
//               <KeyValue label="Staff Engaged" value={additional.staffEngaged || "N/A"} />
//               <KeyValue label="Loan Provider" value={additional.loanProvider || "N/A"} />
//               <KeyValue label="Attachment" value={additional.attachment || "N/A"} />
//             </div>
//           </Section>

//           {/* APPROVAL STATUS */}
//           <Section title={`Approval Status (${approval.length})`} icon={<FaCheckCircle className="text-indigo-600 mr-2" />}>
//             {approval.length === 0 ? (
//               <p className="text-sm text-gray-500">No approval status items.</p>
//             ) : (
//               <div className="space-y-2">
//                 {approval.map((a, i) => (
//                   <div key={i} className="p-3 border rounded bg-white">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="font-semibold">{a.authority || a.approval_authority || a.name || `Authority ${i + 1}`}</p>
//                         <p className="text-sm text-gray-600">Status: {a.status || a.approval_status || "N/A"}</p>
//                       </div>
//                       <div className="text-sm text-gray-500">{a.date || a.updated_at || ""}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </Section>

//           {/* TRANSACTION DETAILS */}
//           <Section title="Transaction Details" icon={<FaList className="text-indigo-600 mr-2" />}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <KeyValue label="Possession Status" value={transaction.possession_status || transaction.possessionStatus || transaction.possession || "N/A"} />
//               <KeyValue label="Available From (month/year)" value={(transaction.availableFrom?.month || transaction.available_from?.month || transaction.available_from_month || transaction.availableFromMonth || "") + (transaction.availableFrom?.year || transaction.available_from?.year || transaction.available_from_year || transaction.availableFromYear ? ` ${transaction.availableFrom?.year || transaction.available_from?.year || transaction.available_from_year || transaction.availableFromYear}` : "") || "N/A"} />
//               <KeyValue label="Transaction Type" value={transaction.type || transaction.transaction_type || "N/A"} />
//               <KeyValue label="Price Negotiable" value={String(price.price_negotiable || price.priceNegotiable || project.price_negotiable || "N/A")} />
//             </div>
//           </Section>

//           {/* PRICE DETAILS */}
//           <Section title="Price Details" icon={<FaMoneyBill className="text-indigo-600 mr-2" />}>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <KeyValue label="Expected Price" value={formatMoney(price.expected_price || price.expectedPrice || price.expected || project.expected_price || project.price)} />
//               <KeyValue label="Token / Booking Amount" value={formatMoney(price.token_amount || price.tokenAmount || price.token || project.token_amount)} />
//               <KeyValue label="Other Price Notes" value={price.notes || price.note || project.price_notes || "N/A"} />
//             </div>
//           </Section>

//           {/* COMMERCIAL FEATURES (if commercial type) */}
//           {project.type && project.type.toLowerCase().includes("commercial") && (
//             <Section title="Commercial Features" icon={<FaBuilding className="text-indigo-600 mr-2" />}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <KeyValue label="Commercial Sub Type" value={project.commercialSubType || project.commercial_sub_type || "N/A"} />
//                 <KeyValue label="Units Count" value={(units && units.length) || project.units_count || "N/A"} />
//                 <KeyValue label="Parking" value={pf.parking || pf.hasParking || "N/A"} />
//                 <KeyValue label="Lift" value={pf.lift || pf.hasLift || "N/A"} />
//                 <KeyValue label="Power Backup" value={pf.powerBackup || pf.hasPowerBackup || "N/A"} />
//                 <KeyValue label="Security" value={pf.security || project.security || "N/A"} />
//               </div>
//             </Section>
//           )}

//           {/* PLOTS (Plotting) */}
//           {plots.length > 0 && (
//             <Section title={`Plots (${plots.length})`} icon={<FaRulerCombined className="text-indigo-600 mr-2" />}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {plots.map((p, i) => (
//                   <div key={p.id || i} className="p-3 border rounded bg-gray-50">
//                     <h5 className="font-semibold">{p.name || `Plot ${i + 1}`}</h5>
//                     <p className="text-sm">Area (sq-yd): {p.areaDetails?.plotArea || p.areaDetails?.plot_area || p.area || p.plotArea || "N/A"}</p>
//                     <p className="text-sm">Price: {formatMoney(p.priceDetails?.expectedPrice || p.priceDetails?.expected_price)}</p>
//                     <p className="text-sm">Purchaser: {p.purchaser || "N/A"}</p>
//                     <p className="text-sm">Constructor: {p.constructor || "N/A"}</p>
//                     <p className="text-sm">Complete: {p.isComplete ? "Yes" : "No"}</p>
//                   </div>
//                 ))}
//               </div>
//             </Section>
//           )}

//           {/* UNITS (Commercial) */}
//           {units.length > 0 && (
//             <Section title={`Units (${units.length})`} icon={<FaBuilding className="text-indigo-600 mr-2" />}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {units.map((u, i) => (
//                   <div key={u.id || i} className="p-3 border rounded bg-gray-50">
//                     <h5 className="font-semibold">{u.name || `Unit ${i + 1}`}</h5>
//                     <p className="text-sm">Room Type: {u.roomType || u.room_type || "N/A"}</p>
//                     <p className="text-sm">Floor: {u.floor || "N/A"}</p>
//                     <p className="text-sm">Area (sq-ft): {u.areaDetails?.carpetArea || u.areaDetails?.carpet_area || "N/A"}</p>
//                     <p className="text-sm">Price: {formatMoney(u.priceDetails?.expectedPrice || u.priceDetails?.expected_price)}</p>
//                     <p className="text-sm">Complete: {u.isComplete ? "Yes" : "No"}</p>
//                   </div>
//                 ))}
//               </div>
//             </Section>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// /* small presentational helpers */
// const Info = ({ label, value }) => (
//   <div>
//     <label className="block text-xs text-gray-500">{label}</label>
//     <div className="text-sm font-medium text-gray-800">{value || "N/A"}</div>
//   </div>
// );

// const Section = ({ title, icon, children }) => (
//   <div className="mt-6">
//     <div className="flex items-center mb-3">
//       {icon}
//       <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
//     </div>
//     <div>{children}</div>
//   </div>
// );

// const KeyValue = ({ label, value }) => (
//   <div>
//     <div className="text-xs text-gray-500">{label}</div>
//     <div className="text-sm text-gray-800">{value || "N/A"}</div>
//   </div>
// );

// export default ProjectViewForm;

// ProjectViewForm.jsx
// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import {
//   FaTimes,
//   FaBuilding,
//   FaRulerCombined,
//   FaClipboardList,
//   FaMoneyBill,
//   FaCheckCircle,
//   FaList,
//   FaSpinner,
//   FaPlus,
// } from "react-icons/fa";

// const ProjectViewForm = ({ project = {}, onClose }) => {
//   const [floorDetails, setFloorDetails] = useState({});
//   const [loadingFloors, setLoadingFloors] = useState({});
//   const [editingFloor, setEditingFloor] = useState(null);
//   const [creatingFloor, setCreatingFloor] = useState(null);

//   // Render-time debug
//   console.log("ProjectViewForm render - project id:", project?.id);

//   // --- Normalized helpers to tolerate different API shapes ---de
//   const get = (obj, ...keys) => {
//     for (const k of keys) {
//       if (obj && obj[k] !== undefined) return obj[k];
//     }
//     return undefined;
//   };

//   const pf =
//     get(project, "propertyFeatures") ||
//     get(project, "property_features") ||
//     get(project, "property_feature") ||
//     get(project, "pf") ||
//     {};

//   const price =
//     get(project, "priceDetails") ||
//     get(project, "price_details") ||
//     get(project, "unit_price_details") ||
//     get(project, "price") ||
//     {};

//   const transaction =
//     get(project, "transactionDetails") ||
//     get(project, "transaction_details") ||
//     get(project, "transaction_type") ||
//     get(project, "transaction") ||
//     {};

//   const approval =
//     get(project, "approvalStatus") ||
//     get(project, "approval_status") ||
//     get(project, "approvals") ||
//     [];

//   const revenuePlots =
//     get(project, "plotsData") ||
//     get(project, "revenue_plots_data") ||
//     get(project, "plots_data") ||
//     get(project, "plots") ||
//     get(project, "revenue_plots") ||
//     [];

//   const plots = get(project, "plots") || [];
//   const units =
//     get(project, "units") || get(project, "unit_configuration") || [];

//   const commercialFeatures =
//     get(project, "commercialFeatures") ||
//     get(project, "common_facilities") ||
//     get(project, "facilities") ||
//     [];

//   const additional = {
//     kissama: get(project, "kissama") || get(project, "kissama_details") || "",
//     boundary: get(project, "boundary") || get(project, "boundary_type") || "",
//     broker: get(project, "broker") || get(project, "broker_id") || "",
//     purchaser: get(project, "purchaser") || "",
//     constructor: get(project, "constructor") || "",
//     staffEngaged:
//       get(project, "staffEngaged") || get(project, "staff_engaged") || "",
//     loanProvider:
//       get(project, "loanProvider") || get(project, "loan_provider") || "",
//     attachment:
//       (get(project, "attachment") &&
//         (typeof get(project, "attachment") === "string"
//           ? get(project, "attachment")
//           : get(project, "attachment").name ||
//             JSON.stringify(get(project, "attachment")))) ||
//       "",
//   };

//   const safeNumber = (v) => {
//     const n = Number(String(v).replace(/[^0-9.-]+/g, ""));
//     return Number.isFinite(n) ? n : 0;
//   };

//   const totalRevenueArea = (
//     Array.isArray(revenuePlots) ? revenuePlots : []
//   ).reduce(
//     (s, p) => s + safeNumber(get(p, "area", "plot_area", "plotArea")),
//     0
//   );

//   const formatMoney = (v) => {
//     if (v === undefined || v === null || v === "") return "N/A";
//     const n = Number(String(v).replace(/[^0-9.-]+/g, ""));
//     if (Number.isNaN(n)) return v;
//     return `₹${n.toLocaleString("en-IN")}`;
//   };

//   // -------------------------------
//   // Updated fetchFloorDetails (Axios) with verbose logging
//   // -------------------------------
//   const fetchFloorDetails = async (projectIdParam, unitIdParam, floorKeyParam) => {
//     const cacheKey = `${projectIdParam}-${unitIdParam}-${floorKeyParam}`;

//     console.log("[fetchFloorDetails] called with:", {
//       projectIdParam,
//       unitIdParam,
//       floorKeyParam,
//       cacheKey,
//     });

//     // Skip if already loading
//     if (loadingFloors[cacheKey]) {
//       console.log(`[fetchFloorDetails] skipping because loadingFloors[${cacheKey}] is true`);
//       return;
//     }

//     // Skip if cached (truthy) — if you want retries for null values change this condition
//     if (floorDetails[cacheKey]) {
//       console.log(`[fetchFloorDetails] skipping because floorDetails[${cacheKey}] is cached`);
//       return;
//     }

//     setLoadingFloors((prev) => ({ ...prev, [cacheKey]: true }));

//     try {
//       console.log(`[fetchFloorDetails] starting axios request for ${cacheKey}`);

//       const response = await axios.request({
//         method: "get",
//         url: `https://api.csaap.com/api/tenantuser/projects/${projectIdParam}/units/${unitIdParam}/floor-details/${floorKeyParam}`,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         params: {
//           subdomain: "cloudflare",
//         },
//         // allow us to inspect non-2xx responses in the "then" path
//         validateStatus: () => true,
//         timeout: 20000,
//       });
//       // console.log(response);

//       console.log(`[fetchFloorDetails] axios response for ${cacheKey}:`, {
//         status: response.status,
//         statusText: response.statusText,
//         headers: response.headers,
//         data: response.data,
//       });

//       if (response.status >= 200 && response.status < 300) {
//         setFloorDetails((prev) => ({
//           ...prev,
//           [cacheKey]: response.data,
//         }));
//       } else {
//         // Put the non-2xx payload in state so you can inspect it in UI if needed
//         console.warn(
//           `[fetchFloorDetails] Non-2xx response for ${cacheKey}: ${response.status}`
//         );
//         setFloorDetails((prev) => ({
//           ...prev,
//           [cacheKey]: response.data ?? null,
//         }));
//       }
//     } catch (error) {
//       console.error(`[fetchFloorDetails] network/error for ${cacheKey}:`, error);
//       setFloorDetails((prev) => ({
//         ...prev,
//         [cacheKey]: null,
//       }));
//     } finally {
//       setLoadingFloors((prev) => ({ ...prev, [cacheKey]: false }));
//     }
//   };

//   // -------------------------------
//   // Prefetch effect with debug logs
//   // -------------------------------
// //   useEffect(() => {
// //     console.log("[useEffect] units or project.id changed:", {
// //       units,
// //       projectId: project?.id,
// //     });
// // console.log(units);

// //     if (!project || !project.id) {
// //       console.log("[useEffect] no project.id — skipping prefetch");
// //       return;
// //     }

// //     if (!Array.isArray(units) || units.length === 0) {
// //       console.log("[useEffect] no units to prefetch");
// //       return;
// //     }

// //     units.forEach((unit, unitIndex) => {
// //       const uId = unit.id || unit.apiId || unitIndex;
// //       const projectIdVal = project.id;

// //       // Define which floors to check for this unit
// //       const floorsToCheck = [
// //         { key: "groundFloor", title: "Ground Floor" },
// //         { key: "firstFloor", title: "1st Floor" },
// //         { key: "secondFloor", title: "2nd Floor" },
// //       ];

// //       // Normalized floors object
// //       const floors = get(unit, "floors") || (unit.floorDetails ? unit.floorDetails : {});
// //       console.log(`[useEffect] unit ${uId} floors object:`, floors);

// //       floorsToCheck.forEach(({ key }) => {
// //         const floorData = get(floors, key) || get(unit, key);

// //         console.log(`[useEffect] checking unit ${uId} floorKey ${key}:`, floorData);

// //         // If there is floor data locally, attempt prefetch (same logic you had)
// //         if (floorData && (floorData.id || Object.keys(floorData).length > 0)) {
// //           console.log(`[useEffect] invoking fetchFloorDetails for ${projectIdVal}-${uId}-${key}`);
// //           fetchFloorDetails(projectIdVal, uId, key);
// //         } else {
// //           console.log(`[useEffect] skipping fetch for ${projectIdVal}-${uId}-${key} — no local floor data detected`);
// //         }
// //       });
// //     });
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [units, project.id]);
// // -------------------------------
// // Prefetch effect with debug logs
// // -------------------------------
// useEffect(() => {
//   console.log("[useEffect] units or project.id changed:", {
//     units,
//     projectId: project?.id,
//   });
//   console.log("Units data:", units);

//   if (!project || !project.id) {
//     console.log("[useEffect] no project.id — skipping prefetch");
//     return;
//   }

//   if (!Array.isArray(units) || units.length === 0) {
//     console.log("[useEffect] no units to prefetch");
//     return;
//   }

//   units.forEach((unit, unitIndex) => {
//     const uId = unit.id || unit.apiId || unitIndex;
//     const projectIdVal = project.id;

//     console.log(`[useEffect] Processing unit ${uId}:`, unit);

//     // Get floor_details array from the unit
//     const floorDetailsArray = unit.floor_details || [];
//     console.log(`[useEffect] unit ${uId} floor_details array:`, floorDetailsArray);

//     // If we have floor_details array, fetch details for each floor
//     if (floorDetailsArray.length > 0) {
//       floorDetailsArray.forEach((floorDetail) => {
//         const floorKey = floorDetail.floor_key; // groundFloor, firstFloor, etc.
//         if (floorKey) {
//           console.log(`[useEffect] invoking fetchFloorDetails for ${projectIdVal}-${uId}-${floorKey} from floor_details array`);
//           fetchFloorDetails(projectIdVal, uId, floorKey);
//         }
//       });
//     } else {
//       console.log(`[useEffect] No floor_details array found for unit ${uId}, trying legacy approach`);

//       // Fallback to your original approach for backward compatibility
//       const floorsToCheck = [
//         { key: "groundFloor", title: "Ground Floor" },
//         { key: "firstFloor", title: "1st Floor" },
//         { key: "secondFloor", title: "2nd Floor" },
//       ];

//       // Normalized floors object from legacy data
//       const floors = get(unit, "floors") || (unit.floorDetails ? unit.floorDetails : {});
//       console.log(`[useEffect] unit ${uId} legacy floors object:`, floors);

//       floorsToCheck.forEach(({ key }) => {
//         const floorData = get(floors, key) || get(unit, key);

//         console.log(`[useEffect] checking unit ${uId} floorKey ${key}:`, floorData);

//         // If there is floor data locally, attempt prefetch
//         if (floorData && (floorData.id || Object.keys(floorData).length > 0)) {
//           console.log(`[useEffect] invoking fetchFloorDetails for ${projectIdVal}-${uId}-${key} from legacy data`);
//           fetchFloorDetails(projectIdVal, uId, key);
//         } else {
//           console.log(`[useEffect] skipping fetch for ${projectIdVal}-${uId}-${key} — no local floor data detected`);
//         }
//       });
//     }
//   });
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [units, project.id]);

//   // Floor renderer for a single unit's floor object with API data
// const FloorBlock = ({ title, floor = {}, projectId, unitId, floorKey, unitData = null }) => {
//   const cacheKey = `${projectId}-${unitId}-${floorKey}`;
//   const apiFloorData = floorDetails[cacheKey];
//   const isLoading = loadingFloors[cacheKey];
//   const isEditing = editingFloor === cacheKey;
//   const isCreating = creatingFloor === cacheKey;

//   // Get floor data from unit.floor_details array if available
//   const unitFloorDetails = unitData?.floor_details || [];
//   const floorFromUnitDetails = unitFloorDetails.find(f => f.floor_key === floorKey);

//   // Use the most specific data available (API fetch > unit.floor_details > basic floor data)
//   const finalFloorData = apiFloorData || floorFromUnitDetails || floor;

//   console.log(`[FloorBlock] ${title} data:`, {
//     floorKey,
//     apiFloorData,
//     floorFromUnitDetails,
//     basicFloor: floor,
//     finalFloorData
//   });

//   // Rest of your FloorBlock component remains the same...
//   if (!finalFloorData || Object.keys(finalFloorData).length === 0) {
//     return (
//       <div className="p-3 border rounded bg-gray-50">
//         <div className="flex justify-between items-start mb-2">
//           <h5 className="font-semibold">{title}</h5>
//           <button
//             onClick={() => setCreatingFloor(cacheKey)}
//             className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded hover:bg-green-200 flex items-center gap-1"
//           >
//             <FaPlus /> Add Details
//           </button>
//         </div>
//         <p className="text-sm text-gray-500">No floor data.</p>
//       </div>
//     );
//   }

//     // Use API data if available, otherwise fall back to basic floor data
//     const floorData = apiFloorData || floor;

//     // Extract data with tolerant keys
//     const bedrooms = get(floorData, "total_bedrooms", "totalBedrooms", "bedrooms", "bedroom_count");
//     const bathrooms = get(floorData, "total_bathrooms", "totalBathrooms", "bathrooms", "toilets");
//     const area = get(floorData, "living_area", "bedroom_area", "area", "floorArea", "totalArea", "carpetArea");
//     const studyRoom = get(floorData, "study_room", "studyRoom");
//     const studyRoomArea = get(floorData, "study_room_area", "studyRoomArea");
//     const balcony = get(floorData, "balcony");
//     const balconyArea = get(floorData, "balcony_area", "balconyArea");
//     const kitchen = get(floorData, "kitchen");
//     const garage = get(floorData, "garage");
//     const diningArea = get(floorData, "dining_area", "diningArea");
//     const additionalNotes = get(floorData, "additional_notes", "additionalNotes");

//     return (
//       <div className="p-3 border rounded bg-gray-50">
//         <div className="flex justify-between items-start mb-2">
//           <h5 className="font-semibold">{title}</h5>
//           {isLoading && <FaSpinner className="animate-spin text-blue-500" />}
//           {apiFloorData && <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">API Data</span>}
//         </div>

//         <div className="text-sm text-gray-800 space-y-1">
//           <div><strong>Area:</strong> {area || "N/A"} sq-ft</div>
//           <div><strong>Bedrooms:</strong> {bedrooms ?? "N/A"}</div>
//           <div><strong>Bathrooms:</strong> {bathrooms ?? "N/A"}</div>

//           {/* Enhanced details from API */}
//           {studyRoom && <div><strong>Study Rooms:</strong> {studyRoom}</div>}
//           {studyRoomArea && <div><strong>Study Room Area:</strong> {studyRoomArea} sq-ft</div>}
//           {balcony && <div><strong>Balconies:</strong> {balcony}</div>}
//           {balconyArea && <div><strong>Balcony Area:</strong> {balconyArea} sq-ft</div>}
//           {kitchen && <div><strong>Kitchen:</strong> {kitchen}</div>}
//           {garage && <div><strong>Garage:</strong> {garage}</div>}
//           {diningArea && <div><strong>Dining Area:</strong> {diningArea} sq-ft</div>}
//           {additionalNotes && (
//             <div className="mt-2">
//               <strong>Notes:</strong>
//               <p className="text-xs text-gray-600 mt-1">{additionalNotes}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 overflow-y-auto p-4">
//       <div className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
//         <div className="p-6 border-b">
//           <div className="flex justify-between items-start gap-4">
//             <div>
//               <h2 className="text-2xl font-bold">
//                 {project.name || "Project"}
//               </h2>
//               <p className="text-sm text-gray-600">
//                 {project.type ||
//                   project.project_type ||
//                   project.custom_type ||
//                   "Type unknown"}
//                 {project.commercial_sub_type || project.commercialSubType
//                   ? ` (${
//                       project.commercial_sub_type || project.commercialSubType
//                     })`
//                   : ""}
//               </p>
//             </div>

//             <div className="flex items-center gap-2">
//               {/* DEBUG BUTTON - remove when done
//               <button
//                 onClick={() => {
//                   if (!project?.id) {
//                     console.warn("No project.id, cannot force fetch");
//                     return;
//                   }
//                   const u = units && units.length > 0 ? units[0] : null;
//                   const unitIdForTest = u ? (u.id || u.apiId || 0) : 0;
//                   console.log("Manual debug fetch trigger:", { projectId: project.id, unitIdForTest });
//                   fetchFloorDetails(project.id, unitIdForTest, "groundFloor");
//                 }}
//                 className="px-3 py-1 border rounded text-sm mr-2"
//                 title="Manual debug fetch first unit groundFloor"
//               >
//                 Debug: fetch first unit groundFloor
//               </button> */}

//               <button
//                 onClick={onClose}
//                 className="text-gray-600 hover:text-gray-800 p-2 rounded"
//                 title="Close"
//               >
//                 <FaTimes />
//               </button>
//             </div>
//           </div>

//           {/* Basic info */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//             <Info
//               label="Location"
//               value={`${project.city || "N/A"}${project.locality ? `, ${project.locality}` : ""}`}
//             />
//             <Info
//               label="Land Zone"
//               value={project.landZone || project.land_zone || "N/A"}
//             />
//             <Info
//               label="Created"
//               value={project.createdAt || project.created_at || "N/A"}
//             />
//             <Info
//               label="Updated"
//               value={project.updatedAt || project.updated_at || "N/A"}
//             />
//             <Info
//               label="Total Land Area"
//               value={
//                 project.total_land_area ||
//                 project.landArea ||
//                 project.land_area ||
//                 "N/A"
//               }
//             />
//             <Info
//               label="Revenue Plots Count"
//               value={
//                 project.revenue_plots ||
//                 project.revenuePlots ||
//                 (Array.isArray(revenuePlots) ? revenuePlots.length : 0)
//               }
//             />
//           </div>

//           {/* PROPERTY FEATURES */}
//           <Section
//             title="Property Features"
//             icon={<FaBuilding className="text-indigo-600 mr-2" />}
//           >
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <KeyValue
//                 label="Property Status"
//                 value={pf.propertyFeatures || "N/A"}
//               />
//               <KeyValue
//                 label="Land Area (sqft)"
//                 value={
//                   get(pf, "landArea", "land_area", "land_area_sqft") ||
//                   project.landArea ||
//                   "N/A"
//                 }
//               />
//               <KeyValue
//                 label="No. of Open Sides"
//                 value={get(pf, "openSides", "open_sides") || "N/A"}
//               />
//               <KeyValue
//                 label="Road Width (m)"
//                 value={get(pf, "roadWidth", "road_width") || "N/A"}
//               />
//               <KeyValue
//                 label="Boundary Wall Made"
//                 value={get(pf, "boundaryWall", "boundary_wall") || "N/A"}
//               />
//               <KeyValue
//                 label="Gated Colony"
//                 value={get(pf, "gatedColony", "gated_colony") || "N/A"}
//               />
//               <KeyValue
//                 label="Possession Status"
//                 value={
//                   get(pf, "possessionStatus", "possession_status") || "N/A"
//                 }
//               />
//               <KeyValue
//                 label="Available From"
//                 value={
//                   (get(pf, "availableFromMonth") ||
//                     get(pf, "available_from_month") ||
//                     (get(pf, "availableFrom") &&
//                       get(pf, "availableFrom").month) ||
//                     "") +
//                     (get(pf, "availableFromYear") ||
//                     get(pf, "available_from_year") ||
//                     (get(pf, "availableFrom") && get(pf, "availableFrom").year)
//                       ? ` ${
//                           get(pf, "availableFromYear") ||
//                           get(pf, "available_from_year") ||
//                           (get(pf, "availableFrom") &&
//                             get(pf, "availableFrom").year)
//                         }`
//                       : "") || "N/A"
//                 }
//               />
//               <KeyValue
//                 label="Outhouse"
//                 value={get(pf, "hasOuthouse", "has_outhouse") || "N/A"}
//               />
//               {(get(pf, "hasOuthouse") === "Yes" ||
//                 get(pf, "has_outhouse") === "Yes") && (
//                 <KeyValue
//                   label="Outhouse Area"
//                   value={get(pf, "outhouseArea", "outhouse_area") || "N/A"}
//                 />
//               )}
//             </div>

//             <div className="mt-4">
//               <h4 className="font-semibold text-sm text-gray-700 mb-2">
//                 Facilities
//               </h4>
//               <div className="flex flex-wrap gap-2">
//                 {Array.isArray(commercialFeatures) &&
//                 commercialFeatures.length > 0 ? (
//                   commercialFeatures.map((f, i) => (
//                     <span
//                       key={i}
//                       className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-800"
//                     >
//                       {typeof f === "string"
//                         ? f
//                         : f.name || f.label || JSON.stringify(f)}
//                     </span>
//                   ))
//                 ) : (
//                   <span className="text-sm text-gray-500">
//                     No facilities listed
//                   </span>
//                 )}
//               </div>
//             </div>
//           </Section>

//           {/* REVENUE PLOTS */}
//           <Section
//             title={`Revenue Plots Configuration (${Array.isArray(revenuePlots) ? revenuePlots.length : 0})`}
//             icon={<FaRulerCombined className="text-indigo-600 mr-2" />}
//           >
//             {!revenuePlots || revenuePlots.length === 0 ? (
//               <p className="text-sm text-gray-500">No revenue plots data available.</p>
//             ) : (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {revenuePlots.map((rp, i) => (
//                     <div key={i} className="p-3 border rounded bg-gray-50">
//                       <h5 className="font-semibold">Plot {i + 1}</h5>
//                       <p className="text-sm">
//                         Area: {get(rp, "area", "plot_area", "plotArea") || "N/A"} sq-ft
//                       </p>
//                       <p className="text-sm">Entry Plot No: {get(rp, "entryPlotNo", "entry_plot_no") || "N/A"}</p>
//                       <p className="text-sm">Khata No: {get(rp, "khataNo", "khata_no") || "N/A"}</p>
//                       <p className="text-sm">Document: {get(rp, "fileName", "file_name", "plot_document") || "N/A"}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded">
//                   <p className="text-sm text-blue-800">
//                     <strong>Total Revenue Area:</strong> {totalRevenueArea.toLocaleString()} sq-ft
//                   </p>
//                 </div>
//               </>
//             )}
//           </Section>

//           {/* ADDITIONAL INFO */}
//           <Section
//             title="Additional Information"
//             icon={<FaClipboardList className="text-indigo-600 mr-2" />}
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <KeyValue label="Kissama" value={additional.kissama || "N/A"} />
//               <KeyValue label="Boundary Type" value={additional.boundary || "N/A"} />
//               <KeyValue label="Broker" value={additional.broker || "N/A"} />
//               <KeyValue label="Reference" value={project.reference || project.ref || "N/A"} />
//               <KeyValue label="Purchaser" value={additional.purchaser || "N/A"} />
//               <KeyValue label="Constructor" value={additional.constructor || "N/A"} />
//               <KeyValue label="Staff Engaged" value={additional.staffEngaged || "N/A"} />
//               <KeyValue label="Loan Provider" value={additional.loanProvider || "N/A"} />
//               <KeyValue label="Attachment" value={additional.attachment || "N/A"} />
//             </div>
//           </Section>

//           {/* APPROVALS */}
//           <Section
//             title={`Approval Status (${approval.length})`}
//             icon={<FaCheckCircle className="text-indigo-600 mr-2" />}
//           >
//             {approval.length === 0 ? (
//               <p className="text-sm text-gray-500">No approval status items.</p>
//             ) : (
//               <div className="space-y-2">
//                 {approval.map((a, i) => (
//                   <div key={i} className="p-3 border rounded bg-white">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="font-semibold">
//                           {get(a, "authority", "approval_authority", "name") || `Authority ${i + 1}`}
//                         </p>
//                         <p className="text-sm text-gray-600">Status: {get(a, "status", "approval_status") || "N/A"}</p>
//                       </div>
//                       <div className="text-sm text-gray-500">{get(a, "date") || get(a, "updated_at") || ""}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </Section>

//           {/* TRANSACTION */}
//           <Section
//             title="Transaction Details"
//             icon={<FaList className="text-indigo-600 mr-2" />}
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <KeyValue
//                 label="Possession Status"
//                 value={get(transaction, "possession_status", "possessionStatus", "possession") || "N/A"}
//               />
//               <KeyValue
//                 label="Available From (month/year)"
//                 value={
//                   (
//                     (get(transaction, "availableFrom") &&
//                       `${get(transaction, "availableFrom").month || ""} ${get(transaction, "availableFrom").year || ""}`) ||
//                     `${get(transaction, "available_from_month") || get(transaction, "availableFromMonth") || ""} ${get(transaction, "available_from_year") || get(transaction, "availableFromYear") || ""}`
//                   ).trim() || "N/A"
//                 }
//               />
//               <KeyValue label="Transaction Type" value={get(transaction, "type", "transaction_type") || "N/A"} />
//               <KeyValue label="Price Negotiable" value={String(get(price, "price_negotiable", "priceNegotiable", project.price_negotiable) ?? "N/A")} />
//             </div>
//           </Section>

//           {/* PRICE */}
//           <Section
//             title="Price Details"
//             icon={<FaMoneyBill className="text-indigo-600 mr-2" />}
//           >
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <KeyValue label="Expected Price" value={formatMoney(get(price, "expected_price", "expectedPrice", "expected", project.expected_price, project.price))} />
//               <KeyValue label="Token / Booking Amount" value={formatMoney(get(price, "token_amount", "tokenAmount", "token", project.token_amount))} />
//               <KeyValue label="Other Price Notes" value={get(price, "notes", "note", project.price_notes) || "N/A"} />
//             </div>
//           </Section>

//           {/* COMMERCIAL FEATURES */}
//           {((project.type && String(project.type).toLowerCase().includes("commercial")) || (project.custom_type && String(project.custom_type).toLowerCase().includes("commercial"))) && (
//             <Section title="Commercial Features" icon={<FaBuilding className="text-indigo-600 mr-2" />}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <KeyValue label="Commercial Sub Type" value={project.commercialSubType || project.commercial_sub_type || "N/A"} />
//                 <KeyValue label="Units Count" value={(units && units.length) || project.units_count || "N/A"} />
//                 <KeyValue label="Parking" value={get(pf, "parking", "hasParking") || "N/A"} />
//                 <KeyValue label="Lift" value={get(pf, "lift", "hasLift") || "N/A"} />
//                 <KeyValue label="Power Backup" value={get(pf, "powerBackup", "hasPowerBackup") || "N/A"} />
//                 <KeyValue label="Security" value={get(pf, "security") || project.security || "N/A"} />
//               </div>
//             </Section>
//           )}

//           {/* PLOTTING - Plots list */}
//           {plots && plots.length > 0 && (
//             <Section title={`Plots (${plots.length})`} icon={<FaRulerCombined className="text-indigo-600 mr-2" />}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {plots.map((p, i) => (
//                   <div key={p.id || i} className="p-3 border rounded bg-gray-50">
//                     <h5 className="font-semibold">{p.name || `Plot ${i + 1}`}</h5>
//                     <p className="text-sm">Area: {get(p, "areaDetails.plotArea", "areaDetails.plot_area", "area", "plotArea") || "N/A"}</p>
//                     <p className="text-sm">Price: {formatMoney(get(p, "priceDetails.expectedPrice", "priceDetails.expected_price"))}</p>
//                     <p className="text-sm">Purchaser: {p.purchaser || "N/A"}</p>
//                     <p className="text-sm">Constructor: {p.constructor || "N/A"}</p>
//                     <p className="text-sm">Complete: {p.isComplete ? "Yes" : "No"}</p>
//                   </div>
//                 ))}
//               </div>
//             </Section>
//           )}

//           {/* UNITS - Duplex / Triplex / Commercial units */}
//           {units && units.length > 0 && (
//             <Section title={`Units (${units.length})`} icon={<FaBuilding className="text-indigo-600 mr-2" />}>
//               <div className="space-y-4">
//                 {units.map((u, i) => {
//                   const unitId = u.id || u.apiId || i;
//                   const projectId = project.id;
//                   const floors = get(u, "floors") || (u.floorDetails ? u.floorDetails : {});

//                   return (
//                     <div key={unitId} className="p-4 border rounded-lg bg-white">
//                       <div className="flex items-start justify-between">
//                         <div>
//                           <h4 className="font-semibold">{u.name || `Unit ${i + 1}`}</h4>
//                           <p className="text-sm">Room Type: {get(u, "roomType", "room_type") || "N/A"}</p>
//                           <p className="text-sm">Area (sq-ft): {get(u, "areaDetails.carpetArea", "areaDetails.carpet_area", "areaDetails.carpetArea", "area") || "N/A"}</p>
//                           <p className="text-sm">Price: {formatMoney(get(u, "priceDetails.expectedPrice", "priceDetails.expected_price"))}</p>
//                           <p className="text-sm">Purchaser: {u.purchaser || "N/A"}</p>
//                           <p className="text-sm">Constructor: {u.constructor || "N/A"}</p>
//                           <p className="text-sm">Complete: {u.isComplete ? "Yes" : "No"}</p>
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           <div>Local ID: {u.id ?? "—"}</div>
//                           {u.apiId && <div>API ID: {u.apiId}</div>}
//                         </div>
//                       </div>

//                       {/* Floors for duplex/triplex */}
//                       <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
//                         <FloorBlock
//                           title="Ground Floor"
//                           floor={get(floors, "groundFloor") || get(floors, "ground_floor") || get(u, "groundFloor") || get(u, "ground_floor")}
//                           projectId={projectId}
//                           unitId={unitId}
//                           floorKey="groundFloor"
//                         />
//                         <FloorBlock
//                           title="1st Floor"
//                           floor={get(floors, "firstFloor") || get(floors, "first_floor") || get(u, "firstFloor") || get(u, "first_floor")}
//                           projectId={projectId}
//                           unitId={unitId}
//                           floorKey="firstFloor"
//                         />
//                         {/* only show second floor if present */}
//                         {get(floors, "secondFloor") || get(floors, "second_floor") || get(u, "secondFloor") || get(u, "second_floor") ? (
//                           <FloorBlock
//                             title="2nd Floor"
//                             floor={get(floors, "secondFloor") || get(floors, "second_floor") || get(u, "secondFloor") || get(u, "second_floor")}
//                             projectId={projectId}
//                             unitId={unitId}
//                             floorKey="secondFloor"
//                           />
//                         ) : null}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </Section>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// /* small presentational helpers */
// const Info = ({ label, value }) => (
//   <div>
//     <label className="block text-xs text-gray-500">{label}</label>
//     <div className="text-sm font-medium text-gray-800">{value || "N/A"}</div>
//   </div>
// );

// const Section = ({ title, icon, children }) => (
//   <div className="mt-6">
//     <div className="flex items-center mb-3">
//       {icon}
//       <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
//     </div>
//     <div>{children}</div>
//   </div>
// );

// const KeyValue = ({ label, value }) => (
//   <div>
//     <div className="text-xs text-gray-500">{label}</div>
//     <div className="text-sm text-gray-800">{value || "N/A"}</div>
//   </div>
// );

// export default ProjectViewForm;

import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  FaTimes,
  FaBuilding,
  FaRulerCombined,
  FaClipboardList,
  FaMoneyBill,
  FaCheckCircle,
  FaList,
  FaSpinner,
  FaPlus,
  FaMapMarkerAlt,
  FaCalendar,
  FaRuler,
  FaFileAlt,
  FaUser,
  FaHardHat,
  FaUsers,
  FaHandshake,
  FaChevronDown,
  FaChevronUp,
  FaHome,
  FaLayerGroup,
  FaDownload,
} from "react-icons/fa";

const ProjectViewForm = ({ project = {}, onClose, token }) => {
  const [floorDetails, setFloorDetails] = useState({});
  const [loadingFloors, setLoadingFloors] = useState({});
  const [revenuePlots, setRevenuePlots] = useState([]);
  const [loadingRevenuePlots, setLoadingRevenuePlots] = useState(false);
  const [revenuePlotsError, setRevenuePlotsError] = useState(null);
  const [editingFloor, setEditingFloor] = useState(null);
  const [creatingFloor, setCreatingFloor] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    property: true,
    revenue: true,
    additional: false,
    approvals: false,
    transaction: true,
    price: true,
    commercial: true,
    plots: true,
    units: true,
  });

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Render-time debug
  console.log("ProjectViewForm render - project id:", project?.id);

  // --- Normalized helpers to tolerate different API shapes ---
  const get = (obj, ...keys) => {
    for (const k of keys) {
      if (obj && obj[k] !== undefined && obj[k] !== null) return obj[k];
    }
    return undefined;
  };

  // ---------------- Core objects from API ----------------
  const price =
    get(project, "priceDetails") ||
    get(project, "price_details") ||
    get(project, "unit_price_details") ||
    get(project, "price") ||
    {};

  const transaction =
    get(project, "transactionDetails") ||
    get(project, "transaction_details") ||
    get(project, "transaction_type") ||
    get(project, "transaction") ||
    {};

  const approval =
    get(project, "approvalStatus") ||
    get(project, "approval_status") ||
    get(project, "approvals") ||
    [];

  const plots = get(project, "plots") || [];
  const units =
    get(project, "units") || get(project, "unit_configuration") || [];

  const commercialFeatures =
    get(project, "commercialFeatures") ||
    get(project, "common_facilities") ||
    get(project, "facilities") ||
    [];

  const additional = {
    kissama: get(project, "kissama") || get(project, "kissama_details") || "",
    boundary: get(project, "boundary") || get(project, "boundary_type") || "",
    broker: get(project, "broker") || get(project, "broker_id") || "",
    purchaser: get(project, "purchaser") || "",
    constructor: get(project, "constructor") || "",
    staffEngaged:
      get(project, "staffEngaged") || get(project, "staff_engaged") || "",
    loanProvider:
      get(project, "loanProvider") || get(project, "loan_provider") || "",
    attachment:
      (get(project, "attachment") &&
        (typeof get(project, "attachment") === "string"
          ? get(project, "attachment")
          : get(project, "attachment").name ||
            JSON.stringify(get(project, "attachment")))) ||
      "",
  };

  // ---------------- Property Features Normalization ----------------
  // Property features (may not exist in API, so derive from other fields)
  const rawPf =
    get(project, "propertyFeatures") ||
    get(project, "property_features") ||
    get(project, "property_feature") ||
    get(project, "pf") ||
    {};

  const pf = { ...rawPf };

  const td =
    get(project, "transaction_details", "transactionDetails") || transaction;

  // Property Status
  if (!pf.propertyStatus && !pf.property_status) {
    pf.propertyStatus =
      get(rawPf, "propertyStatus", "property_status") ||
      get(td, "possession_status", "possessionStatus") ||
      "";
  }

  // Land area fallback: try pf → project.total_land_area → project.landArea
  if (!pf.landArea) {
    pf.landArea =
      get(rawPf, "landArea", "land_area", "land_area_sqft") ||
      project.total_land_area ||
      project.landArea ||
      project.land_area ||
      "";
  }

  // Open sides
  if (!pf.openSides) {
    pf.openSides = get(rawPf, "openSides", "open_sides");
  }

  // Road width
  if (!pf.roadWidth) {
    pf.roadWidth = get(rawPf, "roadWidth", "road_width");
  }

  // Boundary wall
  if (!pf.boundaryWall) {
    pf.boundaryWall = get(rawPf, "boundaryWall", "boundary_wall");
  }

  // Gated colony
  if (!pf.gatedColony) {
    pf.gatedColony = get(rawPf, "gatedColony", "gated_colony");
  }

  // Outhouse
  if (!pf.hasOuthouse) {
    pf.hasOuthouse = get(rawPf, "hasOuthouse", "has_outhouse");
  }

  // Possession status: first from pf, then from transaction_details
  if (!pf.possessionStatus) {
    pf.possessionStatus =
      get(rawPf, "possessionStatus", "possession_status") ||
      get(td, "possession_status", "possessionStatus") ||
      "";
  }

  // Available from month/year: derive from transaction_details.available_from
  if (!pf.availableFromMonth || !pf.availableFromYear) {
    const available =
      get(rawPf, "availableFrom") ||
      get(td, "available_from", "availableFrom") ||
      {};
    pf.availableFromMonth =
      pf.availableFromMonth ||
      available.month ||
      get(rawPf, "availableFromMonth", "available_from_month") ||
      "";
    pf.availableFromYear =
      pf.availableFromYear ||
      available.year ||
      get(rawPf, "availableFromYear", "available_from_year") ||
      "";
  }

  // ---------------- Helpers ----------------
  const safeNumber = (v) => {
    const n = Number(String(v ?? "").replace(/[^0-9.-]+/g, ""));
    return Number.isFinite(n) ? n : 0;
  };

  const totalRevenueArea = revenuePlots.reduce(
    (s, p) => s + safeNumber(get(p, "area", "plot_area", "plotArea")),
    0
  );

  const formatMoney = (v) => {
    if (v === undefined || v === null || v === "") return "N/A";
    const n = Number(String(v).replace(/[^0-9.-]+/g, ""));
    if (Number.isNaN(n)) return v;
    return `₹${n.toLocaleString("en-IN")}`;
  };

  const getExpectedPriceFromProject = (p) => {
  if (!p) return 0;
  return (
    p?.priceDetails?.expectedPrice ??
    p?.price_details?.expected_price ??
    p?.expected_price ??
    p?.starting_price ??
    p?.price ??
    0
  );
};

  const authToken = token || localStorage.getItem("authToken") || "";

  // ---------------- Revenue Plots (Plotting Projects) ----------------
  const fetchRevenuePlots = async () => {
    if (!project?.id) {
      console.warn("No project ID available for fetching revenue plots");
      return;
    }

    // Only for plotting projects
    if (project.type && project.type.toString().toLowerCase() !== "plotting") {
      console.log(
        "Skipping revenue plots fetch because project type is not plotting:",
        project.type
      );
      return;
    }

    setLoadingRevenuePlots(true);
    setRevenuePlotsError(null);

    try {
      const response = await axios.get(
        `https://api.csaap.com/api/tenantuser/projects/${project.id}/revenue-plots`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: authToken ? `Bearer ${authToken}` : "",
          },
          params: {
            subdomain: "cloudflare",
          },
          timeout: 15000,
        }
      );

      const data = response.data;
      let plotsArray = [];

      // Handle multiple possible response shapes
      if (Array.isArray(data)) {
        plotsArray = data;
      } else if (Array.isArray(data?.data)) {
        plotsArray = data.data;
      } else if (Array.isArray(data?.revenue_plots)) {
        plotsArray = data.revenue_plots;
      }

      setRevenuePlots(plotsArray || []);
      console.log(
        `Fetched ${plotsArray?.length || 0} revenue plots for project ${
          project.id
        }`
      );
    } catch (error) {
      console.error("Error fetching revenue plots:", error);
      setRevenuePlotsError(error.message || "Failed to fetch revenue plots");

      // Fallback to existing project data if API fails
      const fallbackPlots =
        get(project, "plotsData") ||
        get(project, "revenue_plots_data") ||
        get(project, "plots_data") ||
        get(project, "plots") ||
        get(project, "revenue_plots") ||
        [];

      if (Array.isArray(fallbackPlots) && fallbackPlots.length > 0) {
        setRevenuePlots(fallbackPlots);
        console.log("Using fallback revenue plots data from project");
      }
    } finally {
      setLoadingRevenuePlots(false);
    }
  };

  // ---------------- Floor Details (Units) ----------------
  const fetchFloorDetails = async (
    projectIdParam,
    unitIdParam,
    floorKeyParam
  ) => {
    const cacheKey = `${projectIdParam}-${unitIdParam}-${floorKeyParam}`;

    if (loadingFloors[cacheKey] || floorDetails[cacheKey]) {
      return;
    }

    setLoadingFloors((prev) => ({ ...prev, [cacheKey]: true }));

    try {
      const response = await axios.request({
        method: "get",
        url: `https://api.csaap.com/api/tenantuser/projects/${projectIdParam}/units/${unitIdParam}/floor-details/${floorKeyParam}`,
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          subdomain: "cloudflare",
        },
        validateStatus: () => true,
        timeout: 20000,
      });

      if (response.status >= 200 && response.status < 300) {
        setFloorDetails((prev) => ({
          ...prev,
          [cacheKey]: response.data,
        }));
      } else {
        setFloorDetails((prev) => ({
          ...prev,
          [cacheKey]: response.data ?? null,
        }));
      }
    } catch (error) {
      console.error(
        `[fetchFloorDetails] network/error for ${cacheKey}:`,
        error
      );
      setFloorDetails((prev) => ({
        ...prev,
        [cacheKey]: null,
      }));
    } finally {
      setLoadingFloors((prev) => ({ ...prev, [cacheKey]: false }));
    }
  };

  // Fetch revenue plots when component mounts or project changes
  useEffect(() => {
    if (project?.id) {
      fetchRevenuePlots();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.id, project?.type]);

  // Prefetch effect for floor details (for non-plotting projects with units)
  useEffect(() => {
    if (!project || !project.id) return;
    if (!Array.isArray(units) || units.length === 0) return;

    units.forEach((unit, unitIndex) => {
      const uId = unit.id || unit.apiId || unitIndex;
      const projectIdVal = project.id;

      const floorDetailsArray = unit.floor_details || [];

      if (floorDetailsArray.length > 0) {
        floorDetailsArray.forEach((floorDetail) => {
          const floorKey = floorDetail.floor_key;
          if (floorKey) {
            fetchFloorDetails(projectIdVal, uId, floorKey);
          }
        });
      } else {
        const floorsToCheck = [
          { key: "groundFloor", title: "Ground Floor" },
          { key: "firstFloor", title: "1st Floor" },
          { key: "secondFloor", title: "2nd Floor" },
        ];

        const floors =
          get(unit, "floors") || (unit.floorDetails ? unit.floorDetails : {});

        floorsToCheck.forEach(({ key }) => {
          const floorData = get(floors, key) || get(unit, key);
          if (
            floorData &&
            (floorData.id || Object.keys(floorData).length > 0)
          ) {
            fetchFloorDetails(projectIdVal, uId, key);
          }
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units, project.id]);

  // Function to handle document download for revenue plot
  const handleDownloadDocument = (plot) => {
    const documentUrl = get(plot, "plot_document", "document_url");
    const fileName = get(plot, "file_name", "plot_document.pdf");

    if (documentUrl) {
      const link = document.createElement("a");
      link.href = documentUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("Document not available for download");
    }
  };

  // Floor renderer component (used for duplex/apartment/others)
  const FloorBlock = ({
    title,
    floor = {},
    projectId,
    unitId,
    floorKey,
    unitData = null,
  }) => {
    const cacheKey = `${projectId}-${unitId}-${floorKey}`;
    const apiFloorData = floorDetails[cacheKey];
    const isLoading = loadingFloors[cacheKey];

    const unitFloorDetails = unitData?.floor_details || [];
    const floorFromUnitDetails = unitFloorDetails.find(
      (f) => f.floor_key === floorKey
    );
    const finalFloorData = apiFloorData || floorFromUnitDetails || floor;

    if (!finalFloorData || Object.keys(finalFloorData).length === 0) {
      return (
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors">
          <div className="flex justify-between items-center mb-2">
            <h5 className="font-semibold text-gray-700">{title}</h5>
            <button
              onClick={() => setCreatingFloor(cacheKey)}
              className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-1.5 font-medium"
            >
              <FaPlus size={10} /> Add Details
            </button>
          </div>
          <p className="text-sm text-gray-500 italic">
            No floor data available
          </p>
        </div>
      );
    }

    const floorData = apiFloorData || floor;
    const bedrooms = get(
      floorData,
      "total_bedrooms",
      "totalBedrooms",
      "bedrooms",
      "bedroom_count"
    );
    const bathrooms = get(
      floorData,
      "total_bathrooms",
      "totalBathrooms",
      "bathrooms",
      "toilets"
    );
    const area = get(
      floorData,
      "living_area",
      "bedroom_area",
      "area",
      "floorArea",
      "totalArea",
      "carpetArea"
    );
    const studyRoom = get(floorData, "study_room", "studyRoom");
    const studyRoomArea = get(floorData, "study_room_area", "studyRoomArea");
    const balcony = get(floorData, "balcony");
    const balconyArea = get(floorData, "balcony_area", "balconyArea");
    const kitchen = get(floorData, "kitchen");
    const garage = get(floorData, "garage");
    const diningArea = get(floorData, "dining_area", "diningArea");
    const additionalNotes = get(
      floorData,
      "additional_notes",
      "additionalNotes"
    );

    return (
      <div className="p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-all">
        <div className="flex justify-between items-center mb-3">
          <h5 className="font-semibold text-gray-800">{title}</h5>
          <div className="flex items-center gap-2">
            {isLoading && <FaSpinner className="animate-spin text-blue-500" />}
            {apiFloorData && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                Live Data
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-blue-50 p-2 rounded-lg">
            <div className="text-xs text-blue-600 font-medium">Area</div>
            <div className="text-gray-800 font-semibold">
              {area || "N/A"} sq-ft
            </div>
          </div>
          <div className="bg-purple-50 p-2 rounded-lg">
            <div className="text-xs text-purple-600 font-medium">Bedrooms</div>
            <div className="text-gray-800 font-semibold">
              {bedrooms ?? "N/A"}
            </div>
          </div>
          <div className="bg-green-50 p-2 rounded-lg">
            <div className="text-xs text-green-600 font-medium">Bathrooms</div>
            <div className="text-gray-800 font-semibold">
              {bathrooms ?? "N/A"}
            </div>
          </div>

          {studyRoom && (
            <div className="bg-orange-50 p-2 rounded-lg">
              <div className="text-xs text-orange-600 font-medium">
                Study Rooms
              </div>
              <div className="text-gray-800 font-semibold">{studyRoom}</div>
            </div>
          )}
          {balcony && (
            <div className="bg-pink-50 p-2 rounded-lg">
              <div className="text-xs text-pink-600 font-medium">Balconies</div>
              <div className="text-gray-800 font-semibold">{balcony}</div>
            </div>
          )}
          {kitchen && (
            <div className="bg-red-50 p-2 rounded-lg">
              <div className="text-xs text-red-600 font-medium">Kitchen</div>
              <div className="text-gray-800 font-semibold">{kitchen}</div>
            </div>
          )}
        </div>

        {(studyRoomArea || balconyArea || diningArea || additionalNotes) && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-500 font-medium mb-2">
              Additional Details
            </div>
            <div className="space-y-1 text-sm text-gray-700">
              {studyRoomArea && (
                <div>
                  <span className="font-medium">Study Area:</span>{" "}
                  {studyRoomArea} sq-ft
                </div>
              )}
              {balconyArea && (
                <div>
                  <span className="font-medium">Balcony Area:</span>{" "}
                  {balconyArea} sq-ft
                </div>
              )}
              {diningArea && (
                <div>
                  <span className="font-medium">Dining Area:</span>{" "}
                  {diningArea} sq-ft
                </div>
              )}
              {garage && (
                <div>
                  <span className="font-medium">Garage:</span> {garage}
                </div>
              )}
              {additionalNotes && (
                <div className="mt-2">
                  <div className="font-medium text-gray-600">Notes:</div>
                  <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded mt-1">
                    {additionalNotes}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl p-6 z-10">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <FaBuilding className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {project.name || "Unnamed Project"}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                      {project.type ||
                        project.project_type ||
                        project.custom_type ||
                        "Type unknown"}
                    </span>
                    {project.commercial_sub_type ||
                      (project.commercialSubType && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                          {project.commercial_sub_type ||
                            project.commercialSubType}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                title="Close"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <StatCard
              icon={<FaMapMarkerAlt className="text-blue-500" />}
              label="Location"
              value={`${project.city || "N/A"}${
                project.locality ? `, ${project.locality}` : ""
              }`}
            />
            <StatCard
              icon={<FaRuler className="text-green-500" />}
              label="Land Area"
              value={
                project.total_land_area ||
                project.landArea ||
                project.land_area ||
                "N/A"
              }
            />
            <StatCard
              icon={<FaCalendar className="text-purple-500" />}
              label="Created"
              value={project.createdAt || project.created_at || "N/A"}
            />
            <StatCard
              icon={<FaLayerGroup className="text-orange-500" />}
              label="Revenue Plots"
              value={revenuePlots.length}
            />
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Property Features Section */}
          <CollapsibleSection
            title="Property Features"
            icon={<FaBuilding className="text-indigo-600" />}
            isExpanded={expandedSections.property}
            onToggle={() => toggleSection("property")}
            count={Object.keys(pf).length}
          >
            {expandedSections.property && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <DetailCard
                    label="Property Status"
                    value={
                      pf.propertyStatus ||
                      pf.property_status ||
                      pf.possessionStatus ||
                      get(transaction, "possession_status", "possessionStatus")
                    }
                  />
                  <DetailCard
                    label="Land Area"
                    value={
                      pf.landArea ||
                      get(pf, "land_area", "land_area_sqft") ||
                      project.total_land_area ||
                      project.landArea ||
                      project.land_area
                    }
                    suffix="sqft"
                  />
                  <DetailCard label="Open Sides" value={pf.openSides} />
                  <DetailCard
                    label="Road Width"
                    value={pf.roadWidth}
                    suffix="m"
                  />
                  <DetailCard
                    label="Boundary Wall"
                    value={pf.boundaryWall}
                  />
                  <DetailCard
                    label="Gated Colony"
                    value={pf.gatedColony}
                  />
                  <DetailCard
                    label="Possession Status"
                    value={
                      pf.possessionStatus ||
                      get(transaction, "possession_status", "possessionStatus")
                    }
                  />
                  <DetailCard
                    label="Available From"
                    value={
                      (pf.availableFromMonth || "") +
                      (pf.availableFromYear ? ` ${pf.availableFromYear}` : "")
                    }
                  />
                  <DetailCard label="Outhouse" value={pf.hasOuthouse} />
                </div>

                {commercialFeatures && commercialFeatures.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <FaList className="text-gray-500" />
                      Facilities & Amenities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {commercialFeatures.map((f, i) => (
                        <span
                          key={i}
                          className="px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100"
                        >
                          {typeof f === "string"
                            ? f
                            : f.name || f.label || JSON.stringify(f)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CollapsibleSection>

          {/* Revenue Plots Section – mainly for plotting */}
          <CollapsibleSection
            title="Revenue Plots"
            icon={<FaRulerCombined className="text-green-600" />}
            isExpanded={expandedSections.revenue}
            onToggle={() => toggleSection("revenue")}
            count={revenuePlots.length}
          >
            {expandedSections.revenue && (
              <div className="space-y-4">
                {loadingRevenuePlots ? (
                  <div className="flex justify-center items-center py-8">
                    <FaSpinner className="animate-spin text-blue-500 text-2xl mr-3" />
                    <span className="text-gray-600">
                      Loading revenue plots...
                    </span>
                  </div>
                ) : revenuePlotsError ? (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="text-red-700 font-semibold mb-2">
                      Error Loading Revenue Plots
                    </div>
                    <div className="text-red-600 text-sm">
                      {revenuePlotsError}
                    </div>
                    <button
                      onClick={fetchRevenuePlots}
                      className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                    >
                      Retry
                    </button>
                  </div>
                ) : revenuePlots.length === 0 ? (
                  <EmptyState message="No revenue plots data available" />
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {revenuePlots.map((rp, i) => (
                        <div
                          key={rp.id || i}
                          className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl p-4 hover:shadow-md transition-all"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <span className="text-green-700 font-bold text-sm">
                                  {i + 1}
                                </span>
                              </div>
                              <h5 className="font-semibold text-gray-800">
                                Plot {rp.plot_number || i + 1}
                              </h5>
                            </div>
                            {get(rp, "plot_document", "document_url") && (
                              <button
                                onClick={() => handleDownloadDocument(rp)}
                                className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors"
                                title="Download Document"
                              >
                                <FaDownload size={14} />
                              </button>
                            )}
                          </div>
                          <div className="space-y-2 text-sm">
                            <DetailRow
                              label="Area"
                              value={get(rp, "area")}
                              suffix="sq-ft"
                            />
                            <DetailRow
                              label="Entry Plot No"
                              value={get(rp, "entry_plot_no", "entryPlotNo")}
                            />
                            <DetailRow
                              label="Khata No"
                              value={get(rp, "khata_no", "khataNo")}
                            />
                            <DetailRow
                              label="Plot Number"
                              value={get(rp, "plot_number", "plotNumber")}
                            />
                            <DetailRow
                              label="Document"
                              value={get(rp, "file_name", "plot_document")}
                            />
                            {rp.created_at && (
                              <DetailRow
                                label="Created"
                                value={new Date(
                                  rp.created_at
                                ).toLocaleDateString()}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FaRuler className="text-white" />
                          <span className="font-semibold">
                            Total Revenue Area
                          </span>
                        </div>
                        <span className="text-xl font-bold">
                          {totalRevenueArea.toLocaleString()} sq-ft
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </CollapsibleSection>

          {/* Additional Information Section */}
          <CollapsibleSection
            title="Additional Information"
            icon={<FaClipboardList className="text-purple-600" />}
            isExpanded={expandedSections.additional}
            onToggle={() => toggleSection("additional")}
          >
            {expandedSections.additional && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailCard
                  icon={<FaFileAlt />}
                  label="Kissama"
                  value={additional.kissama}
                />
                <DetailCard
                  icon={<FaRulerCombined />}
                  label="Boundary Type"
                  value={additional.boundary}
                />
                <DetailCard
                  icon={<FaHandshake />}
                  label="Broker"
                  value={additional.broker}
                />
                <DetailCard
                  icon={<FaFileAlt />}
                  label="Reference"
                  value={project.reference || project.ref}
                />
                <DetailCard
                  icon={<FaUser />}
                  label="Purchaser"
                  value={additional.purchaser}
                />
                <DetailCard
                  icon={<FaHardHat />}
                  label="Constructor"
                  value={additional.constructor}
                />
                <DetailCard
                  icon={<FaUsers />}
                  label="Staff Engaged"
                  value={additional.staffEngaged}
                />
                <DetailCard
                  icon={<FaHandshake />}
                  label="Loan Provider"
                  value={additional.loanProvider}
                />
                <DetailCard
                  icon={<FaFileAlt />}
                  label="Attachment"
                  value={additional.attachment}
                />
              </div>
            )}
          </CollapsibleSection>

          {/* Transaction Details Section */}
          <CollapsibleSection
            title="Transaction Details"
            icon={<FaList className="text-blue-600" />}
            isExpanded={expandedSections.transaction}
            onToggle={() => toggleSection("transaction")}
          >
            {expandedSections.transaction && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailCard
                  label="Possession Status"
                  value={get(
                    transaction,
                    "possession_status",
                    "possessionStatus",
                    "possession"
                  )}
                />
                <DetailCard
                  label="Available From"
                  value={(
                    (get(transaction, "availableFrom") &&
                      `${get(transaction, "availableFrom").month || ""} ${
                        get(transaction, "availableFrom").year || ""
                      }`) ||
                    `${
                      get(transaction, "available_from_month") ||
                      get(transaction, "availableFromMonth") ||
                      ""
                    } ${
                      get(transaction, "available_from_year") ||
                      get(transaction, "availableFromYear") ||
                      ""
                    }`
                  ).trim()}
                />
                <DetailCard
                  label="Transaction Type"
                  value={get(transaction, "type", "transaction_type")}
                />
                <DetailCard
                  label="Price Negotiable"
                  value={String(
                    get(
                      price,
                      "price_negotiable",
                      "priceNegotiable",
                      project.price_negotiable
                    ) ?? "N/A"
                  )}
                />
              </div>
            )}
          </CollapsibleSection>

          {/* Price Details Section */}
          <CollapsibleSection
            title="Price Details"
            icon={<FaMoneyBill className="text-green-600" />}
            isExpanded={expandedSections.price}
            onToggle={() => toggleSection("price")}
          >
            {expandedSections.price && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* <PriceCard
                  label="Expected Price"
                  value={formatMoney(
                    get(
                      price,
                      "expected_price",
                      "expectedPrice",
                      "expected",
                      project.expected_price,
                      project.price
                    )
                  )}
                  type="primary"
                /> */}

                <PriceCard
  label="Original / Expected Price"
  value={formatMoney(getExpectedPriceFromProject(project))}
  type="primary"
/>

                <PriceCard
                  label="Token Amount"
                  value={formatMoney(
                    get(
                      price,
                      "token_amount",
                      "tokenAmount",
                      "token",
                      project.token_amount
                    )
                  )}
                  type="secondary"
                />
                <DetailCard
                  label="Other Notes"
                  value={get(price, "notes", "note", project.price_notes)}
                  className="bg-gray-50"
                />
              </div>
            )}
          </CollapsibleSection>

          {/* Units Section – only when units exist */}
          {units && units.length > 0 && (
            <CollapsibleSection
              title="Units Configuration"
              icon={<FaHome className="text-indigo-600" />}
              isExpanded={expandedSections.units}
              onToggle={() => toggleSection("units")}
              count={units.length}
            >
              {expandedSections.units && (
                <div className="space-y-6">
                  {units.map((u, i) => {
                    const unitId = u.id || u.apiId || i;
                    const projectId = project.id;
                    const floors =
                      get(u, "floors") ||
                      (u.floorDetails ? u.floorDetails : {});

                    return (
                      <div
                        key={unitId}
                        className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                              <FaHome className="text-indigo-600" />
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 text-lg">
                                {u.name || `Unit ${i + 1}`}
                              </h4>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                  {get(u, "roomType", "room_type") || "N/A"}
                                </span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                  {get(
                                    u,
                                    "areaDetails.carpetArea",
                                    "areaDetails.carpet_area",
                                    "areaDetails.carpetArea",
                                    "area"
                                  ) || "N/A"}{" "}
                                  sq-ft
                                </span>
                                {u.isComplete && (
                                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                                    Complete
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right text-sm text-gray-500 space-y-1">
                            <div>ID: {u.id ?? "—"}</div>
                            {u.apiId && <div>API: {u.apiId}</div>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <DetailRow
                            label="Price"
                            value={formatMoney(
                              get(
                                u,
                                "priceDetails.expectedPrice",
                                "priceDetails.expected_price"
                              )
                            )}
                          />
                          <DetailRow label="Purchaser" value={u.purchaser} />
                          <DetailRow
                            label="Constructor"
                            value={u.constructor}
                          />
                        </div>

                        {/* Floors */}
                        <div className="mt-4">
                          <h5 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <FaLayerGroup className="text-gray-500" />
                            Floor Details
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FloorBlock
                              title="Ground Floor"
                              floor={
                                get(floors, "groundFloor") ||
                                get(floors, "ground_floor") ||
                                get(u, "groundFloor") ||
                                get(u, "ground_floor")
                              }
                              projectId={projectId}
                              unitId={unitId}
                              floorKey="groundFloor"
                              unitData={u}
                            />
                            <FloorBlock
                              title="1st Floor"
                              floor={
                                get(floors, "firstFloor") ||
                                get(floors, "first_floor") ||
                                get(u, "firstFloor") ||
                                get(u, "first_floor")
                              }
                              projectId={projectId}
                              unitId={unitId}
                              floorKey="firstFloor"
                              unitData={u}
                            />
                            {get(floors, "secondFloor") ||
                            get(floors, "second_floor") ||
                            get(u, "secondFloor") ||
                            get(u, "second_floor") ? (
                              <FloorBlock
                                title="2nd Floor"
                                floor={
                                  get(floors, "secondFloor") ||
                                  get(floors, "second_floor") ||
                                  get(u, "secondFloor") ||
                                  get(u, "second_floor")
                                }
                                projectId={projectId}
                                unitId={unitId}
                                floorKey="secondFloor"
                                unitData={u}
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CollapsibleSection>
          )}
        </div>
      </div>
    </div>
  );
};

// Enhanced UI Components
const StatCard = ({ icon, label, value }) => (
  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <div>
        <div className="text-xs text-gray-500 font-medium">{label}</div>
        <div className="text-sm font-semibold text-gray-900">
          {value || "N/A"}
        </div>
      </div>
    </div>
  </div>
);

const CollapsibleSection = ({
  title,
  icon,
  children,
  isExpanded,
  onToggle,
  count,
}) => (
  <div className="border border-gray-200 rounded-xl overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {count !== undefined && (
          <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
            {count}
          </span>
        )}
      </div>
      {isExpanded ? (
        <FaChevronUp className="text-gray-500" />
      ) : (
        <FaChevronDown className="text-gray-500" />
      )}
    </button>
    {isExpanded && <div className="p-4 bg-white">{children}</div>}
  </div>
);

const DetailCard = ({ icon, label, value, suffix, className = "" }) => (
  <div
    className={`bg-gray-50 rounded-lg p-3 border border-gray-200 ${className}`}
  >
    <div className="flex items-center gap-2 mb-1">
      {icon && <span className="text-gray-500">{icon}</span>}
      <div className="text-xs text-gray-500 font-medium">{label}</div>
    </div>
    <div className="text-sm font-semibold text-gray-900">
      {value || "N/A"}{" "}
      {value && suffix && (
        <span className="text-gray-500 text-xs">{suffix}</span>
      )}
    </div>
  </div>
);

const PriceCard = ({ label, value, type = "primary" }) => {
  const bgColor =
    type === "primary"
      ? "from-green-50 to-emerald-50 border-green-200"
      : "from-blue-50 to-cyan-50 border-blue-200";
  const textColor = type === "primary" ? "text-green-700" : "text-blue-700";

  return (
    <div className={`bg-gradient-to-br ${bgColor} border rounded-xl p-4`}>
      <div className="text-xs text-gray-500 font-medium mb-1">{label}</div>
      <div className={`text-lg font-bold ${textColor}`}>{value}</div>
    </div>
  );
};

const DetailRow = ({ label, value, suffix }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-gray-600">{label}:</span>
    <span className="text-sm font-semibold text-gray-900">
      {value || "N/A"}{" "}
      {value && suffix && (
        <span className="text-gray-500 text-xs">{suffix}</span>
      )}
    </span>
  </div>
);

const EmptyState = ({ message }) => (
  <div className="text-center py-8">
    <div className="text-gray-400 text-sm">{message}</div>
  </div>
);

export default ProjectViewForm;


