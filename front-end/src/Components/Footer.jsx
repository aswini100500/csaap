import React, { useState, useEffect } from 'react';
import { 
  SiFacebook, 
  SiLinkedin, 
  SiInstagram,
  SiX,
  SiYoutube,
} from "react-icons/si";
import { 
  FaPhone,
  FaEnvelope,
  FaArrowRight,
  FaApple,
  FaGooglePlay
} from "react-icons/fa";
import { FiShoppingBag } from 'react-icons/fi';

const Footer = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="relative text-white overflow-hidden" style={{
        background: "linear-gradient(270deg, rgb(12, 45, 61) 0%, #114591 100%)"
      }}>
        {/* Background Image */}
        <img 
          src="testimonialbg.png" 
          alt="Background" 
          className="absolute w-full h-full opacity-30 z-0 object-cover"
        />
        
        {/* Main Content */}
        <div className="container-fluid relative z-10 pt-12 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-3">
              <div className="flex items-center">
                <span className="sitename">
                  <img src="logo2.png" alt="Company Logo" className="h-[7rem]" />
                </span>
              </div>
              <div className="pt-3">
                <p className="text-gray-200 text-base mb-3">
                  Marg House, Plot No. 7, Wazirpur Press Area, <br />
                  Near D.T.C Depot, Opp. Netaji Subhash Place, <br />
                  Delhi - 110035 (India)
                </p>
                <p className="mt-3 flex items-center text-gray-200 text-base">
                  <FaPhone className="flex-shrink-0 mr-2 w-4 h-4" />
                  Phone: <span className="ml-1">+1 5589 55488 55</span>
                </p>
                <p className="flex items-center text-gray-200 text-base">
                  <FaEnvelope className="flex-shrink-0 mr-2 w-4 h-4" />
                  Email: <span className="ml-1">info@example.com</span>
                </p>
                
                {/* Download App Section */}
                <div className="mt-6">
                  <h4 className="text-[#39c7ff] text-lg font-normal mb-3">
                    Download Our App
                  </h4>
                  <div className="flex flex-col space-y-3">
                    <a 
                      href="#" 
                      className="flex items-center justify-start bg-black text-white py-2 px-4 rounded-lg transition-all hover:bg-gray-800"
                    >
                      <FaApple className="w-6 h-6 mr-2" />
                      <div className="text-left">
                        <div className="text-xs">Download on the</div>
                        <div className="text-sm font-medium">App Store</div>
                      </div>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center justify-start bg-black text-white py-2 px-4 rounded-lg transition-all hover:bg-gray-800"
                    >
                      <FaGooglePlay className="w-5 h-5 mr-2" />
                      <div className="text-left">
                        <div className="text-xs">Get it on</div>
                        <div className="text-sm font-medium">Google Play</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side content */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                {/* Teramind Experience Section */}
                <div className="md:col-span-12 mb-6 p-4 bg-blue-900/30 rounded-lg">
                  <h3 className="text-2xl font-bold text-white mb-3">Start your Csaap ERP Experience</h3>
                  <p className="text-gray-200 mb-4">
                    Manage insider risk, optimize productivity, and enforce compliance with Teramind.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a 
                      href="#" 
                      className="bg-[#ff4b07] hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition-colors text-center"
                    >
                      Start Free Trial
                    </a>
                    <a 
                      href="#" 
                      className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium py-2 px-6 rounded-lg transition-colors text-center"
                    >
                      Get Custom Demo
                    </a>
                  </div>
                </div>

                {/* Description */}
                <div className="md:col-span-12">
                  <p className="text-white font-light text-lg w-full md:w-3/4">
                    Explore the diverse spectrum of industries that benefits from our ERP Solutions. 
                    From manufacturing to healthcare, our ERP system caters to the unique needs of 
                    each sector, fostering growth, efficiency, and success.
                  </p>
                </div>

                {/* Our Services */}
                <div className="md:col-span-3">
                  <h4 className="text-[#39c7ff] text-xl font-normal pb-2 mb-2">
                    Our Services
                  </h4>
                  <ul className="space-y-1">
                    {['Home', 'About Us', 'Pricing', 'Contact Us', 'Blog', 'FAQs'].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <FaArrowRight className="flex-shrink-0 mr-2 w-3 h-3 text-white" />
                        <a href="#" className="text-gray-300 hover:text-[#00aeff] transition-all duration-300 text-base">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Useful Links */}
                <div className="md:col-span-3">
                  <h4 className="text-[#39c7ff] text-xl font-normal pb-3 mb-4">
                    Useful Links
                  </h4>
                  <ul className="space-y-1">
                    {['Refund Policy', 'Privacy Policy', 'Terms & Conditions'].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <FaArrowRight className="flex-shrink-0 mr-2 w-3 h-3 text-white" />
                        <a href="#" className="text-gray-300 hover:text-[#00aeff] transition-all duration-300 text-base">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Newsletter */}
                <div className="md:col-span-3">
                  <h4 className="text-[#39c7ff] text-xl font-normal pb-3 mb-4">
                    Join our newsletter
                  </h4>
                  <div className="space-y-3">
                    <input 
                      type="email" 
                      name="email"
                      placeholder="Your email address"
                      className="w-full bg-white h-11 rounded-lg px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <input 
                      type="submit" 
                      value="Subscribe" 
                      className="submitnewsletter p-3 w-1/2 h-11 bg-[#ff4b07] text-white rounded-lg border-none cursor-pointer text-base hover:bg-orange-600 transition-colors"
                    />
                  </div>
                </div>

                {/* Social Links - Updated with consistent round shape backgrounds */}
                <div className="md:col-span-3 md:ml-[3rem] ml-0">
                  <h4 className="text-[#39c7ff] text-xl font-normal pb-3 mb-4">
                    Follow Us
                  </h4>
                  <div className="social-links flex space-x-3">
                    <a 
                      href="#" 
                      className="flex items-center justify-center w-12 h-12 rounded-full  text-white transition-transform duration-300 hover:scale-110"
                      title="Facebook"
                    >
                      <SiFacebook className="w-6 h-6 text-[#3b5998]" />
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center justify-center w-12 h-12 rounded-full  text-white transition-transform duration-300 hover:scale-110"
                      title="Twitter/X"
                    >
                      <SiX className="w-5 h-5 " />
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center justify-center w-12 h-12 rounded-full  text-white transition-transform duration-300 hover:scale-110"
                      title="LinkedIn"
                    >
                      <SiLinkedin className="w-6 h-6 text-[#0077b5]" />
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center justify-center w-12 h-12 rounded-full text-white transition-transform duration-300 hover:scale-110"
                      title="Instagram"
                    >
                      <SiInstagram className="w-6 h-6 text-[#FFC0CB]" />
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center justify-center w-12 h-12 rounded-full  text-white transition-transform duration-300 hover:scale-110"
                      title="YouTube"
                    >
                      <SiYoutube className="w-6 h-6 text-[#FF0000]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="relative z-10 text-center mt-8 pt-6 border-t border-[#3654a3]">
          <p className="text-white">
            © <span>Copyright</span> <strong className="px-1">Csaap ERP</strong> <span>All Rights Reserved</span>
          </p>
          <div className="credits mt-2 font-semibold">
            Designed by <a href="#" className="text-[#00aeff]">Csaap Erp</a>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 w-12 h-12 bg-blue-600 text-white border-none rounded-full text-xl cursor-pointer shadow-lg transition-all duration-300 hover:bg-blue-700 hover:scale-110 active:scale-95 z-50"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default Footer;