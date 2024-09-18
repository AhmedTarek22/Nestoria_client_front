import React from 'react';
import ChatItem from './chatItem';

const ChatList = ({ chats, selectedChat, setSelectedChat }) => {
  return (
    <ul className="space-y-4">
      {chats.map((chat, index) => (
        <ChatItem
          key={index}
          chat={chat}
          isSelected={selectedChat?.username === chat.username}
          onSelect={setSelectedChat}
        />
      ))}
    </ul>
  );
};

export default ChatList;
