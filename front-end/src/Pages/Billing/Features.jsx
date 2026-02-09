import React from "react";
import {
  MdOutlineReceiptLong,
  MdOutlinePointOfSale,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";

const Features = () => {
  return (
    <div className="bg-[#eaf3fa] py-14">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
        What are the Features of Marg ERP Billing Software?
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow border border-gray-100 p-8 flex flex-col items-center min-h-[370px]">
          <MdOutlineReceiptLong className="text-6xl text-red-500 mb-4" />
          <hr className="border-t border-red-400 w-56 my-3" />
          <div className="text-xl font-bold text-center mb-2">
            GST Compliant
          </div>
          <div className="text-gray-700 text-base text-center mb-4">
            Marg Billing Software is GST compliant. You can create GST invoices
            easily and upload them in Excel, JSON, or CSV formats.
          </div>
          <span className="text-red-500 font-semibold mt-auto text-base inline-block cursor-pointer">
            Watch Video<span className="ml-1">&#8594;</span>
          </span>
        </div>
        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow border border-gray-100 p-8 flex flex-col items-center min-h-[370px]">
          <MdOutlinePointOfSale className="text-6xl text-red-500 mb-4" />
          <hr className="border-t border-red-400 w-56 my-3" />
          <div className="text-xl font-bold text-center mb-2">
            POS Billing Solution
          </div>
          <div className="text-gray-700 text-base text-center mb-4">
            Boost billing and invoicing speed by up to 50% using a smart
            touchscreen POS (Point of Sale) system. Bill quickly, reduce errors,
            and access reports.
          </div>
          <span className="text-red-500 font-semibold mt-auto text-base inline-block cursor-pointer">
            Watch Video<span className="ml-1">&#8594;</span>
          </span>
        </div>
        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow border border-gray-100 p-8 flex flex-col items-center min-h-[370px]">
          <MdOutlineAccountBalanceWallet className="text-6xl text-red-500 mb-4" />
          <hr className="border-t border-red-400 w-56 my-3" />
          <div className="text-xl font-bold text-center mb-2">Cash Drawer</div>
          <div className="text-gray-700 text-base text-center mb-4">
            Connect a cash drawer for safe and easy billing. Track all cash
            movements, control user access, and monitor every transaction
            effortlessly.
          </div>
          <span className="text-red-500 font-semibold mt-auto text-base inline-block cursor-pointer">
            Watch Video<span className="ml-1">&#8594;</span>
          </span>
        </div>
        <div className="bg-white rounded-xl shadow border border-gray-100 p-8 flex flex-col items-center min-h-[370px]">
          <MdOutlineReceiptLong className="text-6xl text-red-500 mb-4" />
          <hr className="border-t border-red-400 w-56 my-3" />
          <div className="text-xl font-bold text-center mb-2">
            Barcode Scanner
          </div>
          <div className="text-gray-700 text-base text-center mb-4">
            Scan product barcodes instantly to bill faster. Improve accuracy,
            speed, and stock tracking in one go with Marg, the best billing
            software in India.{" "}
          </div>
          <span className="text-red-500 font-semibold mt-auto text-base inline-block cursor-pointer">
            Watch Video<span className="ml-1">&#8594;</span>
          </span>
        </div>
        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow border border-gray-100 p-8 flex flex-col items-center min-h-[370px]">
          <MdOutlinePointOfSale className="text-6xl text-red-500 mb-4" />
          <hr className="border-t border-red-400 w-56 my-3" />
          <div className="text-xl font-bold text-center mb-2">
            Invoice Customization
          </div>
          <div className="text-gray-700 text-base text-center mb-4">
            Add your logo, business name, and brand colours to your invoices.
            Personalize bills and leave a lasting impression.{" "}
          </div>
          <span className="text-red-500 font-semibold mt-auto text-base inline-block cursor-pointer">
            Watch Video<span className="ml-1">&#8594;</span>
          </span>
        </div>
        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow border border-gray-100 p-8 flex flex-col items-center min-h-[370px]">
          <MdOutlineAccountBalanceWallet className="text-6xl text-red-500 mb-4" />
          <hr className="border-t border-red-400 w-56 my-3" />
          <div className="text-xl font-bold text-center mb-2">
            Connected Banking
          </div>
          <div className="text-gray-700 text-base text-center mb-4">
            Make NEFT, RTGS, and other payments from within the software via
            ICICI Bank, Axis Bank, SBI, and J&K Bank. Get auto bank
            reconciliation with 140+ banks.{" "}
          </div>
          <span className="text-red-500 font-semibold mt-auto text-base inline-block cursor-pointer">
            Watch Video<span className="ml-1">&#8594;</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Features;
