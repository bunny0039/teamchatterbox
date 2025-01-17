import { create } from "zustand";
import { User, Message, UserRole } from "@/types/user";

interface ChatStore {
  currentUser: User | null;
  users: User[];
  messages: Message[];
  selectedChat: string | null;
  setCurrentUser: (user: User) => void;
  addUser: (user: User) => void;
  removeUser: (userId: string) => void;
  addMessage: (message: Message) => void;
  setSelectedChat: (userId: string | null) => void;
  canChat: (userId: string) => boolean;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  currentUser: null,
  users: [
    { id: "1", name: "Admin User", role: "admin" },
    { id: "2", name: "Processor 1", role: "processor" },
    { id: "3", name: "Employee 1", role: "employee" },
  ],
  messages: [],
  selectedChat: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  removeUser: (userId) =>
    set((state) => ({ users: state.users.filter((u) => u.id !== userId) })),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setSelectedChat: (userId) => set({ selectedChat: userId }),
  canChat: (userId) => {
    const currentUser = get().currentUser;
    const targetUser = get().users.find((u) => u.id === userId);
    
    if (!currentUser || !targetUser) return false;
    
    if (currentUser.role === "admin") return true;
    if (currentUser.role === "processor" && targetUser.role === "employee") return true;
    if (currentUser.role === "employee" && targetUser.role === "processor") return true;
    
    return false;
  },
}));