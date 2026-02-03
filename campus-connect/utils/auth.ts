import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

/**
 * Check if code is running in browser (not SSR)
 */
const isBrowser = typeof window !== 'undefined';

/**
 * Logout user - clears token from localStorage and calls backend logout endpoint
 * @returns Promise with logout response
 */
export const logoutUser = async (): Promise<any> => {
   try {
      if (!isBrowser) return;

      const token = localStorage.getItem('token');

      if (token) {
         // Call backend logout endpoint
         await axios.post(
            `${API_URL}/logout`,
            {},
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );
      }

      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Redirect to login
      window.location.href = '/login';
   } catch (error) {
      console.error('Logout error:', error);
      // Clear localStorage even if API call fails
      if (isBrowser) {
         localStorage.removeItem('token');
         localStorage.removeItem('user');
         window.location.href = '/login';
      }
   }
};

/**
 * Get authentication token from localStorage
 * @returns Token string or null
 */
export const getAuthToken = (): string | null => {
   if (!isBrowser) return null;
   return localStorage.getItem('token');
};

/**
 * Get stored user data from localStorage
 * @returns User object or null
 */
export const getStoredUser = (): any => {
   if (!isBrowser) return null;

   const userStr = localStorage.getItem('user');
   if (!userStr) return null;

   try {
      return JSON.parse(userStr);
   } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
   }
};

/**
 * Check if user is authenticated
 * @returns boolean
 */
export const isAuthenticated = (): boolean => {
   if (!isBrowser) return false;
   return !!localStorage.getItem('token');
};
