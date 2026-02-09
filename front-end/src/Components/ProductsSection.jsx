import { 
  FaFileInvoiceDollar, 
  FaMoneyCheckAlt, 
  FaFileContract, 
  FaBoxes,
  FaWhatsapp,
  FaShippingFast,
  FaHandHoldingUsd,
  FaBarcode,
  FaShoppingCart,
  FaPhoneAlt,
  FaQrcode,
  FaChartLine
} from 'react-icons/fa';

const ProductsSection = () => {
  return (
    <>
      <style>
        {`
          .products-section {
            scroll-margin-top: 88px;
            padding: 60px 0;
            overflow: clip;
          }
          .section-title h2:before {
            content: "";
            position: absolute;
            display: block;
            width: 160px;
            height: 1px;
            background: color-mix(in srgb, #444444, transparent 60%);
            left: 0;
            right: 0;
            bottom: 1px;
            margin: auto;
          }
          .section-title h2::after {
            content: "";
            position: absolute;
            display: block;
            width: 60px;
            height: 3px;
            background: #2187b6;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
          }
        `}
      </style>
      
      <div id="products-section" className="products-section section">
        <div className="container mx-auto px-4">
          <div className="row">
            <div className="section-title text-center w-full pb-16">
              <h2 className="text-3xl md:text-4xl font-semibold mb-5 pb-5 relative">
                <span className="text-[#343ead]">Products </span>we provide
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {/* Product 1 */}
              <div className="mb-4">
                <div className="productbox text-center bg-white shadow-xl p-6 transition-all duration-400 h-full border border-blue-200 rounded-2xl hover:shadow-2xl hover:-translate-y-1">
                  <div className="flex justify-center text-4xl mb-4">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                      <FaFileInvoiceDollar />
                    </div>
                  </div>
                  <h4 className="font-semibold text-lg">Free E-invoicing</h4>
                </div>
              </div>

              {/* Product 2 */}
              <div className="mb-4">
                <div className="productbox text-center bg-white shadow-xl p-6 transition-all duration-400 h-full border border-green-200 rounded-2xl hover:shadow-2xl hover:-translate-y-1">
                  <div className="flex justify-center text-4xl mb-4">
                    <div className="p-3 rounded-full bg-green-100 text-green-600">
                      <FaMoneyCheckAlt />
                    </div>
                  </div>
                  <h4 className="font-semibold text-lg">Payments & Reconciliation</h4>
                </div>
              </div>

              {/* Product 3 */}
              <div className="mb-4">
                <div className="productbox text-center bg-white shadow-xl p-6 transition-all duration-400 h-full border border-purple-200 rounded-2xl hover:shadow-2xl hover:-translate-y-1">
                  <div className="flex justify-center text-4xl mb-4">
                    <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                      <FaFileContract />
                    </div>
                  </div>
                  <h4 className="font-semibold text-lg">GST Billing & Return Filing</h4>
                </div>
              </div>

              {/* Product 4 */}
              <div className="mb-4">
                <div className="productbox text-center bg-white shadow-xl p-6 transition-all duration-400 h-full border border-orange-200 rounded-2xl hover:shadow-2xl hover:-translate-y-1">
                  <div className="flex justify-center text-4xl mb-4">
                    <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                      <FaBoxes />
                    </div>
                  </div>
                  <h4 className="font-semibold text-lg">Inventory Management</h4>
                </div>
              </div>

              {/* Product 5 */}
              <div className="mb-4">
                <div className="productbox text-center bg-white shadow-xl p-6 transition-all duration-400 h-full border border-green-200 rounded-2xl hover:shadow-2xl hover:-translate-y-1">
                  <div className="flex justify-center text-4xl mb-4">
                    <div className="p-3 rounded-full bg-green-100 text-green-600">
                      <FaWhatsapp />
                    </div>
                  </div>
                  <h4 className="font-semibold text-lg">Bills, O/s on Whatsapp</h4>
                </div>
              </div>

              {/* Product 6 */}
              <div className="mb-4">
                <div className="productbox text-center bg-white shadow-xl p-6 transition-all duration-400 h-full border border-red-200 rounded-2xl hover:shadow-2xl hover:-translate-y-1">
                  <div className="flex justify-center text-4xl mb-4">
                    <div className="p-3 rounded-full bg-red-100 text-red-600">
                      <FaShippingFast />
                    </div>
                  </div>
                  <h4 className="font-semibold text-lg">Online Import Purchase</h4>
                </div>
              </div>

              {/* Product 7 */}
              <div className="mb-4">
                <div className="productbox text-center bg-white shadow-xl p-6 transition-all duration-400 h-full border border-teal-200 rounded-2xl hover:shadow-2xl hover:-translate-y-1">
                  <div className="flex justify-center text-4xl mb-4">
                    <div className="p-3 rounded-full bg-teal-100 text-teal-600">
                      <FaHandHoldingUsd />
                    </div>
                  </div>
                  <h4 className="font-semibold text-lg">Purchase & Sale Claim</h4>
                </div>
              </div>

              {/* Product 8 */}
              <div className="mb-4">
                <div className="productbox text-center bg-white shadow-xl p-6 transition-all duration-400 h-full border border-indigo-200 rounded-2xl hover:shadow-2xl hover:-translate-y-1">
                  <div className="flex justify-center text-4xl mb-4">
                    <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                      <FaBarcode />
                    </div>
                  </div>
                  <h4 className="font-semibold text-lg">Barcode Management</h4>
                </div>
              </div>

              {/* Product 9 */}
              <div className="mb-4">
                <div className="productbox text-center bg-white shadow-xl p-6 transition-all duration-400 h-full border border-pink-200 rounded-2xl hover:shadow-2xl hover:-translate-y-1">
                  <div className="flex justify-center text-4xl mb-4">
                    <div className="p-3 rounded-full bg-pink-100 text-pink-600">
                      <FaShoppingCart />
                    </div>
                  </div>
                  <h4 className="font-semibold text-lg">eRetail Web Application</h4>
                </div>
              </div>

              {/* Product 10 */}
              <div className="mb-4">
                <div className="productbox text-center bg-white shadow-xl p-6 transition-all duration-400 h-full border border-cyan-200 rounded-2xl hover:shadow-2xl hover:-translate-y-1">
                  <div className="flex justify-center text-4xl mb-4">
                    <div className="p-3 rounded-full bg-cyan-100 text-cyan-600">
                      <FaPhoneAlt />
                    </div>
                  </div>
                  <h4 className="font-semibold text-lg">Direct Calling</h4>
                </div>
              </div>

              {/* Product 11 */}
              <div className="mb-4">
                <div className="productbox text-center bg-white shadow-xl p-6 transition-all duration-400 h-full border border-amber-200 rounded-2xl hover:shadow-2xl hover:-translate-y-1">
                  <div className="flex justify-center text-4xl mb-4">
                    <div className="p-3 rounded-full bg-amber-100 text-amber-600">
                      <FaQrcode />
                    </div>
                  </div>
                  <h4 className="font-semibold text-lg">My Shop QR Code</h4>
                </div>
              </div>

              {/* Product 12 */}
              <div className="mb-4">
                <div className="productbox text-center bg-white shadow-xl p-6 transition-all duration-400 h-full border border-lime-200 rounded-2xl hover:shadow-2xl hover:-translate-y-1">
                  <div className="flex justify-center text-4xl mb-4">
                    <div className="p-3 rounded-full bg-lime-100 text-lime-600">
                      <FaChartLine />
                    </div>
                  </div>
                  <h4 className="font-semibold text-lg">Live Management</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsSection;