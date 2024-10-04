import React from 'react';
import { ToastContainer } from 'react-toastify';
import SectionList from './SectionList';
import BookingList from './BookingList';
import 'react-toastify/dist/ReactToastify.css';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col justify-center items-center md:w-[60%] mx-auto p-8 md:py-[5%]">
        <header>
          <h1 className="text-3xl md:text-6xl text-center">
            Book a Wellness session.
          </h1>
          <p className="text-center my-6 text-gray-500 text-sm md:text-base">
            Visit one of our expert consultant to get yourself feeling 100%
            again.
          </p>
        </header>
        <main className="w-full">
          <SectionList />
          <BookingList />
          <div className="md:w-[90%] md:mx-auto">{children}</div>
        </main>
      </div>
      <ToastContainer
        position="top-center"
        hideProgressBar
        closeButton={false}
        autoClose={3500}
        theme="colored"
      />
    </>
  );
}
