import React from 'react';

const IndustryImg = () => {
  return (
    <section className="call-to-action relative dark-background overflow-hidden">
      <img 
        src="cta-bg.jpg" 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-9/12 text-center lg:text-left mb-8 lg:mb-0">
            <h2 className="text-light text-xl md:text-2xl font-medium mb-4">
              - Experience Accounting & Stock Management on the Go
            </h2>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              True Cloud-Based Accounting Solution for Every Business.
            </h1>
          </div>
          <div className="lg:w-3/12 text-center">
            <a 
              className="cta-btn inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300"
              href="#"
            >
              Contact Us Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryImg;