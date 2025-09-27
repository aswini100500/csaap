import React from 'react';

const RealEstate = () => {
  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* Text Content */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Cloud Based ERP Software for{' '}
              <span className="text-[#a52a2a]">Real Estate Industry</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our cloud-based ERP solution is specifically designed for the real estate sector, 
              providing comprehensive tools to manage properties, clients, transactions, and finances 
              all in one secure platform. Access your data anytime, anywhere, and streamline your 
              operations with our industry-specific features.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700 text-lg">Property and portfolio management</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700 text-lg">Automated accounting and financial reporting</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700 text-lg">Customer relationship management (CRM)</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700 text-lg">Document management and digital signing</span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#a52a2a] hover:bg-[#8a2323] text-white font-medium py-3 px-8 rounded-lg transition duration-300 shadow-md hover:shadow-lg">
                Learn More
              </button>
              <button className="border border-[#a52a2a] text-[#a52a2a] hover:bg-[#a52a2a] hover:text-white font-medium py-3 px-8 rounded-lg transition duration-300">
                Request Demo
              </button>
            </div>
          </div>
          
          {/* Image Content */}
          <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
            {/* Dashboard Card */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 mb-8">
              {/* Dashboard Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="text-gray-800 font-bold text-lg">RealEstateERP Dashboard</div>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                </div>
              </div>
              
              {/* Dashboard Content */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
                <div className="text-gray-700 font-medium text-sm mb-2">Properties Overview</div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-center border border-gray-100">
                    <div className="text-blue-600 font-bold text-xl">24</div>
                    <div className="text-gray-600 text-xs">For Sale</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center border border-gray-100">
                    <div className="text-green-600 font-bold text-xl">18</div>
                    <div className="text-gray-600 text-xs">Rented</div>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-3 text-center border border-gray-100">
                    <div className="text-amber-600 font-bold text-xl">7</div>
                    <div className="text-gray-600 text-xs">Vacant</div>
                  </div>
                </div>
              </div>
              
              {/* Charts/Graphs Section */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="text-gray-700 text-sm mb-2 font-medium">Revenue</div>
                  <div className="h-3 bg-gray-200 rounded-full">
                    <div className="h-3 bg-green-500 rounded-full w-3/4"></div>
                  </div>
                  <div className="text-gray-500 text-xs mt-2">75% of target</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="text-gray-700 text-sm mb-2 font-medium">Occupancy</div>
                  <div className="h-3 bg-gray-200 rounded-full">
                    <div className="h-3 bg-yellow-500 rounded-full w-2/3"></div>
                  </div>
                  <div className="text-gray-500 text-xs mt-2">67% occupied</div>
                </div>
              </div>
              
              {/* Property List */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="text-gray-700 font-medium text-sm mb-3">Recent Activities</div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                    <div className="text-gray-600 text-sm">New lease signed - Downtown Apt</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                    <div className="text-gray-600 text-sm">Maintenance scheduled - Oak Villa</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mr-3"></div>
                    <div className="text-gray-600 text-sm">Payment received - Riverfront Office</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center text-gray-500 text-sm p-2">
                Real-time property management dashboard
              </div>
            </div>
            
            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 text-center shadow">
                <div className="text-2xl font-bold text-[#a52a2a]">98%</div>
                <div className="text-sm text-gray-600 mt-1">Client Satisfaction</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow">
                <div className="text-2xl font-bold text-[#a52a2a]">45%</div>
                <div className="text-sm text-gray-600 mt-1">Faster Processes</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow">
                <div className="text-2xl font-bold text-[#a52a2a]">500+</div>
                <div className="text-sm text-gray-600 mt-1">Properties Managed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstate;