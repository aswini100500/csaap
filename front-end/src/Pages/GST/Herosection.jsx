import React, { useState } from "react";
import {
  MdOutlineMonitor,
  MdOutlineCurrencyRupee,
  MdOutlineMedication,
  MdOutlinePublic,
  MdOutlineBusinessCenter,
  MdOutlinePeopleOutline,
} from "react-icons/md";
import Features from "./Features";
import Demo from "./Demo";
import About from "./About";
import Details from "./Details";
import Pricing from "./Pricing";
import FAQSsection from "./FAQSsection";
import Blog from "./Blogsection";

export default function Herosection() {
  const [form, setForm] = useState({ name: "", mobile: "", pincode: "" });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <div className="w-full pb-12">
      {/* Banner Section */}
      <div className="flex bg-[#e4eff8] items-center justify-center">
        <div className="w-full flex flex-col md:flex-row md:justify-between p-4 px-5 md:px-20 py-10 md:py-20">
          {/* Left Content */}
          <div className="md:w-2/3 ml-5">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              #1 GST Software to Simplify Your GST Return Filing & Billing
              Process
            </h1>
            <ul className="mt-8 space-y-1 text-lg">
              <li className="flex items-start">
                <span className="mt-1 mr-3 w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
                File GST Returns, TCS & TDS directly from GST Software
              </li>
              <li className="flex items-start">
                <span className="mt-1 mr-3 w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
                Run Internal Audit to ensure 100% error-free reports
              </li>
              <li className="flex items-start">
                <span className="mt-1 mr-3 w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
                Save time by managing all your GSTINs at one place
              </li>
              <li className="flex items-start">
                <span className="mt-1 mr-3 w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
                Order Management App for Retailers, Sales & Delivery
              </li>
              
            </ul>
          </div>
          {/* Right Form */}
          <div className="md:w-1/3 w-full mt-10 md:mt-0 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-1 text-gray-900">
                  Start your free trial!
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Name/ Firm Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded outline-none focus:border-red-400 transition"
                />
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    +91
                  </span>
                  <input
                    name="mobile"
                    type="text"
                    required
                    placeholder="Mobile No."
                    value={form.mobile}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-r outline-none focus:border-red-400 transition"
                    pattern="[0-9]{10}"
                    maxLength={10}
                  />
                </div>
                <input
                  name="pincode"
                  type="text"
                  required
                  placeholder="Pin Code"
                  value={form.pincode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded outline-none focus:border-red-400 transition"
                />
                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white py-2 rounded-lg text-lg font-semibold mt-3 hover:bg-teal-700 transition"
                >
                  BOOK NOW
                </button>
              </form>
            </div>
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
      <Features/>
      <Demo/>
      <About/>
      <Details/>
      <Pricing/>
       <Blog/>
      <FAQSsection/>
     
    </div>
  );
}
