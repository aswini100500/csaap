import React, { useState } from "react";

const Inventoryprice = () => {
  const [regionTab, setRegionTab] = useState("in"); // default tab is India

  // Example pricing plans for each region
  const plansIn = [
    {
      title: "Basic Plan",
      price: "₹999/mo",
      notes: "For small shops & startups",
      conditions: ["1 User License", "Basic Support", "Core Features"],
    },
    {
      title: "Standard Plan",
      price: "₹1,999/mo",
      notes: "For growing businesses",
      conditions: ["5 User Licenses", "Priority Support", "Advanced Features"],
    },
    {
      title: "Premium Plan",
      price: "₹2,999/mo",
      notes: "For enterprises",
      conditions: ["Unlimited Users", "24/7 Support", "All Features"],
    },
  ];

  const plansOther = [
    {
      title: "Starter",
      price: "$20/mo",
      notes: "Best for freelancers",
      conditions: ["1 User", "Email Support", "Basic Features"],
    },
    {
      title: "Professional",
      price: "$49/mo",
      notes: "For SMEs",
      conditions: ["5 Users", "Priority Support", "Advanced Features"],
    },
    {
      title: "Enterprise",
      price: "$99/mo",
      notes: "For global teams",
      conditions: ["Unlimited Users", "Dedicated Support", "Custom Features"],
    },
  ];

  const plans = regionTab === "in" ? plansIn : plansOther;

  return (
    <div className="w-full">
      {/* Top Section */}
      <div className="w-full bg-[#00695C] py-7 px-6 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-white leading-snug mb-4">
          What Makes Marg ERP India’s Top{" "}
          <span className="text-yellow-400">Inventory Management Software?</span>
        </h2>
        <p className="text-gray-200 max-w-3xl mx-auto text-sm md:text-base mb-8">
          Good inventory management software helps you reduce mistakes and grow
          faster. Marg ERP gives you all the right tools to stay ahead—whether you
          run a small shop or multiple warehouses.
        </p>
        <button className="px-6 py-2 border-2 border-white text-white rounded-full hover:bg-white hover:text-teal-700 transition">
          READ MORE
        </button>
      </div>

      {/* Pricing Section */}
      <div className="bg-[#eaf3fa] flex flex-col items-center px-2">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center mt-4">
          Simple &amp; Affordable <span className="text-teal-500">Pricing</span>
        </h2>

        {/* Tabs */}
        <div className="flex items-center mt-6">
          {/* India tab */}
          <button
            className={`px-3 py-2 rounded-t-xl font-medium border-2 border-b-0 transition-all duration-150
              ${
                regionTab === "in"
                  ? "bg-white border-teal-400 text-teal-600 shadow-lg z-10"
                  : "bg-[#eaf3fa] border-transparent text-gray-500"
              }
            `}
            onClick={() => setRegionTab("in")}
          >
            India, Pakistan, Bangladesh, Sri Lanka, Nepal, Bhutan, Maldives{" "}
            <span className="ml-1 text-xs">(₹)</span>
          </button>

          {/* Other Countries tab */}
          <button
            className={`px-6 py-2 rounded-t-xl font-medium border-2 border-b-0 transition-all duration-150 ml-2
              ${
                regionTab === "other"
                  ? "bg-white border-teal-400 text-teal-600 shadow-lg z-10"
                  : "bg-[#eaf3fa] border-transparent text-gray-500"
              }
            `}
            onClick={() => setRegionTab("other")}
          >
            Other Countries
          </button>
        </div>

        {/* Pricing Cards */}
        <div
          className={`max-w-6xl w-full grid ${
            plans.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"
          } grid-cols-1 gap-6 bg-white rounded-xl shadow-xl border-[1.5px] border-gray-100 px-4 md:px-8 py-10`}
        >
          {plans.map((plan, idx) => (
            <div
              key={plan.title}
              className="flex flex-col border rounded-lg bg-[#f4fafd] border-gray-200 shadow-sm p-5 min-h-[300px]"
            >
              <h3 className="text-base font-semibold text-gray-800 mb-1">
                {plan.title}
              </h3>
              <div className="text-2xl font-extrabold text-rose-500 mb-2">
                {plan.price}
              </div>
              <div className="text-xs text-gray-500 mb-3">{plan.notes}</div>
              <div className="flex-1">
                <ul className="text-sm text-gray-700 space-y-1 mb-6 list-disc list-inside">
                  {plan.conditions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Centered Button */}
        <div className="py-3 flex justify-center">
          <button className="px-7 py-3 bg-teal-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-teal-700 transition-all">
            Book Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inventoryprice;
