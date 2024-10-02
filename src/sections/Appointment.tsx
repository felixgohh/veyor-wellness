import { Controller, useWatch } from 'react-hook-form';
import SessionCard from '../components/SessionCard';
import { SessionType } from '../shared/booking.type';
import CustomDatePicker from '../components/form/CustomDatePicker';
import TimePicker from '../components/form/TimePicker';
import { generateTimeSlots } from '../utils/time';
import Button from '../components/Button';
import { useSection } from '../context/SectionContext';

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

export default function Appointment() {
  const [watchedSession, watchedDate, watchedTime] = useWatch({
    name: ['session', 'date', 'time'],
  });
  const { nextSection } = useSection();
  const timeSlots = generateTimeSlots(10, 16, 30);

  if (!watchedSession) {
    return (
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
    );
  }

  return (
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
        <Button title="Continue" onClick={() => nextSection()} />
      )}
    </>
  );
}
