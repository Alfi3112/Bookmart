import type { Book } from '@/types/book';

export type BookState = {
  books: Book[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

export type RootState = {
  book: BookState;
};
