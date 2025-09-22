import React, { useEffect, useRef } from 'react';
import Faq from './Faq';

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    // This effect will handle the animation if we need to control it with JS
    // But we'll primarily use CSS for the animation
  }, []);

  return (
    <section id="hero" className="hero dark-background bg-[#cce0ff] pt-20 pb-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text Content - Order changes on larger screens */}
          <div className="lg:w-5/12 order-2 lg:order-1 mt-10 lg:mt-0" data-aos="zoom-out">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-outfit text-gray-800 mb-4 leading-tight">
              Cloud-Based Billing & Accounting Software
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Run Your Business With Csaap ERP. A Cloud-Based Inventory & Accounting Software
            </p>
            
            {/* Mobile Input and Button */}
            <div className="search bg-white rounded-2xl p-1 shadow-custom mb-6 w-full max-w-md">
              <div className="search-2 relative flex">
                <input 
                  type="text" 
                  placeholder="Mobile number" 
                  className="h-12 w-full pl-5 pr-28 bg-transparent focus:outline-none"
                />
                <button className="absolute right-1 top-1 h-10 bg-[#f6731a] text-white w-24 rounded-xl shadow-orange transition-colors hover:bg-orange-600">
                  Get a Call
                </button>
              </div>
            </div>
            
            <h5 className="text-gray-800 mt-3 mb-6 font-medium">
              Manage your business at just ₹15/day
            </h5>
            
            <div className="mt-4">
              <a href="/book-demo" className="btn-get-started bg-[#2187b6] text-white font-medium px-8 py-3 rounded-full shadow-blue hover:bg-blue-700 transition-colors inline-block">
                Explore Demo Account
              </a>
            </div>
          </div>
          
          {/* Image Content - Order changes on larger screens */}
          <div className="lg:w-7/12 order-1 lg:order-2" data-aos="zoom-out" data-aos-delay="200">
            <div className="relative">
              <img 
                ref={imageRef}
                src="hero-img.png" 
                alt="Cloud-Based Billing Software" 
                className="img-fluid animated mt-5 w-full max-w-2xl mx-auto animate-float"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Add custom animation to Tailwind */}
      <style jsx="true">{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

    </section>
    
  )
}

export default HeroSection;