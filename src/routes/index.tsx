import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import NotFoundPage from '../pages/NotFoundPage';
import { SectionProvider } from '../context/SectionContext';
import { BookingProvider } from '../context/BookingContext';

const BookingPage = lazy(() => import('../pages/BookingPage'));
const GuestInfoPage = lazy(() => import('../pages/GuestInfoPage'));
const ConfirmationPage = lazy(() => import('../pages/ConfirmationPage'));

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <BookingPage /> }, // Index route for "/"
      { path: 'guest-info', element: <GuestInfoPage /> },
      { path: 'confirmation', element: <ConfirmationPage /> },
      {
        path: '/*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default function RouteApp() {
  return (
    <SectionProvider>
      <BookingProvider>
        <RouterProvider router={routes} />
      </BookingProvider>
    </SectionProvider>
  );
}
