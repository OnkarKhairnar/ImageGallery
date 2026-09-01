import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  register: (userData: Omit<User, 'id'>) => Promise<string | null>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = '@user';
const USERS_STORAGE_KEY = '@users';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = async () => {
    try {
      const stored = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to restore session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSession = async (userData: User) => {
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
  };

  const clearSession = async () => {
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
  };

  const getRegisteredUsers = async (): Promise<User[]> => {
    try {
      const stored = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const login = async (email: string, password: string): Promise<string | null> => {
    const users = await getRegisteredUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      return 'Invalid email or password';
    }
    const { password: _, ...sessionUser } = found;
    setUser(sessionUser as User);
    await saveSession(sessionUser as User);
    return null;
  };

  const register = async (userData: Omit<User, 'id'>): Promise<string | null> => {
    const users = await getRegisteredUsers();
    const exists = users.some(
      (u) => u.email.toLowerCase() === userData.email.toLowerCase()
    );
    if (exists) {
      return 'An account with this email already exists';
    }
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
    };
    users.push(newUser);
    await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    return null;
  };

  const logout = async () => {
    setUser(null);
    await clearSession();
  };

  const updateUser = async (updates: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updates };
      setUser(updated);
      await saveSession(updated);

      const users = await getRegisteredUsers();
      const index = users.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        users[index] = { ...users[index], ...updates };
        await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: user !== null,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
