import React from "react";
import { FiMonitor, FiLayers, FiType, FiArrowRight } from "react-icons/fi";

const Core = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      {/* First Section - Image on right */}
      <div className="max-w-6xl mx-auto mb-20">
        <div className="flex flex-col md:flex-row items-center">
          {/* Content Section */}
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Activity Monitoring
            </h1>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Monitor and analyze how employees work through user activity
              tracking.
            </p>

            <div className="space-y-6 mb-10">
              {/* Screen Monitoring */}
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mr-4 mt-1">
                  <FiMonitor className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    Screen Monitoring:
                  </h3>
                  <p className="text-gray-700">
                    Capture continuous or triggered screenshots that provide
                    context for employee computer activity while maintaining
                    efficient storage use.
                  </p>
                </div>
              </div>

              {/* Application Usage */}
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-lg mr-4 mt-1">
                  <FiLayers className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    Application Usage:
                  </h3>
                  <p className="text-gray-700">
                    Track which apps employees use, for how long, and identify
                    unauthorized software that could pose security risks to your
                    work environment.
                  </p>
                </div>
              </div>

              {/* Keystroke Logging */}
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-lg mr-4 mt-1">
                  <FiType className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    Keystroke Logging:
                  </h3>
                  <p className="text-gray-700">
                    Monitor keyboard input in sensitive applications to protect
                    against data exfiltration and strengthen data security.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="rounded-2xl p-2">
              <img
                src="public/Fe1.png"
                alt="Activity Monitoring Dashboard"
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Second Section - Image on left */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row-reverse items-center">
          {/* Content Section */}
          <div className="md:w-1/2 md:pl-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Privacy-Focused Monitoring
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Balance effective oversight with employee trust through
              responsible employee monitoring tools.
            </p>

            <div className="space-y-6 mb-10">
              {/* Productivity Reports */}
              <div className="flex items-start">
                <div className="bg-red-100 p-2 rounded-lg mr-4 mt-1">
                  <FiMonitor className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    Transparent Policies:
                  </h3>
                  <p className="text-gray-700">
                    Create clear monitoring guidelines for remote employees and
                    freelancers that build trust through open communication.
                  </p>
                </div>
              </div>

              {/* Customizable Dashboards */}
              <div className="flex items-start">
                <div className="bg-amber-100 p-2 rounded-lg mr-4 mt-1">
                  <FiLayers className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    Selective Monitoring:
                  </h3>
                  <p className="text-gray-700">
                    Target only work-relevant activities during work hours
                    rather than implementing blanket surveillance of personal
                    time.
                  </p>
                </div>
              </div>

              {/* Data Export */}
              <div className="flex items-start">
                <div className="bg-indigo-100 p-2 rounded-lg mr-4 mt-1">
                  <FiType className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    Data Minimization
                  </h3>
                  <p className="text-gray-700">
                    Teramind collects only necessary information with
                    appropriate retention periods to respect employee privacy
                    while meeting business
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="rounded-2xl p-2 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Advanced Reporting Dashboard"
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

       {/* First Section - Image on right */}
      <div className="max-w-6xl mx-auto mb-20">
        <div className="flex flex-col md:flex-row items-center">
          {/* Content Section */}
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-4xl font-bold text-gray-900">
              Activity Monitoring
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Monitor and analyze how employees work through user activity
              tracking.
            </p>

            <div className="space-y-6 mb-10">
              {/* Screen Monitoring */}
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mr-4 mt-1">
                  <FiMonitor className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg ">
                    Screen Monitoring:
                  </h3>
                  <p className="text-gray-700">
                    Capture continuous or triggered screenshots that provide
                    context for employee computer activity while maintaining
                    efficient storage use.
                  </p>
                </div>
              </div>

              {/* Application Usage */}
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-lg mr-4 mt-1">
                  <FiLayers className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    Application Usage:
                  </h3>
                  <p className="text-gray-700">
                    Track which apps employees use, for how long, and identify
                    unauthorized software that could pose security risks to your
                    work environment.
                  </p>
                </div>
              </div>

              {/* Keystroke Logging */}
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-lg mr-4 mt-1">
                  <FiType className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    Keystroke Logging:
                  </h3>
                  <p className="text-gray-700">
                    Monitor keyboard input in sensitive applications to protect
                    against data exfiltration and strengthen data security.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="rounded-2xl p-2 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Activity Monitoring Dashboard"
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

       {/* Second Section - Image on left */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row-reverse items-center">
          {/* Content Section */}
          <div className="md:w-1/2 md:pl-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Privacy-Focused Monitoring
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Balance effective oversight with employee trust through
              responsible employee monitoring tools.
            </p>

            <div className="space-y-6 mb-10">
              {/* Productivity Reports */}
              <div className="flex items-start">
                <div className="bg-red-100 p-2 rounded-lg mr-4 mt-1">
                  <FiMonitor className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    Transparent Policies:
                  </h3>
                  <p className="text-gray-700">
                    Create clear monitoring guidelines for remote employees and
                    freelancers that build trust through open communication.
                  </p>
                </div>
              </div>

              {/* Customizable Dashboards */}
              <div className="flex items-start">
                <div className="bg-amber-100 p-2 rounded-lg mr-4 mt-1">
                  <FiLayers className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    Selective Monitoring:
                  </h3>
                  <p className="text-gray-700">
                    Target only work-relevant activities during work hours
                    rather than implementing blanket surveillance of personal
                    time.
                  </p>
                </div>
              </div>

              {/* Data Export */}
              <div className="flex items-start">
                <div className="bg-indigo-100 p-2 rounded-lg mr-4 mt-1">
                  <FiType className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    Data Minimization
                  </h3>
                  <p className="text-gray-700">
                    Teramind collects only necessary information with
                    appropriate retention periods to respect employee privacy
                    while meeting business
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="rounded-2xl p-2 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Advanced Reporting Dashboard"
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Core;
