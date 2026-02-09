import React, { useState } from 'react';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('annual');
  const [currency, setCurrency] = useState('INR');

  const plans = {
    Pro: {
      annual: 366.67,
      monthly: 440,
      description: 'For small teams and startups',
      features: [
        'Document title tracking',
        'Productivity calculations',
        'Calendar integrations'
      ],
      popular: false,
      gradient: 'from-blue-50 to-indigo-50'
    },
    Premium: {
      annual: 513.33,
      monthly: 616,
      description: 'For hybrid and growing teams',
      features: [
        'Screenshots',
        'Integrations & API',
        'Shift scheduling'
      ],
      popular: true,
      gradient: 'from-purple-50 to-pink-50'
    },
    Enterprise: {
      annual: 'Custom',
      monthly: 'Custom',
      description: 'For large organisations',
      features: [
        'Custom API on request',
        'Account manager',
        'Employee training'
      ],
      popular: false,
      custom: true,
      gradient: 'from-gray-50 to-blue-gray-50'
    }
  };

  const features = {
    'Time tracking': [
      { name: 'Automatic time tracking', pro: true, premium: true, enterprise: true },
      { name: 'Idle time', pro: true, premium: true, enterprise: true },
      { name: 'Web timer', pro: true, premium: true, enterprise: true },
      { name: 'Mobile time', pro: true, premium: true, enterprise: true },
      { name: 'Meeting & video time tracking', pro: true, premium: true, enterprise: true },
      { name: 'Offline time', pro: true, premium: true, enterprise: true }
    ],
    'Productivity monitoring': [
      { name: 'URL & App tracking', pro: true, premium: true, enterprise: true },
      { name: 'Document title tracking', pro: true, premium: true, enterprise: true },
      { name: 'Project tracking', pro: true, premium: true, enterprise: true },
      { name: 'Productivity calculations', pro: true, premium: true, enterprise: true },
      { name: 'Screenshots', pro: false, premium: true, enterprise: true }
    ],
    'Integrations & API': [
      { name: 'API', pro: false, premium: true, enterprise: true },
      { name: 'Calendar integrations', pro: true, premium: true, enterprise: true },
      { name: 'Product management integrations', pro: false, premium: true, enterprise: true },
      { name: 'Automatization integrations', pro: false, premium: true, enterprise: true },
      { name: 'Custom API on request', pro: false, premium: false, enterprise: true }
    ],
    'Scheduling': [
      { name: 'Shift scheduling', pro: false, premium: true, enterprise: true },
      { name: 'Absence calendar', pro: true, premium: true, enterprise: true }
    ],
    'Reporting': [
      { name: 'User dashboard', pro: true, premium: true, enterprise: true },
      { name: 'Admin dashboard', pro: true, premium: true, enterprise: true },
      { name: 'Reports', pro: true, premium: true, enterprise: true },
      { name: 'Exports', pro: true, premium: true, enterprise: true }
    ],
    'Employee well-being': [
      { name: 'Break time reminders', pro: true, premium: true, enterprise: true },
      { name: 'Private time', pro: true, premium: true, enterprise: true }
    ],
    'Security': [
      { name: 'Two-Factor Authentication', pro: true, premium: true, enterprise: true }
    ],
    'Support': [
      { name: 'Account manager', pro: false, premium: false, enterprise: true },
      { name: 'Personalized onboarding', pro: false, premium: true, enterprise: true },
      { name: 'Employee training', pro: false, premium: false, enterprise: true }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header Section */}
      <header className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 opacity-10 w-full h-full"></div>
        </div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Unlock a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">30% Productivity Boost</span></h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">The industry-leading automatic time tracking and management system that helps teams work smarter.</p>
          <div className="inline-flex items-center bg-white rounded-full shadow-lg px-6 py-3">
            <span className="text-blue-600 font-semibold mr-2">✨ Limited Time Offer</span>
            <span className="text-gray-700">Get 1 month free with annual billing</span>
          </div>
        </div>
      </header>

      {/* Pricing Plans */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Choose the plan that works best for your team and try it risk-free for 30 days.</p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-xl shadow-md p-1" role="group">
              <button
                type="button"
                className={`px-8 py-3 text-sm font-medium rounded-lg ${
                  billingCycle === 'monthly' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' 
                    : 'bg-white text-gray-700'
                } transition-all duration-300`}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                className={`px-8 py-3 text-sm font-medium rounded-lg ${
                  billingCycle === 'annual' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' 
                    : 'bg-white text-gray-700'
                } transition-all duration-300`}
                onClick={() => setBillingCycle('annual')}
              >
                Annual Billing (Save 20%)
              </button>
            </div>
          </div>

          {/* Currency Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-lg shadow-sm p-2">
              <span className="text-gray-600 mr-2">Currency:</span>
              <select 
                className="bg-transparent border-none focus:ring-0 text-blue-600 font-medium"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="INR">₹ INR</option>
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
              </select>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Object.entries(plans).map(([name, plan]) => (
              <div 
                key={name} 
                className={`rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 ${
                  plan.popular ? 'shadow-2xl ring-2 ring-purple-500' : 'shadow-xl'
                }`}
              >
                <div className={`h-2 ${plan.popular ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-300'}`}></div>
                <div className={`p-8 bg-gradient-to-b ${plan.gradient} h-full`}>
                  {plan.popular && (
                    <div className="inline-flex items-center px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold mb-6">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Most Popular
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    {plan.custom ? (
                      <div className="text-4xl font-bold text-gray-800">Custom</div>
                    ) : (
                      <>
                        <div className="flex items-end">
                          <span className="text-4xl font-bold text-gray-800">
                            {currency === 'INR' ? '₹' : currency === 'USD' ? '$' : '€'}
                            {billingCycle === 'annual' ? plan.annual : plan.monthly}
                          </span>
                          <span className="text-gray-600 ml-2">/user/month</span>
                        </div>
                        {billingCycle === 'annual' && (
                          <div className="text-green-600 font-medium mt-1">
                            <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            Save 20% with annual billing
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  
                  <p className="text-gray-500 text-sm mb-8">
                    {!plan.custom && `Billed ${billingCycle === 'annual' ? 'annually' : 'monthly'}`}
                  </p>
                  
                  <ul className="mb-8 space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-white text-blue-600 border-2 border-blue-100 hover:border-blue-300 hover:bg-blue-50 shadow-md hover:shadow-lg'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rating Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-6 h-6 text-yellow-300 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 font-bold">4.5 out of 5</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Highly rated and globally trusted</h2>
          <p className="text-xl opacity-90">Based on 375 customer reviews</p>
          <button className="mt-8 bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg">
            Compare plans
          </button>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Complete Feature Comparison</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">See how our plans stack up against each other</p>
          </div>
          
          <div className="overflow-x-auto rounded-2xl shadow-xl">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <th className="text-left py-6 px-8 rounded-tl-2xl">Feature</th>
                  <th className="text-center py-6 px-8">Pro</th>
                  <th className="text-center py-6 px-8">Premium</th>
                  <th className="text-center py-6 px-8 rounded-tr-2xl">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(features).map(([category, categoryFeatures]) => (
                  <React.Fragment key={category}>
                    <tr className="bg-gray-50">
                      <td colSpan="4" className="py-4 px-8 font-bold text-gray-800 text-lg">{category}</td>
                    </tr>
                    {categoryFeatures.map((feature, index) => (
                      <tr key={index} className="border-b border-gray-100 even:bg-gray-50">
                        <td className="py-4 px-8">{feature.name}</td>
                        <td className="text-center py-4 px-8">
                          {feature.pro ? (
                            <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                          ) : (
                            <div className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                            </div>
                          )}
                        </td>
                        <td className="text-center py-4 px-8">
                          {feature.premium ? (
                            <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                          ) : (
                            <div className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                            </div>
                          )}
                        </td>
                        <td className="text-center py-4 px-8">
                          {feature.enterprise ? (
                            <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                          ) : (
                            <div className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our pricing</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">How much does DeskTime cost?</h3>
              <p className="text-gray-600">
                DeskTime offers three pricing plans: Pro at ₹366.67 per user/month, Premium at ₹513.33 per user/month, and Enterprise with custom pricing for larger organizations. All plans are billed annually with a discount.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">How can I subscribe?</h3>
              <p className="text-gray-600">
                You can subscribe by selecting your preferred plan and clicking the "Get Started" button. You'll be guided through the registration and payment process.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">What is the difference between monthly and annual billing?</h3>
              <p className="text-gray-600">
                Annual billing offers a discount compared to monthly billing and includes one month free. With annual billing, you pay for 11 months and get 12 months of service.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">How can I add or remove users from my plan?</h3>
              <p className="text-gray-600">
                You can manage users from your account dashboard. Adding or removing users will automatically adjust your billing on the next billing cycle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full pattern-dots pattern-blue-500 pattern-bg-white pattern-size-6 pattern-opacity-20"></div>
        </div>
        <div className="container relative mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to boost your team's productivity?</h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">Join thousands of companies that use DeskTime to optimize their workflow and increase productivity</p>
          <button className="bg-white text-blue-600 font-bold py-4 px-12 rounded-xl hover:bg-blue-50 transition-colors duration-300 shadow-2xl text-lg">
            Start Your Free Trial
          </button>
          <p className="mt-6 opacity-80">No credit card required • 30-day free trial • Cancel anytime</p>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;