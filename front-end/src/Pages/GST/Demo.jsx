import React, { useState } from "react";

const Demo = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 py-12">
      <div className="w-full mx-auto p-6 bg-white">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Improve Your GST Accounting & Filing Process with Marg ERP 9+
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Marg GST software empowers you with complete GST solution from
            billing till return filing. It lets you create beautiful invoices in
            GST format and manage all your finances without any accounting
            knowledge. Marg GST software is designed to reduce your taxes &
            compliance burden so that you can focus on running your business.
          </p>
        </div>

        <div className="pt-8">
          <div className="relative ">
            {/* Placeholder for the promotional image */}
            <div className="w-full h-96 flex items-center justify-center">
              <img
                src="https://media.istockphoto.com/id/1288959953/video/bag-with-gst-sticker-in-front-of-the-stack-of-coins-and-indian-flag-as-background-concept.jpg?s=640x640&k=20&c=j8ydlJe1b9uE2R-R4TlQFOioZgjJ7TiDrJMl_tKQZ_g="
                alt=""
              />

              {/* YouTube play button overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                onClick={() => setShowVideo(true)}
              >
                <div className="relative">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-2xl">
                    <svg
                      className="w-12 h-12 text-white ml-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Video demo text */}
            {/* <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="inline-block bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-lg font-semibold">
                Watch Demo
              </span>
            </div> */}
          </div>

          {showVideo && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
              <div className="relative w-full max-w-4xl">
                <button
                  onClick={() => setShowVideo(false)}
                  className="absolute -top-12 right-0 text-white text-3xl hover:text-red-500 transition-colors"
                >
                  &times;
                </button>

                <div className="relative pt-[56.25%] rounded-lg overflow-hidden">
                  {" "}
                  {/* 16:9 Aspect Ratio */}
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/VIDEO_ID_HERE?autoplay=1"
                    title="Marg ERP 9+ Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300">
               Watch Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Demo;
