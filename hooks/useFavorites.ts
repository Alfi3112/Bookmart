import { useState, useCallback } from 'react';
import { notification } from 'antd';

const useFavorites = () => {
  const [favoriteBookIds, setFavoriteBookIds] = useState<Set<string>>(() => {
    try {
      const item = localStorage.getItem('favoriteBookIds');
      const value = item ? JSON.parse(item) : [];
      return new Set(value);
    } catch (error) {
      console.error('Error reading local storage:', error);
      return new Set();
    }
  });

  const toggleFavorite = useCallback((bookId: string) => {
    setFavoriteBookIds((prevFavoriteBookIds) => {
      const updatedFavoriteBookIds = new Set(prevFavoriteBookIds);
      if (updatedFavoriteBookIds.has(bookId)) {
        updatedFavoriteBookIds.delete(bookId);
        notification.success({
          message: 'Success',
          description: 'Book removed from favorites',
        });
      } else {
        updatedFavoriteBookIds.add(bookId);
        notification.success({
          message: 'Success',
          description: 'Book added to favorites',
        });
      }
      localStorage.setItem(
        'favoriteBookIds',
        JSON.stringify(Array.from(updatedFavoriteBookIds))
      );
      return updatedFavoriteBookIds;
    });
  }, []);

  return {
    favoriteBookIds,
    toggleFavorite,
  };
};

export default useFavorites;
