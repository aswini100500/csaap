import { useState } from 'react';

const FaqErp = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: " What is CSAAP ERP Software ?",
      answer: "CSAAP ERP is an all-in-one business management software that integrates accounting, sales, inventory, payroll, CRM, and HR operations into a single platform for seamless business automation."
    },
    {
      question: "Who can use CSAAP ERP ?",
      answer: "It’s designed for all types of businesses — from startups and SMEs to large enterprises across industries like manufacturing, trading, retail, and services."
    },
    {
      question: " Is CSAAP ERP cloud-based or on-premise ?",
      answer: "CSAAP ERP is available in both cloud and on-premise versions, offering flexibility based on your business needs."
    },
    {
      question: "Does CSAAP ERP support GST compliance ?",
      answer: "Yes, it includes automated GST billing, e-invoicing, and tax return filing for complete compliance with Indian taxation laws"
    },
    {
      question: "How does CSAAP ERP improve business productivity ?",
      answer: "By automating manual processes, centralizing data, and providing real-time analytics, CSAAP ERP helps teams save time and make data-driven decisions."
    },
    {
      question: " Can CSAAP ERP be customized for my business ?",
      answer: "Absolutely! CSAAP ERP allows modular customization to fit your company’s specific workflow and operational needs"
    },
    {
      question: "Does CSAAP ERP integrate with other software ?",
      answer: "Yes, it supports integration with third-party applications such as CRM, accounting tools, and e-commerce platforms for enhanced functionality."
    },
    {
      question: "How secure is my business data in CSAAP ERP ?",
      answer: "Your data is fully protected with encryption, cloud backup, role-based access control, and strict authentication measures."
    },
    {
      question: "Can multiple branches or locations use the same system?",
      answer: "Yes, CSAAP ERP supports multi-branch and multi-location management, enabling centralized control of operations."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-3">
        {faqItems.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-md overflow-hidden shadow-xs">
            <button
              className="flex justify-between items-center bg-white w-full p-3 text-left transition-colors duration-150 text-sm"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium text-gray-900 pr-2">{item.question}</span>
              <svg
                className={`w-4 h-4 text-gray-500 flex-shrink-0 transform transition-transform duration-200 ${
                  activeIndex === index ? 'rotate-180' : 'rotate-0'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-3 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-700 text-sm">{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqErp;