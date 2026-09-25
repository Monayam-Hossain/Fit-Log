import Image from "next/image";
import { FaArrowDown } from "react-icons/fa";
import bannerImage from "@/assets/banner.png";

export default function Hero() {
  return (
    <section className="bg-card-bg rounded-2xl p-6 md:p-12 mb-12 flex flex-col md:flex-row items-center justify-between border border-border-color">
      <div className="max-w-xl mb-8 md:mb-0">
        <span className="text-accent text-xs tracking-widest font-bold uppercase block mb-2">
          WORKOUT LIBRARY
        </span>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase mb-4 leading-tight font-serif">
          TRAIN WITH INTENT. LOG EVERY SET.
        </h1>
        <p className="text-gray-400 text-sm md:text-base mb-6 leading-relaxed">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
          today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <a
          href="#library"
          className="inline-flex items-center space-x-2 bg-accent text-black font-bold text-sm px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all uppercase"
        >
          <span>BROWSE WORKOUTS</span>
          <FaArrowDown className="text-xs" />
        </a>
      </div>
      <div className="w-full md:w-1/3 flex justify-center">
        {/* Banner Image Container */}
        <div className="relative w-72 h-72 flex items-center justify-center">
          <Image
            src={bannerImage}
            alt="FitLog Gym Banner"
            width={280}
            height={280}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
