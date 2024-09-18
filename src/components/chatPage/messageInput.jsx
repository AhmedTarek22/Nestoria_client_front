import React, { useRef } from 'react';
import { FaPaperclip, FaPaperPlane } from 'react-icons/fa';

const MessageInput = ({ message, setMessage, handleSendMessage, handleFileUpload }) => {
  const fileInputRef = useRef(null);

  return (
    <footer className="p-4 lg:p-6 border-t border-[#929292] bg-black flex items-center">
      <input
        type="file"
        onChange={handleFileUpload}
        ref={fileInputRef}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current.click()}
        className="text-[#929292] hover:text-[#C26510] mr-4"
      >
        <FaPaperclip />
      </button>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        className="flex-1 py-3 lg:py-4 px-6 lg:px-8 rounded-full bg-transparent text-[#929292] border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
      />
      <button
        onClick={handleSendMessage}
        className="text-[#C26510] hover:text-white ml-4"
      >
        <FaPaperPlane />
      </button>
    </footer>
  );
};

export default MessageInput;
