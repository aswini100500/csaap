import React from "react";
import { motion } from "framer-motion";
import { FaBarcode, FaUser, FaWarehouse, FaMoneyCheckAlt, FaTruck, FaFileImport } from "react-icons/fa";

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

const Basic = () => {
  return (
    <div className="bg-white py-16 px-6">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">
        Features <span className="text-teal-700">at Glance</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-2xl shadow-lg p-8 text-center cursor-pointer h-80 flex flex-col justify-center items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Static content - always visible */}
            <div className="mb-6 text-teal-700 z-10">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 z-10">
              {feature.title}
            </h3>
            <p className="text-gray-600 z-10">
              {feature.desc}
            </p>
            
            {/* Animated blue overlay that slides up from bottom on hover */}
            <motion.div
              className="absolute inset-0 bg-blue-600 z-0"
              initial={{ y: "100%" }}
              whileHover={{ y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            
            {/* White text that appears on hover */}
            <motion.div 
              className="absolute inset-0 flex flex-col justify-center bg-blue-800 items-center p-8 z-10 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <div className="mb-6 text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-white">
                {feature.desc}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Basic;