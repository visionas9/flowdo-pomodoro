export default function Home() {
  return (
    <div className=" text-mint-cream font-main">
      <header className="flex items-center w-full p-4 md:max-w-2xl mx-auto">
        <div className="flex flex-col flex-1 items-center justify-center">
          <h1 className="text-3xl font-extrabold">FlowDo</h1>
          <p className="text-sm text-lighter">productivity app</p>
        </div>
        <div>
          <button className="bg-darkdiv py-2 px-3 rounded-xl cursor-pointer font-bold">
            Log In
          </button>
        </div>
      </header>
      <div className="w-[75%] mx-auto border-b-2 border-darkdiv" />
      <div>
        <h2>Set your timer:</h2>
        <div>
          {/*hardcoded for now */}
          <p>25:00</p>
        </div>
      </div>
    </div>
  );
}
