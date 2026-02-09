import React, { useState } from "react";
import {
  MdOutlineMonitor,
  MdOutlineCurrencyRupee,
  MdOutlineMedication,
  MdOutlinePublic,
  MdOutlineBusinessCenter,
  MdOutlinePeopleOutline,
} from "react-icons/md";
import AboutErp from "../Pages/erpsolutions/AboutErp";
import ErpDetails from "../Pages/erpsolutions/ErpDetails";
   

import  ErpFeatures from "../Pages/erpsolutions/ErpFeatures";
import ErpPrice from "../Pages/erpsolutions/ErpPrice";
import FaqErp  from "../Pages/erpsolutions/FaqErp";

export default function Hero() {
  const [form, setForm] = useState({ name: "", mobile: "", pincode: "" });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <div className="w-full bg-[#00695C]">
      {/* Container */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-12 md:py-20">
        {/* Left Content */}
        <div className="md:w-2/3 text-white">
          <h1 className="text-3xl md:text-5xl font-bold leading-snug">
            India’s Trusted{" "}
            <span className="text-yellow-200">
              Inventory Management Software
            </span>{" "}
            for SMEs
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-200 max-w-xl">
            Manage orders, track stock, and handle billing effortlessly with
            Marg ERP – your all-in-one inventory powerhouse for growing
            businesses.
          </p>

          {/* Features */}
          <ul className="mt-8 space-y-3 text-lg">
            {[
              "Seamless Order Handling",
              "Live Inventory Monitoring",
              "Intelligent Warehouse Control",
              "Effortless GST Invoicing & Compliance",
            ].map((item, i) => (
              <li key={i} className="flex items-center">
                <span className="w-2.5 h-2.5 bg-teal-300 rounded-full mr-3"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Form */}
        <div className="md:w-1/3 w-full mt-10 md:mt-0 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 w-full max-w-md">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
              Book Free Demo!
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Mobile with country code */}
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l border border-r-0 border-gray-300 bg-gray-50 text-gray-600 text-sm">
                  +91
                </span>
                <input
                  name="mobile"
                  type="text"
                  required
                  placeholder="Mobile No."
                  value={form.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-r outline-none focus:border-green-500 transition"
                  pattern="[0-9]{10}"
                  maxLength={10}
                />
              </div>

              {/* Pin code */}
              <input
                name="pincode"
                type="text"
                required
                placeholder="Pin Code"
                value={form.pincode}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded outline-none focus:border-green-500 transition"
              />

              {/* Name */}
              <input
                name="name"
                type="text"
                required
                placeholder="Name/ Firm Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded outline-none focus:border-green-500 transition"
              />

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-[#00695C] text-white py-2 rounded-lg text-lg font-semibold mt-3 hover:bg-[#004d40] transition"
              >
                BOOK NOW
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Stats Row */}
      <div className="pt-12 bg-white">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Empowering Businesses, Enabling Better India Through IT
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 py-10">
          {/* 1 */}
          <div className=" rounded-xl shadow-xl border border-gray-100 p-6 flex flex-col items-center">
            <MdOutlineMonitor className="text-5xl text-teal-700 mb-3" />
            <div className="text-xl font-bold">
              20 Billion<sup>+</sup>
            </div>
            <span className="text-gray-500 text-sm mt-1 text-center">
              Invoices Processed Per Year
            </span>
          </div>
          {/* 2 */}
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 flex flex-col items-center">
            <MdOutlineCurrencyRupee className="text-5xl text-teal-700 mb-3" />
            <div className="text-xl font-bold">100 Billion$</div>
            <span className="text-gray-500 text-sm mt-1 text-center">
              Transactions Processed Per Year
            </span>
          </div>
          {/* 3 */}
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 flex flex-col items-center">
            <MdOutlineMedication className="text-5xl text-teal-700 mb-3" />
            <div className="text-xl font-bold text-center">
              50% Pharma &amp; FMCG
            </div>
            <span className="text-gray-500 text-sm mt-1 text-center">
              Runs On Marg ERP Software
            </span>
          </div>
          {/* 4 */}
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 flex flex-col items-center">
            <MdOutlinePublic className="text-5xl text-teal-700 mb-3" />
            <div className="text-xl font-bold">
              1 Million<sup>+</sup>
            </div>
            <span className="text-gray-500 text-sm mt-1 text-center">
              Businesses Served Worldwide
            </span>
          </div>
          {/* 5 */}
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 flex flex-col items-center">
            <MdOutlineBusinessCenter className="text-5xl text-teal-700 mb-3" />
            <div className="text-xl font-bold">
              850<sup>+</sup>
            </div>
            <span className="text-gray-500 text-sm mt-1 text-center">
              Sales &amp; Support Centers
            </span>
          </div>
          {/* 6 */}
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 flex flex-col items-center">
            <MdOutlinePeopleOutline className="text-5xl text-teal-700 mb-3" />
            <div className="text-xl font-bold">
              8500<sup>+</sup>
            </div>
            <span className="text-gray-500 text-sm mt-1 text-center">
              Sales &amp; Service Professionals
            </span>
          </div>
        </div>
      </div>
      <ErpFeatures />
      <AboutErp />
      <ErpDetails />
      <ErpPrice />
      <FaqErp />
    </div>
  );
}
