import React from 'react';
import { FaCheck, FaCheckDouble, FaTrashAlt } from 'react-icons/fa';

const MessageArea = ({ messages, setMessages, messageEndRef }) => {
  const handleDeleteMessage = (index) => {
    setMessages(messages.filter((_, i) => i !== index));
  };

  return (
    <div className="flex-1 p-4 lg:p-6 overflow-y-auto bg-black">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${msg.sender === 'currentUser' ? 'justify-end' : 'justify-start'} mb-4`}
        >
          {msg.sender !== 'currentUser' && (
            <img
              src={msg.avatarUrl}
              alt={msg.sender}
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full mr-3"
            />
          )}
          <div
            className={`p-4 rounded max-w-xs shadow-lg relative ${
              msg.sender === 'currentUser' ? 'bg-[#C26510] text-white' : 'bg-gray-700 text-[#929292]'
            }`}
          >
            {msg.file ? (
              <a href={msg.file} target="_blank" rel="noopener noreferrer" className="block">
                <img src={msg.file} alt="uploaded-file" className="rounded-lg max-w-full h-auto" />
              </a>
            ) : (
              <p className="font-semibold break-words">{msg.text}</p>
            )}
            <small className="block text-xs mt-2">
              {new Date(msg.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              {msg.sender === 'currentUser' && (
                <span className="ml-2">
                  {msg.seen ? <FaCheckDouble className="inline text-blue-400" /> : <FaCheck className="inline text-[#929292]" />}
                </span>
              )}
            </small>
            {msg.sender === 'currentUser' && (
              <button
                onClick={() => handleDeleteMessage(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-400"
              >
                <FaTrashAlt />
              </button>
            )}
          </div>
        </div>
      ))}
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageArea;