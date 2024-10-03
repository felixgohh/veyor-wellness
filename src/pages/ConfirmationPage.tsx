import { useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/time';
import Button from '../components/Button';
import { QrCodeIcon } from '@heroicons/react/24/outline';

export default function ConfirmationPage() {
  const { currentBooking, cancelBooking, setIsRescheduling, clearBooking } =
    useBooking();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentBooking) navigate('/guest-info');
  }, [currentBooking, navigate]);

  return (
    <div className="flex flex-col p-4 md:flex-row md:justify-between text-sm md:text-base">
      <section className="flex flex-col w-full md:w-1/2">
        <p>
          {currentBooking?.firstName} {currentBooking?.lastName}
        </p>
        <p className="md:text-2xl text-xl font-bold">
          {currentBooking?.session.name}
        </p>
        <p className="md:text-2xl text-xl font-bold text-gray-500 mb-4">
          {formatDate(currentBooking?.date)} {currentBooking?.time}
        </p>
        <p>
          Veyor Wellnes <span>${currentBooking?.session.price}</span>
        </p>
        <div className="flex flex-col md:flex-row gap-2 my-4">
          <Button
            title="Cancel"
            className="w-full"
            onClick={() => {
              cancelBooking();
              navigate('/');
            }}
          />
          <Button
            title="Reschedule"
            className="w-full"
            onClick={() => {
              setIsRescheduling(true);
              navigate('/');
            }}
          />
        </div>
        <button
          className="border border-gray-400 rounded-lg py-2 px-4 w-fit mx-auto"
          type="button"
          onClick={() => {
            clearBooking();
            navigate('/');
          }}
        >
          Schedule another Appointment
        </button>
      </section>
      <section className="flex md:px-8 flex-col justify-center items-center text-center md:text-left gap-2 w-full mt-8 md:mt-0 md:w-[45%] md:border-l md:border-l-gray-300">
        <p className="font-semibold text-xl md:text-2xl font-sem">
          Easily book and manage appointments with Veyor Wellness on your phone
        </p>
        <p>
          Get the mobile app by opening the camera on your phone, and scanning
          this QR Code:
        </p>
        <QrCodeIcon className="w-40 h-40" />
      </section>
    </div>
  );
}
