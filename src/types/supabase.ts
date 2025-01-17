export type UserRole = 'admin' | 'processor' | 'employee';

export type DbUser = {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  created_at: string;
};

export type DbMessage = {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
};