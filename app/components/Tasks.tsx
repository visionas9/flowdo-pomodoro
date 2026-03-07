export default function Tasks() {
  return (
    <div className="mt-6 w-[90%] md:max-w-2xl mx-auto flex flex-col gap-3 bg-darkdiv py-4 px-5 rounded-xl">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg">Tasks</h2>
        <button className="bg-darkb p-2 rounded-lg hover:bg-darkb-hover transition-colors duration-200 cursor-pointer">
          <span className="text-xl leading-none">⋮</span>
        </button>
      </div>

      <div className="w-full border-b border-darkb" />

      <button
        className="w-full border-2 border-dashed border-darkb rounded-xl 
    py-3 flex items-center justify-center gap-2 
    hover:bg-darkb transition-colors duration-200 cursor-pointer"
      >
        <span className="text-xl">⊕</span>
        <span>Add Task</span>
      </button>
    </div>
  );
}
