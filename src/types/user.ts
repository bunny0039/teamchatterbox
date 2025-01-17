export type UserRole = "admin" | "processor" | "employee";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: number;
}