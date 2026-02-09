import { useState, useEffect } from "react";
import axios from "axios";

import {
    FaSpinner,
    FaList,
    FaHome,
    FaTrash,
    FaChevronLeft,
    FaChevronRight,
    FaInfoCircle,
    FaCheck,
    FaCheckCircle,
    FaArrowRight,
    FaEdit,
    FaTimes,
    FaMoneyBill,
    FaPlus,
    FaBolt,
    FaCogs,
    FaBuilding,
    FaLayerGroup,
    FaHandshake,
    FaUserTie,
    FaUsers,
    FaKey,
    FaStamp,
    FaHardHat,
    FaTools,
    FaMoneyCheckAlt,
    FaHandHoldingUsd,
    FaShieldAlt,
    FaCalendarAlt,
    FaCompass,
    FaRulerCombined,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export const MainInfoSection = ({
    mainInfo,
    setMainInfo,
    onSave,
    unitPrefix,
    setUnitPrefix,
    numUnits,
    setNumUnits,
    facilities,
    setFacilities,
    customFacilities,
    setCustomFacilities,
    projectType,
    PROJECT_TYPES,
    projectName,
    units,
    setUnits,
    onUnitClick,
    selectedUnit,
    showSpecifications,
    setShowSpecifications,
    setSelectedUnit,
    checkUnitCompletion,
    projectId,
    onContinueToFloors,
    isEditMode = false,
    selectedProject = null,
    FACILITIES = [],
    FACING_OPTIONS = [],
    BROKER_LIST = [],
    INITIAL_MAIN_INFO = {},
    INITIAL_FLOOR_DETAILS = {},
    INITIAL_PROPERTY_FEATURES = {},
    INITIAL_AREA_DETAILS = {},
    INITIAL_APPROVAL_STATUS = [],
    INITIAL_TRANSACTION_TYPE = {},
    INITIAL_PRICE_DETAILS = {},
}) => {
    const [newFacility, setNewFacility] = useState("");
    const [broker, setBroker] = useState("");
    const [purchaser, setPurchaser] = useState("");
    const [contractor, setContractor] = useState("");
    const [staffEngaged, setStaffEngaged] = useState("");
    const [loanProvider, setLoanProvider] = useState("");
    const [possessionStatus, setPossessionStatus] = useState("");
    const [availableFromMonth, setAvailableFromMonth] = useState("");
    const [availableFromYear, setAvailableFromYear] = useState("");
    const [contractorWorkType, setContractorWorkType] = useState("");
    const [propertyFeatures, setPropertyFeatures] = useState({
        openSides: "",
    });
    const [approvalStatus, setApprovalStatus] = useState([
        { authority: "", status: "" },
    ]);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    // const [units, setUnits] = useState([]);

const [brokerListState, setBrokerListState] = useState([]);
const [contractorList, setContractorList] = useState([]);

const [loadingBrokers, setLoadingBrokers] = useState(false);
const [loadingContractors, setLoadingContractors] = useState(false);

const getBrokers = async () => {
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

    if (res.data?.success && Array.isArray(res.data.data)) {
      setBrokerListState(res.data.data);
    } else {
      setBrokerListState([]);
    }
  } catch (error) {
    console.error("❌ Error fetching brokers:", error);
    setBrokerListState([]);
  } finally {
    setLoadingBrokers(false);
  }
};

const getContractors = async () => {
  try {
    setLoadingContractors(true);

    const res = await axios.get(
      "https://csaapnodeapibackend.csaap.com/api/tenant/contractors",
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (res.data?.success && Array.isArray(res.data.data)) {
      setContractorList(res.data.data);
    } else {
      setContractorList([]);
    }
  } catch (error) {
    console.error("❌ Error fetching contractors:", error);
    setContractorList([]);
  } finally {
    setLoadingContractors(false);
  }
};


    useEffect(() => {
        console.log('🔥 MainInfoSection received units:', units, 'Length:', units?.length);
        if (selectedUnit) {
            setBroker(selectedUnit.broker_id?.toString() || "");
            setPurchaser(selectedUnit.purchaser || "");
            setContractor(selectedUnit.contractor || "");
            setStaffEngaged(selectedUnit.staff_engaged || "");
            setLoanProvider(selectedUnit.loan_provider || "");
            setPossessionStatus(selectedUnit.possession_status || "");
            setAvailableFromMonth(selectedUnit.transaction_type?.availableFrom?.month || "");
            setAvailableFromYear(selectedUnit.transaction_type?.availableFrom?.year || "");
            setContractorWorkType(selectedUnit.contractor_work_type || "");
            setPropertyFeatures(prev => ({
                ...prev,
                openSides: selectedUnit.open_sides?.toString() || "",
            }));
            const validApprovalStatus = Array.isArray(selectedUnit.approval_status) && selectedUnit.approval_status.length > 0
                ? selectedUnit.approval_status
                : [{ authority: "", status: "" }];
            setApprovalStatus(validApprovalStatus);
        } else {
            setBroker("");
            setPurchaser("");
            setContractor("");
            setStaffEngaged("");
            setLoanProvider("");
            setPossessionStatus("");
            setAvailableFromMonth("");
            setAvailableFromYear("");
            setContractorWorkType("");
            setPropertyFeatures({ openSides: "" });
            setApprovalStatus([{ authority: "", status: "" }]);
        }
    }, [selectedUnit]);

    const getRoomType = (unitData) => {
        const bedrooms = unitData.propertyFeatures?.bedrooms || 2;
        switch (bedrooms) {
            case 1: return "1BHK";
            case 2: return "2BHK";
            case 3: return "3BHK";
            case 4: return "4BHK";
            default: return `${bedrooms}BHK`;
        }
    };

    const EditableArea = ({ unit }) => {
        const [isEditing, setIsEditing] = useState(false);
        const [areaValue, setAreaValue] = useState(unit.areaDetails?.carpetArea || "");

        const handleSave = () => {
            if (areaValue !== unit.areaDetails?.carpetArea) {
                const updatedUnits = units.map((u) => {
                    if (u.id === unit.id) {
                        return {
                            ...u,
                            areaDetails: { ...u.areaDetails, carpetArea: areaValue },
                        };
                    }
                    return u;
                });
                setUnits(updatedUnits);
            }
            setIsEditing(false);
        };

        const handleCancel = () => {
            setAreaValue(unit.areaDetails?.carpetArea || "");
            setIsEditing(false);
        };

        if (isEditing) {
            return (
                <div className="flex items-center gap-1.5">
                    <input
                        type="number"
                        value={areaValue}
                        onChange={(e) => setAreaValue(e.target.value)}
                        className="w-16 p-1 text-xs font-semibold border border-indigo-200 rounded-md focus:border-indigo-500 outline-none bg-white"
                        onKeyPress={(e) => e.key === "Enter" && handleSave()}
                    />
                    <button onClick={handleSave} className="text-emerald-600 hover:bg-emerald-50 p-1 rounded transition-all">
                        <FaCheck size={10} />
                    </button>
                    <button onClick={handleCancel} className="text-rose-500 hover:bg-rose-50 p-1 rounded transition-all">
                        <FaTimes size={10} />
                    </button>
                </div>
            );
        }

        return (
            <div className={`flex items-center gap-1 group transition-all`}>
                <span className="text-xs text-slate-500 font-medium">Area:</span>
                <span className="text-sm font-bold text-slate-800">{unit.areaDetails?.carpetArea || "-"}</span>
                <span className="text-xs text-slate-400 font-medium">sqft</span>
                <button
                    onClick={() => setIsEditing(true)}
                    className="text-slate-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-50 p-0.5 rounded"
                >
                    <FaEdit size={10} />
                </button>
            </div>
        );
    };

    const handleApprovalChange = (index, field, value) => {
        const updatedApprovals = [...approvalStatus];
        updatedApprovals[index][field] = value;
        setApprovalStatus(updatedApprovals);
    };

    const addApprovalAuthority = () => {
        setApprovalStatus([...approvalStatus, { authority: "", status: "" }]);
    };

    const removeApprovalAuthority = (index) => {
        const updatedApprovals = approvalStatus.filter((_, i) => i !== index);
        setApprovalStatus(updatedApprovals);
    };

    const handleFacilityToggle = (facilityKey) => {
        setFacilities((prev) => ({
            ...prev,
            [facilityKey]: !prev[facilityKey],
        }));
    };

    const handleInputChange = (field, value) => {
        setMainInfo((prev) => {
            const updated = { ...prev, [field]: value };
            const ground = parseFloat(updated.groundFloorArea) || 0;
            const first = parseFloat(updated.firstFloorArea) || 0;
            const second = parseFloat(updated.secondFloorArea) || 0;
            const staircase = parseFloat(updated.staircaseArea) || 0;
            updated.totalBuiltUpArea = ground + first + second + staircase;
            return updated;
        });
    };

    const addCustomFacility = () => {
        if (newFacility.trim() && !customFacilities.includes(newFacility.trim())) {
            setCustomFacilities([...customFacilities, newFacility.trim()]);
            setNewFacility("");
        }
    };

    const removeCustomFacility = (facility) => {
        setCustomFacilities(customFacilities.filter((f) => f !== facility));
    };

    const generateUnits = async () => {
        if (numUnits <= 0 || !unitPrefix.trim()) return;

        setIsSaving(true);
        try {
            const newUnits = [];
            const currentMaxId = units.length > 0 ? Math.max(...units.map((u) => u.id)) : 0;

            for (let i = 1; i <= numUnits; i++) {
                const paddedNumber = String(i).padStart(3, '0');
                const unitName = `${unitPrefix}-${paddedNumber}`;
                const unitId = currentMaxId + i;

                const unitData = {
                    id: unitId,
                    name: unitName,
                    mainInfo: { ...INITIAL_MAIN_INFO },
                    floors: {
                        groundFloor: { ...INITIAL_FLOOR_DETAILS },
                        firstFloor: { ...INITIAL_FLOOR_DETAILS },
                        ...(projectType === PROJECT_TYPES.TRIPLEX && {
                            secondFloor: { ...INITIAL_FLOOR_DETAILS },
                        }),
                    },
                    propertyFeatures: {
                        bedrooms: projectType === PROJECT_TYPES.DUPLEX || projectType === PROJECT_TYPES.TRIPLEX ? 2 : 1,
                        bathrooms: projectType === PROJECT_TYPES.DUPLEX || projectType === PROJECT_TYPES.TRIPLEX ? 2 : 1,
                        balconies: 1,
                        parking: 1,
                    },
                    area_details: {
                        ...INITIAL_AREA_DETAILS,
                        carpet_area: projectType === PROJECT_TYPES.DUPLEX ? "1200" : projectType === PROJECT_TYPES.TRIPLEX ? "1500" : "1000",
                    },
                    approvalStatus: [{ authority: "", status: "" }],
                    transactionType: { possessionStatus: "", availableFrom: { month: "", year: "" } },
                    priceDetails: { expectedPrice: "", tokenAmount: "", priceNegotiable: false },
                    broker: "",
                    purchaser: "",
                    contractor: "",
                    isComplete: false,
                };

                const localUnit = {
                    ...unitData,
                    id: unitId,
                    name: unitName,
                    unit_prefix: unitPrefix || "UNIT",
                    block_name: "Block A",
                    room_type: getRoomType(unitData),
                    floor_name: "Ground Floor",
                    facing: unitData.mainInfo?.facing || "North",
                    individual_boundary: unitData.mainInfo?.individualBoundary || false,
                    land_area: parseFloat(unitData.mainInfo?.landArea) || 0,
                    property_features: {
                        bedrooms: unitData.propertyFeatures?.bedrooms || 2,
                        bathrooms: unitData.propertyFeatures?.bathrooms || 2,
                        parking: unitData.propertyFeatures?.parking || 1,
                        balconies: unitData.propertyFeatures?.balconies || 1,
                    },
                    area_details: {
                        carpet_area: parseFloat(unitData.areaDetails?.carpetArea) || 0,
                        built_up_area: parseFloat(unitData.mainInfo?.totalBuiltUpArea) || 0,
                        plot_area: parseFloat(unitData.mainInfo?.landArea) || 0,
                    },
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                };

                newUnits.push(localUnit);
            }

            setUnits((prev) => [...prev, ...newUnits]);
            setUnitPrefix("");
            setNumUnits(1);
            setSuccess(`Generated ${numUnits} units successfully.`);
        } catch (error) {
            setError(`Failed to create units.`);
        } finally {
            setIsSaving(false);
        }
    };

    const hasFloorDetails = (unit) => {
        return (
            unit.floors &&
            (unit.floors.groundFloor?.totalBedrooms ||
                unit.floors.firstFloor?.totalBedrooms ||
                (unit.floors.secondFloor && unit.floors.secondFloor.totalBedrooms))
        );
    };

    return (
        <div className="bg-linear-to-br from-slate-50 to-white rounded-2xl border border-slate-200 overflow-hidden">


            {/* Main Content */}
            <div className="p-2 space-y-2">
                {/* Success Message */}
                <AnimatePresence mode="wait">
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="p-3 bg-linear-to-r from-emerald-50 to-emerald-100 text-emerald-800 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 border border-emerald-200"
                        >
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm">
                                <FaCheckCircle size={12} />
                            </div>
                            {success}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Selected Unit Banner */}
                {selectedUnit && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-linear-to-r from-white to-indigo-50 border border-indigo-100 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-1 h-full " />
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow">
                                <FaBuilding size={18} />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-lg font-bold text-slate-900">{selectedUnit.name}</h3>
                                    <span className="bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full border border-indigo-200">
                                        Active
                                    </span>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-2.5 h-2.5 rounded-full ${hasFloorDetails(selectedUnit) ? "bg-emerald-500" : "bg-slate-300"}`} />
                                        <span className="text-xs font-medium text-slate-600">Floor Layout</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-2.5 h-2.5 rounded-full ${selectedUnit.isComplete ? "bg-emerald-500" : "bg-slate-300"}`} />
                                        <span className="text-xs font-medium text-slate-600">Unit Core</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                const updatedUnits = units.map(u => u.id === selectedUnit.id ? { ...u, isComplete: !u.isComplete } : u);
                                setUnits(updatedUnits);
                            }}
                            className={`mt-3 md:mt-0 px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${selectedUnit.isComplete
                                ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-600"
                                : "bg-gradient-to-r from-slate-900 to-black text-white border-slate-900"}`}
                        >
                            {selectedUnit.isComplete ? "✓ Verified" : "Mark Ready"}
                        </button>
                    </motion.div>
                )}

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - 2/3 width */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Unit Configuration Card */}
                        <div className="bg-white p-6 rounded-xl border border-slate-300 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-4 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-full" />
                                <h4 className="text-lg font-bold text-slate-900">Unit Configuration</h4>
                            </div>
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                                            <FaList size={11} className="text-indigo-500" />
                                            Total Units
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={numUnits}
                                            onChange={(e) => setNumUnits(parseInt(e.target.value) || 1)}
                                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 outline-none transition-all text-sm font-semibold text-slate-800"
                                            placeholder="Enter units"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                                            <FaEdit size={11} className="text-indigo-500" />
                                            Unit Prefix
                                        </label>
                                        <input
                                            type="text"
                                            value={unitPrefix}
                                            onChange={(e) => setUnitPrefix(e.target.value)}
                                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 outline-none transition-all text-sm font-semibold text-slate-800"
                                            placeholder="E.g. UNIT"
                                        />
                                    </div>
                                </div>
                                {isEditMode && units.length > 0 ? (
                                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                        <p className="text-xs font-semibold text-blue-700 flex items-center gap-2">
                                            <FaCheckCircle size={12} />
                                            {units.length} units already created
                                        </p>
                                        <p className="text-xs text-blue-600 mt-1">Click on units below to edit them individually</p>
                                    </div>
                                ) : (
                                    <button
                                        onClick={generateUnits}
                                        disabled={isSaving || !unitPrefix.trim()}
                                        className="mt-4 w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSaving ? <FaSpinner className="animate-spin" size={12} /> : <FaPlus size={12} />}
                                        Generate {numUnits} Units
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Amenities Card */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-4 bg-gradient-to-b from-amber-400 to-amber-500 rounded-full" />
                                <h4 className="text-lg font-bold text-slate-900">Amenities & Provisions</h4>
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    {FACILITIES.map((facility) => (
                                        <button
                                            key={facility.key}
                                            onClick={() => handleFacilityToggle(facility.key)}
                                            className={`px-3 py-2 rounded-lg border text-xs font-bold uppercase tracking-wider text-center transition-all ${facilities[facility.key]
                                                ? "bg-gradient-to-br from-slate-900 to-black border-slate-900 text-white"
                                                : "bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-indigo-50"}`}
                                        >
                                            {facility.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Custom Facilities */}
                                <div className="bg-gradient-to-r from-amber-50 to-white p-4 rounded-lg border border-amber-100">
                                    <label className="text-sm font-semibold text-slate-700 mb-2 block">Add Custom Facility</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newFacility}
                                            onChange={(e) => setNewFacility(e.target.value)}
                                            onKeyPress={(e) => e.key === "Enter" && addCustomFacility()}
                                            className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 focus:border-amber-400 focus:ring-1 focus:ring-amber-100 outline-none transition-all text-sm font-medium text-slate-700"
                                            placeholder="Custom facility..."
                                        />
                                        <button
                                            onClick={addCustomFacility}
                                            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 rounded-lg text-xs font-bold uppercase tracking-wider hover:shadow-sm"
                                        >
                                            <FaPlus size={10} className="inline mr-1.5" />
                                            Add
                                        </button>
                                    </div>
                                </div>

                                {/* Custom Facilities Display */}
                                {customFacilities.length > 0 && (
                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {customFacilities.map((f, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1.5 bg-gradient-to-r from-white to-slate-50 border border-slate-200 text-slate-700 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm"
                                            >
                                                {f}
                                                <button
                                                    onClick={() => removeCustomFacility(f)}
                                                    className="text-slate-400 hover:text-rose-500 transition-colors p-0.5 hover:bg-rose-50 rounded"
                                                >
                                                    <FaTimes size={10} />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Unit Registry */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-1 h-4 bg-gradient-to-b from-indigo-400 to-indigo-500 rounded-full" />
                            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Unit Registry</h4>
                            <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">
                                {units.length} Units
                            </span>
                        </div>
                        {console.log('🔥 Unit Registry - units array:', units, 'Length:', units?.length, 'isEditMode:', isEditMode)}
                        <div className="bg-white border border-slate-200 rounded-xl p-3 h-[500px] overflow-y-auto space-y-3">
                            {units.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3">
                                    <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-white rounded-full flex items-center justify-center border border-dashed border-slate-300">
                                        <FaList size={20} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-semibold text-slate-500">No Units Created</p>
                                        <p className="text-xs text-slate-400">Generate units to start</p>
                                    </div>
                                </div>
                            ) : (
                                units.map((unit) => (
                                    <div
                                        key={unit.id}
                                        onClick={() => onUnitClick(unit)}
                                        className={`p-2 rounded-xl border cursor-pointer transition-all ${selectedUnit?.id === unit.id
                                            ? "bg-gradient-to-r from-indigo-50 to-white border-indigo-400 shadow"
                                            : "bg-white border-slate-100 hover:border-indigo-200"}`}
                                    >
                                        {/* {selectedUnit?.id === unit.id && (
                                            <div className="absolute top-0 left-0" />
                                        )} */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* LEFT: Unit header */}
  <div>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center ${
            selectedUnit?.id === unit.id
              ? "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          <FaHome size={12} />
        </div>
        <div>
          <h5 className="text-sm font-bold text-slate-800">{unit.name}</h5>
         
        </div>
      </div>

      {unit.isComplete && (
        <div className="w-6 h-6 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-full flex items-center justify-center text-emerald-600 border border-emerald-200">
          <FaCheckCircle size={10} />
        </div>
      )}
    </div>
  </div>

  {/* RIGHT: Editable area */}
  <div className="border-l border-slate-100 pl-4">
    <EditableArea unit={unit} />
  </div>
</div>

                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Unit Specification Section - Only shown when unit is selected */}
                {selectedUnit && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pt-6 border-t border-slate-200 space-y-6"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div className="flex items-center gap-3 mb-3 md:mb-0">
                                <div className="w-1 h-5 bg-gradient-to-b from-slate-900 to-black rounded-full" />
                                <h4 className="text-xl font-bold text-slate-900">Unit Specification</h4>
                            </div>

                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Parameter Matrix */}
                            <section className="lg:col-span-2 space-y-4">
                                <div className="bg-white border border-slate-100 rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-9 h-9 bg-gradient-to-br from-slate-50 to-white rounded-lg flex items-center justify-center text-slate-600 border border-slate-200">
                                            <FaCogs size={14} />
                                        </div>
                                        <h5 className="text-md font-bold text-slate-900">Parameter Matrix</h5>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {[
                                            { label: "Facing Direction", key: "facing", type: "select", options: FACING_OPTIONS },
                                            { label: "Total Land Area", key: "landArea", type: "number", suffix: "sqft" },
                                            { label: "Ground Floor Area", key: "groundFloorArea", type: "number", suffix: "sqft" },
                                            { label: "First Floor Area", key: "firstFloorArea", type: "number", suffix: "sqft" },
                                            { label: "Second Floor Area", key: "secondFloorArea", type: "number", suffix: "sqft" },
                                            { label: "Staircase Area", key: "staircaseArea", type: "number", suffix: "sqft" },
                                            { label: "Total Built-up Area", key: "totalBuiltUpArea", type: "number", suffix: "sqft", disabled: true },
                                        ].map((field) => (
                                            <div key={field.key} className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700">{field.label}</label>
                                                {field.type === "select" ? (
                                                    <select
                                                        value={mainInfo[field.key]}
                                                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                                                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 focus:border-indigo-500 outline-none text-sm font-semibold text-slate-800 cursor-pointer"
                                                    >
                                                        <option value="">Select {field.label}</option>
                                                        {field.options.map(opt => (
                                                            <option key={opt} value={opt}>{opt}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <div className="relative">
                                                        <input
                                                            type="number"
                                                            value={mainInfo[field.key] || ""}
                                                            onChange={(e) => handleInputChange(field.key, e.target.value)}
                                                            disabled={field.disabled}
                                                            className={`w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 focus:border-indigo-500 outline-none text-sm font-semibold text-slate-800 ${field.disabled ? "bg-slate-50 text-slate-500" : ""}`}
                                                            placeholder={`Enter ${field.label.toLowerCase()}`}
                                                        />
                                                        {field.suffix && (
                                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                                                                {field.suffix}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))}

                                        {/* Individual Boundary */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">Individual Boundary</label>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleInputChange("individualBoundary", true)}
                                                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${mainInfo.individualBoundary === true
                                                        ? "bg-gradient-to-r from-emerald-500 to-emerald-600 border-emerald-600 text-white"
                                                        : "bg-white border-slate-200 text-slate-600 hover:border-emerald-300"}`}
                                                >
                                                    ✓ Yes
                                                </button>
                                                <button
                                                    onClick={() => handleInputChange("individualBoundary", false)}
                                                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${mainInfo.individualBoundary === false
                                                        ? "bg-gradient-to-r from-rose-500 to-rose-600 border-rose-600 text-white"
                                                        : "bg-white border-slate-200 text-slate-600 hover:border-rose-300"}`}
                                                >
                                                    ✗ No
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Price Details Card */}
                            <section className="space-y-4">
                                <div className="bg-gradient-to-br from-slate-900 to-black rounded-xl p-5 text-white relative overflow-hidden">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-9 h-9 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center text-amber-400">
                                            <FaMoneyBill size={14} />
                                        </div>
                                        <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Price Details</h5>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { label: "Expected Price", key: "expectedPrice" },
                                            { label: "Booking Amount", key: "tokenAmount" },
                                        ].map((field) => (
                                            <div key={field.key} className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">{field.label}</label>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">₹</span>
                                                    <input
                                                        type="number"
                                                        value={mainInfo[field.key] || ""}
                                                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-2.5 focus:border-amber-400/50 outline-none text-sm font-bold text-white placeholder:text-white/20"
                                                        placeholder="0.00"
                                                    />
                                                </div>
                                            </div>
                                        ))}
<div className="space-x-18 flex">
  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
    Price Negotiable :
  </label>

  <div
    className="flex items-center gap-3 cursor-pointer select-none"
    onClick={() =>
      handleInputChange("priceNegotiable", !mainInfo.priceNegotiable)
    }
  >
    {/* Checkbox box */}
    <div
      className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all
        ${
          mainInfo.priceNegotiable
            ? "bg-emerald-500 border-emerald-500"
            : "border-slate-400"
        }`}
    >
      {mainInfo.priceNegotiable && (
        <span className="text-white text-xs font-bold">✓</span>
      )}
    </div>

    {/* Label text */}
    <span
      className={`text-sm font-semibold ${
        mainInfo.priceNegotiable ? "text-emerald-600" : "text-slate-500"
      }`}
    >
      Negotiable
    </span>
  </div>
</div>


                                    </div>
                                </div>
                            </section>

                            {/* Operations & Statutory Details */}
                            <section className="lg:col-span-3">
                                <div className="bg-white border border-slate-100 rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-9 h-9 bg-gradient-to-br from-slate-50 to-white rounded-lg flex items-center justify-center text-slate-600 border border-slate-200">
                                            <FaShieldAlt size={14} />
                                        </div>
                                        <h5 className="text-md font-bold text-slate-900">Operations & Statutory Details</h5>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {[
                                            {
                                                label: "Open Sides",
                                                value: propertyFeatures.openSides,
                                                onChange: (e) => setPropertyFeatures(prev => ({ ...prev, openSides: e.target.value })),
                                                type: "select",
                                                options: [1, 2, 3, 4].map(n => ({ value: n, label: `${n} Sides` }))
                                            },
                                            {
                                                label: "Broker",
                                                value: broker,
                                                onChange: (e) => setBroker(e.target.value),
                                                type: "select",
                                                options: brokerListState
                                            },
                                            {
                                                label: "Staff Engaged",
                                                value: staffEngaged,
                                                onChange: (e) => setStaffEngaged(e.target.value),
                                                type: "text",
                                                placeholder: "Staff name/ID"
                                            },
                                       {
  label: "Contractor",
  value: contractor,
  onChange: (e) => setcontractor(e.target.value),
  type: "select",
  options: contractorList
},

                                            {
                                                label: "Work Type",
                                                value: contractorWorkType,
                                                onChange: (e) => setcontractorWorkType(e.target.value),
                                                type: "select",
                                                options: ["Civil Only", "Finishing Only", "Turnkey", "MEP Only", "Consulting"]
                                            },
                                            {
                                                label: "Loan Provider",
                                                value: loanProvider,
                                                onChange: (e) => setLoanProvider(e.target.value),
                                                type: "text",
                                                placeholder: "Loan provider"
                                            },
                                        ].map((field) => (
                                            <div key={field.label} className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700">{field.label}</label>
                                                {field.type === "select" ? (
                                                    <select
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 focus:border-indigo-500 outline-none text-sm font-semibold text-slate-800 cursor-pointer"
                                                    >
                                                        <option value="">Select {field.label}</option>
                                                        {field.options.map(opt => (
                                                            <option key={field.type === "select" && opt.id ? opt.id : opt}
                                                                value={field.type === "select" && opt.id ? opt.id : opt}>
                                                                {field.type === "select" && opt.name ? opt.name : opt.label ? opt.label : opt}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <input
                                                        type="text"
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 focus:border-indigo-500 outline-none text-sm font-semibold text-slate-800 placeholder:text-slate-400"
                                                        placeholder={field.placeholder}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Transaction Details */}
                                    <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-9 h-9 bg-gradient-to-br from-slate-50 to-white rounded-lg flex items-center justify-center text-slate-600 border border-slate-200">
                                                <FaKey size={14} />
                                            </div>
                                            <h5 className="text-md font-bold text-slate-900">Transaction Details</h5>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {[
                                                {
                                                    label: "Possession Status",
                                                    value: possessionStatus,
                                                    onChange: (e) => setPossessionStatus(e.target.value),
                                                    type: "select",
                                                    options: ["Ready to Move", "Under Construction", "1 Month", "3 Months", "6 Months"]
                                                },
                                                {
                                                    label: "Available Month",
                                                    value: availableFromMonth,
                                                    onChange: (e) => setAvailableFromMonth(e.target.value),
                                                    type: "select",
                                                    options: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                                                },
                                                {
                                                    label: "Available Year",
                                                    value: availableFromYear,
                                                    onChange: (e) => setAvailableFromYear(e.target.value),
                                                    type: "select",
                                                    options: Array.from({ length: 15 }, (_, i) => new Date().getFullYear() + i)
                                                },
                                            ].map((field) => (
                                                <div key={field.label} className="space-y-2">
                                                    <label className="text-sm font-semibold text-slate-700">{field.label}</label>
                                                    <select
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 focus:border-indigo-500 outline-none text-sm font-semibold text-slate-800 cursor-pointer"
                                                    >
                                                        <option value="">Select {field.label}</option>
                                                        {field.options.map(opt => (
                                                            <option key={opt} value={opt}>{opt}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Approval Status Matrix */}
                                    <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 bg-gradient-to-br from-slate-50 to-white rounded-lg flex items-center justify-center text-slate-600 border border-slate-200">
                                                    <FaStamp size={14} />
                                                </div>
                                                <h5 className="text-md font-bold text-slate-900">Approval Status Matrix</h5>
                                            </div>
                                            <button
                                                onClick={addApprovalAuthority}
                                                className="bg-gradient-to-r from-slate-900 to-black text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:shadow-sm"
                                            >
                                                <FaPlus size={10} className="inline mr-1.5" />
                                                Add Authority
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3">
                                            {approvalStatus.map((approval, index) => (
                                                <div
                                                    key={index}
                                                    className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-200 group relative"
                                                >
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-semibold text-slate-900">Approval Authority</label>
                                                        <input
                                                            type="text"
                                                            value={approval.authority}
                                                            onChange={(e) => handleApprovalChange(index, "authority", e.target.value)}
                                                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-sm font-bold text-slate-800"
                                                            placeholder="e.g. BBMP, BDA"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-semibold text-slate-900">Current Status</label>
                                                        <select
                                                            value={approval.status}
                                                            onChange={(e) => handleApprovalChange(index, "status", e.target.value)}
                                                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 focus:border-indigo-500 outline-none text-sm font-semibold text-slate-800 cursor-pointer"
                                                        >
                                                            <option value="">Select Status</option>
                                                            {["Applied", "Under Review", "Approved", "Rejected", "Pending Docs"].map(s => (
                                                                <option key={s} value={s}>{s}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <button
                                                        onClick={() => removeApprovalAuthority(index)}
                                                        className="absolute -top-2 -right-2 w-6 h-6 bg-white text-slate-400 rounded-full flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 shadow border border-slate-200 opacity-0 group-hover:opacity-100 transition-all"
                                                    >
                                                        <FaTimes size={10} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div>
                            <button
                                onClick={onContinueToFloors}
                                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:shadow-sm"
                            >
                                Proceed to Next
                                <FaArrowRight size={10} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};