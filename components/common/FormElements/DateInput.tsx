import React from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styles from '@components/book/BookForm/BookForm.module.scss';

type DateInputProps = {
  id: string;
  placeholder: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
};

const DateInput: React.FC<DateInputProps> = ({
  id,
  placeholder,
  error,
  register,
}) => {
  return (
    <div className={styles.formItem}>
      <input
        type="date"
        id={id}
        className={styles.formInput}
        placeholder={placeholder}
        {...register}
      />
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
};

export default DateInput;
