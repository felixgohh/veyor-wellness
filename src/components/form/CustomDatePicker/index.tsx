import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';
import { Controller } from 'react-hook-form';

export default function CustomDatePicker({ name }: { name: string }) {
  return (
    <Controller
      name={name}
      defaultValue={new Date()}
      render={({ field: { onChange, value } }) => (
        <div className="w-full mt-10">
          <DatePicker
            selected={value}
            onChange={(date) => onChange(date)}
            inline
            minDate={new Date()} // Disable past dates
            calendarClassName="w-full"
          />
        </div>
      )}
    />
  );
}
