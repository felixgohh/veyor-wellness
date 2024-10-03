import { useBooking } from '../../context/BookingContext';
import { formatDate } from '../../utils/time';

export default function BookingList() {
  const { bookingList } = useBooking();

  return (
    <>
      {bookingList.length ? (
        <div className="bg-green-200 text-green-800 px-4 py-2 rounded-lg mb-5 text-sm md:text-base">
          <p className="font-semibold">Upcoming appointments</p>
          <ul>
            {bookingList.map((booking, index) => (
              <li key={`booking-${index}`} className="list-disc ml-4">
                {formatDate(booking.date)} {booking.time} {booking.session.name}{' '}
                with Veyor Wellness
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}
