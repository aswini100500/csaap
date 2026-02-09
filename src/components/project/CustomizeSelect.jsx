// CustomizeSelect.jsx
import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimes, FaInfoCircle, FaArrowLeft } from "react-icons/fa";

const CustomizeSelect = ({ onSelectType, onBack, initialSelected = [] }) => {
  const typeDefinitions = {
    plotting: {
      title: "Plotting",
      description: "Land plots with individual specifications",
    },
    duplex: {
      title: "Duplex",
      description: "Fixed 2 floors (Ground + 1)",
    },
    triplex: {
      title: "Triplex",
      description: "Fixed 3 floors (Ground + 1 + 2)",
    },
    apartment: {
      title: "Apartment",
      description: "Multi-floor with customizable units",
    },
    commercial: {
      title: "Commercial",
      description: "Office/shop/showroom (and land)",
    },
  };

  const [selected, setSelected] = useState(initialSelected);
  const toggle = (type) => {
    setSelected((s) => (s.includes(type) ? s.filter((t) => t !== type) : [...s, type]));
  };

  const handleConfirm = () => {
    if (!selected.length) {
      alert("Select at least one project type.");
      return;
    }
    onSelectType(selected);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Select one or more types</h3>
          <p className="text-sm text-gray-600">
            Choose multiple types to configure within this custom project.
          </p>
        </div>
        {onBack && (
          <button onClick={onBack} className="text-indigo-600 hover:text-indigo-800">
            <FaArrowLeft /> Back
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.keys(typeDefinitions).map((key) => {
          const info = typeDefinitions[key];
          const active = selected.includes(key);
          return (
            <button
              key={key}
              onClick={() => toggle(key)}
              className={`text-left p-5 rounded-xl border transition-all duration-150 ${
                active ? "bg-indigo-50 border-indigo-400 shadow-md" : "bg-white border-gray-200 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">{info.title}</h4>
                {active && <FaCheckCircle className="text-green-500" />}
              </div>
              <p className="text-sm text-gray-600 mt-2">{info.description}</p>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-600">
          <FaInfoCircle className="inline mr-2" />
          {selected.length} selected
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { setSelected([]); }}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Clear
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-lg font-medium ${
              selected.length === 0 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-indigo-600 text-white"
            }`}
            disabled={selected.length === 0}
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizeSelect;
