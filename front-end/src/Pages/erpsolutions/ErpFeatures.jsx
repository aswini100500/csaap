import React from "react";
import {
  MdOutlineReceiptLong,
  MdOutlinePointOfSale,
  MdOutlineAccountBalanceWallet,
  MdOutlineInventory2,
  MdOutlineLocalShipping,
  MdOutlineBarChart,

} from "react-icons/md";

const features = [
{
    icon: <MdOutlineReceiptLong className="text-4xl text-white" />,
    title: "Inventory Control",
    description:
      "Keep your stock organized and updated in real time. CSAAP ERP helps track product movement, manage warehouses, and automate reordering to prevent shortages or overstocking, ensuring efficient inventory flow.",
    accent: "from-teal-500 to-teal-300",
  },
  {
    icon: <MdOutlineInventory2 className="text-4xl text-white" />,
    title: "Accounting & Finance",
    description:
      "Automate your entire sales cycle — from lead capture to billing. Boost sales productivity with quick quotations, order tracking, and performance analytics, reducing manual effort and maximizing revenue growth.",
    accent: "from-indigo-500 to-indigo-300",
  },
  {
    icon: <MdOutlineAccountBalanceWallet className="text-4xl text-white" />,
    title: "Sales Automation",
    description:
      "Automate your entire sales cycle — from lead capture to billing. Boost sales productivity with quick quotations, order tracking, and performance analytics, reducing manual effort and maximizing revenue growth.",
    accent: "from-yellow-500 to-yellow-300",
  },
  {
    icon: <MdOutlinePointOfSale className="text-4xl text-white" />,
    title: " Purchase Management",
    description:
      "Streamline procurement with automated purchase orders, supplier management, and approval workflows. Gain complete visibility over expenses and ensure cost-effective purchasing decisions.",
    accent: "from-pink-500 to-pink-300",
  },
  {
    icon: <MdOutlineLocalShipping className="text-4xl text-white" />,
    title: "CRM Integration",
    description:
      "Build stronger customer relationships with integrated CRM tools. Track interactions, manage leads, and provide personalized service that drives satisfaction and repeat business.",
    accent: "from-green-500 to-green-300",
  },
  {
    icon: <MdOutlineBarChart className="text-4xl text-white" />,
    title: "Payroll System",
    description:
      "Simplify salary processing, deductions, and compliance with automated payroll tools. CSAAP ERP ensures timely and accurate salary distribution with complete transparency and error-free calculations.",
    accent: "from-purple-500 to-purple-300",
  },
  {
    icon: <MdOutlinePointOfSale className="text-4xl text-white" />,
    title: " Analytics Dashboard",
    description:
      "Make data-driven decisions with real-time visual insights. Customize dashboards to monitor KPIs, financial health, and operational efficiency across departments.",
    accent: "from-blue-500 to-blue-300",
  },
  {
    icon: <MdOutlineAccountBalanceWallet className="text-4xl text-white" />,
    title: " Data Security",
    description:
      "Your data stays protected with advanced encryption and secure user authentication. CSAAP ERP ensures complete confidentiality and compliance with modern cyber security standards.",
    accent: "from-purple-500 to-purple-300",
  },
  {
    icon: <MdOutlineReceiptLong className="text-4xl text-white" />,
    title: " Role-Based Access",
    description:
      "Control who sees what with role-based permissions. Empower your teams with access to the right information while maintaining data security and organizational discipline.",
    accent: "from-pink-500 to-pink-300",
  },

];

const ErpFeatures = () => (
  <div className="w-full">
  <div className="bg-[#00695C] py-16">
    <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
      What are the Features of Csaap ERP solutions Software?
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
              src="https://www.youtube.com/embed/https://youtu.be/KUPb23Y55no?si=kklQWJ4QqnK3u5Rq" // replace with your video link
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
            purchases—but it doesn’t have to be complicated. With Marg ERP’s
            Inventory Management Software, you get everything in one place.
            Monitor your inventory in real time, prevent losses, and make smarter
            decisions that grow your business. Work smarter, save time, and boost
            your profits with Marg ERP.
          </p>
          <button className="px-6 py-2 bg-teal-700 text-white font-semibold rounded-md hover:bg-teal-800 transition">
            Book Demo
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ErpFeatures;
