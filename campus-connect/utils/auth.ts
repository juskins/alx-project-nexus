import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

/**
 * Logout user - clears token from localStorage and calls backend logout endpoint
 * @returns Promise with logout response
 */
export const logoutUser = async () => {
   try {
      const token = localStorage.getItem('token');

      if (token) {
         // Call backend logout endpoint (optional - for logging purposes)
         await axios.post(`${API_URL}/logout`, {}, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
      }

      // Clear token from localStorage
      localStorage.removeItem('token');

      // Clear any other user data you might have stored
      localStorage.removeItem('user');

      return { success: true, message: 'Logged out successfully' };
   } catch (error: any) {
      // Even if backend call fails, still clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      console.error('Logout error:', error);
      return {
         success: false,
         message: error.response?.data?.message || 'Logout failed'
      };
   }
};

/**
 * Check if user is authenticated
 * @returns boolean
 */
export const isAuthenticated = (): boolean => {
   const token = localStorage.getItem('token');
   return !!token;
};

/**
 * Get stored auth token
 * @returns string | null
 */
export const getAuthToken = (): string | null => {
   return localStorage.getItem('token');
};

/**
 * Get stored user data
 * @returns object | null
 */
export const getStoredUser = (): any | null => {
   const user = localStorage.getItem('user');
   return user ? JSON.parse(user) : null;
};
