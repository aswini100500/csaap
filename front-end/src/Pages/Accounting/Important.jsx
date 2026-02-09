import React from "react";

const Important = () => {
  return (
    <div className="w-full bg-white py-12 space-y-8">
        <h1 className="text-4xl text-white font-bold text-center bg-blue-700 p-6">Why is Accounting Software important for your business?</h1>
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center md:gap-8">
        {/* Image Left */}
        <div className="md:w-1/2 w-full flex justify-center md:justify-end mb-8 md:mb-0">
          <div className="relative">
            {/* Accent Shadow Layer */}
            <div className="absolute -bottom-3 -left-3 w-full h-full bg-blue-500 rounded-xl"></div>
            {/* Illustration Image - update src as needed */}
            <img
              src="https://margcompusoft.com/images/accounting-v1.png"
              alt="Automating Tasks"
              className="relative z-10 border border-blue-200 w-80 h-auto rounded-xl shadow-xl bg-white"
            />
          </div>
        </div>

        {/* Content Right */}
        <div className="md:w-1/2 w-full">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-600">Automating Tasks</h2>
          <ul className="space-y-5 text-gray-800 text-lg">
            <li className="flex items-start">
              <span className="w-4 h-2 rounded-full bg-blue-500 mt-2 mr-4"></span>
              Eliminates manual data entry errors by automating repetitive processes for consistent accuracy.
            </li>
            <li className="flex items-start">
              <span className="w-4 h-2 rounded-full bg-blue-500 mt-2 mr-4"></span>
              Saves time by entering information once and retrieving it instantly whenever required.
            </li>
            <li className="flex items-start">
              <span className="w-4 h-2 rounded-full bg-blue-500 mt-2 mr-4"></span>
              Boosts team productivity through streamlined workflows and reduced administrative workload.
            </li>
            <li className="flex items-start">
              <span className="w-4 h-2 rounded-full bg-blue-500 mt-2 mr-4"></span>
              Enhances focus on strategic tasks by minimising time spent on mundane activities.
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row-reverse items-center md:gap-8">
        {/* Image Right */}
        <div className="md:w-1/2 w-full flex justify-center md:justify-start mb-8 md:mb-0">
          <div className="relative">
            {/* Accent Shadow Layer */}
            <div className="absolute -bottom-3 -right-3 w-full h-full bg-blue-600 rounded-xl"></div>
            {/* Illustration Image - update src as needed */}
            <img
              src="https://margcompusoft.com/images/accounting-v5.png"
              alt="Automating Tasks"
              className="relative z-10 border w-80 h-auto border-blue-200 rounded-xl shadow-xl bg-white"
            />
          </div>
        </div>

        {/* Content Left */}
        <div className="md:w-1/2 w-full">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-600">Automating Tasks</h2>
          <ul className="space-y-5 text-gray-800 text-lg">
            <li className="flex items-start">
              <span className="w-4 h-2 rounded-full bg-blue-500 mt-2 mr-4"></span>
              Eliminates manual data entry errors by automating repetitive processes for consistent accuracy.
            </li>
            <li className="flex items-start">
              <span className="w-4 h-2 rounded-full bg-blue-500 mt-2 mr-4"></span>
              Saves time by entering information once and retrieving it instantly whenever required.
            </li>
            <li className="flex items-start">
              <span className="w-4 h-2 rounded-full bg-blue-500 mt-2 mr-4"></span>
              Boosts team productivity through streamlined workflows and reduced administrative workload.
            </li>
            <li className="flex items-start">
              <span className="w-4 h-2 rounded-full bg-blue-500 mt-2 mr-4"></span>
              Enhances focus on strategic tasks by minimising time spent on mundane activities.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Important;
