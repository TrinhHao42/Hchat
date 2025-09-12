"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Message } from "@/types/model/Message";
import { Chatroom } from "@/types/model/Chatroom";
import useFetchData from "@/hooks/useFetchData"; // hook custom

const RoomChat = () => {
  const chatroomID = usePathname().split("/").pop();

  const { data: chatroomData, loading: chatroomLoading, error: chatroomError } =
    useFetchData<Chatroom>(chatroomID ? `chatrooms/${chatroomID}` : "", {
      method: "GET",
    });

  const {
    data: messagesData,
    loading: messagesLoading,
    error: messagesError,
  } = useFetchData<Message[]>(chatroomID ? `chatrooms/${chatroomID}/messages` : "", {
    method: "GET",
  });

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesData]);

  const handleSend = async () => {
    if (!newMessage.trim() || !chatroomID) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chatrooms/${chatroomID}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newMessage, user: "You" }),
      });

      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  if (chatroomLoading || messagesLoading) return <div>Loading...</div>;
  if (chatroomError) return <div>Error loading chatroom: {chatroomError.message}</div>;
  if (messagesError) return <div>Error loading messages: {messagesError.message}</div>;

  return (
    <div className="flex flex-col h-screen bg-white text-gray-900 font-inter">
      <header className="p-4 text-white font-bold text-lg shadow-md sticky top-0 z-10 bg-blue-600">
        <div className="mx-5 flex items-center text-black">
          <span>{chatroomData?.name || chatroomID}</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 max-w-3xl mx-auto w-full space-y-3 bg-gray-50">
        {messagesData?.map((msg: Message) => (
          <div
            key={msg.id}
            className={`flex ${msg.user === "You" ? "justify-end" : "justify-start"} group transition-all duration-300`}
          >
            <div
              className={`relative p-3 rounded-xl max-w-xs break-words shadow-lg transform hover:scale-105 transition-transform duration-200 ${
                msg.user === "You" ? "bg-blue-500 text-white" : "bg-white text-gray-900 border border-gray-200"
              }`}
            >
              <span className="block text-xs opacity-75">{msg.user}</span>
              <span className="block mt-1 text-sm">{msg.text}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-3xl mx-auto flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-gray-100 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 transition-all duration-200"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition-all duration-200 font-medium flex items-center gap-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomChat;
