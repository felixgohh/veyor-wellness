import React, { useEffect } from 'react';
import { useSection } from '../../context/SectionContext';
import { useLocation } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { formatDate } from '../../utils/time';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sectionList, activeSection, setActiveSection } = useSection();
  const { bookingList } = useBooking();
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const active = sectionList.find((section) => section.path === pathname);
    if (active && activeSection.path !== active.path) {
      setActiveSection(active);
    }
  }, [location.pathname, activeSection, sectionList, setActiveSection]);

  return (
    <div className="flex flex-col justify-center items-center md:w-[60%] mx-auto p-8 md:py-[5%]">
      <header>
        <h1 className="text-3xl md:text-6xl text-center">
          Book a Wellness session.
        </h1>
        <p className="text-center my-6 text-gray-500 text-sm md:text-base">
          Visit one of our expert consultant to get yourself feeling 100% again.
        </p>
      </header>
      <main className="w-full">
        <ul className="flex flex-row border border-gray-400 rounded-md mb-10">
          {sectionList.map((section, index) => (
            <li
              key={section.path}
              className={`relative first:rounded-tl-md first:rounded-bl-md last:rounded-tr-md last:rounded-br-md text-sm md:text-base p-2 flex-1 font-semibold flex items-center justify-center text-center ${
                activeSection.path === section.path
                  ? 'bg-white text-black border-b border-b-black'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {section.name}
              {index !== sectionList.length - 1 ? (
                <div
                  className={`absolute z-10 right-[-8px] md:right-[-18px] top-1/2 transform -translate-y-1/2 h-0 md:h-full w-0 border-l-8 md:border-l-[20px] border-transparent border-t-8 md:border-t-[20px] border-b-8 md:border-b-[20px] ${
                    activeSection.path === section.path
                      ? 'border-l-white'
                      : 'border-l-gray-100'
                  }`}
                ></div>
              ) : null}
            </li>
          ))}
        </ul>
        {bookingList.length ? (
          <div className="bg-green-200 text-green-800 px-4 py-2 rounded-lg mb-5 text-sm md:text-base">
            <p className="font-semibold">Upcoming appointments</p>
            <ul>
              {bookingList.map((booking, index) => (
                <li key={`booking-${index}`} className="list-disc ml-4">
                  {formatDate(booking.date)} {booking.time}{' '}
                  {booking.session.name} with Veyor Wellness
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="md:w-[90%] md:mx-auto">{children}</div>
      </main>
    </div>
  );
}
