import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { SessionType } from '../shared/booking.type';

export default function SessionCard({
  session,
  handleSessionClick,
  isSelected,
}: {
  session: SessionType | null;
  handleSessionClick: (session: SessionType | null) => void;
  isSelected?: boolean;
}) {
  if (!session) return null;

  return (
    <article
      className="relative flex flex-col gap-4 py-2 px-4 w-full border border-gray-300 cursor-pointer"
      onClick={() => handleSessionClick(isSelected ? null : session)}
    >
      <h3 className="text-sm md:text-lg">{session.name}</h3>
      <div className="flex flex-row items-center gap-4 text-xs md:text-sm">
        <p>{session.minutes} minutes</p>
        <p>@ ${session.price}</p>
      </div>
      {isSelected ? (
        <span className="absolute right-5 top-1/2 transform  -translate-y-1/2">
          <ChevronDownIcon className="w-5 h-5 text-gray-500" />
        </span>
      ) : null}
    </article>
  );
}
