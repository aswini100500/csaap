import React, { useState } from 'react';

const PurchaseLedger = () => {
  // Sample supplier data
  const suppliers = [
    { id: 1, name: 'Reagent Nagar' },
    { id: 2, name: 'Supplier 2' },
    { id: 3, name: 'Supplier 3' },
  ];

  // Sample ledger data
  const ledgerData = [
    { sl: 1, supplierName: 'Reagent Nagar', transactionDate: '07/06/2024', transactionType: 'Debited', remark: 'Purchase Entry From Reagent Nagar', accountNo: 'Cash', debitAmount: 7000, creditAmount: null, balance: 7000 },
    { sl: 2, supplierName: 'Reagent Nagar', transactionDate: '07/06/2024', transactionType: 'Credited', remark: 'Purchase Entry From Reagent Nagar', accountNo: null, debitAmount: null, creditAmount: 7000, balance: 0 },
    { sl: 3, supplierName: 'Reagent Nagar', transactionDate: '06/07/2024', transactionType: 'Debited', remark: 'Purchase Entry From Reagent Nagar', accountNo: 'Cash', debitAmount: 7457.5, creditAmount: null, balance: 7457.5 },
    { sl: 4, supplierName: 'Reagent Nagar', transactionDate: '06/07/2024', transactionType: 'Credited', remark: 'Purchase Entry From Reagent Nagar', accountNo: null, debitAmount: null, creditAmount: 7457.5, balance: 0 },
    { sl: 5, supplierName: 'Reagent Nagar', transactionDate: '30/07/2024', transactionType: 'Credited', remark: 'Purchase Entry From Reagent Nagar', accountNo: null, debitAmount: null, creditAmount: 9675, balance: -9675 },
    { sl: 6, supplierName: 'Reagent Nagar', transactionDate: '22/08/2024', transactionType: 'Credited', remark: 'Purchase Entry From Reagent Nagar', accountNo: null, debitAmount: null, creditAmount: 5165, balance: -14840 },
    { sl: 7, supplierName: 'Reagent Nagar', transactionDate: '05/09/2024', transactionType: 'Credited', remark: 'Purchase Entry From Reagent Nagar', accountNo: null, debitAmount: null, creditAmount: 23785, balance: -38625 },
    { sl: 8, supplierName: 'Reagent Nagar', transactionDate: '05/09/2024', transactionType: 'Debited', remark: 'Purchase Entry From Reagent Nagar', accountNo: 'Cash', debitAmount: 23785, creditAmount: null, balance: -14840 },
    { sl: 9, supplierName: 'Reagent Nagar', transactionDate: '09/09/2024', transactionType: 'Credited', remark: 'Purchase Entry From Reagent Nagar', accountNo: null, debitAmount: null, creditAmount: 11850, balance: -26690 },
    { sl: 10, supplierName: 'Reagent Nagar', transactionDate: '09/09/2024', transactionType: 'Debited', remark: 'Purchase Entry From Reagent Nagar', accountNo: 'AJCash', debitAmount: 11850, creditAmount: null, balance: -14840 },
  ];

  // State management
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  // Filter data based on selections
  const filteredData = ledgerData.filter(entry => {
    return (
      (selectedSupplier === '' || entry.supplierName === selectedSupplier) &&
      (fromDate === '' || new Date(entry.transactionDate) >= new Date(fromDate)) &&
      (toDate === '' || new Date(entry.transactionDate) <= new Date(toDate)) &&
      (searchTerm === '' || 
        entry.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.transactionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.remark.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.accountNo?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentEntries = filteredData.slice(startIndex, startIndex + entriesPerPage);

  // Calculate totals
  const totalAmount = filteredData.reduce((sum, entry) => sum + (entry.debitAmount || 0), 0);
  const paidAmount = filteredData.reduce((sum, entry) => sum + (entry.creditAmount || 0), 0);
  const dueAmount = totalAmount - paidAmount;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Purchase Ledger Details</h1>
        
        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Supplier</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
            >
              <option value="">All Suppliers</option>
              {suppliers.map(supplier => (
                <option key={supplier.id} value={supplier.name}>{supplier.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
            <input 
              type="date" 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
            <input 
              type="date" 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Purchase Ledger Details</h2>
        
        {/* Search Box */}
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="Search suppliers, transactions, remarks..." 
            className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">purchase Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">purchase Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remark</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">payment type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Debit Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentEntries.map(entry => (
                <tr key={entry.sl}>
                  <td className="px-4 py-3 whitespace-nowrap">{entry.sl}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{entry.supplierName}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{entry.transactionDate}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      entry.transactionType === 'Debited' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {entry.transactionType}
                    </span>
                  </td>
                  <td className="px-4 py-3">{entry.remark}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{entry.accountNo || '-'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{entry.debitAmount ? entry.debitAmount.toFixed(2) : '-'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{entry.creditAmount ? entry.creditAmount.toFixed(2) : '-'}</td>
                  <td className={`px-4 py-3 whitespace-nowrap font-medium ${
                    entry.balance < 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {entry.balance.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, filteredData.length)} of {filteredData.length} entries
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
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
                      : 'bg-gray-200 text-gray-700'
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
              className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
        
        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-200">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800">Total Amount</h3>
            <p className="text-2xl font-bold text-blue-900">{totalAmount.toFixed(2)}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-800">Paid Amount</h3>
            <p className="text-2xl font-bold text-green-900">{paidAmount.toFixed(2)}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-red-800">Due Amount</h3>
            <p className="text-2xl font-bold text-red-900">{dueAmount.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseLedger;