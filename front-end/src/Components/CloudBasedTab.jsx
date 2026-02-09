import React, { useState } from 'react';

const CloudBasedTab = () => {
  const [activeTab, setActiveTab] = useState('nav-home');

  // Image URLs for better maintainability
  const imageUrls = {
    retail: {
      main: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      blurred: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    distribution: {
      main: "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      blurred: "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    service: {
      main: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
      blurred: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
    }
  };

  return (
    <section id="cloudbased-tab" className="cloudbased-tab section bg-white text-black py-16">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Power Your Business with <span className="text-blue-400"> Cloud-Based Billing</span> and Accounting Software
          </h1>
          <p className="text-black text-center max-w-4xl mb-10">
            Csaap Erp online Billing & Accounting Software is a solution to streamline the billing process that handles
            a business's financial accounts. The major motive of this software is to help all sizes of businesses with
            an easy billing and bookkeeping approach. Further, by using this online billing software, businesses save
            time, as well as lower costs by eliminating paper and printing use, helping avoid human errors and ensuring
            accuracy along with efficiency. Its robust features allow business owners to spread their business reach
            smoothly and enhance sales and revenues.
          </p>

          <div className="w-full lg:w-8/12">
            <nav className="mt-4">
              <div className="flex flex-wrap justify-center border-b border-white mb-6">
                <button
                  className={`px-4 py-2 font-semibold mx-1 mb-2 transition-all duration-300 ${activeTab === 'nav-home' ? 'bg-orange-500 text-white rounded-2xl shadow-lg shadow-orange-200' : 'text-black bg-white hover:bg-gray-100 rounded-2xl'}`}
                  onClick={() => setActiveTab('nav-home')}
                >
                  Retail & POS
                </button>
                <button
                  className={`px-4 py-2 font-semibold mx-1 mb-2 transition-all duration-300 ${activeTab === 'nav-profile' ? 'bg-orange-500 text-white rounded-2xl shadow-lg shadow-orange-200' : 'text-black bg-white hover:bg-gray-100 rounded-2xl'}`}
                  onClick={() => setActiveTab('nav-profile')}
                >
                  Distribution
                </button>
                <button
                  className={`px-4 py-2 font-semibold mx-1 mb-2 transition-all duration-300 ${activeTab === 'nav-contact' ? 'bg-orange-500 text-white rounded-2xl shadow-lg shadow-orange-200' : 'text-black bg-white hover:bg-gray-100 rounded-2xl'}`}
                  onClick={() => setActiveTab('nav-contact')}
                >
                  Service Providers
                </button>
              </div>
            </nav>
          </div>

          <div className="w-full mt-8">
            {activeTab === 'nav-home' && (
              <div className="flex flex-col md:flex-row items-center gap-8 animate-fadeIn">
                <div className="w-full md:w-1/2">
                  <h1 className="text-2xl md:text-3xl font-bold mb-4">Retail & POS</h1>
                  <p className="text-black mb-6">
                    Designed to manage all your retail operations in a centralized system. From purchasing to
                    inventory management to selling, stay on top of everything & increase your sales by
                    attracting more customers to your retail counters
                    with rapid check-outs, easy return & exchange, multiple billing counters, diverse payment
                    options, etc.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>FMCG/ Grocery</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 007.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 004.902-5.652l-1.3-1.299a1.875 1.875 0 00-1.325-.549H5.223z" />
                          <path fillRule="evenodd" d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 009.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 002.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3zm3-6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3zm8.25-.75a.75.75 0 00-.75.75v5.25a.75.75 0 001.5 0V14.25a.75.75 0 00-.75-.75z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>Superstores</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M16.5 7.5h-9v9h9v-9z" />
                          <path fillRule="evenodd" d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>Smart Home Electronics</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>Jewellery</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 text-pink-500 mt-0.5 mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875  0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>Garments & other retail shops</span>
                    </li>
                  </ul>
                </div>
                <div className="w-full md:w-1/2 flex justify-center relative">
                  {/* Blurred background image */}
                  <img 
                    src={imageUrls.retail.blurred} 
                    alt="Retail & POS blurred background" 
                    className="rounded-lg w-full max-w-md absolute top-2 left-2 filter blur-lg opacity-70 z-0"
                  />
                  {/* Main image */}
                  <img 
                    src={imageUrls.retail.main} 
                    alt="Retail & POS" 
                    className="rounded-lg shadow-lg w-full max-w-md transform transition-all duration-700 hover:rotate-6 hover:scale-105 relative z-10"
                  />
                </div>
              </div>
            )}

            {activeTab === 'nav-profile' && (
              <div className="flex flex-col md:flex-row items-center gap-8 animate-fadeIn">
                <div className="w-full md:w-1/2">
                  <h1 className="text-2xl md:text-3xl font-bold mb-4">Distribution</h1>
                  <p className="text-black mb-6">
                    A complete business management solution to increase your revenues. Do effortless stock
                    management, accounting & more with uninterrupted VAT billing,
                    return filing, and e-invoicing. Manage multiple warehouses & godowns. Increase your sales with a
                    personalized customer-centric approach.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
                          <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
                          <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                        </svg>
                      </div>
                      <span>Distributors</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75h12v-.75c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15.75h-12v-2.625c0-1.036.84-1.875 1.875-1.875h.375a3 3 0 116 0h3a.75.75 0 01.75.75v3.75z" />
                          <path d="M8.25 11.25a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                          <path d="M19.5 15.75V18a.75.75 0 01-.75.75h-2.25a.75.75 0 01-.75-.75v-2.25a.75.75 0 01.75-.75h2.25a.75.75 0 01.75.75z" />
                          <path d="M20.954 11.025c.075-.337.075-.7 0-1.037a6.345 6.345 0 000-2.638 1.086 1.086 0 00-.799-.799 6.345 6.345 0 00-2.638 0 1.086 1.086 0 00-.799.799 6.344 6.344 0 000 2.638c.074.337.074.7 0 1.037a6.345 6.345 0 000 2.637 1.086 1.086 0 00.799.8 6.345 6.345 0 002.638 0 1.086 1.086 0 00.799-.8 6.345 6.345 0 000-2.636zM16.5 14.625a2.625 2.625 0 110-5.25 2.625 2.625 0 010 5.25z" />
                        </svg>
                      </div>
                      <span>Stockists</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75h12v-.75c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 12.75H1.5v-2.625c0-1.036.84-1.875 1.875-1.875h.375a3 3 0 116 0h3a.75.75 0 01.75.75v3.75z" />
                          <path d="M8.25 8.25a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                          <path d="M15.75 12.75a3 3 0 10-6 0 3 3 0 006 0z" />
                          <path d="M20.25 12.75a.75.75 0 10-1.5 0 .75.75 0 001.5 0z" />
                          <path d="M20.25 15.75a.75.75 0 10-1.5 0 .75.75 0 001.5 0z" />
                          <path d="M20.25 18.75a.75.75 0 10-1.5 0 .75.75 0 001.5 0z" />
                        </svg>
                      </div>
                      <span>Wholesalers</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
                        </svg>
                      </div>
                      <span>Traders</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 text-pink-500 mt-0.5 mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M4.5 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5h-.75V3.75a.75.75 0 000-1.5h-15zM9 6a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm-.75 3.75A.75.75 0 019 9h1.5a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM9 12a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm3.75-5.25A.75.75 0 0113.5 6H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM13.5 9a.75.75 0 000 1.5H15A.75.75 0 0015 9h-1.5zm-.75 3.75a.75.75 0 01.75-.75H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM13.5 15a.75.75 0 000 1.5H15a.75.75 0 000-1.5h-1.5z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>SMEs</span>
                    </li>
                  </ul>
                </div>
                <div className="w-full md:w-1/2 flex justify-center relative">
                  {/* Blurred background image */}
                  <img 
                    src={imageUrls.distribution.blurred} 
                    alt="Distribution blurred background" 
                    className="rounded-lg w-full max-w-md absolute top-2 left-2 filter blur-lg opacity-70 z-0"
                  />
                  {/* Main image */}
                  <img 
                    src={imageUrls.distribution.main} 
                    alt="Distribution" 
                    className="rounded-lg shadow-lg w-full max-w-md transform transition-all duration-700 hover:scale-105 relative z-10"
                  />
                </div>
              </div>
            )}

            {activeTab === 'nav-contact' && (
              <div className="flex flex-col md:flex-row items-center gap-8 animate-fadeIn">
                <div className="w-full md:w-1/2">
                  <h1 className="text-2xl md:text-3xl font-bold mb-4">Service Providers</h1>
                  <p className="text-black mb-6">
                    Csaap Erp is a solution ideal for accounting professionals, bookkeepers, travel agents and
                    business owners to process accounting transactions and manage finances. It helps you simplify
                    the complex banking & accounting
                    processes for your clients, giving you time to focus on your business growth strategies.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>Chartered Accountants</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                          <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5  0 1-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                        </svg>
                      </div>
                      <span>Bookkeepers</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
                          <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>Finance and other Tax professionals</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                        </svg>
                      </div>
                      <span>Travel Agents</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 text-pink-500 mt-0.5 mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>Service Providers</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm-4.34 7.964a.75.75 0 01-1.061-1.06 5.236 5.236 0 013.73-1.538 5.236 5.236 0 013.695 1.538.75.75 0 11-1.061 1.06 3.736 3.736 0 00-2.639-1.098 3.736 3.736 0 00-2.664 1.098z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>Any business that raises VAT invoice</span>
                    </li>
                  </ul>
                </div>
                <div className="w-full md:w-1/2 flex justify-center relative">
                  {/* Blurred background image */}
                  <img 
                    src={imageUrls.service.blurred} 
                    alt="Service Providers blurred background" 
                    className="rounded-lg w-full max-w-md absolute top-2 left-2 filter blur-lg opacity-70 z-0"
                  />
                  {/* Main image */}
                  <img 
                    src={imageUrls.service.main} 
                    alt="Service Providers" 
                    className="rounded-lg shadow-lg w-full max-w-md transform transition-all duration-700 hover:scale-105 relative z-10"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style jsx="true">{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default CloudBasedTab;