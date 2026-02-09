import React from 'react';
import { 
  BsBoundingBoxCircles, 
  BsPatchCheck, 
  BsBroadcast, 
  BsGooglePlay 
} from 'react-icons/bs';

const ServicesSection = () => {
  return (
    <section id="services" className="services section bg-gray-50 py-16">
      {/* Section Title */}
      <div className="container mx-auto px-4 section-title" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-15 p-5">
          India's <span className="text-blue-600">No. 1 True Cloud Based </span>Billing & Accounting Software
        </h2>
      </div>
      {/* End Section Title */}
      
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6">
          {/* Service Item 1 */}
          <div className="w-56">
            <div className="service-item bg-white shadow-lg p-10 relative transition-all duration-300 ease-in-out h-full border border-blue-200 rounded-xl hover:-translate-y-2.5">
              <div className="icon mb-4 flex justify-center">
                <BsBoundingBoxCircles className="text-blue-500 text-4xl" />
              </div>
              <h4 className="font-semibold text-xl mb-2 text-center">10 million+</h4>
              <p className="leading-6 text-sm text-center mb-0">Happy Users</p>
            </div>
          </div>
          {/* End Service Item */}
          
          {/* Service Item 2 */}
          <div className="w-56">
            <div className="service-item bg-white shadow-lg p-10 relative transition-all duration-300 ease-in-out h-full border border-blue-200 rounded-xl hover:-translate-y-2.5">
              <div className="icon mb-4 flex justify-center">
                <BsBoundingBoxCircles className="text-blue-500 text-4xl" />
              </div>
              <h4 className="font-semibold text-xl mb-2 text-center">500+</h4>
              <p className="leading-6 text-sm text-center mb-0">Sales & Support Centers in India</p>
            </div>
          </div>
          {/* End Service Item */}
          
          {/* Service Item 3 */}
          <div className="w-56">
            <div className="service-item bg-white shadow-lg p-10 relative transition-all duration-300 ease-in-out h-full border border-blue-200 rounded-xl hover:-translate-y-2.5">
              <div className="icon mb-4 flex justify-center">
                <BsPatchCheck className="text-blue-500 text-4xl" />
              </div>
              <h4 className="font-semibold text-xl mb-2 text-center">30+</h4>
              <p className="leading-6 text-sm text-center mb-0">Years of Experience</p>
            </div>
          </div>
          {/* End Service Item */}
          
          {/* Service Item 4 */}
          <div className="w-56">
            <div className="service-item bg-white shadow-lg p-10 relative transition-all duration-300 ease-in-out h-full border border-blue-200 rounded-xl hover:-translate-y-2.5">
              <div className="icon mb-4 flex justify-center">
                <BsBroadcast className="text-blue-500 text-4xl" />
              </div>
              <h4 className="font-semibold text-xl mb-2 text-center">Multi-device</h4>
              <p className="leading-6 text-sm text-center mb-0">Use Together on Mobile/Desktop</p>
            </div>
          </div>
          {/* End Service Item */}
          
          {/* Service Item 5 */}
          <div className="w-56">
            <div className="service-item bg-white shadow-lg p-10 relative transition-all duration-300 ease-in-out h-full border border-blue-200 rounded-xl hover:-translate-y-2.5">
              <div className="icon mb-4 flex justify-center">
                <BsGooglePlay className="text-blue-500 text-4xl" />
              </div>
              <h4 className="font-semibold text-xl mb-2 text-center">Rated 4.8/5</h4>
              <p className="leading-6 text-sm text-center mb-0">On Google & Google Play Store</p>
            </div>
          </div>
          {/* End Service Item */}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;