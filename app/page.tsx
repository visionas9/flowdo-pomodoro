import Header from "./components/header";
import StartButton from "./components/StartButton";
import Tasks from "./components/Tasks";
import Timer from "./components/Timer";
import Quotes from "./components/Quotes";

export default function Home() {
  return (
    <div className="flex flex-col items-center text-mint-cream font-main">
      <Header />
      <div className="w-[75%] mx-auto border-b-2 border-darkdiv" />
      <Timer />
      <StartButton />
      <Tasks />
      <Quotes />
    </div>
  );
}
