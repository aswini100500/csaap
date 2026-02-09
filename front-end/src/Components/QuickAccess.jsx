const QuickAccess = () => {
  return (
    <section className="quickaccess relative text-white py-16 min-h-screen">
      {/* Background container with image and gradient */}
      <div className="absolute inset-0 flex">
        {/* Image covering 60% of the width */}
        <div className="w-[60%] bg-cover bg-center" style={{ backgroundImage: "url('leftimg1.jpg')" }}></div>
        {/* Gradient covering remaining 40% */}
        <div className="w-[40%] bg-gradient-to-r from-[#007f7c] to-[#2785c1]"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3"></div>
          <div className="lg:w-2/3 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-center -mt-8 mb-5">
              Quick to Access, Easy to Operate
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <div className="contentbox bg-white p-6 min-h-[310px] shadow-lg rounded-xl">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">User-Friendly</h2>
                  <p className="text-gray-600">
                    Csaap Erp software is a user-friendly system that is designed to help businesses. With the help
                    of this software, any business person can easily access inventory, financial reports and
                    expenses from anywhere & anytime, making it easy for businesses to manage their finances.
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <div className="contentbox bg-white p-6 min-h-[310px] shadow-lg rounded-xl">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Easy Online Billing Software</h2>
                  <p className="text-gray-600">
                    Creating a bill in Margbooks cloud based billing software is a simple process. It can also
                    automatically calculate taxes and apply discounts on bills, making billing easy, precise, and
                    efficient altogether. Additionally, you can customize invoices and send them directly to
                    customers on WhatsApp.
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <div className="contentbox bg-white p-6 min-h-[310px] shadow-lg rounded-xl">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Easy Inventory Management</h2>
                  <p className="text-gray-600">
                    Inventory management in Margbooks allows tracking, setting reorder points, managing products,
                    and efficiently preventing stock shortages. Further, the software alerts its users about expired
                    and near-expiry items which lessens the losses on dumping stock. It also allows its users to
                    categorise the stock based on colour, size, brand, etc.
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <div className="contentbox bg-white p-6 min-h-[310px] shadow-lg rounded-xl">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">On-The-Go Online Accounting Software</h2>
                  <p className="text-gray-600">
                    Keeping accounting accurate and error-free is every business need which is easily possible with
                    Margbooks cloud based Accounting Software that offers mobile accounting, enabling users to
                    manage accounts, and financial statements, and enable them to access financial data while on the
                    go.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickAccess;