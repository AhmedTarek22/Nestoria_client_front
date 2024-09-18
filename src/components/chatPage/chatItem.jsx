import React from 'react';

const ChatItem = ({ chat, isSelected, onSelect }) => {
  return (
    <li
      onClick={() => onSelect(chat)}
      className={`flex items-center space-x-3 p-3 rounded-full cursor-pointer transition duration-500 ${
        isSelected ? 'bg-[#C26510] text-white' : 'hover:bg-gray-700 text-[#929292]'
      }`}
    >
      <img
        src={chat.avatarUrl}
        alt={chat.username}
        className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
      />
      <div className="flex-1">
        <div className="flex justify-between">
          <span className="font-semibold">{chat.username}</span>
          <small className="text-gray-400 text-xs">
            {new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </small>
        </div>
        <p className="text-sm truncate">{chat.lastMessage}</p>
      </div>
      <span className={`w-3 h-3 rounded-full ${chat.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
    </li>
  );
};

export default ChatItem;
