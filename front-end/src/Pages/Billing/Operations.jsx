import React from "react";

const Operations = () => {
  return (
    <div className="w-full bg-white py-12">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How Can <span className="text-red-500">Marg Billing Software</span>{" "}
          Simplify Your Business Operations?
        </h2>

        <div className="space-y-12">
          {/* Row 1: Text Left - Image Right */}
          <div className="flex flex-col md:flex-row items-center md:gap-6">
            {/* Text */}
            <div className="md:w-1/2 w-full justify-end">
              <h3 className="font-bold text-xl mb-4">
                ERP-to-ERP Online Order
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3"></span>
                  Send orders directly from your system.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3"></span>
                  No need for calls or emails.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3"></span>
                  Supplier gets it in real-time.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3"></span>
                  Avoid errors in order details.
                </li>
              </ul>
            </div>

            {/* Image */}
            <div className="md:w-1/2 w-full flex justify-start">
              <div className="relative">
                <div className="absolute -bottom-2 -right-2 w-full h-full bg-red-500 rounded-lg"></div>
                <img
                  src="public/ERP.jpg"
                  alt="ERP to ERP Order"
                  className="relative z-10 border w-64 h-auto border-red-300 rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Image Left - Text Right */}
          <div className="flex flex-col md:flex-row-reverse items-center md:gap-28">
            {/* Text */}
            <div className="md:w-1/2 w-full">
              <h3 className="font-bold text-xl mb-4">Place Order Online</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3"></span>
                  No store visits needed.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3"></span>
                  Place orders at your convenience.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3"></span>
                  Track status on your screen.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3"></span>
                  Save time and stay stress-free.
                </li>
              </ul>
            </div>

            {/* Image */}
            <div className="md:w-1/2 w-full flex justify-center">
              <div className="relative">
                <div className="absolute -bottom-2 -left-2 w-full h-full bg-red-500 rounded-lg"></div>
                <img
                  src="public/Order.jpg"
                  alt="Place Order Online"
                  className="relative z-10 border w-72 h-auto border-red-300 rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:gap-6">
            {/* Text */}
            <div className="md:w-1/2 w-full">
              <h3 className="font-bold text-xl mb-4">
                ERP-to-ERP Online Order
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3"></span>
                  Send orders directly from your system.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3"></span>
                  No need for calls or emails.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3"></span>
                  Supplier gets it in real-time.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3"></span>
                  Avoid errors in order details.
                </li>
              </ul>
            </div>

            {/* Image */}
            <div className="md:w-1/2 w-full flex justify-start">
              <div className="relative">
                <div className="absolute -bottom-2 -right-2 w-full h-full bg-red-500 rounded-lg"></div>
                <img
                  src="public/ERP.jpg"
                  alt="ERP to ERP Order"
                  className="relative z-10 border w-64 h-auto border-red-300 rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operations;
