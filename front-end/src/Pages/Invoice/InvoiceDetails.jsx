import React from "react";

const InvoiceDetails = () => {
  return (
    <div className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-6 space-y-20">
        
        {/* Row 1: Text Left - Image Right */}
        <div className="flex flex-col md:flex-row items-center md:gap-12">
          {/* Text */}
          <div className="md:w-1/2 w-full">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="text-gray-900">Basic </span>
              <span className="text-teal-600">of GST</span>
            </h3>
            <p className="text-gray-700 mb-6">
              GST (Goods and Services Tax) as the name suggests is a Single,
              Comprehensive Indirect Tax levy on manufacture, sale and
              consumption of goods and services at a National level.
            </p>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-md shadow-md transition">
              Read More
            </button>
          </div>

          {/* Image */}
          <div className="md:w-1/2 w-full flex justify-center mt-8 md:mt-0">
            <img
              src="https://margcompusoft.com/images/gstwp-v3.svg"
              alt="Basic of GST"
              className="w-80 h-auto"
            />
          </div>
        </div>

        {/* Row 2: Image Left - Text Right */}
        <div className="flex flex-col md:flex-row-reverse items-center md:gap-12">
          {/* Text */}
          <div className="md:w-1/2 w-full">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="text-gray-900">GST </span>
              <span className="text-teal-600">Registration</span>
            </h3>
            <p className="text-gray-700 mb-6">
              GST the biggest tax reformation came into existence on July 1,
              2017 and with that <span className="font-semibold text-teal-600">GST Registration</span> became an important aspect to
              identify taxpayers ensuring compliance in the economy.
            </p>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-md shadow-md transition">
              Read More
            </button>
          </div>

          {/* Image */}
          <div className="md:w-1/2 w-full flex justify-center mt-8 md:mt-0">
            <img
              src="https://margcompusoft.com/images/gstwp-v4.svg"
              alt="GST Registration"
              className="w-80 h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
