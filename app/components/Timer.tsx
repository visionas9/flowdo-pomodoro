export default function Timer() {
  return (
    <div
      className="mt-15 mx-auto w-fit flex flex-col 
      items-center bg-darkdiv py-3 px-5 rounded-xl md:"
    >
      <div className="flex items-center justify-between gap-9 md:">
        <button
          className="bg-darkb py-2 px-3 rounded-xl cursor-pointer
          hover:bg-darkb-hover transition-colors duration-200 md:"
        >
          set work time
        </button>
        <button
          className="bg-darkb py-2 px-3 rounded-xl cursor-pointer
          hover:bg-darkb-hover transition-colors duration-200 md:"
        >
          set break time
        </button>
      </div>

      <div className="flex items-center justify-center">
        {/*hardcoded for now */}
        <p className="font-numbers text-9xl">25:00</p>
      </div>
    </div>
  );
}
