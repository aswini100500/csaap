import React, { useState } from 'react';

const StockList = () => {
  // Sample stock data
  const stockData = [
    { id: 1, storeName: '-NA-', productName: '524', image: '1', batch: '120', rack: '1', stock: '1', purchase: '1', sale: '' },
    { id: 2, storeName: 'Sarita Vihar', productName: 'Nanounsolderd', image: '-NA-', batch: 'Purchase', rack: '16', stock: '20', purchase: '720', sale: '750' },
    { id: 3, storeName: 'Sarita Vihar', productName: 'ArduinoUnoR3SMD', image: '-NA-', batch: '524', rack: '16', stock: '20', purchase: '0', sale: '1' },
    { id: 4, storeName: 'Sarita Vihar', productName: 'ArduinoUnoR3SMD', image: '-NA-', batch: 'I0225', rack: '16', stock: '160', purchase: '0', sale: '175' },
    { id: 5, storeName: 'Sarita Vihar', productName: 'ArduinoUnoR3SMD', image: '-NA-', batch: 'Purchase', rack: '16', stock: '200', purchase: '195', sale: '210' },
    { id: 6, storeName: 'Sarita Vihar', productName: 'Mega R3 CH340', image: '-NA-', batch: '524', rack: '16', stock: '2', purchase: '0', sale: '1' },
    { id: 7, storeName: 'Sarita Vihar', productName: 'Mega R3 CH340', image: '-NA-', batch: 'I0225', rack: '16', stock: '44', purchase: '0', sale: '750' },
    { id: 8, storeName: 'Sarita Vihar', productName: 'Mega R3 CH340', image: '-NA-', batch: 'O', rack: '16', stock: '30', purchase: '0', sale: '800' },
    { id: 9, storeName: 'Sarita Vihar', productName: 'ArdinoNanounsoldered', image: '-NA-', batch: 'I0225', rack: '16', stock: '150', purchase: '0', sale: '145' },
    { id: 10, storeName: 'Sarita Vihar', productName: 'ArdinoNanounsoldered', image: '-NA-', batch: 'IMP1024', rack: '16', stock: '10', purchase: '0', sale: '148' },
  ];

  // State for search and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [showDamageModal, setShowDamageModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [damageQuantity, setDamageQuantity] = useState(0);
  const [damageReason, setDamageReason] = useState('');
  const entriesPerPage = 10;

  // Filter data based on search term
  const filteredData = stockData.filter(item =>
    item.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.batch.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.rack.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentEntries = filteredData.slice(startIndex, startIndex + entriesPerPage);

  // Handle barcode action
  const handleBarcode = (item) => {
    setSelectedItem(item);
    setShowBarcodeModal(true);
  };

  // Handle damage entry action
  const handleDamageEntry = (item) => {
    setSelectedItem(item);
    setDamageQuantity(0);
    setDamageReason('');
    setShowDamageModal(true);
  };

  // Handle damage submission
  const handleDamageSubmit = () => {
    console.log('Damage reported:', {
      item: selectedItem,
      quantity: damageQuantity,
      reason: damageReason
    });
    alert(`Damage reported for ${selectedItem.productName}. Quantity: ${damageQuantity}, Reason: ${damageReason}`);
    setShowDamageModal(false);
  };

  // Print barcode
  const handlePrintBarcode = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Stock List</h1>
        
        {/* Search Box */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <input 
                type="text"
                placeholder="Search by store, product, batch, or rack..."
                className="w-full sm:w-64 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export CSV
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z" />
                </svg>
                Print
              </button>
            </div>
          </div>
        </div>
        
        {/* Stock Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rack</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sale</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentEntries.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">{item.storeName}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.productName}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {item.image === '-NA-' ? (
                        <span className="text-gray-400">No Image</span>
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-500">Img</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.batch}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.rack}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        parseInt(item.stock) < 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {item.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">₹{item.purchase}</td>
                    <td className="px-4 py-3 whitespace-nowrap">₹{item.sale}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleBarcode(item)}
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                          title="Generate Barcode"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                          </svg>
                          Barcode
                        </button>
                        <button 
                          onClick={() => handleDamageEntry(item)}
                          className="text-red-600 hover:text-red-900 flex items-center"
                          title="Damage Entry"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Damage
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-gray-700 mb-4 sm:mb-0">
                Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">
                  {Math.min(startIndex + entriesPerPage, filteredData.length)}
                </span> of <span className="font-medium">{filteredData.length}</span> entries
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300"
                >
                  Previous
                </button>
                
                {/* Page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === pageNum
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                {totalPages > 5 && <span className="px-2 py-1">...</span>}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-700">Total Products</h3>
            <p className="text-2xl font-bold text-blue-600">{filteredData.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-700">Low Stock Items</h3>
            <p className="text-2xl font-bold text-red-600">
              {filteredData.filter(item => parseInt(item.stock) < 10).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-700">Total Value</h3>
            <p className="text-2xl font-bold text-green-600">
              ₹{filteredData.reduce((sum, item) => sum + (parseInt(item.purchase) * parseInt(item.stock)), 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Barcode Modal */}
      {showBarcodeModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Barcode for {selectedItem.productName}</h2>
              <div className="bg-white p-4 border border-gray-300 rounded-md mb-4 flex justify-center">
                <div className="text-center">
                  <div className="mb-2">
                    {/* Simulated barcode - in a real app, you would use a barcode library */}
                    <div className="bg-white p-2 inline-block">
                      <div className="h-12 bg-black w-1 inline-block mx-px"></div>
                      <div className="h-12 bg-black w-1 inline-block mx-px"></div>
                      <div className="h-12 bg-black w-2 inline-block mx-px"></div>
                      <div className="h-12 bg-black w-1 inline-block mx-px"></div>
                      <div className="h-12 bg-black w-3 inline-block mx-px"></div>
                      <div className="h-12 bg-black w-1 inline-block mx-px"></div>
                      <div className="h-12 bg-black w-2 inline-block mx-px"></div>
                      <div className="h-12 bg-black w-1 inline-block mx-px"></div>
                      <div className="h-12 bg-black w-1 inline-block mx-px"></div>
                      <div className="h-12 bg-black w-2 inline-block mx-px"></div>
                    </div>
                  </div>
                  <p className="text-sm font-mono">{selectedItem.productName}</p>
                  <p className="text-xs text-gray-500">Batch: {selectedItem.batch} | Rack: {selectedItem.rack}</p>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowBarcodeModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Close
                </button>
                <button 
                  onClick={handlePrintBarcode}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z" />
                  </svg>
                  Print Barcode
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Damage Entry Modal */}
      {showDamageModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Damage Entry for {selectedItem.productName}</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Damage Quantity</label>
                <input 
                  type="number" 
                  min="1"
                  max={selectedItem.stock}
                  value={damageQuantity}
                  onChange={(e) => setDamageQuantity(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Current stock: {selectedItem.stock}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Damage Reason</label>
                <textarea 
                  value={damageReason}
                  onChange={(e) => setDamageReason(e.target.value)}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter reason for damage..."
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowDamageModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDamageSubmit}
                  disabled={damageQuantity <= 0 || damageQuantity > selectedItem.stock || !damageReason}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Report Damage
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockList;