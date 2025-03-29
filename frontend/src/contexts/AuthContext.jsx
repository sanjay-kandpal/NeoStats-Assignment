// client/src/contexts/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import apiClient from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user on initial render
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/me');
        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (err) {
        // If error is 401, user is not authenticated (expected)
        if (err.response && err.response.status !== 401) {
          setError('Failed to load user data');
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await apiClient.post('/register', userData);
      
      if (response.data.success) {
        setUser(response.data.user);
        return { success: true };
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      return { 
        success: false, 
        message: err.response?.data?.message || 'Registration failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (userData) => {
    try {
      setLoading(true);
      const response = await apiClient.post('/login', userData);
      
      if (response.data.success) {
        setUser(response.data.user);
        return { success: true };
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return { 
        success: false, 
        message: err.response?.data?.message || 'Login failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/logout');
      
      if (response.data.success) {
        setUser(null);
        return { success: true };
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Logout failed');
      return { 
        success: false, 
        message: err.response?.data?.message || 'Logout failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Reset error
  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};