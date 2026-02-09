import React, { useState } from 'react';

const Faq = () => {
  const [faqList, setFaqList] = useState([
    {
      id: 1,
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy on all unused items with original packaging.",
      isOpen: false
    },
    {
      id: 2,
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days.",
      isOpen: false
    },
    {
      id: 3,
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and times vary by destination.",
      isOpen: false
    },
    {
      id: 4,
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email to monitor your package's progress.",
      isOpen: false
    },
    {
      id: 5,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and Apple Pay for your convenience.",
      isOpen: false
    },
    {
      id: 6,
      question: "How do I contact customer support?",
      answer: "Our support team is available 24/7 via email at support@example.com or by phone at (800) 123-4567.",
      isOpen: false
    }
  ]);

  const toggleFaq = (faq) => {
    setFaqList(prevFaqList => 
      prevFaqList.map(item => 
        item.id === faq.id 
          ? { ...item, isOpen: !item.isOpen } 
          : item
      )
    );
  };

  return (
    <section id="faq-2" className="faq-2 py-16 bg-gray-50">
      {/* Section Title */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      </div>
      {/* End Section Title */}
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <div className="faq-container space-y-5">
              {faqList.slice(0, 3).map((faq) => (
                <div 
                  key={faq.id} 
                  className={`faq-item bg-white p-5 relative rounded-lg shadow-sm transition-all duration-300 ${faq.isOpen ? 'faq-active' : ''}`}
                >
                  {/* Question mark icon */}
                  <div className="absolute left-5 top-5 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                    </svg>
                  </div>
                  
                  <h3 
                    className="text-lg font-medium cursor-pointer pr-8 ml-10 transition-colors duration-300 hover:text-blue-600"
                    onClick={() => toggleFaq(faq)}
                  >
                    {faq.question}
                  </h3>
                  <div 
                    className={`faq-content transition-all duration-300 ease-in-out overflow-hidden ${faq.isOpen ? 'max-h-96 opacity-100 pt-3' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-gray-600 ml-10">{faq.answer}</p>
                  </div>
                  <div 
                    className={`absolute right-5 top-5 cursor-pointer transition-transform duration-300 ${faq.isOpen ? 'rotate-90 text-blue-600' : 'text-gray-400'}`}
                    onClick={() => toggleFaq(faq)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="faq-container space-y-5">
              {faqList.slice(3).map((faq) => (
                <div 
                  key={faq.id} 
                  className={`faq-item bg-white p-5 relative rounded-lg shadow-sm transition-all duration-300 ${faq.isOpen ? 'faq-active' : ''}`}
                >
                  {/* Question mark icon */}
                  <div className="absolute left-5 top-5 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                    </svg>
                  </div>
                  
                  <h3 
                    className="text-lg font-medium cursor-pointer pr-8 ml-10 transition-colors duration-300 hover:text-blue-600"
                    onClick={() => toggleFaq(faq)}
                  >
                    {faq.question}
                  </h3>
                  <div 
                    className={`faq-content transition-all duration-300 ease-in-out overflow-hidden ${faq.isOpen ? 'max-h-96 opacity-100 pt-3' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-gray-600 ml-10">{faq.answer}</p>
                  </div>
                  <div 
                    className={`absolute right-5 top-5 cursor-pointer transition-transform duration-300 ${faq.isOpen ? 'rotate-90 text-blue-600' : 'text-gray-400'}`}
                    onClick={() => toggleFaq(faq)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;