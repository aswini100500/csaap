import { FaSignInAlt, FaBuilding, FaFileInvoiceDollar } from 'react-icons/fa';

const Workstep = () => {
  return (
    <section id="workstep" className="workstep bg-white text-black py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center relative mb-12">
          <h2 className="text-center mb-8 text-3xl md:text-4xl font-bold ">
            Working with Csaap Erp <span className="text-blue-400">Online Billing & Accounting Software</span> is simple
          </h2>
          
          <div className="flex flex-wrap justify-center gap-6 w-full">
            {/* Signup Step */}
            <div className="w-full md:w-1/2 lg:w-1/4 xl:w-72 px-2 mb-6">
              <div className="stepbox bg-white shadow-lg rounded-2xl p-6 h-full transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
                <div className="flex justify-center mb-4">
                  <FaSignInAlt className="h-16 w-16 text-blue-400" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-center">Signup</h4>
                <p className="text-black text-center">Click Here on any web browser & Signup with your Login credentials</p>
              </div>
            </div>
            
            {/* Create Company Step */}
            <div className="w-full md:w-1/2 lg:w-1/4 xl:w-72 px-2 mb-6">
              <div className="stepbox bg-white shadow-lg rounded-2xl p-6 h-full transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
                <div className="flex justify-center mb-4">
                  <FaBuilding className="h-16 w-16 text-green-400" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-center">Create Company</h4>
                <p className="text-black text-center">Create your company ledger & fill in the necessary details</p>
              </div>
            </div>
            
            {/* Start Billing Step */}
            <div className="w-full md:w-1/2 lg:w-1/4 xl:w-72 px-2 mb-6">
              <div className="stepbox bg-white shadow-lg rounded-2xl p-6 h-full transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
                <div className="flex justify-center mb-4">
                  <FaFileInvoiceDollar className="h-16 w-16 text-yellow-400" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-center">Start Billing</h4>
                <p className="text-black text-center">Manage your Stock, Ledger, add items & start billing</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center w-full">
          <div className="w-full mt-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How Our Csaap Erp <span className="text-blue-400">Cloud Billing Software</span> Ease Your Business?
            </h2>
            <div className="space-y-4 text-black text-base max-w-full mx-auto px-4">
              <p className="max-w-full">
                Csaap Erp online billing is specially designed to address all business issues with its automated and
                edge-cutting features. This billing software simplifies the billing process. This billing software is an ideal
                option for businesses to transform and make the whole process faster. Csaap Erp online billing software
                is an essential tool that is like a boon for businesses that automates and digitalizes the billing
                process and improves the customer experience. Usually, customers have to wait for a longer time due to
                lengthy queues in supermarkets or any retail store while billing is done manually. However, the POS system
                integration in the software quick-the-counter check-outs. This also allows you to design barcode labels
                that you can scan with scanners. This incredible feature also lets you create instant invoices in bulk
                that can be customized with the company logo & identity and languages, keeping your customers
                connected with you.
              </p>

              <p className="max-w-full">
                Plus, users can send invoices and auto-reminders directly on WhatsApp of their customers with due,
                outstanding, and payment links to ensure timely payment, saving costs on paper & printing. The software
                replaces manual billing with automated billing, elevating accuracy and efficiency. As a business owner,
                you can analyze expenses and all transactions with 24/7 accessibility anywhere on any device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workstep;