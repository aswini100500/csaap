import React, { useState, useEffect } from 'react';

const BenefitsSection = () => {
  const [hoveredData, setHoveredData] = useState(null);
  
  // Using free placeholder images from Pexels
  const imageUrls = {
    'free-invoicing.png': 'https://images.pexels.com/photos/4386433/pexels-photo-4386433.jpeg?auto=compress&cs=tinysrgb&w=600',
    'payment-reconciliation.png': 'https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg?auto=compress&cs=tinysrgb&w=600',
    'gst-billing.png': 'https://images.pexels.com/photos/6771608/pexels-photo-6771608.jpeg?auto=compress&cs=tinysrgb&w=600',
    'inventory-management.png': 'https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=600',
    'whatsapp-bills.png': 'https://images.pexels.com/photos/6214470/pexels-photo-6214470.jpeg?auto=compress&cs=tinysrgb&w=600',
    'import-purchase.png': 'https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=600',
    'sale-claim.png': 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=600',
    'barcode-management.png': 'https://images.pexels.com/photos/6214477/pexels-photo-6214477.jpeg?auto=compress&cs=tinysrgb&w=600',
    'eretail-app.png': 'https://images.pexels.com/photos/6214478/pexels-photo-6214478.jpeg?auto=compress&cs=tinysrgb&w=600',
    'direct-calling.png': 'https://images.pexels.com/photos/6214479/pexels-photo-6214479.jpeg?auto=compress&cs=tinysrgb&w=600',
    'shop-qr.png': 'https://images.pexels.com/photos/6214480/pexels-photo-6214480.jpeg?auto=compress&cs=tinysrgb&w=600',
    'live-management.png': 'https://images.pexels.com/photos/6214481/pexels-photo-6214481.jpeg?auto=compress&cs=tinysrgb&w=600',
  };
  
  const products = [
    {
      productName: 'Free E-Invoicing',
      description: 'Get 100% Free E-invoicing and easily generate error-free e-invoices without going to the portal with zero downtime using MargERP',
      image: 'free-invoicing.png'
    },
    {
      productName: 'Payment & Reconciliation',
      description: 'Simplify your payments & bill-by-bill reconciliation using Marg Pay at 0% service charges & 2% cashback for retailers',
      image: 'payment-reconciliation.png'
    },
    {
      productName: 'GST Billing & Return Filing',
      description: 'Create GST invoices, multiple e-way bills & directly upload files in Excel, JSON or CSV format in GST portal and file GST returns',
      image: 'gst-billing.png'
    },
    {
      productName: 'Inventory Management',
      description: 'Manage Focused, Dump and Near-Expiry stock level, set reorder points to replenish stock with Push Sale features',
      image: 'inventory-management.png'
    },
    {
      productName: 'Bills, O/s on Whatsapp',
      description: 'Send Invoices, Outstandings, Stock and Sale Analysis etc. & various reports to customers directly on WhatsApp through Software',
      image: 'whatsapp-bills.png'
    },
    {
      productName: 'Online Import Purchase',
      description: 'No need to feed manual Purchase. Import bill from any Excel or CSV format to save time with 100% accuracy.',
      image: 'import-purchase.png'
    },
    {
      productName: 'Purchase Sale Claim',
      description: 'Get timely reminders & keep a track of benefits of claim against the purchases which is being done with Claims & Statements feature.',
      image: 'sale-claim.png'
    },
    {
      productName: 'Barcode Management',
      description: 'Efficiently manage barcodes for all your products. Generate, print, and track barcodes to streamline your inventory processes.',
      image: 'barcode-management.png'
    },
    {
      productName: 'eRetail Web Application',
      description: 'Directly place online orders to distributors & check status of all orders, View nearby distributors, schemes inside Marg ERP.',
      image: 'eretail-app.png'
    },
    {
      productName: 'Direct Calling',
      description: 'To simplify the order taking process, connect your mobile with system by scanning QR code & place calls directly to customer for receiving orders.',
      image: 'direct-calling.png'
    },
    {
      productName: 'My Shop QR Code',
      description: 'List & upload products, schemes, offers in QR code. Print & paste outside shop/ counter where customers can directly scan & place orders.',
      image: 'shop-qr.png'
    },
    {
      productName: 'Live Management',
      description: 'Set & Track the credit limit for customers to save huge losses. Get live notification during billing whenever limit is reached.',
      image: 'live-management.png'
    },
  ];

  useEffect(() => {
    // Set initial hovered data to the first product
    if (products.length > 0 && !hoveredData) {
      setHoveredData(products[0]);
    }
  }, [hoveredData, products]);

  const onMouseOver = (product) => {
    setHoveredData(product);
  };

  return (
    <section id="benefits" className="benefits-section py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full lg:w-10/12">
            <div className="heading text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800">
                Benefits Of Using <span className="text-blue-500">Csaap ERP</span> Software
              </h1>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Discover all the powerful features that make csaap ERP the perfect solution for your business management needs.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column: Buttons with scroll */}
          <div className="w-full md:w-1/3">
            <div className="button-container bg-white rounded-xl shadow-md p-4 h-96 overflow-y-auto">
              {products.map((product, index) => (
                <button
                  key={index}
                  className={`navbutton my-1 py-3 px-4 text-left rounded-lg  transition-all w-full cursor-pointer ${
                    hoveredData && hoveredData.productName === product.productName
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-800 hover:bg-blue-100'
                  }`}
                  onMouseOver={() => onMouseOver(product)}
                  onClick={() => onMouseOver(product)}
                >
                  <div className="flex items-center">
                    <span className="mr-3 font-semibold">{index + 1}.</span>
                    <span>{product.productName}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Display Data */}
          <div className="w-full md:w-2/3">
            <div className="stepbox bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-xl shadow-lg h-96 flex flex-col justify-center">
              {hoveredData ? (
                <div className="flex flex-col md:flex-row items-center h-full">
                  <div className="w-full md:w-7/12 pr-0 md:pr-6 ">
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      {hoveredData.productName}
                    </h3>
                    <p className="text-blue-100 text-lg leading-relaxed">
                      {hoveredData.description}
                    </p>
                    <button className="mt-6 bg-white text-blue-600 hover:bg-blue-50 font-medium py-2 px-6 rounded-lg transition-colors cursor-pointer">
                      Learn More
                    </button>
                  </div>
                  <div className="w-full md:w-5/12 mt-6 md:mt-0 flex justify-center">
                    <img 
                      src={imageUrls[hoveredData.image]} 
                      alt={hoveredData.productName} 
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-white text-center">
                  <p>Select a feature to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .benefits-section {
          font-family: 'Inter', sans-serif;
        }
        
        .button-container {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e0 #f7fafc;
        }
        
        .button-container::-webkit-scrollbar {
          width: 6px;
        }
        
        .button-container::-webkit-scrollbar-track {
          background: #f7fafc;
          border-radius: 10px;
        }
        
        .button-container::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 10px;
        }
        
        .button-container::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }
        
        .navbutton {
          transition: all 0.3s ease;
          border: none;
          text-align: left;
        }
        
        .stepbox {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        }
        
        @media (max-width: 768px) {
          .button-container {
            height: 200px;
            margin-bottom: 1rem;
          }
          
          .stepbox {
            height: auto;
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default BenefitsSection;