import React, { SyntheticEvent, ReactNode } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { BookingFormType } from '../../shared/booking.type';

type FormProps = {
  id?: string;
  methods: UseFormReturn<BookingFormType>;
  onSubmit: (values: BookingFormType) => void;
  children: ReactNode;
};

export default function FormContainer({
  id = '',
  methods,
  onSubmit,
  children,
}: FormProps) {
  const { handleSubmit } = methods;

  const onSubmitForm = async (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

    return handleSubmit(async (values) => onSubmit(values))(event);
  };

  return (
    <FormProvider {...methods}>
      <form
        id={id}
        onSubmit={onSubmitForm}
        autoComplete="off"
        className="flex flex-col gap-[1.5rem]"
      >
        {children}
      </form>
    </FormProvider>
  );
}
