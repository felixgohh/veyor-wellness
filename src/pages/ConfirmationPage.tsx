import { useBooking } from '../context/BookingContext';

export default function ConfirmationPage() {
  const { currentBooking } = useBooking();

  return (
    <section>
      <h1>Confirmation Page</h1>
      <p>{JSON.stringify(currentBooking)}</p>
    </section>
  );
}
