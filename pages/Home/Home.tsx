import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  Suspense,
  lazy,
} from 'react';
import { Spin, Alert, Pagination, Button, Modal, Result, Layout } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

import BookItem from '@/components/book/BookItem/BookItem';
import BookForm from '@/components/book/BookForm/BookForm';
import type { Book } from '@/types/book';
import usePagination from '@hooks/usePagination';
import useBooks from '@hooks/useBooks';
import AppHeader from '@/components/common/Header/Header';
import styles from './Home.module.scss';
import ErrorBoundary from '@/components/ErrorBoundray';

const { Content } = Layout;

const BookDetails = lazy(
  () => import('@/components/book/BookDetails/BookDetails')
);

type HomeProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const Home: React.FC<HomeProps> = ({ collapsed, setCollapsed }) => {
  const {
    books,
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
  } = useBooks();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const booksPerPage = 5;

  const {
    currentPage,
    paginatedItems: currentBooks,
    totalItems,
    setCurrentPage,
  } = usePagination(books, booksPerPage);

  const handleAddBook = useCallback(() => {
    setEditingBook(null);
    setIsModalVisible(true);
  }, []);

  const handleEditBook = useCallback((book: Book) => {
    setEditingBook(book);
    setIsModalVisible(true);
  }, []);

  const handleViewBook = useCallback((book: Book) => {
    setSelectedBook(book);
    setIsDrawerVisible(true);
  }, []);

  const handleFormSubmit = useCallback(
    (book: Book) => {
      if (editingBook) {
        editBook(book);
      } else {
        addBook(book);
      }
      setIsModalVisible(false);
    },
    [editingBook, addBook, editBook]
  );

  const memoizedCurrentBooks = useMemo(() => currentBooks, [currentBooks]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterByFavorites, setCurrentPage]);

  if (status === 'loading') {
    return (
      <Content style={{ margin: '24px 16px 0' }} className={styles.homePage}>
        <div className={styles.flexCenter}>
          <Spin size="large" />
        </div>
      </Content>
    );
  }

  if (status === 'failed') {
    return (
      <Alert
        message="Error"
        description="Failed to load books"
        type="error"
        showIcon
      />
    );
  }

  return (
    <Content style={{ margin: '24px 16px 0' }} className={styles.homePage}>
      <ErrorBoundary>
        <AppHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterByFavorites={filterByFavorites}
          setFilterByFavorites={setFilterByFavorites}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <div className={styles.flexSpaceBetween}>
          <h2>Popular Books</h2>
          <Button
            type="primary"
            onClick={handleAddBook}
            style={{ marginBottom: '16px' }}
          >
            Add New Book
          </Button>
        </div>

        <div className={styles.booksContainer}>
          {memoizedCurrentBooks.length === 0 ? (
            <Result
              icon={<SmileOutlined />}
              title="No books available"
              extra={
                <Button type="primary" onClick={handleAddBook}>
                  Add New Book
                </Button>
              }
            />
          ) : (
            memoizedCurrentBooks.map((book) => (
              <BookItem
                key={book.id}
                book={book}
                isFavorite={favoriteBookIds.has(book.id)}
                toggleFavorite={() => toggleFavorite(book.id)}
                onView={() => handleViewBook(book)}
                onEdit={
                  book.id.toString().startsWith('local')
                    ? () => handleEditBook(book)
                    : undefined
                }
                onDelete={
                  book.id.toString().startsWith('local')
                    ? () => deleteBook(book.id)
                    : undefined
                }
              />
            ))
          )}
        </div>

        {memoizedCurrentBooks.length > 0 && (
          <Pagination
            current={currentPage}
            pageSize={booksPerPage}
            total={totalItems}
            onChange={setCurrentPage}
            className={styles.pagination}
          />
        )}

        <Modal
          title="Add / Edit Book"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[]}
          centered
          destroyOnClose
        >
          <BookForm
            onSubmit={handleFormSubmit}
            initialData={editingBook || undefined}
          />
        </Modal>

        <Suspense fallback={<Spin size="large" />}>
          <BookDetails
            book={selectedBook}
            visible={isDrawerVisible}
            onClose={() => setIsDrawerVisible(false)}
          />
        </Suspense>
      </ErrorBoundary>
    </Content>
  );
};

export default Home;
