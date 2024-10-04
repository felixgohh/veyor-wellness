import { object, string, number } from 'yup';

export const bookingSessionForm = object({
  session: object({
    name: string().required(),
    price: number().required(),
    minutes: number().required(),
  }).required('Session is required'),
  date: string().required('Booking date is required'),
  time: string().required('Booking time is required'),
});

export const guestInfoForm = object({
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  email: string()
    .email('Invalid email address')
    .required('Email address is required'),
  mobilePhone: string(),
});
