export type Tab = "dashboard" | "rooms" | "explore" | "messages" | "profile";
export type RoomVisibility = "Public" | "Private";
export type PostType = "Doubt" | "Solution" | "AI Assist";
export type AuthMode = "signin" | "signup";

export type StudentStatus = "Online" | "Studying" | "Offline";

export type Student = {
  id: number;
  name: string;
  username: string;
  focus: string;
  streak: number;
  credits: number;
  rooms: number;
  posts: number;
  badge: string;
  status: StudentStatus;
};

export type CurrentUser = {
  name: string;
  username: string;
  focus: string;
  streak: number;
  credits: number;
  badge: string;
  status: StudentStatus;
};

export type Post = {
  id: number;
  author: string;
  role: string;
  type: PostType;
  title: string;
  content: string;
  room: string;
  likes: number;
  replies: number;
  aiShared?: boolean;
  tags: string[];
};

export type Room = {
  id: number;
  name: string;
  subject: string;
  visibility: RoomVisibility;
  members: number;
  activeNow: number;
  code: string;
  description: string;
  tags: string[];
  pinnedQuestion: string;
};

export type Message = {
  id: number;
  from: string;
  focus: string;
  preview: string;
  time: string;
  unread: boolean;
};

export type NewRoomForm = {
  name: string;
  subject: string;
  visibility: RoomVisibility;
};

export type JoinRoomForm = {
  code: string;
};

export type NewPostForm = {
  title: string;
  content: string;
  room: string;
  type: PostType;
};

export type AuthCredentials = {
  email: string;
  password: string;
  fullName?: string;
  focus?: string;
};

export type DashboardStat = {
  label: string;
  value: string;
  hint: string;
};
