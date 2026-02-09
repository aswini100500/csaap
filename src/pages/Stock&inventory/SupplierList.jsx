import React, { useState } from 'react';
import { FaEdit, FaTrash, FaFileExcel, FaFilePdf, FaDownload, FaUpload, FaArrowLeft } from 'react-icons/fa';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: 'Reagent Nagar',
      contactNo: '8168491289',
      gstNo: 'NA'
    },
    {
      id: 2,
      name: 'PB Staticlean Solutions Pvt. Ltd.',
      contactNo: '8800853423',
      gstNo: '07AAFCP2599F126'
    },
    {
      id: 3,
      name: 'Honda Sealing Machine',
      contactNo: '9268597292',
      gstNo: 'NA'
    },
    {
      id: 4,
      name: 'Batra Packaging GovindPuri',
      contactNo: '9953252050',
      gstNo: 'NA'
    },
    {
      id: 5,
      name: 'Manu Sekhon',
      contactNo: '23',
      gstNo: 'NA'
    },
    {
      id: 6,
      name: 'Aggarwal Connectors',
      contactNo: '45',
      gstNo: 'NA'
    },
    {
      id: 7,
      name: 'R G Trading Co.',
      contactNo: '9312233875',
      gstNo: 'NA'
    },
    {
      id: 8,
      name: 'Apex Speaker',
      contactNo: '56',
      gstNo: 'NA'
    },
    {
      id: 9,
      name: 'Prashant Pcb',
      contactNo: '67',
      gstNo: 'NA'
    }
  ]);

  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [ledgerData, setLedgerData] = useState([
    {
      id: 1,
      transactionDate: '07/06/2024',
      transactionType: 'Credited',
      accountNo: 'Purchase Entry From Reagent Nagar',
      debitAmount: '',
      creditAmount: '7000',
      balance: '-7000',
      remark: ''
    },
    {
      id: 2,
      transactionDate: '07/06/2024',
      transactionType: 'Debited',
      accountNo: 'Purchase Entry From Reagent Nagar',
      debitAmount: 'Cash',
      creditAmount: '7000',
      balance: '0',
      remark: ''
    },
    {
      id: 3,
      transactionDate: '06/07/2024',
      transactionType: 'Credited',
      accountNo: 'Purchase Entry From Reagent Nagar',
      debitAmount: '',
      creditAmount: '7457.5',
      balance: '-7457.5',
      remark: ''
    },
    {
      id: 4,
      transactionDate: '06/07/2024',
      transactionType: 'Debited',
      accountNo: 'Purchase Entry From Reagent Nagar',
      debitAmount: 'Cash',
      creditAmount: '7457.5',
      balance: '0',
      remark: ''
    },
    {
      id: 5,
      transactionDate: '30/07/2024',
      transactionType: 'Credited',
      accountNo: 'Purchase Entry From Reagent Nagar',
      debitAmount: '',
      creditAmount: '9675',
      balance: '-9675',
      remark: ''
    },
    {
      id: 6,
      transactionDate: '22/08/2024',
      transactionType: 'Credited',
      accountNo: 'Purchase Entry From Reagent Nagar',
      debitAmount: '',
      creditAmount: '5165',
      balance: '-14840',
      remark: ''
    }
  ]);

  const handleEdit = (id) => {
    console.log('Edit supplier:', id);
    // Add your edit logic here
  };

  const handleDelete = (id) => {
    console.log('Delete supplier:', id);
    // Add your delete logic here
  };

  const handleDownloadCSV = () => {
    console.log('Download CSV');
  };

  const handleUploadCSV = () => {
    console.log('Upload CSV');
  };

  const handleSupplierClick = (supplier) => {
    setSelectedSupplier(supplier);
  };

  const handleBackToList = () => {
    setSelectedSupplier(null);
  };

  // Supplier List View
  if (!selectedSupplier) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Supplier List</h1>
            
            {/* Action Buttons */}
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2">
                  <FaFileExcel className="text-white" />
                  Excel
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-2">
                  <FaFilePdf className="text-white" />
                  PDF
                </button>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={handleDownloadCSV}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <FaDownload className="text-white" />
                  Download csv format
                </button>
                <button 
                  onClick={handleUploadCSV}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <FaUpload className="text-white" />
                  Upload CSV File
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Supplier Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    GST No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {suppliers.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleSupplierClick(supplier)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                      >
                        {supplier.name}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{supplier.contactNo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{supplier.gstNo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(supplier.id)}
                          className="text-blue-600 hover:text-blue-900 transition-colors text-lg"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(supplier.id)}
                          className="text-red-600 hover:text-red-900 transition-colors text-lg"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {suppliers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No suppliers found</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Ledger Details View
  return (
 <div className="min-h-screen bg-gray-50 p-4">
  <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100">
    {/* Header */}
    <div className="px-6 py-5 border-b border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBackToList}
            className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2 font-medium text-sm"
          >
            <FaArrowLeft className="text-xs" />
            Back to Suppliers
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Ledger Details</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-green-50 text-green-700 border border-green-200 rounded-md hover:bg-green-100 transition text-xs font-medium flex items-center gap-2">
              <FaFileExcel />
              Export Excel
            </button>
            <button className="px-3 py-2 bg-red-50 text-red-700 border border-red-200 rounded-md hover:bg-red-100 transition text-xs font-medium flex items-center gap-2">
              <FaFilePdf />
              Export PDF
            </button>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search transactions..."
              className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
            />
          </div>
        </div>
      </div>
    </div>

    {/* Ledger Table */}
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              #
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              Type
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              Account / Remark
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              Debit
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              Credit
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              Balance
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {ledgerData.map((transaction) => (
            <tr
              key={transaction.id}
              className="hover:bg-blue-50 transition-colors"
            >
              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                {transaction.id}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {transaction.transactionDate}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    transaction.transactionType === "Credited"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {transaction.transactionType}
                </span>
              </td>
              <td className="px-4 py-3 text-sm">
                <div className="text-gray-900">{transaction.accountNo}</div>
                {transaction.remark && (
                  <div className="text-xs text-gray-500 mt-1">
                    {transaction.remark}
                  </div>
                )}
              </td>
              <td className="px-4 py-3 text-sm text-right font-medium text-red-600">
                {transaction.debitAmount || "-"}
              </td>
              <td className="px-4 py-3 text-sm text-right font-medium text-green-600">
                {transaction.creditAmount || "-"}
              </td>
              <td className="px-4 py-3 text-sm text-right font-bold">
                <span className={transaction.balance.startsWith("-") ? "text-red-600" : "text-green-600"}>
                  {transaction.balance}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Empty State */}
    {ledgerData.length === 0 && (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-2">
          <FaFileInvoice className="mx-auto text-4xl" />
        </div>
        <p className="text-gray-500">No ledger transactions found</p>
      </div>
    )}
  </div>
</div>
  );
};

export default SupplierList;