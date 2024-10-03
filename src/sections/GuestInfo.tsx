import { useWatch } from 'react-hook-form';
import Input from '../components/form/Input';
import { useSection } from '../context/SectionContext';
import { formatDate } from '../utils/time';

export default function GuestInfo() {
  const [watchedSession, watchedDate, watchedTime] = useWatch({
    name: ['session', 'date', 'time'],
  });
  const { prevSection } = useSection();

  return (
    <section>
      <p className="text-sm md:text-base">{`${watchedSession.name} ${formatDate(
        watchedDate
      )} ${watchedTime}`}</p>
      <button
        type="button"
        className="border-b text-gray-500 border-gray-500 mt-2 text-xs md:text-sm"
        onClick={prevSection}
      >
        {'< Change'}
      </button>
      <div className="flex flex-col gap-2 mt-4 md:mt-10">
        <Input name="firstName" title="First Name *" />
        <Input name="lastName" title="Last Name *" />
        <Input name="phoneNumber" title="Phone" />
        <Input name="email" title="Email *" />
      </div>
    </section>
  );
}
