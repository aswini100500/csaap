import React from "react";

const Demo = () => {
  return (
    <div className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 leading-snug mb-6">
          Manage your Field Force for your Pharma/ FMCG business with our{" "}
          <span className="text-blue-900">Sales Force Automation Software</span>
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-lg max-w-4xl mx-auto mb-12 leading-relaxed">
          SFAXpert is your field force reporting platform designed by Marg ERP
          Ltd. that optimises your sales, service, delivery, driver and all field
          staff operations, and increases employee productivity. Created using
          the latest and state-of-the-art technology, the software works as a
          complete reporting tool that provides crucial live information on the
          activities & location of all the field forces. Get real-time visibility
          of your workforce via mobile app & software.
        </p>

        {/* Video Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center">
          {/* Video 1 */}
          <div className="rounded-xl shadow-lg overflow-hidden w-full aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/KUPb23Y55no"
              title="Sales Force Video 1"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Video 2 */}
          <div className="rounded-xl shadow-lg overflow-hidden w-full aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/ScMzIvxBSi4"
              title="Sales Force Video 2"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
