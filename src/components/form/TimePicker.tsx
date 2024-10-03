import { useMemo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useBooking } from '../../context/BookingContext';
import { checkSameDate } from '../../utils/time';

export default function TimePicker({
  timeSlots,
  name,
}: {
  timeSlots: string[];
  name: string;
}) {
  const watchedDate = useWatch({ name: 'date' });
  const { bookingList, isRescheduling } = useBooking();

  const availableSlots = useMemo(() => {
    if (bookingList.length && watchedDate && !isRescheduling) {
      // Filter booking list to only include bookings on the selected date
      const bookingsForSelectedDate = bookingList.filter((booking) =>
        checkSameDate(booking.date, watchedDate)
      );

      // Map the booked times for that date
      const bookedTimes = bookingsForSelectedDate.map(
        (booking) => booking.time
      );

      // Filter out the time slots that are already booked
      return timeSlots.filter((slot) => !bookedTimes.includes(slot));
    }
    return timeSlots;
  }, [bookingList, watchedDate, isRescheduling, timeSlots]);

  return (
    <Controller
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <div className="flex flex-col mt-5">
            <h2 className="font-bold mb-4">Please select a time</h2>
            {availableSlots.length ? (
              <>
                {availableSlots.map((slot, index) => (
                  <div key={index} className="mb-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="time"
                        value={slot}
                        checked={value === slot}
                        onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                          onChange(ev.target.value)
                        }
                        className="h-5 w-5 accent-black"
                      />
                      <span className="ml-2 text-sm md:text-base">{slot}</span>
                    </label>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-sm md:text-base">
                No slots available, please choose another date.
              </p>
            )}
          </div>
        );
      }}
    ></Controller>
  );
}
