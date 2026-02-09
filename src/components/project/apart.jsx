ApartmentProject.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaPlus,
  FaTrash,
  FaRulerCombined,
  FaCheckCircle,
  FaList,
  FaBuilding,
  FaHome,
  FaCar,
  FaCheck,
  FaTimes,
  FaEdit,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import {
  INITIAL_PRICE_DETAILS,
  INITIAL_PROPERTY_FEATURES,
  INITIAL_AREA_DETAILS,
  INITIAL_TRANSACTION_TYPE,
  INITIAL_APPROVAL_STATUS,
} from "../ABC/shared/initialStates";
import { BROKER_LIST, FACILITIES } from "../ABC/shared/Constants";

const API_URL = "https://api.csaap.com/api/tenantuser/projects";
const SUBDOMAIN = "cloudflare";

const ApartmentProject = ({
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
   editingProjectId,
  selectedProject,
}) => {
  /* -------------- state -------------- */
  const [blocks, setBlocks] = useState([]);
  const [numBlocks, setNumBlocks] = useState(1);
  const [totalUnits, setTotalUnits] = useState(0);
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [priceDetails, setPriceDetails] = useState(INITIAL_PRICE_DETAILS);
  const [propertyFeatures, setPropertyFeatures] = useState(
    INITIAL_PROPERTY_FEATURES
  );

  const [areaDetails, setAreaDetails] = useState(INITIAL_AREA_DETAILS);
  const [broker, setBroker] = useState("");
  const [purchaser, setPurchaser] = useState("");
  const [constructor, setConstructor] = useState("");
  const [approvalStatus, setApprovalStatus] = useState(INITIAL_APPROVAL_STATUS);
  const [transactionType, setTransactionType] = useState(
    INITIAL_TRANSACTION_TYPE
  );
  const [unitCustomFacilities, setUnitCustomFacilities] = useState([]);
  // Revenue Plots State
  const [revenuePlots, setRevenuePlots] = useState(0);
  const [plotsData, setPlotsData] = useState([]);
  const [landArea, setLandArea] = useState(0);
  const [attachment, setAttachment] = useState(null);

  // New: persisted project info returned from API after quick create
  const [projectId, setProjectId] = useState(null);
  const [createdProject, setCreatedProject] = useState(null);
  const [isCreatingQuick, setIsCreatingQuick] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const isEditMode = Boolean(editingProjectId);
  // show tick immediately UX flag (option 2)
  const [showTickImmediate, setShowTickImmediate] = useState(false);

  // UI success banner
  const [successMessage, setSuccessMessage] = useState("");
  // Add these to your state declarations
  const [staffEngaged, setStaffEngaged] = useState("");
  const [loanProvider, setLoanProvider] = useState("");
  const [loan, setLoan] = useState("");

  // Add these approval handler functions
  const handleApprovalChange = (index, field, value) => {
    const updatedApprovalStatus = [...approvalStatus];
    updatedApprovalStatus[index] = {
      ...updatedApprovalStatus[index],
      [field]: value,
    };
    setApprovalStatus(updatedApprovalStatus);
  };

  const addApprovalAuthority = () => {
    setApprovalStatus([...approvalStatus, { authority: "", status: "" }]);
  };

  const removeApprovalAuthority = (index) => {
    const updatedApprovalStatus = approvalStatus.filter((_, i) => i !== index);
    setApprovalStatus(updatedApprovalStatus);
  };

  /* -------------- Effects & helpers -------------- */
  useEffect(() => {
    if (revenuePlots > plotsData.length) {
      const newPlots = [...plotsData];
      for (let i = plotsData.length; i < revenuePlots; i++) {
        newPlots[i] = {
          area: "",
          entryPlotNo: "",
          khataNo: "",
          fileName: "",
          file: null,
        };
      }
      setPlotsData(newPlots);
    } else if (revenuePlots < plotsData.length) {
      setPlotsData(plotsData.slice(0, revenuePlots));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revenuePlots]);

  const handlePlotChange = (index, field, value) => {
    const updatedPlotsData = [...plotsData];
    updatedPlotsData[index] = {
      ...updatedPlotsData[index],
      [field]: value,
    };
    setPlotsData(updatedPlotsData);
  };

  const handlePlotFileChange = (index, file) => {
    const updatedPlotsData = [...plotsData];
    updatedPlotsData[index] = {
      ...updatedPlotsData[index],
      fileName: file ? file.name : "",
      file: file,
    };
    setPlotsData(updatedPlotsData);
  };

  const calculateTotalPlotsArea = () => {
    return plotsData.reduce((total, plot) => {
      return total + (parseFloat(plot?.area) || 0);
    }, 0);
  };

  const getFilledPlotsCount = () => {
    return plotsData.filter(
      (plot) =>
        plot && (plot.area || plot.entryPlotNo || plot.khataNo || plot.fileName)
    ).length;
  };

  const handleRevenuePlotsChange = (value) => {
    const numPlots = parseInt(value) || 0;
    const limitedPlots = Math.min(numPlots, 50);
    setRevenuePlots(limitedPlots);
  };

  const clearAllPlots = () => {
    setPlotsData([]);
    setRevenuePlots(0);
  };

  const addPlot = () => {
    setRevenuePlots((prev) => prev + 1);
  };

  const removePlot = (index) => {
    const updatedPlotsData = plotsData.filter((_, i) => i !== index);
    setPlotsData(updatedPlotsData);
    setRevenuePlots((prev) => Math.max(0, prev - 1));
  };

  /* ------------------ Utilities ------------------ */

  const formatServerErrors = (err) => {
    const respData = err?.response?.data;
    if (!respData) {
      return err?.message || String(err);
    }

    if (Array.isArray(respData)) {
      return respData.map((i) =>
        typeof i === "string" ? i : JSON.stringify(i)
      );
    }

    if (respData.errors) {
      if (Array.isArray(respData.errors)) {
        return respData.errors.map((e) =>
          typeof e === "string" ? e : JSON.stringify(e)
        );
      } else if (typeof respData.errors === "object") {
        const messages = [];
        Object.keys(respData.errors).forEach((k) => {
          const val = respData.errors[k];
          if (Array.isArray(val)) {
            val.forEach((m) => messages.push(`${k}: ${m}`));
          } else {
            messages.push(`${k}: ${String(val)}`);
          }
        });
        return messages;
      }
    }

    if (respData.message && typeof respData.message === "string") {
      return respData.message;
    }

    const nested = respData.data || respData.error || respData;
    if (typeof nested === "string") return nested;
    return JSON.stringify(respData);
  };

  /* -------------------- API helper functions -------------------- */

  const createBlockRemote = async (pid, blockPayload) => {
    const rawToken = localStorage.getItem("token") || "";
    const headers = rawToken ? { Authorization: `Bearer ${rawToken}` } : {};
    const url = `${API_URL}/${pid}/blocks`;
    console.log("createBlockRemote() -> POST", url, blockPayload);
    return axios.post(url, blockPayload, { headers });
  };

  const createFloorDetailsRemote = async (pid, unitId, floorPayload) => {
    const rawToken = localStorage.getItem("token") || "";
    const headers = rawToken ? { Authorization: `Bearer ${rawToken}` } : {};
    const url = `${API_URL}/${pid}/units/${unitId}/floor-details`;
    console.log("createFloorDetailsRemote() -> POST", url, floorPayload);
    return axios.post(url, floorPayload, { headers });
  };

  const createUnitRemote = async (pid, unitPayload) => {
    const rawToken = localStorage.getItem("token") || "";
    const headers = rawToken ? { Authorization: `Bearer ${rawToken}` } : {};
    const url = `${API_URL}/${pid}/units`;
    console.log("createUnitRemote() -> POST", url, unitPayload);
    return axios.post(url, unitPayload, { headers });
  };

  const generateBlocks = async () => {
    console.log("🧱 generateBlocks() called — starting block generation...", {
      numBlocks,
      currentBlocks: blocks.length,
    });

    if (numBlocks <= 0) {
      alert("Please enter a valid number of blocks/towers");
      console.warn("⚠️ Invalid numBlocks:", numBlocks);
      return;
    }

    const maxId = blocks.length > 0 ? Math.max(...blocks.map((b) => b.id)) : 0;
    const newBlocks = [];

    for (let i = 1; i <= numBlocks; i++) {
      const blockNumber = blocks.length + i;
      newBlocks.push({
        id: maxId + i,
        name: `Block ${blockNumber}`,
        prefix: `B${blockNumber}`,
        totalUnits: 1,
        parkingFloors: 0,
        residentialFloors: 1,
        floorConfigurations: [],
        units: [],
        isConfigured: false,
        isExpanded: false,
        createdAt: new Date().toLocaleString(),
        status: "draft",
        _serverId: null,
        _serverSaved: false,
        _serverError: null,
        _serverErrorDetails: null,
      });
    }

    const updatedBlocks = [...blocks, ...newBlocks];
    setBlocks(updatedBlocks);

    console.log(
      `✅ Locally generated ${newBlocks.length} block(s):`,
      newBlocks.map((b) => b.name)
    );

    const newTotalUnits = updatedBlocks.reduce(
      (sum, block) => sum + (Number(block.totalUnits) || 0),
      0
    );
    setTotalUnits(newTotalUnits);

    alert(`✅ Generated ${numBlocks} block(s)/tower(s) successfully!`);

    // If no projectId, attempt to create a minimal project quick so we can post blocks
    let pid = projectId;
    if (!pid) {
      console.log("📡 No projectId found — creating project quickly...");
      try {
        setIsCreatingQuick(true);
        const resp = await createProjectQuick();
        const extracted = extractIdFromCreateResp(resp);
        if (extracted) {
          pid = extracted;
          setProjectId(pid);
          console.log("✅ Project created. ID:", pid);
        } else {
          console.warn(
            "⚠️ Could not extract project id after quick create:",
            resp
          );
        }
      } catch (err) {
        console.error("❌ generateBlocks: createProjectQuick failed:", err);
      } finally {
        setIsCreatingQuick(false);
      }
    }

    if (!pid) {
      console.warn("⚠️ No projectId available — skipping API save for blocks.");
      return;
    }

    const startIndex = blocks.length;
    const endIndex = startIndex + newBlocks.length;

    let success = 0;
    let failed = 0;
    const blocksCopy = [...updatedBlocks];

    console.log(
      `🚀 Syncing ${newBlocks.length} block(s) with API (projectId: ${pid})...`
    );

    for (let idx = startIndex; idx < endIndex; idx++) {
      const localBlock = blocksCopy[idx];
      const blockPayload = {
        subdomain: SUBDOMAIN,
        block_name: localBlock.name || `Block ${idx + 1}`,
        prefix: localBlock.prefix || `B${idx + 1}`,
        total_units: Math.max(1, Number(localBlock.totalUnits || 0)),
        parking_floors: Math.max(0, Number(localBlock.parkingFloors || 0)),
        residential_floors: Math.max(
          1,
          Number(localBlock.residentialFloors || 1)
        ),
        description:
          localBlock.description ||
          `Block ${localBlock.name || idx + 1} created from UI`,
      };

      try {
        const res = await createBlockRemote(pid, blockPayload);
        const returned = res?.data ?? res;

        const serverId =
          returned?.id ||
          returned?._id ||
          returned?.block_id ||
          returned?.blockId ||
          (typeof returned === "number" ? returned : null);

        blocksCopy[idx] = {
          ...blocksCopy[idx],
          _serverSaved: true,
          _serverError: null,
          _serverResponse: returned,
          _serverId: serverId,
        };
        console.log(
          `✅ Block "${localBlock.name}" saved to server (id: ${
            serverId || "unknown"
          })`
        );
        success++;
      } catch (err) {
        const formatted = formatServerErrors(err);
        console.error(
          `❌ Block "${localBlock.name}" failed to save:`,
          formatted,
          err
        );

        blocksCopy[idx] = {
          ...blocksCopy[idx],
          _serverSaved: false,
          _serverError: Array.isArray(formatted)
            ? formatted.join(" | ")
            : String(formatted),
          _serverErrorDetails: formatted,
        };
        failed++;
      }
    }

    setBlocks(blocksCopy);

    const summaryParts = [];
    if (success) summaryParts.push(`${success} saved`);
    if (failed) summaryParts.push(`${failed} failed`);
    if (summaryParts.length) {
      alert(`Blocks sync result: ${summaryParts.join(", ")}`);
    } else {
      alert("No blocks were sent to server.");
    }

    console.log("🏁 Block generation complete:", {
      totalBlocks: blocksCopy.length,
      success,
      failed,
      savedBlocks: blocksCopy.filter((b) => b._serverSaved).map((b) => b.name),
      failedBlocks: blocksCopy
        .filter((b) => !b._serverSaved)
        .map((b) => ({
          name: b.name,
          error: b._serverErrorDetails || b._serverError,
        })),
    });
  };

  // ---------- UPDATED updateBlock: accepts intermediate strings and finalizes on blur ----------
  const updateBlock = (blockId, field, value, opts = {}) => {
    const isFinalize = opts.finalize === true;

    const updatedBlocks = blocks.map((block) => {
      if (block.id === blockId) {
        const newBlock = { ...block };

        if (
          field === "totalUnits" ||
          field === "residentialFloors" ||
          field === "parkingFloors"
        ) {
          if (isFinalize) {
            const numeric = parseInt(value, 10);
            if (field === "residentialFloors") {
              newBlock.residentialFloors =
                Number.isFinite(numeric) && numeric >= 1 ? numeric : 1;
            } else if (field === "parkingFloors") {
              newBlock.parkingFloors =
                Number.isFinite(numeric) && numeric >= 0 ? numeric : 0;
            } else {
              newBlock.totalUnits =
                Number.isFinite(numeric) && numeric >= 0 ? numeric : 0;
            }
          } else {
            // keep intermediate value as string while typing
            newBlock[field] = value === "" ? "" : value;
          }
        } else {
          newBlock[field] = value;
        }

        return newBlock;
      }
      return block;
    });

    setBlocks(updatedBlocks);

    // Recompute overall totalUnits (count only numeric values)
    const numericTotal = updatedBlocks.reduce((sum, b) => {
      const val = b.totalUnits;
      const n = typeof val === "number" ? val : parseInt(val, 10);
      return sum + (Number.isFinite(n) ? n : 0);
    }, 0);

    setTotalUnits(numericTotal);
  };

  const removeBlock = (blockId) => {
    if (window.confirm("Are you sure you want to remove this block/tower?")) {
      const blockToRemove = blocks.find((block) => block.id === blockId);
      if (blockToRemove && blockToRemove.units.length > 0) {
        setUnits((prevUnits) =>
          prevUnits.filter((unit) => unit.blockId !== blockId)
        );
      }

      const updatedBlocks = blocks.filter((block) => block.id !== blockId);
      setBlocks(updatedBlocks);

      const newTotalUnits = updatedBlocks.reduce(
        (sum, block) => sum + Number(block.totalUnits || 0),
        0
      );
      setTotalUnits(newTotalUnits);

      alert("Block removed successfully!");
    }
  };

  // ---------- New helpers for floor config updates ----------
  const updateFloorConfiguration = (
    blockId,
    floorIndex,
    field,
    value,
    opts = {}
  ) => {
    const isFinalize = opts.finalize === true;
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id !== blockId) return b;
        const configs = (b.floorConfigurations || []).map((floor, idx) => {
          if (idx !== floorIndex) return floor;
          const updated = { ...floor };
          if (field === "rooms") {
            if (isFinalize) {
              const numeric = parseInt(value, 10);
              updated.rooms =
                Number.isFinite(numeric) && numeric >= 0 ? numeric : 0;
            } else {
              updated.rooms = value === "" ? "" : value;
            }
          } else {
            updated[field] = value;
          }
          return updated;
        });
        return { ...b, floorConfigurations: configs };
      })
    );
  };

  const updateRoomType = (blockId, floorIndex, roomIndex, roomType) => {
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id !== blockId) return b;
        const configs = (b.floorConfigurations || []).map((floor, idx) => {
          if (idx !== floorIndex) return floor;
          const roomTypes = Array.isArray(floor.roomTypes)
            ? [...floor.roomTypes]
            : [];
          const targetLength = Number(floor.rooms) || 0;
          while (roomTypes.length < targetLength) roomTypes.push("1BHK");
          roomTypes[roomIndex] = roomType;
          return { ...floor, roomTypes };
        });
        return { ...b, floorConfigurations: configs };
      })
    );
  };

  const updateUnitPrefix = (blockId, floorIndex, roomIndex, prefix) => {
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id !== blockId) return b;
        const configs = (b.floorConfigurations || []).map((floor, idx) => {
          if (idx !== floorIndex) return floor;
          const prefixes = Array.isArray(floor.unitPrefixes)
            ? [...floor.unitPrefixes]
            : [];
          const targetLength = Number(floor.rooms) || 0;
          while (prefixes.length < targetLength) prefixes.push("");
          prefixes[roomIndex] = prefix;
          return { ...floor, unitPrefixes: prefixes };
        });
        return { ...b, floorConfigurations: configs };
      })
    );
  };

  // UPDATED configureBlockFloors to POST to floor-details endpoint and to coerce numbers safely
  const configureBlockFloors = async (block) => {
    const totalResidential =
      Number.isFinite(Number(block.residentialFloors)) &&
      Number(block.residentialFloors) > 0
        ? Number(block.residentialFloors)
        : parseInt(block.residentialFloors, 10) || 0;

    if (!totalResidential || totalResidential <= 0) {
      alert("Please enter a valid number of residential floors");
      return;
    }

    // Build floor configurations locally first (same as before)
    const updatedBlocks = blocks.map((b) => {
      if (b.id === block.id) {
        const newConfigs = [];

        // parking floors
        for (let i = 1; i <= Number(b.parkingFloors || 0); i++) {
          newConfigs.push({
            floorNumber: i,
            floorName: `Parking Floor ${i}`,
            floorType: "parking",
            rooms: 0,
            roomTypes: [],
            isParking: true,
            canEdit: true,
            isExpanded: false,
          });
        }

        for (let i = 1; i <= totalResidential; i++) {
          const residentialFloorNumber = i;
          const actualFloorNumber = i + Number(b.parkingFloors || 0);

          const existingFloor = b.floorConfigurations.find(
            (f) => Number(f.floorNumber) === actualFloorNumber && !f.isParking
          );

          newConfigs.push({
            floorNumber: actualFloorNumber,
            floorName:
              existingFloor?.floorName || `Floor ${residentialFloorNumber}`,
            floorType: "residential",
            rooms: existingFloor?.rooms || 0,
            roomTypes: existingFloor?.roomTypes || [],
            unitPrefixes: existingFloor?.unitPrefixes || [],
            isParking: false,
            canEdit: true,
            isExpanded: false,
          });
        }

        return {
          ...b,
          floorConfigurations: newConfigs,
          isConfigured: true,
          status: "configured",
        };
      }
      return b;
    });

    // Apply local state update first for immediate UX
    setBlocks(updatedBlocks);
    alert(`✅ Floor configuration generated for ${block.name}!`);

    // Now sync floors to server (async, non-blocking for UX)
    (async () => {
      // ensure project exists
      let pid = projectId;
      if (!pid) {
        try {
          const resp = await createProjectQuick();
          const extracted = extractIdFromCreateResp(resp);
          if (extracted) {
            pid = extracted;
            setProjectId(pid);
            console.log("configureBlockFloors: created project id", pid);
          } else {
            console.warn("configureBlockFloors: could not extract pid", resp);
            return;
          }
        } catch (err) {
          console.error("configureBlockFloors: failed to create project", err);
          return;
        }
      }

      // ensure block exists on server (create if needed)
      const localBlock = updatedBlocks.find((b) => b.id === block.id);
      let blockServerId = localBlock?._serverId || null;

      if (!blockServerId) {
        try {
          const blockPayload = {
            subdomain: SUBDOMAIN,
            block_name: localBlock.name,
            prefix: localBlock.prefix,
            total_units: Math.max(1, Number(localBlock.totalUnits || 1)),
            parking_floors: Math.max(0, Number(localBlock.parkingFloors || 0)),
            residential_floors: Math.max(
              1,
              Number(localBlock.residentialFloors || 1)
            ),
            description: localBlock.description || `Created from UI`,
          };
          const createResp = await createBlockRemote(pid, blockPayload);
          const returned = createResp?.data ?? createResp;
          blockServerId =
            returned?.id ||
            returned?._id ||
            returned?.block_id ||
            returned?.blockId ||
            null;

          console.log(
            "configureBlockFloors: created block on server:",
            blockServerId
          );

          setBlocks((prev) =>
            prev.map((b) =>
              b.id === block.id
                ? { ...b, _serverId: blockServerId, _serverSaved: true }
                : b
            )
          );
        } catch (err) {
          console.error(
            "configureBlockFloors: failed to create block on server",
            err
          );
          setBlocks((prev) =>
            prev.map((b) =>
              b.id === block.id
                ? {
                    ...b,
                    _serverSaved: false,
                    _serverError: formatServerErrors(err),
                  }
                : b
            )
          );
          return;
        }
      }

      // Now POST floor details for each floor using the provided endpoint:
      const floorsToCreate = localBlock.floorConfigurations || [];
      for (let f of floorsToCreate) {
        try {
          const floorPayload = {
            subdomain: SUBDOMAIN,
            floor_number: f.floorNumber,
            floor_name: f.floorName,
            is_parking: !!f.isParking,
            rooms: Number(f.rooms) || 0,
          };

          const resp = await createFloorDetailsRemote(
            pid,
            blockServerId,
            floorPayload
          );
          console.log("createFloorDetailsRemote response:", resp?.data ?? resp);
        } catch (err) {
          console.error("Failed creating floor-details on server", f, err);
          setBlocks((prev) =>
            prev.map((b) =>
              b.id === block.id
                ? {
                    ...b,
                    _serverError:
                      (b._serverError ? b._serverError + " | " : "") +
                      `Floor ${f.floorNumber} error: ${formatServerErrors(
                        err
                      )}`,
                  }
                : b
            )
          );
        }
      }

      console.log(
        "configureBlockFloors: finished syncing floors for",
        block.name
      );
    })();
  };

  const generateUnitsForBlock = async (block) => {
    const numericTotalUnits = Number.isFinite(Number(block.totalUnits))
      ? Number(block.totalUnits)
      : parseInt(block.totalUnits, 10) || 0;

    if (numericTotalUnits <= 0) {
      alert("Please enter a valid number of units for this block");
      return;
    }

    if (!block.prefix || !String(block.prefix).trim()) {
      alert("Please enter a prefix for this block");
      return;
    }
    if (!block.isConfigured) {
      alert("Please configure floors first before generating units");
      return;
    }

    const configuredUnits = block.floorConfigurations
      .filter((floor) => !floor.isParking)
      .reduce((sum, floor) => {
        const r = Number.isFinite(Number(floor.rooms))
          ? Number(floor.rooms)
          : parseInt(floor.rooms, 10) || 0;
        return sum + r;
      }, 0);

    if (configuredUnits !== numericTotalUnits) {
      alert(
        `Please configure exactly ${numericTotalUnits} units across all floors for ${block.name}. Currently configured: ${configuredUnits}`
      );
      return;
    }

    // Local unit creation (unchanged)
    const newUnits = [];
    const maxId = units.length > 0 ? Math.max(...units.map((u) => u.id)) : 0;

    let unitCounter = 1;
    block.floorConfigurations.forEach((floor) => {
      if (!floor.isParking) {
        const roomsCount = Number.isFinite(Number(floor.rooms))
          ? Number(floor.rooms)
          : parseInt(floor.rooms, 10) || 0;
        for (let i = 1; i <= roomsCount; i++) {
          const unitName = `${block.prefix}-${unitCounter}`;
          const roomType = floor.roomTypes?.[i - 1] || "1BHK";

          newUnits.push({
            id: maxId + unitCounter,
            name: unitName,
            blockId: block.id,
            blockName: block.name,
            floor: floor.floorName,
            floorNumber: floor.floorNumber,
            roomType: roomType,
            propertyFeatures: {
              ...INITIAL_PROPERTY_FEATURES,
              bedrooms: parseInt(roomType.charAt(0)) || 1,
              bathrooms: parseInt(roomType.charAt(0)) || 1,
              balconies: 1,
              parking: 1,
            },
            areaDetails: {
              ...INITIAL_AREA_DETAILS,
              carpetArea: calculateCarpetArea(roomType),
              builtUpArea: calculateBuiltUpArea(roomType),
              superBuiltUpArea: calculateSuperBuiltUpArea(roomType),
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
      }
    });

    // Update local blocks/units immediately for UX
    const updatedBlocks = blocks.map((b) => {
      if (b.id === block.id) {
        return {
          ...b,
          units: [...newUnits],
          status: "units_generated",
        };
      }
      return b;
    });
    setBlocks(updatedBlocks);
    setUnits([...units, ...newUnits]);

    alert(`Generated ${newUnits.length} units for ${block.name} successfully!`);

    // Now sync units to server (async)
    (async () => {
      let pid = projectId;
      if (!pid) {
        try {
          const resp = await createProjectQuick();
          const extracted = extractIdFromCreateResp(resp);
          if (extracted) {
            pid = extracted;
            setProjectId(pid);
            console.log("generateUnitsForBlock: created project id", pid);
          } else {
            console.warn("generateUnitsForBlock: could not extract pid", resp);
            return;
          }
        } catch (err) {
          console.error("generateUnitsForBlock: failed to create project", err);
          return;
        }
      }

      const localBlock = updatedBlocks.find((b) => b.id === block.id);
      let blockServerId = localBlock?._serverId || null;

      if (!blockServerId) {
        try {
          const blockPayload = {
            subdomain: SUBDOMAIN,
            block_name: localBlock.name,
            prefix: localBlock.prefix,
            total_units: Math.max(1, localBlock.totalUnits || 1),
            parking_floors: Math.max(0, localBlock.parkingFloors || 0),
            residential_floors: Math.max(1, localBlock.residentialFloors || 1),
            description: localBlock.description || `Created from UI`,
          };
          const createResp = await createBlockRemote(pid, blockPayload);
          const returned = createResp?.data ?? createResp;
          blockServerId =
            returned?.id ||
            returned?._id ||
            returned?.block_id ||
            returned?.blockId ||
            null;

          console.log(
            "generateUnitsForBlock: created block on server:",
            blockServerId
          );

          setBlocks((prev) =>
            prev.map((b) =>
              b.id === block.id
                ? { ...b, _serverId: blockServerId, _serverSaved: true }
                : b
            )
          );
        } catch (err) {
          console.error(
            "generateUnitsForBlock: failed to create block on server",
            err
          );
          setBlocks((prev) =>
            prev.map((b) =>
              b.id === block.id
                ? {
                    ...b,
                    _serverSaved: false,
                    _serverError: formatServerErrors(err),
                  }
                : b
            )
          );
          return;
        }
      }

      for (let u of newUnits) {
        try {
          const unitPayload = {
            subdomain: SUBDOMAIN,
            project_id: pid,
            block_id: blockServerId,
            unit_name: u.name,
            floor_number: u.floorNumber || u.floor,
            floor_name: u.floor,
            room_type: u.roomType,
            carpet_area: Number(u.areaDetails?.carpetArea || 0),
            builtup_area: Number(u.areaDetails?.builtUpArea || 0),
            super_builtup_area: Number(u.areaDetails?.superBuiltUpArea || 0),
            price: u.priceDetails?.expectedPrice || null,
            broker: u.broker || null,
            purchaser: u.purchaser || null,
            constructor: u.constructor || null,
          };

          const resp = await createUnitRemote(pid, unitPayload);
          console.log("createUnitRemote response:", resp?.data ?? resp);

          const returned = resp?.data ?? resp;
          const serverUnitId =
            returned?.id ||
            returned?._id ||
            returned?.unit_id ||
            returned?.unitId ||
            null;

          setUnits((prev) =>
            prev.map((uu) =>
              uu.id === u.id
                ? { ...uu, _serverId: serverUnitId, _serverSaved: true }
                : uu
            )
          );
        } catch (err) {
          console.error("Failed creating unit on server", u, err);
          setUnits((prev) =>
            prev.map((uu) =>
              uu.id === u.id
                ? {
                    ...uu,
                    _serverSaved: false,
                    _serverError: formatServerErrors(err),
                  }
                : uu
            )
          );
        }
      }

      console.log(
        "generateUnitsForBlock: finished syncing units for",
        block.name
      );
    })();
  };

  /* -------------------- Other helpers already present -------------------- */

  const calculateCarpetArea = (roomType) => {
    const areas = {
      "1BHK": "800",
      "2BHK": "1200",
      "3BHK": "1500",
      "4BHK": "1800",
      "5BHK": "2200",
    };
    return areas[roomType] || "1000";
  };

  const calculateBuiltUpArea = (roomType) => {
    const carpetArea = parseInt(calculateCarpetArea(roomType));
    return Math.round(carpetArea * 1.25).toString();
  };

  const calculateSuperBuiltUpArea = (roomType) => {
    const carpetArea = parseInt(calculateCarpetArea(roomType));
    return Math.round(carpetArea * 1.35).toString();
  };

  const removeUnitsForBlock = (blockId) => {
    if (
      window.confirm(
        "Are you sure you want to remove all units for this block?"
      )
    ) {
      setUnits((prevUnits) =>
        prevUnits.filter((unit) => unit.blockId !== blockId)
      );

      const updatedBlocks = blocks.map((block) => {
        if (block.id === blockId) {
          return {
            ...block,
            units: [],
            status: "configured",
          };
        }
        return block;
      });

      setBlocks(updatedBlocks);
      alert("All units for this block have been removed.");
    }
  };

  const resetBlockConfiguration = (blockId) => {
    if (
      window.confirm(
        "Are you sure you want to reset the floor configuration for this block?"
      )
    ) {
      const updatedBlocks = blocks.map((block) => {
        if (block.id === blockId) {
          return {
            ...block,
            floorConfigurations: [],
            isConfigured: false,
            status: "draft",
            units: [],
          };
        }
        return block;
      });

      setBlocks(updatedBlocks);
      setUnits((prevUnits) =>
        prevUnits.filter((unit) => unit.blockId !== blockId)
      );
      alert("Block configuration has been reset.");
    }
  };

  const getBlockStatusColor = (status) => {
    const colors = {
      draft: "bg-gray-100 text-gray-800",
      configured: "bg-blue-100 text-blue-800",
      units_generated: "bg-green-100 text-green-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getBlockStatusText = (status) => {
    const texts = {
      draft: "Draft",
      configured: "Floors Configured",
      units_generated: "Units Generated",
    };
    return texts[status] || "Draft";
  };

  const toggleBlockExpansion = (blockId) => {
    const updatedBlocks = blocks.map((block) =>
      block.id === blockId ? { ...block, isExpanded: !block.isExpanded } : block
    );
    setBlocks(updatedBlocks);
  };

  const toggleFloorExpansion = (blockId, floorIndex) => {
    const updatedBlocks = blocks.map((block) => {
      if (block.id === blockId) {
        const updatedConfigs = block.floorConfigurations.map(
          (floor, index) => ({
            ...floor,
            isExpanded: index === floorIndex ? !floor.isExpanded : false,
          })
        );
        return { ...block, floorConfigurations: updatedConfigs };
      }
      return block;
    });
    setBlocks(updatedBlocks);
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
          constructor,
        };
        updatedUnit.isComplete = !!(
          priceDetails.expectedPrice &&
          areaDetails.carpetArea &&
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

  const handleRemoveUnit = (unitToRemove) => {
    if (
      window.confirm(`Are you sure you want to remove ${unitToRemove.name}?`)
    ) {
      setUnits((prev) => prev.filter((u) => u.id !== unitToRemove.id));
      setBlocks((prevBlocks) =>
        prevBlocks.map((b) => ({
          ...b,
          units: b.units.filter((u) => u.id !== unitToRemove.id),
        }))
      );
      if (selectedUnit?.id === unitToRemove.id) setSelectedUnit(null);
    }
  };

  /* -------------------- Payload builders & API helpers -------------------- */

  const buildPayload = () => {
    const payload = {
      subdomain: SUBDOMAIN,
      name: projectName,
      type:
        (projectType && projectType.toLowerCase()) ||
        (PROJECT_TYPES?.APARTMENT && PROJECT_TYPES.APARTMENT.toLowerCase()) ||
        "apartment",
      city: city || "",
      locality: locality || "",
      land_zone: landZone || "",
      total_land_area: landArea || 0,
      total_blocks: blocks.length,
      total_units: units.length || totalUnits,
      kissama: "Project description",
      boundary_type: "compound_wall",
      broker_id: broker || null,
      purchaser: purchaser || "",
      constructor: constructor || "",
      blocks,
      units,
      revenue_plots: plotsData.map((p) => ({
        area: p.area,
        entry_plot_no: p.entryPlotNo,
        khata_no: p.khataNo,
      })),
    };

    return payload;
  };

  const validateRequired = (payload) => {
    if (!payload.name) {
      alert("Project name is required");
      return false;
    }
    if (!payload.type) {
      alert("Project type is required");
      return false;
    }
    return true;
  };

  const extractIdFromCreateResp = (resp) => {
    const data = resp?.data ?? resp;
    if (!data) return null;

    if (data.id) return data.id;
    if (data._id) return data._id;
    if (data.projectId) return data.projectId;

    if (data.data) {
      if (data.data.id) return data.data.id;
      if (data.data._id) return data.data._id;
      if (data.data.projectId) return data.data.projectId;
    }

    if (data.project) {
      if (data.project.id) return data.project.id;
      if (data.project._id) return data.project._id;
    }

    if (data.project?.data) {
      if (data.project.data.id) return data.project.data.id;
      if (data.project.data._id) return data.project.data._id;
    }

    const maybeId = Object.values(data).find(
      (v) => typeof v === "number" || (typeof v === "string" && /^\d+$/.test(v))
    );
    if (maybeId) return maybeId;

    return null;
  };

  const createProjectQuick = async () => {
    if (!projectName || !projectType) {
      alert("Please enter project name and type before creating.");
      throw new Error("Missing project name/type");
    }
    setIsCreatingQuick(true);

    const payload = {
      subdomain: SUBDOMAIN,
      name: projectName,
      type:
        (projectType && projectType.toLowerCase()) ||
        (PROJECT_TYPES?.APARTMENT && PROJECT_TYPES.APARTMENT.toLowerCase()) ||
        "apartment",
      city: city || "",
      locality: locality || "",
    };

    console.log("createProjectQuick() -> POST", API_URL, payload);

    try {
      const resp = await axios.post(API_URL, payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("createProjectQuick response:", resp);

      const returnedId = extractIdFromCreateResp(resp);
      if (returnedId) {
        setProjectId(returnedId);
      } else {
        console.warn("Could not extract projectId from create response:", resp);
      }

      setCreatedProject(resp?.data || resp);
      setSuccessMessage(
        "Project ID has been generated and saved. You can now proceed to add project details."
      );
      setTimeout(() => {
        setSuccessMessage("");
      }, 8000);

      return resp;
    } catch (err) {
      console.error("Quick create error:", err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err.message ||
        "Failed to quickly create project";
      alert("Error: " + msg);
      throw err;
    } finally {
      setIsCreatingQuick(false);
    }
  };

  /* -------------------- UPDATED: Create Project API Integration -------------------- */

const createProject = async () => {
  if (!projectName || !projectType) {
    alert("Please enter project name and type");
    throw new Error("Project name and type are required");
  }

  setIsSaving(true);

  try {
    // Build a simplified payload that matches backend expectations
    const payload = {
      subdomain: SUBDOMAIN,
      name: projectName.trim(),
      type: projectType.toLowerCase(),
      city: city || "",
      locality: locality || "",
      land_zone: landZone || "",
      total_land_area: landArea || 0,
      total_blocks: blocks.length,
      total_units: units.length || totalUnits,
      kissama: "Project description", // You might want to make this dynamic
      boundary_type: "compound_wall",
      broker_id: broker || null,
      purchaser: purchaser || "",
      constructor: constructor || "",

    };

    console.log("Creating project with simplified payload:", payload);

    // Check if we have files to upload
    const hasFiles = attachment || plotsData.some((p) => p.file && p.file instanceof File);

    let response;

    if (hasFiles) {
      // Use FormData for file uploads
      const formData = new FormData();

      // Append all payload fields as simple key-value pairs
      Object.keys(payload).forEach(key => {
        if (payload[key] !== null && payload[key] !== undefined) {
          formData.append(key, payload[key]);
        }
      });

      // Append files
      if (attachment) {
        formData.append("attachment", attachment);
      }

      plotsData.forEach((plot, index) => {
        if (plot.file) {
          formData.append(`plot_files_${index}`, plot.file);
        }
      });

      response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      // Regular JSON request - ensure we're sending proper JSON
      response = await axios.post(API_URL, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    console.log("Project creation response:", response);

    // Extract and set project ID
    const extractedId = extractIdFromCreateResp(response);
    if (extractedId) {
      setProjectId(extractedId);
      console.log("Project created with ID:", extractedId);
    }

    setCreatedProject(response.data);

    // Show success message
    setSuccessMessage("Project created successfully!");
    setTimeout(() => setSuccessMessage(""), 5000);

    return response.data;

  } catch (error) {
    console.error("Project creation failed:", error);

    // More detailed error logging
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    }

    const errorMessage = formatServerErrors(error);
    alert(`Creation failed: ${errorMessage}`);

    throw error;
  } finally {
    setIsSaving(false);
  }
};

  /* -------------------- UPDATED: Handle Save Project -------------------- */

  const handleSaveProject = async () => {
    if (!projectName || !projectType) {
      alert("Please enter project name and type");
      return;
    }

    try {
      setIsSaving(true);

      // Use the createProject function which handles project creation
      const result = await createProject();

      // If we get here, the project was successfully created
      console.log("Project saved successfully:", result);

      // Extract and set the project ID
      if (!projectId && result) {
        const extractedId = extractIdFromCreateResp(result);
        if (extractedId) {
          setProjectId(extractedId);
          console.log("New project created with ID:", extractedId);
        }
      }

      alert("Project created successfully!");

      // Call the parent callback if provided
      if (onSaveProject) {
        const projectData = {
          id: projectId || Date.now(),
          name: projectName,
          type: projectType,
          city,
          locality,
          landZone,
          blocks: [...blocks],
          units: [...units],
          totalUnits,
          createdAt: new Date().toLocaleDateString(),
          updatedAt: new Date().toLocaleDateString(),
        };
        onSaveProject(projectData);
      }

    } catch (error) {
      console.error("Failed to save project:", error);

      // Provide more specific error messages
      const errorMessage = error?.response?.data?.message ||
                          error?.response?.data?.error ||
                          error?.message ||
                          "Failed to save project. Please try again.";

      alert(`Error: ${errorMessage}`);

      // Fallback: Save locally if API fails
      const projectData = {
        id: Date.now(),
        name: projectName,
        type: projectType,
        city,
        locality,
        landZone,
        blocks: [...blocks],
        units: [...units],
        totalUnits,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
      };

      if (onSaveProject) {
        onSaveProject(projectData);
        console.warn("Project saved locally due to API failure", error);
      }
    } finally {
      setIsSaving(false);
    }
  };

  /* ----------------- Enhanced Save Revenue Plots API integration ----------------- */
  const saveRevenuePlots = async () => {
    console.log("saveRevenuePlots() called", {
      plotsDataLength: plotsData.length,
      projectId,
    });
    if (!plotsData || plotsData.length === 0) {
      alert("No revenue plots to save.");
      console.warn("saveRevenuePlots: no plots present");
      return;
    }

    setIsSaving(true);

    try {
      let pid = projectId;
      if (!pid) {
        console.log(
          "saveRevenuePlots: no projectId, attempting quick project create..."
        );
        try {
          const createResp = await createProjectQuick();
          const extracted = extractIdFromCreateResp(createResp);
          if (extracted) {
            pid = extracted;
            setProjectId(pid);
            console.log("saveRevenuePlots: quick project created, id:", pid);
          } else {
            console.warn(
              "saveRevenuePlots: Could not extract projectId from create response:",
              createResp
            );
          }
        } catch (err) {
          console.error("createProjectQuick failed, aborting plot save", err);
          alert(
            "Cannot save plots because project creation failed. See console."
          );
          setIsSaving(false);
          return;
        }
      }

      if (!pid) {
        alert(
          "No projectId available to save revenue plots. Please create the project first."
        );
        setIsSaving(false);
        return;
      }

      const endpointBase = `${API_URL}/${pid}/revenue-plots`;
      console.log("Saving revenue plots to endpoint:", endpointBase);

      const rawToken = localStorage.getItem("token") || "";
      const tokenHeader = rawToken
        ? { Authorization: `Bearer ${rawToken}` }
        : {};

      let successCount = 0;
      let failCount = 0;
      const updatedPlots = [...plotsData];

      for (let i = 0; i < plotsData.length; i++) {
        const p = plotsData[i];
        const isEmpty =
          !p ||
          (!p.area && !p.entryPlotNo && !p.khataNo && !p.fileName && !p.file);
        if (isEmpty) {
          console.log(`Plot ${i + 1} is empty — skipping`);
          continue;
        }

        try {
          if (p.file instanceof File) {
            console.log(
              `Uploading plot ${i + 1} with file:`,
              p.fileName || p.file?.name
            );
            const form = new FormData();
            form.append("subdomain", SUBDOMAIN);
            form.append("plot_number", i + 1);
            form.append("area", p.area || 0);
            form.append("entry_plot_no", p.entryPlotNo || "");
            form.append("khata_no", p.khataNo || "");
            form.append("plot_document", p.file, p.fileName || `plot_${i + 1}`);
            form.append("file_name", p.fileName || p.file?.name || "");

            const resp = await axios.post(endpointBase, form, {
              headers: {
                Accept: "application/json",
                ...tokenHeader,
              },
            });

            console.log(`Plot ${i + 1} upload response:`, resp?.data ?? resp);
            updatedPlots[i] = { ...p, _saved: true, _response: resp.data };
          } else {
            console.log(`Saving plot ${i + 1} JSON payload`);
            const jsonPayload = {
              subdomain: SUBDOMAIN,
              plot_number: i + 1,
              area: p.area ? Number(p.area) : 0,
              entry_plot_no: p.entryPlotNo || "",
              khata_no: p.khataNo || "",
              plot_document: p.fileName || "",
              file_name: p.fileName || "",
            };

            const resp = await axios.post(endpointBase, jsonPayload, {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...tokenHeader,
              },
            });

            console.log(`Plot ${i + 1} save response:`, resp?.data ?? resp);
            updatedPlots[i] = { ...p, _saved: true, _response: resp.data };
          }

          successCount++;
        } catch (err) {
          const serverMsg =
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            err?.response?.data ||
            err.message;
          console.error(`Plot ${i + 1} save failed:`, serverMsg, err);

          updatedPlots[i] = {
            ...p,
            _saved: false,
            _error: serverMsg,
          };

          if (err?.response?.status === 404) {
            alert(
              `Server returned 404 for project ${pid}: ${serverMsg}. Check that project with id ${pid} exists and you have correct permissions.`
            );
          }

          failCount++;
        }
      }

      setPlotsData(updatedPlots);

      const parts = [];
      if (successCount) parts.push(`${successCount} saved`);
      if (failCount) parts.push(`${failCount} failed`);
      alert(`Revenue plots result: ${parts.join(", ") || "No plots sent."}`);

      console.log("saveRevenuePlots result:", {
        successCount,
        failCount,
        updatedPlots,
      });
    } catch (err) {
      console.error("Unexpected error saving revenue plots", err);
      alert("An unexpected error occurred. Check console for details.");
    } finally {
      setIsSaving(false);
    }
  };

  /* ----------------- UI render helpers ----------------- */
  const renderBlockConfiguration = () => (
    <div className="bg-gray-50 p-4 md:p-5 rounded-lg border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 text-indigo-700">
        Apartment Configuration
      </h2>

      <div className="mb-6">
        <h3 className="text-md font-semibold mb-3 text-gray-800">
          Blocks Configuration
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Blocks/Towers
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                min="1"
                value={numBlocks}
                onChange={(e) => setNumBlocks(parseInt(e.target.value) || 1)}
                className="flex-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter number of blocks"
              />
              <button
                onClick={generateBlocks}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-300 whitespace-nowrap"
              >
                Generate Blocks
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Blocks */}
      {blocks.length > 0 && (
        <div className="space-y-4">
          {/* Project Summary Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3">
              Project Summary
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">
                  {blocks.length}
                </div>
                <div className="text-sm text-gray-600">Blocks</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {totalUnits}
                </div>
                <div className="text-sm text-gray-600">Total Units</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {blocks.reduce(
                    (sum, block) =>
                      sum + (Number(block.residentialFloors) || 0),
                    0
                  )}
                </div>
                <div className="text-sm text-gray-600">Floors</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">
                  {blocks.reduce(
                    (sum, block) => sum + (Number(block.parkingFloors) || 0),
                    0
                  )}
                </div>
                <div className="text-sm text-gray-600">Parking</div>
              </div>
            </div>
          </div>

          {/* Blocks List */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-700">
              Blocks ({blocks.length})
            </h4>

            {blocks.map((block) => (
              <div
                key={block.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
              >
                {/* Block Header */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleBlockExpansion(block.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-2 rounded-lg ${
                        block.status === "units_generated"
                          ? "bg-green-100 text-green-600"
                          : block.status === "configured"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {block.status === "units_generated" ? (
                        <FaCheckCircle className="w-5 h-5" />
                      ) : block.status === "configured" ? (
                        <FaBuilding className="w-5 h-5" />
                      ) : (
                        <FaHome className="w-5 h-5" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <h5 className="font-semibold text-gray-800">
                          {block.name}
                        </h5>
                        <span className="text-sm text-gray-500">
                          ({block.prefix})
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getBlockStatusColor(
                            block.status
                          )}`}
                        >
                          {getBlockStatusText(block.status)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                        <span>📊 {Number(block.totalUnits) || 0} units</span>
                        <span>
                          🏢 {Number(block.residentialFloors) || 0} floors
                        </span>
                        <span>
                          🅿️ {Number(block.parkingFloors) || 0} parking
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {!block.isConfigured && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          configureBlockFloors(block);
                        }}
                        disabled={!(Number(block.residentialFloors) >= 1)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          !(Number(block.residentialFloors) >= 1)
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                      >
                        Configure
                      </button>
                    )}

                    {block.isConfigured && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          configureBlockFloors(block);
                        }}
                        disabled={!(Number(block.residentialFloors) >= 1)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          !(Number(block.residentialFloors) >= 1)
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                      >
                        Configure
                      </button>
                    )}

                    <div className="transform transition-transform duration-200">
                      {block.isExpanded ? (
                        <FaChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <FaChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {block.isExpanded && (
                  <div className="border-t border-gray-100 p-4 bg-gray-50 space-y-4">
                    {/* Configuration Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Block Prefix
                        </label>
                        <input
                          type="text"
                          value={block.prefix || ""}
                          onChange={(e) =>
                            updateBlock(block.id, "prefix", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="A, B, T1..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Total Floors
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={
                            block.residentialFloors === undefined ||
                            block.residentialFloors === null
                              ? ""
                              : block.residentialFloors
                          }
                          onChange={(e) =>
                            updateBlock(
                              block.id,
                              "residentialFloors",
                              e.target.value
                            )
                          }
                          onBlur={(e) =>
                            updateBlock(
                              block.id,
                              "residentialFloors",
                              e.target.value,
                              { finalize: true }
                            )
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Total Units
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={
                            block.totalUnits === undefined ||
                            block.totalUnits === null
                              ? ""
                              : block.totalUnits
                          }
                          onChange={(e) =>
                            updateBlock(block.id, "totalUnits", e.target.value)
                          }
                          onBlur={(e) =>
                            updateBlock(
                              block.id,
                              "totalUnits",
                              e.target.value,
                              { finalize: true }
                            )
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Parking Floors
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={
                            block.parkingFloors === undefined ||
                            block.parkingFloors === null
                              ? ""
                              : block.parkingFloors
                          }
                          onChange={(e) =>
                            updateBlock(
                              block.id,
                              "parkingFloors",
                              e.target.value
                            )
                          }
                          onBlur={(e) =>
                            updateBlock(
                              block.id,
                              "parkingFloors",
                              e.target.value,
                              { finalize: true }
                            )
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    {/* Floor Configuration */}
                    {block.floorConfigurations.length > 0 && (
                      <div>
                        <h6 className="text-sm font-semibold text-gray-700 mb-3">
                          Floor Configuration
                        </h6>

                        {/* Parking Floors */}
                        {block.floorConfigurations.filter(
                          (floor) => floor.isParking
                        ).length > 0 && (
                          <div className="mb-6">
                            <h4 className="text-sm font-medium text-amber-700 mb-3 flex items-center">
                              <FaCar className="w-4 h-4 mr-2" />
                              Parking Floors
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {block.floorConfigurations.map((floor, index) =>
                                floor.isParking ? (
                                  <div
                                    key={index}
                                    className="p-4 rounded-lg border-2 bg-amber-50 border-amber-300"
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-2">
                                        <FaCar className="text-amber-600 w-4 h-4" />
                                        <span className="font-semibold text-sm text-amber-700">
                                          {floor.floorName}
                                        </span>
                                      </div>
                                      <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800 font-medium">
                                        Parking
                                      </span>
                                    </div>
                                  </div>
                                ) : null
                              )}
                            </div>
                          </div>
                        )}

                        {/* Residential Floors */}
                        {block.floorConfigurations.filter(
                          (floor) => !floor.isParking
                        ).length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-indigo-700 mb-3 flex items-center">
                              <FaHome className="w-4 h-4 mr-2" />
                              Residential Floors
                            </h4>

                            {/* Floor Selection Buttons */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {block.floorConfigurations.map((floor, index) =>
                                !floor.isParking ? (
                                  <button
                                    key={index}
                                    onClick={() =>
                                      toggleFloorExpansion(block.id, index)
                                    }
                                    className={`flex items-center space-x-1.5 px-3 py-2 rounded-md border transition-all duration-200 ${
                                      floor.isExpanded
                                        ? "bg-indigo-500 text-white border-indigo-500 shadow-md"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                    }`}
                                  >
                                    <FaHome className="w-3.5 h-3.5" />
                                    <span className="font-medium text-sm">
                                      {floor.floorName}
                                    </span>
                                    <span
                                      className={`px-1.5 py-0.5 rounded-full text-xs ${
                                        floor.isExpanded
                                          ? "bg-white text-indigo-600"
                                          : floor.rooms > 0
                                          ? "bg-green-100 text-green-800"
                                          : "bg-gray-100 text-gray-600"
                                      }`}
                                    >
                                      {Number(floor.rooms) || 0}
                                    </span>
                                  </button>
                                ) : null
                              )}
                            </div>

                            {/* Active Floor Details */}
                            {block.floorConfigurations.some(
                              (floor) => !floor.isParking && floor.isExpanded
                            ) && (
                              <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                                {block.floorConfigurations.map((floor, index) =>
                                  !floor.isParking && floor.isExpanded ? (
                                    <div key={index} className="space-y-4">
                                      {/* Header with Editable Floor Name */}
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                          <div className="p-2 bg-indigo-100 rounded-lg">
                                            <FaHome className="w-5 h-5 text-indigo-600" />
                                          </div>
                                          <div className="flex items-center space-x-3">
                                            <input
                                              type="text"
                                              value={floor.floorName}
                                              onChange={(e) =>
                                                updateFloorConfiguration(
                                                  block.id,
                                                  index,
                                                  "floorName",
                                                  e.target.value
                                                )
                                              }
                                              className="text-lg font-bold text-gray-900 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-indigo-500 focus:outline-none px-1 py-0.5"
                                              placeholder="Enter floor name"
                                            />
                                            <span className="text-sm text-gray-500">
                                              (Editable)
                                            </span>
                                          </div>
                                        </div>

                                        <button
                                          onClick={() =>
                                            toggleFloorExpansion(
                                              block.id,
                                              index
                                            )
                                          }
                                          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                                        >
                                          <FaTimes className="w-4 h-4" />
                                        </button>
                                      </div>

                                      <p className="text-sm text-gray-600 -mt-2">
                                        Manage {Number(floor.rooms) || 0} units
                                        on this floor
                                      </p>

                                      {/* Configuration */}
                                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                        <div className="lg:col-span-1">
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Total Units
                                          </label>
                                          <input
                                            type="number"
                                            min="0"
                                            max="20"
                                            value={floor.rooms}
                                            onChange={(e) =>
                                              updateFloorConfiguration(
                                                block.id,
                                                index,
                                                "rooms",
                                                e.target.value
                                              )
                                            }
                                            onBlur={(e) =>
                                              updateFloorConfiguration(
                                                block.id,
                                                index,
                                                "rooms",
                                                e.target.value,
                                                { finalize: true }
                                              )
                                            }
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                          />
                                        </div>

                                        {Number(floor.rooms) > 0 && (
                                          <div className="lg:col-span-2">
                                            <div className="flex items-center justify-between mb-3">
                                              <label className="block text-sm font-medium text-gray-700">
                                                Unit Types & Prefixes
                                              </label>
                                              <div className="flex gap-1.5">
                                                {["1BHK", "2BHK", "3BHK"].map(
                                                  (type) => (
                                                    <button
                                                      key={type}
                                                      onClick={() => {
                                                        Array.from(
                                                          {
                                                            length: Number(
                                                              floor.rooms
                                                            ),
                                                          },
                                                          (_, roomIndex) => {
                                                            updateRoomType(
                                                              block.id,
                                                              index,
                                                              roomIndex,
                                                              type
                                                            );
                                                          }
                                                        );
                                                      }}
                                                      className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs transition-colors"
                                                    >
                                                      All {type}
                                                    </button>
                                                  )
                                                )}
                                              </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
                                              {Array.from(
                                                { length: Number(floor.rooms) },
                                                (_, roomIndex) => (
                                                  <div
                                                    key={roomIndex}
                                                    className="flex flex-col gap-2 p-2 bg-gray-50 rounded-md text-sm"
                                                  >
                                                    {/* Unit Header */}
                                                    <div className="flex items-center justify-between">
                                                      <div className="w-6 text-center">
                                                        <span className="text-xs font-bold text-gray-700">
                                                          {roomIndex + 1}
                                                        </span>
                                                      </div>
                                                      <span className="text-xs text-gray-500">
                                                        Unit {roomIndex + 1}
                                                      </span>
                                                    </div>
                                                    {/* Unit Prefix Input */}
                                                    <div>
                                                      <label className="block text-xs text-gray-500 mb-1">
                                                        Unit
                                                      </label>
                                                      <input
                                                        type="text"
                                                        value={
                                                          floor.unitPrefixes?.[
                                                            roomIndex
                                                          ] ||
                                                          `${
                                                            block.prefix
                                                          }-${String(
                                                            floor.floorName
                                                          ).replace(
                                                            /\D/g,
                                                            ""
                                                          )}-${(roomIndex + 1)
                                                            .toString()
                                                            .padStart(2, "0")}`
                                                        }
                                                        onChange={(e) =>
                                                          updateUnitPrefix(
                                                            block.id,
                                                            index,
                                                            roomIndex,
                                                            e.target.value
                                                          )
                                                        }
                                                        className="w-full border border-gray-300 rounded px-2 py-1 text-xs font-mono bg-white"
                                                        placeholder="Unit ID"
                                                      />
                                                    </div>

                                                    {/* Unit Type Select */}
                                                    <div>
                                                      <label className="block text-xs text-gray-500 mb-1">
                                                        Type:
                                                      </label>
                                                      <select
                                                        value={
                                                          floor.roomTypes?.[
                                                            roomIndex
                                                          ] || "1BHK"
                                                        }
                                                        onChange={(e) =>
                                                          updateRoomType(
                                                            block.id,
                                                            index,
                                                            roomIndex,
                                                            e.target.value
                                                          )
                                                        }
                                                        className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                                                      >
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
                                                      </select>
                                                    </div>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          </div>
                                        )}
                                      </div>

                                      {/* Action Buttons */}
                                      <div className="flex flex-wrap gap-2">
                                        {block.isConfigured && (
                                          <button
                                            onClick={() =>
                                              generateUnitsForBlock(block)
                                            }
                                            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                          >
                                            Generate Units
                                          </button>
                                        )}

                                        {block.units.length > 0 && (
                                          <button
                                            onClick={() =>
                                              removeUnitsForBlock(block.id)
                                            }
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                          >
                                            Remove Units
                                          </button>
                                        )}

                                        <button
                                          onClick={() =>
                                            resetBlockConfiguration(block.id)
                                          }
                                          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                        >
                                          Reset
                                        </button>

                                        <button
                                          onClick={() => removeBlock(block.id)}
                                          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                        >
                                          Remove Block
                                        </button>
                                      </div>
                                    </div>
                                  ) : null
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderAllGeneratedUnits = () => (
    <div className="bg-gray-50 p-4 md:p-5 rounded-lg border border-gray-200 h-full">
      <h2 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center">
        <FaList className="mr-2" />
        All Generated Units ({units.length})
        {projectType === PROJECT_TYPES.APARTMENT && (
          <span className="ml-2 text-sm font-normal text-blue-600">
            across {blocks.length} block(s)
          </span>
        )}
      </h2>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {units.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FaBuilding className="mx-auto h-12 w-12 text-gray-300 mb-3" />
            <p>No units generated yet.</p>
            <p className="text-sm">
              Configure blocks and generate units to see them here.
            </p>
          </div>
        ) : (
          units.map((unit, idx) => (
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
                {unit.blockName && (
                  <div className="text-xs text-gray-500">
                    {unit.blockName} • {unit.floor} • {unit.roomType}
                  </div>
                )}
                {unit.floor && !unit.blockName && (
                  <div className="text-xs text-gray-500">
                    {unit.floor} • {unit.roomType}
                  </div>
                )}
              </div>
              {unit.isComplete && (
                <FaCheckCircle className="ml-2 text-green-500 text-sm" />
              )}
              <button
                className="absolute top-2 right-2 text-gray-500 p-1 rounded hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveUnit(unit);
                }}
                title="Remove Unit"
              >
                <FaTrash className="text-xs" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderDetailsPanel = () => {
    if (units.length === 0) {
      return (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 h-full flex items-center justify-center">
          <div className="text-center">
            <FaBuilding className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Add Units
            </h3>
            <p className="text-gray-500">
              Configure blocks and generate units to start adding to your
              project.
            </p>
          </div>
        </div>
      );
    }

    if (!selectedUnit) {
      return (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 h-full flex items-center justify-center">
          <div className="text-center">
            <FaHome className="mx-auto h-16 w-16 text-indigo-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Select a Unit
            </h3>
            <p className="text-gray-500 mb-4">
              Click on a unit from the list to view and edit detailed
              information
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {units.slice(0, 5).map((unit) => (
                <button
                  key={unit.id}
                  onClick={() => handleUnitClick(unit)}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    unit.isComplete
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                  }`}
                >
                  {unit.name}
                  {unit.isComplete && <FaCheckCircle className="ml-2 inline" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedUnit.name} Details
          </h2>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {selectedUnit.roomType}
            </span>
            <span className="text-sm text-gray-500">
              {selectedUnit.blockName} • {selectedUnit.floor}
            </span>
          </div>
        </div>

        {/* Unit details form - simplified version */}
        <div className="space-y-6">
          {/* Property Features */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold mb-4 text-indigo-700">
              Property Features
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bedrooms count */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bed Rooms
                </label>
                <input
                  type="number"
                  min="0"
                  value={propertyFeatures.bedrooms ?? ""}
                  onChange={(e) =>
                    setPropertyFeatures({
                      ...propertyFeatures,
                      bedrooms:
                        e.target.value === "" ? "" : Number(e.target.value),
                    })
                  }
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., 1, 2, 3"
                />
              </div>

              {/* Bedroom area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bedroom Area (sq-ft)
                </label>
                <input
                  type="number"
                  min="0"
                  value={propertyFeatures.bedroomArea ?? ""}
                  onChange={(e) =>
                    setPropertyFeatures({
                      ...propertyFeatures,
                      bedroomArea:
                        e.target.value === "" ? "" : Number(e.target.value),
                    })
                  }
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., 120, 150"
                />
              </div>

              {/* Bathrooms count */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bathrooms
                </label>
                <input
                  type="number"
                  min="0"
                  value={propertyFeatures.bathrooms ?? ""}
                  onChange={(e) =>
                    setPropertyFeatures({
                      ...propertyFeatures,
                      bathrooms:
                        e.target.value === "" ? "" : Number(e.target.value),
                    })
                  }
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., 1, 2"
                />
              </div>

              {/* Bathroom area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bathroom Area (sq-ft)
                </label>
                <input
                  type="number"
                  min="0"
                  value={propertyFeatures.bathroomArea ?? ""}
                  onChange={(e) =>
                    setPropertyFeatures({
                      ...propertyFeatures,
                      bathroomArea:
                        e.target.value === "" ? "" : Number(e.target.value),
                    })
                  }
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., 40, 60"
                />
              </div>

              {/* Balcony */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Balcony
                </label>
                <input
                  type="number"
                  min="0"
                  value={propertyFeatures.balcony ?? ""}
                  onChange={(e) =>
                    setPropertyFeatures({
                      ...propertyFeatures,
                      balcony:
                        e.target.value === "" ? "" : Number(e.target.value),
                    })
                  }
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., 1, 2"
                />
              </div>

              {/* Furnished status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Furnished Status
                </label>
                <select
                  value={propertyFeatures.furnishedStatus ?? "Unfurnished"}
                  onChange={(e) =>
                    setPropertyFeatures({
                      ...propertyFeatures,
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
                      checked={!!propertyFeatures[facility.key]}
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

                {(unitCustomFacilities || []).map((facility, idx) => (
                  <label
                    key={idx}
                    className="inline-flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={!!propertyFeatures[facility]}
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
                  value={propertyFeatures.newFacility ?? ""}
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
                    const nf = (propertyFeatures.newFacility || "").trim();
                    if (nf && !(unitCustomFacilities || []).includes(nf)) {
                      setUnitCustomFacilities([
                        ...(unitCustomFacilities || []),
                        nf,
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
                  value={areaDetails.carpetArea ?? ""}
                  onChange={(e) =>
                    setAreaDetails({
                      ...areaDetails,
                      carpetArea:
                        e.target.value === "" ? "" : Number(e.target.value),
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
                  value={areaDetails.builtUpArea ?? ""}
                  onChange={(e) =>
                    setAreaDetails({
                      ...areaDetails,
                      builtUpArea:
                        e.target.value === "" ? "" : Number(e.target.value),
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
                  value={areaDetails.superBuiltUpArea ?? ""}
                  onChange={(e) =>
                    setAreaDetails({
                      ...areaDetails,
                      superBuiltUpArea:
                        e.target.value === "" ? "" : Number(e.target.value),
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
                  value={areaDetails.constructionArea ?? ""}
                  onChange={(e) =>
                    setAreaDetails({
                      ...areaDetails,
                      constructionArea:
                        e.target.value === "" ? "" : Number(e.target.value),
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
                  value={areaDetails.landArea ?? ""}
                  onChange={(e) =>
                    setAreaDetails({
                      ...areaDetails,
                      landArea:
                        e.target.value === "" ? "" : Number(e.target.value),
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

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contractor
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
    className="flex flex-wrap items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200"
  >
    {/* Approval Authority */}
    <div className="flex-1 min-w-[200px]">
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

    {/* Status */}
    <div className="flex-1 min-w-[160px]">
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

    {/* Add / Remove Button */}
    <div className="flex-shrink-0 mt-6">
      {index === approvalStatus.length - 1 ? (
        <button
          onClick={addApprovalAuthority}
          className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md transition duration-300"
        >
          + Add More
        </button>
      ) : (
        <button
          onClick={() => removeApprovalAuthority(index)}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300"
        >
          Remove
        </button>
      )}
    </div>
  </div>
))}

            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loan Provided
              </label>
              <input
                type="text"
                value={loan ?? ""}
                onChange={(e) => setLoan(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter loan details"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={updateUnitDetails}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-300 font-medium"
            >
              Update Unit Details
            </button>
            {/* <button
              onClick={handleSaveProject}
              disabled={isSaving || !projectName || !projectType}
              className={`${
                isSaving || !projectName || !projectType
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              } text-white py-2 px-4 rounded-md transition duration-300 font-medium flex items-center justify-center`}
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Project...
                </>
              ) : (
                "Create Project"
              )}
            </button> */}
            <button
  onClick={handleSaveProject}
  disabled={isSaving || !projectName || !projectType}
  className={`${
    isSaving || !projectName || !projectType
      ? "bg-gray-400 cursor-not-allowed"
      : isEditMode
      ? "bg-blue-600 hover:bg-blue-700"
      : "bg-green-600 hover:bg-green-700"
  } text-white py-2 px-4 rounded-md transition duration-300 font-medium flex items-center justify-center`}
>
  {isSaving ? (
    <>
      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {isEditMode ? "Updating Project..." : "Creating Project..."}
    </>
  ) : (
    isEditMode ? "Update Project" : "Create Project"
  )}
</button>
          </div>
        </div>
      </div>
    );
  };

  const renderRevenuePlotsSection = () => (
    <div className="bg-gray-50 p-4 md:p-5 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-indigo-700">
          Revenue Plots Configuration
        </h2>
        {revenuePlots > 0 && (
          <button
            onClick={clearAllPlots}
            className="text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Clear All Plots
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total Number of Revenue Plots
          </label>
          <input
            type="number"
            min="0"
            max="50"
            value={revenuePlots}
            onChange={(e) => handleRevenuePlotsChange(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter total plots"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Attachment (if any)
          </label>
          <input
            type="file"
            onChange={(e) => setAttachment(e.target.files[0])}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {attachment && (
            <p className="text-xs text-green-600 mt-1 truncate">
              ✓ {attachment.name}
            </p>
          )}
        </div>
      </div>

      {/* Dynamic Revenue Plot Sections */}
      {revenuePlots > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4 mt-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-800">
              Revenue Plot Details ({revenuePlots}{" "}
              {revenuePlots === 1 ? "Plot" : "Plots"})
            </h4>
            <span className="text-sm text-gray-600">
              Enter details for each revenue plot
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plotsData.map((plot, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg border border-gray-300 p-4 space-y-3 relative"
              >
                {/* Remove Plot Button */}
                <button
                  onClick={() => removePlot(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  title="Remove plot"
                >
                  ×
                </button>

                <div className="flex items-center justify-between border-b pb-2">
                  <h5 className="font-medium text-gray-800">
                    Plot {index + 1}
                  </h5>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    #{index + 1}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Plot Area (sq. ft)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={plot?.area || ""}
                    onChange={(e) =>
                      handlePlotChange(index, "area", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter area"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Entry Plot No.
                  </label>
                  <input
                    type="text"
                    value={plot?.entryPlotNo || ""}
                    onChange={(e) =>
                      handlePlotChange(index, "entryPlotNo", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter plot number"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Khata No.
                  </label>
                  <input
                    type="text"
                    value={plot?.khataNo || ""}
                    onChange={(e) =>
                      handlePlotChange(index, "khataNo", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter khata number"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Plot Document
                  </label>
                  <input
                    type="file"
                    onChange={(e) =>
                      handlePlotFileChange(index, e.target.files[0])
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {plot?.fileName && (
                    <p className="text-xs text-green-600 mt-1 truncate">
                      ✓ {plot.fileName}
                    </p>
                  )}
                  {plot?._saved === true && (
                    <p className="text-xs text-green-700 mt-1">Saved ✔</p>
                  )}
                  {plot?._saved === false && (
                    <p className="text-xs text-red-600 mt-1">
                      Failed: {String(plot?._error || "")}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-800 font-medium">
                Total Plots Area: {calculateTotalPlotsArea().toLocaleString()}{" "}
                sq. ft
              </span>
              <span className="text-blue-600">
                {getFilledPlotsCount()} of {revenuePlots} plots filled
              </span>
            </div>
            <div className="mt-2">
              <button
                onClick={saveRevenuePlots}
                disabled={isSaving}
                className={`px-3 py-1 ${
                  isSaving ? "opacity-60 cursor-not-allowed" : "bg-indigo-600"
                } text-white rounded-md text-sm`}
              >
                {isSaving ? "Saving..." : "Save Revenue Plot Details"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Project Basic Info */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 mb-2">
        <div className="w-full bg-gray-50 p-4 md:p-5 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-indigo-700">
            Project Information
          </h2>
          <div className="space-y-4">
          <div className="relative">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Project Name *
  </label>

  {/* Project name input with inline button */}
  <div className="relative">
    <input
      type="text"
      value={projectName}
      onChange={(e) => {
        setProjectName(e.target.value);
        if (showTickImmediate) setShowTickImmediate(false);
      }}
      className={`w-full border border-gray-300 rounded-md p-2 ${
        isEditMode ? "pr-3" : "pr-28"
      } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
      placeholder="Enter project name"
      disabled={isEditMode} // Disable input in edit mode if needed
    />

    {/* Only show the "Done" button when NOT in edit mode */}
    {!isEditMode && (
      <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
        {(projectId || showTickImmediate) && (
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-700">
            <FaCheckCircle className="w-4 h-4" />
          </span>
        )}

        <button
          onClick={async () => {
            if (!projectName) {
              alert("Please enter project name first");
              return;
            }
            if (projectId) {
              alert(`Project already created. ID: ${projectId}`);
              return;
            }

            setShowTickImmediate(true);

            try {
              await createProjectQuick();
            } catch (err) {
              setShowTickImmediate(false);
            }
          }}
          className={`bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700 ${
            isCreatingQuick ? "opacity-60 cursor-not-allowed" : ""
          }`}
          title="Create project (quick)"
          disabled={isCreatingQuick || !!projectId}
        >
          {isCreatingQuick
            ? "Creating..."
            : projectId
            ? "Created"
            : "Done"}
        </button>
      </div>
    )}
  </div>

  {/* Show different message in edit mode */}
  {isEditMode ? (
    <div className="mt-2 text-sm text-blue-600">
      Editing existing project. Project name cannot be changed.
    </div>
  ) : (
    <>
      {/* Success banner */}
      {successMessage && (
        <div className="rounded-lg text-sm text-green-600 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <div className="font-semibold">
                Project Created Successfully!
              </div>
            </div>
          </div>

          <div className="ml-4">
            {projectId ? (
              <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800 font-medium">
                Project ID
              </span>
            ) : null}
          </div>
        </div>
      )}

      {projectId && (
        <div className="mt-2 text-sm text-gray-600">
          Created Project ID:{" "}
          <span className="font-mono text-indigo-700">{projectId}</span>
        </div>
      )}
    </>
  )}
</div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Type *
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select project type</option>
                <option value={PROJECT_TYPES.APARTMENT}>
                  {PROJECT_TYPES.APARTMENT}
                </option>
                <option value={PROJECT_TYPES.PLOTTING}>
                  {PROJECT_TYPES.PLOTTING}
                </option>
                <option value={PROJECT_TYPES.DUPLEX}>
                  {PROJECT_TYPES.DUPLEX}
                </option>
                <option value={PROJECT_TYPES.TRIPLEX}>
                  {PROJECT_TYPES.TRIPLEX}
                </option>
                <option value={PROJECT_TYPES.COMMERCIAL}>
                  {PROJECT_TYPES.COMMERCIAL}
                </option>
                <option value={PROJECT_TYPES.CUSTOM}>
                  {PROJECT_TYPES.CUSTOM}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="w-full bg-gray-50 p-4 md:p-5 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-indigo-700">
            Property Location
          </h2>
          <div className="space-y-4">
            <div className="flex gap-6">
              <div className="flex-1">
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
              <div className="flex-1">
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
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Land Area (sq. ft)
              </label>
              <input
                type="number"
                min="0"
                value={landArea}
                onChange={(e) => setLandArea(parseFloat(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter total land area"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Plots Section */}
      {renderRevenuePlotsSection()}

      {/* Block Configuration - Full Width */}
      <div className="w-full">{renderBlockConfiguration()}</div>

      {/* Units and Details - Side by Side */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* All Generated Units - Left Side */}
        <div className="lg:w-1/3">{renderAllGeneratedUnits()}</div>

        {/* Unit Details - Right Side */}
        <div className="lg:w-2/3">{renderDetailsPanel()}</div>
      </div>
    </div>
  );
};

export default ApartmentProject;