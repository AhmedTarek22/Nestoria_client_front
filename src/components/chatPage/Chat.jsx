


import SearchBar from './searchbar';
import ChatList from './chatList';
import MessageArea from './messageArea';
import MessageInput from './messageInput';
import React, { useState, useEffect, useRef } from 'react';
const ChatComponent = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChats, setFilteredChats] = useState([]);
  const [chats] = useState([
    {
      username: 'yussef makhlouf',
      avatarUrl: 'https://via.placeholder.com/40',
      lastMessage: 'Hey, how are you?',
      timestamp: Date.now(),
      status: 'online',
    },
    {
      username: 'Tarek Ahmed',
      avatarUrl: 'https://via.placeholder.com/40',
      lastMessage: 'See you later!',
      timestamp: Date.now(),
      status: 'offline',
    },
  ]);

  const messageEndRef = useRef(null);

  const handleSendMessage = () => {
    if (message) {
      const newMessage = {
        text: message,
        sender: 'currentUser',
        timestamp: Date.now(),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newMessage = {
        file: URL.createObjectURL(file),
        sender: 'currentUser',
        timestamp: Date.now(),
      };
      setMessages([...messages, newMessage]);
    }
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    const filtered = chats.filter(chat => chat.username.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredChats(filtered);
  }, [searchQuery, chats]);

  return (

    <div className=" mx-auto p-4 py-16 flex flex-col lg:flex-row h-screen bg-black text-[#929292] relative "
    style={{
      backgroundImage: "url('/body-bg.png')",
      backgroundPosition: "left top",
      backgroundSize: "auto",
      backgroundRepeat: "repeat",
      backgroundAttachment: "scroll",
      backgroundColor: "#101010",
    }}
    
    >

      {/* Sidebar */}
      <aside className="w-full lg:w-1/4 p-4 lg:p-6 flex flex-col border-b lg:border-b-0 lg:border-r border-[#929292] border border-[#A5A5A5] rounded-3xl overflow-hidden px-4 ">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="mb-6">
          <h3 className="text-[#929292] mb-3">Recent Chats</h3>
          <ChatList chats={filteredChats} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col border border-[#A5A5A5] rounded-3xl overflow-hidden">
        <MessageArea messages={messages} setMessages={setMessages} messageEndRef={messageEndRef} />
        <MessageInput
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          handleFileUpload={handleFileUpload}
        />
      </main>
    </div>
  );
};

export default ChatComponent;
