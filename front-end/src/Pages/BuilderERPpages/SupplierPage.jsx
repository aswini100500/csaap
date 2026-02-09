

import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
const SupplierPage = () => {
  const navigate = useNavigate();

  // Sample initial data
const initialSuppliers = [
  {
    id: 1,
    name: 'ABC Construction Supplies',
    projectName: 'Skyline Heights Project',
    contact: { mobile: 9876543210, email: 'abc@example.com', altMobile: 9123456780 },
    materialsProvided: [
      { name: 'Cement', quantity: 50, perUnitPrice: 30 },
      { name: 'Steel Rods', quantity: 4, perUnitPrice: 5 },
      { name: 'Bricks', quantity: 300, perUnitPrice: 10 }
    ],
    billAmount: 600000,
    payoutDue: 150000,
    gst: '18%',
    supplyDate: '2025-09-01'   
  },
  {
    id: 2,
    name: 'XYZ Building Materials',
    projectName: 'Green Valley Residences',
    contact: { mobile: 9988776655, email: 'xyz@example.com', altMobile: 9876501234 },
    materialsProvided: [
      { name: 'Sand', quantity: 100, perUnitPrice: 20 },
      { name: 'Gravel', quantity: 150, perUnitPrice: 40 },
      { name: 'Tiles', quantity: 200, perUnitPrice: 60 }
    ],
    billAmount: 450000,
    payoutDue: 100000,
    gst: '12%',
    supplyDate: '2025-09-05'
  },
  {
    id: 3,
    name: 'LMN Hardware Supplies',
    projectName: 'Sunshine Apartments',
    contact: { mobile: 9123409876, email: 'lmn@example.com', altMobile: 9012345678 },
    materialsProvided: [
      { name: 'Paint', quantity: 80, perUnitPrice: 150 },
      { name: 'Pipes', quantity: 120, perUnitPrice: 200 },
      { name: 'Wood', quantity: 60, perUnitPrice: 400 }
    ],
    billAmount: 520000,
    payoutDue: 200000,
    gst: '5%',
    supplyDate: '2025-09-10'
  }
];




  // State for suppliers and search
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [filters, setFilters] = useState({
  name: "",
  fromDate: "",
  toDate: ""
});
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);


const goToSupplierProfile = (supplierId) => {
  // Navigate to a route like "/supplier/1"
  navigate(`/supplierProfile`);
};

  // State for new supplier form
 const [newSupplier, setNewSupplier] = useState({
  name: '',
  projectName: '',
  contact: {
    mobile: '',
    altMobile: '',
    email: ''
  },
  materialsProvided: [{ name: '', quantity: 0, perUnitPrice: 0 }],
  billAmount: '',
  payoutDue: '',
  gst: ''   
});



  // Handle search
  const handleFilterChange = (e) => {
  const { name, value } = e.target;
  setFilters({
    ...filters,
    [name]: value
  });
};

  // Filter suppliers based on search term
 const filteredSuppliers = suppliers.filter((supplier) => {
  const matchesName = supplier.name
    .toLowerCase()
    .includes(filters.name.toLowerCase());

  const supplyDate = new Date(supplier.supplyDate);
  const fromDate = filters.fromDate ? new Date(filters.fromDate) : null;
  const toDate = filters.toDate ? new Date(filters.toDate) : null;

  const matchesFrom =
    !fromDate || (supplyDate >= fromDate);
  const matchesTo =
    !toDate || (supplyDate <= toDate);

  return matchesName && matchesFrom && matchesTo;
});


  // Handle form input changes
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNewSupplier({
    ...newSupplier,
    [name]: value
  });
};


const handleContactChange = (e) => {
  const { name, value } = e.target;
  setNewSupplier({
    ...newSupplier,
    contact: {
      ...newSupplier.contact,
      [name]: value
    }
  });
};
  // Handle materials input
  const handleMaterialsChange = (e) => {
  const materialsInput = e.target.value;

  const materials = materialsInput.split(',').map(item => {
    const [name, quantity, perUnitPrice] = item.trim().split(':');

    return {
      name: name ? name.trim() : '',
      quantity: quantity ? Number(quantity.trim()) : 0,       // <-- ensures number
      perUnitPrice: perUnitPrice ? Number(perUnitPrice.trim()) : 0  // <-- ensures number
    };
  }).filter(material => material.name && material.quantity && material.perUnitPrice);

  setNewSupplier({
    ...newSupplier,
    materialsProvided: materials
  });
};


  // Handle supplier form submission
 const handleSubmit = (e) => {
  e.preventDefault();

  // ✅ Validation: Check compulsory fields
  if (
    !newSupplier.name.trim() ||
    !newSupplier.projectName.trim() ||
    !newSupplier.contact.mobile.trim() ||
    !newSupplier.contact.email.trim() ||
    newSupplier.materialsProvided.length === 0 ||
    newSupplier.materialsProvided.some(
      (m) => !m.name.trim() || !m.quantity || !m.perUnitPrice
    ) ||
    !newSupplier.billAmount ||
    !newSupplier.payoutDue
  ) {
    alert("⚠️ Please fill in all required fields before submitting.");
    return;
  }

  if (editingSupplier) {
    // Update existing supplier
    setSuppliers(
      suppliers.map((supplier) =>
        supplier.id === editingSupplier.id
          ? { ...newSupplier, id: editingSupplier.id }
          : supplier
      )
    );
    setEditingSupplier(null);
  } else {
    // Add new supplier
    const newId =
      suppliers.length > 0
        ? Math.max(...suppliers.map((s) => s.id)) + 1
        : 1;

    setSuppliers([
      ...suppliers,
      {
        ...newSupplier,
        id: newId,
      },
    ]);
  }

  // ✅ Reset form
  setNewSupplier({
    name: "",
    projectName: "",
    contact: {
      mobile: "",
      altMobile: "",
      email: "",
    },
    materialsProvided: [{ name: "", quantity: 0, perUnitPrice: 0 }],
    billAmount: "",
    payoutDue: "",
    gst: "", // optional
  });

  setShowAddForm(false);
};


  // Edit supplier
 const handleEdit = (supplier) => {
  setNewSupplier({
    ...supplier,
    materialsProvided: supplier.materialsProvided.length > 0 
      ? supplier.materialsProvided 
      : [{ name: '', quantity: 0, perUnitPrice: 0 }]
  });
  setEditingSupplier(supplier);
  setShowAddForm(true);
};


  // Delete supplier
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      setSuppliers(suppliers.filter(supplier => supplier.id !== id));
    }
  };
  const handleDownload = (supplier) => {
  // Example: download supplier info as JSON file
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(supplier, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", `${supplier.name.replace(/\s+/g, '_')}_details.json`);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};


  // Cancel form
  const handleCancel = () => {
  setShowAddForm(false);
  setEditingSupplier(null);
  setNewSupplier({
    name: '',
    projectName: '',
    contact: {
      mobile: '',
      altMobile: '',
      email: ''
    },
    materialsProvided: [{ name: '', quantity: 0, perUnitPrice: 0 }],
    billAmount: '',
    payoutDue: ''
  });
};


  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Supplier</h2>
       <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Total Suppliers</h3>
          <p className="text-2xl font-bold text-blue-600">{suppliers.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Active Suppliers</h3>
          <p className="text-2xl font-bold text-green-600">
            {suppliers.filter(supplier => supplier.status === 'Active').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Average Rating</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {(suppliers.reduce((total, supplier) => total + supplier.rating, 0) / suppliers.length).toFixed(1)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Top Rated</h3>
          <p className="text-2xl font-bold text-purple-600">
            {suppliers.reduce((max, supplier) => supplier.rating > max.rating ? supplier : max, suppliers[0]).name}
          </p>
        </div>
      </div>
      {/* Search and Add Button Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
   
<div className="relative w-full md:w-1/4">
  <div className="flex items-center">
    <input
      type="text"
      name="name"
      placeholder="Supplier Name"
      value={filters.name}
      onChange={(e) => {
        handleFilterChange(e);
        setShowDropdown(true); // show dropdown while typing
      }}
      onFocus={() => setShowDropdown(true)}
      onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
      className="w-full px-2 py-1 border border-gray-300 rounded-l-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
    {/* Dropdown Button */}
    <button
      type="button"
      onClick={() => setShowDropdown(!showDropdown)}
      className="px-2 py-1 border border-l-0 border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
    >
      ▼
    </button>
  </div>

  {showDropdown && (
    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-40 overflow-y-auto mt-1">
      {suppliers.map((supplier) => (
        <li
          key={supplier.id}
          onMouseDown={() => { // use onMouseDown to prevent input blur
            setFilters({ ...filters, name: supplier.name });
            setShowDropdown(false);
          }}
          className="px-2 py-1 hover:bg-blue-100 cursor-pointer text-sm"
        >
          {supplier.name}
        </li>
      ))}
    </ul>
  )}
</div>




  {/* From Date */}
  <div className="w-full md:w-1/5">
    <input
      type="date"
      name="fromDate"
      value={filters.fromDate}
      onChange={handleFilterChange}
      className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>

  {/* To Date */}
  <div className="w-full md:w-1/5">
    <input
      type="date"
      name="toDate"
      value={filters.toDate}
      onChange={handleFilterChange}
      className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>

        
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Supplier
        </button>
      </div>
      
      {/* Add/Edit Supplier Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}
          </h2>
          
          <div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Supplier Name */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Name</label>
    <input
      type="text"
      name="name"
      value={newSupplier.name}
      onChange={handleInputChange}
      required
      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Project Name */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
    <input
      type="text"
      name="projectName"
      value={newSupplier.projectName}
      onChange={handleInputChange}
      required
      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Contact Info */}
  <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
  <input
    type="tel"
    name="mobile"
    value={newSupplier.contact.mobile}
    onChange={(e) => {
      const onlyNumbers = e.target.value.replace(/\D/g, '');
      handleContactChange({ target: { name: 'mobile', value: onlyNumbers } });
    }}
    required
    maxLength={10} // optional: limit to 10 digits
    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
  />
</div>

{/* Alternate Mobile */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Mobile</label>
  <input
    type="tel"
    name="altMobile"
    value={newSupplier.contact.altMobile}
    onChange={(e) => {
      const onlyNumbers = e.target.value.replace(/\D/g, '');
      handleContactChange({ target: { name: 'altMobile', value: onlyNumbers } });
    }}
    maxLength={10} // optional
    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
  />
</div>

  <div className="md:col-span-2">
    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
    <input
      type="email"
      name="email"
      value={newSupplier.contact.email}
      onChange={handleContactChange}
      required
      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Materials */}

<div className="md:col-span-2">
 

  {/* Headings for material fields */}
  <div className="flex gap-2 mb-2 font-semibold text-gray-700">
    <span className="flex-1">Material</span>
    <span className="w-24">Quantity</span>
    <span className="w-24">Unit Price</span>
    <span className="w-10"></span> {/* for the "+" button */}
  </div>

  {newSupplier.materialsProvided.map((material, index) => (
    <div key={index} className="flex gap-2 mb-2">
      {/* Material Name */}
      <input
        type="text"
        placeholder="Material Name"
        value={material.name}
        onChange={(e) => {
          const updated = [...newSupplier.materialsProvided];
          updated[index].name = e.target.value;
          setNewSupplier({ ...newSupplier, materialsProvided: updated });
        }}
        className="flex-1 px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500"
      />

      {/* Quantity */}
      <input
        type="number"
        placeholder="Quantity"
        value={material.quantity}
        onChange={(e) => {
          const updated = [...newSupplier.materialsProvided];
          updated[index].quantity = Number(e.target.value);
          setNewSupplier({ ...newSupplier, materialsProvided: updated });
        }}
        className="w-24 px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500"
      />

      {/* Per Unit Price */}
      <input
        type="number"
        placeholder="Per Unit Price"
        value={material.perUnitPrice}
        onChange={(e) => {
          const updated = [...newSupplier.materialsProvided];
          updated[index].perUnitPrice = Number(e.target.value);
          setNewSupplier({ ...newSupplier, materialsProvided: updated });
        }}
        className="w-24 px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500"
      />

      {/* Add Button */}
      {index === newSupplier.materialsProvided.length - 1 && (
        <button
          type="button"
          onClick={() =>
            setNewSupplier({
              ...newSupplier,
              materialsProvided: [
                ...newSupplier.materialsProvided,
                { name: '', quantity: 0, perUnitPrice: 0 }
              ]
            })
          }
          className="px-2 py-1 bg-blue-600 text-white rounded-md"
        >
          +
        </button>
      )}
    </div>
  ))}
</div>

{/* GST (Optional) */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    GST (Optional)
  </label>
  <input
    type="text"
    name="gst"
    value={newSupplier.gst || ""}
    onChange={handleInputChange}
    placeholder="e.g. 18%"
    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
  />
</div>


  {/* Bill Amount */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Bill Amount (₹)</label>
    <input
      type="number"
      name="billAmount"
      value={newSupplier.billAmount || ""}
      onChange={handleInputChange}
      required
      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Payout Due */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Payout Due (₹)</label>
    <input
      type="number"
      name="payoutDue"
      value={newSupplier.payoutDue || ""}
      onChange={handleInputChange}
      required
      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
    />
  </div>
</div>


            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingSupplier ? "Update Supplier" : "Add Supplier"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Suppliers Table with Scrollbar */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-[1200px] divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Per Unit Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Material Cost</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                         GST
                    </th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  Total + GST
</th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bill Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payout Due</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Download</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.flatMap((supplier) => {
                const totalMaterialCost = supplier.materialsProvided.reduce(
                  (sum, material) => sum + (material.quantity * material.perUnitPrice),
                  0
                );
                return supplier.materialsProvided.map((material, index) => {
                  const materialTotalPrice = material.quantity * material.perUnitPrice;
                  return (
                    <tr key={`${supplier.id}-${index}`}>
                      {index === 0 ? (
                        <>
                        <td
  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer"
  rowSpan={supplier.materialsProvided.length}
  onClick={() => goToSupplierProfile(supplier.id)}
>
  {supplier.name}
</td>
<td
  className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
  rowSpan={supplier.materialsProvided.length}
>
  <div className="flex flex-col gap-1">
    <span>📱 {supplier.contact?.mobile || "—"}</span>
    <span>✉️ {supplier.contact?.email || "—"}</span>
    <span>📞 {supplier.contact?.altMobile || "—"}</span>
  </div>
</td>


                          <td
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                            rowSpan={supplier.materialsProvided.length}
                          >
                            {supplier.projectName || "—"}
                          </td>
                        </>
                      ) : null}
                      <td className="px-6 py-4 text-sm text-gray-700">{material.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{material.quantity || "—"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{material.perUnitPrice ? `₹${material.perUnitPrice.toFixed(2)}` : "—"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{materialTotalPrice ? `₹${materialTotalPrice.toFixed(2)}` : "—"}</td>
                      {index === 0 ? (
                        <>
                          <td
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                            rowSpan={supplier.materialsProvided.length}
                          >
                            {totalMaterialCost ? `₹${totalMaterialCost.toFixed(2)}` : "—"}
                          </td>
                          <td
  className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
  rowSpan={supplier.materialsProvided.length}
>
  {supplier.gst ? supplier.gst : "—"}
</td>
<td
  className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
  rowSpan={supplier.materialsProvided.length}
>
  {(() => {
    if (!supplier.gst) return "—";
    const gstRate = parseFloat(supplier.gst.replace('%', '')) || 0;
    const totalWithGst = totalMaterialCost + (totalMaterialCost * gstRate / 100);
    return `₹${totalWithGst.toFixed(2)}`;
  })()}
</td>


                          <td
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                            rowSpan={supplier.materialsProvided.length}
                          >
                            {supplier.billAmount ? `₹${supplier.billAmount}` : "—"}
                          </td>
                          <td
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                            rowSpan={supplier.materialsProvided.length}
                          >
                            {supplier.payoutDue ? `₹${supplier.payoutDue}` : "—"}
                          </td>
                        <td
  className="px-6 py-4 whitespace-nowrap text-sm font-medium"
  rowSpan={supplier.materialsProvided.length}
>
  <button
    onClick={() => handleDownload(supplier)}
    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md"
  >
    Download
  </button>
</td>

                        </>
                      ) : null}
                    </tr>
                  );
                });
              })
            ) : (
              <tr>
                <td colSpan="10" className="px-6 py-4 text-center text-sm text-gray-500">No suppliers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

       {/* Summary Section */}
      {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Total Suppliers</h3>
          <p className="text-2xl font-bold text-blue-600">{suppliers.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Active Suppliers</h3>
          <p className="text-2xl font-bold text-green-600">
            {suppliers.filter(supplier => supplier.status === 'Active').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Average Rating</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {(suppliers.reduce((total, supplier) => total + supplier.rating, 0) / suppliers.length).toFixed(1)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800">Top Rated</h3>
          <p className="text-2xl font-bold text-purple-600">
            {suppliers.reduce((max, supplier) => supplier.rating > max.rating ? supplier : max, suppliers[0]).name}
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default SupplierPage;