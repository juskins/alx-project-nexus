import { Conversation, Message } from '@/interfaces';
import {
   LayoutDashboard,
   Search,
   PlusSquare,
   User,
   MessageSquare,
   LogOut
} from 'lucide-react';
import { BookOpen, Briefcase, FlaskConical, Monitor, Users, Utensils, Megaphone, Home } from 'lucide-react';


export const menuItems = [
      {
         icon: LayoutDashboard,
         label: 'Dashboard',
         href: '/dashboard',
      },
      {
         icon: Search,
         label: 'Find Jobs',
         href: '/find-jobs',
      },
      {
         icon: PlusSquare,
         label: 'Post a Job',
         href: '/post-job',
      },
      {
         icon: User,
         label: 'My Profile',
         href: '/profile',
      },
      {
         icon: MessageSquare,
         label: 'Messages',
         href: '/messages',
      },
   ];

  export const jobs = [
    {
      image: '/assets/images/event_cordinators.jpg',
      category: 'Student Life Office',
      department: 'Student Life Office',
      address: 'Student Union',
      location: 'main-campus',
      title: 'Campus Event Coordinators',
      pay: '$15/hour',
      type: 'Event Planning',
      postedTime: '2 hours ago',
      duration: 'full day',
      time: 'any time',
    },
     {
       image: '/assets/images/library.jpg',
      category: 'University Library',
      department: 'University Library',
       address: 'Main Campus Library',
      location: 'main-campus',
      title: 'Library Cataloging Aid',
      pay: '$12.50/hour',
      type: 'Administrative',
      postedTime: '5 hours ago',
       icon: BookOpen,
      duration: 'full day',
      time: 'any time',
    },
    {
      image: '/assets/images/research.jpg',
      category: 'Biology Department',
      department: 'Biology Department',
      location: 'north-campus',
      address: 'Science Building Lab',
      title: 'Research Assistant Dept.',
      pay: '$18/hour',
      type: 'Research',
      postedTime: '1 day ago',
      icon: FlaskConical,
      duration: '1-2 hours',
      time: 'any time',
    },
     {
        image: '/assets/images/call-center.jpg',
      category: 'Campus IT Services',
      department: 'Campus IT Services',
       location: 'north-campus',
       address: 'Tech Support Center',
      title: 'IT Help Desk Support',
      pay: '$16/hour',
      type: 'Technology',
      postedTime: '1 day ago',
       icon: Monitor,
      duration: '2-4 hours',
      time: 'weekend',
    },
     {
       image: '/assets/images/fitness.jpg',
      category: 'Campus Recreation',
      department: 'Campus Recreation',
      location: 'south-campus',
      address: 'Campus Gym',
      title: 'Fitness Center Front Desk',
      pay: '$14/hour',
      type: 'Customer Service',
      postedTime: '2 days ago',
       icon: Users,
      duration: '2-4 hours',
      time: 'evening',
    },
    {
      image: '/assets/images/cafeteria.jpg',
      category: 'Dining Services',
      department: 'Dining Services',
      location: 'east-campus',
      address: 'Student Cafeteria',
      title: 'Cafeteria Kitchen Assistant',
      pay: '$13/hour',
      type: 'Food Service',
      postedTime: '3 days ago',
      icon: Utensils,
      duration: '2-4 hours',
      time: 'evening',
    },
     {
      image: '/assets/images/socialMedia_intern.jpg',
      category: 'University Communications',
      department: 'University Communications',
      location: 'east-campus',
      address: 'Remote/Hybrid',
      title: 'Social Media Intern',
      pay: '$17/hour',
      type: 'Marketing',
      postedTime: '4 days ago',
       icon: Megaphone,
      duration: '4-8 hours',
      time: 'afternoon',
    },
    {
      image: '/assets/images/model.jpg',
      category: 'Photography',
      department: 'Photography Club',
      location: 'west-campus',
      address: 'Campus Dorms',  
      title: 'Model for Campus Photo Shoot',
      pay: '$1,000/month (Stipend)',
      type: 'Freelance',
      postedTime: '5 days ago',
      icon: Home,
      duration: 'ongoing',
      time: 'morning',
    },
];

export // Mock conversations data
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
  

export // Mock messages for the selected conversation
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
      else if (conversationId === 2) {
         return [
            {
               id: 1,
               text: 'Hi, I saw your post for the event',
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