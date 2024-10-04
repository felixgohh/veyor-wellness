import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center my-20 items-center w-full h-full">
      <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
      <Link to="/" className="px-4 py-2 rounded-lg border border-gray-400 mt-5">
        Back to Booking
      </Link>
    </div>
  );
}
