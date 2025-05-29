import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../components/Toast';

const AuthContext = createContext(null);

// Create a base URL for all API calls
const API_URL = 'http://localhost:5000/api';
const AUTH_API_URL = `${API_URL}/auth`;

// Configure axios defaults
axios.defaults.withCredentials = true;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add axios interceptor for JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const response = await axios.post(`${AUTH_API_URL}/refresh-token`, {
          refreshToken: localStorage.getItem('refreshToken')
        });
        const { token } = response.data;

        // Update token in localStorage
        localStorage.setItem('token', token);

        // Update the Authorization header
        originalRequest.headers.Authorization = `Bearer ${token}`;

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh token fails, log out the user
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      // First check if Google OAuth is enabled
      const response = await api.get(`${AUTH_API_URL}/google`);
      
      // If we get here, it means the server returned a non-501 response
      // Open Google OAuth popup
      const popup = window.open(
        `${AUTH_API_URL}/google`,
        'Google Sign In',
        'width=500,height=600,popup=true'
      );

      if (!popup) {
        throw new Error('Popup blocked. Please allow popups for this site.');
      }

      // Listen for messages from the popup
      const result = await new Promise((resolve, reject) => {
        const messageHandler = (event) => {
          if (event.origin !== window.location.origin) return;
          
          if (event.data.type === 'GOOGLE_SIGN_IN_SUCCESS') {
            window.removeEventListener('message', messageHandler);
            resolve(event.data);
          }
          if (event.data.type === 'GOOGLE_SIGN_IN_ERROR') {
            window.removeEventListener('message', messageHandler);
            reject(new Error(event.data.error));
          }
        };

        window.addEventListener('message', messageHandler);

        // Check if popup was closed
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed);
            window.removeEventListener('message', messageHandler);
            reject(new Error('Authentication cancelled'));
          }
        }, 1000);
      });

      if (result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('refreshToken', result.refreshToken);
        setUser(result.user);
        addToast('Successfully signed in with Google!', 'success');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Google sign in error:', error);
      let message = 'Failed to sign in with Google';
      
      if (error.response?.status === 501) {
        message = 'Google sign-in is not available at the moment. Please use email/password to sign in.';
      } else if (error.message === 'Popup blocked') {
        message = 'Please allow popups for this site to use Google sign-in.';
      }
      
      addToast(message, 'error');
      throw error;
    }
  };

  const signIn = async (login, password) => {
    try {
      const response = await api.post('/auth/signin', {
        login,
        password
      });

      const { token, refreshToken, user: userData } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      setUser(userData);
      addToast('Successfully signed in!', 'success');
      return true;
    } catch (error) {
      console.error('Sign in error:', error);
      const message = error.response?.data?.message || 'Invalid credentials';
      addToast(message, 'error');
      throw new Error(message);
    }
  };

  const signUp = async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData);
      
      const { token, refreshToken, user: newUser } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      setUser(newUser);
      addToast('Account created successfully!', 'success');
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      let message = 'Failed to create account. Please try again.';
      
      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.message === 'Network Error') {
        message = 'Unable to connect to the server. Please check your internet connection.';
      }
      
      addToast(message, 'error');
      throw new Error(message);
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setUser(null);
    addToast('Logged out successfully', 'success');
  };

  const updateProfile = async (userData) => {
    try {
      const response = await api.put('/users/profile', userData);
      setUser(response.data);
      addToast('Profile updated successfully', 'success');
      return true;
    } catch (error) {
      console.error('Update user error:', error);
      const message = error.response?.data?.message || 'Failed to update profile';
      addToast(message, 'error');
      throw new Error(message);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signInWithGoogle,
    signOut,
    signUp,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 