import React from "react";
import {
  MdOutlineThumbUp,
  MdOutlineReceiptLong,
  MdOutlineAccountBalanceWallet,
  MdOutlineCloudOff,
  MdOutlineSpeed,
  MdOutlineSupportAgent,
  MdOutlineCompare,
  MdOutlinePriceCheck,
} from "react-icons/md";

const Choose = () => {
  const features = [
    {
      icon: <MdOutlineThumbUp className="text-5xl text-teal-800 mb-4" />,
      title: "Easy to Use",
      desc: "The software should be user-friendly so that you and your staff can use it without confusion or extra training.",
    },
    {
      icon: <MdOutlineReceiptLong className="text-5xl text-teal-800 mb-4" />,
      title: "Fast Billing",
      desc: "It should allow quick bill generation, especially during peak business hours.",
    },
    {
      icon: <MdOutlineAccountBalanceWallet className="text-5xl text-teal-800 mb-4" />,
      title: "GST-Ready",
      desc: "Look for GST billing software that also handles stock and accounting with accuracy.",
    },
    {
      icon: <MdOutlineCloudOff className="text-5xl text-teal-800 mb-4" />,
      title: "Online + Offline Access",
      desc: "Choose software that works both online and offline, so your business runs smoothly even without an internet connection.",
    },
    {
      icon: <MdOutlineSpeed className="text-5xl text-teal-800 mb-4" />,
      title: "Reliable Performance",
      desc: "The system should be fast and stable, even during high traffic or rush hours.",
    },
    {
      icon: <MdOutlineSupportAgent className="text-5xl text-teal-800 mb-4" />,
      title: "Good Customer Support",
      desc: "Check if the company offers timely and helpful customer service when you need assistance.",
    },
    {
      icon: <MdOutlineCompare className="text-5xl text-teal-800 mb-4" />,
      title: "Compare Features",
      desc: "Don’t forget to compare tools like sales reports, inventory tracking, and SMS alerts.",
    },
    {
      icon: <MdOutlinePriceCheck className="text-5xl text-teal-800 mb-4" />,
      title: "Transparent Pricing",
      desc: "Look out for hidden costs. The best billing software is one that offers the right features at a reasonable price.",
    },
  ];

  return (
    <div className="bg-white py-14">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-6">
        How to Choose the Best{" "}
        <span className="text-red-600">Billing Software</span> in India?
      </h2>
      <p className="text-center max-w-4xl font-medium mx-auto text-gray-700 mb-12">
        Selecting the right billing and{" "}
        <span className="text-red-600">accounting software</span> is a key
        decision for any business. Here are some essential tips to help you make
        the right choice:
      </p>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-between p-6"
          >
            <div>
              {item.icon}
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-base">{item.desc}</p>
            </div>
            <hr className="border-t border-gray-300 w-full mt-6" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Choose;
