// Change `AuthContext` to `userContext` in AuthProvider
import { createContext, useContext } from 'react';
import useUserProfile from '../Custom Hooks/useUserProfile';

const userContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { loading, error, user, setUser , setError , setLoading } = useUserProfile();

  return (
    <userContext.Provider value={{ loading, error, user, setUser , setError , setLoading  }}>
      {children}
    </userContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(userContext); // Corrected to use `userContext`
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
