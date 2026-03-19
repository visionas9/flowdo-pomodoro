import Header from "./components/header";
import Tasks from "./components/Tasks/Tasks";
import Timer from "./components/Timer/Timer";
import Quotes from "./components/Quotes";
import SimpleBarChart from "./components/activity/simpleBarChart";
import CompletedTasks from "./components/activity/CompletedTasks";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-6 px-4 py-8 text-mint-cream font-main">
      <div className="w-full max-w-2xl">
        <div className="w-[75%] mx-auto border-b-2 border-darkdiv" />
        <Timer />
        <Tasks />
        <Quotes />
      </div>

      <div className="w-full max-w-2xl bg-darkdiv rounded-xl py-6 px-4">
        <h2 className="text-xl font-extrabold text-center mb-4">
          Recent Activities
        </h2>
        <SimpleBarChart />
      </div>

      <div className="w-full max-w-2xl bg-darkdiv rounded-xl py-6 px-4">
        <CompletedTasks />
      </div>
    </main>
  );
}
