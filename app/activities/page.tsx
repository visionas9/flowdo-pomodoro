import SimpleBarChart from "../components/barChart/simpleBarChart";

export default function Activities() {
  return (
    <main
      className="mt-15 mx-auto w-fit flex flex-col 
      items-center bg-darkdiv py-4 px-8 rounded-xl md:"
    >
      <div>
        <div className="flex flex-col items-center gap-2 text-mint-cream font-main">
          <h2 className="text-xl font-extrabold">Recent Activities</h2>
          <div className="w-[75%] mx-auto border-b-2 border-darkdiv" />
          <SimpleBarChart />
        </div>
      </div>
    </main>
  );
}
