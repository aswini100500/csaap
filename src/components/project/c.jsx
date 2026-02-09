import React, { useState, useEffect } from "react";
import axios from "axios";
// ... other imports remain the same

const CommercialProject = ({
  // ... props remain the same
}) => {
  // --- ADD THESE TWO HELPERS AT TOP OF CommercialProject.jsx ---
  const getSubdomain = () => {
    return localStorage.getItem("subdomain") || "cloudflare";
  };

  const getAuthToken = () => {
    return localStorage.getItem("token") || localStorage.getItem("authToken") || "";
  };
  // --------------------------------------------------------------

  // Primary states
  const [numFloors, setNumFloors] = useState(1);
  const [totalUnits, setTotalUnits] = useState(0);
  const [floorConfigurations, setFloorConfigurations] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [unitPrefix, setUnitPrefix] = useState("");
  const [priceDetails, setPriceDetails] = useState(INITIAL_PRICE_DETAILS);
  const isEditMode = Boolean(editingProjectId);

  // Quick-create & project tracking
  const [projectId, setProjectId] = useState(editingProjectId || null);
  const [generatedProjectId, setGeneratedProjectId] = useState(null);
  const [lastCreatedProjectName, setLastCreatedProjectName] = useState("");
  const [isCreatingQuick, setIsCreatingQuick] = useState(false);
  const [autoCreating, setAutoCreating] = useState(false);
  const [showTickImmediate, setShowTickImmediate] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Add a state to track if project was just created
  const [projectJustCreated, setProjectJustCreated] = useState(false);

  // ... other states remain the same

  // Initialize from localStorage
  useEffect(() => {
    const savedId = localStorage.getItem("latestProjectId");
    const savedName = localStorage.getItem("latestProjectName");
    if (savedId) {
      setGeneratedProjectId(savedId);
      if (!editingProjectId) setProjectId(savedId);
    }
    if (savedName) setLastCreatedProjectName(savedName);
  }, [editingProjectId]);

  // NEW: Improved auto-create function that triggers on project name blur
  useEffect(() => {
    const timer = setTimeout(() => {
      if (projectName && projectType && !projectId && !autoCreating && !isEditMode) {
        handleAutoCreateProject();
      }
    }, 1500); // Delay auto-create to avoid too many requests

    return () => clearTimeout(timer);
  }, [projectName, projectType]);

  const createProjectAPI = async (payload) => {
    const token = getAuthToken();
    const subdomain = getSubdomain();
    const url = `${apiBaseUrl}/projects`;
    
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    try {
      const resp = await axios.post(url, { ...payload, subdomain }, { headers });
      console.log("Project created successfully:", resp.data);
      return resp.data;
    } catch (error) {
      console.error("Project creation failed:", error.response?.data || error.message);
      throw error;
    }
  };

  // NEW: Function to create revenue plot
  const createRevenuePlotAPI = async (projectId, plotData) => {
    const token = getAuthToken();
    const subdomain = getSubdomain();
    const url = `${apiBaseUrl}/projects/${projectId}/revenue-plots`;

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const payload = {
      subdomain,
      plot_number: plotData.plotNumber || 1,
      area: plotData.area || 0,
      entry_plot_no: plotData.entryPlotNo || "",
      khata_no: plotData.khataNo || "",
      plot_document: plotData.fileName || "",
      file_name: plotData.fileName || "",
    };

    try {
      const resp = await axios.post(url, payload, { headers });
      console.log("Revenue plot created:", resp.data);
      return resp.data;
    } catch (error) {
      console.error("Revenue plot creation failed:", error.response?.data || error.message);
      throw error;
    }
  };

  // NEW: Function to create revenue plot with file upload
  const createRevenuePlotWithFileAPI = async (projectId, plotData) => {
    const token = getAuthToken();
    const subdomain = getSubdomain();
    const url = `${apiBaseUrl}/projects/${projectId}/revenue-plots`;

    const formData = new FormData();
    formData.append("subdomain", subdomain);
    formData.append("plot_number", String(plotData.plotNumber || 1));
    formData.append("area", String(plotData.area || 0));
    formData.append("entry_plot_no", plotData.entryPlotNo || "");
    formData.append("khata_no", plotData.khataNo || "");
    formData.append("file_name", plotData.fileName || "");
    
    if (plotData.file instanceof File) {
      formData.append("file", plotData.file);
    }

    const headers = {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    try {
      const resp = await axios.post(url, formData, { headers });
      console.log("Revenue plot with file created:", resp.data);
      return resp.data;
    } catch (error) {
      console.error("Revenue plot with file creation failed:", error.response?.data || error.message);
      throw error;
    }
  };

  // Improved auto-create project function
  const handleAutoCreateProject = async () => {
    if (!projectName || !projectType) return;
    if (autoCreating || projectId || isEditMode) return;
    if (projectName === lastCreatedProjectName && generatedProjectId) return;

    console.log("Attempting auto-create project...");
    setAutoCreating(true);
    
    try {
      const minimalPayload = {
        name: projectName,
        type: projectType,
        city: city || undefined,
        locality: locality || undefined,
      };

      const result = await createProjectAPI(minimalPayload);

      // Extract project ID from response
      const newId = result?.project?.id || result?.id || result?.data?.id || null;

      if (newId) {
        console.log("Project auto-created with ID:", newId);
        setGeneratedProjectId(newId);
        setProjectId(newId);
        setLastCreatedProjectName(projectName);
        setProjectJustCreated(true);
        
        // Save to localStorage
        localStorage.setItem("latestProjectId", newId);
        localStorage.setItem("latestProjectName", projectName);
        
        // Fetch existing plot numbers
        await fetchExistingPlotNumbers(newId);
        
        // Show success message
        setSuccessMessage(`Project "${projectName}" created successfully!`);
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        console.warn("Project created but no ID found in response:", result);
        setErrorMessage("Project created but no ID received from server");
      }
    } catch (err) {
      console.error("Auto-create project failed:", err);
      setErrorMessage(`Failed to create project: ${err.message}`);
    } finally {
      setAutoCreating(false);
    }
  };

  // Improved createProjectQuick function (called by Done button)
  const createProjectQuick = async () => {
    if (isEditMode) {
      alert("You are in edit mode. Use Save Project instead.");
      return;
    }
    
    if (!projectName || !projectType) {
      alert("Please enter project name and project type before creating.");
      return;
    }
    
    if (isCreatingQuick) return;
    if (projectId) {
      alert(`Project already created with ID: ${projectId}`);
      return;
    }

    console.log("Creating project via Done button...");
    setIsCreatingQuick(true);
    setErrorMessage("");
    setSuccessMessage("");
    setShowTickImmediate(true);

    const payload = {
      name: projectName,
      type: projectType,
      city: city || undefined,
      locality: locality || undefined,
      land_zone: landZone || undefined,
      commercial_sub_type: commercialSubType || undefined,
      total_land_area: landArea || undefined,
      revenue_plots: revenuePlots || undefined,
    };

    try {
      const result = await createProjectAPI(payload);
      
      const serverId = result?.project?.id || result?.id || result?.data?.id || null;

      if (serverId) {
        console.log("Project created with ID:", serverId);
        setProjectId(serverId);
        setGeneratedProjectId(serverId);
        setLastCreatedProjectName(projectName);
        setProjectJustCreated(true);
        
        localStorage.setItem("latestProjectId", serverId);
        localStorage.setItem("latestProjectName", projectName);
        
        setSuccessMessage(`Project "${projectName}" created successfully! ID: ${serverId}`);
        
        // Fetch existing plot numbers
        await fetchExistingPlotNumbers(serverId);
        
        return serverId;
      } else {
        setErrorMessage("Project created but no ID received from server");
        setShowTickImmediate(false);
        console.warn("createProjectQuick: server returned no id", result);
      }
    } catch (err) {
      console.error("[createProjectQuick] failed", err);
      setErrorMessage(
        err?.response?.data?.message || err.message || "Create failed"
      );
      setShowTickImmediate(false);
      alert(
        `Failed to create project: ${
          err?.response?.data?.message || err.message
        }`
      );
      throw err;
    } finally {
      setIsCreatingQuick(false);
    }
  };

  // Updated handleSaveRevenuePlots to use the new API
  const handleSaveRevenuePlots = async () => {
    let projectIdToUse = projectId || generatedProjectId;
    const subdomain = getSubdomain();
    const token = getAuthToken();

    console.log("[handleSaveRevenuePlots] start", {
      projectId,
      generatedProjectId,
      projectIdToUse,
      subdomain,
      tokenPresent: !!token,
    });

    let createdNow = false;

    // If no server project id, create project quickly and use returned id.
    if (!projectIdToUse) {
      try {
        console.log("[handleSaveRevenuePlots] No projectId, attempting quick create...");
        const createdId = await createProjectQuick();
        if (!createdId) {
          console.warn("[handleSaveRevenuePlots] createProjectQuick did not return server id.");
          alert("Could not create project on server; cannot save plots. Check console.");
          return;
        }
        projectIdToUse = createdId;
        setProjectId(createdId);
        setGeneratedProjectId(createdId);
        createdNow = true;
        console.log("[handleSaveRevenuePlots] Created projectId:", createdId);
      } catch (err) {
        console.error("[handleSaveRevenuePlots] createProjectQuick failed:", err);
        alert("Failed to create project before saving plots. Check console.");
        return;
      }
    }

    if (!projectIdToUse) {
      alert("Project ID missing — cannot save plots.");
      return;
    }

    // Only fetch existing plot numbers if editing an existing project (not newly created now)
    let currentExistingNumbers = existingPlotNumbers instanceof Set ? new Set(existingPlotNumbers) : new Set();
    if (!createdNow) {
      try {
        const fetched = await fetchExistingPlotNumbers(projectIdToUse);
        if (fetched instanceof Set && fetched.size > 0) currentExistingNumbers = new Set(fetched);
        console.log("[handleSaveRevenuePlots] fetched existing plot numbers:", Array.from(currentExistingNumbers));
      } catch (err) {
        console.warn("[handleSaveRevenuePlots] fetchExistingPlotNumbers failed - continuing with empty set", err);
        currentExistingNumbers = new Set();
      }
    } else {
      console.log("[handleSaveRevenuePlots] project was created now; skipping GET /revenue-plots to avoid 404.");
    }

    // Only send filled plots
    const filledPlots = plotsData
      .map((plot, idx) => ({ plot, idx }))
      .filter(
        (item) =>
          item.plot &&
          (item.plot.area ||
            item.plot.entryPlotNo ||
            item.plot.khataNo ||
            item.plot.fileName ||
            item.plot.file)
      );

    if (filledPlots.length === 0) {
      alert("No filled plots to save.");
      return;
    }

    setIsSavingPlots(true);

    try {
      const results = [];
      
      for (const { plot, idx } of filledPlots) {
        try {
          // Generate unique plot number
          const plotNumber = generateUniquePlotNumber(currentExistingNumbers);
          currentExistingNumbers.add(plotNumber);
          
          let result;
          
          if (plot.file instanceof File) {
            // Use file upload API
            result = await createRevenuePlotWithFileAPI(projectIdToUse, {
              ...plot,
              plotNumber
            });
          } else {
            // Use JSON API
            result = await createRevenuePlotAPI(projectIdToUse, {
              ...plot,
              plotNumber
            });
          }
          
          results.push({ idx, ok: true, data: result, plotNumber });
          console.log(`Plot ${idx + 1} saved successfully with plot number ${plotNumber}`);
          
        } catch (err) {
          console.error(`Failed to save plot ${idx + 1}:`, err);
          results.push({ idx, ok: false, error: err?.response?.data || err.message || String(err) });
        }
        
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const successes = results.filter((r) => r.ok).length;
      const failures = results.filter((r) => !r.ok);

      if (successes > 0) {
        const newPlotNumbers = results.filter((r) => r.ok).map((r) => r.plotNumber);
        setExistingPlotNumbers((prev) => new Set([...Array.from(prev || []), ...newPlotNumbers]));
        alert(`${successes} plot(s) saved successfully to project ${projectIdToUse}.`);
      }

      if (failures.length > 0) {
        console.error("Failed plot results:", failures);
        const sampleErrors = failures.slice(0, 5).map((f) => `Plot ${f.idx + 1}: ${JSON.stringify(f.error)}`);
        alert(`${failures.length} plot(s) failed. Check console for details.\n\nExamples:\n${sampleErrors.join("\n")}`);
      }
    } catch (err) {
      console.error("Error saving revenue plots:", err);
      alert(`Failed to save revenue plots: ${err.message || "Check console"}`);
    } finally {
      setIsSavingPlots(false);
    }
  };

  // ... rest of the functions remain mostly the same

  // Update the Done button section in the render
  return (
    <div className="space-y-6">
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

              <div className="relative">
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => {
                    setProjectName(e.target.value);
                    if (showTickImmediate) setShowTickImmediate(false);
                    // Clear success message when user starts typing
                    if (successMessage) setSuccessMessage("");
                  }}
                  onBlur={() => {
                    // Auto-create on blur if conditions met
                    if (projectName && projectType && !projectId && !isEditMode) {
                      handleAutoCreateProject();
                    }
                  }}
                  className={`w-full border border-gray-300 rounded-md p-2 ${
                    isEditMode ? "pr-3" : "pr-28"
                  } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="Enter project name"
                  disabled={isEditMode}
                />

                {/* Done button */}
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
                        if (!projectType) {
                          alert("Please select project type");
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
                      className={`bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700 transition-colors ${
                        isCreatingQuick ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                      title="Create project (quick)"
                      disabled={isCreatingQuick || !!projectId}
                    >
                      {isCreatingQuick ? (
                        <>
                          <FaSpinner className="animate-spin inline mr-1" /> Creating...
                        </>
                      ) : projectId ? (
                        "Created"
                      ) : (
                        "Done"
                      )}
                    </button>
                  </div>
                )}
              </div>

              {isEditMode ? (
                <div className="mt-2 text-sm text-blue-600">
                  Editing existing project. Project name cannot be changed.
                </div>
              ) : (
                <>
                  {autoCreating && (
                    <div className="mt-2 text-sm text-blue-600 flex items-center">
                      <FaSpinner className="animate-spin mr-2" /> Auto-creating project...
                    </div>
                  )}
                  
                  {successMessage && (
                    <div className="mt-2 text-sm text-green-600 flex items-center">
                      <FaCheckCircle className="mr-2" /> {successMessage}
                    </div>
                  )}
                  
                  {errorMessage && (
                    <div className="mt-2 text-sm text-red-600 flex items-center">
                      <FaInfoCircle className="mr-2" /> {errorMessage}
                    </div>
                  )}
                  
                  {projectId && (
                    <div className="mt-2 text-sm font-medium text-green-700">
                      ✓ Project ID: <span className="font-bold">{projectId}</span>
                    </div>
                  )}
                </>
              )}
            </div>
            
            {/* ... rest of the JSX remains the same */}
          </div>
        </div>
        
        {/* ... rest of the JSX remains the same */}
      </div>
    </div>
  );
};

export default CommercialProject;