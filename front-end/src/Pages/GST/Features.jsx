import React from "react";
import {
  MdOutlineReceiptLong,
  MdOutlinePointOfSale,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";

const features = [
  {
    icon: <MdOutlineReceiptLong className="text-4xl text-white" />,
    title: "GST Compliant",
    description:
      "Marg Billing Software is GST compliant. You can create GST invoices easily and upload them in Excel, JSON, or CSV formats.",
    accent: "from-teal-500 to-teal-300"
  },
  {
    icon: <MdOutlinePointOfSale className="text-4xl text-white" />,
    title: "POS Billing Solution",
    description:
      "Boost billing and invoicing speed by up to 50% using a smart touchscreen POS system. Bill quickly, reduce errors, and access reports.",
    accent: "from-blue-500 to-blue-300"
  },
  {
    icon: <MdOutlineAccountBalanceWallet className="text-4xl text-white" />,
    title: "Cash Drawer",
    description:
      "Connect a cash drawer for safe and easy billing. Track all cash movements, control user access, and monitor every transaction effortlessly.",
    accent: "from-purple-500 to-purple-300"
  },
  {
    icon: <MdOutlineReceiptLong className="text-4xl text-white" />,
    title: "Barcode Scanner",
    description:
      "Scan product barcodes instantly to bill faster. Improve accuracy, speed, and stock tracking in one go with Marg, the best billing software in India.",
    accent: "from-pink-500 to-pink-300"
  },
  {
    icon: <MdOutlinePointOfSale className="text-4xl text-white" />,
    title: "Invoice Customization",
    description:
      "Add your logo, business name, and brand colours to your invoices. Personalize bills and leave a lasting impression.",
    accent: "from-yellow-500 to-yellow-300"
  },
  {
    icon: <MdOutlineAccountBalanceWallet className="text-4xl text-white" />,
    title: "Connected Banking",
    description:
      "Make NEFT, RTGS, and other payments from within the software via ICICI Bank, Axis Bank, SBI, and J&K Bank. Get auto bank reconciliation with 140+ banks.",
    accent: "from-green-500 to-green-300"
  },
];

const Features = () => (
  <div className="bg-[#eaf3fa] py-16">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
      What are the Features of Marg ERP Billing Software?
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
          <div className="text-xl font-bold text-center mb-2">{f.title}</div>
          <div className="text-gray-600 text-base text-center">{f.description}</div>
        </div>
      ))}
    </div>
  </div>
);

export default Features;
