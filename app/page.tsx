export default function Home() {
  return (
    <div className="flex flex-col items-center text-mint-cream font-main">
      <header className="flex items-center w-full p-4 md:max-w-2xl mx-auto">
        {/* add toggle theme button later */}
        <div className="flex flex-col flex-1 items-center justify-center">
          <h1 className="text-3xl font-extrabold">FlowDo</h1>
          <p className="text-sm text-lighter">productivity app</p>
        </div>
        <div>
          <button
            className="bg-darkdiv py-2 px-3 rounded-xl cursor-pointer font-bold
          hover:bg-darkb-hover transition-colors duration-200"
          >
            Log In
          </button>
        </div>
      </header>

      <div className="w-[75%] mx-auto border-b-2 border-darkdiv" />

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
      <div className="mt-6 text-3xl flex items-center justify-center md:">
        {/* Conditionally rendering button /  */}
        <button
          className="py-2 px-8 rounded-xl cursor-pointer font-bold bg-start
        active:translate-y-1 active:shadow-none shadow-md transition-all duration-100"
        >
          Start
        </button>
      </div>
    </div>
  );
}
