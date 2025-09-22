import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMonitor,
  FiTrendingUp,
  FiShield,
  FiChevronRight,
  FiArrowRight,
} from "react-icons/fi";

const Choose = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      title: "Real-Time Monitoring",
      description:
        "Track employee activity and computer usage across Windows and Mac devices with minimal performance impact. Our user-friendly monitoring tools provide real-time insights into employee behavior, including screenshots, screen recordings, keystrokes, and app usage, allowing managers to make informed decisions.",
      icon: <FiMonitor className="h-8 w-8" />,
      color: "blue",
    },
    {
      title: "Productivity Optimization",
      description:
        "Improve workplace efficiency with employee productivity tracking that identifies bottlenecks and streamlines workflows. Teramind helps measure productivity levels, recognize top performers, and implement targeted coaching through detailed reports on work hours, idle time, and active time.",
      icon: <FiTrendingUp className="h-8 w-8" />,
      color: "green",
    },
    {
      title: "Risk Mitigation",
      description:
        "Protect your organization from insider threats and data breaches with behavior analytics. Our employee monitoring system detects suspicious activities, unauthorized access to sensitive data, and potential security issues before they escalate.",
      icon: <FiShield className="h-8 w-8" />,
      color: "purple",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const cardHoverVariants = {
    rest: {
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: {
      scale: 1.03,
      y: -10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17,
      },
    },
  };

  const iconVariants = {
    rest: {
      rotate: 0,
      scale: 1,
      transition: { duration: 0.3 },
    },
    hover: {
      rotate: [0, -5, 0],
      scale: 1.15,
      transition: {
        duration: 0.5,
        rotate: { duration: 0.5, ease: "easeInOut" },
      },
    },
  };

  const titleVariants = {
    rest: { x: 0 },
    hover: { x: 5 },
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-blue-600">CSAAP</span> for
            Employee Monitoring
          </h1>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Advanced employee monitoring solutions designed to enhance
            productivity, ensure security, and provide valuable insights.
          </motion.p>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => {
            const colorClass = `text-${feature.color}-600`;
            const bgColorClass = `bg-${feature.color}-100`;

            return (
              <motion.div
                key={index}
                className="relative"
                variants={itemVariants}
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
              >
                <motion.div
                  className={`bg-white rounded-2xl p-8 shadow-lg h-full flex flex-col relative overflow-hidden ${
                    hoveredFeature === index ? "shadow-xl" : ""
                  }`}
                  variants={cardHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  {/* Animated background element */}
                  <motion.div
                    className={`absolute top-0 left-0 w-full h-1 ${bgColorClass}`}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Icon container */}
                  <motion.div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${bgColorClass} ${colorClass} mb-6`}
                    variants={iconVariants}
                  >
                    {feature.icon}
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="text-2xl font-bold text-gray-900 mb-4 flex items-center"
                    variants={titleVariants}
                  >
                    {feature.title}
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: hoveredFeature === index ? 1 : 0,
                        x: hoveredFeature === index ? 0 : -10,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiChevronRight className={`ml-2 mt-2 ${colorClass}`} />
                    </motion.span>
                  </motion.h3>

                  {/* Description */}
                  <motion.p className="text-gray-600 leading-relaxed flex-grow">
                    {feature.description}
                  </motion.p>

                  {/* Learn more link */}
                  <motion.div
                    className="mt-6 flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredFeature === index ? 1 : 0.7 }}
                  >
                    <span className={`font-medium ${colorClass}`}>
                      Learn more
                    </span>
                    <motion.span
                      animate={{ x: hoveredFeature === index ? 5 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiArrowRight className={`ml-2 ${colorClass}`} />
                    </motion.span>
                  </motion.div>

                  {/* Floating elements */}
                  <AnimatePresence>
                    {hoveredFeature === index && (
                      <>
                        <motion.div
                          className={`absolute -top-4 -right-4 w-20 h-20 rounded-full ${bgColorClass} opacity-30`}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 0.3 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        />
                        <motion.div
                          className={`absolute -bottom-4 -left-4 w-16 h-16 rounded-full ${bgColorClass} opacity-20`}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 0.2 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        />
                      </>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Choose;
