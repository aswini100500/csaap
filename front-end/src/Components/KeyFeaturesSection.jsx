const KeyFeaturesSection = () => {
  return (
    <>
      <style>
        {`
          .keyfeatures-section {
            scroll-margin-top: 88px;
          }
          .section-title h2 {
            position: relative;
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
          .keyfeatureslist li {
            line-height: 22px;
          }
          
          /* Rotation animation for the entire card */
          .rotating-card {
            transition: transform 0.8s ease;
            transform-style: preserve-3d;
          }
          
          .rotating-card:hover {
            transform: rotateY(360deg);
          }
          
          .rotating-card.rotate-on-click {
            transform: rotateY(360deg);
          }
        `}
      </style>
      
      <div id="keyfeatures-section" className="keyfeatures-section py-16 overflow-hidden scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="section-title text-center pb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-5 pb-5">
              Key Features Of <span className="text-[#343ead]">Our ERP </span>System
            </h2>
          </div>
          
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-8/12 w-full lg:pr-8">
              <ul className="keyfeatureslist space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-[#15baf7] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:w-4/12 w-full mt-8 lg:mt-0 flex items-center justify-center">
              <div 
                className="rotating-card bg-white shadow-xl rounded-2xl p-8 border border-blue-200 h-full w-full max-w-xs cursor-pointer"
                onClick={(e) => {
                  e.currentTarget.classList.toggle('rotate-on-click');
                }}
              >
                <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg">
                  <img src="keyfeatureimg.png" alt="ERP System Visualization" />
                </div>
                <p className="text-center mt-4 text-gray-600">ERP System Visualization</p>
                <p className="text-center text-xs text-gray-400 mt-1">Hover or click to rotate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Feature list data
const features = [
  "Automate various business processes, reducing manual effort and enhancing efficiency",
  "Streamline all your business operations",
  "Automate your Sales Process with CRM Solutions",
  "Improved order processing, inventory management, and timely deliveries",
  "Increase security measures and centralized data management",
  "Manage your Cost of Raw-material and Semi-Finished products and Goods",
  "Complete process from project planning to successfully delivered",
  "Prevents equipment downtime and reduces maintenance costs",
  "AI based GPS-tracker to live track and manage your field employees with a map view",
  "Keep track of asset movements around the company & reduce Mis-management of assets",
  "Streamline task creation & assignment to responsible persons",
  "Payroll management which includes attendance breakup, salary processing, incentives, allowances & performance appraisal"
];

export default KeyFeaturesSection;