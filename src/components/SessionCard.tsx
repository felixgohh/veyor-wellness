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
      className="flex flex-col gap-4 py-2 px-4 w-full border border-gray-300 cursor-pointer"
      onClick={() => handleSessionClick(isSelected ? null : session)}
    >
      <h3 className="text-sm md:text-lg">{session.name}</h3>
      <div className="flex flex-row items-center gap-4 text-xs md:text-sm">
        <p>{session.minutes} minutes</p>
        <p>@ ${session.price}</p>
      </div>
    </article>
  );
}
