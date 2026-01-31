export interface Message {
   id: number;
   text: string;
   time: string;
   sender: 'user' | 'other';
}

export interface Conversation {
   id: number;
   name: string;
   avatar: string;
   lastMessage: string;
   time: string;
   unread?: boolean;
}