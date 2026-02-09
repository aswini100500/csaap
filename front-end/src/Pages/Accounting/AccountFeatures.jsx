import React from "react";
import {
  MdOutlineReceiptLong,
  MdOutlineAccountBalanceWallet,
  MdOutlineInventory2,
  MdOutlineLocalShipping,
  MdOutlineBarChart,
  MdSecurity,
  MdAttachMoney,
  MdDescription,
  MdCloudUpload,
  MdAccountBalance,
  MdPayment,
  MdAnalytics,
} from "react-icons/md";

const features = [
  {
    icon: <MdDescription className="text-2xl text-white" />,
    title: "Internal Audit",
    description:
      "Comprehensive audit trails and compliance tracking with automated reporting for complete financial transparency.",
    accent: "from-teal-600 to-teal-400",
  },
  {
    icon: <MdAttachMoney className="text-2xl text-white" />,
    title: "Automated Tax Reconciliation",
    description:
      "Automatically reconcile tax data across transactions with intelligent matching and discrepancy detection.",
    accent: "from-indigo-600 to-indigo-400",
  },
  {
    icon: <MdAccountBalance className="text-2xl text-white" />,
    title: "GST Reports & Return Filing",
    description:
      "Generate 100% GST-compliant reports and file returns directly through the software with error validation.",
    accent: "from-amber-600 to-amber-400",
  },
  {
    icon: <MdOutlineReceiptLong className="text-2xl text-white" />,
    title: "GST Ready Invoices",
    description:
      "Create fully compliant GST invoices with automated tax calculations and built-in validation checks.",
    accent: "from-rose-600 to-rose-400",
  },
  {
    icon: <MdCloudUpload className="text-2xl text-white" />,
    title: "e-Invoicing",
    description:
      "Generate and manage e-invoices with IRN and QR code generation as per government regulations.",
    accent: "from-emerald-600 to-emerald-400",
  },
  {
    icon: <MdPayment className="text-2xl text-white" />,
    title: "Connected Banking",
    description:
      "Seamless integration with banking systems for real-time transaction tracking and reconciliation.",
    accent: "from-violet-600 to-violet-400",
  },
  {
    icon: <MdOutlineAccountBalanceWallet className="text-2xl text-white" />,
    title: "TDS/ TCS Management",
    description:
      "Automated TDS/TCS calculation, deduction, and reporting with compliance to latest regulations.",
    accent: "from-blue-600 to-blue-400",
  },
  {
    icon: <MdSecurity className="text-2xl text-white" />,
    title: "Data Security",
    description:
      "Enterprise-grade security with encryption, role-based access controls, and automated backups.",
    accent: "from-purple-600 to-purple-400",
  },
  {
    icon: <MdAnalytics className="text-2xl text-white" />,
    title: "Advanced Reporting",
    description:
      "Customizable dashboards and detailed analytics for data-driven business decisions.",
    accent: "from-pink-600 to-pink-400",
  },
];

const AccountFeatures = () => (
  <div className="w-full">
    {/* Features Section */}
    <div className="bg-gradient-to-br from-teal-800 to-teal-600 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          Powerful Features of Marg ERP Billing Software
        </h2>
        <p className="text-teal-100 text-center mb-12 max-w-3xl mx-auto">
          Streamline your business operations with our comprehensive suite of
          tools designed for efficiency and compliance
        </p>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
            >
              <div
                className={`w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br ${f.accent} mb-5 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-transform duration-300`}
              >
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-gray-800 group-hover:text-teal-700 transition-colors">
                {f.title}
              </h3>
              <div className="text-gray-600 text-sm text-center leading-relaxed">
                {f.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Video Section */}
    <div className="w-full bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
        {/* Left: YouTube Video */}
        <div className="md:w-1/2 w-full">
          <div className="rounded-xl shadow-lg overflow-hidden w-full aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/KUPb23Y55no"
              title="Marg ERP 9+ Features"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Right: Content */}
        <div className="md:w-1/2 w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug mb-4">
            Maximize Your Business Potential with{" "}
            <span className="text-teal-700">Marg ERP 9+</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">
            Transform your business operations with intelligent inventory
            management, real-time tracking, and comprehensive reporting. Marg
            ERP helps you prevent stockouts, reduce excess inventory, and make
            data-driven decisions that boost profitability.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-teal-700 text-white font-semibold rounded-lg hover:bg-teal-800 transition shadow-md hover:shadow-lg">
              Book a Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AccountFeatures;
