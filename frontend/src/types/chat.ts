export interface Participant {
  _id: string;
  displayName: string;
  avatarUrl: string | null;
  joinedAt: string;
}

export interface SeenUser {
    _id: string;
    displayName: string;
    avatarUrl : string;
}

export interface Group {
  name?: string | null;
  createdBy: string; // user id
}

export interface LastMessage {
  _id: string;
  content: string;
  createdAt: string;
  sender: {
    _id: string;
    displayName: string;
    avatarUrl?: string | null;
  };
}

export interface Conversation {
  _id: string;
  type: "direct" | "group";
  participants: Participant[];
  group?: Group | null;
  lastMessageAt?: string | null;
  seenBy?: SeenUser[]; 
  lastMessage?: LastMessage | null;
  unreadCounts?: Record<string, number>; // map userId -> unread count
  createdAt: string;
  updatedAt: string;
}

export interface ConversationResponse {
  conversations: Conversation[]
}
export interface Message {
  id: string,
  conversationId: string,
  senderId: string,
  content: string | null,
  imgUrl: string
}