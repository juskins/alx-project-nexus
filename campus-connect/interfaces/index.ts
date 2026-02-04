export interface Job {
   _id: string;
   image: string;
   category: string;
   department: string;
   address: string;
   location: string;
   title: string;
   payRate: number;
   pay?: string;
   type: string;
   postedTime?: string;
   duration: string;
   time: string;
   createdAt: string;
   icon?: any;
}

export interface FilterContextType {
   category: string;
   setCategory: (value: string) => void;
   pay: string;
   setPay: (value: string) => void;
   duration: string;
   setDuration: (value: string) => void;
   time: string;
   setTime: (value: string) => void;
   location: string;
   setLocation: (value: string) => void;
   clearAll: () => void;
   filteredJobs: Job[];
   search: string;
   setSearch: (value: string) => void;
   addJob: (job: Job) => void;
   allJobs: Job[];
   loading: boolean;
   error: string | null;
   refreshJobs: () => void;
}


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

export interface DashboardStats {
   activeJobs: number;
   appliedJobs?: number;
   completedJobs?: number;
   totalApplications?: number;
   pendingApplications?: number;
}

export interface JobCardProps {
   _id: string;
   image?: string;
   category: string;
   department: string;
   location: string;
   title: string;
   pay: string;
   type: string;
   postedTime: string;
   icon?: React.ReactNode;
   address: string;
}

export interface EditProfileModalProps {
   isOpen: boolean;
   onClose: () => void;
   userData: {
      name: string;
      email: string;
      bio?: string;
      phone?: string;
      department?: string;
      studentId?: string;
      skills?: string[];
      linkedin?: string;
      website?: string;
   };
   onSuccess: () => void;
}

export interface PreviewModalProps {
   isOpen: boolean;
   onClose: () => void;
   jobData: {
      jobTitle: string;
      jobDescription: string;
      payRate: string;
      category: string;
      location: string;
      duration: string;
   };
   image?: string;
}


export interface UserProfile {
   _id: string;
   name: string;
   email: string;
   role: string;
   bio?: string;
   avatar?: string;
   phone?: string;
   department?: string;
   studentId?: string;
   skills?: string[];
   linkedin?: string;
   website?: string;
   createdAt: string;
}

export interface ProfileStats {
   completedJobs: number;
   ongoingJobs: number;
   postedJobs: number;
}

export interface JobDetails {
   _id: string;
   title: string;
   description: string;
   payRate: number;
   image: string;
   address: string;
   location: string;
   duration: string;
   time: string;
   type: string;
   category: string;
   department: string;
   postedBy: {
      _id: string;
      name: string;
      email: string;
      role: string;
   };
   createdAt: string;
}