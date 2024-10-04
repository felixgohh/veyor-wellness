export default function Loading() {
  return (
    <label
      htmlFor="overlay"
      className="fixed top-0 left-0 w-screen h-screen bg-black-100 duration-700 ease-in-out"
    >
      <div className="w-full h-full flex justify-center content-center items-center">
        <svg className="relative w-[160px] h-[160px] ">
          <circle
            cx="70"
            cy="70"
            r="70"
            strokeLinecap="round"
            strokeDasharray={440}
            strokeDashoffset={440}
            className="w-full h-full fill-transparent stroke-[10] stroke-yellow-500 animate-stroke translate-x-[5px] translate-y-[5px]"
          />
        </svg>
        <p className="absolute text-white font-bold text-lg">Loading</p>
      </div>
    </label>
  );
}
