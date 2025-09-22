import React, { useState } from 'react';

const CloudBasedTab = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  
   

  return (
    <section id="introduction" className="introduction section py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="w-full md:w-1/2 lg:w-5/12 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              What is <span className="text-blue-600">Cloud Based Accounting Software </span> for Your Business?
            </h1>
            <p className="text-gray-700 mb-6">
              Cloud accounting software is a system in which businesses can maintain their accounting data
              and books - Balance Sheet, Profit & Loss, etc. on the cloud that can be accessed anytime with a strong
              internet connection. With online accounting software, users stay informed about their financial
              condition, helping them to make informed decisions. All sizes of businesses can use the software to
              enhance business performance for rapid growth. The key advantage of
              this system is that it comes with multiple layers of security, safeguarding accounting data from any
              cyber-attacks.
            </p>
            
          
          </div>
          
          <div className="w-full md:w-1/2 lg:w-5/12">
            <img 
              src="why-us.png" 
              alt="Cloud Based Accounting" 
              className="w-full h-auto"
            />
          </div>
        </div>
              </div>
    </section>
  );
};

export default CloudBasedTab;