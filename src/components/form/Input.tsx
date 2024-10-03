import { useFormContext } from 'react-hook-form';

type InputProps = {
  name: string;
  title: string;
  type?: string;
};

export default function Input({ name, title, type = 'text' }: InputProps) {
  const {
    register,
    getFieldState,
    formState: { errors },
  } = useFormContext();
  const { invalid } = getFieldState(name);
  const { onChange, ...registerInput } = register(name);

  return (
    <div
      className={`flex flex-col gap-2 text-sm rounded-lg p-2  ${
        invalid ? 'bg-gray-200' : 'bg-transparent'
      }`}
    >
      <label htmlFor={name} className={invalid ? 'text-red-500' : 'text-black'}>
        {title} {invalid && '(required)'}
      </label>

      <input
        id={name}
        type={type}
        {...registerInput}
        className={`bg-transparent outline-none border border-gray-300 rounded-lg p-2`}
        onChange={(e) => onChange(e)}
      />

      {errors && errors[`${name}`] ? (
        <p className="text-xs text-red-500">
          {String(errors[`${name}`]?.message)}
        </p>
      ) : null}
    </div>
  );
}
