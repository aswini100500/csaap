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
    title: "Easy & Fast Billing",
    description:
      "Speed up billing by 40% with quick search, shortcuts, and barcode scanning. Manage sales, purchases, bills, and payments with ease using our powerful billing software.",
    accent: "from-teal-500 to-teal-300",
  },
  {
    icon: <MdOutlineInventory2 className="text-4xl text-white" />,
    title: "Smart Inventory",
    description:
      "Track stock in real-time, get low-stock alerts, and manage batches & expiry with intelligent inventory management.",
    accent: "from-indigo-500 to-indigo-300",
  },
  {
    icon: <MdOutlineAccountBalanceWallet className="text-4xl text-white" />,
    title: "GST Invoicing & Compliance",
    description:
      "Generate 100% GST-compliant invoices and file GST returns directly without errors.",
    accent: "from-yellow-500 to-yellow-300",
  },
  {
    icon: <MdOutlinePointOfSale className="text-4xl text-white" />,
    title: "Point of Sale",
    description:
      "Supercharge your retail store with fast checkout, barcode billing, and digital payment integration.",
    accent: "from-pink-500 to-pink-300",
  },
  {
    icon: <MdOutlineLocalShipping className="text-4xl text-white" />,
    title: "Supply Chain Control",
    description:
      "Manage distributors, retailers, and suppliers seamlessly with order management & delivery tracking.",
    accent: "from-green-500 to-green-300",
  },
  {
    icon: <MdOutlineBarChart className="text-4xl text-white" />,
    title: "Business Insights",
    description:
      "Get powerful reports & analytics to make smarter business decisions and boost profitability.",
    accent: "from-purple-500 to-purple-300",
  },
  {
    icon: <MdOutlinePointOfSale className="text-4xl text-white" />,
    title: "Order Calling",
    description:
      "Scan a QR code to connect your smartphone or other devices. This allows you to contact customers instantly and take orders without delays.",
    accent: "from-blue-500 to-blue-300",
  },
  {
    icon: <MdOutlineAccountBalanceWallet className="text-4xl text-white" />,
    title: "Centralised Dashboard",
    description:
      "View all orders, payments, and stock on a single screen. Make smarter business decisions with live, accurate data.",
    accent: "from-purple-500 to-purple-300",
  },
  {
    icon: <MdOutlineReceiptLong className="text-4xl text-white" />,
    title: "My Shop QR Code",
    description:
      "Let customers browse products and place orders by scanning your QR code. It’s safe, quick, and completely touch-free.",
    accent: "from-pink-500 to-pink-300",
  },

];

const InventoryFeatures = () => (
  <div className="w-full">
  <div className="bg-[#00695C] py-16">
    <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
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
            <span className="text-teal-700">Stock with Marg ERP 9+</span>?
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

export default InventoryFeatures;
