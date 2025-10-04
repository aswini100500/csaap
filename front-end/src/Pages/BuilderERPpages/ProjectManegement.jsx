
import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaTimes,
  FaCheck,
  FaSave,
  FaList,
  FaCheckCircle,
  FaQuestionCircle,
  FaExchangeAlt,
  FaBuilding,
  FaTrash,
  FaEdit,
  FaHome,
  FaRoad,
  FaRulerCombined,
  FaMoneyBill,
  FaUserTie,
  FaUser,
  FaChevronDown,
  FaChevronUp,
  FaInfoCircle,
  FaBed,
  FaBath,
  FaCar,
  FaSwimmingPool,
  FaTree,
  FaMapMarkerAlt,
  FaDollarSign,
  FaFileAlt,
  FaShieldAlt,
  FaCalendarAlt,
  FaUsers,
} from "react-icons/fa";

const ProjectManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [expandedProject, setExpandedProject] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [city, setCity] = useState("");
  const [locality, setLocality] = useState("");
  const [landZone, setLandZone] = useState("");
  const [commercialSubType, setCommercialSubType] = useState("");
  const [numPlots, setNumPlots] = useState(1);
  const [plots, setPlots] = useState([]);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [customFacilities, setCustomFacilities] = useState([]);
  const [unitCustomFacilities, setUnitCustomFacilities] = useState([]);
  const [isCornerPlot, setIsCornerPlot] = useState(false);

  const [priceDetails, setPriceDetails] = useState({
    expectedPrice: "",
    tokenAmount: "",
    priceNegotiable: false,
  });
  const [propertyFeatures, setPropertyFeatures] = useState({
    openSides: "",
    roadWidth: "",
    constructionDone: "",
    boundaryWall: "",
    gatedColony: "",
    totalFloor: "",
    parking: false,
    gym: false,
    swimmingPool: false,
    garden: false,
    gameZone: false,
  });
  const [areaDetails, setAreaDetails] = useState({
    plotArea: "",
    plotLength: "",
    plotBreadth: "",
  });
  const [kissama, setKissama] = useState("");
  const [boundary, setBoundary] = useState("");
  const [broker, setBroker] = useState("");
  const [purchaser, setPurchaser] = useState("");
  const [constructor, setConstructor] = useState(""); // Added constructor state

  // Duplex/Apartment/Commercial-specific state
  const [unitNamePrefix, setUnitNamePrefix] = useState("");
  const [numUnits, setNumUnits] = useState(1);
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [duplexPropertyFeatures, setDuplexPropertyFeatures] = useState({
    bedrooms: 0,
    bathrooms: 0,
    balconies: 0,
    furnishedStatus: "Unfurnished",
    floorNo: "",
    totalFloors: "",
    parking: 0,
    gym: false,
    swimmingPool: false,
    garden: false,
    gameZone: false,
    constructionStatus: "Under Construction",
  });
  const [duplexAreaDetails, setDuplexAreaDetails] = useState({
    landArea: "",
    landLength: "",
    landBreadth: "",
    constructionArea: "",
    superBuiltUpArea: "",
    builtUpArea: "",
    carpetArea: "",
  });
  const [approvalStatus, setApprovalStatus] = useState([
    { authority: "", status: "" },
    { authority: "", status: "" },
  ]);
  const [transactionType, setTransactionType] = useState({
    possessionStatus: "",
    availableFrom: { month: "", year: "" },
  });

  // Sample broker data
  const brokerList = [
    { id: 1, name: "John Smith", phone: "+1 (555) 123-4567" },
    { id: 2, name: "Emma Johnson", phone: "+1 (555) 234-5678" },
    { id: 3, name: "Michael Williams", phone: "+1 (555) 345-6789" },
    { id: 4, name: "Sarah Brown", phone: "+1 (555) 456-7890" },
    { id: 5, name: "David Jones", phone: "+1 (555) 567-8901" },
  ];

  // New state for editing
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [showCustomizeSelect, setShowCustomizeSelect] = useState(false);

  // New state for viewing project details in form style
  const [viewProjectId, setViewProjectId] = useState(null);
  const [viewProjectData, setViewProjectData] = useState(null);

  // State for editing specific plot/unit from table
  const [editingPlotFromTable, setEditingPlotFromTable] = useState(null);
  const [editingUnitFromTable, setEditingUnitFromTable] = useState(null);

  const resetForm = () => {
    setProjectName("");
    setProjectType("");
    setCity("");
    setLocality("");
    setLandZone("");
    setCommercialSubType("");
    setNumPlots(1);
    setPlots([]);
    setSelectedPlot(null);
    setIsCornerPlot(false);
    setPriceDetails({
      expectedPrice: "",
      tokenAmount: "",
      priceNegotiable: false,
    });
    setPropertyFeatures({
      openSides: "",
      roadWidth: "",
      constructionDone: "",
      boundaryWall: "",
      gatedColony: "",
      totalFloor: "",
      parking: false,
      gym: false,
      swimmingPool: false,
      garden: false,
      gameZone: false,
    });
    setAreaDetails({
      plotArea: "",
      plotLength: "",
      plotBreadth: "",
    });
    setKissama("");
    setBoundary("");
    setBroker("");
    setPurchaser("");
    setConstructor(""); // Reset constructor
    // Reset duplex/apartment/commercial-specific state
    setUnitNamePrefix("");
    setNumUnits(1);
    setUnits([]);
    setSelectedUnit(null);
    setDuplexPropertyFeatures({
      bedrooms: 0,
      bathrooms: 0,
      balconies: 0,
      furnishedStatus: "Unfurnished",
      floorNo: "",
      totalFloors: "",
      parking: 0,
      gym: false,
      swimmingPool: false,
      garden: false,
      gameZone: false,
      constructionStatus: "Under Construction",
    });
    setDuplexAreaDetails({
      landArea: "",
      landLength: "",
      landBreadth: "",
      constructionArea: "",
      superBuiltUpArea: "",
      builtUpArea: "",
      carpetArea: "",
    });
    setApprovalStatus([
      { authority: "", status: "" },
      { authority: "", status: "" },
    ]);
    setTransactionType({
      possessionStatus: "",
      availableFrom: { month: "", year: "" },
    });
    setCustomFacilities([]);
    setUnitCustomFacilities([]);
    setEditingProjectId(null);
    setEditingPlotFromTable(null);
    setEditingUnitFromTable(null);
    setShowCustomizeSelect(false);
  };

  const isPlotBased =
    projectType === "plotting" ||
    (projectType === "commercial" && commercialSubType === "land");
  const isUnitBased =
    projectType === "duplex" ||
    projectType === "apartment" ||
    (projectType === "commercial" && commercialSubType !== "land");

  useEffect(() => {
    if (projectType === "commercial" && commercialSubType) {
      setPlots([]);
      setUnits([]);
      setSelectedPlot(null);
      setSelectedUnit(null);
    }
  }, [commercialSubType]);

  const generatePlots = () => {
    const newPlots = [];
    // Find max id
    const maxId = plots.length > 0 ? Math.max(...plots.map((p) => p.id)) : 0;
    for (let i = 1; i <= numPlots; i++) {
      newPlots.push({
        id: maxId + i,
        name: `Plot ${maxId + i}`,
        isCornerPlot: false,
        priceDetails: {
          expectedPrice: "",
          tokenAmount: "",
          priceNegotiable: false,
        },
        propertyFeatures: {
          openSides: "",
          roadWidth: "",
          constructionDone: "",
          boundaryWall: "",
          gatedColony: "",
          totalFloor: "",
          parking: false,
          gym: false,
          swimmingPool: false,
          garden: false,
          gameZone: false,
        },
        areaDetails: {
          plotArea: "",
          plotLength: "",
          plotBreadth: "",
        },
        kissama: "",
        boundary: "",
        broker: "",
        purchaser: "",
        constructor: "", // Added constructor
        approvalStatus: [
          { authority: "", status: "" },
          { authority: "", status: "" },
        ],
        transactionType: {
          possessionStatus: "",
          availableFrom: { month: "", year: "" },
        },
        isComplete: false, // Track if plot has complete data
      });
    }
    setPlots([...plots, ...newPlots]);
    setNumPlots(1);
    setNumPlots(1); // Reset to 1 after generating
    if (newPlots.length > 0) {
      setSelectedPlot(newPlots[0]);
      setIsCornerPlot(newPlots[0].isCornerPlot);
      setPriceDetails(newPlots[0].priceDetails);
      setPropertyFeatures(newPlots[0].propertyFeatures);
      setAreaDetails(newPlots[0].areaDetails);
      setKissama(newPlots[0].kissama);
      setBoundary(newPlots[0].boundary);
      setBroker(newPlots[0].broker);
      setPurchaser(newPlots[0].purchaser);
      setConstructor(newPlots[0].constructor);
      setApprovalStatus(newPlots[0].approvalStatus);
      setTransactionType(newPlots[0].transactionType);
    }
  };

  const generateUnits = () => {
    const newUnits = [];
    const maxId = units.length > 0 ? Math.max(...units.map((u) => u.id)) : 0;
    for (let i = 1; i <= numUnits; i++) {
      newUnits.push({
        id: maxId + i,
        name: `${unitNamePrefix} ${maxId + i}`,
        propertyFeatures: {
          bedrooms: 0,
          bathrooms: 0,
          balconies: 0,
          furnishedStatus: "Unfurnished",
          floorNo: "",
          totalFloors: "",
          parking: 0,
          gym: false,
          swimmingPool: false,
          garden: false,
          gameZone: false,
          constructionStatus: "Under Construction",
        },
        areaDetails: {
          landArea: "",
          landLength: "",
          landBreadth: "",
          constructionArea: "",
          superBuiltUpArea: "",
          builtUpArea: "",
          carpetArea: "",
        },
        approvalStatus: [
          { authority: "", status: "" },
          { authority: "", status: "" },
        ],
        transactionType: {
          possessionStatus: "",
          availableFrom: { month: "", year: "" },
        },
        priceDetails: {
          expectedPrice: "",
          tokenAmount: "",
          priceNegotiable: false,
        },
        broker: "",
        purchaser: "",
        constructor: "", // Added constructor
        isComplete: false, // Track if unit has complete data
      });
    }
    setUnits([...units, ...newUnits]);
    setNumUnits(1);
    if (newUnits.length > 0) {
      setSelectedUnit(newUnits[0]);
      setDuplexPropertyFeatures(newUnits[0].propertyFeatures);
      setDuplexAreaDetails(newUnits[0].areaDetails);
      setApprovalStatus(newUnits[0].approvalStatus);
      setTransactionType(newUnits[0].transactionType);
      setPriceDetails(newUnits[0].priceDetails);
      setBroker(newUnits[0].broker);
      setPurchaser(newUnits[0].purchaser);
      setConstructor(newUnits[0].constructor);
    }
  };

  const handlePlotClick = (plot) => {
    setSelectedPlot(plot);
    setIsCornerPlot(plot.isCornerPlot);
    setPriceDetails(plot.priceDetails);
    setPropertyFeatures(plot.propertyFeatures);
    setAreaDetails(plot.areaDetails);
    setKissama(plot.kissama);
    setBoundary(plot.boundary);
    setBroker(plot.broker);
    setPurchaser(plot.purchaser);
    setConstructor(plot.constructor);
    setApprovalStatus(plot.approvalStatus);
    setTransactionType(plot.transactionType);
  };

  const handleUnitClick = (unit) => {
    setSelectedUnit(unit);
    setDuplexPropertyFeatures(unit.propertyFeatures);
    setDuplexAreaDetails(unit.areaDetails);
    setApprovalStatus(unit.approvalStatus);
    setTransactionType(unit.transactionType);
    setPriceDetails(unit.priceDetails);
    setBroker(unit.broker);
    setPurchaser(unit.purchaser);
    setConstructor(unit.constructor);
  };

  const updatePlotDetails = () => {
    if (!selectedPlot) return;

    const updatedPlots = plots.map((plot) => {
      if (plot.id === selectedPlot.id) {
        const updatedPlot = {
          ...plot,
          isCornerPlot,
          priceDetails,
          propertyFeatures,
          areaDetails,
          kissama,
          boundary,
          broker,
          purchaser,
          constructor,
          approvalStatus,
          transactionType,
        };
        // Check if plot is complete
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
    setSelectedPlot(updatedPlots.find((p) => p.id === selectedPlot.id));
    alert("Plot details updated successfully!");
  };

  const updateUnitDetails = () => {
    if (!selectedUnit) return;

    const updatedUnits = units.map((unit) => {
      if (unit.id === selectedUnit.id) {
        const updatedUnit = {
          ...unit,
          propertyFeatures: duplexPropertyFeatures,
          areaDetails: duplexAreaDetails,
          approvalStatus,
          transactionType,
          priceDetails,
          broker,
          purchaser,
          constructor,
        };
        // Check if unit is complete
        updatedUnit.isComplete = !!(
          priceDetails.expectedPrice &&
          duplexAreaDetails.carpetArea &&
          purchaser &&
          constructor
        );
        return updatedUnit;
      }
      return unit;
    });

    setUnits(updatedUnits);
    setSelectedUnit(updatedUnits.find((u) => u.id === selectedUnit.id));
    alert("Unit details updated successfully!");
  };

  const handleSaveProject = () => {
    if (!projectName || !projectType) {
      alert("Please enter project name and type");
      return;
    }

    if (isPlotBased) {
      updatePlotDetails();
    } else if (isUnitBased) {
      updateUnitDetails();
    }

    const projectData = {
      id: editingProjectId || Date.now(),
      name: projectName,
      type: projectType,
      city,
      locality,
      landZone,
      commercialSubType: projectType === "commercial" ? commercialSubType : "",
      plots: isPlotBased ? [...plots] : [],
      units: isUnitBased ? [...units] : [],
      createdAt: editingProjectId
        ? projects.find((p) => p.id === editingProjectId).createdAt
        : new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString(),
    };

    if (editingProjectId) {
      setProjects(
        projects.map((p) => (p.id === editingProjectId ? projectData : p))
      );
      alert("Project updated successfully!");
    } else {
      setProjects([...projects, projectData]);
      alert("Project saved successfully!");
    }
    resetForm();
    setShowForm(false);
  };

  const deleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((project) => project.id !== id));
      if (expandedProject === id) {
        setExpandedProject(null);
      }
    }
  };

  const editProject = (project) => {
    setEditingProjectId(project.id);
    setProjectName(project.name);
    setProjectType(project.type);
    setCity(project.city || "");
    setLocality(project.locality || "");
    setLandZone(project.landZone || "");
    setCommercialSubType(project.commercialSubType || "");

    if (
      project.type === "plotting" ||
      (project.type === "commercial" && project.commercialSubType === "land")
    ) {
      setNumPlots(1);
      setPlots(project.plots || []);
      if (project.plots && project.plots.length > 0) {
        handlePlotClick(project.plots[0]);
      }
    } else {
      setUnitNamePrefix("");
      setNumUnits(1);
      setUnits(project.units || []);
      if (project.units && project.units.length > 0) {
        handleUnitClick(project.units[0]);
      }
    }
    setShowForm(true);
    setShowCustomizeSelect(false);
  };

  // Function to edit plot from table
  const editPlotFromTable = (project, plot) => {
    setEditingProjectId(project.id);
    setProjectName(project.name);
    setProjectType(project.type);
    setCity(project.city || "");
    setLocality(project.locality || "");
    setLandZone(project.landZone || "");
    setCommercialSubType(project.commercialSubType || "");

    // Set plots and select the specific plot
    setNumPlots(1);
    setPlots(project.plots || []);
    handlePlotClick(plot);
    setEditingPlotFromTable(plot.id);

    setShowForm(true);
    setShowCustomizeSelect(false);
  };

  // Function to edit unit from table
  const editUnitFromTable = (project, unit) => {
    setEditingProjectId(project.id);
    setProjectName(project.name);
    setProjectType(project.type);
    setCity(project.city || "");
    setLocality(project.locality || "");
    setLandZone(project.landZone || "");
    setCommercialSubType(project.commercialSubType || "");

    // Set units and select the specific unit
    setUnitNamePrefix("");
    setNumUnits(1);
    setUnits(project.units || []);
    handleUnitClick(unit);
    setEditingUnitFromTable(unit.id);

    setShowForm(true);
    setShowCustomizeSelect(false);
  };

  const toggleProjectExpansion = (id) => {
    if (expandedProject === id) {
      setExpandedProject(null);
    } else {
      setExpandedProject(id);
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return "-";
    return `₹${parseInt(amount).toLocaleString("en-IN")}`;
  };

  const getStatusBadge = (status) => {
    const badges = {
      Approved: { bg: "bg-green-100 text-green-800" },
      Pending: { bg: "bg-yellow-100 text-yellow-800" },
      Rejected: { bg: "bg-red-100 text-red-800" },
      Applied: { bg: "bg-blue-100 text-blue-800" },
    };
    return badges[status] || { bg: "bg-gray-100 text-gray-800", icon: "⚪" };
  };

  const addApprovalAuthority = () => {
    setApprovalStatus([...approvalStatus, { authority: "", status: "" }]);
  };

  const removeApprovalAuthority = (index) => {
    if (approvalStatus.length > 1) {
      const updatedApprovalStatus = [...approvalStatus];
      updatedApprovalStatus.splice(index, 1);
      setApprovalStatus(updatedApprovalStatus);
    }
  };

  const handleApprovalChange = (index, field, value) => {
    const updatedApprovalStatus = [...approvalStatus];
    updatedApprovalStatus[index][field] = value;
    setApprovalStatus(updatedApprovalStatus);
  };

  const handleProjectTypeChange = (e) => {
    const newType = e.target.value;
    setProjectType(newType);
    if (newType === "custom") {
      setShowCustomizeSelect(true);
    } else {
      setShowCustomizeSelect(false);
    }
  };

  const handleCustomizeTypeSelect = (selectedType) => {
    const previousProjects = projects.filter((p) => p.type === selectedType);
    const previousProject = previousProjects[previousProjects.length - 1];

    if (previousProject) {
      setProjectName(`${previousProject.name} (Customized)`);
      setCity(previousProject.city || "");
      setLocality(previousProject.locality || "");
      setLandZone(previousProject.landZone || "");
      if (selectedType === "commercial") {
        setCommercialSubType(previousProject.commercialSubType || "");
      }

      if (
        selectedType === "plotting" ||
        (selectedType === "commercial" &&
          previousProject.commercialSubType === "land")
      ) {
        setNumPlots(1);
        setPlots(
          previousProject.plots?.map((plot, index) => ({
            ...plot,
            id: index + 1,
          })) || []
        );
        if (previousProject.plots && previousProject.plots.length > 0) {
          handlePlotClick(previousProject.plots[0]);
        }
      } else {
        setUnitNamePrefix("");
        setNumUnits(1);
        setUnits(
          previousProject.units?.map((unit, index) => ({
            ...unit,
            id: index + 1,
          })) || []
        );
        if (previousProject.units && previousProject.units.length > 0) {
          handleUnitClick(previousProject.units[0]);
        }
      }
    } else {
      resetForm();
    }

    setProjectType(selectedType);
    setShowCustomizeSelect(false);
  };

  const handleViewProject = (project) => {
    setViewProjectData(project);
    setViewProjectId(project.id);
  };

  const closeViewProject = () => {
    setViewProjectId(null);
    setViewProjectData(null);
  };

  // Helper function to check if plot/unit has data
  const hasData = (item) => {
    return !!(
      item.priceDetails?.expectedPrice ||
      item.areaDetails?.plotArea ||
      item.areaDetails?.carpetArea ||
      item.purchaser ||
      item.broker ||
      item.constructor
    );
  };

  // Enhanced Project Details Component
  const ProjectDetailsTable = ({ project }) => {
    // Ensure we have plots or units even if empty arrays
    const allPlots = project.plots || [];
    const allUnits = project.units || [];

    // Filter only incomplete plots or units
    const incompletePlots = allPlots.filter((plot) => !plot.isComplete);
    const incompleteUnits = allUnits.filter((unit) => !unit.isComplete);

    // Filter completed for summary
    const completedPlots = allPlots.filter((plot) => plot.isComplete);
    const completedUnits = allUnits.filter((unit) => unit.isComplete);

    return (
      <div className="space-y-6 ">
        {/* Project Summary - Made clickable */}
        <div
          className=" bg-blue-50 p-4 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-100 transition duration-200"
          onClick={() => handleViewProject(project)}
        >
          <h4 className="text-lg font-semibold text-blue-800 mb-2 flex items-center">
            <FaBuilding className="mr-2" />
            Project Summary (Click to view full details)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Location:</span>
              <p className="font-medium">
                {project.city}, {project.locality}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Type:</span>
              <p className="font-medium capitalize">
                {project.type}{" "}
                {project.commercialSubType
                  ? `(${project.commercialSubType})`
                  : ""}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Total:</span>
              <p className="font-medium">
                {allPlots.length || allUnits.length || 0}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Zone:</span>
              <p className="font-medium">{project.landZone || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Detailed Plots/Units Table - Show only incomplete items */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaList className="mr-2" />
              {incompletePlots.length > 0 ? "Pending Plots Details" : "Pending Units Details"} (
              {incompletePlots.length || incompleteUnits.length} pending)
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {incompletePlots.length > 0 ? "Plot" : "Unit"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Area Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Features
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Broker
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Purchaser
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Constructor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  {incompletePlots.length > 0 && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Corner Plot
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {incompletePlots.length > 0
                  ? incompletePlots.map((plot, index) => (
                      <ProjectPlotRow
                        key={plot.id || index}
                        plot={plot}
                        project={project}
                        onEdit={() => editPlotFromTable(project, plot)}
                      />
                    ))
                  : incompleteUnits.map((unit, index) => (
                      <ProjectUnitRow
                        key={unit.id || index}
                        unit={unit}
                        project={project}
                        onEdit={() => editUnitFromTable(project, unit)}
                      />
                    ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary of completion status */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Completion Summary
          </h4>
          {allPlots.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-blue-600">
                  {completedPlots.length}
                </div>
                <div className="text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-600">
                  {incompletePlots.length}
                </div>
                <div className="text-gray-600">Pending</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-green-600">
                  {Math.round(
                    (completedPlots.length /
                      allPlots.length) *
                      100
                  ) || 0}
                  %
                </div>
                <div className="text-gray-600">Completion Rate</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-indigo-600">
                  {allPlots.length}
                </div>
                <div className="text-gray-600">Total</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-blue-600">
                  {completedUnits.length}
                </div>
                <div className="text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-600">
                  {incompleteUnits.length}
                </div>
                <div className="text-gray-600">Pending</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-green-600">
                  {Math.round(
                    (completedUnits.length /
                      allUnits.length) *
                      100
                  ) || 0}
                  %
                </div>
                <div className="text-gray-600">Completion Rate</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-indigo-600">
                  {allUnits.length}
                </div>
                <div className="text-gray-600">Total</div>
              </div>
            </div>
          )}
        </div>

        {/* Approval Status */}
        {(allPlots.length > 0 && allPlots[0]?.approvalStatus) ||
        (allUnits.length > 0 && allUnits[0]?.approvalStatus) ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                <FaShieldAlt className="mr-2" />
                Approval Status
              </h4>
            </div>
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  ...new Set(
                    [
                      ...(allPlots[0]?.approvalStatus || []),
                      ...(allUnits[0]?.approvalStatus || []),
                    ].filter((item) => item.authority && item.status)
                  ),
                ].map((approval, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="font-medium text-gray-900 mb-1">
                      {approval.authority}
                    </div>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        getStatusBadge(approval.status).bg
                      }`}
                    >
                      {getStatusBadge(approval.status).icon} {approval.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* Transaction Details */}
        {(allPlots.length > 0 && allPlots[0]?.transactionType) ||
        (allUnits.length > 0 && allUnits[0]?.transactionType) ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
         
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Possession Status:</span>
                  <p className="font-medium capitalize">
                    {allPlots[0]?.transactionType?.possessionStatus ||
                      allUnits[0]?.transactionType?.possessionStatus ||
                      "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Available From:</span>
                  <p className="font-medium">
                    {allPlots[0]?.transactionType?.availableFrom?.month ||
                      allUnits[0]?.transactionType?.availableFrom?.month ||
                      "N/A"}{" "}
                    {allPlots[0]?.transactionType?.availableFrom?.year ||
                      allUnits[0]?.transactionType?.availableFrom?.year ||
                      ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  // Plot Row Component - Enhanced for empty data display
  const ProjectPlotRow = ({ plot, project, onEdit }) => {
    const brokerName =
      brokerList.find((b) => b.id == plot.broker)?.name || "N/A";
    const hasPlotData = hasData(plot);

    return (
      <tr
        className={`transition duration-200 cursor-pointer ${
          hasPlotData ? "hover:bg-blue-50" : "hover:bg-gray-50"
        } ${!hasPlotData ? "opacity-60" : ""}`}
        onClick={onEdit}
      >
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  hasPlotData ? "bg-indigo-100" : "bg-gray-200"
                }`}
              >
                <FaHome
                  className={`h-5 w-5 ${
                    hasPlotData ? "text-indigo-600" : "text-gray-400"
                  }`}
                />
              </div>
            </div>
            <div className="ml-4">
              <div
                className={`text-sm font-medium ${
                  hasPlotData ? "text-gray-900" : "text-gray-900 font-bold"
                }`}
              >
                {plot.name}
              </div>
              {plot.kissama && (
                <div
                  className={`text-xs ${
                    hasPlotData ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  {plot.kissama}
                </div>
              )}
              {!hasPlotData && (
                <div className="text-xs text-gray-400 mt-1">
                  Click to add details
                </div>
              )}
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          <div
            className={`text-sm ${
              hasPlotData ? "text-gray-900" : "text-gray-500 italic"
            }`}
          >
            {plot.areaDetails?.plotArea
              ? `${plot.areaDetails.plotArea} sq-yd`
              : "N/A"}
          </div>
          {plot.areaDetails?.plotLength && plot.areaDetails?.plotBreadth && (
            <div
              className={`text-xs ${
                hasPlotData ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {plot.areaDetails.plotLength} × {plot.areaDetails.plotBreadth} yd
            </div>
          )}
          {!hasPlotData && (
            <div className="text-xs text-gray-400 mt-1">Add area details</div>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {hasPlotData ? (
            <>
              <div className="text-gray-900">
                {formatCurrency(plot.priceDetails?.expectedPrice)}
              </div>
              {plot.priceDetails?.tokenAmount && (
                <div className="text-xs text-gray-500">
                  Token: {formatCurrency(plot.priceDetails.tokenAmount)}
                </div>
              )}
              {plot.priceDetails?.priceNegotiable && (
                <div className="text-xs text-green-600">Negotiable</div>
              )}
            </>
          ) : (
            <div className="text-gray-500 italic text-sm">
              Add price details
            </div>
          )}
        </td>
        <td className="px-6 py-4">
          {hasPlotData ? (
            <div className="flex flex-wrap gap-1">
              {plot.propertyFeatures?.totalFloor && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  {plot.propertyFeatures.totalFloor}F
                </span>
              )}
              {plot.propertyFeatures?.openSides && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  {plot.propertyFeatures.openSides}s
                </span>
              )}
              {plot.propertyFeatures?.parking && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                  <FaCar className="mr-1" /> Parking
                </span>
              )}
              {plot.propertyFeatures?.gatedColony === "yes" && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                  Gated
                </span>
              )}
            </div>
          ) : (
            <div className="text-gray-500 italic text-sm">Add features</div>
          )}
        </td>
        <td className="px-6 py-4 text-sm">
          <div
            className={`font-medium ${
              hasPlotData ? "text-gray-900" : "text-gray-500"
            }`}
          >
            {brokerName}
          </div>
        </td>
        <td className="px-6 py-4 text-sm">
          <div
            className={`font-medium ${
              hasPlotData ? "text-gray-900" : "text-gray-500"
            }`}
          >
            {plot.purchaser || "N/A"}
          </div>
        </td>
        <td className="px-6 py-4 text-sm">
          <div
            className={`font-medium ${
              hasPlotData ? "text-gray-900" : "text-gray-500"
            }`}
          >
            {plot.constructor || "N/A"}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {hasPlotData && plot.transactionType?.possessionStatus ? (
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
              {plot.transactionType.possessionStatus}
            </span>
          ) : (
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-500">
              {hasPlotData ? "N/A" : "Pending"}
            </span>
          )}
        </td>
        {plot.isCornerPlot ? (
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
              ⭐ Corner
            </span>
          </td>
        ) : (
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-xs text-gray-400">—</span>
          </td>
        )}
      </tr>
    );
  };

  // Unit Row Component - Enhanced for empty data display
  const ProjectUnitRow = ({ unit, project, onEdit }) => {
    const brokerName =
      brokerList.find((b) => b.id == unit.broker)?.name || "N/A";
    const hasUnitData = hasData(unit);

    return (
      <tr
        className={`transition duration-200 cursor-pointer ${
          hasUnitData ? "hover:bg-blue-50" : "hover:bg-gray-50"
        } ${!hasUnitData ? "opacity-60" : ""}`}
        onClick={onEdit}
      >
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  hasUnitData ? "bg-pink-100" : "bg-gray-200"
                }`}
              >
                <FaBed
                  className={`h-5 w-5 ${
                    hasUnitData ? "text-pink-600" : "text-gray-400"
                  }`}
                />
              </div>
            </div>
            <div className="ml-4">
              <div
                className={`text-sm font-medium ${
                  hasUnitData ? "text-gray-900" : "text-gray-900"
                }`}
              >
                {unit.name}
              </div>
              {unit.propertyFeatures?.floorNo && (
                <div
                  className={`text-xs ${
                    hasUnitData ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Floor {unit.propertyFeatures.floorNo}
                </div>
              )}
              {!hasUnitData && (
                <div className="text-xs text-gray-400 mt-1">
                  Click to add details
                </div>
              )}
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          <div
            className={`text-sm ${
              hasUnitData ? "text-gray-900" : "text-gray-500"
            }`}
          >
            {unit.areaDetails?.carpetArea
              ? `${unit.areaDetails.carpetArea} sq-ft`
              : "N/A"}
          </div>
          {unit.areaDetails?.builtUpArea && (
            <div
              className={`text-xs ${
                hasUnitData ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Built-up: {unit.areaDetails.builtUpArea} sq-ft
            </div>
          )}
          {!hasUnitData && (
            <div className="text-xs text-gray-400 mt-1">Add area details</div>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {hasUnitData ? (
            <>
              <div className="text-gray-900">
                {formatCurrency(unit.priceDetails?.expectedPrice)}
              </div>
              {unit.priceDetails?.tokenAmount && (
                <div className="text-xs text-gray-500">
                  Token: {formatCurrency(unit.priceDetails.tokenAmount)}
                </div>
              )}
              {unit.priceDetails?.priceNegotiable && (
                <div className="text-xs text-green-600">Negotiable</div>
              )}
            </>
          ) : (
            <div className="text-gray-500 italic text-sm">
              Add price details
            </div>
          )}
        </td>
        <td className="px-6 py-4">
          {hasUnitData ? (
            <div className="flex flex-wrap gap-1">
              {(unit.propertyFeatures?.bedrooms || 0) > 0 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                  <FaBed className="mr-1" /> {unit.propertyFeatures.bedrooms}BHK
                </span>
              )}
              {(unit.propertyFeatures?.bathrooms || 0) > 0 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-cyan-100 text-cyan-800">
                  <FaBath className="mr-1" /> {unit.propertyFeatures.bathrooms}
                </span>
              )}
              {unit.propertyFeatures?.furnishedStatus !== "Unfurnished" && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
                  {unit.propertyFeatures.furnishedStatus}
                </span>
              )}
              {unit.propertyFeatures?.parking > 0 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-indigo-100 text-indigo-800">
                  <FaCar className="mr-1" /> {unit.propertyFeatures.parking}
                </span>
              )}
            </div>
          ) : (
            <div className="text-gray-500 italic text-sm">Add features</div>
          )}
        </td>
        <td className="px-6 py-4 text-sm">
          <div
            className={`font-medium ${
              hasUnitData ? "text-gray-900" : "text-gray-500"
            }`}
          >
            {brokerName}
          </div>
        </td>
        <td className="px-6 py-4 text-sm">
          <div
            className={`font-medium ${
              hasUnitData ? "text-gray-900" : "text-gray-500"
            }`}
          >
            {unit.purchaser || "N/A"}
          </div>
        </td>
        <td className="px-6 py-4 text-sm">
          <div
            className={`font-medium ${
              hasUnitData ? "text-gray-900" : "text-gray-500"
            }`}
          >
            {unit.constructor || "N/A"}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {hasUnitData && unit.transactionType?.possessionStatus ? (
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              {unit.transactionType.possessionStatus}
            </span>
          ) : (
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-500">
              {hasUnitData ? "N/A" : "Pending"}
            </span>
          )}
        </td>
      </tr>
    );
  };

  // Enhanced Project View Form with Plot/Unit Details
  const ProjectViewForm = ({ project }) => {
    const allPlots = project.plots || [];
    const allUnits = project.units || [];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
        <div className="bg-white rounded-lg max-w-6xl w-full max-h-screen overflow-y-auto">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {project.name} - Complete Details
              </h2>
              <button
                onClick={closeViewProject}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                <FaTimes />
              </button>
            </div>

            {/* Project Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <p className="text-gray-900 font-medium">{project.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <p className="text-gray-900 capitalize">
                  {project.type}{" "}
                  {project.commercialSubType
                    ? `(${project.commercialSubType})`
                    : ""}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <p className="text-gray-900">
                  {project.city}, {project.locality}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Land Zone
                </label>
                <p className="text-gray-900">{project.landZone || "N/A"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Created
                </label>
                <p className="text-gray-900">{project.createdAt}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Updated
                </label>
                <p className="text-gray-900">{project.updatedAt}</p>
              </div>
            </div>

            {/* Plots Details
            {allPlots.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-2">
                  Plots Details ({allPlots.length})
                </h3>
                <div className="space-y-4">
                  {allPlots.map((plot, index) => (
                    <div
                      key={plot.id}
                      className="relative p-4 border rounded-lg flex items-center"
                      onClick={() => handlePlotClick(plot)}
                    >
                      <div className="flex-grow">
                        <h4 className="font-semibold">{plot.name}</h4>
                        <p>Price: {formatCurrency(plot.priceDetails?.expectedPrice) || "N/A"}</p>
                        <p>Area: {plot.areaDetails?.plotArea || "N/A"} sq-yd</p>
                        <p>Purchaser: {plot.purchaser || "N/A"}</p>
                        <p>Constructor: {plot.constructor || "N/A"}</p>
                        <p>Complete: {plot.isComplete ? "Yes" : "No"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* Units Details */}
            {allUnits.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-2">
                  Units Details ({allUnits.length})
                </h3>
                <div className="space-y-4">
                  {allUnits.map((unit, index) => (
                    <div
                      key={unit.id}
                      className="relative p-4 border rounded-lg flex items-center"
                      onClick={() => handleUnitClick(unit)}
                    >
                      <div className="flex-grow">
                        <h4 className="font-semibold">{unit.name}</h4>
                        <p>Price: {formatCurrency(unit.priceDetails?.expectedPrice) || "N/A"}</p>
                        <p>Area: {unit.areaDetails?.carpetArea || "N/A"} sq-ft</p>
                        <p>Purchaser: {unit.purchaser || "N/A"}</p>
                        <p>Constructor: {unit.constructor || "N/A"}</p>
                        <p>Complete: {unit.isComplete ? "Yes" : "No"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="min-h-screen max-w-7xl mx-auto p-2 md:p-4">
        <header className="text-center py-6 md:py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-2">
            Real Estate Project Management
          </h1>
          <p className="text-md md:text-lg text-gray-600">
            Comprehensive property project management with detailed tracking
          </p>
        </header>

        {!showForm ? (
          <div className="bg-white  rounded-xl shadow-lg p-2 md:p-4  mb-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                  Projects Overview
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Total Projects: {projects.length}
                </p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg flex items-center transition duration-300 shadow-md"
              >
                <FaPlus className="mr-2" />
                Add New Project
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="text-center py-10 md:py-12">
                <FaBuilding className="w-14 h-14 md:w-16 md:h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg md:text-xl font-medium text-gray-700 mb-2">
                  No projects yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Get started by adding your first project
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
                  <thead className="bg-indigo-100 text-indigo-800">
                    <tr>
                      <th className="py-4 px-6 text-left text-sm font-semibold">
                        Project
                      </th>
                      <th className="py-4 px-6 text-left text-sm font-semibold">
                        Type
                      </th>
                      <th className="py-4 px-6 text-left text-sm font-semibold">
                        Location
                      </th>
                      <th className="py-4 px-6 text-left text-sm font-semibold">
                        Units/Plots
                      </th>
                      <th className="py-4 px-6 text-left text-sm font-semibold">
                        Status
                      </th>
                      <th className="py-4 px-6 text-left text-sm font-semibold">
                        Created
                      </th>
                      <th className="py-4 px-6 text-left text-sm font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {projects.map((project) => (
                      <React.Fragment key={project.id}>
                        <tr className="hover:bg-gray-50 transition duration-150 border-b border-gray-100">
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div
                                  className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                                    project.type === "plotting"
                                      ? "bg-green-500"
                                      : project.type === "duplex"
                                      ? "bg-blue-500"
                                      : project.type === "apartment"
                                      ? "bg-purple-500"
                                      : "bg-orange-500"
                                  }`}
                                >
                                  {project.type === "plotting"
                                    ? "P"
                                    : project.type === "duplex"
                                    ? "D"
                                    : project.type === "apartment"
                                    ? "A"
                                    : "C"}
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {project.name}
                                </div>
                                <button
                                  onClick={() =>
                                    toggleProjectExpansion(project.id)
                                  }
                                  className="text-indigo-600 text-xs flex items-center mt-1 hover:text-indigo-800"
                                >
                                  {expandedProject === project.id ? (
                                    <>
                                      <FaChevronUp className="mr-1 text-xs" />
                                      Hide details
                                    </>
                                  ) : (
                                    <>
                                      <FaChevronDown className="mr-1 text-xs" />
                                      Show{" "}
                                      {project.plots?.length > 0
                                        ? "plots"
                                        : "units"}{" "}
                                      details (
                                      {project.plots?.length ||
                                        project.units?.length ||
                                        0}
                                      )
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                              {project.type.charAt(0).toUpperCase() +
                                project.type.slice(1)}
                            </span>
                            {project.commercialSubType && (
                              <div className="text-xs text-gray-500 mt-1">
                                {project.commercialSubType}
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center text-sm text-gray-900">
                              <FaMapMarkerAlt className="mr-1 text-red-500" />
                              {project.city || "-"}
                            </div>
                            <div className="text-xs text-gray-500">
                              {project.locality || "-"}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900">
                            {project.plots
                              ?.filter((p) => p.isComplete)
                              .map((p) => p.name)
                              .join(", ") ||
                              project.units
                                ?.filter((u) => u.isComplete)
                                .map((u) => u.name)
                                .join(", ") ||
                              "-"}
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                project.plots?.length > 0 ||
                                project.units?.length > 0
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {project.plots?.length > 0 ||
                              project.units?.length > 0
                                ? "Active"
                                : "Draft"}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500">
                            {project.createdAt}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => editProject(project)}
                                className="text-blue-600 hover:text-blue-900 transition duration-150 flex items-center text-sm font-medium"
                                title="Edit Project"
                              >
                                <FaEdit className="mr-1 h-4 w-4" />
                                Edit
                              </button>
                              <button
                                onClick={() => deleteProject(project.id)}
                                className="text-gray-600 transition duration-150 flex items-center text-sm font-medium"
                                title="Delete Project"
                              >
                                <FaTrash className="mr-1 h-4 w-4" />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                        {expandedProject === project.id && (
                          <tr>
                            <td colSpan="7" className="px-6 py-4 bg-gray-50">
                              <ProjectDetailsTable project={project} />
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
              <div className="flex items-center space-x-2">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                  {editingProjectId
                    ? editingPlotFromTable
                      ? `Edit Plot - ${projectName}`
                      : editingUnitFromTable
                      ? `Edit Unit - ${projectName}`
                      : "Edit Project"
                    : "Add New Project"}
                </h2>
                {(editingPlotFromTable || editingUnitFromTable) && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Editing Item
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure? All unsaved data will be lost."
                    )
                  ) {
                    resetForm();
                    setShowForm(false);
                  }
                }}
                className="text-gray-500 hover:text-gray-700 transition duration-150 flex items-center text-sm font-medium"
              >
                <FaTimes className="mr-1" />
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
              {/* Left Column - Project Details, Configuration, and Lists */}
              <div className="xl:col-span-1 space-y-6">
                {/* Project Basic Info */}
                <div className="w-full bg-gray-50 p-4 md:p-5 rounded-lg border border-gray-200">
                  <h2 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center">
                    <FaHome className="mr-2" />
                    Project Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Project Name *
                      </label>
                      <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter project name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Project Type *
                      </label>
                      <select
                        value={projectType}
                        onChange={handleProjectTypeChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select project type</option>
                        <option value="plotting">Plotting</option>
                        <option value="duplex">Duplex</option>
                        <option value="commercial">Commercial</option>
                        <option value="apartment">Apartment</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>
                    {projectType === "commercial" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Commercial Type
                        </label>
                        <select
                          value={commercialSubType}
                          onChange={(e) => setCommercialSubType(e.target.value)}
                          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="">Select type</option>
                          <option value="office space">Office Space</option>
                          <option value="shop">Shop</option>
                          <option value="showroom">Showroom</option>
                          <option value="land">Land</option>
                          <option value="godown">Godown</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                {/* Location */}
                {(projectType === "plotting" ||
                  projectType === "duplex" ||
                  projectType === "apartment" ||
                  projectType === "commercial") && (
                  <div className="w-full bg-gray-50 p-4 md:p-5 rounded-lg border border-gray-200">
                    <h2 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center">
                      <FaMapMarkerAlt className="mr-2" />
                      Property Location
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Enter City"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Locality
                        </label>
                        <input
                          type="text"
                          value={locality}
                          onChange={(e) => setLocality(e.target.value)}
                          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Enter Locality"
                        />
                      </div>
                      {projectType === "commercial" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Land Zone
                          </label>
                          <input
                            type="text"
                            value={landZone}
                            onChange={(e) => setLandZone(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter Land Zone"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Plot-based configuration */}
                {isPlotBased && (
                  <>
                    {/* Plot Configuration */}
                    <div className="bg-gray-50 p-4 md:p-5 rounded-lg border border-gray-200">
                      <h2 className="text-lg font-semibold mb-4 text-indigo-700">
                        Plot Configuration
                      </h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Number of Plots to Add
                          </label>
                          <div className="flex space-x-2">
                            <input
                              type="number"
                              min="1"
                              value={numPlots}
                              onChange={(e) =>
                                setNumPlots(parseInt(e.target.value))
                              }
                              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <button
                              onClick={generatePlots}
                              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition duration-300 whitespace-nowrap"
                            >
                              Add Plots
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Plots List */}
                    {plots.length > 0 && (
                      <div className="bg-gray-50 p-4 md:p-5 rounded-lg border border-gray-200 sticky top-4">
                        <h2 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center">
                          <FaList className="mr-2" />
                          Plots List ({plots.length})
                        </h2>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          {plots.map((plot, idx) => {
                            return (
                              <div
                                key={plot.id}
                                className={`relative p-4 border rounded-lg flex items-center cursor-pointer transition-all duration-200 ${
                                  selectedPlot?.id === plot.id
                                    ? "bg-indigo-100 border-indigo-300 shadow-md"
                                    : "bg-white border-gray-200 hover:bg-gray-50"
                                }`}
                                onClick={() => handlePlotClick(plot)}
                              >
                                <span className={`font-bold mr-3 ${plot.isComplete ? "text-indigo-700" : "text-gray-8n00"}`}>
                                  {idx + 1}.
                                </span>
                                <span
                                  className={`${
                                    plot.isComplete
                                      ? "font-medium text-gray-900"
                                      : "font-semibold text-gray-800"
                                  }`}
                                >
                                  {plot.name}
                                </span>
                                {plot.isComplete && (
                                  <FaCheckCircle className="ml-2 text-green-500 text-sm" />
                                )}
                                <button
                                  className="absolute top-2 right-2 text-gray-500 p-1 rounded"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (
                                      window.confirm(
                                        `Are you sure you want to remove ${plot.name}?`
                                      )
                                    ) {
                                      setPlots(
                                        plots.filter((p) => p.id !== plot.id)
                                      );
                                      if (selectedPlot?.id === plot.id) {
                                        setSelectedPlot(null);
                                      }
                                    }
                                  }}
                                  title="Remove Plot"
                                >
                                  <FaTrash className="text-xs" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Unit-based configuration */}
                {isUnitBased && (
                  <>
                    <div className="bg-gray-50 p-4 md:p-5 rounded-lg border border-gray-200">
                      <h2 className="text-lg font-semibold mb-4 text-indigo-700">
                        Unit Configuration
                      </h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Unit Name Prefix
                          </label>
                          <input
                            type="text"
                            value={unitNamePrefix}
                            onChange={(e) => setUnitNamePrefix(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="e.g., Unit, Villa, Flat"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Number of Units to Add
                          </label>
                          <div className="flex space-x-2">
                            <input
                              type="number"
                              min="1"
                              value={numUnits}
                              onChange={(e) =>
                                setNumUnits(parseInt(e.target.value))
                              }
                              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <button
                              onClick={generateUnits}
                              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition duration-300 whitespace-nowrap"
                            >
                              Add Units
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Units List */}
                    {units.length > 0 && (
                      <div className="bg-gray-50 p-4 md:p-5 rounded-lg border border-gray-200 sticky top-4">
                        <h2 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center">
                          <FaList className="mr-2" />
                          Units List ({units.length})
                        </h2>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          {units.map((unit, idx) => {
                            return (
                              <div
                                key={unit.id}
                                className={`relative p-4 border rounded-lg flex items-center cursor-pointer transition-all duration-200 ${
                                  selectedUnit?.id === unit.id
                                    ? "bg-indigo-100 border-indigo-300 shadow-md"
                                    : "bg-white border-gray-200 hover:bg-gray-50"
                                }`}
                                onClick={() => handleUnitClick(unit)}
                              >
                                <span className={`font-bold mr-3 ${unit.isComplete ? "text-indigo-700" : "text-gray-800"}`}>
                                  {idx + 1}.
                                </span>
                                <span
                                  className={`${
                                    unit.isComplete
                                      ? "font-medium text-gray-900"
                                      : "font-semibold text-gray-900"
                                  }`}
                                ><span>Unit</span>
                                  {unit.name}
                                </span>
                                {unit.isComplete && (
                                  <FaCheckCircle className="ml-2 text-green-500 text-sm" />
                                )}
                                <button
                                  className="absolute top-2 right-2 text-gray-500 p-1 rounded"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (
                                      window.confirm(
                                        `Are you sure you want to remove ${unit.name}?`
                                      )
                                    ) {
                                      setUnits(
                                        units.filter((u) => u.id !== unit.id)
                                      );
                                      if (selectedUnit?.id === unit.id) {
                                        setSelectedUnit(null);
                                      }
                                    }
                                  }}
                                  title="Remove Unit"
                                >
                                  <FaTrash className="text-xs" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Customize Select */}
                {showCustomizeSelect && (
                  <div className="bg-gray-50 p-4 md:p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold mb-4 md:mb-6 text-indigo-700">
                      Select Type to Customize
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {["plotting", "duplex", "apartment", "commercial"].map(
                        (type) => (
                          <button
                            key={type}
                            onClick={() => handleCustomizeTypeSelect(type)}
                            className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-500 hover:shadow transition-all duration-200 text-left hover:bg-blue-50"
                          >
                            <h4 className="text-lg font-semibold text-gray-900 capitalize mb-2">
                              {type}
                            </h4>
                            {/* <p className="text-sm text-gray-600">
                            {projects.filter(p => p.type === type).length > 0
                              ? `Based on ${projects.filter(p => p.type === type)[projects.filter(p => p.type === type).length - 1].name}`
                              : 'Start fresh'
                            }
                          </p> */}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Plot/Unit Details - Made wider */}
              <div className="xl:col-span-2 space-y-6">
                {/* Default messages */}
                {(isPlotBased && plots.length === 0) ||
                (isUnitBased && units.length === 0) ? (
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 h-full flex items-center justify-center">
                    <div className="text-center">
                      <FaBuilding className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {isPlotBased ? "Add Plots" : "Add Units"}
                      </h3>
                      <p className="text-gray-500">
                        {isPlotBased
                          ? 'Click "Add Plots" in the left panel to start adding to your project.'
                          : 'Click "Add Units" in the left panel to start adding to your project.'}
                      </p>
                    </div>
                  </div>
                ) : (
                  ((isPlotBased && !selectedPlot) ||
                    (isUnitBased && !selectedUnit)) && (
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 h-full flex items-center justify-center">
                      <div className="text-center">
                        <FaInfoCircle className="mx-auto h-16 w-16 text-indigo-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Select a {isPlotBased ? "Plot" : "Unit"}
                        </h3>
                        <p className="text-gray-500 mb-4">
                          Click on a {isPlotBased ? "plot" : "unit"} from the
                          list on the left to view and edit detailed information
                        </p>
                      </div>
                    </div>
                  )
                )}

                {/* Plot Details */}
                {isPlotBased && selectedPlot && (
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                     <h2 className={`text-2xl font-bold ${selectedPlot.isComplete ? 'text-gray-900' : 'text-red-500'}`}>
  {selectedPlot.name} Details
</h2>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          Plot
                        </span>
                        <button
                          onClick={() => handlePlotClick(null)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <FaTimes className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Corner Plot */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                          <FaQuestionCircle className="mr-2 text-indigo-500" />
                          Is this a corner plot?
                        </label>
                        <div className="flex space-x-6">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="radio"
                              checked={isCornerPlot}
                              onChange={() => setIsCornerPlot(true)}
                              className="text-indigo-600 focus:ring-indigo-500 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              Yes
                            </span>
                          </label>
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="radio"
                              checked={!isCornerPlot}
                              onChange={() => setIsCornerPlot(false)}
                              className="text-indigo-600 focus:ring-indigo-500 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              No
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* Property Features */}
                      <div className="border-t border-gray-200 pt-6">
                       
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                              Floors Allowed
                            </label>
                            <select
                              value={propertyFeatures.totalFloor}
                              onChange={(e) =>
                                setPropertyFeatures({
                                  ...propertyFeatures,
                                  totalFloor: e.target.value,
                                })
                              }
                              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                              <option value="">Select Total Floor</option>
                              <option value="1">1 Floor</option>
                              <option value="2">2 Floors</option>
                              <option value="3">3 Floors</option>
                              <option value="4">4 Floors</option>
                              <option value="5">5+ Floors</option>
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

                        {/*  facilities section */}
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Facilities
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                              {
                                key: "parking",
                                label: "Car Parking",
                                icon: FaCar,
                              },
                              { key: "gym", label: "Gym", icon: FaUsers },
                              {
                                key: "swimmingPool",
                                label: "Swimming Pool",
                                icon: FaSwimmingPool,
                              },
                              { key: "garden", label: "Garden", icon: FaTree },
                              {
                                key: "gameZone",
                                label: "Game Zone",
                                icon: FaUsers,
                              },
                            ].map((facility) => (
                              <label
                                key={facility.key}
                                className="inline-flex items-center cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={propertyFeatures[facility.key]}
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
                            {customFacilities.map((facility, idx) => (
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
                                    setCustomFacilities(
                                      customFacilities.filter(
                                        (f) => f !== facility
                                      )
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
                                  !customFacilities.includes(
                                    propertyFeatures.newFacility.trim()
                                  )
                                ) {
                                  setCustomFacilities([
                                    ...customFacilities,
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
                    </div>

                    {/* Area Details */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center">
                        <FaRulerCombined className="mr-2" />
                        Area
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Plot Area (Sq-yd)
                          </label>
                          <input
                            type="number"
                            value={areaDetails.plotArea}
                            onChange={(e) =>
                              setAreaDetails({
                                ...areaDetails,
                                plotArea: e.target.value,
                              })
                            }
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Sq-yd"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Plot Length (optional)
                          </label>
                          <input
                            type="number"
                            value={areaDetails.plotLength}
                            onChange={(e) =>
                              setAreaDetails({
                                ...areaDetails,
                                plotLength: e.target.value,
                              })
                            }
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="yd"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Plot Breadth (optional)
                          </label>
                          <input
                            type="number"
                            value={areaDetails.plotBreadth}
                            onChange={(e) =>
                              setAreaDetails({
                                ...areaDetails,
                                plotBreadth: e.target.value,
                              })
                            }
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="yd"
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
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Broker
                          </label>
                          <select
                            value={broker}
                            onChange={(e) => setBroker(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="">Select a broker</option>
                            {brokerList.map((brokerItem) => (
                              <option key={brokerItem.id} value={brokerItem.id}>
                                {brokerItem.name} - {brokerItem.phone}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Purchaser
                          </label>
                          <input
                            type="text"
                            value={purchaser}
                            onChange={(e) => setPurchaser(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter purchaser name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Constructor
                          </label>
                          <input
                            type="text"
                            value={constructor}
                            onChange={(e) => setConstructor(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter constructor name"
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
                                  handleApprovalChange(
                                    index,
                                    "authority",
                                    e.target.value
                                  )
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
                                  handleApprovalChange(
                                    index,
                                    "status",
                                    e.target.value
                                  )
                                }
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              >
                                <option value="">Select status</option>
                                <option value="Approved">Approved</option>
                                <option value="Pending"> Pending</option>
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

                    {/* Transaction Details */}
                    <div className="border-t border-gray-200 pt-6">
                     
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Possession Status
                          </label>
                          <select
                            value={transactionType.possessionStatus}
                            onChange={(e) =>
                              setTransactionType({
                                ...transactionType,
                                possessionStatus: e.target.value,
                              })
                            }
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="">Select status</option>
                            <option value="Ready to Move">
                              🏠 Ready to Move
                            </option>
                            <option value="Under Construction">
                              🏗️ Under Construction
                            </option>
                            <option value="New Launch">🚀 New Launch</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Available From
                          </label>
                          <div className="flex space-x-2">
                            <select
                              value={transactionType.availableFrom.month}
                              onChange={(e) =>
                                setTransactionType({
                                  ...transactionType,
                                  availableFrom: {
                                    ...transactionType.availableFrom,
                                    month: e.target.value,
                                  },
                                })
                              }
                              className="w-1/2 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                              <option value="">Month</option>
                              <option value="January">Jan</option>
                              <option value="February">Feb</option>
                              <option value="March">Mar</option>
                              <option value="April">Apr</option>
                              <option value="May">May</option>
                              <option value="June">Jun</option>
                              <option value="July">Jul</option>
                              <option value="August">Aug</option>
                              <option value="September">Sep</option>
                              <option value="October">Oct</option>
                              <option value="November">Nov</option>
                              <option value="December">Dec</option>
                            </select>
                            <select
                              value={transactionType.availableFrom.year}
                              onChange={(e) =>
                                setTransactionType({
                                  ...transactionType,
                                  availableFrom: {
                                    ...transactionType.availableFrom,
                                    year: e.target.value,
                                  },
                                })
                              }
                              className="w-1/2 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                      </div>
                    </div>

                    {/* Price Details */}
                    <div className="border-t border-gray-200 pt-6 pb-4">
                      <h3 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center">
                        <FaMoneyBill className="mr-2" />
                        Price Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expected Price (₹)
                          </label>
                          <input
                            type="text"
                            value={priceDetails.expectedPrice}
                            onChange={(e) =>
                              setPriceDetails({
                                ...priceDetails,
                                expectedPrice: e.target.value,
                              })
                            }
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="e.g., 5000000"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Booking/Token Amount (₹)
                          </label>
                          <input
                            type="text"
                            value={priceDetails.tokenAmount}
                            onChange={(e) =>
                              setPriceDetails({
                                ...priceDetails,
                                tokenAmount: e.target.value,
                              })
                            }
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="e.g., 50000"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                      <button
                        onClick={updatePlotDetails}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-md transition duration-300 font-medium flex items-center justify-center"
                      >
                        <FaCheck className="mr-2" />
                        Update Plot Details
                      </button>
                      <button
                        onClick={handleSaveProject}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md transition duration-300 font-medium flex items-center justify-center"
                      >
                        <FaSave className="mr-2" />
                        {editingProjectId ? "Update Project" : "Save Project"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Unit Details - Fixed and cleaned up */}
                {isUnitBased && selectedUnit && (
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedUnit.name} Details
                      </h2>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          Unit
                        </span>
                        <button
                          onClick={() => handleUnitClick(null)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <FaTimes className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Unit Property Features */}
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center">
                          <FaBed className="mr-2" />
                          Property Features
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Bedrooms
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={duplexPropertyFeatures.bedrooms}
                              onChange={(e) =>
                                setDuplexPropertyFeatures({
                                  ...duplexPropertyFeatures,
                                  bedrooms: parseInt(e.target.value) || 0,
                                })
                              }
                              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Bathrooms
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={duplexPropertyFeatures.bathrooms}
                              onChange={(e) =>
                                setDuplexPropertyFeatures({
                                  ...duplexPropertyFeatures,
                                  bathrooms: parseInt(e.target.value) || 0,
                                })
                              }
                              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Balconies
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={duplexPropertyFeatures.balconies}
                              onChange={(e) =>
                                setDuplexPropertyFeatures({
                                  ...duplexPropertyFeatures,
                                  balconies: parseInt(e.target.value) || 0,
                                })
                              }
                              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Floor No
                            </label>
                            <input
                              type="text"
                              value={duplexPropertyFeatures.floorNo}
                              onChange={(e) =>
                                setDuplexPropertyFeatures({
                                  ...duplexPropertyFeatures,
                                  floorNo: e.target.value,
                                })
                              }
                              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="e.g., Ground, 1st, 2nd"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Total Floors
                            </label>
                            <input
                              type="text"
                              value={duplexPropertyFeatures.totalFloors}
                              onChange={(e) =>
                                setDuplexPropertyFeatures({
                                  ...duplexPropertyFeatures,
                                  totalFloors: e.target.value,
                                })
                              }
                              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="e.g., 5"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Furnished Status
                            </label>
                            <select
                              value={duplexPropertyFeatures.furnishedStatus}
                              onChange={(e) =>
                                setDuplexPropertyFeatures({
                                  ...duplexPropertyFeatures,
                                  furnishedStatus: e.target.value,
                                })
                              }
                              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                              <option value="Unfurnished">Unfurnished</option>
                              <option value="Semi-Furnished">
                                Semi-Furnished
                              </option>
                              <option value="Fully Furnished">
                                Fully Furnished
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Facilities
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                              { key: "gym", label: "Gym", icon: FaUsers },
                              { key: "parking", label: "Parking", icon: FaCar },
                              {
                                key: "swimmingPool",
                                label: "Swimming Pool",
                                icon: FaSwimmingPool,
                              },
                              { key: "garden", label: "Garden", icon: FaTree },
                              {
                                key: "gameZone",
                                label: "Game Zone",
                                icon: FaUsers,
                              },
                            ].map((facility) => (
                              <label
                                key={facility.key}
                                className="inline-flex items-center cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={duplexPropertyFeatures[facility.key]}
                                  onChange={(e) =>
                                    setDuplexPropertyFeatures({
                                      ...duplexPropertyFeatures,
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
                            {unitCustomFacilities.map((facility, idx) => (
                              <label
                                key={idx}
                                className="inline-flex items-center cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={duplexPropertyFeatures[facility] || false}
                                  onChange={(e) =>
                                    setDuplexPropertyFeatures({
                                      ...duplexPropertyFeatures,
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
                                    setUnitCustomFacilities(
                                      unitCustomFacilities.filter(
                                        (f) => f !== facility
                                      )
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
                              value={duplexPropertyFeatures.newFacility || ""}
                              onChange={(e) =>
                                setDuplexPropertyFeatures({
                                  ...duplexPropertyFeatures,
                                  newFacility: e.target.value,
                                })
                              }
                            />
                            <button
                              type="button"
                              className="ml-2 bg-indigo-500 text-white px-3 py-1 rounded"
                              onClick={() => {
                                if (
                                  duplexPropertyFeatures.newFacility &&
                                  !unitCustomFacilities.includes(
                                    duplexPropertyFeatures.newFacility.trim()
                                  )
                                ) {
                                  setUnitCustomFacilities([
                                    ...unitCustomFacilities,
                                    duplexPropertyFeatures.newFacility.trim(),
                                  ]);
                                  setDuplexPropertyFeatures({
                                    ...duplexPropertyFeatures,
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

                      {/* Unit Area Details */}
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center">
                          <FaRulerCombined className="mr-2" />
                          Area Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Carpet Area (sq-ft)
                            </label>
                            <input
                              type="number"
                              value={duplexAreaDetails.carpetArea}
                              onChange={(e) =>
                                setDuplexAreaDetails({
                                  ...duplexAreaDetails,
                                  carpetArea: e.target.value,
                                })
                              }
                              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Built-up Area (sq-ft)
                            </label>
                            <input
                              type="number"
                              value={duplexAreaDetails.builtUpArea}
                              onChange={(e) =>
                                setDuplexAreaDetails({
                                  ...duplexAreaDetails,
                                  builtUpArea: e.target.value,
                                })
                              }
                              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Super Built-up Area (sq-ft)
                            </label>
                            <input
                              type="number"
                              value={duplexAreaDetails.superBuiltUpArea}
                              onChange={(e) =>
                                setDuplexAreaDetails({
                                  ...duplexAreaDetails,
                                  superBuiltUpArea: e.target.value,
                                })
                              }
                              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Construction Area (sq-ft)
                            </label>
                            <input
                              type="number"
                              value={duplexAreaDetails.constructionArea}
                              onChange={(e) =>
                                setDuplexAreaDetails({
                                  ...duplexAreaDetails,
                                  constructionArea: e.target.value,
                                })
                              }
                              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Land Area (sq-ft)
                            </label>
                            <input
                              type="number"
                              value={duplexAreaDetails.landArea}
                              onChange={(e) =>
                                setDuplexAreaDetails({
                                  ...duplexAreaDetails,
                                  landArea: e.target.value,
                                })
                              }
                              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Broker
                            </label>
                            <select
                              value={broker}
                              onChange={(e) => setBroker(e.target.value)}
                              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                              <option value="">Select a broker</option>
                              {brokerList.map((brokerItem) => (
                                <option
                                  key={brokerItem.id}
                                  value={brokerItem.id}
                                >
                                  {brokerItem.name} - {brokerItem.phone}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Purchaser
                            </label>
                            <input
                              type="text"
                              value={purchaser}
                              onChange={(e) => setPurchaser(e.target.value)}
                              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="Enter purchaser name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Constructor
                            </label>
                            <input
                              type="text"
                              value={constructor}
                              onChange={(e) => setConstructor(e.target.value)}
                              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="Enter constructor name"
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
                                    handleApprovalChange(
                                      index,
                                      "authority",
                                      e.target.value
                                    )
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
                                    handleApprovalChange(
                                      index,
                                      "status",
                                      e.target.value
                                    )
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
                                    onClick={() =>
                                      removeApprovalAuthority(index)
                                    }
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

                      {/* Transaction Details */}
                      <div className="border-t border-gray-200 pt-6">
                       
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Construction Status
                            </label>
                            <select
                              value={transactionType.possessionStatus}
                              onChange={(e) =>
                                setTransactionType({
                                  ...transactionType,
                                  possessionStatus: e.target.value,
                                })
                              }
                              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                              <option value="">Select status</option>
                              <option value="Ready to Move">
                                🏠 Ready to Move
                              </option>
                              <option value="Under Construction">
                                🏗️ Under Construction
                              </option>
                              <option value="New Launch">🚀 New Launch</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Available From
                            </label>
                            <div className="flex space-x-2">
                              <select
                                value={transactionType.availableFrom.month}
                                onChange={(e) =>
                                  setTransactionType({
                                    ...transactionType,
                                    availableFrom: {
                                      ...transactionType.availableFrom,
                                      month: e.target.value,
                                    },
                                  })
                                }
                                className="w-1/2 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              >
                                <option value="">Month</option>
                                <option value="January">Jan</option>
                                <option value="February">Feb</option>
                                <option value="March">Mar</option>
                                <option value="April">Apr</option>
                                <option value="May">May</option>
                                <option value="June">Jun</option>
                                <option value="July">Jul</option>
                                <option value="August">Aug</option>
                                <option value="September">Sep</option>
                                <option value="October">Oct</option>
                                <option value="November">Nov</option>
                                <option value="December">Dec</option>
                              </select>
                              <select
                                value={transactionType.availableFrom.year}
                                onChange={(e) =>
                                  setTransactionType({
                                    ...transactionType,
                                    availableFrom: {
                                      ...transactionType.availableFrom,
                                      year: e.target.value,
                                    },
                                  })
                                }
                                className="w-1/2 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                        </div>
                      </div>

                      {/* Price Details */}
                      <div className="border-t border-gray-200 pt-6 pb-4">
                        <h3 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center">
                          <FaMoneyBill className="mr-2" />
                          Price Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Expected Price (₹)
                            </label>
                            <input
                              type="text"
                              value={priceDetails.expectedPrice}
                              onChange={(e) =>
                                setPriceDetails({
                                  ...priceDetails,
                                  expectedPrice: e.target.value,
                                })
                              }
                              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="e.g., 5000000"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Booking/Token Amount (₹)
                            </label>
                            <input
                              type="text"
                              value={priceDetails.tokenAmount}
                              onChange={(e) =>
                                setPriceDetails({
                                  ...priceDetails,
                                  tokenAmount: e.target.value,
                                })
                              }
                              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="e.g., 50000"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                        <button
                          onClick={updateUnitDetails}
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-md transition duration-300 font-medium flex items-center justify-center"
                        >
                          <FaCheck className="mr-2" />
                          Update Unit Details
                        </button>
                        <button
                          onClick={handleSaveProject}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md transition duration-300 font-medium flex items-center justify-center"
                        >
                          <FaSave className="mr-2" />
                          {editingProjectId ? "Update Project" : "Save Project"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {viewProjectId && viewProjectData && (
          <ProjectViewForm project={viewProjectData} />
        )}
      </div>
    </div>
  );
};

export default ProjectManagement;