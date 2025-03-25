"use client";
import Image from "next/image";

export function introductionPhase() {
  return <div className="bg-slate-800 p-8 rounded-xl shadow-lg">
    <h1 className="text-3xl font-bold mb-6">
      Nepal Earthquake Preparedness Simulation
    </h1>

    <div className="mb-6 flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <p className="mb-4 text-lg">
          In 2015, Nepal experienced a devastating earthquake that claimed
          nearly 9,000 lives and displaced millions of people.
        </p>
        <p className="mb-4">
          In this simulation, you will make critical decisions about
          building construction and resource allocation that could affect
          survival outcomes during a similar earthquake scenario.
        </p>
        <p className="mb-4">
          Your decisions will be evaluated using machine learning models
          trained on actual data from the Nepal earthquake, giving you
          realistic feedback on the potential consequences of your
          choices.
        </p>
        <p>
          You have a budget limited budget to spend on construction and
          preparedness measures.
        </p>
      </div>
      <div className="w-full md:w-2/5">
        <div className="relative h-64 w-full rounded-lg overflow-hidden">
          <Image
            src="/nepal.png"
            alt="Nepal Earthquake Devastation"
            fill
            objectFit="cover"
            className="rounded-lg" />
        </div>
        <p className="text-sm text-slate-400 mt-2 text-center italic">
          Aftermath of the 2015 Nepal earthquake in Kathmandu
        </p>
      </div>
    </div>

    <div className="bg-slate-700 p-4 rounded-lg mt-6">
      <h3 className="font-bold text-lg mb-2">Your Challenge:</h3>
      <p>
        Make strategic decisions to maximize survival probability during a
        simulated earthquake. Your choices will be analyzed using
        real-world data to determine likely outcomes.
      </p>
    </div>
  </div>;
}
