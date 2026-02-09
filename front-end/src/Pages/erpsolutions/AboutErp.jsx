import React, { useState } from "react";
import {
  FaFileInvoice,
  FaShoppingCart,
  FaTags,
  FaPrint,
  FaCogs,
  FaChartBar,
  FaArrowRight,
} from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const features = [
  { id: 1, title: "Billing Features", icon: <FaFileInvoice /> },
  { id: 2, title: "Purchase Features", icon: <FaShoppingCart /> },
  { id: 3, title: "Discount & Schemes", icon: <FaTags /> },
  { id: 4, title: "Document Printing", icon: <FaPrint /> },
  { id: 5, title: "Fully User-Configurable Invoicing", icon: <FaCogs /> },
  { id: 6, title: "MIS Reports", icon: <FaChartBar /> },
];

const AboutErp = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-blue-50 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10 px-6">
        {/* Left Side Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://margcompusoft.com/images/gstwp-knowmarg.svg"
            alt="ERP Illustration"
            className="w-80 md:w-[400px] h-auto"
          />
        </div>

        {/* Right Side Accordion */}
        <div className="md:w-1/2 w-full">
          <h2 className="text-xl md:text-xl font-bold text-teal-600 mb-6">
            Know more about Csaap® ERP
          </h2>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="bg-white shadow rounded-md overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-base text-gray-700 hover:bg-gray-50"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-teal-600">{feature.icon}</span>
                    {feature.title}
                  </span>
                  <span
                    className={`transform transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  >
                 <MdKeyboardDoubleArrowRight />
                  </span>
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-4 text-gray-600 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Detailed description of {feature.title} goes here...
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* See More Button */}
          <div className="mt-6 flex justify-end">
            <a
              href="#"
              className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-md text-sm hover:bg-teal-700 transition-colors"
            >
              <FaArrowRight /> See More...
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutErp;
