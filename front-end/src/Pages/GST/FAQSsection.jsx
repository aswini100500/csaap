import { useState } from 'react';

const FAQSsection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What is ERP-to-ERP Ordering?",
      answer: "ERP-to-ERP Ordering is a system that allows direct electronic data exchange between the ERP systems of distributors and retailers. It automates the ordering process by enabling seamless communication between different enterprise resource planning systems without manual intervention."
    },
    {
      question: "Why should distributors adopt ERP-to-ERP Ordering?",
      answer: "Distributors should adopt ERP-to-ERP Ordering to increase efficiency, reduce errors, lower operational costs, and improve customer satisfaction. It streamlines the order management process, reduces manual data entry, and provides real-time inventory visibility."
    },
    {
      question: "How does the ordering process actually work?",
      answer: "The ordering process works through automated electronic data interchange (EDI) between systems. When a retailer places an order through their ERP system, it's automatically transmitted to the distributor's ERP system, where it's processed without manual data entry, reducing processing time and errors."
    },
    {
      question: "What advantages does ERP-to-ERP Ordering offer over traditional methods?",
      answer: "Key advantages include: reduced order processing time, elimination of manual data entry errors, real-time inventory updates, improved order accuracy, faster fulfillment, better traceability, and enhanced reporting capabilities for both parties."
    },
    {
      question: "What features make ERP-to-ERP different from other systems?",
      answer: "ERP-to-ERP systems offer direct system integration, real-time data synchronization, automated workflows, comprehensive reporting, seamless scalability, and standardized data formats that ensure compatibility between different business systems."
    },
    {
      question: "Can distributors handle orders from a large number of retailers?",
      answer: "Yes, ERP-to-ERP systems are designed to handle high volumes of orders from multiple retailers simultaneously. The automated nature of the system ensures that order processing remains efficient and accurate even as the number of retailers increases."
    },
    {
      question: "How does ERP-to-ERP Ordering help with order accuracy?",
      answer: "By eliminating manual data entry, ERP-to-ERP ordering significantly reduces human errors. Orders are transmitted directly between systems in standardized formats, ensuring that product information, quantities, and pricing remain accurate throughout the process."
    },
    {
      question: "How does it support stock and delivery planning?",
      answer: "ERP-to-ERP systems provide real-time inventory visibility, allowing distributors to better forecast demand, optimize stock levels, and plan deliveries more efficiently. Automated notifications and updates help prevent stockouts and improve delivery scheduling."
    },
    {
      question: "What impact does ERP-to-ERP Ordering have on retailer relationships?",
      answer: "ERP-to-ERP ordering strengthens retailer relationships by providing faster order processing, improved accuracy, and better communication. This leads to higher satisfaction, increased trust, and potentially greater order volumes from retail partners."
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

export default FAQSsection;