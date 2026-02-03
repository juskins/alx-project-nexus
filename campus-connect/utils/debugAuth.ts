import { getAuthToken, getStoredUser } from './auth';

/**
 * Debug authentication issues
 * Call this function in your browser console or component to check auth status
 */
export const debugAuth = () => {
   const token = getAuthToken();
   const user = getStoredUser();

   console.log('=== AUTH DEBUG INFO ===');
   console.log('Token exists:', !!token);
   console.log('Token value:', token ? `${token.substring(0, 20)}...` : 'No token');
   console.log('User data:', user);
   console.log('User role:', user?.role);
   console.log('Is Employer/Admin:', user?.role === 'employer' || user?.role === 'admin');

   if (!token) {
      console.error('❌ NO TOKEN FOUND - User needs to login');
      return {
         issue: 'No token',
         solution: 'User must login first',
      };
   }

   if (!user) {
      console.warn('⚠️ Token exists but no user data stored');
      return {
         issue: 'No user data',
         solution: 'User data might have been cleared. Try logging in again.',
      };
   }

   if (user.role !== 'employer' && user.role !== 'admin') {
      console.error(`❌ WRONG ROLE - User role is "${user.role}" but needs to be "employer" or "admin"`);
      return {
         issue: 'Insufficient permissions',
         solution: 'User must have employer or admin role to post jobs',
      };
   }

   // Try to decode JWT (basic check)
   try {
      const parts = token.split('.');
      if (parts.length !== 3) {
         console.error('❌ INVALID TOKEN FORMAT');
         return {
            issue: 'Invalid token format',
            solution: 'Token is malformed. Try logging in again.',
         };
      }

      const payload = JSON.parse(atob(parts[1]));
      console.log('Token payload:', payload);
      console.log('Token expires:', new Date(payload.exp * 1000).toLocaleString());

      const isExpired = payload.exp * 1000 < Date.now();
      if (isExpired) {
         console.error('❌ TOKEN EXPIRED');
         return {
            issue: 'Token expired',
            solution: 'Please login again',
         };
      }

      console.log('✅ All checks passed!');
      return {
         issue: null,
         solution: 'Authentication looks good',
      };
   } catch (error) {
      console.error('❌ Error decoding token:', error);
      return {
         issue: 'Token decode error',
         solution: 'Token might be corrupted. Try logging in again.',
      };
   }
};

/**
 * Check if user can post jobs
 */
export const canPostJobs = (): boolean => {
   const user = getStoredUser();
   return user?.role === 'employer' || user?.role === 'admin';
};

/**
 * Get authorization header for API calls
 */
export const getAuthHeader = () => {
   const token = getAuthToken();
   if (!token) return {};

   return {
      Authorization: `Bearer ${token}`,
   };
};
