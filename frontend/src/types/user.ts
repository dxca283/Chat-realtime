export interface User {
  _id: string;
  username: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
  phone: string;
}
export interface Friend {
  _id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
}

export interface FriendRequest {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
}
