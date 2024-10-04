import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import SingleChat from "../components/SingleChat";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useUserInfoContext } from "../context/UserProvider";
import AdminLoader from "../components/adminLoader";
import moment from "moment/moment";
import { IoMailUnread } from "react-icons/io5";

const Chat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useUserInfoContext();
  const userId = currentUser?._id;
  // console.log("currentUser", currentUser);

  useEffect(() => {
    console.log("Loading state after:", isLoading);
  }, [isLoading]);

  useEffect(() => {
    const fetchChats = () => {
      if (!userId) return;

      const q = query(
        collection(db, "chats"),
        where("buyerId", "==", userId),
        orderBy("timestamp", "desc")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const chatList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChats(chatList);
      });

      return () => unsubscribe(); // إلغاء الاشتراك عند تفكيك المكون
    };

    fetchChats();
  }, [userId]);

  const handleSelectChat = (chat) => {
    setSelectedChatId(chat);
    // markMessagesAsRead(chat.id);
  };

  // function markMessagesAsRead(chatId) {
  //   const messagesRef = collection(db, `chats/${chatId}/messages`);
  //   const chatRef = doc(db, `chats/${chatId}`);
  //   const q = query(messagesRef, where("isRead", "==", false));

  //   onSnapshot(q, (snapshot) => {
  //     if (!snapshot.empty) {
  //       snapshot.forEach((doc) => {
  //         updateDoc(doc.ref, {
  //           isRead: true,
  //         }).catch((error) => {
  //           console.error("Error updating message: ", error);
  //         });
  //       });

  //       updateDoc(chatRef, {
  //         "lastMessage.isRead": true,
  //       })
  //         .then(() => {
  //           console.log("Last message marked as read");
  //         })
  //         .catch((error) => {
  //           console.error("Error updating last message: ", error);
  //         });
  //     }
  //   });
  // }

  return (
    <div
      className="relative flex flex-col lg:flex-row mx-auto mt-12 gap-3 h-[90vh] bg-black text-gray-400 overflow-hidden"
      style={{
        backgroundImage: "url('/body-bg.png')",
        backgroundPosition: "left top",
        backgroundSize: "auto",
        backgroundRepeat: "repeat",
        backgroundAttachment: "scroll",
        backgroundColor: "#1a1a1a",
      }}
    >
      {/* Toggle Button for Sidebar in Small Screens */}
      <button
        className="lg:hidden p-4 text-[#e7e7e7e5] absolute top-6 left-6 z-50 hover:text-[#C96B14] cursor-pointer transition-colors duration-300"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`max-h-[800px] overflow-auto lg:static transition-all transform lg:translate-x-0 absolute my-[30px] mx-[30px] ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-[200%]"
        } top-0 left-0 lg:w-1/4 w-3/4 bg-[#1a1a1a] lg:p-6 flex flex-col border-[#adadadbb] border-[1px] rounded-3xl z-40`}
      >
        <div className="mb-6 pt-4 overflow-y-auto overflow-x-hidden h-full custom-scrollbar">
          <h3 className="text-center text-xl text-gray-400 mb-4">All Chats</h3>
          {/* قائمة الشات */}
          <ul className="space-y-4 mx-3 lg:mx-0">
            {chats && chats.length > 0 ? (
              chats.map((chat) => (
                <li
                  key={chat.id}
                  onClick={() => handleSelectChat(chat)}
                  className={`cursor-pointer hover:bg-[#333] rounded-lg transition-all duration-200 px-2 py-2 ${
                    selectedChatId?.id === chat?.id && "bg-[#333]"
                  }`}
                >
                  {/* عرض آخر رسالة في المحادثة */}
                  <div className="flex">
                    <img
                      src={chat.sellerPhoto}
                      alt="sellerPhoto"
                      className="max-w-[50px] mr-2 rounded-full"
                    />
                    <div className="w-full">
                      <div className="flex justify-between">
                        <span className="">{chat.sellerName}</span>
                        {/* {!chat.lastMessage.isRead && (
                          <span className="">
                            <IoMailUnread className="text-yellow-400" />
                          </span>
                        )} */}
                      </div>
                      <p className="flex justify-between">
                        <span className="line-clamp-1 max-w-[66%]">
                          {chat.lastMessage
                            ? chat.lastMessage.text
                            : "There is no message yet"}
                        </span>
                        <span>
                          {chat.lastMessage && chat.lastMessage.timestamp
                            ? moment(chat.timestamp.toDate()).calendar()
                            : "No Date"}
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-center pt-6 ">There Is No Chats Yet!</p>
            )}
          </ul>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="my-[30px] mx-[20px] flex-1 flex flex-col border-[#adadadbb] border-[1px] max-h-[800px] overflow-auto rounded-3xl bg-[#1a1a1a] overflow-y-auto custom-scrollbar p-6">
        {/* محتوى الشات الرئيسي */}
        {isLoading ? (
          <div className="flex justify-center items-center h-[400px]">
            <AdminLoader />
          </div>
        ) : (
          <div className="flex-1 bg-[#292929] rounded-lg p-4">
            {/* رسائل الشات */}
            {selectedChatId ? (
              <SingleChat
                chat={selectedChatId}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
              />
            ) : (
              <p className="flex justify-center items-center mt-6">
                Please Select Chat First, To Start Chating 🎯
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Chat;
