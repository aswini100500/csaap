

import React from "react";
import { motion } from "framer-motion";
import {
  FaBarcode,
  FaUser,
  FaWarehouse,
  FaMoneyCheckAlt,
  FaTruck,
  FaFileImport,
} from "react-icons/fa";

const features = [
  {
    title: "Barcode & Fast Billing",
    desc: "Unmatched Billing speed by Barcode scanning & defining shortcuts using intelligent search options like category, brand name etc.",
    icon: <FaBarcode size={40} />,
  },
  {
    title: "Customer Profile Management",
    desc: "Enables to manage and keep a detailed record of customer information i.e. Name, Address, Date of Birth etc.",
    icon: <FaUser size={40} />,
  },
  {
    title: "Inventory Management",
    desc: "Manage inventory levels, set reorder points to replenish stock and save losses due to expiry.",
    icon: <FaWarehouse size={40} />,
  },
  {
    title: "Multimode Payment Mode",
    desc: "Accept payment in multiple modes like Cash, Cheques, Debit/Credit card, Wallets etc.",
    icon: <FaMoneyCheckAlt size={40} />,
  },
  {
    title: "Cashier & Home Delivery",
    desc: "Automatic Cash Management, connect Cash Drawer with software, complete control over delivery system.",
    icon: <FaTruck size={40} />,
  },
  {
    title: "Import Purchase (Online/Offline)",
    desc: "Import purchase from excel/CSV format to save time with 100% accuracy.",
    icon: <FaFileImport size={40} />,
  },
];

const InvoiceFeatures = () => {
  return (
    <div className="bg-white py-16 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Features <span className="text-teal-700">at Glance</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-2xl shadow-lg p-8 text-center cursor-pointer h-80 flex flex-col justify-center items-center group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hover overlay sliding LEFT -> RIGHT */}
            <div className="absolute inset-0 bg-blue-700 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>

            {/* Static content */}
            <div className="mb-6 z-10 transition-colors duration-300 group-hover:text-white text-blue-700">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 z-10 transition-colors duration-300 group-hover:text-white text-gray-800">
              {feature.title}
            </h3>
            <p className="z-10 transition-colors duration-300 group-hover:text-white text-gray-600">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceFeatures;

