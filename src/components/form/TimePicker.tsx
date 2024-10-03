import { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { useBooking } from '../../context/BookingContext';

export default function TimePicker({
  timeSlots,
  name,
}: {
  timeSlots: string[];
  name: string;
}) {
  const { bookingList } = useBooking();

  const availableSlots = useMemo(() => {
    if (bookingList.length) {
      const bookedTimes = bookingList.map((booking) => booking.time);
      return timeSlots.filter((slot) => !bookedTimes.includes(slot));
    }
    return timeSlots;
  }, [bookingList, timeSlots]);

  return (
    <Controller
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <div className="flex flex-col mt-5">
            <h2 className="font-bold mb-4">Please select a time</h2>
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
          </div>
        );
      }}
    ></Controller>
  );
}
