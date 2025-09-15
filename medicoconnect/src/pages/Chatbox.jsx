import React from 'react';
import { useState, useRef, useEffect } from 'react';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I’m ConnectCare. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatAreaRef = useRef(null);

 const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = { sender: 'user', text: input };
  setMessages(prev => [...prev, userMessage]);
  setInput('');
  setIsLoading(true);

  try {
    const response = await fetch('http://127.0.0.1:8000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();
    setMessages(prev => [
      ...prev,
      { sender: 'bot', text: data.reply }
    ]);
  } catch (error) {
    setMessages(prev => [
      ...prev,
      { sender: 'bot', text: 'Error connecting to backend.' }
    ]);
  } finally {
    setIsLoading(false);
  }
};


  const handleKeyPress = e => {
    if (e.key === 'Enter') sendMessage();
  };

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-teal-50 to-cyan-100">
      <div className="flex flex-col w-full max-w-xl h-[70vh] p-6 bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-indigo-100">
        <div
          className="flex-1 overflow-y-auto mb-4 space-y-3 px-1 scrollbar-thin scrollbar-thumb-indigo-200"
          ref={chatAreaRef}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`relative p-4 max-w-[80%] rounded-2xl shadow-md text-base font-medium transition-all duration-200
                ${msg.sender === 'user'
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-400 text-white self-end ml-auto rounded-br-none'
                  : 'bg-gradient-to-br from-white to-indigo-50 text-gray-800 self-start mr-auto rounded-bl-none border border-indigo-100'}
              `}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && <div className="text-indigo-400 font-semibold animate-pulse">ConnectCare is typing...</div>}
        </div>
        <div className="flex gap-3 mt-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your question..."
            className="flex-1 border-2 border-indigo-200 bg-white/80 rounded-xl px-5 py-3 focus:outline-none focus:border-indigo-400 shadow-sm text-gray-700 placeholder:text-indigo-300 transition-all duration-200"
          />
          <button
            onClick={sendMessage}
            className="bg-gradient-to-br from-indigo-500 to-blue-400 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
