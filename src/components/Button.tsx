type ButtonProps = {
  title: string;
  type?: 'button' | 'submit' | 'reset';
  onClick: () => void;
};

export default function Button({
  title,
  type = 'button',
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-4 py-2 bg-black rounded-lg text-white w-fit"
    >
      {title}
    </button>
  );
}
