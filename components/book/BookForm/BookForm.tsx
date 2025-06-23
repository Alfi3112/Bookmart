import React, { useEffect, useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';

import TextInput from '@components/common/FormElements/TextInput';
import DateInput from '@components/common/FormElements/DateInput';
import CustomTextArea from '@components/common/FormElements/TextArea';
import type { FormInputs } from '@/types/formInput';
import styles from '@components/book/BookForm/BookForm.module.scss';

type BookFormProps = {
  onSubmit: (book: FormInputs) => void;
  initialData?: FormInputs;
};

const BookForm: React.FC<BookFormProps> = ({ onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: initialData || {
      title: '',
      author: '',
      cover: '',
      publicationDate: '',
      description: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        publicationDate: initialData.publicationDate
          ? new Date(initialData.publicationDate).toISOString().split('T')[0]
          : '',
      });
    }
  }, [initialData, reset]);

  const onSubmitHandler: SubmitHandler<FormInputs> = useCallback(
    (data) => {
      const newBook = {
        ...initialData,
        ...data,
        publicationDate: data.publicationDate
          ? new Date(data.publicationDate).toISOString()
          : '',
        id: initialData?.id || `local-${Date.now()}`,
      };

      onSubmit(newBook);
      reset();
    },
    [onSubmit, reset, initialData]
  );

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className={styles.bookForm}>
      <TextInput
        id="title"
        placeholder="Title"
        register={register('title', {
          required: 'Title is required',
          maxLength: {
            value: 100,
            message: 'Title must be less than 100 characters',
          },
        })}
        error={errors.title}
      />
      <TextInput
        id="author"
        placeholder="Author"
        register={register('author', {
          required: 'Author is required',
          maxLength: {
            value: 50,
            message: 'Author must be less than 50 characters',
          },
        })}
        error={errors.author}
      />
      <TextInput
        id="cover"
        placeholder="Cover URL"
        register={register('cover', { required: 'Cover URL is required' })}
        error={errors.cover}
      />
      <DateInput
        id="publicationDate"
        placeholder="Publication Date"
        register={register('publicationDate', {
          required: 'Publication Date is required',
        })}
        error={errors.publicationDate}
      />
      <CustomTextArea
        id="description"
        placeholder="Description"
        register={register('description', {
          maxLength: {
            value: 500,
            message: 'Description must be less than 500 characters',
          },
        })}
        error={errors.description}
      />
      <Button htmlType="submit" type="primary" className="addBookBtn">
        {initialData ? 'Update Book' : 'Add Book'}
      </Button>
    </form>
  );
};

export default BookForm;
