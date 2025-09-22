import React, { useState, useEffect } from 'react';
import { FaIndustry, FaHome, FaHardHat, FaStore, FaHospital, FaSchool, FaTruck, FaConciergeBell } from 'react-icons/fa';

const IndustryComponent = () => {
  const [activeIndustry, setActiveIndustry] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation trigger on component mount
    setIsVisible(true);
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.industry-item');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const industries = [
    { id: 1, name: 'Manufacturing', icon: <FaIndustry className="h-8 w-8" />, color: 'from-green-400 to-green-600', description: 'Streamline production processes and supply chain management with our specialized manufacturing solutions.' },
    { id: 2, name: 'Real Estate', icon: <FaHome className="h-8 w-8" />, color: 'from-purple-400 to-purple-600', description: 'Manage properties, leases, and client relationships with our comprehensive real estate tools.' },
    { id: 3, name: 'Construction', icon: <FaHardHat className="h-8 w-8" />, color: 'from-yellow-400 to-yellow-600', description: 'Track projects, materials, and timelines with our construction-focused ERP modules.' },
    { id: 4, name: 'Retail', icon: <FaStore className="h-8 w-8" />, color: 'from-blue-400 to-blue-600', description: 'Optimize inventory, sales, and customer experience with our retail management system.' },
    { id: 5, name: 'Healthcare', icon: <FaHospital className="h-8 w-8" />, color: 'from-red-400 to-red-600', description: 'Enhance patient care and streamline medical operations with our healthcare solutions.' },
    { id: 6, name: 'Education', icon: <FaSchool className="h-8 w-8" />, color: 'from-indigo-400 to-indigo-600', description: 'Manage administrative tasks and educational resources with our education-focused platform.' },
    { id: 7, name: 'Logistics', icon: <FaTruck className="h-8 w-8" />, color: 'from-teal-400 to-teal-600', description: 'Optimize shipping, tracking, and supply chain logistics with our advanced tools.' },
    { id: 8, name: 'Hospitality', icon: <FaConciergeBell className="h-8 w-8" />, color: 'from-pink-400 to-pink-600', description: 'Elevate guest experiences and manage operations with our hospitality solutions.' },
  ];

  return (
    <section id="industries" className="industries section py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left column - text content */}
          <div className={`w-full lg:w-2/5 text-center lg:text-left mb-16 lg:mb-0 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Industries </span>we serve
            </h1>
            <p className="text-gray-600 text-lg mb-2 leading-relaxed">
              Discover how our tailored ERP solutions drive efficiency and growth across diverse sectors. 
              From manufacturing to healthcare, our specialized systems address the unique challenges of each industry.
            </p>
            <div className="hidden lg:block bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mr-5 ">
              <h3 className="font-semibold text-gray-800 mb-2">Why industry-specific solutions matter</h3>
              <p className="text-gray-600 text-sm ">
                Each sector has unique workflows and compliance requirements. Our specialized approach ensures 
                your ERP system aligns perfectly with your industry's needs.
              </p>
            </div>
          </div>

          {/* Right column - industry icons */}
          <div className="w-full lg:w-3/5">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {industries.map((industry, index) => (
                <div 
                  key={industry.id}
                  className={`industry-item opacity-0 transition-transform duration-300 hover:scale-105 ${isVisible ? 'delay-' + (index * 100) : ''}`}
                  onMouseEnter={() => setActiveIndustry(industry.id)}
                  onMouseLeave={() => setActiveIndustry(null)}
                >
                  <div className="bg-white rounded-2xl h-40 flex flex-col items-center justify-center p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden group">
                    {/* Animated background gradient on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${industry.color}`}></div>
                    
                    <div className={`h-16 w-16 rounded-full flex justify-center items-center mb-3 bg-gradient-to-br ${industry.color} text-white shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
                      {industry.icon}
                    </div>
                    <h6 className="text-sm font-semibold text-gray-800 text-center">{industry.name}</h6>
                    
                    {/* Description tooltip on hover */}
                    {activeIndustry === industry.id && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg z-10">
                        {industry.description}
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`mt-20 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Ready to transform your business?</h3>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            Explore our solutions
          </button>
        </div>
      </div>

      <style jsx="true">{`
        .industry-item {
          animation-fill-mode: forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .delay-0 { animation-delay: 0ms; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }
        .delay-700 { animation-delay: 700ms; }
      `}</style>
    </section>
  );
};

export default IndustryComponent;