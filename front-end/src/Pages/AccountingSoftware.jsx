import React, { useState } from 'react';

const AccountingSoftware = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pincode: ''
  });

  const [activePlan, setActivePlan] = useState('standard');
  const [activeFaq, setActiveFaq] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you! We will contact you shortly to schedule your demo.');
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "What is accounting software and how can it benefit my business?",
      answer: "Accounting software helps businesses manage financial transactions, track expenses, generate invoices, and prepare financial statements. It automates bookkeeping tasks, reduces errors, saves time, and provides real-time insights into your financial health, enabling better decision-making and ensuring compliance with tax regulations."
    },
    {
      question: "How long does it take to implement your accounting solution?",
      answer: "Implementation time varies based on business complexity. For small businesses, setup can be completed in 1-2 weeks. Medium-sized businesses typically require 2-4 weeks, while larger implementations may take 4-6 weeks. We offer guided implementation to ensure a smooth transition from your current system."
    },
    {
      question: "Is training provided for using the accounting system?",
      answer: "Yes, we provide comprehensive training through multiple channels: personalized onboarding sessions, online webinars, video tutorials, and detailed documentation. We also offer ongoing support to ensure your team can effectively use all financial management features."
    },
    {
      question: "Can the accounting software be customized for my specific business needs?",
      answer: "Absolutely. Our accounting solution offers extensive customization options to adapt to your unique business processes. We can customize chart of accounts, financial reports, invoice templates, and workflows to match your specific industry requirements."
    },
    {
      question: "How does your software handle GST compliance?",
      answer: "Our accounting software automatically calculates GST for all transactions, generates GST-compliant invoices, prepares GSTR-1, GSTR-2, GSTR-3B returns, and helps with e-way bill generation. The system stays updated with the latest GST rules and regulations to ensure full compliance."
    },
    {
      question: "What kind of support do you offer after implementation?",
      answer: "We provide multiple support options including email, phone, and chat support during business hours. For premium plans, we offer priority support with a dedicated account manager. We also provide regular software updates and maintenance to ensure optimal performance."
    },
    {
      question: "Is my financial data secure with your accounting solution?",
      answer: "Yes, we prioritize data security with bank-level encryption, regular backups, role-based access controls, and secure data centers. We comply with industry-standard security protocols and financial regulations to keep your business data safe."
    },
    {
      question: "Can I access the accounting system remotely?",
      answer: "Yes, our software is cloud-based and can be accessed from anywhere with an internet connection. We also offer mobile apps for iOS and Android devices, allowing you to manage your finances on the go."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
          <div className="lg:w-1/2">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Accounting Software Solutions: Streamline Your Financial Operations
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Transform your financial management with our comprehensive accounting software. Automate bookkeeping, generate professional invoices, track expenses, reconcile bank transactions, manage payroll, and file GST returns with ease—all in one integrated platform.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:-translate-y-1">
              Download free trial
            </button>
          </div>
          
          {/* Demo Form */}
          <div className="lg:w-1/2 w-full bg-white rounded-xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Schedule a free demo!</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <input 
                  type="text" 
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="Pincode" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300"
              >
                Book now
              </button>
            </form>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <img src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png" alt="Bookkeeping" className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Automated Bookkeeping</h3>
            <p className="text-gray-600">Streamline your financial records with automated transaction recording and categorization.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <img src="https://cdn-icons-png.flaticon.com/512/3144/3144451.png" alt="Invoicing" className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Invoicing</h3>
            <p className="text-gray-600">Create customized, professional invoices and automate payment reminders for clients.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <img src="https://cdn-icons-png.flaticon.com/512/3144/3144465.png" alt="GST Compliance" className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">GST Compliance</h3>
            <p className="text-gray-600">Stay compliant with automated GST calculations, return filing, and tax documentation.</p>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Flexible Pricing Plans</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">Choose the plan that fits your business needs. All plans include our core features with no hidden fees.</p>
          </div>

          {/* Toggle Switch */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className={`px-6 py-3 text-sm font-medium rounded-l-lg ${
                  activePlan === 'monthly' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActivePlan('monthly')}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                className={`px-6 py-3 text-sm font-medium rounded-r-lg ${
                  activePlan === 'annual' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActivePlan('annual')}
              >
                Annual Billing (Save 20%)
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {activePlan === 'monthly' ? '₹1,999' : '₹1,599'}
                  </span>
                  <span className="ml-1 text-gray-600">/month</span>
                </div>
                <p className="text-gray-600">Perfect for small businesses and freelancers</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Up to 3 users</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Basic invoicing & billing</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Expense tracking</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Basic financial reports</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Email support</span>
                  </li>
                </ul>
                <button className="w-full mt-8 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg transition duration-300">
                  Get Started
                </button>
              </div>
            </div>

            {/* Standard Plan - Featured */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 border-2 border-blue-500 relative">
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                Most Popular
              </div>
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Standard</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {activePlan === 'monthly' ? '₹4,999' : '₹3,999'}
                  </span>
                  <span className="ml-1 text-gray-600">/month</span>
                </div>
                <p className="text-gray-600">Ideal for growing businesses with more complex needs</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Up to 10 users</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Advanced invoicing & billing</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Inventory management</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Multi-branch support</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Advanced financial reports</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Priority email & chat support</span>
                  </li>
                </ul>
                <button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300">
                  Get Started
                </button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {activePlan === 'monthly' ? '₹9,999' : '₹7,999'}
                  </span>
                  <span className="ml-1 text-gray-600">/month</span>
                </div>
                <p className="text-gray-600">For large businesses with complex requirements</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Unlimited users</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Custom invoicing & workflows</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Advanced inventory management</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Multi-company support</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Custom financial reports</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>24/7 phone support</span>
                  </li>
                </ul>
                <button className="w-full mt-8 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg transition duration-300">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">Need a custom plan? <a href="#" className="text-blue-600 hover:underline">Contact us</a></p>
          </div>
        </div>

        {/* Why Choose Our Accounting Software Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why businesses choose our accounting software</h2>
          
          {/* GST Compliant */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="bg-blue-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="GST Compliant" className="w-full h-full object-cover rounded-2xl" />
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">GST Compliant</h3>
              <p className="text-lg text-gray-700">
                We ensure GST compliant invoicing, automated tax calculations, and seamless return filing. Our software stays updated with the latest GST regulations to keep your business compliant.
              </p>
            </div>
          </div>
          
          {/* Easy Implementation */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Easy Implementation</h3>
              <p className="text-lg text-gray-700">
                Get started in minutes with our intuitive accounting software. Our setup wizards guide you through the process, and our support team is available to help you migrate your existing financial data seamlessly.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-green-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Easy Implementation" className="w-full h-full object-cover rounded-2xl" />
              </div>
            </div>
          </div>
          
          {/* Customizable */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="bg-purple-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Customizable" className="w-full h-full object-cover rounded-2xl" />
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Customizable</h3>
              <p className="text-lg text-gray-700">
                Tailor the software to your specific business needs with customizable chart of accounts, invoice templates, financial reports, and user permissions. Adapt the system to match your unique workflow requirements.
              </p>
            </div>
          </div>
          
          {/* Collaborative */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Collaborative</h3>
              <p className="text-lg text-gray-700">
                Enable seamless collaboration between your accounting team, management, and external accountants. Control access permissions and share financial reports with stakeholders effortlessly.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-yellow-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Collaborative" className="w-full h-full object-cover rounded-2xl" />
              </div>
            </div>
          </div>
          
          {/* Real-time Insights */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="bg-pink-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Real-time Insights" className="w-full h-full object-cover rounded-2xl" />
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-time Financial Insights</h3>
              <p className="text-lg text-gray-700">
                Make informed business decisions with real-time financial dashboards, profit & loss statements, cash flow reports, and customizable analytics. Track key performance indicators at a glance.
              </p>
            </div>
          </div>
          
          {/* Business Growth */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Business Growth Support</h3>
              <p className="text-lg text-gray-700">
                Our accounting software scales with your business, offering advanced features as you grow. From basic bookkeeping to multi-entity consolidation, we support your business at every stage of growth.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-red-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Business Growth" className="w-full h-full object-cover rounded-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto">
            {faqData.map((faq, index) => (
              <div key={index} className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="flex justify-between items-center w-full p-6 text-left bg-white hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${activeFaq === index ? 'transform rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeFaq === index && (
                  <div className="p-6 bg-gray-50">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-white mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Rajesh Sharma" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-semibold">Rajesh Sharma</p>
                  <p className="text-sm">Manufacturing Business Owner</p>
                </div>
              </div>
              <p className="italic">"This accounting software transformed our financial operations. We've reduced manual bookkeeping by 80% and improved our financial reporting accuracy significantly."</p>
            </div>
            <div className="bg-blue-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Priya Mehta" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-semibold">Priya Mehta</p>
                  <p className="text-sm">Retail Chain Owner</p>
                </div>
              </div>
              <p className="italic">"The GST compliance features saved us countless hours of manual work. Filing returns is now a matter of just a few clicks, and we never miss deadlines."</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Transform Your Financial Management?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">Join thousands of businesses that have streamlined their financial operations with our accounting software.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300">
              Request a Demo
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition duration-300">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountingSoftware;