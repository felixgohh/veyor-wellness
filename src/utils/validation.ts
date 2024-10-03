import * as yup from 'yup';

export const bookingSessionForm = yup.object({
  session: yup
    .object({
      name: yup.string().required(),
      price: yup.number().required(),
      minutes: yup.number().required(),
    })
    .required('Session is required'),
  date: yup.string().required('Booking date is required'),
  time: yup.string().required('Booking time is required'),
});

export const guestInfoForm = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email address is required'),
  mobilePhone: yup.string(),
});
