import React from "react";

const blogs = [
  {
    id: 1,
    title: "What are the Essential Features of a Billing Software in India?",
    description:
      "In an era of automation and cloud-based solutions, your business must have advanced billing software ...",
    image: "https://margcompusoft.com/retail/images/essential.jpg",
    link: "#",
  },
  {
    id: 2,
    title: "How Can Billing Software Enrich Your Day-to-Day Business Practices?",
    description:
      "Manual and human labour-intensive traditional business practices consume a lot of time and are often prone to errors....",
    image: "https://margcompusoft.com/retail/images/business.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "Why Billing & Inventory Software is Important for Small and Growing Businesses?",
    description:
      "Are you still using paper and pen to manage stocks and make invoices? If yes, it’s time to change and embrace advanced ERP solutions for automation...",
    image: "https://margcompusoft.com/retail/images/business.jpg",
    link: "#",
  },
  {
    id: 4,
    title: "Free vs Paid Billing Software in India:",
    description:
      "Paid vs free billing software – that’s a crucial decision to make, and here we are going to decipher...",
    image: "https://margcompusoft.com/retail/images/business.jpg",
    link: "#",
  },
];

const Blog = () => {
  return (
    <div className="w-full bg-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-teal-600 mb-10">
          Read Our Latest Blogs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="flex bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {/* Image */}
              <img
                src={blog.image}
                alt={blog.title}
                className="w-40 h-40 object-cover flex-shrink-0"
              />

              {/* Content */}
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {blog.description}
                  </p>
                </div>
                <a
                  href={blog.link}
                  className="inline-block bg-teal-600 w-26 text-white text-sm px-4 py-2 rounded hover:bg-teal-700 transition-colors"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
