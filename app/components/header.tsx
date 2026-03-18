import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center w-full p-4 md:max-w-2xl mx-auto">
      <div className="flex flex-col flex-1 items-center justify-center">
        <h1 className="text-3xl font-extrabold">FlowDo</h1>
        <p className="text-sm text-lighter">productivity app</p>
      </div>
      <div className="p-3 rounded-xl bg-darkb">
        <Link href={"/activities"}>Activities</Link>
      </div>
    </header>
  );
}
