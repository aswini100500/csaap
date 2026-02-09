// CommercialProject.jsx
import React, { useState, useEffect } from "react";
import projectService from "./projectService";
import {
  // Existing icons
  FaPlus,
  FaTrash,
  FaCheckCircle,
  FaList,
  FaBuilding,
  FaHome,
  FaRulerCombined,
  FaSpinner,
  FaInfoCircle,
  FaEdit,
  FaStar,
  FaSave,
  FaUser,
  FaDoorOpen,
  FaBath,
  FaCogs,
  FaRuler,
  // Add only these 5 new icons for the enhanced UI
  FaMoneyBill,
  FaUserTie,
  FaUsers,
  FaHardHat,
  FaCog,
} from "react-icons/fa";

import {
  INITIAL_PRICE_DETAILS,
  INITIAL_PROPERTY_FEATURES,
  INITIAL_AREA_DETAILS,
  INITIAL_APPROVAL_STATUS,
  INITIAL_TRANSACTION_TYPE,
} from "../project/shared/initialStates";

import {
  BROKER_LIST,
  FACILITIES,
  COMMERCIAL_TYPES,
} from "../project/shared/Constants";

const CommercialProject = ({
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
  onSaveProject,
  editingProjectId,
  selectedProject,  
  PROJECT_TYPES = {
    APARTMENT: "Apartment",
    PLOTTING: "Plotting",
    DUPLEX: "Duplex",
    TRIPLEX: "Triplex",
    COMMERCIAL: "Commercial",
    CUSTOM: "Custom",
  },
}) => {
  // Primary states
  const [numFloors, setNumFloors] = useState();
  const [totalUnits, setTotalUnits] = useState();
  const [floorConfigurations, setFloorConfigurations] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [unitPrefix, setUnitPrefix] = useState("");
  const [priceDetails, setPriceDetails] = useState(INITIAL_PRICE_DETAILS);
  const isEditMode = Boolean(editingProjectId);

  // Misc states
  const [propertyFeatures, setPropertyFeatures] = useState(
    INITIAL_PROPERTY_FEATURES,
  );
  const [areaDetails, setAreaDetails] = useState(INITIAL_AREA_DETAILS);
  const [broker, setBroker] = useState("");
  const [purchaser, setPurchaser] = useState("");
  const [constructorName, setConstructor] = useState("");
  const [approvalStatus, setApprovalStatus] = useState(INITIAL_APPROVAL_STATUS);
  const [transactionType, setTransactionType] = useState(
    INITIAL_TRANSACTION_TYPE,
  );
  const [unitCustomFacilities, setUnitCustomFacilities] = useState([]);
  const [staffEngaged, setStaffEngaged] = useState("");
  const [loanProvider, setLoanProvider] = useState("");
  const [loanDetails, setLoanDetails] = useState({ amount: "" });

  // Revenue plots states
  const [landArea, setLandArea] = useState();
  // const [revenuePlots, setRevenuePlots] = useState();
  const [revenuePlots, setRevenuePlots] = useState(0);
  const [attachment, setAttachment] = useState(null);
  const [plotsData, setPlotsData] = useState([]);
  const [existingPlotNumbers, setExistingPlotNumbers] = useState(new Set());
  const [isSavingPlots, setIsSavingPlots] = useState(false);

  // Project ID state
  const [projectId, setProjectId] = useState(editingProjectId || null);
  const [isCreating, setIsCreating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [customFacilities, setCustomFacilities] = useState([]);

useEffect(() => {
  if (!selectedProject) return;

  // Basic project info
  setProjectName(selectedProject.name || "");
  setCommercialSubType(selectedProject.commercial_sub_type || "");
  setCity(selectedProject.city || "");
  setLocality(selectedProject.locality || "");
  setLandZone(selectedProject.land_zone || "");

  // Units
  if (selectedProject.units_data) {
    try {
      const parsedUnits =
        typeof selectedProject.units_data === "string"
          ? JSON.parse(selectedProject.units_data)
          : selectedProject.units_data;

      if (Array.isArray(parsedUnits)) {
        setUnits(parsedUnits);
      }
    } catch (e) {
      console.error("Failed to parse units_data", e);
    }
  }

  // Floors & totals (derive from units if available)
  if (selectedProject.num_floors) {
    setNumFloors(selectedProject.num_floors);
  }

  if (selectedProject.total_units) {
    setTotalUnits(selectedProject.total_units);
  }

  // Revenue plots
  setLandArea(selectedProject.total_land_area || "");
setRevenuePlots(Number(selectedProject.revenue_plots) || 0);
// ALSO LOAD PLOTS DATA
if (selectedProject.plots_data) {
  try {
    const parsedPlots =
      typeof selectedProject.plots_data === "string"
        ? JSON.parse(selectedProject.plots_data)
        : selectedProject.plots_data;

    setPlotsData(parsedPlots || []);
  } catch (e) {
    console.error("Failed to parse plots_data", e);
    setPlotsData([]);
  }
}

}, [selectedProject]);



  // Initialize floor configurations when numFloors changes
useEffect(() => {
  const floorsCount = numFloors === "" ? 0 : parseInt(numFloors) || 0;
  if (floorsCount > 0) {
    const newConfigs = [];
    for (let i = 0; i < floorsCount; i++) {
      newConfigs.push(
        floorConfigurations[i] || {
          floorName: `Floor ${i + 1}`,
          units: 0,
          unitTypes: [],
        }
      );
    }
    setFloorConfigurations(newConfigs);
  } else {
    setFloorConfigurations([]);
  }
}, [numFloors]);
  // Handle Number of Floors input change
const handleNumFloorsChange = (e) => {
  const value = e.target.value;
  // Allow empty string or parse as integer
  setNumFloors(value === "" ? "" : parseInt(value) || 0);
};

  // Handle Total Units input change
const handleTotalUnitsChange = (e) => {
  const value = e.target.value;
  // Allow empty string or parse as integer
  setTotalUnits(value === "" ? "" : parseInt(value) || 0);
};

  // Generate Unique Plot Number
  const generateUniquePlotNumber = (existingNumbers) => {
    let plotNumber = 1;
    const setToCheck =
      existingNumbers instanceof Set
        ? existingNumbers
        : new Set(existingNumbers || []);
    while (setToCheck.has(plotNumber)) plotNumber++;
    return plotNumber;
  };

  // Handle Save Revenue Plots
  const handleSaveRevenuePlots = async () => {
    const filledPlots = plotsData.filter(
      (plot) =>
        plot &&
        (plot.area || plot.entryPlotNo || plot.khataNo || plot.fileName),
    );

    if (filledPlots.length === 0) {
      alert("No filled plots to save.");
      return;
    }

    setIsSavingPlots(true);

    try {
      const projectData = {
        name: projectName,
        type: projectType,
        commercialSubType,
        city,
        locality,
        landZone,
        total_land_area: landArea,
      revenue_plots: plotsData.length,
plots: plotsData.map((p, index) => ({
  plot_no: p.entryPlotNo || `CP-${index + 1}`,
  plot_area_sqft: Number(p.area) || 0,
  khata_no: p.khataNo || "",
  document: p.fileName || "",
})),

        units: units,
      
        total_units: totalUnits,
        num_floors: numFloors,
      };

      await projectService.updateCommercial(projectId, projectData);
      alert(`${filledPlots.length} plot(s) saved to project ${projectId}.`);
    } catch (error) {
      console.error("Error saving revenue plots:", error);
      alert("Failed to save plots.");
    } finally {
      setIsSavingPlots(false);
    }
  };

  // Generate Units Locally
  const generateUnits = () => {

    if (units.length > 0) {
  const ok = window.confirm(
    "Units already exist. Generating again will overwrite them. Continue?"
  );
  if (!ok) return;
}


      const unitsCount = totalUnits === "" ? 0 : parseInt(totalUnits) || 0;
  const floorsCount = numFloors === "" ? 0 : parseInt(numFloors) || 0;

    if (totalUnits <= 0) {
      alert("Please enter a valid number of commercial units");
      return;
    }

    if (!unitPrefix.trim()) {
      alert("Please enter a unit prefix");
      return;
    }

    const configuredUnits = floorConfigurations.reduce(
      (sum, floor) => sum + (floor?.units || 0),
      0,
    );
    if (configuredUnits !== totalUnits) {
      alert(
        `Please configure exactly ${totalUnits} commercial units across all floors. Currently configured: ${configuredUnits}`,
      );
      return;
    }

    const newUnits = [];
    let unitCounter = 1;

    for (const floor of floorConfigurations) {
      const floorUnits = floor.units || 0;
      const floorIndex = floorConfigurations.indexOf(floor) + 1;

      for (let i = 1; i <= floorUnits; i++) {
        const unitName = `${unitPrefix} ${unitCounter}`;
        const unitType =
          floor.unitTypes?.[i - 1] || commercialSubType || "Commercial";

        const newUnit = {
          id: Date.now() + unitCounter,
          name: unitName,
          floor: floor.floorName,
          floorNumber: floorIndex,
          roomType: unitType,
          propertyFeatures: {
            ...INITIAL_PROPERTY_FEATURES,
            bedrooms: 0,
            bathrooms: 0,
          },
          areaDetails: {
            ...INITIAL_AREA_DETAILS,
            carpetArea: "800",
            builtUpArea: "1000",
          },
          approvalStatus: JSON.parse(JSON.stringify(INITIAL_APPROVAL_STATUS)),
          transactionType: { ...INITIAL_TRANSACTION_TYPE },
          priceDetails: { ...INITIAL_PRICE_DETAILS },
          broker: "",
          purchaser: "",
          constructor: "",
          staffEngaged: "",
          loanProvider: "",
          loan: "",
          isComplete: false,
        };

        newUnits.push(newUnit);
        unitCounter++;
      }
    }

    setUnits(newUnits);
    alert(`${newUnits.length} units generated successfully!`);
  };

  const handleUnitClick = (unit) => {
    setSelectedUnit(unit);
    setPropertyFeatures(unit.propertyFeatures || INITIAL_PROPERTY_FEATURES);
    setAreaDetails(unit.areaDetails || INITIAL_AREA_DETAILS);
    setPriceDetails(unit.priceDetails || INITIAL_PRICE_DETAILS);
    setBroker(unit.broker || "");
    setPurchaser(unit.purchaser || "");
    setConstructor(unit.constructor || "");
    setApprovalStatus(unit.approvalStatus || INITIAL_APPROVAL_STATUS);
    setTransactionType(unit.transactionType || INITIAL_TRANSACTION_TYPE);
  };

  const updateUnitDetails = () => {
    if (!selectedUnit) return;

    const updatedUnits = units.map((unit) => {
      if (unit.id === selectedUnit.id) {
        const updatedUnit = {
          ...unit,
          propertyFeatures,
          areaDetails,
          approvalStatus,
          transactionType,
          priceDetails,
          broker,
          purchaser,
          constructor: constructorName,
        };
        updatedUnit.isComplete = !!(
          priceDetails.expectedPrice &&
          areaDetails.carpetArea &&
          purchaser &&
          constructorName
        );
        return updatedUnit;
      }
      return unit;
    });

    setUnits(updatedUnits);
    setSelectedUnit(updatedUnits.find((u) => u.id === selectedUnit.id));
    alert("Unit details updated successfully!");
  };

  const handleCreateProject = async () => {
    if (!projectName || !projectType) {
      alert("Project name and type are required");
      return;
    }

    setIsCreating(true);

    try {
const projectData = {
  name: projectName,
  type: projectType,
  commercialSubType,
  city,
  locality,
  landZone,
  total_land_area: landArea,

  // ✅ COUNT
  revenue_plots: plotsData.length,

  // ✅ FULL DETAILS
  plots: plotsData.map((p, index) => ({
    plot_no: p.entryPlotNo || `CP-${index + 1}`,
    plot_area_sqft: Number(p.area) || 0,
    khata_no: p.khataNo || "",
    document: p.fileName || "",
  })),

  units,
  total_units: totalUnits,
  num_floors: numFloors,
};


      const response = await projectService.createCommercial(projectData);
      setProjectId(response.id);
      setSuccessMessage(
        `Project "${projectName}" created successfully! ID: ${response.id}`,
      );

      if (onSaveProject) {
        onSaveProject({ ...projectData, id: response.id });
      }
    } catch (error) {
      console.error("Error creating commercial project:", error);
      alert("Failed to create project. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleSaveProject = async () => {
    // Determine if we have an ID either from state or verify if we created one locally (though now we use API)
    // The previous code had a separate handleCreateProject that set a local ID.
    // We should merge or handle both. Ideally saving persists to DB.

    if (!projectName || !projectType) {
      alert("Please enter project name and type");
      return;
    }

    try {
      const projectData = {
        name: projectName,
        type: projectType,
        commercialSubType,
        city,
        locality,
        landZone,
        total_land_area: landArea,
        revenue_plots: revenuePlots,
        units: units,
        plots: plotsData,
        total_units: totalUnits,
        num_floors: numFloors,
      };

      if (projectId) {
        await projectService.updateCommercial(projectId, projectData);
        alert("Commercial project updated successfully");
        if (onSaveProject) onSaveProject({ ...projectData, id: projectId });
      } else {
        const response = await projectService.createCommercial(projectData);
        setProjectId(response.id);
        alert(
          `Commercial project created successfully with ID: ${response.id}`,
        );
        if (onSaveProject) onSaveProject({ ...projectData, id: response.id });
      }
    } catch (error) {
      console.error("Error saving commercial project:", error);
      alert("Failed to save project.");
    }
  };

  // Small helpers
  const calculateTotalPlotsArea = () =>
    plotsData.reduce((total, plot) => total + (parseFloat(plot.area) || 0), 0);

  const getFilledPlotsCount = () =>
    plotsData.filter(
      (plot) =>
        plot &&
        (plot.area || plot.entryPlotNo || plot.khataNo || plot.fileName),
    ).length;

  // Load brokers locally
  useEffect(() => {
    setBrokers(Array.isArray(BROKER_LIST) ? BROKER_LIST : []);
  }, []);

  const [brokers, setBrokers] = useState([]);

  // Main UI without tabs
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 space-y-6">
      {/* Project Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Commercial Project
            </h1>
            <p className="text-gray-600">
              Create and manage your commercial property project
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              <FaBuilding className="mr-1" /> Commercial
            </span>
            {projectId && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <FaCheckCircle className="mr-1" /> Project ID: {projectId}
              </span>
            )}
          </div>
        </div>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-700">
            <FaCheckCircle className="mr-2" /> {successMessage}
          </div>
        )}
      </div>

      {/* 1. Project Information Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <div className="p-2 bg-indigo-100 rounded-lg mr-3">
            <FaInfoCircle className="text-indigo-600 h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            Project Information
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Name *
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="e.g. Skyline Towers"
              disabled={isEditMode}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Type *
            </label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            >
              <option value="">Select project type</option>
                {Object.values(PROJECT_TYPES).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Commercial Sub-Type
            </label>
            <select
              value={commercialSubType}
              onChange={(e) => setCommercialSubType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            >
              <option value="">Select Sub-Type</option>
              {COMMERCIAL_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Land Area (sq.ft)
            </label>
            <input
              type="number"
              value={landArea}
              onChange={(e) => setLandArea(e.target.value === "" ? "" : parseInt(e.target.value) || 0)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="e.g. Mumbai"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Locality
            </label>
            <input
              type="text"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="e.g. Andheri West"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Land Zone
            </label>
            <input
              type="text"
              value={landZone}
              onChange={(e) => setLandZone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="Original Land Zone"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleCreateProject}
            disabled={isCreating || projectId}
            className={`px-6 py-3 rounded-lg font-medium flex items-center ${
              projectId
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {isCreating ? (
              <>
                <FaSpinner className="animate-spin mr-2" /> Creating...
              </>
            ) : projectId ? (
              <>
                <FaCheckCircle className="mr-2" /> Project Created
              </>
            ) : (
              <>
                Create Project <FaSave className="ml-2" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Revenue Plots Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-emerald-100 rounded-lg mr-3">
              <FaList className="text-emerald-600 h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Revenue Plots Configuration
            </h2>
          </div>
          {revenuePlots > 0 && (
            <button
              onClick={() => {
                setPlotsData([]);
                setRevenuePlots(0);
                setAttachment(null);
              }}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Revenue Plots
            </label>
            <input
              type="number"
              min="0"
              max="50"
              value={revenuePlots}
              onChange={(e) => {
                const v = e.target.value;
                const num = parseInt(v) || 0;
                setRevenuePlots(num);
                if (num > 0) {
                  const newPlots = [];
                  for (let i = 0; i < num; i++) {
                    newPlots.push(
                      plotsData[i] || {
                        area: "",
                        entryPlotNo: "",
                        khataNo: "",
                        fileName: "",
                        file: null,
                        plotNumber:
                          generateUniquePlotNumber(existingPlotNumbers),
                      },
                    );
                  }
                  setPlotsData(newPlots);
                } else {
                  setPlotsData([]);
                }
              }}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Attachment
            </label>
            <input
              type="file"
              onChange={(e) => setAttachment(e.target.files[0])}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            />
            {attachment && (
              <p className="text-sm text-emerald-600 mt-2 font-medium flex items-center">
                <FaCheckCircle className="mr-1" /> {attachment.name}
              </p>
            )}
          </div>
        </div>

        {revenuePlots > 0 && (
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Plot Details ({revenuePlots}{" "}
                {revenuePlots === 1 ? "Plot" : "Plots"})
              </h3>
              <span className="text-sm text-gray-600">Enter details below</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plotsData.map((plot, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all duration-300 relative group"
                >
                  <button
                    onClick={() => {
                      const updated = plotsData.filter((_, i) => i !== index);
                      setPlotsData(updated);
                      setRevenuePlots(updated.length);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 hover:scale-110 transition-all shadow-md"
                    title="Remove plot"
                  >
                    <FaTrash className="w-3 h-3" />
                  </button>

                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                    <h4 className="font-semibold text-gray-700 flex items-center">
                      <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs mr-2">
                        {index + 1}
                      </div>
                      Plot {plot.plotNumber || index + 1}
                    </h4>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Plot Area (sq. ft)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={plot?.area || ""}
                        onChange={(e) => {
                          const updated = [...plotsData];
                          updated[index] = {
                            ...updated[index],
                            area: e.target.value,
                          };
                          setPlotsData(updated);
                        }}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Entry Plot No.
                      </label>
                      <input
                        type="text"
                        value={plot?.entryPlotNo || ""}
                        onChange={(e) => {
                          const updated = [...plotsData];
                          updated[index] = {
                            ...updated[index],
                            entryPlotNo: e.target.value,
                          };
                          setPlotsData(updated);
                        }}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                        placeholder="Plot No"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Khata No.
                      </label>
                      <input
                        type="text"
                        value={plot?.khataNo || ""}
                        onChange={(e) => {
                          const updated = [...plotsData];
                          updated[index] = {
                            ...updated[index],
                            khataNo: e.target.value,
                          };
                          setPlotsData(updated);
                        }}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                        placeholder="Khata No"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Document
                      </label>
                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          const updated = [...plotsData];
                          updated[index] = {
                            ...updated[index],
                            fileName: file ? file.name : "",
                            file: file || null,
                          };
                          setPlotsData(updated);
                        }}
                        className="w-full text-sm text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-gray-100 file:text-gray-600 hover:file:bg-gray-200"
                      />
                      {plot?.fileName && (
                        <p className="text-xs text-emerald-600 mt-1 truncate font-medium">
                          ✓ {plot.fileName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="block text-emerald-900 font-semibold text-sm">
                    Total Plots Area:{" "}
                    <span className="text-lg">
                      {calculateTotalPlotsArea().toLocaleString()}
                    </span>{" "}
                    sq. ft
                  </span>
                  <span className="text-emerald-700 text-xs font-medium">
                    {getFilledPlotsCount()} of {revenuePlots} plots filled
                  </span>
                </div>

                <button
                  onClick={handleSaveRevenuePlots}
                  disabled={
                    isSavingPlots || getFilledPlotsCount() === 0 || !projectId
                  }
                  className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 flex items-center ${
                    isSavingPlots || getFilledPlotsCount() === 0 || !projectId
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white"
                  }`}
                >
                  {isSavingPlots ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" /> Saving...
                    </>
                  ) : (
                    <>
                      <FaCheckCircle className="mr-2" /> Save Plots
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Commercial Units Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Form */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-indigo-100 rounded-lg mr-3">
              <FaRulerCombined className="text-indigo-600 h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Commercial Units Configuration
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Total Commercial Units
  </label>
  <input
    type="number"
    min="1"
    value={totalUnits}
    onChange={handleTotalUnitsChange}
    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
    placeholder="Enter total units"
  />
</div>

<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Number of Floors
  </label>
  <input
    type="number"
    min="1"
    max="20"
    value={numFloors}
    onChange={handleNumFloorsChange}
    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
    placeholder="Enter number of floors"
  />
</div>

<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Total Land Area (sq.ft)
  </label>
  <input
    type="number"
    value={landArea}
    onChange={(e) => setLandArea(e.target.value === "" ? "" : parseInt(e.target.value) || 0)}
    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
    placeholder="0"
  />
</div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit Prefix
              </label>
              <input
                type="text"
                value={unitPrefix}
                onChange={(e) => setUnitPrefix(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="e.g., SHOP, OFFICE"
              />
            </div>
          </div>

          {/* Commercial Floor Configuration */}
          {numFloors > 0 && (
            <div className="mt-8 space-y-4">
              <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wider mb-4 border-b pb-2 border-gray-200">
                Floor Breakdown
              </h4>

              {floorConfigurations.map((floor, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Floor Name
                      </label>
                      <input
                        type="text"
                        value={floor.floorName}
                        onChange={(e) => {
                          const updatedConfigs = [...floorConfigurations];
                          updatedConfigs[index].floorName = e.target.value;
                          setFloorConfigurations(updatedConfigs);
                        }}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Units Count
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={floor.units}
                        onChange={(e) => {
                          const unitCount = parseInt(e.target.value) || 0;
                          const currentTotal = floorConfigurations.reduce(
                            (sum, f, i) =>
                              i === index
                                ? sum + unitCount
                                : sum + (f?.units || 0),
                            0,
                          );

                          if (currentTotal > totalUnits) {
                            alert(`Limit reached. Total units: ${totalUnits}`);
                            return;
                          }

                          const updatedConfigs = [...floorConfigurations];
                          updatedConfigs[index].units = unitCount;
                          const currentTypes =
                            updatedConfigs[index].unitTypes || [];
                          if (unitCount > currentTypes.length) {
                            updatedConfigs[index].unitTypes = [
                              ...currentTypes,
                              ...Array(unitCount - currentTypes.length).fill(
                                commercialSubType || "1bhk",
                              ),
                            ];
                          } else {
                            updatedConfigs[index].unitTypes =
                              currentTypes.slice(0, unitCount);
                          }
                          setFloorConfigurations(updatedConfigs);
                        }}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                  </div>

                  {floor.units > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Unit Types
                      </label>
                      <div className="grid grid-cols-6 gap-2">
                        {Array.from({ length: floor.units }, (_, unitIndex) => (
                          <select
                            key={unitIndex}
                            value={floor.unitTypes?.[unitIndex] || "1bhk"}
                            onChange={(e) => {
                              const updatedConfigs = [...floorConfigurations];
                              updatedConfigs[index].unitTypes[unitIndex] =
                                e.target.value;
                              setFloorConfigurations(updatedConfigs);
                            }}
                            className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm text-gray-700"
                          >
                            <option value="1bhk">1 BHK</option>
                            <option value="2bhk">2 BHK</option>
                            <option value="3bhk">3 BHK</option>
                            <option value="4bhk">4 BHK</option>
                            <option value="5bhk">5 BHK</option>
                            <option value="6bhk">6 BHK</option>
                            <option value="7bhk">7 BHK</option>
                          </select>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

<button
  onClick={generateUnits}
  disabled={
    // Convert empty strings to 0 for comparison
    floorConfigurations.reduce((sum, f) => sum + (f?.units || 0), 0) !== 
    (totalUnits === "" ? 0 : parseInt(totalUnits) || 0)
  }
  className={`
    px-6 py-3 rounded-xl font-semibold text-sm uppercase tracking-wider 
    transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]
    flex items-center justify-center gap-2 shadow-lg
    ${
      floorConfigurations.reduce((sum, f) => sum + (f?.units || 0), 0) === 
      (totalUnits === "" ? 0 : parseInt(totalUnits) || 0)
        ? "bg-linear-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white shadow-emerald-500/30"
        : "bg-linear-to-r from-slate-300 to-slate-400 text-slate-500 cursor-not-allowed shadow-slate-300/20"
    }
  `}
>
  <FaCheckCircle className="h-4 w-4" />
  Generate {totalUnits === "" ? "0" : totalUnits} Units
</button>
            </div>
          )}
        </div>

        {/* Units List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-purple-100 rounded-lg mr-3">
              <FaList className="text-purple-600 h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Generated Units ({units.length})
            </h3>
          </div>

          <div className="space-y-3 overflow-y-auto pr-2">
            {units.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8">
                <div className="p-4 bg-gray-50 rounded-full mb-3">
                  <FaList className="h-8 w-8 text-gray-300" />
                </div>
                <p>No units generated yet.</p>
              </div>
            ) : (
              units.map((unit, idx) => (
                <div
                  key={unit.id}
                  className={`relative p-3 rounded-lg border flex items-center cursor-pointer transition-all duration-200 ${
                    selectedUnit?.id === unit.id
                      ? "bg-indigo-100 border-indigo-300 shadow-sm"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  }`}
                  onClick={() => handleUnitClick(unit)}
                >
                  <span
                    className={`font-medium text-sm w-6 h-6 flex items-center justify-center rounded ${selectedUnit?.id === unit.id ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"}`}
                  >
                    {idx + 1}
                  </span>
                  <div className="flex-1 ml-3">
                    <h4
                      className={`font-medium text-sm ${selectedUnit?.id === unit.id ? "text-indigo-800" : "text-gray-800"}`}
                    >
                      {unit.name}
                    </h4>
                    <p
                      className={`text-xs mt-0.5 ${selectedUnit?.id === unit.id ? "text-indigo-600" : "text-gray-500"}`}
                    >
                      {unit.floor} • {unit.roomType}
                    </p>
                  </div>
                  {unit.isComplete && (
                    <div
                      className={`p-1 rounded-full ${selectedUnit?.id === unit.id ? "bg-white" : "bg-emerald-50"}`}
                    >
                      <FaCheckCircle
                        className={`${selectedUnit?.id === unit.id ? "text-emerald-500" : "text-emerald-500"} h-3 w-3`}
                      />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Floating Unit Indicator Bar */}
{selectedUnit && (
  <div className="fixed bottom-52 right-6 bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-xl rounded-lg border border-indigo-300/30 p-3 z-40 max-w-xs">
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
          <FaHome className="text-white h-4 w-4" />
        </div>
        <div>
          <p className="text-xs text-white/80 font-medium">Editing Unit</p>
          <p className="text-sm font-semibold text-white">{selectedUnit.name}</p>
        </div>
      </div>
      {selectedUnit.isComplete && (
        <FaCheckCircle className="text-emerald-300 h-4 w-4 shrink-0" />
      )}
    </div>
  </div>
)}

      {/* 4. Unit Details Section */}
      {selectedUnit && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Unit Header */}
          <div className="bg-linear-to-r from-indigo-600 to-indigo-800 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <FaBuilding className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                      {selectedUnit.name}
                    </h2>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                        {selectedUnit.floor}
                      </span>
                      <span className="bg-amber-500/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                        {selectedUnit.roomType}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          selectedUnit.status === "Available"
                            ? "bg-emerald-500/20 text-emerald-100"
                            : "bg-rose-500/20 text-rose-100"
                        }`}
                      >
                        {selectedUnit.status || "Available"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={updateUnitDetails}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <FaCheckCircle className="h-4 w-4" /> Update Unit
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Commercial Features */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-700">
                  <FaStar className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Commercial Features
                  </h3>
                  <p className="text-slate-500 text-sm">Unit specifications</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Left Column */}
                <div className="space-y-5">
                  {/* Level / Title */}
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                      <FaBuilding className="h-3.5 w-3.5 text-slate-400" />
                      Level / Title
                    </label>
                    <div className="flex gap-2">
                      {["Lower Basement", "Upper Basement", "Ground"].map(
                        (title) => (
                          <button
                            key={title}
                            onClick={() =>
                              setPropertyFeatures({
                                ...propertyFeatures,
                                bookTitle: title,
                              })
                            }
                            className={`flex-1 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                              propertyFeatures.bookTitle === title
                                ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
                                : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                            }`}
                          >
                            {title}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Total Rooms */}
                  <div>
                    <label className=" text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                      <FaDoorOpen className="h-3.5 w-3.5 text-slate-400" />
                      Total Rooms
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="14"
                      value={propertyFeatures.totalRooms || ""}
                      onChange={(e) =>
                        setPropertyFeatures({
                          ...propertyFeatures,
                          totalRooms: e.target.value,
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none text-slate-900"
                      placeholder="Enter count"
                    />
                  </div>

                  {/* Personal Washroom */}
                  <div>
                    <label className=" text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                      <FaBath className="h-3.5 w-3.5 text-slate-400" />
                      Personal Washroom
                    </label>
                    <div className="flex gap-2">
                      {["Yes", "No"].map((opt) => (
                        <button
                          key={opt}
                          onClick={() =>
                            setPropertyFeatures({
                              ...propertyFeatures,
                              personalWashroom: opt,
                            })
                          }
                          className={`flex-1 px-3 py-2.5 rounded-lg border text-sm transition-colors ${
                            propertyFeatures.personalWashroom === opt
                              ? opt === "Yes"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-rose-50 text-rose-700 border-rose-200"
                              : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-5">
                  {/* Furnished Status */}
                  <div>
                    <label className=" text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                      <FaHome className="h-3.5 w-3.5 text-slate-400" />
                      Furnished Status
                    </label>
                    <div className="flex gap-2">
                      {["Furnished", "Unfurnished"].map((opt) => (
                        <button
                          key={opt}
                          onClick={() =>
                            setPropertyFeatures({
                              ...propertyFeatures,
                              furnishedStatus: opt,
                            })
                          }
                          className={`flex-1 px-3 py-2.5 rounded-lg border text-sm transition-colors ${
                            propertyFeatures.furnishedStatus === opt
                              ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                              : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Washrooms Count */}
                  <div>
                    <label className=" text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                      <FaBath className="h-3.5 w-3.5 text-slate-400" />
                      Washrooms Count
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={propertyFeatures.washrooms || ""}
                      onChange={(e) =>
                        setPropertyFeatures({
                          ...propertyFeatures,
                          washrooms: e.target.value,
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none text-slate-900"
                      placeholder="Number of washrooms"
                    />
                  </div>

                  {/* Facilities */}
{/* Facilities */}
<div>
  <div className="flex items-center justify-between mb-3">
    <label className=" text-sm font-medium text-slate-700 flex items-center gap-2">
      <FaCogs className="h-3.5 w-3.5 text-slate-400" />
      Facilities
    </label>
    <button
      onClick={() => {
        const facilityName = prompt("Enter new facility name:");
        if (facilityName && facilityName.trim()) {
          const trimmedName = facilityName.trim();
          const newKey = trimmedName.toLowerCase().replace(/\s+/g, '_');
          
          // Add to property features
          setPropertyFeatures({
            ...propertyFeatures,
            [newKey]: true,
          });
          
          // Add to custom facilities array
          setCustomFacilities([...customFacilities, {
            key: newKey,
            label: trimmedName
          }]);
        }
      }}
      className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 transition-colors"
    >
      <FaPlus className="h-3 w-3" />
      Add New
    </button>
  </div>

  <div className="flex flex-wrap gap-2 mb-3">
    {/* Predefined Facilities */}
    {FACILITIES.slice(0, 6).map((facility) => (
      <button
        key={facility.key}
        onClick={() =>
          setPropertyFeatures({
            ...propertyFeatures,
            [facility.key]: !propertyFeatures[facility.key],
          })
        }
        className={`px-3 py-2 rounded-lg border text-xs transition-colors flex items-center gap-1.5 ${
          propertyFeatures[facility.key]
            ? "bg-indigo-100 text-indigo-700 border-indigo-200"
            : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
        }`}
      >
        {facility.label}
        {propertyFeatures[facility.key] && (
          <FaCheckCircle className="h-2.5 w-2.5" />
        )}
      </button>
    ))}
    
    {/* Custom Facilities */}
    {customFacilities.map((facility) => (
      <div
        key={facility.key}
        className="group relative"
      >
        <button
          onClick={() =>
            setPropertyFeatures({
              ...propertyFeatures,
              [facility.key]: !propertyFeatures[facility.key],
            })
          }
          className={`px-3 py-2 rounded-lg border text-xs transition-colors flex items-center gap-1.5 ${
            propertyFeatures[facility.key]
              ? "bg-emerald-100 text-emerald-700 border-emerald-200"
              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
          }`}
        >
          {facility.label}
          {propertyFeatures[facility.key] && (
            <FaCheckCircle className="h-2.5 w-2.5" />
          )}
        </button>
        
        {/* Delete button for custom facilities */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Remove from custom facilities
            setCustomFacilities(customFacilities.filter(f => f.key !== facility.key));
            
            // Remove from property features
            if (propertyFeatures[facility.key]) {
              const newFeatures = { ...propertyFeatures };
              delete newFeatures[facility.key];
              setPropertyFeatures(newFeatures);
            }
          }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600"
          title="Remove facility"
        >
          ×
        </button>
      </div>
    ))}
  </div>
</div>
                </div>
              </div>
            </div>

            {/* Area Details */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700">
                  <FaRulerCombined className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Area Specifications
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Unit dimensions in square feet
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    label: "Carpet Area",
                    key: "carpetArea",
                    icon: <FaRuler className="h-3.5 w-3.5 text-emerald-600" />,
                  },
                  {
                    label: "Built-up Area",
                    key: "builtUpArea",
                    icon: <FaRuler className="h-3.5 w-3.5 text-blue-600" />,
                  },
                  {
                    label: "Super Built-up Area",
                    key: "superBuiltUpArea",
                    icon: (
                      <FaRulerCombined className="h-3.5 w-3.5 text-purple-600" />
                    ),
                  },
                  {
                    label: "Construction Area",
                    key: "constructionArea",
                    icon: <FaHardHat className="h-3.5 w-3.5 text-amber-600" />,
                  },
                ].map((item) => (
                  <div key={item.key}>
                    <label className=" text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                      {item.icon}
                      {item.label}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        value={areaDetails[item.key]}
                        onChange={(e) =>
                          setAreaDetails({
                            ...areaDetails,
                            [item.key]: e.target.value,
                          })
                        }
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none text-slate-900 pr-12"
                        placeholder="0"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                        sq.ft
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center text-amber-700">
                  <FaMoneyBill className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Pricing Details
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Financial specifications
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Expected Price */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Expected Price (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">
                      ₹
                    </span>
                    <input
                      type="text"
                      value={priceDetails.expectedPrice}
                      onChange={(e) =>
                        setPriceDetails({
                          ...priceDetails,
                          expectedPrice: e.target.value,
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none text-slate-900"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Token Amount */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Token Amount (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">
                      ₹
                    </span>
                    <input
                      type="text"
                      value={priceDetails.tokenAmount}
                      onChange={(e) =>
                        setPriceDetails({
                          ...priceDetails,
                          tokenAmount: e.target.value,
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none text-slate-900"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Customer & Personnel */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-700">
                  <FaUserTie className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Customer & Personnel
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Associated parties information
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Contractor */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <FaHardHat className="h-3.5 w-3.5 text-slate-400" />
                    Contractor
                  </label>
                  <input
                    type="text"
                    value={constructorName}
                    onChange={(e) => setConstructor(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none text-slate-900"
                    placeholder="Contractor name"
                  />
                </div>

                {/* Customer & Broker */}
                <div>
                  <label className=" text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <FaUsers className="h-3.5 w-3.5 text-slate-400" />
                    Broker 
                  </label>
                  <input
                    type="text"
                    placeholder="Broker Name"
                    value={purchaser}
                    onChange={(e) => setPurchaser(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 mb-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none text-slate-900"
                  />
             
                </div>



                {/* Staff Engaged */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <FaUserTie className="h-3.5 w-3.5 text-slate-400" />
                    Staff Engaged
                  </label>
                  <input
                    type="text"
                    value={staffEngaged}
                    onChange={(e) => setStaffEngaged(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none text-slate-900"
                    placeholder="Staff Name/ID"
                  />
                </div>
              </div>


            </div>
          </div>
        </div>
      )}

      {/* 5. Save Project Section */}
      <div className="sticky bottom-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl border border-gray-200 shadow-lg z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-2 w-32 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{
                  width: `${(units.length / (totalUnits || 1)) * 100}%`,
                }}
              />
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">
                {units.length}
              </span>{" "}
              units assigned
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSaveProject}
              className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center"
            >
              <FaSave className="mr-2" /> Save Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommercialProject;
