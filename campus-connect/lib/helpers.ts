// Helper function to calculate time ago
export const getTimeAgo = (date: string) => {
   const now = new Date();
   const posted = new Date(date);
   const diffInMs = now.getTime() - posted.getTime();
   const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
   const diffInDays = Math.floor(diffInHours / 24);

   if (diffInHours < 1) return 'Just now';
   if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
   if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
   if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? 's' : ''} ago`;
   return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) > 1 ? 's' : ''} ago`;
};