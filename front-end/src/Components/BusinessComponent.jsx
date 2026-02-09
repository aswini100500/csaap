import React from 'react';

const BusinessComponent = () => {
  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Column - Content */}
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#343ead] mb-4">
              Simplifying Business
            </h2>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Your entire books in your pocket.
            </h1>
            <p className="text-gray-600 text-base mb-8 leading-relaxed">
              Margbook's mobile app revolutionizes accounting for businesses. It offers seamless invoicing and
              reporting on the go, enhancing efficiency, and productivity and minimizing the usage of papers & printing
              saving you time and cutting costs. Enhances accuracy by eliminating manual work. The online billing
              software digitalizes the entire process of billing & accounting.
            </p>
            
            {/* Search/Mobile Input Section */}
            <div className="search bg-white rounded-2xl p-1 shadow-custom mb-6 w-full max-w-md">
              <div className="search-2 relative border rounded-2xl flex">
                <input 
                  type="text" 
                  placeholder="Mobile number" 
                  className="h-12 w-full pl-5 pr-28 bg-transparent focus:outline-none"
                />
                <button className="absolute right-1 top-1 h-10 bg-[#f6731a] text-white w-24 rounded-xl shadow-orange transition-colors hover:bg-orange-600">
                  Get a Call
                </button>
              </div>
            </div>
            
          </div>
          
          {/* Right Column - Mobile Devices */}
          <div>
            <img src="accounting.png" alt="" />
          </div>
        </div>

      
        
      </div>
    </section>
  );
};

export default BusinessComponent;