import { useState } from "react";
import { useChatStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export const ChatWindow = () => {
  const { selectedChat, currentUser, users, messages, addMessage } = useChatStore();
  const [newMessage, setNewMessage] = useState("");

  const selectedUser = users.find((u) => u.id === selectedChat);
  const chatMessages = messages.filter(
    (m) =>
      (m.senderId === currentUser?.id && m.receiverId === selectedChat) ||
      (m.senderId === selectedChat && m.receiverId === currentUser?.id)
  );

  const handleSend = () => {
    if (!newMessage.trim() || !currentUser || !selectedChat) return;

    addMessage({
      id: Date.now().toString(),
      senderId: currentUser.id,
      receiverId: selectedChat,
      content: newMessage,
      timestamp: Date.now(),
    });

    setNewMessage("");
  };

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">{selectedUser?.name}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${
              message.senderId === currentUser?.id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.senderId === currentUser?.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-gray-100"
              }`}
            >
              {message.content}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex space-x-2"
        >
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};