import { useState } from "react";
import { useChatStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@/types/user";
import { motion } from "framer-motion";

export const UserManagement = () => {
  const { currentUser, users, addUser, removeUser } = useChatStore();
  const [newUserName, setNewUserName] = useState("");
  const [newUserRole, setNewUserRole] = useState<UserRole>("employee");

  const handleAddUser = () => {
    if (!newUserName.trim()) return;

    addUser({
      id: Date.now().toString(),
      name: newUserName,
      role: newUserRole,
    });

    setNewUserName("");
  };

  if (currentUser?.role !== "admin") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 border-t border-gray-200"
    >
      <h3 className="text-lg font-semibold mb-4">User Management</h3>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <Input
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="New user name"
            className="flex-1"
          />
          <Select value={newUserRole} onValueChange={(value) => setNewUserRole(value as UserRole)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="processor">Processor</SelectItem>
              <SelectItem value="employee">Employee</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAddUser}>Add User</Button>
        </div>
        <div className="space-y-2">
          {users
            .filter((user) => user.id !== currentUser.id)
            .map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <span>{user.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{user.role}</span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeUser(user.id)}
                  >
                    Remove
                  </Button>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};