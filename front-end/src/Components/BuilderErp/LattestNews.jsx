const LatestNews = () => {
  // Sample news data
  const news = [
    {
      id: 1,
      title: "Construction Industry Sees 15% Growth in Q2 2023",
      excerpt: "The construction sector has shown remarkable resilience with a significant growth spurt in the second quarter of 2023.",
      date: "August 12, 2023",
      category: "Industry News",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "New Sustainable Building Materials Revolutionizing Construction",
      excerpt: "Innovative eco-friendly materials are changing how we build, reducing carbon footprints by up to 40%.",
      date: "August 8, 2023",
      category: "Innovation",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "Government Announces $2B Infrastructure Investment Plan",
      excerpt: "A new infrastructure bill will fund transportation and utility projects across the country over the next five years.",
      date: "August 5, 2023",
      category: "Policy",
      image: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      readTime: "5 min read"
    },
    {
      id: 4,
      title: "AI and Machine Learning Transforming Construction Management",
      excerpt: "Advanced algorithms are optimizing project timelines, reducing costs, and improving safety on construction sites.",
      date: "August 1, 2023",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      readTime: "6 min read"
    }
  ];

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Latest News</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest developments in real estate and construction industry
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {news.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#a52a2a] text-white text-xs font-medium rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{item.date}</span>
                  <span className="mx-2">•</span>
                  <span>{item.readTime}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {item.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <a 
                    href="#" 
                    className="text-[#a52a2a] font-medium hover:text-[#a52a2a] inline-flex items-center transition-colors duration-300"
                  >
                    Read more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                  
                  <button className="text-[#a52a2a] hover:text-blue-600 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

   
      </div>
    </div>
  );
};

export default LatestNews;