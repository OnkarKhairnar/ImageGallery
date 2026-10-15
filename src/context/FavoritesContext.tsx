import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageItem } from '../types';
import { useAuth } from './AuthContext';

interface FavoritesContextType {
  favorites: ImageItem[];
  isLoading: boolean;
  addFavorite: (image: ImageItem) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_STORAGE_KEY = '@favorites';

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<ImageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Favorites are stored per account so they follow the signed-in user
  const storageKey = user ? `${FAVORITES_STORAGE_KEY}:${user.id}` : null;

  useEffect(() => {
    let cancelled = false;

    const loadFavorites = async () => {
      if (!storageKey) {
        setFavorites([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const stored = await AsyncStorage.getItem(storageKey);
        if (!cancelled) {
          setFavorites(stored ? JSON.parse(stored) : []);
        }
      } catch (error) {
        console.error('Failed to load favorites:', error);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadFavorites();
    return () => {
      cancelled = true;
    };
  }, [storageKey]);

  const saveFavorites = async (items: ImageItem[]) => {
    if (!storageKey) return;
    await AsyncStorage.setItem(storageKey, JSON.stringify(items));
  };

  const addFavorite = async (image: ImageItem) => {
    if (favorites.some((img) => img.id === image.id)) return;
    const updated = [...favorites, image];
    setFavorites(updated);
    await saveFavorites(updated);
  };

  const removeFavorite = async (id: string) => {
    const updated = favorites.filter((img) => img.id !== id);
    setFavorites(updated);
    await saveFavorites(updated);
  };

  const isFavorite = (id: string) => {
    return favorites.some((img) => img.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isLoading, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
