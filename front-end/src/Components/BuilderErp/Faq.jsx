import React, { useState } from 'react';

const Faq = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqList = [
    {
      id: 1,
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy on all unused items with original packaging. Simply initiate a return through your account dashboard or contact our support team for assistance.",
      category: "Orders & Returns"
    },
    {
      id: 2,
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days. Delivery times may vary during holiday seasons or special promotions.",
      category: "Shipping"
    },
    {
      id: 3,
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and times vary by destination. You can calculate exact shipping costs during checkout before completing your purchase.",
      category: "Shipping"
    },
    {
      id: 4,
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email to monitor your package's progress. You can also view order status and tracking information in your account dashboard.",
      category: "Orders & Returns"
    },
    {
      id: 5,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay for your convenience. All payments are processed securely through encrypted channels.",
      category: "Payments"
    },
    {
      id: 6,
      question: "How do I contact customer support?",
      answer: "Our support team is available 24/7 via email at support@example.com or by phone at (800) 123-4567. We also offer live chat support during business hours (9AM-6PM EST).",
      category: "Support"
    },
    {
      id: 7,
      question: "Can I modify my order after placing it?",
      answer: "Order modifications are possible within the first hour after placement. Please contact our support team immediately with your order number and requested changes. We'll do our best to accommodate your request.",
      category: "Orders & Returns"
    },
    {
      id: 8,
      question: "Do you have a loyalty program?",
      answer: "Yes! Our rewards program offers points for every purchase, product reviews, and referrals. Points can be redeemed for discounts on future orders. Sign up is free and automatic with account creation.",
      category: "Account"
    }
  ];

  const categories = [...new Set(faqList.map(faq => faq.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const filteredFaqs = faqList.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="faq" className="faq py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#a52a2a] mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions about our products and services.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#a52a2a] focus:border-transparent transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg 
                className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'All' ? 'bg-[#a52a2a] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setSelectedCategory('All')}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category ? 'bg-[#a52a2a] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <div 
                key={faq.id} 
                className={`bg-white rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md border border-gray-100 ${activeFaq === faq.id ? 'ring-2 ring-blue-500' : ''}`}
              >
                <div 
                  className="flex items-start justify-between cursor-pointer"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        {faq.category}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 mt-2 pr-8">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <div 
                    className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300 ${activeFaq === faq.id ? 'bg-blue-100 text-blue-600 rotate-180' : 'bg-gray-100 text-gray-500'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${activeFaq === faq.id ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                >
                  <div className="pl-12">
                    <div className="w-12 h-px bg-blue-200 mb-4"></div>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-medium text-gray-700">No questions found</h3>
              <p className="text-gray-500 mt-2">Try a different search term or category</p>
            </div>
          )}
        </div>


      </div>
    </section>
  );
};

export default Faq;