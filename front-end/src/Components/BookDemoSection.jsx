import React from 'react';

const BookDemoSection = () => {
  return (
    <section id="bookdemo" className="bookdemo relative">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 text-center">
            <img 
              src="bookademo.jpg" 
              alt="Book a demo" 
              className="w-full h-auto rounded-[30px] max-h-[500px] object-cover"
            />
          </div>
        </div>
      </div>

      <div className="bookdemo-content absolute top-[50%] left-0 right-0 transform -translate-y-1/2 md:top-[35%] md:transform-none">
        <div className="container mx-auto px-4">
          <div className="row">
            <div className="col-12 col-md-6 text-center md:text-left">
              <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 px-4 md:px-0">
                Having Trouble Evaluating Your Finances?
              </h1>
              <button className="btn-get-started text-black bg-white font-medium text-base md:text-lg px-6 py-3 md:px-8 md:py-4 rounded-full transition-all duration-500 shadow-lg hover:shadow-xl">
                Book a demo now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDemoSection;