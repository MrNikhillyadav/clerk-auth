import { Button } from "@/components/ui/button";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
   <div className="flex flex-col bg-slate-200 text-black p-20 justify-center items-center">
    <h1 className="mb-5 font-bold text-3xl"> Nextjs-clerk authentication</h1>
    <Link href='/dashboard' ><Button> Learn More.</Button> </Link>
   </div>
  );
}
