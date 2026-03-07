export default function StartButton() {
  return (
    <div className="mt-6 text-3xl flex items-center justify-center md:">
      {/* Conditionally rendering button /  */}
      <button
        className="py-2 px-12 rounded-xl cursor-pointer font-bold bg-start
        active:translate-y-1 active:shadow-none shadow-md transition-all duration-100"
      >
        Start
      </button>
    </div>
  );
}
