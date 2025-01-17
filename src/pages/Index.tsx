import { useEffect } from "react";
import { UserList } from "@/components/UserList";
import { ChatWindow } from "@/components/ChatWindow";
import { UserManagement } from "@/components/UserManagement";
import { useChatStore } from "@/lib/store";

const Index = () => {
  const { setCurrentUser } = useChatStore();

  useEffect(() => {
    // For demo purposes, set the current user as admin
    setCurrentUser({
      id: "1",
      name: "Admin User",
      role: "admin",
    });
  }, [setCurrentUser]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 h-screen">
        <div className="bg-white rounded-lg shadow-sm border h-full flex overflow-hidden">
          <UserList />
          <div className="flex-1 flex flex-col">
            <ChatWindow />
            <UserManagement />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;