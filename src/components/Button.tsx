type ButtonProps = {
  title: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
};

export default function Button({
  title,
  type = 'button',
  onClick,
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 bg-black rounded-lg text-white w-fit ${className}`}
    >
      {title}
    </button>
  );
}
