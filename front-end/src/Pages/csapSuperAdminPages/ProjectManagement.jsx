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

// Constants and configuration
const PROJECT_TYPES = {
  PLOTTING: "plotting",
  DUPLEX: "duplex",
  TRIPLEX: "triplex",
  APARTMENT: "apartment",
  COMMERCIAL: "commercial",
  CUSTOM: "custom",
};

const COMMERCIAL_TYPES = ["office space", "shop", "showroom", "land", "godown"];

const BROKER_LIST = [
  { id: 1, name: "John Smith", phone: "+1 (555) 123-4567" },
  { id: 2, name: "Emma Johnson", phone: "+1 (555) 234-5678" },
  { id: 3, name: "Michael Williams", phone: "+1 (555) 345-6789" },
  { id: 4, name: "Sarah Brown", phone: "+1 (555) 456-7890" },
  { id: 5, name: "David Jones", phone: "+1 (555) 567-8901" },
];

const FACILITIES = [
  { key: "parking", label: "Car Parking", icon: FaCar },
  { key: "gym", label: "Gym", icon: FaUsers },
  { key: "swimmingPool", label: "Swimming Pool", icon: FaSwimmingPool },
  { key: "garden", label: "Garden", icon: FaTree },
  { key: "gameZone", label: "Game Zone", icon: FaUsers },
];

// Initial States
const INITIAL_PROJECT_STATE = {
  name: "",
  type: "",
  city: "",
  locality: "",
  landZone: "",
  commercialSubType: "",
};

const INITIAL_PRICE_DETAILS = {
  expectedPrice: "",
  tokenAmount: "",
  priceNegotiable: false,
};

const INITIAL_PROPERTY_FEATURES = {
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
  // New fields from the image
  bookTitle: "",
  totalRooms: "",
  furnishedStatus: "Unfurnished",
  yearrooms: "",
  personalWashroom: "No",
  pantryCafeteria: "Not Available",
  floorsAllowed: "",
  areaType: "Carpet Area",
  carpetArea: "",
  superArea: "",
  possessionStatus: "",
  availableFromMonth: "",
  availableFromYear: "",
  currentlyLeasedOut: "No",
  assuredReturns: "No",
  expectedPrice: "",
  tokenAmount: "",
};

const INITIAL_AREA_DETAILS = {
  plotArea: "",
  plotLength: "",
  plotBreadth: "",
};

const INITIAL_DUPLEX_FEATURES = {
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
};

const INITIAL_DUPLEX_AREA_DETAILS = {
  landArea: "",
  landLength: "",
  landBreadth: "",
  constructionArea: "",
  superBuiltUpArea: "",
  builtUpArea: "",
  carpetArea: "",
};

const INITIAL_TRIPLEX_FEATURES = {
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
};

const INITIAL_TRIPLEX_AREA_DETAILS = {
  landArea: "",
  landLength: "",
  landBreadth: "",
  constructionArea: "",
  superBuiltUpArea: "",
  builtUpArea: "",
  carpetArea: "",
};

const INITIAL_APPROVAL_STATUS = [
  { authority: "", status: "" },
  { authority: "", status: "" },
];

const INITIAL_TRANSACTION_TYPE = {
  possessionStatus: "",
  availableFrom: { month: "", year: "" },
};

// Utility Functions
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
  return badges[status] || { bg: "bg-gray-100 text-gray-800" };
};

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

// Sub-Components
const ProjectPlotRow = ({ plot, project, onEdit }) => {
  const brokerName =
    BROKER_LIST.find((b) => b.id == plot.broker)?.name || "N/A";
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
          <div className="text-gray-500 italic text-sm">Add price details</div>
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

const ProjectUnitRow = ({ unit, project, onEdit }) => {
  const brokerName =
    BROKER_LIST.find((b) => b.id == unit.broker)?.name || "N/A";
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
            {unit.floor && (
              <div className="text-xs text-gray-500">
                Floor {unit.floor} •{" "}
                {unit.roomType
                  ? unit.roomType === "Duplex" || unit.roomType === "Triplex"
                    ? "Apartment"
                    : unit.roomType
                  : "N/A"}
              </div>
            )}
            {unit.propertyFeatures?.floorNo && !unit.floor && (
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
          <div className="text-gray-500 italic text-sm">Add price details</div>
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

const ProjectDetailsTable = ({ project, onEditPlot, onEditUnit }) => {
  const allPlots = project.plots || [];
  const allUnits = project.units || [];

  const incompletePlots = allPlots.filter((plot) => !plot.isComplete);
  const incompleteUnits = allUnits.filter((unit) => !unit.isComplete);

  const completedPlots = allPlots.filter((plot) => plot.isComplete);
  const completedUnits = allUnits.filter((unit) => unit.isComplete);

  return (
    <div className="space-y-6">
      {/* Project Summary */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="text-lg font-semibold text-blue-800 mb-2 flex items-center">
          <FaBuilding className="mr-2" />
          Project Summary
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

      {/* Detailed Plots/Units Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h4 className="text-lg font-semibold text-gray-800 flex items-center">
            <FaList className="mr-2" />
            {incompletePlots.length > 0
              ? "Pending Plots Details"
              : "Pending Units Details"}{" "}
            ({incompletePlots.length || incompleteUnits.length} pending)
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
                      onEdit={() => onEditPlot(project, plot)}
                    />
                  ))
                : incompleteUnits.map((unit, index) => (
                    <ProjectUnitRow
                      key={unit.id || index}
                      unit={unit}
                      project={project}
                      onEdit={() => onEditUnit(project, unit)}
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
                {Math.round((completedPlots.length / allPlots.length) * 100) ||
                  0}
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
                {Math.round((completedUnits.length / allUnits.length) * 100) ||
                  0}
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
    </div>
  );
};

const ProjectViewForm = ({ project, onClose }) => {
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
              onClick={onClose}
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

          {/* Plots Details */}
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
                  >
                    <div className="flex-grow">
                      <h4 className="font-semibold">{plot.name}</h4>
                      <p>
                        Price:{" "}
                        {formatCurrency(plot.priceDetails?.expectedPrice) ||
                          "N/A"}
                      </p>
                      <p>Area: {plot.areaDetails?.plotArea || "N/A"} sq-yd</p>
                      <p>Purchaser: {plot.purchaser || "N/A"}</p>
                      <p>Constructor: {plot.constructor || "N/A"}</p>
                      <p>Complete: {plot.isComplete ? "Yes" : "No"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
                  >
                    <div className="flex-grow">
                      <h4 className="font-semibold">{unit.name}</h4>
                      <p>
                        Price:{" "}
                        {formatCurrency(unit.priceDetails?.expectedPrice) ||
                          "N/A"}
                      </p>
                      <p>Area: {unit.areaDetails?.carpetArea || "N/A"} sq-ft</p>
                      <p>Purchaser: {unit.purchaser || "N/A"}</p>
                      <p>Constructor: {unit.constructor || "N/A"}</p>
                      <p>Complete: {unit.isComplete ? "Yes" : "No"}</p>
                      {unit.floor && (
                        <p>
                          Floor: {unit.floor} - {unit.roomType}
                        </p>
                      )}
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

// Main Component
const ProjectManagement = () => {
  // State Management
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [expandedProject, setExpandedProject] = useState(null);
  const [viewProjectId, setViewProjectId] = useState(null);
  const [viewProjectData, setViewProjectData] = useState(null);

  // Project Form State
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [city, setCity] = useState("");
  const [locality, setLocality] = useState("");
  const [landZone, setLandZone] = useState("");
  const [commercialSubType, setCommercialSubType] = useState("");

  // Plot/Unit Management
  const [numPlots, setNumPlots] = useState(1);
  const [plots, setPlots] = useState([]);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [numUnits, setNumUnits] = useState(1);
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [unitNamePrefix, setUnitNamePrefix] = useState("");

  // Details State
  const [isCornerPlot, setIsCornerPlot] = useState(false);
  const [priceDetails, setPriceDetails] = useState(INITIAL_PRICE_DETAILS);
  const [propertyFeatures, setPropertyFeatures] = useState(
    INITIAL_PROPERTY_FEATURES
  );
  const [areaDetails, setAreaDetails] = useState(INITIAL_AREA_DETAILS);
  const [kissama, setKissama] = useState("");
  const [boundary, setBoundary] = useState("");
  const [broker, setBroker] = useState("");
  const [purchaser, setPurchaser] = useState("");
  const [constructor, setConstructor] = useState("");

  // Unit-specific State
  const [duplexPropertyFeatures, setDuplexPropertyFeatures] = useState(
    INITIAL_DUPLEX_FEATURES
  );
  const [duplexAreaDetails, setDuplexAreaDetails] = useState(
    INITIAL_DUPLEX_AREA_DETAILS
  );
  const [triplexPropertyFeatures, setTriplexPropertyFeatures] = useState(
    INITIAL_TRIPLEX_FEATURES
  );
  const [triplexAreaDetails, setTriplexAreaDetails] = useState(
    INITIAL_TRIPLEX_AREA_DETAILS
  );
  const [approvalStatus, setApprovalStatus] = useState(INITIAL_APPROVAL_STATUS);
  const [transactionType, setTransactionType] = useState(
    INITIAL_TRANSACTION_TYPE
  );

  // Additional State
  const [customFacilities, setCustomFacilities] = useState([]);
  const [unitCustomFacilities, setUnitCustomFacilities] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [showCustomizeSelect, setShowCustomizeSelect] = useState(false);
  const [editingPlotFromTable, setEditingPlotFromTable] = useState(null);
  const [editingUnitFromTable, setEditingUnitFromTable] = useState(null);
  const [numFloors, setNumFloors] = useState(1);
  const [floorConfigurations, setFloorConfigurations] = useState([]);
  const [parkingFloors, setParkingFloors] = useState(0);
  const [parkingFloorNames, setParkingFloorNames] = useState([]);
  const [totalUnits, setTotalUnits] = useState(0);

  // Computed Values
  const isPlotBased =
    projectType === PROJECT_TYPES.PLOTTING ||
    (projectType === PROJECT_TYPES.COMMERCIAL && commercialSubType === "land");
  const isUnitBased =
    projectType === PROJECT_TYPES.DUPLEX ||
    projectType === PROJECT_TYPES.TRIPLEX ||
    projectType === PROJECT_TYPES.APARTMENT ||
    (projectType === PROJECT_TYPES.COMMERCIAL && commercialSubType !== "land");

  // Effects
  useEffect(() => {
    if (projectType === PROJECT_TYPES.COMMERCIAL && commercialSubType) {
      setPlots([]);
      setUnits([]);
      setSelectedPlot(null);
      setSelectedUnit(null);
    }
  }, [commercialSubType, projectType]);

  // Fixed: Automatically set floors when project type changes
  useEffect(() => {
    if (projectType === PROJECT_TYPES.DUPLEX) {
      (projectType === PROJECT_TYPES.APARTMENT ||
        projectType === PROJECT_TYPES.DUPLEX ||
        projectType === PROJECT_TYPES.TRIPLEX) &&
        setFloorConfigurations([
          {
            floorNumber: 1,
            floorName: "Ground Floor",
            rooms: 1,
            roomTypes: ["2BHK"],
          },
          {
            floorNumber: 2,
            floorName: "First Floor",
            rooms: 1,
            roomTypes: ["2BHK"],
          },
        ]);
      // default total units for duplex == sum of rooms
      setTotalUnits(2);
    } else if (projectType === PROJECT_TYPES.TRIPLEX) {
      setNumFloors(3);
      setFloorConfigurations([
        {
          floorNumber: 1,
          floorName: "Ground Floor",
          rooms: 1,
          roomTypes: ["2BHK"],
        },
        {
          floorNumber: 2,
          floorName: "First Floor",
          rooms: 1,
          roomTypes: ["2BHK"],
        },
        {
          floorNumber: 3,
          floorName: "Second Floor",
          rooms: 1,
          roomTypes: ["2BHK"],
        },
      ]);
      // default total units for triplex == sum of rooms
      setTotalUnits(3);
    } else if (projectType === PROJECT_TYPES.APARTMENT) {
      setNumFloors(1);
      setFloorConfigurations([
        { floorNumber: 1, floorName: "Floor 1", rooms: 1, roomTypes: ["1BHK"] },
      ]);
      // default total units for single-floor apartment
      setTotalUnits(1);
    } else if (projectType === PROJECT_TYPES.PLOTTING) {
      setNumFloors(1);
      setFloorConfigurations([]);
    } else if (
      projectType === PROJECT_TYPES.COMMERCIAL &&
      commercialSubType &&
      commercialSubType !== "land"
    ) {
      // For commercial projects (non-land) initialize like apartments but
      // use generic 'Unit' as default unit type.
      setNumFloors(1);
      setFloorConfigurations([
        {
          floorNumber: 1,
          floorName: "Floor 1",
          rooms: 1,
          roomTypes: ["Unit"],
        },
      ]);
      setTotalUnits(1);
    } else if (projectType === PROJECT_TYPES.COMMERCIAL) {
      // Commercial land or when subtype isn't set: keep empty configuration
      setNumFloors(1);
      setFloorConfigurations([]);
    }
  }, [projectType]);

  // Effect to distribute units when total units changes
  useEffect(() => {
    if (
      (projectType === PROJECT_TYPES.APARTMENT ||
        (projectType === PROJECT_TYPES.COMMERCIAL &&
          commercialSubType &&
          commercialSubType !== "land")) &&
      totalUnits > 0 &&
      numFloors > 0
    ) {
      const unitsPerFloor = Math.floor(totalUnits / numFloors);
      const remainder = totalUnits % numFloors;

      const newConfigs = [];
      let remainingUnits = totalUnits;

      for (let i = 1; i <= numFloors; i++) {
        const floorUnits = i <= remainder ? unitsPerFloor + 1 : unitsPerFloor;
        const actualUnits = Math.min(floorUnits, remainingUnits);

        newConfigs.push({
          floorNumber: i,
          floorName: `Floor ${i}`,
          rooms: actualUnits,
          roomTypes: Array(actualUnits).fill(
            projectType === PROJECT_TYPES.APARTMENT ? "1BHK" : "Unit"
          ),
        });

        remainingUnits -= actualUnits;
        if (remainingUnits <= 0) break;
      }

      setFloorConfigurations(newConfigs);
    }
  }, [totalUnits, numFloors, projectType]);

  // Reset Functions
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
    setPriceDetails(INITIAL_PRICE_DETAILS);
    setPropertyFeatures(INITIAL_PROPERTY_FEATURES);
    setAreaDetails(INITIAL_AREA_DETAILS);
    setKissama("");
    setBoundary("");
    setBroker("");
    setPurchaser("");
    setConstructor("");
    setUnitNamePrefix("");
    setNumUnits(1);
    setUnits([]);
    setSelectedUnit(null);
    setDuplexPropertyFeatures(INITIAL_DUPLEX_FEATURES);
    setDuplexAreaDetails(INITIAL_DUPLEX_AREA_DETAILS);
    setTriplexPropertyFeatures(INITIAL_TRIPLEX_FEATURES);
    setTriplexAreaDetails(INITIAL_TRIPLEX_AREA_DETAILS);
    setApprovalStatus(INITIAL_APPROVAL_STATUS);
    setTransactionType(INITIAL_TRANSACTION_TYPE);
    setCustomFacilities([]);
    setUnitCustomFacilities([]);
    setEditingProjectId(null);
    setEditingPlotFromTable(null);
    setEditingUnitFromTable(null);
    setShowCustomizeSelect(false);
    setNumFloors(1);
    setFloorConfigurations([]);
    setParkingFloors(0);
    setParkingFloorNames([]);
    setTotalUnits(0);
  };

  // Plot/Unit Generation
  const generatePlots = () => {
    const newPlots = [];
    const maxId = plots.length > 0 ? Math.max(...plots.map((p) => p.id)) : 0;

    for (let i = 1; i <= numPlots; i++) {
      newPlots.push({
        id: maxId + i,
        name: `Plot ${maxId + i}`,
        isCornerPlot: false,
        priceDetails: { ...INITIAL_PRICE_DETAILS },
        propertyFeatures: { ...INITIAL_PROPERTY_FEATURES },
        areaDetails: { ...INITIAL_AREA_DETAILS },
        kissama: "",
        boundary: "",
        broker: "",
        purchaser: "",
        constructor: "",
        approvalStatus: JSON.parse(JSON.stringify(INITIAL_APPROVAL_STATUS)),
        transactionType: { ...INITIAL_TRANSACTION_TYPE },
        isComplete: false,
      });
    }

    setPlots([...plots, ...newPlots]);
    setNumPlots(1);

    if (newPlots.length > 0) {
      handlePlotClick(newPlots[0]);
    }
  };

  const generateUnits = () => {
    const newUnits = [];
    const maxId = units.length > 0 ? Math.max(...units.map((u) => u.id)) : 0;

    if (
      (projectType === PROJECT_TYPES.APARTMENT ||
        projectType === PROJECT_TYPES.DUPLEX ||
        projectType === PROJECT_TYPES.TRIPLEX ||
        (projectType === PROJECT_TYPES.COMMERCIAL &&
          commercialSubType &&
          commercialSubType !== "land")) &&
      floorConfigurations.length > 0
    ) {
      const configuredTotal = floorConfigurations.reduce(
        (s, f) => s + (f.rooms || 0),
        0
      );

      if (configuredTotal !== totalUnits) {
        alert(
          `Total configured units (${configuredTotal}) does not match Total Number of Units (${totalUnits}). Please adjust floor configurations before generating units.`
        );
        return;
      }
      let unitCounter = 1;

      floorConfigurations.forEach((floor) => {
        for (let i = 0; i < floor.rooms; i++) {
          const roomType =
            floor.roomTypes[i] ||
            (projectType === PROJECT_TYPES.APARTMENT
              ? "1BHK"
              : projectType === PROJECT_TYPES.COMMERCIAL
              ? "Unit"
              : "2BHK");
          const bedrooms =
            projectType === PROJECT_TYPES.COMMERCIAL
              ? 0
              : parseInt(roomType.charAt(0)) ||
                (projectType === PROJECT_TYPES.DUPLEX ? 2 : 2);

          newUnits.push({
            id: maxId + unitCounter,
            name: `${unitNamePrefix} ${floor.floorName} - ${roomType} ${unitCounter}`,
            floor: floor.floorName,
            roomType: roomType,
            propertyFeatures: {
              ...(projectType === PROJECT_TYPES.DUPLEX
                ? INITIAL_DUPLEX_FEATURES
                : projectType === PROJECT_TYPES.TRIPLEX
                ? INITIAL_TRIPLEX_FEATURES
                : projectType === PROJECT_TYPES.COMMERCIAL
                ? INITIAL_PROPERTY_FEATURES
                : INITIAL_DUPLEX_FEATURES),
              bedrooms: bedrooms,
              bathrooms: bedrooms,
              balconies: Math.min(bedrooms, 2),
              floorNo: floor.floorName,
              totalFloors: numFloors.toString(),
              parking: Math.min(bedrooms, 2),
            },
            areaDetails: {
              ...(projectType === PROJECT_TYPES.DUPLEX
                ? INITIAL_DUPLEX_AREA_DETAILS
                : projectType === PROJECT_TYPES.TRIPLEX
                ? INITIAL_TRIPLEX_AREA_DETAILS
                : projectType === PROJECT_TYPES.COMMERCIAL
                ? INITIAL_AREA_DETAILS
                : INITIAL_DUPLEX_AREA_DETAILS),
            },
            approvalStatus: JSON.parse(JSON.stringify(INITIAL_APPROVAL_STATUS)),
            transactionType: { ...INITIAL_TRANSACTION_TYPE },
            priceDetails: { ...INITIAL_PRICE_DETAILS },
            broker: "",
            purchaser: "",
            constructor: "",
            isComplete: false,
          });
          unitCounter++;
        }
      });
    } else {
      for (let i = 1; i <= numUnits; i++) {
        newUnits.push({
          id: maxId + i,
          name: `${unitNamePrefix} ${maxId + i}`,
          propertyFeatures: {
            ...(projectType === PROJECT_TYPES.TRIPLEX
              ? INITIAL_TRIPLEX_FEATURES
              : INITIAL_DUPLEX_FEATURES),
          },
          areaDetails: {
            ...(projectType === PROJECT_TYPES.TRIPLEX
              ? INITIAL_TRIPLEX_AREA_DETAILS
              : INITIAL_DUPLEX_AREA_DETAILS),
          },
          approvalStatus: JSON.parse(JSON.stringify(INITIAL_APPROVAL_STATUS)),
          transactionType: { ...INITIAL_TRANSACTION_TYPE },
          priceDetails: { ...INITIAL_PRICE_DETAILS },
          broker: "",
          purchaser: "",
          constructor: "",
          isComplete: false,
        });
      }
    }

    setUnits([...units, ...newUnits]);
    setNumUnits(1);

    if (
      (projectType === PROJECT_TYPES.APARTMENT ||
        projectType === PROJECT_TYPES.DUPLEX ||
        projectType === PROJECT_TYPES.TRIPLEX ||
        (projectType === PROJECT_TYPES.COMMERCIAL &&
          commercialSubType &&
          commercialSubType !== "land")) &&
      floorConfigurations.length > 0
    ) {
      alert(
        `Generated ${newUnits.length} units across ${floorConfigurations.length} floors!`
      );
    }

    if (newUnits.length > 0) {
      handleUnitClick(newUnits[0]);
    }
  };

  // Event Handlers
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
    if (projectType === PROJECT_TYPES.TRIPLEX) {
      setTriplexPropertyFeatures(unit.propertyFeatures);
      setTriplexAreaDetails(unit.areaDetails);
    } else {
      setDuplexPropertyFeatures(unit.propertyFeatures);
      setDuplexAreaDetails(unit.areaDetails);
    }
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
          propertyFeatures:
            projectType === PROJECT_TYPES.TRIPLEX
              ? triplexPropertyFeatures
              : duplexPropertyFeatures,
          areaDetails:
            projectType === PROJECT_TYPES.TRIPLEX
              ? triplexAreaDetails
              : duplexAreaDetails,
          approvalStatus,
          transactionType,
          priceDetails,
          broker,
          purchaser,
          constructor,
        };
        updatedUnit.isComplete = !!(
          priceDetails.expectedPrice &&
          (projectType === PROJECT_TYPES.TRIPLEX
            ? triplexAreaDetails.carpetArea
            : duplexAreaDetails.carpetArea) &&
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
      commercialSubType:
        projectType === PROJECT_TYPES.COMMERCIAL ? commercialSubType : "",
      plots: isPlotBased ? [...plots] : [],
      units: isUnitBased ? [...units] : [],
      // Persist floor configuration so overview can show configured unit numbers
      floorConfigurations: isUnitBased ? [...floorConfigurations] : [],
      createdAt: editingProjectId
        ? projects.find((p) => p.id === editingProjectId).createdAt
        : new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString(),
      parkingFloors:
        projectType === PROJECT_TYPES.APARTMENT ? parkingFloors : 0,
      parkingFloorNames:
        projectType === PROJECT_TYPES.APARTMENT ? parkingFloorNames : [],
      totalUnits: projectType === PROJECT_TYPES.APARTMENT ? totalUnits : 0,
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
    setParkingFloors(project.parkingFloors || 0);
    setParkingFloorNames(project.parkingFloorNames || []);
    setTotalUnits(project.totalUnits || 0);
    // Load saved floor configurations (if any)
    setFloorConfigurations(project.floorConfigurations || []);
    setNumFloors((project.floorConfigurations || []).length || 1);

    // Use project's type to decide whether to populate plots or units
    const projectIsPlotBased =
      project.type === PROJECT_TYPES.PLOTTING ||
      (project.type === PROJECT_TYPES.COMMERCIAL &&
        project.commercialSubType === "land");

    if (projectIsPlotBased) {
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

  const editPlotFromTable = (project, plot) => {
    setEditingProjectId(project.id);
    setProjectName(project.name);
    setProjectType(project.type);
    setCity(project.city || "");
    setLocality(project.locality || "");
    setLandZone(project.landZone || "");
    setCommercialSubType(project.commercialSubType || "");
    // load floor configurations if present
    setFloorConfigurations(project.floorConfigurations || []);
    setNumFloors((project.floorConfigurations || []).length || 1);

    setNumPlots(1);
    setPlots(project.plots || []);
    handlePlotClick(plot);
    setEditingPlotFromTable(plot.id);

    setShowForm(true);
    setShowCustomizeSelect(false);
  };

  const editUnitFromTable = (project, unit) => {
    setEditingProjectId(project.id);
    setProjectName(project.name);
    setProjectType(project.type);
    setCity(project.city || "");
    setLocality(project.locality || "");
    setLandZone(project.landZone || "");
    setCommercialSubType(project.commercialSubType || "");
    // load floor configurations if present
    setFloorConfigurations(project.floorConfigurations || []);
    setNumFloors((project.floorConfigurations || []).length || 1);

    setUnitNamePrefix("");
    setNumUnits(1);
    setUnits(project.units || []);
    handleUnitClick(unit);
    setEditingUnitFromTable(unit.id);

    setShowForm(true);
    setShowCustomizeSelect(false);
  };

  const toggleProjectExpansion = (id) => {
    setExpandedProject(expandedProject === id ? null : id);
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
    setShowCustomizeSelect(newType === PROJECT_TYPES.CUSTOM);
  };

  const handleCustomizeTypeSelect = (selectedType) => {
    const previousProjects = projects.filter((p) => p.type === selectedType);
    const previousProject = previousProjects[previousProjects.length - 1];

    if (previousProject) {
      setProjectName(`${previousProject.name} (Customized)`);
      setCity(previousProject.city || "");
      setLocality(previousProject.locality || "");
      setLandZone(previousProject.landZone || "");

      if (selectedType === PROJECT_TYPES.COMMERCIAL) {
        setCommercialSubType(previousProject.commercialSubType || "");
      }

      if (
        selectedType === PROJECT_TYPES.PLOTTING ||
        (selectedType === PROJECT_TYPES.COMMERCIAL &&
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

      if (selectedType === PROJECT_TYPES.DUPLEX) {
        setNumFloors(2);
        setFloorConfigurations([
          {
            floorNumber: 1,
            floorName: "Ground Floor",
            rooms: 1,
            roomTypes: ["2BHK"],
          },
          {
            floorNumber: 2,
            floorName: "First Floor",
            rooms: 1,
            roomTypes: ["2BHK"],
          },
        ]);
      } else if (selectedType === PROJECT_TYPES.TRIPLEX) {
        setNumFloors(3);
        setFloorConfigurations([
          {
            floorNumber: 1,
            floorName: "Ground Floor",
            rooms: 1,
            roomTypes: ["2BHK"],
          },
          {
            floorNumber: 2,
            floorName: "First Floor",
            rooms: 1,
            roomTypes: ["2BHK"],
          },
          {
            floorNumber: 3,
            floorName: "Second Floor",
            rooms: 1,
            roomTypes: ["2BHK"],
          },
        ]);
      }
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

  // Render Methods
  const renderProjectList = () => (
    <div className="bg-white rounded-xl shadow-lg p-2 md:p-4 mb-4">
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
                                : project.type === "triplex"
                                ? "bg-orange-500"
                                : project.type === "apartment"
                                ? "bg-purple-500"
                                : "bg-gray-500"
                            }`}
                          >
                            {project.type === "plotting"
                              ? "P"
                              : project.type === "duplex"
                              ? "D"
                              : project.type === "triplex"
                              ? "T"
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
                            onClick={() => toggleProjectExpansion(project.id)}
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
                      {/**
                       * Prefer showing explicitly configured unit/plot identifiers.
                       * For unit-based projects, try to reconstruct unit labels from
                       * saved floorConfigurations (floorName + unit index + roomType).
                       */}
                      {project.floorConfigurations &&
                      project.floorConfigurations.length > 0
                        ? // Build list of unit labels from floorConfigurations
                          project.floorConfigurations
                            .map((floor) => {
                              const names = [];
                              const rooms = floor.rooms || 0;
                              for (let i = 0; i < rooms; i++) {
                                const roomType =
                                  floor.roomTypes?.[i] ||
                                  floor.roomTypes?.[0] ||
                                  "Unit";
                                // e.g. "Floor 1 - Unit 1 (1BHK)" or "Ground Floor - Unit 1 (2BHK)"
                                names.push(
                                  `${floor.floorName} - ${i + 1} (${roomType})`
                                );
                              }
                              return names;
                            })
                            .flat()
                            .slice(0, 6) // limit to avoid overflowing table cell; show first 6
                            .join(", ") +
                          (project.floorConfigurations.reduce(
                            (s, f) => s + (f.rooms || 0),
                            0
                          ) > 6
                            ? "..."
                            : "")
                        : // Fallback: show completed plot/unit names
                          project.plots
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
                          project.plots?.length > 0 || project.units?.length > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {project.plots?.length > 0 || project.units?.length > 0
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
                        <ProjectDetailsTable
                          project={project}
                          onEditPlot={editPlotFromTable}
                          onEditUnit={editUnitFromTable}
                        />
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
  );

  const renderProjectForm = () => (
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
              window.confirm("Are you sure? All unsaved data will be lost.")
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
        {/* Left Column - Project Configuration */}
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
                  <option value="triplex">Triplex</option>
                  <option value="apartment">Apartment</option>
                  <option value="commercial">Commercial</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              {projectType === PROJECT_TYPES.COMMERCIAL && (
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
                    {COMMERCIAL_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Location Details */}
          {[
            PROJECT_TYPES.PLOTTING,
            PROJECT_TYPES.DUPLEX,
            PROJECT_TYPES.TRIPLEX,
            PROJECT_TYPES.APARTMENT,
            PROJECT_TYPES.COMMERCIAL,
          ].includes(projectType) && (
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

                {projectType === PROJECT_TYPES.COMMERCIAL && (
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

          {/* Plot/Unit Configuration */}
          {renderConfigurationPanel()}

          {/* Customize Select */}
          {showCustomizeSelect && (
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 md:mb-6 text-indigo-700">
                Select Type to Customize
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  "plotting",
                  "duplex",
                  "triplex",
                  "apartment",
                  "commercial",
                ].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleCustomizeTypeSelect(type)}
                    className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-500 hover:shadow transition-all duration-200 text-left hover:bg-blue-50"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 capitalize mb-2">
                      {type}
                    </h4>
                    {type === "duplex" && (
                      <p className="text-sm text-gray-600">
                        Fixed 2 floors (Ground + 1)
                      </p>
                    )}
                    {type === "triplex" && (
                      <p className="text-sm text-gray-600">
                        Fixed 3 floors (Ground + 1 + 2)
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Plot/Unit Details */}
        <div className="xl:col-span-2 space-y-6">{renderDetailsPanel()}</div>
      </div>
    </div>
  );

  const renderConfigurationPanel = () => {
    if (isPlotBased) {
      return (
        <>
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
                    onChange={(e) => setNumPlots(parseInt(e.target.value))}
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

          {plots.length > 0 && (
            <div className="bg-gray-50 p-4 md:p-5 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center">
                <FaList className="mr-2" />
                Plots List ({plots.length})
              </h2>
              <div className="space-y-2">
                {plots.map((plot, idx) => (
                  <div
                    key={plot.id}
                    className={`relative p-4 border rounded-lg flex items-center cursor-pointer transition-all duration-200 ${
                      selectedPlot?.id === plot.id
                        ? "bg-indigo-100 border-indigo-300 shadow-md"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => handlePlotClick(plot)}
                  >
                    <span
                      className={`font-bold mr-3 ${
                        plot.isComplete ? "text-indigo-700" : "text-gray-800"
                      }`}
                    >
                      {idx + 1}.
                    </span>
                    <span
                      className={
                        plot.isComplete
                          ? "font-medium text-gray-900"
                          : "font-semibold text-gray-800"
                      }
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
                          setPlots(plots.filter((p) => p.id !== plot.id));
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
                ))}
              </div>
            </div>
          )}
        </>
      );
    }

    if (isUnitBased) {
      return (
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

              {/* Enhanced Floor Configuration for Apartments */}
              {(projectType === PROJECT_TYPES.APARTMENT ||
                projectType === PROJECT_TYPES.DUPLEX ||
                projectType === PROJECT_TYPES.TRIPLEX ||
                (projectType === PROJECT_TYPES.COMMERCIAL &&
                  commercialSubType &&
                  commercialSubType !== "land")) && (
                <div
                  className={`mt-4 p-4 rounded-lg border ${
                    projectType === PROJECT_TYPES.APARTMENT
                      ? "bg-blue-50 border-blue-200"
                      : projectType === PROJECT_TYPES.DUPLEX
                      ? "bg-purple-50 border-purple-200"
                      : "bg-orange-50 border-orange-200"
                  }`}
                >
                  <h3
                    className={`text-lg font-semibold mb-3 ${
                      projectType === PROJECT_TYPES.APARTMENT
                        ? "text-blue-700"
                        : projectType === PROJECT_TYPES.DUPLEX
                        ? "text-purple-700"
                        : "text-orange-700"
                    }`}
                  >
                    {projectType === PROJECT_TYPES.COMMERCIAL
                      ? "Floor"
                      : projectType === PROJECT_TYPES.DUPLEX
                      ? "Duplex"
                      : projectType === PROJECT_TYPES.TRIPLEX
                      ? "Triplex"
                      : "Apartment"}{" "}
                    Floor Configuration
                  </h3>

                  {/* Number of Parking Floors for Apartments */}
                  {projectType === PROJECT_TYPES.APARTMENT && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Parking Floors
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={parkingFloors}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          const newCount = isNaN(val)
                            ? 0
                            : Math.max(0, Math.min(10, val));
                          setParkingFloors(newCount);

                          // Auto-generate parking floor names while preserving edits
                          setParkingFloorNames((prev) => {
                            const newNames = [];
                            for (let i = 1; i <= newCount; i++) {
                              // preserve existing name if present
                              if (prev && prev[i - 1]) {
                                newNames.push(prev[i - 1]);
                              } else {
                                newNames.push(`Floor ${i}`);
                              }
                            }
                            return newNames;
                          });
                        }}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Number of floors dedicated to parking facilities
                      </p>
                      {parkingFloors > 0 && (
                        <div className="mt-3 space-y-2">
                          <div className="text-sm font-medium text-gray-700">
                            Parking Floor Names
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            {Array.from({ length: parkingFloors }).map(
                              (_, idx) => (
                                <input
                                  key={idx}
                                  type="text"
                                  value={
                                    parkingFloorNames[idx] || `Floor ${idx + 1}`
                                  }
                                  onChange={(e) => {
                                    const newNames = [
                                      ...(parkingFloorNames || []),
                                    ];
                                    newNames[idx] = e.target.value;
                                    setParkingFloorNames(newNames);
                                  }}
                                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                  placeholder={`Floor ${idx + 1}`}
                                />
                              )
                            )}
                          </div>
                          <p className="text-xs text-gray-500">
                            You can edit the auto-generated names.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Total Units for Apartment/Duplex/Triplex */}
                  {(projectType === PROJECT_TYPES.APARTMENT ||
                    projectType === PROJECT_TYPES.DUPLEX ||
                    projectType === PROJECT_TYPES.TRIPLEX ||
                    (projectType === PROJECT_TYPES.COMMERCIAL &&
                      commercialSubType &&
                      commercialSubType !== "land")) && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total Number of Units
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="1000"
                        value={totalUnits}
                        onChange={(e) => {
                          const newTotalUnits = parseInt(e.target.value) || 0;
                          setTotalUnits(newTotalUnits);

                          // Auto-distribute units when total units changes
                          if (newTotalUnits > 0 && numFloors > 0) {
                            const unitsPerFloor = Math.floor(
                              newTotalUnits / numFloors
                            );
                            const remainder = newTotalUnits % numFloors;

                            const newConfigs = [...floorConfigurations];
                            let remainingUnits = newTotalUnits;

                            for (let i = 0; i < numFloors; i++) {
                              if (i < newConfigs.length) {
                                const floorUnits =
                                  i < remainder
                                    ? unitsPerFloor + 1
                                    : unitsPerFloor;
                                const actualUnits = Math.min(
                                  floorUnits,
                                  remainingUnits
                                );

                                newConfigs[i].rooms = actualUnits;
                                // Ensure roomTypes array matches rooms count
                                const currentTypes =
                                  newConfigs[i].roomTypes || [];
                                if (actualUnits > currentTypes.length) {
                                  const newTypes = [...currentTypes];
                                  for (
                                    let j = currentTypes.length;
                                    j < actualUnits;
                                    j++
                                  ) {
                                    newTypes.push("1BHK");
                                  }
                                  newConfigs[i].roomTypes = newTypes;
                                } else if (actualUnits < currentTypes.length) {
                                  newConfigs[i].roomTypes = currentTypes.slice(
                                    0,
                                    actualUnits
                                  );
                                }

                                remainingUnits -= actualUnits;
                              }
                            }
                            setFloorConfigurations(newConfigs);
                          }
                        }}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter total units"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Total units will be automatically distributed across
                        floors for {projectType} projects
                      </p>

                      {/* Unit Distribution Summary */}
                      {(projectType === PROJECT_TYPES.APARTMENT ||
                        projectType === PROJECT_TYPES.DUPLEX ||
                        projectType === PROJECT_TYPES.TRIPLEX ||
                        (projectType === PROJECT_TYPES.COMMERCIAL &&
                          commercialSubType &&
                          commercialSubType !== "land")) &&
                        totalUnits > 0 && (
                          <div className="mt-2 p-2 bg-white rounded border">
                            <div className="flex justify-between items-center text-sm">
                              <span className="font-medium">
                                Unit Distribution:
                              </span>
                              <span className="text-blue-600 font-semibold">
                                {floorConfigurations.reduce(
                                  (sum, floor) => sum + floor.rooms,
                                  0
                                )}{" "}
                                / {totalUnits} units allocated
                              </span>
                            </div>
                            {floorConfigurations.reduce(
                              (sum, floor) => sum + floor.rooms,
                              0
                            ) !== totalUnits && (
                              <div className="text-xs text-red-600 mt-1">
                                ⚠️ Unit distribution doesn't match total. Adjust
                                floor configurations.
                              </div>
                            )}
                          </div>
                        )}
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Floors
                    </label>
                    <input
                      type="number"
                      min={
                        projectType === PROJECT_TYPES.DUPLEX
                          ? 2
                          : projectType === PROJECT_TYPES.TRIPLEX
                          ? 3
                          : 1
                      }
                      max="50"
                      value={numFloors}
                      onChange={(e) => {
                        const minFloors =
                          projectType === PROJECT_TYPES.DUPLEX
                            ? 2
                            : projectType === PROJECT_TYPES.TRIPLEX
                            ? 3
                            : 1;
                        const val = e.target.value;
                        const newNumFloors =
                          val === ""
                            ? minFloors
                            : Math.max(parseInt(val, 10), minFloors);
                        setNumFloors(newNumFloors);

                        // Auto-generate floor names when number of floors changes
                        const newConfigs = [];
                        for (let i = 1; i <= newNumFloors; i++) {
                          const existingFloor = floorConfigurations[i - 1];
                          let defaultName = `Floor ${i}`;

                          // Special naming for duplex and triplex
                          if (projectType === PROJECT_TYPES.DUPLEX) {
                            defaultName =
                              i === 1
                                ? "Ground Floor"
                                : i === 2
                                ? "First Floor"
                                : `Floor ${i}`;
                          } else if (projectType === PROJECT_TYPES.TRIPLEX) {
                            defaultName =
                              i === 1
                                ? "Ground Floor"
                                : i === 2
                                ? "First Floor"
                                : i === 3
                                ? "Second Floor"
                                : `Floor ${i}`;
                          }

                          // Calculate units per floor for apartments
                          let rooms = 1;
                          let roomTypes = ["1BHK"];

                          if (
                            projectType === PROJECT_TYPES.APARTMENT &&
                            totalUnits > 0
                          ) {
                            const unitsPerFloor = Math.floor(
                              totalUnits / newNumFloors
                            );
                            const remainder = totalUnits % newNumFloors;
                            rooms =
                              i <= remainder
                                ? unitsPerFloor + 1
                                : unitsPerFloor;
                            roomTypes = Array(rooms).fill("1BHK");
                          } else if (existingFloor) {
                            rooms = existingFloor.rooms;
                            roomTypes = existingFloor.roomTypes;
                          } else {
                            // Default room types based on project type
                            roomTypes = [
                              projectType === PROJECT_TYPES.DUPLEX
                                ? "2BHK"
                                : projectType === PROJECT_TYPES.TRIPLEX
                                ? "2BHK"
                                : "1BHK",
                            ];
                          }

                          newConfigs.push({
                            floorNumber: i,
                            floorName: existingFloor?.floorName || defaultName,
                            rooms: rooms,
                            roomTypes: roomTypes,
                          });
                        }
                        setFloorConfigurations(newConfigs);
                      }}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      disabled={
                        projectType === PROJECT_TYPES.DUPLEX ||
                        projectType === PROJECT_TYPES.TRIPLEX
                      }
                      placeholder={
                        projectType === PROJECT_TYPES.DUPLEX
                          ? "2"
                          : projectType === PROJECT_TYPES.TRIPLEX
                          ? "3"
                          : "1"
                      }
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {projectType === PROJECT_TYPES.DUPLEX
                        ? "Fixed 2 floors (Ground + 1)"
                        : projectType === PROJECT_TYPES.TRIPLEX
                        ? "Fixed 3 floors (Ground + 1 + 2)"
                        : "Floors (excluding parking floors)"}
                    </p>
                  </div>

                  {/* Floor Configuration */}
                  {floorConfigurations.length > 0 && (
                    <div className="space-y-4 mt-4 max-h-80 overflow-y-auto pr-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-700">
                          Floor-wise Configuration
                          {(projectType === PROJECT_TYPES.APARTMENT ||
                            projectType === PROJECT_TYPES.DUPLEX ||
                            projectType === PROJECT_TYPES.TRIPLEX ||
                            (projectType === PROJECT_TYPES.COMMERCIAL &&
                              commercialSubType &&
                              commercialSubType !== "land")) && (
                            <span className="text-sm text-gray-500 ml-2">
                              (Total:{" "}
                              {floorConfigurations.reduce(
                                (sum, floor) => sum + floor.rooms,
                                0
                              )}{" "}
                              units)
                            </span>
                          )}
                        </h4>
                        {(projectType === PROJECT_TYPES.APARTMENT ||
                          projectType === PROJECT_TYPES.DUPLEX ||
                          projectType === PROJECT_TYPES.TRIPLEX ||
                          (projectType === PROJECT_TYPES.COMMERCIAL &&
                            commercialSubType &&
                            commercialSubType !== "land")) && (
                          <button
                            type="button"
                            onClick={() => {
                              // Auto-distribute units evenly
                              const unitsPerFloor = Math.floor(
                                totalUnits / numFloors
                              );
                              const remainder = totalUnits % numFloors;

                              const newConfigs = floorConfigurations.map(
                                (floor, index) => ({
                                  ...floor,
                                  rooms:
                                    index < remainder
                                      ? unitsPerFloor + 1
                                      : unitsPerFloor,
                                  roomTypes: Array(
                                    index < remainder
                                      ? unitsPerFloor + 1
                                      : unitsPerFloor
                                  ).fill(
                                    projectType === PROJECT_TYPES.APARTMENT
                                      ? "1BHK"
                                      : projectType === PROJECT_TYPES.COMMERCIAL
                                      ? "Unit"
                                      : "2BHK"
                                  ),
                                })
                              );
                              setFloorConfigurations(newConfigs);
                            }}
                            className="text-xs bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                          >
                            Auto-Distribute
                          </button>
                        )}
                      </div>

                      {floorConfigurations.map((floor, index) => (
                        <div
                          key={index}
                          className="p-3 bg-white rounded-lg border border-gray-200"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Floor Name
                              </label>
                              <input
                                type="text"
                                value={floor.floorName}
                                onChange={(e) => {
                                  const updatedConfigs = [
                                    ...floorConfigurations,
                                  ];
                                  updatedConfigs[index].floorName =
                                    e.target.value;
                                  setFloorConfigurations(updatedConfigs);
                                }}
                                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Floor name"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Space on this floor
                              </label>
                              <div className="flex space-x-2">
                                <input
                                  type="number"
                                  min="1"
                                  max="20"
                                  value={floor.rooms}
                                  onChange={(e) => {
                                    const roomCount =
                                      parseInt(e.target.value) || 1;
                                    const updatedConfigs = [
                                      ...floorConfigurations,
                                    ];
                                    updatedConfigs[index].rooms = roomCount;

                                    const currentTypes =
                                      updatedConfigs[index].roomTypes || [];
                                    if (roomCount > currentTypes.length) {
                                      const newTypes = [...currentTypes];
                                      for (
                                        let i = currentTypes.length;
                                        i < roomCount;
                                        i++
                                      ) {
                                        // default type depends on project type
                                        newTypes.push(
                                          projectType ===
                                            PROJECT_TYPES.APARTMENT
                                            ? "1BHK"
                                            : "2BHK"
                                        );
                                      }
                                      updatedConfigs[index].roomTypes =
                                        newTypes;
                                    } else if (
                                      roomCount < currentTypes.length
                                    ) {
                                      updatedConfigs[index].roomTypes =
                                        currentTypes.slice(0, roomCount);
                                    }

                                    setFloorConfigurations(updatedConfigs);
                                  }}
                                  className="flex-1 border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <span className="text-xs text-gray-500 flex items-center">
                                  units
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Room Type Selection for Apartments */}
                          {(projectType === PROJECT_TYPES.APARTMENT ||
                            projectType === PROJECT_TYPES.DUPLEX ||
                            projectType === PROJECT_TYPES.TRIPLEX ||
                            (projectType === PROJECT_TYPES.COMMERCIAL &&
                              commercialSubType &&
                              commercialSubType !== "land")) &&
                            floor.rooms > 0 && (
                              <div className="mt-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Space on this floor
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {Array.from(
                                    { length: floor.rooms },
                                    (_, roomIndex) => (
                                      <div
                                        key={roomIndex}
                                        className="flex flex-col space-y-2"
                                      >
                                        <label className="text-sm text-gray-600">
                                          Unit {roomIndex + 1} Type
                                        </label>
                                        <select
                                          value={
                                            floor.roomTypes[roomIndex] ||
                                            (projectType ===
                                            PROJECT_TYPES.APARTMENT
                                              ? "1BHK"
                                              : projectType ===
                                                PROJECT_TYPES.COMMERCIAL
                                              ? "Unit"
                                              : "2BHK")
                                          }
                                          onChange={(e) => {
                                            const updatedConfigs = [
                                              ...floorConfigurations,
                                            ];
                                            updatedConfigs[index].roomTypes[
                                              roomIndex
                                            ] = e.target.value;
                                            setFloorConfigurations(
                                              updatedConfigs
                                            );
                                          }}
                                          className="flex-1 border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                          {/* Default options for Apartments and Duplex/Triplex */}
                                          {projectType ===
                                          PROJECT_TYPES.APARTMENT ? (
                                            <>
                                              <option value="1BHK">
                                                1 BHK
                                              </option>
                                              <option value="2BHK">
                                                2 BHK
                                              </option>
                                              <option value="3BHK">
                                                3 BHK
                                              </option>
                                              <option value="4BHK">
                                                4 BHK
                                              </option>
                                              <option value="Studio">
                                                Studio
                                              </option>
                                              <option value="Penthouse">
                                                Penthouse
                                              </option>
                                            </>
                                          ) : projectType ===
                                            PROJECT_TYPES.COMMERCIAL ? (
                                            <>
                                              <option value="Office">
                                                Office
                                              </option>
                                              <option value="Shop">Shop</option>
                                              <option value="Showroom">
                                                Showroom
                                              </option>
                                              <option value="Godown">
                                                Godown
                                              </option>
                                              <option value="Unit">Unit</option>
                                            </>
                                          ) : (
                                            <>
                                              <option value="2BHK">
                                                2 BHK
                                              </option>
                                              <option value="3BHK">
                                                3 BHK
                                              </option>
                                              <option value="4BHK">
                                                4 BHK
                                              </option>
                                              <option value="Penthouse">
                                                Penthouse
                                              </option>
                                            </>
                                          )}
                                        </select>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  )}

                  {(() => {
                    const configuredTotal = floorConfigurations.reduce(
                      (sum, floor) => sum + (floor.rooms || 0),
                      0
                    );
                    const isFloorGeneratorMode =
                      projectType === PROJECT_TYPES.APARTMENT ||
                      projectType === PROJECT_TYPES.DUPLEX ||
                      projectType === PROJECT_TYPES.TRIPLEX ||
                      (projectType === PROJECT_TYPES.COMMERCIAL &&
                        commercialSubType &&
                        commercialSubType !== "land");
                    const needsAdjust =
                      isFloorGeneratorMode && configuredTotal !== totalUnits;
                    const btnColorClass =
                      projectType === PROJECT_TYPES.DUPLEX
                        ? "bg-purple-500 hover:bg-purple-600"
                        : projectType === PROJECT_TYPES.TRIPLEX
                        ? "bg-orange-500 hover:bg-orange-600"
                        : "bg-blue-500 hover:bg-blue-600"; // apartment/commercial/default

                    return (
                      <button
                        onClick={generateUnits}
                        disabled={needsAdjust}
                        className={`w-full text-white py-2 px-4 rounded-md transition duration-300 font-medium mt-4 ${
                          needsAdjust
                            ? "bg-blue-300 cursor-not-allowed"
                            : btnColorClass
                        }`}
                      >
                        {needsAdjust
                          ? `Adjust Units (${configuredTotal}/${totalUnits})`
                          : `Generate ${
                              projectType === PROJECT_TYPES.DUPLEX
                                ? "Duplex"
                                : projectType === PROJECT_TYPES.TRIPLEX
                                ? "Triplex"
                                : projectType === PROJECT_TYPES.COMMERCIAL
                                ? "Commercial"
                                : "Apartment"
                            } Units (${configuredTotal} total)`}
                      </button>
                    );
                  })()}

                  {projectType === PROJECT_TYPES.APARTMENT && (
                    <div className="mt-2 text-xs text-gray-500">
                      {parkingFloors > 0 && (
                        <div>
                          🏢 Total Floors: {numFloors + parkingFloors} (
                          {numFloors} residential + {parkingFloors} parking)
                        </div>
                      )}
                      <div>
                        🏠 Residential Units: {totalUnits} across {numFloors}{" "}
                        floors
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* For commercial (non-land) we use the floor-wise generator above */}
            </div>
          </div>

          {units.length > 0 && (
            <div className="bg-gray-50 p-4 md:p-5 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center">
                <FaList className="mr-2" />
                Units List ({units.length})
              </h2>
              <div className="space-y-2">
                {units.map((unit, idx) => (
                  <div
                    key={unit.id}
                    className={`relative p-4 border rounded-lg flex items-center cursor-pointer transition-all duration-200 ${
                      selectedUnit?.id === unit.id
                        ? "bg-indigo-100 border-indigo-300 shadow-md"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => handleUnitClick(unit)}
                  >
                    <span
                      className={`font-bold mr-3 ${
                        unit.isComplete ? "text-indigo-700" : "text-gray-800"
                      }`}
                    >
                      {idx + 1}.
                    </span>
                    <div className="flex-1">
                      <span
                        className={
                          unit.isComplete
                            ? "font-medium text-gray-900"
                            : "font-semibold text-gray-900"
                        }
                      >
                        {unit.name}
                      </span>
                      {unit.floor && (
                        <div className="text-xs text-gray-500">
                          Floor {unit.floor} • {unit.roomType}
                        </div>
                      )}
                    </div>
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
                          setUnits(units.filter((u) => u.id !== unit.id));
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
                ))}
              </div>
            </div>
          )}
        </>
      );
    }

    return null;
  };

  const renderDetailsPanel = () => {
    // Default messages
    if (
      (isPlotBased && plots.length === 0) ||
      (isUnitBased && units.length === 0)
    ) {
      return (
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
      );
    }

    if ((isPlotBased && !selectedPlot) || (isUnitBased && !selectedUnit)) {
      return (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 h-full flex items-center justify-center">
          <div className="text-center">
            <FaInfoCircle className="mx-auto h-16 w-16 text-indigo-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Select a {isPlotBased ? "Plot" : "Unit"}
            </h3>
            <p className="text-gray-500 mb-4">
              Click on a {isPlotBased ? "plot" : "unit"} from the list on the
              left to view and edit detailed information
            </p>
          </div>
        </div>
      );
    }

    // Plot Details
    if (isPlotBased && selectedPlot) {
      return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2
              className={`text-2xl font-bold ${
                selectedPlot.isComplete ? "text-gray-900" : "text-red-500"
              }`}
            >
              {selectedPlot.name} Details
            </h2>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                Plot
              </span>
              <button
                onClick={() => setSelectedPlot(null)}
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
                  <span className="ml-2 text-sm text-gray-700">Yes</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    checked={!isCornerPlot}
                    onChange={() => setIsCornerPlot(false)}
                    className="text-indigo-600 focus:ring-indigo-500 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>

            {/* Property Features - Updated for Commercial */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center">
                <FaBuilding className="mr-2" />
                Property Features
              </h3>

              {/* Book Title Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Book Title
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {["Lower Basement", "Upper Basement", "Ground"].map(
                    (title) => (
                      <label
                        key={title}
                        className="inline-flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="bookTitle"
                          checked={propertyFeatures.bookTitle === title}
                          onChange={() =>
                            setPropertyFeatures({
                              ...propertyFeatures,
                              bookTitle: title,
                            })
                          }
                          className="text-indigo-600 focus:ring-indigo-500 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {title}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Total Rooms */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Rooms
                </label>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 14 }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() =>
                        setPropertyFeatures({
                          ...propertyFeatures,
                          totalRooms: num.toString(),
                        })
                      }
                      className={`px-3 py-2 border rounded-md text-sm font-medium transition-colors ${
                        propertyFeatures.totalRooms === num.toString()
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Furnished Status */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Furnished Status
                </label>
                <div className="flex space-x-6">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="furnishedStatus"
                      checked={propertyFeatures.furnishedStatus === "Furnished"}
                      onChange={() =>
                        setPropertyFeatures({
                          ...propertyFeatures,
                          furnishedStatus: "Furnished",
                        })
                      }
                      className="text-indigo-600 focus:ring-indigo-500 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Furnished
                    </span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="furnishedStatus"
                      checked={
                        propertyFeatures.furnishedStatus === "Unfurnished"
                      }
                      onChange={() =>
                        setPropertyFeatures({
                          ...propertyFeatures,
                          furnishedStatus: "Unfurnished",
                        })
                      }
                      className="text-indigo-600 focus:ring-indigo-500 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Unfurnished
                    </span>
                  </label>
                </div>
              </div>

              {/* Yearrooms */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yearrooms
                </label>
                <div className="flex space-x-4">
                  {[0, 1, 2, 3, "3+"].map((value) => (
                    <label
                      key={value}
                      className="inline-flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="yearrooms"
                        checked={
                          propertyFeatures.yearrooms === value.toString()
                        }
                        onChange={() =>
                          setPropertyFeatures({
                            ...propertyFeatures,
                            yearrooms: value.toString(),
                          })
                        }
                        className="text-indigo-600 focus:ring-indigo-500 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {value}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Personal Washroom */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personal Washroom
                </label>
                <div className="flex space-x-6">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="personalWashroom"
                      checked={propertyFeatures.personalWashroom === "Yes"}
                      onChange={() =>
                        setPropertyFeatures({
                          ...propertyFeatures,
                          personalWashroom: "Yes",
                        })
                      }
                      className="text-indigo-600 focus:ring-indigo-500 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="personalWashroom"
                      checked={propertyFeatures.personalWashroom === "No"}
                      onChange={() =>
                        setPropertyFeatures({
                          ...propertyFeatures,
                          personalWashroom: "No",
                        })
                      }
                      className="text-indigo-600 focus:ring-indigo-500 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>

              {/* Pantry/Cafeteria */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pantry/Cafeteria
                </label>
                <div className="flex space-x-6">
                  {["Dry", "Wet", "Not Available"].map((option) => (
                    <label
                      key={option}
                      className="inline-flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="pantryCafeteria"
                        checked={propertyFeatures.pantryCafeteria === option}
                        onChange={() =>
                          setPropertyFeatures({
                            ...propertyFeatures,
                            pantryCafeteria: option,
                          })
                        }
                        className="text-indigo-600 focus:ring-indigo-500 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Floors Allowed for construction */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Floors Allowed for construction
                </label>
                <select
                  value={propertyFeatures.floorsAllowed}
                  onChange={(e) =>
                    setPropertyFeatures({
                      ...propertyFeatures,
                      floorsAllowed: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Total Floor</option>
                  <option value="1">1 Floor</option>
                  <option value="2">2 Floors</option>
                  <option value="3">3 Floors</option>
                  <option value="4">4 Floors</option>
                  <option value="5+">5+ Floors</option>
                </select>
              </div>

              {/* Area Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area
                </label>
                <div className="space-y-4">
                  <div className="flex space-x-6">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="areaType"
                        checked={propertyFeatures.areaType === "Carpet Area"}
                        onChange={() =>
                          setPropertyFeatures({
                            ...propertyFeatures,
                            areaType: "Carpet Area",
                          })
                        }
                        className="text-indigo-600 focus:ring-indigo-500 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Carpet Area
                      </span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="areaType"
                        checked={propertyFeatures.areaType === "Super Area"}
                        onChange={() =>
                          setPropertyFeatures({
                            ...propertyFeatures,
                            areaType: "Super Area",
                          })
                        }
                        className="text-indigo-600 focus:ring-indigo-500 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Super Area
                      </span>
                    </label>
                  </div>

                  {propertyFeatures.areaType === "Carpet Area" && (
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-700">Carpet Area</span>
                      <input
                        type="number"
                        value={propertyFeatures.carpetArea}
                        onChange={(e) =>
                          setPropertyFeatures({
                            ...propertyFeatures,
                            carpetArea: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Area"
                      />
                      <span className="text-sm text-gray-700">Sq ft</span>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={true}
                          className="text-indigo-600 focus:ring-indigo-500 rounded"
                          readOnly
                        />
                        <span className="ml-2 text-sm text-gray-700">✓</span>
                      </label>
                    </div>
                  )}

                  {propertyFeatures.areaType === "Super Area" && (
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-700">Super Area</span>
                      <input
                        type="number"
                        value={propertyFeatures.superArea}
                        onChange={(e) =>
                          setPropertyFeatures({
                            ...propertyFeatures,
                            superArea: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Area"
                      />
                      <span className="text-sm text-gray-700">Sq ft</span>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={true}
                          className="text-indigo-600 focus:ring-indigo-500 rounded"
                          readOnly
                        />
                        <span className="ml-2 text-sm text-gray-700">✓</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Transaction Type, Property Availability */}
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-700 mb-3">
                  Transaction Type, Property Availability
                </h4>

                {/* Possession Status */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Possession Status
                  </label>
                  <div className="flex space-x-6">
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

                {/* Currently Leased out */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currently Leased out
                  </label>
                  <div className="flex space-x-6">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="currentlyLeasedOut"
                        checked={propertyFeatures.currentlyLeasedOut === "Yes"}
                        onChange={() =>
                          setPropertyFeatures({
                            ...propertyFeatures,
                            currentlyLeasedOut: "Yes",
                          })
                        }
                        className="text-indigo-600 focus:ring-indigo-500 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="currentlyLeasedOut"
                        checked={propertyFeatures.currentlyLeasedOut === "No"}
                        onChange={() =>
                          setPropertyFeatures({
                            ...propertyFeatures,
                            currentlyLeasedOut: "No",
                          })
                        }
                        className="text-indigo-600 focus:ring-indigo-500 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">No</span>
                    </label>
                  </div>
                </div>

                {/* Assured Returns */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assured Returns
                  </label>
                  <div className="flex space-x-6">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="assuredReturns"
                        checked={propertyFeatures.assuredReturns === "Yes"}
                        onChange={() =>
                          setPropertyFeatures({
                            ...propertyFeatures,
                            assuredReturns: "Yes",
                          })
                        }
                        className="text-indigo-600 focus:ring-indigo-500 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="assuredReturns"
                        checked={propertyFeatures.assuredReturns === "No"}
                        onChange={() =>
                          setPropertyFeatures({
                            ...propertyFeatures,
                            assuredReturns: "No",
                          })
                        }
                        className="text-indigo-600 focus:ring-indigo-500 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">No</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Price Details */}
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-700 mb-3">
                  Price Details
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expected Price
                    </label>
                    <input
                      type="text"
                      value={propertyFeatures.expectedPrice}
                      onChange={(e) =>
                        setPropertyFeatures({
                          ...propertyFeatures,
                          expectedPrice: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter Total Price"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Booking/Token Amount (optional)
                    </label>
                    <input
                      type="text"
                      value={propertyFeatures.tokenAmount}
                      onChange={(e) =>
                        setPropertyFeatures({
                          ...propertyFeatures,
                          tokenAmount: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Booking/Token Amount"
                    />
                  </div>
                </div>
              </div>

              {/* Original Property Features (Keep existing functionality) */}
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
                            customFacilities.filter((f) => f !== facility)
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
                    min="0"
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
                    min="0"
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
                    min="0"
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
                    {BROKER_LIST.map((brokerItem) => (
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

            {/* Transaction Details */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center">
                <FaCalendarAlt className="mr-2" />
                Transaction Details
              </h3>
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
                    <option value="Ready to Move">🏠 Ready to Move</option>
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
        </div>
      );
    }

    // Unit Details
    if (isUnitBased && selectedUnit) {
      const currentPropertyFeatures =
        projectType === PROJECT_TYPES.TRIPLEX
          ? triplexPropertyFeatures
          : duplexPropertyFeatures;
      const currentAreaDetails =
        projectType === PROJECT_TYPES.TRIPLEX
          ? triplexAreaDetails
          : duplexAreaDetails;
      const setCurrentPropertyFeatures =
        projectType === PROJECT_TYPES.TRIPLEX
          ? setTriplexPropertyFeatures
          : setDuplexPropertyFeatures;
      const setCurrentAreaDetails =
        projectType === PROJECT_TYPES.TRIPLEX
          ? setTriplexAreaDetails
          : setDuplexAreaDetails;

      return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2
              className={`text-2xl font-bold ${
                selectedUnit.isComplete ? "text-gray-900" : "text-red-500"
              }`}
            >
              {selectedUnit.name} Details
            </h2>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                {projectType === PROJECT_TYPES.TRIPLEX ? "Triplex" : "Unit"}
              </span>
              <button
                onClick={() => setSelectedUnit(null)}
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
                    Bed Rooms
                  </label>
                  <input
                    type="text"
                    value={currentPropertyFeatures.bedrooms || ""}
                    onChange={(e) =>
                      setCurrentPropertyFeatures({
                        ...currentPropertyFeatures,
                        bedrooms: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., 2, 3, 4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="text"
                    value={currentPropertyFeatures.bathrooms || ""}
                    onChange={(e) =>
                      setCurrentPropertyFeatures({
                        ...currentPropertyFeatures,
                        bathrooms: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., 2, 3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Balcony
                  </label>
                  <input
                    type="text"
                    value={currentPropertyFeatures.balcony || ""}
                    onChange={(e) =>
                      setCurrentPropertyFeatures({
                        ...currentPropertyFeatures,
                        balcony: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., 1, 2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Floors
                  </label>
                  <input
                    type="text"
                    value={currentPropertyFeatures.totalFloors || ""}
                    onChange={(e) =>
                      setCurrentPropertyFeatures({
                        ...currentPropertyFeatures,
                        totalFloors: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., Ground + 2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Floor No
                  </label>
                  <input
                    type="text"
                    value={currentPropertyFeatures.floorNo}
                    onChange={(e) =>
                      setCurrentPropertyFeatures({
                        ...currentPropertyFeatures,
                        floorNo: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., Ground, 1st, 2nd"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total room (according to floor No)
                  </label>
                  <input
                    type="text"
                    value={currentPropertyFeatures.totalRooms}
                    onChange={(e) =>
                      setCurrentPropertyFeatures({
                        ...currentPropertyFeatures,
                        floorNo: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., Ground, 1st, 2nd"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Furnished Status
                  </label>
                  <select
                    value={currentPropertyFeatures.furnishedStatus}
                    onChange={(e) =>
                      setCurrentPropertyFeatures({
                        ...currentPropertyFeatures,
                        furnishedStatus: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="Unfurnished">Unfurnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Fully Furnished">Fully Furnished</option>
                  </select>
                </div>
              </div>

              {/* Facilities */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Facilities
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {FACILITIES.map((facility) => (
                    <label
                      key={facility.key}
                      className="inline-flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={currentPropertyFeatures[facility.key]}
                        onChange={(e) =>
                          setCurrentPropertyFeatures({
                            ...currentPropertyFeatures,
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
                        checked={currentPropertyFeatures[facility] || false}
                        onChange={(e) =>
                          setCurrentPropertyFeatures({
                            ...currentPropertyFeatures,
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
                            unitCustomFacilities.filter((f) => f !== facility)
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
                    value={currentPropertyFeatures.newFacility || ""}
                    onChange={(e) =>
                      setCurrentPropertyFeatures({
                        ...currentPropertyFeatures,
                        newFacility: e.target.value,
                      })
                    }
                  />
                  <button
                    type="button"
                    className="ml-2 bg-indigo-500 text-white px-3 py-1 rounded"
                    onClick={() => {
                      if (
                        currentPropertyFeatures.newFacility &&
                        !unitCustomFacilities.includes(
                          currentPropertyFeatures.newFacility.trim()
                        )
                      ) {
                        setUnitCustomFacilities([
                          ...unitCustomFacilities,
                          currentPropertyFeatures.newFacility.trim(),
                        ]);
                        setCurrentPropertyFeatures({
                          ...currentPropertyFeatures,
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
                    min="0"
                    value={currentAreaDetails.carpetArea}
                    onChange={(e) =>
                      setCurrentAreaDetails({
                        ...currentAreaDetails,
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
                    min="0"
                    value={currentAreaDetails.builtUpArea}
                    onChange={(e) =>
                      setCurrentAreaDetails({
                        ...currentAreaDetails,
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
                    min="0"
                    value={currentAreaDetails.superBuiltUpArea}
                    onChange={(e) =>
                      setCurrentAreaDetails({
                        ...currentAreaDetails,
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
                    min="0"
                    value={currentAreaDetails.constructionArea}
                    onChange={(e) =>
                      setCurrentAreaDetails({
                        ...currentAreaDetails,
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
                    min="0"
                    value={currentAreaDetails.landArea}
                    onChange={(e) =>
                      setCurrentAreaDetails({
                        ...currentAreaDetails,
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
                    {BROKER_LIST.map((brokerItem) => (
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

            {/* Transaction Details */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center">
                <FaCalendarAlt className="mr-2" />
                Transaction Details
              </h3>
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
                    <option value="Ready to Move">🏠 Ready to Move</option>
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
      );
    }

    return null;
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

        {!showForm ? renderProjectList() : renderProjectForm()}

        {viewProjectId && viewProjectData && (
          <ProjectViewForm
            project={viewProjectData}
            onClose={closeViewProject}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectManagement;
