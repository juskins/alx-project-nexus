import {
   LayoutDashboard,
   Search,
   PlusSquare,
   User,
   MessageSquare,
   LogOut
} from 'lucide-react';

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