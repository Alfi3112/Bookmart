import React, { useState, Suspense, lazy } from 'react';
import { Drawer, Image, Button, Modal, Typography, Spin } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

import Placeholder from '@assets/placeholder.png';
import type { Book } from '@/types/book';
import styles from '@components/book/BookDetails/BookDetails.module.scss';

const PdfReader = lazy(() => import('@/components/PdfReader/PdfReader'));

const { Text } = Typography;

type BookDetailsProps = {
  book: Book | null;
  visible: boolean;
  onClose: () => void;
};

const BookDetails: React.FC<BookDetailsProps> = ({
  book,
  visible,
  onClose,
}) => {
  const [isModelOpen, setIsModelOpen] = useState(false);

  if (!book) return null;

  return (
    <>
      <Drawer
        title={
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => setIsModelOpen(true)}
          >
            Read Book
          </Button>
        }
        placement="right"
        width={400}
        onClose={onClose}
        open={visible}
      >
        <div className={styles.BookDetails}>
          <div className={styles.bookDetailsCover}>
            <Image src={book.cover} alt={book.title} fallback={Placeholder} />
          </div>
          <h3 className={styles.h3}>{book.title}</h3>
          <p>
            <Text type="secondary">
              <strong>Author: </strong>
            </Text>{' '}
            {book.author}
          </p>
          <p>
            <Text type="secondary">
              <strong>Publication Date: </strong>
            </Text>

            {new Date(book.publicationDate).toLocaleDateString()}
          </p>
          <p>
            <Text type="secondary">
              <strong>Description:</strong>
            </Text>
            {book.description}
          </p>
        </div>
      </Drawer>
      <Modal
        open={isModelOpen}
        title={book.title}
        style={{ top: 20 }}
        onCancel={() => setIsModelOpen(false)}
        footer={[]}
        width={'80vw'}
        height={'80vh'}
        destroyOnClose
      >
        <Suspense fallback={<Spin size="large" />}>
          <PdfReader />
        </Suspense>
      </Modal>
    </>
  );
};

export default BookDetails;
