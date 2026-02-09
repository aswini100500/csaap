import { useState } from "react";

const Price = () => {
  const [selectedRegion, setSelectedRegion] = useState("india");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Simple & Affordable Pricing
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the plan that works best for your business needs
        </p>
      </div>

      {/* Region Selector */}
      <div className="flex justify-center mb-16">
        <div className="inline-flex rounded-xl border border-gray-200 overflow-hidden shadow-md bg-white">
          <button
            onClick={() => setSelectedRegion("india")}
            className={`px-8 py-4 text-base font-medium transition-all duration-200 ${
              selectedRegion === "india"
                ? "bg-blue-600 text-white shadow-inner"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className="block font-semibold">India & South Asia (₹)</span>
            <span className="text-sm font-normal mt-1 opacity-90">
              India, Pakistan, Bangladesh, Sri Lanka, Nepal, Bhutan, Maldives
            </span>
          </button>
          <button
            onClick={() => setSelectedRegion("other")}
            className={`px-8 py-4 text-base font-medium transition-all duration-200 ${
              selectedRegion === "other"
                ? "bg-blue-600 text-white shadow-inner"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className="block font-semibold">Other Countries ($)</span>
            <span className="text-sm font-normal mt-1 opacity-90">
              All other regions
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {selectedRegion === "india" ? (
          <>
            {/* Nano Edition */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="p-6 pb-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Marg ERP Nano
                  </h3>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Popular
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-gray-900">₹5,400/</span>
                  <span className="text-sm text-gray-500">year</span>
                </div>
                <div className="text-sm text-red-500 mb-6">18% GST Extra</div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>450 Bills/Month</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>₹50,000 Monthly Billing</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>₹6 per extra bill</span>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-md">
                  Book Demo
                </button>
              </div>
            </div>

            {/* Basic Edition */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="p-6 pb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Basic Edition
                </h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-gray-900">₹9,999/</span>
                  <span className="text-sm text-gray-500">year</span>
                </div>
                <div className="text-sm text-red-500 mb-6">18% GST Extra</div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>1 User Full Rights</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>₹3,000 per extra user</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Maximum 2 users</span>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-md">
                  Book Demo
                </button>
              </div>
            </div>

            {/* Silver Edition */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="p-6 pb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Silver Edition
                </h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-gray-900">₹13,500/</span>
                  <span className="text-sm text-gray-500">year</span>
                </div>
                <div className="text-sm text-red-500 mb-6">18% GST Extra</div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>1 User Full Rights</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>1 User View Only</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>₹3,000 per extra user</span>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-md">
                  Book Demo
                </button>
              </div>
            </div>

            {/* Gold Edition */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-center py-1">
                <span className="text-xs font-bold text-white uppercase">Premium</span>
              </div>
              <div className="p-6 pb-4 pt-7">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Gold Edition
                </h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-gray-900">₹25,200/</span>
                  <span className="text-sm text-gray-500">year</span>
                </div>
                <div className="text-sm text-red-500 mb-6">18% GST Extra</div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Unlimited Users</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Priority Support</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>All Features Included</span>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6">
                <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-md">
                  Book Demo
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Basic Edition for Other Countries */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="p-6 pb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Basic Edition
                </h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-gray-900">$350/</span>
                  <span className="text-sm text-gray-500">year</span>
                </div>
                <div className="text-sm text-gray-500 mb-6">(Limited Edition)</div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>1 User Full Rights</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 ml-6">
                    <span>$150 per extra user</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 ml-6">
                    <span>Maximum 2 users</span>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-md">
                  Book Demo
                </button>
              </div>
            </div>

            {/* Silver Edition for Other Countries */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="p-6 pb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Silver Edition
                </h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-gray-900">$600/</span>
                  <span className="text-sm text-gray-500">year</span>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>1 User Full Rights</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>1 User View Only</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 ml-6">
                    <span>$150 per extra user</span>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-md">
                  Book Demo
                </button>
              </div>
            </div>

            {/* Gold Edition for Other Countries */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-center py-1">
                <span className="text-xs font-bold text-white uppercase">Premium</span>
              </div>
              <div className="p-6 pb-4 pt-7">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Gold Edition
                </h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-gray-900">$1150/</span>
                  <span className="text-sm text-gray-500">year</span>
                </div>
                <div className="text-sm text-gray-500 mb-6">(Limited Edition)</div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Unlimited Users</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Priority Support</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>All Features Included</span>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6">
                <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-md">
                  Book Demo
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Price;