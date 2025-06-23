import React from 'react';
import { Card, Button, Image, Tooltip } from 'antd';
import {
  HeartOutlined,
  HeartFilled,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';

import type { Book } from '@/types/book';
import Placeholder from '@assets/placeholder.png';
import styles from '@components/book/BookItem/BookItem.module.scss';

const { Meta } = Card;

type BookItemProps = {
  book: Book;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isFavorite: boolean;
  toggleFavorite: () => void;
};

const BookItem: React.FC<BookItemProps> = ({
  book,
  onView,
  onEdit,
  onDelete,
  isFavorite,
  toggleFavorite,
}) => {
  const actions = [
    <Tooltip title="Add to Favorites" key="fav-btn">
      <Button
        type="text"
        shape="circle"
        icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
        onClick={toggleFavorite}
      />
    </Tooltip>,
    <Tooltip title="View Details" key="view-btn">
      <Button
        type="text"
        shape="circle"
        icon={<EyeOutlined />}
        onClick={onView}
      />
    </Tooltip>,
  ];

  if (onEdit) {
    actions.push(
      <Tooltip title="Edit Book" key="edit-btn">
        <Button
          type="text"
          shape="circle"
          icon={<EditOutlined />}
          onClick={onEdit}
        />
      </Tooltip>
    );
  }
  if (onDelete) {
    actions.push(
      <Tooltip title="Delete Book" key="delete-btn">
        <Button
          type="text"
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={onDelete}
        />
      </Tooltip>
    );
  }

  return (
    <article className={styles.gridItem}>
      <Card
        className={styles.bookItem}
        cover={
          <div className={`${styles.bookCoverWrapper} pointer`}>
            <Image
              className={styles.bookImage}
              src={book.cover}
              alt={book.title}
              preview={false}
              fallback={Placeholder}
              onClick={onView}
            />
          </div>
        }
        actions={actions}
      >
        <Meta
          title={
            <span className={`${styles.bookTitle} pointer`} onClick={onView}>
              {book.title}
            </span>
          }
          description={
            <div
              className={`${styles.bookAuthor} ${styles.cursorPointer} ${styles.flex} ${styles.justifyBetween} pointer`}
              onClick={onView}
            >
              <div className={styles.bookAuthor}>{book.author}</div>
            </div>
          }
        />
      </Card>
    </article>
  );
};

export default BookItem;
