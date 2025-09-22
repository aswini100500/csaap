// Components/AIAgent.js
import React, { useState, useEffect, useRef } from 'react';

const AIAgent = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hi there! I'm your AI assistant. How can I help you today?", sender: 'bot' }
  ]);
  const lastScrollY = useRef(0);
  const chatContainerRef = useRef(null);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    // Add user message
    const newUserMessage = { id: Date.now(), text: message, sender: 'user' };
    setChatMessages(prev => [...prev, newUserMessage]);
    setMessage('');
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "I understand you're interested in our services. Let me help you find what you need.",
        "That's a great question! Our team can provide more details about that feature.",
        "I'd be happy to connect you with one of our experts for more information.",
        "Many of our customers have found this feature particularly helpful for their business needs.",
        "Would you like me to help you schedule a demo with our product specialists?"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const newBotMessage = { id: Date.now() + 1, text: randomResponse, sender: 'bot' };
      setChatMessages(prev => [...prev, newBotMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {isExpanded ? (
        <div className="bg-white rounded-2xl shadow-xl w-80 h-96 flex flex-col border border-gray-200">
          {/* Chat header */}
          <div className="bg-indigo-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-medium">AI Assistant</p>
                <p className="text-xs text-indigo-200">Online</p>
              </div>
            </div>
            <button 
              onClick={() => setIsExpanded(false)}
              className="text-indigo-200 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {/* Chat messages */}
          <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto">
            {chatMessages.map(msg => (
              <div
                key={msg.id}
                className={`mb-4 ${msg.sender === 'user' ? 'text-right' : ''}`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg max-w-xs ${
                    msg.sender === 'user'
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          {/* Message input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-14 h-14 rounded-full bg-indigo-600 shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-colors"
          aria-label="Open AI assistant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default AIAgent;