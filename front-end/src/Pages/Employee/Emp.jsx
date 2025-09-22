import React from "react";
import Choose from "./Choose";
import Core from "./Features/Core";
import Price from "./Price";
import FAQ from "./FAQ";

const Emp = () => {
  return (
    <div className="w-full">
      {/* Employee Monitoring Section */}
      <div
        className="w-full flex flex-col md:flex-row items-center justify-between py-16 px-6 md:px-16 lg:px-24"
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
       
        <div className="md:w-2/3 mb-12 md:mb-0 md:pr-12">
          <div className="max-w-lg">
            <div className="flex items-center mb-6">
             
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                Secure & Privacy-Focused{" "}
                <span className="text-white">Employee Monitoring</span>
              </h1>
            </div>

            <p className="text-white text-lg mb-8 leading-relaxed">
              Cloudsat #1 rated employee monitoring software helps
              organizations optimize productivity, protect sensitive data, and
              ensure compliance while maintaining employee privacy for both
              in-office and remote teams.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Track work time and productivity",
                "Protect sensitive company data",
                "Respect employee privacy",
                "Support for remote and in-office teams",
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-green-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-white font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium py-3 px-7 rounded-xl transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg">
                Request a Demo
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button className="border border-gray-300 hover:border-blue-500 bg-white text-gray-700 hover:text-blue-600 font-medium py-3 px-7 rounded-xl transition-all duration-300 shadow-sm hover:shadow">
                Learn More
              </button>
            </div>
          </div>
        </div>
        

        <div className="md:w-1/3 flex justify-center">
          <div className="relative">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-md transform transition-transform duration-300 hover:scale-[1.02]">
              <img
                src="/emp.webp"
                className="w-full h-auto rounded-xl"
                alt="Employee Monitoring Dashboard"
              />
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xs font-semibold px-3 py-2 rounded-full shadow-md">
                #1 Rated
              </div>
            </div>

           
          </div>
        </div>
      </div>

      {/* Business Impact Section */}
      <div className="bg-white py-20 px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Empowering Businesses, Enabling Better India Through IT
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            For over three decades, we've been at the forefront of business
            technology solutions, driving growth and innovation across
            industries.
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mt-8 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
          {[
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              ),
              value: "20 Billion*",
              label: "Invoices/Year",
              color: "blue",
            },
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
              value: "100 Billion$",
              label: "Transactions/Year",
              color: "green",
            },
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              ),
              value: "50%",
              label: "Pharma & FMCG",
              color: "purple",
            },
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              ),
              value: "1 Million*",
              label: "Businesses Served",
              color: "orange",
            },
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              ),
              value: "850*",
              label: "Support Centers",
              color: "red",
            },
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              ),
              value: "8500*",
              label: "Professionals",
              color: "indigo",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 text-center group hover:border-${item.color}-100 transform hover:-translate-y-1`}
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 bg-${item.color}-50 rounded-xl mb-3 group-hover:bg-${item.color}-100 transition-colors`}
              >
                {item.icon}
              </div>
              <div className={`text-2xl font-bold text-${item.color}-700 mb-1`}>
                {item.value}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Choose/>
      <Core/>
      <Price/>
      <FAQ/>
    </div>
    
  );
};

export default Emp;