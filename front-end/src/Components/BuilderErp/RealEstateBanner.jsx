const RealEstateBanner = () => {
  return (
    <div className="bg-gradient-to-br from-rose-50 via-white to-amber-50 text-gray-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-rose-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-40 animate-pulse-slower"></div>
      
      {/* Geometric patterns */}
      <div className="absolute top-20 right-1/4 w-24 h-24 border-4 border-rose-200 opacity-30 rounded-lg rotate-45"></div>
      <div className="absolute bottom-32 left-1/4 w-16 h-16 border-4 border-rose-300 opacity-40 rounded-full"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Content Section */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
            <div className="mb-6">
              <span className="inline-block bg-gradient-to-r from-maroon-700 to-maroon-900 text-[#a52a2a] text-sm font-semibold px-4 py-2 rounded-full mb-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                Version 2.0 - Now with AI Features
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-5 leading-tight">
  Make over Your <span className="bg-gradient-to-r text-[#a52a2a] bg-clip-text ">Real Estate Business</span>
</h1>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              India's leading Real Estae ERP platform offering AI-driven insights,streamlined workflow automation,and a superior customer experience
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 mb-10">
              <button className="bg-gradient-to-r bg-[#a52a2a] from-maroon-700 to-maroon-900 hover:from-maroon-800 hover:to-maroon-950 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center group">
                <span>Request Free Demo</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
              
              <button className="bg-white border-2 border-maroon-700 text-maroon-700 hover:bg-rose-50 font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center group shadow-md hover:shadow-lg">
                <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span>Download Brochure</span>
              </button>
            </div>
            
            {/* Stats Section with cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-white border-opacity-50">
                <div className="text-3xl font-bold text-maroon-800 mb-1">500+</div>
                <div className="text-gray-600 text-sm">Happy Clients</div>
              </div>
              <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-white border-opacity-50">
                <div className="text-3xl font-bold text-maroon-800 mb-1">98%</div>
                <div className="text-gray-600 text-sm">Client Satisfaction</div>
              </div>
              <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-white border-opacity-50">
                <div className="text-3xl font-bold text-maroon-800 mb-1">50+</div>
                <div className="text-gray-600 text-sm">Cities</div>
              </div>
              <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-white border-opacity-50">
                <div className="text-3xl font-bold text-maroon-800 mb-1">24/7</div>
                <div className="text-gray-600 text-sm">Support</div>
              </div>
            </div>
          </div>
          
          {/* Right Image Section */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-4 bg-rose-100 rounded-2xl transform rotate-3 z-0 animate-pulse"></div>
              <div className="absolute -inset-2 bg-amber-100 rounded-2xl transform -rotate-2 z-0 opacity-70"></div>
              
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-700">
                <img 
                  src="constructionimage.webp" 
                  alt="Modern building construction" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/20 to-transparent"></div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl py-3 px-5 z-20 border border-rose-100 transform hover:scale-105 transition-transform">
                <div className="text-sm font-semibold text-maroon-800">Award Winning</div>
                <div className="text-xs text-gray-600">ERP Solution 2023</div>
              </div>
              
              <div className="absolute -top-4 -left-4 bg-gradient-to-r from-maroon-700 to-maroon-900 text-white rounded-2xl shadow-xl py-3 px-5 z-20 transform hover:scale-105 transition-transform">
                <div className="text-sm font-semibold">AI Powered</div>
                <div className="text-xs opacity-90">Smart Analytics</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation section */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-12 pt-8 border-t border-gray-200 border-opacity-50">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="w-3 h-3 bg-gradient-to-r from-maroon-700 to-maroon-900 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm text-gray-600">Ready to transform your business?</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-maroon-800 font-medium">
            <a href="#" className="hover:text-maroon-700 transition duration-300 flex items-center group">
              <span className="group-hover:underline">View Case Studies</span>
            </a>
            <a href="#" className="hover:text-maroon-700 transition duration-300 flex items-center group">
              <svg className="w-4 h-4 mr-1 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="group-hover:underline">Free Demo</span>
            </a>
            <a href="#" className="hover:text-maroon-700 transition duration-300 flex items-center group">
              <svg className="w-4 h-4 mr-1 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <span className="group-hover:underline">Contact Us</span>
            </a>
          </div>
        </div>
      </div>
      
      <style jsx="true">{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.7; }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.6; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 8s infinite;
        }
      `}</style>
    </div>
  );
};

export default RealEstateBanner;