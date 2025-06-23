import { useState, useMemo } from 'react';
import type { Book } from '@/types/book';
import useDebounce from '@hooks/useDebounce';

const useSearchAndFilter = (books: Book[], favoriteBookIds: Set<string>) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterByFavorites, setFilterByFavorites] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
      const matchesFavorites =
        !filterByFavorites || favoriteBookIds.has(book.id);
      return matchesSearch && matchesFavorites;
    });
  }, [books, debouncedSearchQuery, filterByFavorites, favoriteBookIds]);

  return {
    filteredBooks,
    searchQuery,
    setSearchQuery,
    filterByFavorites,
    setFilterByFavorites,
  };
};

export default useSearchAndFilter;
