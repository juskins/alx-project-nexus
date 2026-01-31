import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Image from 'next/image';
import { Paperclip, Send } from 'lucide-react';

interface Message {
   id: number;
   text: string;
   time: string;
   sender: 'user' | 'other';
}

interface Conversation {
   id: number;
   name: string;
   avatar: string;
   lastMessage: string;
   time: string;
   unread?: boolean;
}

const Messages = () => {
   const [selectedConversation, setSelectedConversation] = useState<number>(1);
   const [messageInput, setMessageInput] = useState('');

   // Mock conversations data
   const conversations: Conversation[] = [
      {
         id: 1,
         name: 'University Bookstore',
         avatar: '/assets/images/bookstore-avatar.jpg',
         lastMessage: 'Got it! The textbooks are ready for pickup.',
         time: '2:30 PM',
      },
      {
         id: 2,
         name: 'Student Activities Office',
         avatar: '/assets/images/student-affairs-avatar.jpg',
         lastMessage: 'Thanks for organizing the event!',
         time: 'Yesterday',
      },
      {
         id: 3,
         name: 'Professor Johnson',
         avatar: '/assets/images/professor-johnson-avatar.jpg',
         lastMessage: 'I have a question about the assignment.',
         time: 'Mon',
      },
      {
         id: 4,
         name: 'Campus IT Support',
         avatar: '/assets/images/professor.jpg',
         lastMessage: 'Your network issue has been resolved.',
         time: 'Last Week',
      },
      {
         id: 5,
         name: 'Dining Services',
         avatar: '/assets/images/ava-profile.jpg',
         lastMessage: 'Is the dining hall open on holidays?',
         time: '2 weeks ago',
      },
   ];

   // Mock messages for the selected conversation
   const getMessagesForConversation = (conversationId: number): Message[] => {
      if (conversationId === 1) {
         return [
            {
               id: 1,
               text: 'Hi, I saw your post for the part-time assistant position at the Bookstore. Is it still available?',
               time: '2:20 PM',
               sender: 'user',
            },
            {
               id: 2,
               text: 'Yes, it is! We are looking for someone to start next week. Are you available for a quick chat tomorrow?',
               time: '2:05 PM',
               sender: 'other',
            },
            {
               id: 3,
               text: 'Absolutely! What time works best for you?',
               time: '2:10 PM',
               sender: 'user',
            },
            {
               id: 4,
               text: 'How about 10 AM? We can meet at the main counter.',
               time: '2:15 PM',
               sender: 'other',
            },
            {
               id: 5,
               text: 'Sounds good! See you then.',
               time: '2:20 PM',
               sender: 'user',
            },
            {
               id: 6,
               text: 'Great. Got it! The textbooks are ready for pickup.',
               time: '2:30 PM',
               sender: 'other',
            },
            {
               id: 7,
               text: 'Hello, I wanted to follow up on the status of my application for the data entry role. Is there any update?',
               time: '1:08 PM',
               sender: 'user',
            },
            {
               id: 8,
               text: 'Thank you for your patience. We are still reviewing applications and will reach out by the end of the week.',
               time: '3:05 PM',
               sender: 'other',
            },
            {
               id: 9,
               text: 'Understood. Is there anything else you need from me?',
               time: '3:10 PM',
               sender: 'user',
            },
            {
               id: 10,
               text: 'Not at this moment, but we appreciate your interest. We will be in touch soon.',
               time: '3:15 PM',
               sender: 'other',
            },
         ];
      }
      return [];
   };

   const messages = getMessagesForConversation(selectedConversation);
   const currentConversation = conversations.find((c) => c.id === selectedConversation);

   const handleSendMessage = () => {
      if (messageInput.trim()) {
         // Handle sending message
         console.log('Sending message:', messageInput);
         setMessageInput('');
      }
   };

   const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSendMessage();
      }
   };

   return (
      <DashboardLayout>
         <div className="h-[calc(100vh-80px)] max-w-7xl mx-auto px-8 overflow-hidden py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
               {/* Left Sidebar - Conversations List */}
               <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col">
                  {/* Header */}
                  <div className="p-4 border-b border-gray-200">
                     <h2 className="text-xl font-bold text-gray-900">Conversations</h2>
                  </div>

                  {/* Conversations List */}
                  <div className="flex-1 overflow-y-auto">
                     {conversations.map((conversation) => (
                        <div
                           key={conversation.id}
                           onClick={() => setSelectedConversation(conversation.id)}
                           className={`flex items-start gap-3 p-4 cursor-pointer transition-colors border-b border-gray-100 hover:bg-gray-50 ${selectedConversation === conversation.id ? 'bg-gray-50' : ''
                              }`}
                        >
                           {/* Avatar */}
                           <div className="flex-shrink-0">
                              <div className="w-12 h-12 rounded-full overflow-hidden">
                                 <Image
                                    src={conversation.avatar}
                                    alt={conversation.name}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover"
                                 />
                              </div>
                           </div>

                           {/* Conversation Info */}
                           <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-1">
                                 <h3 className="text-sm font-semibold text-gray-900 truncate">
                                    {conversation.name}
                                 </h3>
                                 <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                                    {conversation.time}
                                 </span>
                              </div>
                              <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Right Side - Chat Interface */}
               <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col">
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200">
                     <h2 className="text-xl font-bold text-gray-900">
                        {currentConversation?.name || 'Select a conversation'}
                     </h2>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                     {messages.map((message) => (
                        <div
                           key={message.id}
                           className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                           <div
                              className={`max-w-[70%] ${message.sender === 'user'
                                    ? 'bg-brand-color text-white'
                                    : 'bg-gray-100 text-gray-900'
                                 } rounded-lg px-4 py-3`}
                           >
                              <p className="text-sm leading-relaxed">{message.text}</p>
                              <p
                                 className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/80' : 'text-gray-500'
                                    }`}
                              >
                                 {message.time}
                              </p>
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                     <div className="flex items-end gap-3">
                        {/* Attachment Button */}
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                           <Paperclip className="w-5 h-5" />
                        </button>

                        {/* Input Field */}
                        <div className="flex-1">
                           <input
                              type="text"
                              value={messageInput}
                              onChange={(e) => setMessageInput(e.target.value)}
                              onKeyPress={handleKeyPress}
                              placeholder="Type your message here..."
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-color focus:border-transparent outline-none transition-all text-gray-700"
                           />
                        </div>

                        {/* Send Button */}
                        <button
                           onClick={handleSendMessage}
                           className="p-3 bg-brand-color hover:bg-brand-color/90 text-white rounded-lg transition-colors flex-shrink-0"
                        >
                           <Send className="w-5 h-5" />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </DashboardLayout>
   );
};

export default Messages;
