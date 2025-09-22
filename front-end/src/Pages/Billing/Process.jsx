import React from "react";

const Process = () => {
  return (
    <div className="w-full pb-12 bg-gray-100">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center mt-3">
        How Can <span className="text-red-500">GST Billing Software</span> Automate Billing Process?
      </h1>
      <p className="text-center text-gray-600 mb-12">
        Bill Smarter, Faster, and Error-Free with GST Billing Software <br />
        Simplify your entire billing process and boost business productivity with powerful GST billing software. Here’s how it helps:
      </p>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row items-center justify-center md:space-x-12 px-6 md:px-20">
        {/* Left Image */}
        <div className="md:w-1/2 w-full flex justify-center mb-10 md:mb-0">
          <img src="public/Process.jpg" alt="GST Billing Software" className="h-auto w-[70%]" />
        </div>

        {/* Right Features */}
        <div className="md:w-1/2 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
              <h3 className="font-bold text-base mb-1">Instant GST Invoices</h3>
              <p className="text-gray-600 text-sm">Create professional, GST-compliant invoices in just a few clicks—no manual tax calculation needed.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
              <h3 className="font-bold text-base mb-1">Error-Free Billing</h3>
              <p className="text-gray-600 text-sm">Automatic tax and total calculations reduce human errors and ensure 100% accuracy.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
              <h3 className="font-bold text-base mb-1">Faster Customer Billing</h3>
              <p className="text-gray-600 text-sm">Save and auto-fill customer details for quicker repeat billing.</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
              <h3 className="font-bold text-base mb-1">Multiple Sharing Options</h3>
              <p className="text-gray-600 text-sm">Send invoices instantly via WhatsApp, email, or print them—all directly from the software.</p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
              <h3 className="font-bold text-base mb-1">Payment Tracking & Reminders</h3>
              <p className="text-gray-600 text-sm">Track customer payments and send automated reminders for due amounts.</p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
              <h3 className="font-bold text-base mb-1">Real-Time Stock & Discounts</h3>
              <p className="text-gray-600 text-sm">Update item lists, check stock levels, and apply discounts—all while billing.</p>
            </div>

            {/* Feature 7 */}
            <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
              <h3 className="font-bold text-base mb-1">GST Filing Made Easy</h3>
              <p className="text-gray-600 text-sm">File GSTR-1, GSTR-3B, and other returns directly from the software.</p>
            </div>

            {/* Feature 8 */}
            <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
              <h3 className="font-bold text-base mb-1">Smart Business Insights</h3>
              <p className="text-gray-600 text-sm">Access detailed reports on sales, stock, and payments to make better business decisions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
