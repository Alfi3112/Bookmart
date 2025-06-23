import React from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styles from '@components/book/BookForm/BookForm.module.scss';

type CustomTextAreaProps = {
  id: string;
  placeholder: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
};

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  id,
  placeholder,
  error,
  register,
}) => {
  return (
    <div className={styles.formItem}>
      <textarea
        id={id}
        className={styles.formInput}
        placeholder={placeholder}
        {...register}
      />
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
};

export default CustomTextArea;
