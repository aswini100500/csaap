// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import { 
//   SiFacebook, 
//   SiLinkedin, 
//   SiInstagram,
//   SiX,
//   SiYoutube,
// } from "react-icons/si";
// import { 
//   FaPhone,
//   FaEnvelope,
//   FaArrowRight,
//   FaApple,
//   FaGooglePlay
// } from "react-icons/fa";
// import { FiShoppingBag } from 'react-icons/fi';

// const Footer = () => {
//   const [showScrollButton, setShowScrollButton] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setShowScrollButton(window.scrollY > 200);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Define routes for each menu item
//   const servicesRoutes = [
//     { name: 'Home', path: '/' },
//     { name: 'About Us', path: '/about' },
//     { name: 'Pricing', path: '/pricing' },
//     { name: 'Contact Us', path: '/contact' },
//     { name: 'Blog', path: '/blog' },
//     { name: 'FAQs', path: '/faqs' },
//     { name: ' builderERP', path: '/builder-erp' }
//   ];

//   const usefulLinksRoutes = [
//     { name: 'Refund Policy', path: '/refund-policy' },
//     { name: 'Privacy Policy', path: '/privacy-policy' },
//     { name: 'Terms & Conditions', path: '/terms-conditions' }
//   ];

//   const socialLinks = [
//     { icon: SiFacebook, href: 'https://facebook.com/yourpage', color: 'text-[#3b5998]' },
//     { icon: SiX, href: 'https://twitter.com/yourpage', color: 'text-white' },
//     { icon: SiLinkedin, href: 'https://linkedin.com/company/yourcompany', color: 'text-[#0077b5]' },
//     { icon: SiInstagram, href: 'https://instagram.com/yourpage', color: 'text-[#FFC0CB]' },
//     { icon: SiYoutube, href: 'https://youtube.com/yourchannel', color: 'text-[#FF0000]' }
//   ];

//   return (
//     <>
//       <footer className="relative text-white overflow-hidden" style={{
//         background: "linear-gradient(270deg, rgb(12, 45, 61) 0%, #114591 100%)"
//       }}>
//         {/* Background Image */}
//         <img 
//           src="testimonialbg.png" 
//           alt="Background" 
//           className="absolute w-full h-full opacity-30 z-0 object-cover"
//         />
        
//         {/* Main Content */}
//         <div className="container-fluid relative z-10 pt-12 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//             {/* Company Info */}
//             <div className="lg:col-span-3">
//               <div className="flex items-center">
//                 <Link to="/" className="sitename">
//                   <img src="logo2.png" alt="Company Logo" className="h-[7rem]" />
//                 </Link>
//               </div>
//               <div className="pt-3">
//                 <p className="text-gray-200 text-base mb-3">
//                   Marg House, Plot No. 7, Wazirpur Press Area, <br />
//                   Near D.T.C Depot, Opp. Netaji Subhash Place, <br />
//                   Delhi - 110035 (India)
//                 </p>
//                 <p className="mt-3 flex items-center text-gray-200 text-base">
//                   <FaPhone className="flex-shrink-0 mr-2 w-4 h-4" />
//                   Phone: <span className="ml-1">+1 5589 55488 55</span>
//                 </p>
//                 <p className="flex items-center text-gray-200 text-base">
//                   <FaEnvelope className="flex-shrink-0 mr-2 w-4 h-4" />
//                   Email: <span className="ml-1">info@example.com</span>
//                 </p>
                
//                 {/* Download App Section */}
//                 <div className="mt-6">
//                   <h4 className="text-[#39c7ff] text-lg font-normal mb-3">
//                     Download Our App
//                   </h4>
//                   <div className="flex flex-col space-y-3">
//                     <a 
//                       href="#" 
//                       className="flex items-center justify-start bg-black text-white py-2 px-4 rounded-lg transition-all hover:bg-gray-800"
//                     >
//                       <FaApple className="w-6 h-6 mr-2" />
//                       <div className="text-left">
//                         <div className="text-xs">Download on the</div>
//                         <div className="text-sm font-medium">App Store</div>
//                       </div>
//                     </a>
//                     <a 
//                       href="#" 
//                       className="flex items-center justify-start bg-black text-white py-2 px-4 rounded-lg transition-all hover:bg-gray-800"
//                     >
//                       <FaGooglePlay className="w-5 h-5 mr-2" />
//                       <div className="text-left">
//                         <div className="text-xs">Get it on</div>
//                         <div className="text-sm font-medium">Google Play</div>
//                       </div>
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right side content */}
//             <div className="lg:col-span-8">
//               <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
//                 {/* Teramind Experience Section */}
//                 <div className="md:col-span-12 mb-6 p-4 bg-blue-900/30 rounded-lg">
//                   <h3 className="text-2xl font-bold text-white mb-3">Start your Csaap ERP Experience</h3>
//                   <p className="text-gray-200 mb-4">
//                     Manage insider risk, optimize productivity, and enforce compliance with Teramind.
//                   </p>
//                   <div className="flex flex-col sm:flex-row gap-3">
//                     <Link 
//                       to="/free-trial" 
//                       className="bg-[#ff4b07] hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition-colors text-center"
//                     >
//                       Start Free Trial
//                     </Link>
//                     <Link 
//                       to="/demo" 
//                       className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium py-2 px-6 rounded-lg transition-colors text-center"
//                     >
//                       Get Custom Demo
//                     </Link>
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <div className="md:col-span-12">
//                   <p className="text-white font-light text-lg w-full md:w-3/4">
//                     Explore the diverse spectrum of industries that benefits from our ERP Solutions. 
//                     From manufacturing to healthcare, our ERP system caters to the unique needs of 
//                     each sector, fostering growth, efficiency, and success.
//                   </p>
//                 </div>

//                 {/* Our Services */}
//                 <div className="md:col-span-3">
//                   <h4 className="text-[#39c7ff] text-xl font-normal pb-2 mb-2">
//                     Our Services
//                   </h4>
//                   <ul className="space-y-1">
//                     {servicesRoutes.map((item, index) => (
//                       <li key={index} className="flex items-center">
//                         <FaArrowRight className="flex-shrink-0 mr-2 w-3 h-3 text-white" />
//                         <Link 
//                           to={item.path} 
//                           className="text-gray-300 hover:text-[#00aeff] transition-all duration-300 text-base"
//                         >
//                           {item.name}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 {/* Useful Links */}
//                 <div className="md:col-span-3">
//                   <h4 className="text-[#39c7ff] text-xl font-normal pb-3 mb-4">
//                     Useful Links
//                   </h4>
//                   <ul className="space-y-1">
//                     {usefulLinksRoutes.map((item, index) => (
//                       <li key={index} className="flex items-center">
//                         <FaArrowRight className="flex-shrink-0 mr-2 w-3 h-3 text-white" />
//                         <Link 
//                           to={item.path} 
//                           className="text-gray-300 hover:text-[#00aeff] transition-all duration-300 text-base"
//                         >
//                           {item.name}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 {/* Newsletter */}
//                 <div className="md:col-span-3">
//                   <h4 className="text-[#39c7ff] text-xl font-normal pb-3 mb-4">
//                     Join our newsletter
//                   </h4>
//                   <div className="space-y-3">
//                     <input 
//                       type="email" 
//                       name="email"
//                       placeholder="Your email address"
//                       className="w-full bg-white h-11 rounded-lg px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                     />
//                     <input 
//                       type="submit" 
//                       value="Subscribe" 
//                       className="submitnewsletter p-3 w-1/2 h-11 bg-[#ff4b07] text-white rounded-lg border-none cursor-pointer text-base hover:bg-orange-600 transition-colors"
//                     />
//                   </div>
//                 </div>

//                 {/* Social Links */}
//                 <div className="md:col-span-3 md:ml-[3rem] ml-0">
//                   <h4 className="text-[#39c7ff] text-xl font-normal pb-3 mb-4">
//                     Follow Us
//                   </h4>
//                   <div className="social-links flex space-x-3">
//                     {socialLinks.map((social, index) => (
//                       <a 
//                         key={index}
//                         href={social.href} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         className="flex items-center justify-center w-12 h-12 rounded-full text-white transition-transform duration-300 hover:scale-110"
//                         title={social.icon.name.replace('Si', '')}
//                       >
//                         <social.icon className={`w-6 h-6 ${social.color}`} />
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Copyright Section */}
//         <div className="relative z-10 text-center mt-8 pt-6 border-t border-[#3654a3]">
//           <p className="text-white">
//             © <span>Copyright</span> <strong className="px-1">Csaap ERP</strong> <span>All Rights Reserved</span>
//           </p>
//           <div className="credits mt-2 font-semibold">
//             Designed by <Link to="/" className="text-[#00aeff]">Csaap Erp</Link>
//           </div>
//         </div>
//       </footer>

//       {/* Scroll to Top Button */}
//       {showScrollButton && (
//         <button 
//           onClick={scrollToTop}
//           className="fixed bottom-5 right-5 w-12 h-12 bg-blue-600 text-white border-none rounded-full text-xl cursor-pointer shadow-lg transition-all duration-300 hover:bg-blue-700 hover:scale-110 active:scale-95 z-50"
//         >
//           ↑
//         </button>
//       )}
//     </>
//   );
// };

// export default Footer;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

  // Define routes for each menu item
  const servicesRoutes = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQs', path: '/faqs' },
    { name: ' builderERP', path: '/builder-erp' }
  ];

  const usefulLinksRoutes = [
    { name: 'Refund Policy', path: '/refund-policy' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms & Conditions', path: '/terms-conditions' }
  ];

  const socialLinks = [
    { icon: SiFacebook, href: 'https://www.facebook.com/people/Csaap/61582241901891/', color: 'text-[#3b5998]' },
    // { icon: SiX, href: 'https://twitter.com/yourpage', color: 'text-white' },
    // { icon: SiLinkedin, href: 'https://linkedin.com/company/yourcompany', color: 'text-[#0077b5]' },
    { icon: SiInstagram, href: 'https://www.instagram.com/csaap.official?igsh=MWxvZ2c3OGxoemFteA==', color: 'text-[#FFC0CB]' },
    { icon: SiYoutube, href: 'https://www.youtube.com/@Csaapindia', color: 'text-[#FF0000]' }
  ];

  return (
    <>
      <footer className="relative text-white overflow-hidden bg-[#0D1B2A]">
        {/* Main Content */}
        <div className="container-fluid relative z-10 pt-12 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-3">
              <div className="flex items-center">
                    <Link to="/" className="sitename">
      <img src="logo2.png" alt="Company Logo" className="h-[7rem]" />
    </Link>
  </div>
  <div className="pt-3">
    <div className="text-gray-200 text-base mb-3">
      <h1>Head office :</h1> 
      H No-511, Sarahah Tower, Subhash Nagar, Gurugram, India., <br />
      <h1 className='text-red'>Branch office :</h1> 
      Room No-12, 2nd Floor, BMC Panchadeep Market Complex, Bhoumya Nagar, Unit -4, Bhubaneswar, India
      <br />
      Delhi - 110035 (India)
    </div>
                <p className="mt-3 flex items-center text-gray-200 text-base">
                  <FaPhone className="flex-shrink-0 mr-2 w-4 h-4" />
                  Phone: <span className="ml-1">+91 9910877219</span>
                </p>
                <p className="flex items-center text-gray-200 text-base">
                  <FaEnvelope className="flex-shrink-0 mr-2 w-4 h-4" />
                  Email: <span className="ml-1">info@csaap.com</span>
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
                <div className="md:col-span-12 mb-6 p-4 bg-blue-800/50 rounded-lg">
                  <h3 className="text-2xl font-bold text-white mb-3">Start your Csaap ERP Experience</h3>
                  <p className="text-gray-200 mb-4">
                    Manage insider risk, optimize productivity, and enforce compliance with Teramind.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link 
                      to="/free-trial" 
                      className="bg-[#ff4b07] hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition-colors text-center"
                    >
                      Start Free Trial
                    </Link>
                    <Link 
                      to="/demo" 
                      className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium py-2 px-6 rounded-lg transition-colors text-center"
                    >
                      Get Custom Demo
                    </Link>
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
                    {servicesRoutes.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <FaArrowRight className="flex-shrink-0 mr-2 w-3 h-3 text-white" />
                        <Link 
                          to={item.path} 
                          className="text-gray-300 hover:text-[#00aeff] transition-all duration-300 text-base"
                        >
                          {item.name}
                        </Link>
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
                    {usefulLinksRoutes.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <FaArrowRight className="flex-shrink-0 mr-2 w-3 h-3 text-white" />
                        <Link 
                          to={item.path} 
                          className="text-gray-300 hover:text-[#00aeff] transition-all duration-300 text-base"
                        >
                          {item.name}
                        </Link>
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

                {/* Social Links */}
                <div className="md:col-span-3 md:ml-[3rem] ml-0">
                  <h4 className="text-[#39c7ff] text-xl font-normal pb-3 mb-4">
                    Follow Us
                  </h4>
                  <div className="social-links flex space-x-3">
                    {socialLinks.map((social, index) => (
                      <a 
                        key={index}
                        href={social.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-12 h-12 rounded-full text-white transition-transform duration-300 hover:scale-110"
                        title={social.icon.name.replace('Si', '')}
                      >
                        <social.icon className={`w-6 h-6 ${social.color}`} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="relative z-10 text-center mt-8 pt-6 border-t border-blue-700">
          <p className="text-white">
            © <span>Copyright</span> <strong className="px-1">Csaap ERP</strong> <span>All Rights Reserved</span>
          </p>
          <div className="credits mt-2 font-semibold">
            Designed by <Link to="/" className="text-[#00aeff]">Csaap Erp</Link>
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