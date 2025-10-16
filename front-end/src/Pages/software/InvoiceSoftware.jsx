import React, { useState } from "react";
import {
  FaFileInvoice,
  FaShoppingCart,
  FaTags,
  FaPrint,
  FaCogs,
  FaChartBar,
  FaArrowRight,
} from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import {
  MdOutlineReceiptLong,
  MdOutlinePointOfSale,
  MdOutlineAccountBalanceWallet,
  MdOutlineInventory2,
  MdOutlineLocalShipping,
  MdOutlineBarChart,
  MdOutlineMonitor,
  MdOutlineCurrencyRupee,
  MdOutlineMedication,
  MdOutlinePublic,
  MdOutlineBusinessCenter,
  MdOutlinePeopleOutline,
} from "react-icons/md";

// AboutErp Component
const AboutErp = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const features = [
    { id: 1, title: "Billing Features", icon: <FaFileInvoice /> },
    { id: 2, title: "Purchase Features", icon: <FaShoppingCart /> },
    { id: 3, title: "Discount & Schemes", icon: <FaTags /> },
    { id: 4, title: "Document Printing", icon: <FaPrint /> },
    { id: 5, title: "Fully User-Configurable Invoicing", icon: <FaCogs /> },
    { id: 6, title: "MIS Reports", icon: <FaChartBar /> },
  ];

  return (
    <div className="w-full bg-blue-50 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10 px-6">
        {/* Left Side Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://margcompusoft.com/images/gstwp-knowmarg.svg"
            alt="ERP Illustration"
            className="w-80 md:w-[400px] h-auto"
          />
        </div>

        {/* Right Side Accordion */}
        <div className="md:w-1/2 w-full">
          <h2 className="text-xl md:text-xl font-bold text-teal-600 mb-6">
            Know more about Csaap® ERP
          </h2>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="bg-white shadow rounded-md overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-base text-gray-700 hover:bg-gray-50"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-teal-600">{feature.icon}</span>
                    {feature.title}
                  </span>
                  <span
                    className={`transform transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  >
                 <MdKeyboardDoubleArrowRight />
                  </span>
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-4 text-gray-600 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Detailed description of {feature.title} goes here...
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* See More Button */}
          <div className="mt-6 flex justify-end">
            <a
              href="#"
              className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-md text-sm hover:bg-teal-700 transition-colors"
            >
              <FaArrowRight /> See More...
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};


const ErpFeatures = () => {
  const features = [
    {
      icon: <MdOutlineReceiptLong className="text-4xl text-white" />,
      title: "Create GST-compliant invoices instantly",
      description:
        "Generate invoices that automatically include all GST details and formats approved by the government Save time with error-free tax calculations and standardized layouts",
      accent: "from-teal-500 to-teal-300",
    },
    {
      icon: <MdOutlineInventory2 className="text-4xl text-white" />,
      title: "Automated recurring invoices",
      description:
        "Schedule recurring invoices for repeat customers to be sent automatically.Perfect for subscription-based or ongoing service businesses.",
      accent: "from-indigo-500 to-indigo-300",
    },
    {
      icon: <MdOutlineAccountBalanceWallet className="text-4xl text-white" />,
      title: "Multi-currency and multi-branch support",
      description:
        "Manage transactions in multiple currencies across different branches seamlessly.Consolidate financial data while maintaining location-specific reporting.",
      accent: "from-yellow-500 to-yellow-300",
    },
    {
      icon: <MdOutlinePointOfSale className="text-4xl text-white" />,
      title: "Real-time payment tracking",
      description:
        "Monitor payment statuses instantly with automated updates.Identify pending, partial, or completed payments with ease.",
      accent: "from-pink-500 to-pink-300",
    },
    {
      icon: <MdOutlineLocalShipping className="text-4xl text-white" />,
      title: "Integrated with accounting and inventory",
      description:
        "Sync invoices directly with your accounting and stock systems.Ensure accurate financial entries and real-time inventory updates.",
      accent: "from-green-500 to-green-300",
    },
    {
      icon: <MdOutlineBarChart className="text-4xl text-white" />,
      title: "Customizable invoice templates",
      description:
        "Design invoices that match your brand’s look and feel.Adjust fields, colors, and layouts to suit your business needs .",
      accent: "from-purple-500 to-purple-300",
    },
    {
      icon: <MdOutlinePointOfSale className="text-4xl text-white" />,
      title: "Credit and debit note management",
      description:
        "Easily issue and track credit or debit notes for returns or adjustments.Maintain transparent records for compliance and customer clarity.",
      accent: "from-blue-500 to-blue-300",
    },
    {
      icon: <MdOutlineAccountBalanceWallet className="text-4xl text-white" />,
      title: "E-invoicing and QR code support",
      description:
        "Generate IRN and QR codes as per e-invoicing mandates.Simplify tax reporting and streamline invoice validation",
      accent: "from-purple-500 to-purple-300",
    },
    {
      icon: <MdOutlineReceiptLong className="text-4xl text-white" />,
      title: "Auto tax calculation (GST, TDS, TCS)",
      description:
        "Automatically compute applicable taxes for every invoice.Minimize manual errors and ensure 100% compliance.",
      accent: "from-pink-500 to-pink-300",
    },
  ];

  return (
    <div className="w-full">
      <div className="bg-[#00695C] py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          What are the features of Invoice Software?
        </h2>
        <div className="max-w-7xl mx-auto grid gap-8 px-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:border-teal-500 hover:shadow-2xl min-h-[270px] group"
            >
              <div
                className={`w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br ${f.accent} mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}
              >
                {f.icon}
              </div>
              <hr className="border-t border-gray-300 w-64 my-2" />
              <div className="text-xl font-bold text-center mb-2">{f.title}</div>
              <div className="text-gray-600 text-base text-center">
                {f.description}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
          {/* Left: YouTube Video */}
          <div className="md:w-1/2 w-full flex justify-center">
            <div className="rounded-lg shadow-lg overflow-hidden w-full aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/https://youtu.be/KUPb23Y55no?si=kklQWJ4QqnK3u5Rq"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Right: Content */}
          <div className="md:w-1/2 w-full">
            <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-4">
              How Can You Get the Most Out of Your{" "}
              <span className="text-teal-700">Stock with Csaap ERP ?</span>?
            </h2>
            <p className="text-gray-600 text-base md:text-lg mb-6">
              Running a business means keeping an eye on your stock, sales, and
              purchases—but it doesn't have to be complicated. With Csaap ERP's
              Inventory Management Software, you get everything in one place.
              Monitor your inventory in real time, prevent losses, and make smarter
              decisions that grow your business. Work smarter, save time, and boost
              your profits with csaap ERP.
            </p>
            <button className="px-6 py-2 bg-teal-700 text-white font-semibold rounded-md hover:bg-teal-800 transition">
              Book Demo
            </button>
         
          </div>
        </div>
      </div>
    </div>
  );
};

// ErpPrice Component
const ErpPrice = () => {
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
          What Makes Csaap ERP India's Top{" "}
          <span className="text-yellow-400">Invoice Software?</span>
        </h2>
        <p className="text-gray-200 max-w-3xl mx-auto text-sm md:text-base mb-8">
    Our invoice software integrates seamlessly with accounting, inventory, and sales modules, giving you real-time insights into your receivables and cash flow. With automated reminders, recurring billing, and GST compliance, you can minimize errors, save time, and get paid faster. CSAAP ensures your invoicing process is not just fast, but also smart, accurate, and fully compliant with government regulations.
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
             <button className="px-6 py-2 ml-5 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-800 transition">
                add to cart
            </button>
        </div>
      </div>
    </div>
  );
};

// FaqErp Component
const FaqErp = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: " What is CSAAP ERP Software ?",
      answer: "CSAAP ERP is an all-in-one business management software that integrates accounting, sales, inventory, payroll, CRM, and HR operations into a single platform for seamless business automation."
    },
    {
      question: "Who can use CSAAP ERP ?",
      answer: "It’s designed for all types of businesses — from startups and SMEs to large enterprises across industries like manufacturing, trading, retail, and services."
    },
    {
      question: " Is CSAAP ERP cloud-based or on-premise ?",
      answer: "CSAAP ERP is available in both cloud and on-premise versions, offering flexibility based on your business needs."
    },
    {
      question: "Does CSAAP ERP support GST compliance ?",
      answer: "Yes, it includes automated GST billing, e-invoicing, and tax return filing for complete compliance with Indian taxation laws"
    },
    {
      question: "How does CSAAP ERP improve business productivity ?",
      answer: "By automating manual processes, centralizing data, and providing real-time analytics, CSAAP ERP helps teams save time and make data-driven decisions."
    },
    {
      question: " Can CSAAP ERP be customized for my business ?",
      answer: "Absolutely! CSAAP ERP allows modular customization to fit your company’s specific workflow and operational needs"
    },
    {
      question: "Does CSAAP ERP integrate with other software ?",
      answer: "Yes, it supports integration with third-party applications such as CRM, accounting tools, and e-commerce platforms for enhanced functionality."
    },
    {
      question: "How secure is my business data in CSAAP ERP ?",
      answer: "Your data is fully protected with encryption, cloud backup, role-based access control, and strict authentication measures."
    },
    {
      question: "Can multiple branches or locations use the same system?",
      answer: "Yes, CSAAP ERP supports multi-branch and multi-location management, enabling centralized control of operations."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-3">
        {faqItems.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-md overflow-hidden shadow-xs">
            <button
              className="flex justify-between items-center bg-white w-full p-3 text-left transition-colors duration-150 text-sm"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium text-gray-900 pr-2">{item.question}</span>
              <svg
                className={`w-4 h-4 text-gray-500 flex-shrink-0 transform transition-transform duration-200 ${
                  activeIndex === index ? 'rotate-180' : 'rotate-0'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-3 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-700 text-sm">{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main ERP Component
export default function InventorySoftware() {
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
         Simplify Invoicing, Accelerate Payments{" "}
            <span className="text-yellow-200">
             CSAAP ERP
            </span>{" "}
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-200 max-w-xl">
            Manage all your invoicing needs efficiently with CSAAP Invoice Software,
            designed to automate billing, streamline payments, and ensure 100% accuracy.
            Whether you run a small business, trading company, or enterprise, CSAAP helps you generate professional invoices instantly, track payments, and maintain complete financial records from a single platform.
          </p>
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
              Runs On Csaap ERP Software
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

      {/* Render all components */}
      <ErpFeatures />
      <AboutErp />
      {/* <ErpDetails /> */}
      <ErpPrice />
      <FaqErp />
    </div>
  );
}