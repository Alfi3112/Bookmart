import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'antd';

import type { AppDispatch, RootState } from '@store/store';
import { fetchBooks } from '@store/bookSlice';
import type { Book } from '@/types/book';

const useBookManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books, status, error } = useSelector(
    (state: RootState) => state.books
  );

  const [localBooks, setLocalBooks] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem('localBooks');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const booksFetchedRef = useRef(false);

  useEffect(() => {
    if (!booksFetchedRef.current) {
      dispatch(fetchBooks());
      booksFetchedRef.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    if (status === 'failed' && error) {
      notification.error({
        message: 'Error',
        description: error,
      });
    }
  }, [status, error]);

  const addBook = useCallback(
    (book: Book) => {
      try {
        const updatedBooks = [
          ...localBooks,
          { ...book, id: `local-${Date.now()}` },
        ];
        setLocalBooks(updatedBooks);
        localStorage.setItem('localBooks', JSON.stringify(updatedBooks));
        notification.success({
          message: 'Success',
          description: 'Book added successfully',
        });
      } catch (err) {
        console.error('Failed to add book', err);
        notification.error({
          message: 'Error',
          description: 'Failed to add book',
        });
      }
    },
    [localBooks]
  );

  const editBook = useCallback(
    (book: Book) => {
      try {
        const updatedBooks = localBooks.map((b) =>
          b.id === book.id ? book : b
        );
        setLocalBooks(updatedBooks);
        localStorage.setItem('localBooks', JSON.stringify(updatedBooks));
        notification.success({
          message: 'Success',
          description: 'Book updated successfully',
        });
      } catch (err) {
        console.error('Failed to edit book', err);
        notification.error({
          message: 'Error',
          description: 'Failed to update book',
        });
      }
    },
    [localBooks]
  );

  const deleteBook = useCallback(
    (bookId: string) => {
      try {
        const updatedBooks = localBooks.filter((book) => book.id !== bookId);
        setLocalBooks(updatedBooks);
        localStorage.setItem('localBooks', JSON.stringify(updatedBooks));
        notification.success({
          message: 'Success',
          description: 'Book deleted successfully',
        });
      } catch (err) {
        console.error('Failed to delete book', err);
        notification.error({
          message: 'Error',
          description: 'Failed to delete book',
        });
      }
    },
    [localBooks]
  );

  const combinedBooks = [...localBooks, ...books];

  return {
    combinedBooks,
    addBook,
    editBook,
    deleteBook,
    status,
    error,
  };
};

export default useBookManager;
