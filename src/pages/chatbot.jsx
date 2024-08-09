import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { FaRobot } from 'react-icons/fa';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { text: input, type: 'user' };
      const botResponse = { text: getBotResponse(input), type: 'bot' };

      setMessages([...messages, userMessage, botResponse]);
      setInput('');
    }
  };

  const getBotResponse = (userInput) => {
    const responses = {
      'hello': 'Hi there! How can I assist you today?',
      'book an appointment': 'You can book an appointment through our scheduling page.',
      'mental health': 'We offer counseling and therapy sessions to support mental health.',
      'default': 'I didn\'t understand that. Can you provide more details?',
      'hi':'Hi there! How can I assist you today?'
    };
    return responses[userInput.toLowerCase()] || responses['default'];
  };

  return (
    <div className={`fixed bottom-4 right-4 ${isOpen ? 'w-80' : 'w-16'} transition-all duration-300`}>
      <div className={`bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col ${isOpen ? 'h-80' : 'h-16'} relative`}>
        {isOpen && (
          <>
            <div className="bg-blue-600 text-white p-2 rounded-t-lg text-center font-bold">
              TeleHealth
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-300 flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border-none rounded-l-lg outline-none"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Send
              </button>
            </div>
          </>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-2 right-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
        >
          {isOpen ? <MdClose size={20} /> :    <FaRobot size={24} />}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
