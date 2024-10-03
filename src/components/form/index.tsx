import React, { ReactNode } from 'react';
import { FormProvider, UseFormReturn, FieldValues } from 'react-hook-form';

type FormProps<T extends FieldValues> = {
  id?: string;
  methods: UseFormReturn<T>;
  onSubmit: (values: T) => void;
  children: ReactNode;
};

export default function Form<T extends FieldValues>({
  id = '',
  methods,
  onSubmit,
  children,
}: FormProps<T>) {
  const { handleSubmit } = methods;

  const onSubmitForm = handleSubmit(onSubmit);

  return (
    <FormProvider {...methods}>
      <form
        id={id}
        onSubmit={onSubmitForm}
        autoComplete="off"
        className="flex flex-col"
      >
        {children}
      </form>
    </FormProvider>
  );
}
