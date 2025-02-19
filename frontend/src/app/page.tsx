import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import Image from "next/image";

export default function Home() {
  return (
    <Layout>
      <main className="px-4 w-full flex flex-col space-y-2 items-start">
        <h1 className="text-4xl mb-4">
          Would you survive the Nepal 2015 Earthquake?
        </h1>
        <p className="text-lg opacity-80 pb-8">
          Try our interactive AI-based game that simulates your chances of
          survival.
        </p>
        <Link href="/game">
          <Button className="">Play Now</Button>
        </Link>
        <div className="w-full absolute left-0 -bottom-10 flex justify-center">
          <Image
            src="/nepal.png"
            alt="Nepal earthquake visualization"
            width={800}
            height={300}
            className=""
          />
        </div>
      </main>
    </Layout>
  );
}
