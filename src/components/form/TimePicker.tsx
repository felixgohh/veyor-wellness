import { Controller } from 'react-hook-form';

export default function TimePicker({
  timeSlots,
  name,
}: {
  timeSlots: string[];
  name: string;
}) {
  return (
    <Controller
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <div className="flex flex-col mt-5">
            <h2 className="font-bold mb-4">Please select a time</h2>
            {timeSlots.length ? (
              <>
                {timeSlots.map((slot, index) => (
                  <div key={index} className="mb-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="time"
                        value={slot}
                        checked={value === slot}
                        onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                          onChange(ev.target.value)
                        }
                        className="h-5 w-5 accent-black"
                      />
                      <span className="ml-2 text-sm md:text-base">{slot}</span>
                    </label>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-sm md:text-base">
                No slots available, please choose another date.
              </p>
            )}
          </div>
        );
      }}
    ></Controller>
  );
}
