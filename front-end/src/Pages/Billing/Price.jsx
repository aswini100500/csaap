import React, { useState } from "react";

const plansIN = [
  {
    title: "Marg ERP Nano",
    price: "₹5,400/",
    conditions: [
      "You can make 450 Bills/Month (Includes Challans + Estimates for Stock Issue)",
      "Monthly Billing Amount ₹1,50,000",
      "If you exceed the limits, pay just ₹5 per extra bill via wallet, or update in Basic or Silver"
    ],
    notes: "18% GST Extra",
  },
  {
    title: "Basic Edition",
    price: "₹9,999/",
    conditions: [
      "1 User Full Rights",
      "₹3,000/- per extra user",
      "Maximum 2 users"
    ],
    notes: "( Limited Edition ) 18% GST Extra",
  },
  {
    title: "Silver Edition",
    price: "₹13,500/",
    conditions: [
      "1 User Full Rights",
      "1 User for View only",
      "₹3,000/- per extra user",
    ],
    notes: "18% GST Extra",
  },
  {
    title: "Gold Edition",
    price: "₹25,200/",
    conditions: [
      "Unlimited Users"
    ],
    notes: "18% GST Extra",
  }
];

const plansOther = [
  {
    title: "International Basic",
    price: "$199/",
    conditions: [
      "1 User Full Rights",
      "Basic Support Included",
      "2,000 Monthly Transactions"
    ],
    notes: "Taxes as applicable",
  },
  {
    title: "International Business",
    price: "$399/",
    conditions: [
      "5 Users Full Rights",
      "Priority Support",
      "Unlimited Transactions"
    ],
    notes: "Taxes as applicable",
  },
  {
    title: "International Enterprise",
    price: "Contact Sales",
    conditions: [
      "Unlimited Users",
      "Dedicated Account Manager",
      "All Features Unlocked"
    ],
    notes: "Custom Pricing",
  }
];

export default function PricingCards() {
  const [regionTab, setRegionTab] = useState("in");
  const plans = regionTab === "in" ? plansIN : plansOther;

  return (
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
          <span className="inline-flex items-center">
            <svg className="text-teal-500 mr-2" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="10" cy="10" r="8" /><path d="M6 10l2 2l4-4" /></svg>
            India, Pakistan, Bangladesh, Sri Lanka, Nepal, Bhutan, Maldives <span className="ml-1 text-xs">(₹)</span>
          </span>
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
          plans.length === 4
            ? "md:grid-cols-4"
            : "md:grid-cols-3"
        } grid-cols-1 gap-6 bg-white rounded-xl shadow-xl border-[1.5px] border-gray-100 px-4 md:px-8 py-10`}
      >
        {plans.map((plan, idx) => (
          <div
            key={plan.title}
            className="flex flex-col border rounded-lg bg-[#f4fafd] border-gray-200 shadow-sm p-5 min-h-[300px]"
          >
            <h3 className="text-base font-semibold text-gray-800 mb-1">{plan.title}</h3>
            <div className="text-2xl font-extrabold text-rose-500 mb-2">{plan.price}</div>
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
  );
}