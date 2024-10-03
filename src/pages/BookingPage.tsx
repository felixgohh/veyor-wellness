import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { BookingSessionFormType, SessionType } from '../shared/booking.type';
import Form from '../components/form';
import SessionCard from '../components/SessionCard';
import CustomDatePicker from '../components/form/CustomDatePicker';
import TimePicker from '../components/form/TimePicker';
import Button from '../components/Button';
import { bookingSessionForm } from '../utils/validation';
import { generateTimeSlots, getNearestTimeSlot } from '../utils/time';
import { useBooking } from '../context/BookingContext';
const SESSION_LIST: SessionType[] = [
  {
    name: 'Physiotherapy',
    minutes: 30,
    price: 45,
  },
  {
    name: 'Chiro',
    minutes: 30,
    price: 100,
  },
  {
    name: 'Aroma Therapy',
    minutes: 30,
    price: 45,
  },
];

export default function BookingPage() {
  const { setSelectedSession, selectedSession } = useBooking();
  const methods = useForm<BookingSessionFormType>({
    resolver: yupResolver(bookingSessionForm),
    defaultValues: selectedSession || {},
  });
  const { watch } = methods;
  const [watchedSession, watchedDate, watchedTime] = watch([
    'session',
    'date',
    'time',
  ]);
  const navigate = useNavigate();

  const timeSlots = generateTimeSlots(
    // if user selected today's date, they can't select the past hour slots
    getNearestTimeSlot(watchedDate ? new Date(watchedDate) : new Date()),
    16,
    30
  );

  const onSubmit: SubmitHandler<BookingSessionFormType> = (data) => {
    setSelectedSession(data);
    navigate('/guest-info');
  };

  return (
    <Form<BookingSessionFormType> methods={methods} onSubmit={onSubmit}>
      {!watchedSession ? (
        <Controller
          name="session"
          render={({ field: { onChange } }) => {
            return (
              <div className="flex flex-col gap-5 w-[90%] mx-auto">
                {SESSION_LIST.map((session) => (
                  <SessionCard
                    key={session.name}
                    session={session}
                    handleSessionClick={onChange}
                  />
                ))}
              </div>
            );
          }}
        />
      ) : (
        <>
          <Controller
            name="session"
            render={({ field: { onChange } }) => {
              return (
                <SessionCard
                  session={watchedSession}
                  handleSessionClick={onChange}
                  isSelected
                />
              );
            }}
          />
          <CustomDatePicker name="date" />
          <TimePicker name="time" timeSlots={timeSlots} />
          {watchedDate && watchedSession && watchedTime && (
            <Button title="Continue" type="submit" />
          )}
        </>
      )}
    </Form>
  );
}
