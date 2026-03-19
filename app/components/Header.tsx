"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex items-center w-full font-main p-4 md:max-w-2xl mx-auto">
      <div className="flex flex-col flex-1 items-center justify-center">
        <h1 className="text-3xl font-extrabold text-mint-cream">FlowDo</h1>
        <p className="text-sm text-lighter">productivity app</p>
      </div>
      <div className="p-3 rounded-xl bg-darkb text-mint-cream">
        {pathname === "/activities" ? (
          <Link href={"/"}>Main Page</Link>
        ) : (
          <Link href={"/activities"}>Activities</Link>
        )}
      </div>
    </header>
  );
}
