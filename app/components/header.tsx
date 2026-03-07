export default function Header() {
  return (
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
  );
}
