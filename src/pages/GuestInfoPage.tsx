import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { GuestInfoFormType } from '../shared/booking.type';
import { useBooking } from '../context/BookingContext';
import Form from '../components/form';
import Input from '../components/form/Input';
import { guestInfoForm } from '../utils/validation';
import { formatDate } from '../utils/time';
import { useEffect } from 'react';
import Button from '../components/Button';

export default function GuestInfoPage() {
  const { selectedSession, addNewBooking, currentBooking } = useBooking();
  const methods = useForm<GuestInfoFormType>({
    resolver: yupResolver(guestInfoForm),
    defaultValues: currentBooking
      ? {
          firstName: currentBooking.firstName,
          lastName: currentBooking.lastName,
          email: currentBooking.email,
          mobilePhone: currentBooking.mobilePhone,
        }
      : {},
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<GuestInfoFormType> = (data) => {
    addNewBooking(data);
    navigate('/confirmation');
  };

  useEffect(() => {
    if (!selectedSession) navigate('/');
  }, [navigate, selectedSession]);

  return (
    <Form<GuestInfoFormType> methods={methods} onSubmit={onSubmit}>
      <p className="text-sm md:text-base">{`${
        selectedSession?.session.name
      } ${formatDate(selectedSession?.date)} ${selectedSession?.time}`}</p>
      <button
        type="button"
        className="border-b text-gray-500 border-gray-500 mt-2 text-xs md:text-sm w-fit"
        onClick={() => navigate(-1)}
      >
        {'< Change'}
      </button>
      <div className="flex flex-col gap-2 my-4 md:my-10">
        <Input name="firstName" title="First Name *" />
        <Input name="lastName" title="Last Name *" />
        <Input name="phoneNumber" title="Phone" />
        <Input name="email" title="Email *" />
      </div>
      <Button title="Compelete Appointment" type="submit" />
    </Form>
  );
}
