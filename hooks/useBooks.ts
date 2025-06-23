import useBookManager from '@hooks/useBookManager';
import useFavorites from '@hooks/useFavorites';
import useSearchAndFilter from '@hooks/useSearchAndFilters';

const useBooks = () => {
  const { combinedBooks, addBook, editBook, deleteBook, status, error } =
    useBookManager();
  const { favoriteBookIds, toggleFavorite } = useFavorites();
  const {
    filteredBooks,
    searchQuery,
    setSearchQuery,
    filterByFavorites,
    setFilterByFavorites,
  } = useSearchAndFilter(combinedBooks, favoriteBookIds);

  return {
    books: filteredBooks,
    addBook,
    editBook,
    deleteBook,
    favoriteBookIds,
    status,
    error,
    toggleFavorite,
    searchQuery,
    setSearchQuery,
    filterByFavorites,
    setFilterByFavorites,
  };
};

export default useBooks;
