import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import Image from "next/image";

export default function Home() {
  return (
    <Layout className="w-full min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div 
        className="px-4 w-full flex flex-col space-y-2 items-start max-w-4xl mx-auto p-8"
      >
        <div className="fade-in w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Would you survive the Nepal 2015 Earthquake?
          </h1>
          <p className="text-lg opacity-80 pb-8 text-slate-300">
            Try our interactive AI-based game that simulates your chances of
            survival.
          </p>
          <Link href="/game">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-lg
              transition-all duration-200 transform hover:scale-105 shadow-lg">
              Play Now
            </Button>
          </Link>
        </div>
        <div className="w-full absolute left-0 -bottom-10 flex justify-center">
          <Image
            src="/nepal.png"
            alt="Nepal earthquake visualization"
            width={800}
            height={300}
            className=""
          />
        </div>
      </div>
    </Layout>
  );
}
