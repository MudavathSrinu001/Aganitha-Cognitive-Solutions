import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'book-finder-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error parsing saved favorites:', error);
        setFavorites([]);
      }
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (book) => {
    setFavorites(prev => {
      // Check if book is already in favorites
      const isAlreadyFavorite = prev.some(fav => fav.key === book.key);
      if (isAlreadyFavorite) {
        return prev;
      }
      return [...prev, book];
    });
  };

  const removeFromFavorites = (bookKey) => {
    setFavorites(prev => prev.filter(book => book.key !== bookKey));
  };

  const toggleFavorite = (book) => {
    const isFavorite = favorites.some(fav => fav.key === book.key);
    if (isFavorite) {
      removeFromFavorites(book.key);
    } else {
      addToFavorites(book);
    }
  };

  const isFavorite = (bookKey) => {
    return favorites.some(fav => fav.key === bookKey);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoritesCount: favorites.length
  };
};
