import { User } from "@/types/user";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useChatStore } from "@/lib/store";
import { motion } from "framer-motion";

const roleColors = {
  admin: "bg-red-100 text-red-800",
  processor: "bg-purple-100 text-purple-800",
  employee: "bg-green-100 text-green-800",
};

export const UserList = () => {
  const { users, selectedChat, setSelectedChat, currentUser, canChat } = useChatStore();

  return (
    <div className="w-80 border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Chats</h2>
      </div>
      <div className="space-y-1">
        {users
          .filter((user) => user.id !== currentUser?.id)
          .map((user) => (
            <motion.button
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "w-full p-4 text-left hover:bg-gray-50 transition-colors",
                selectedChat === user.id && "bg-gray-50",
                !canChat(user.id) && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => canChat(user.id) && setSelectedChat(user.id)}
              disabled={!canChat(user.id)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  {user.name[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{user.name}</span>
                    <Badge variant="secondary" className={cn("text-xs", roleColors[user.role])}>
                      {user.role}
                    </Badge>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
      </div>
    </div>
  );
};