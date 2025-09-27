// import React, { useState, useEffect, useRef } from 'react';
// import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

// const Testimonials = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const carouselRef = useRef(null);

//   const testimonials = [
//     {
//       id: 1,
//       name: "Saul Goodman",
//       image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
//       content: "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.",
//       rating: 5
//     },
//     {
//       id: 2,
//       name: "Sara Wilsson",
//       image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80",
//       content: "Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.",
//       rating: 5
//     },
//     {
//       id: 3,
//       name: "Jena Karlis",
//       image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1899&q=80",
//       content: "Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.",
//       rating: 5
//     },
//     {
//       id: 4,
//       name: "Matt Brandon",
//       image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
//       content: "Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.",
//       rating: 5
//     },
//     {
//       id: 5,
//       name: "John Larson",
//       image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1890&q=80",
//       content: "Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.",
//       rating: 5
//     },
//     {
//       id: 6,
//       name: "Emily Johnson",
//       image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//       content: "MargBooks has completely transformed how I manage my business finances. The interface is intuitive and the reporting features are exceptional.",
//       rating: 5
//     },
//     {
//       id: 7,
//       name: "Michael Chen",
//       image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
//       content: "As a small business owner, I've tried many accounting solutions. MargBooks stands out for its simplicity and powerful features.",
//       rating: 5
//     },
//     {
//       id: 8,
//       name: "Sophia Williams",
//       image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
//       content: "The customer support team at MargBooks is phenomenal. They're always ready to help and provide quick solutions to any issues.",
//       rating: 5
//     },
//     {
//       id: 9,
//       name: "David Rodriguez",
//       image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//       content: "I've been using MargBooks for over a year now and it has streamlined my accounting processes significantly. Highly recommended!",
//       rating: 5
//     },
//     {
//       id: 10,
//       name: "Lisa Thompson",
//       image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
//       content: "The mobile app makes it so easy to manage invoices and expenses on the go. MargBooks has been a game-changer for my business.",
//       rating: 5
//     },
//     {
//       id: 11,
//       name: "Robert Kim",
//       image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
//       content: "I love how MargBooks integrates with my bank accounts and credit cards. It saves me hours of manual data entry each month.",
//       rating: 5
//     },
//     {
//       id: 12,
//       name: "Amanda Wilson",
//       image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
//       content: "The tax preparation features have made filing season so much less stressful. MargBooks keeps everything organized throughout the year.",
//       rating: 5
//     }
//   ];

//   // Auto slide every 5 seconds
//   useEffect(() => {
//     let interval;
//     if (isAutoPlaying) {
//       interval = setInterval(() => {
//         setCurrentIndex((prev) => (prev + 1) % testimonials.length);
//       }, 5000);
//     }
//     return () => clearInterval(interval);
//   }, [isAutoPlaying, testimonials.length]);

//   const nextTestimonial = () => {
//     setCurrentIndex((prev) => (prev + 1) % testimonials.length);
//     setIsAutoPlaying(false);
//     setTimeout(() => setIsAutoPlaying(true), 10000);
//   };

//   const prevTestimonial = () => {
//     setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//     setIsAutoPlaying(false);
//     setTimeout(() => setIsAutoPlaying(true), 10000);
//   };

//   // Calculate positions for 3D circular layout
//   const calculatePosition = (index) => {
//     const total = testimonials.length;
//     const angle = (360 / total) * (index - currentIndex);
//     const rad = (angle * Math.PI) / 180;
    
//     // For a circular layout, we'll position items in 3D space
//     const radius = 300; // Radius of the circle
//     const z = Math.cos(rad) * radius;
//     const x = Math.sin(rad) * radius;
    
//     // Calculate opacity and scale based on position
//     const absAngle = Math.abs(angle);
//     let opacity = 1;
//     let scale = 1;
    
//     if (absAngle > 90) {
//       opacity = 0.3;
//       scale = 0.7;
//     } else if (absAngle > 60) {
//       opacity = 0.6;
//       scale = 0.8;
//     } else if (absAngle > 30) {
//       opacity = 0.8;
//       scale = 0.9;
//     }
    
//     return {
//       transform: `translateX(${x}px) translateZ(${z}px) scale(${scale})`,
//       opacity: opacity,
//       zIndex: Math.round(100 - Math.abs(angle))
//     };
//   };

//   return (
//     <section className="py-16 bg-gray-50 overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="section-title text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold mt-5 p-5 mb-2">
//             Happy <span className="text-blue-600">Users</span> Say About MargBooks
//           </h2>
//         </div>
        
//         <div className="relative h-96 flex items-center justify-center">
//           <div 
//             ref={carouselRef}
//             className="relative w-full h-full perspective-1000"
//           >
//             {testimonials.map((testimonial, index) => {
//               const position = calculatePosition(index);
//               return (
//                 <div
//                   key={testimonial.id}
//                   className="absolute top-1/2 left-1/2 w-64 transition-all duration-700 ease-in-out bg-white p-6 rounded-lg border border-gray-200 shadow-lg"
//                   style={{
//                     ...position,
//                     marginLeft: '-128px', // Half of width
//                     marginTop: '-192px', // Adjust based on content height
//                   }}
//                 >
//                   <img
//                     src={testimonial.image}
//                     alt={testimonial.name}
//                     className="testimonial-img w-16 h-16 rounded-full object-cover border-4 border-gray-50 mx-auto mb-4"
//                   />
//                   <h3 className="text-lg font-semibold text-center mb-2">{testimonial.name}</h3>
//                   <div className="stars flex justify-center mb-4">
//                     {[...Array(testimonial.rating)].map((_, i) => (
//                       <svg key={i} className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
//                         <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
//                       </svg>
//                     ))}
//                   </div>
//                   <p className="text-gray-600 text-center italic text-sm">
//                     <FaQuoteLeft className="w-4 h-4 text-blue-200 inline-block mr-1 -mt-1" />
//                     {testimonial.content.substring(0, 120)}...
//                     <FaQuoteRight className="w-4 h-4 text-blue-200 inline-block ml-1 -mt-1" />
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
          
//           {/* Navigation buttons */}
//           <button
//             onClick={prevTestimonial}
//             className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 focus:outline-none z-20"
//           >
//             <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>
//           <button
//             onClick={nextTestimonial}
//             className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 focus:outline-none z-20"
//           >
//             <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//         </div>
        
//         {/* Pagination dots */}
//         <div className="flex justify-center mt-12 space-x-2">
//           {testimonials.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => {
//                 setCurrentIndex(index);
//                 setIsAutoPlaying(false);
//                 setTimeout(() => setIsAutoPlaying(true), 10000);
//               }}
//               className={`w-3 h-3 rounded-full transition-colors ${
//                 index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
//               }`}
//               aria-label={`Go to testimonial ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
      
//       <style jsx>{`
//         .perspective-1000 {
//           perspective: 1000px;
//         }
//         .transition-all {
//           transition-property: all;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Testimonials;
import React, { useState, useEffect, useRef } from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Saul Goodman",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      content: "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.",
      rating: 5
    },
    {
      id: 2,
      name: "Sara Wilsson",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80",
      content: "Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.",
      rating: 5
    },
    {
      id: 3,
      name: "Jena Karlis",
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1899&q=80",
      content: "Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.",
      rating: 5
    },
    {
      id: 4,
      name: "Matt Brandon",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      content: "Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.",
      rating: 5
    },
    {
      id: 5,
      name: "John Larson",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwa90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1890&q=80",
      content: "Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.",
      rating: 5
    },
    {
      id: 6,
      name: "Emily Johnson",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      content: "MargBooks has completely transformed how I manage my business finances. The interface is intuitive and the reporting features are exceptional.",
      rating: 5
    }
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Calculate positions for 3D circular layout with continuous loop
  const calculatePosition = (index) => {
    const total = testimonials.length;
    // Calculate the relative position with proper looping
    let relativePos = index - currentIndex;
    
    // Ensure the relative position is within the optimal range for smooth circular motion
    if (relativePos > total / 2) relativePos -= total;
    if (relativePos < -total / 2) relativePos += total;
    
    const angle = (360 / total) * relativePos;
    const rad = (angle * Math.PI) / 180;
    
    // For a circular layout, we'll position items in 3D space
    const radius = 300; // Radius of the circle
    const z = Math.cos(rad) * radius;
    const x = Math.sin(rad) * radius;
    
    // Calculate opacity and scale based on position
    const absAngle = Math.abs(angle);
    let opacity = 1;
    let scale = 1;
    
    if (absAngle > 90) {
      opacity = 0.3;
      scale = 0.7;
    } else if (absAngle > 60) {
      opacity = 0.6;
      scale = 0.8;
    } else if (absAngle > 30) {
      opacity = 0.8;
      scale = 0.9;
    }
    
    return {
      transform: `translateX(${x}px) translateZ(${z}px) scale(${scale})`,
      opacity: opacity,
      zIndex: Math.round(100 - Math.abs(angle))
    };
  };

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="section-title text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mt-5 p-5 mb-25">
            Happy <span className="text-[#a52a2a]">Users</span> Say About BuilderERP
          </h2>
        </div>
        
        <div className="relative h-96 flex items-center justify-center">
          <div 
            ref={carouselRef}
            className="relative w-full h-full perspective-1000"
          >
            {testimonials.map((testimonial, index) => {
              const position = calculatePosition(index);
              return (
                <div
                  key={testimonial.id}
                  className="absolute top-1/2 left-1/2 w-64 transition-all duration-700 ease-in-out bg-white p-6 rounded-lg border border-gray-200 shadow-lg"
                  style={{
                    ...position,
                    marginLeft: '-128px', // Half of width
                    marginTop: '-192px', // Adjust based on content height
                  }}
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="testimonial-img w-16 h-16 rounded-full object-cover border-4 border-gray-50 mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold text-center mb-2">{testimonial.name}</h3>
                  <div className="stars flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 text-center italic text-sm">
                    <FaQuoteLeft className="w-4 h-4 text-blue-200 inline-block mr-1 -mt-1" />
                    {testimonial.content.substring(0, 120)}...
                    <FaQuoteRight className="w-4 h-4 text-blue-200 inline-block ml-1 -mt-1" />
                  </p>
                </div>
              );
            })}
          </div>
          
          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 focus:outline-none z-20"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 focus:outline-none z-20"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Pagination dots */}
        <div className="flex justify-center mt-12 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 10000);
              }}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <style jsx="true">{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transition-all {
          transition-property: all;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;