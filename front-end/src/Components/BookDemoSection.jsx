import React from 'react';

const BookDemoSection = () => {
  return (
    <section id="bookdemo" className="bookdemo relative overflow-hidden">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 text-center">
            <img 
              src="bookademo.jpg" 
              alt="Book a demo" 
              className="w-full max-w-[80rem] h-auto mx-auto sm:w-full md:ml-20 rounded-[20px] sm:rounded-[30px] max-h-[200px] sm:max-h-[250px] md:max-h-[300px] object-cover px-4 sm:px-0"
            />
          </div>
        </div>
      </div>

      <div className="bookdemo-content absolute top-[50%] left-0 right-0 transform -translate-y-1/2 md:top-[35%] md:transform-none">
        <div className="container mx-auto px-4">
          <div className="row">
            <div className="col-12 col-md-6 text-center md:text-left">
              <h1 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 px-2 sm:px-4 md:px-0 leading-tight">
                Having Trouble Evaluating Your Finances?
              </h1>
              <button className="btn-get-started text-black bg-white font-medium text-sm sm:text-base md:text-lg px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
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