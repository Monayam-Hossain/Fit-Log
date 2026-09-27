"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import {
  FaClock,
  FaFire,
  FaStar,
  FaCheck,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved, markAsDone } =
    usePlan();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">(
    "duration",
  );

  const currentList = activeTab === "plan" ? plan : saved;

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") return b.duration - a.duration;
    if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const totalMinutes = currentList.reduce(
    (acc, curr) => acc + curr.duration,
    0,
  );
  const totalCalories = currentList.reduce(
    (acc, curr) => acc + curr.caloriesBurned,
    0,
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white uppercase tracking-wider mb-1">
          MY PLAN
        </h1>
        <p className="text-gray-400 text-sm">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 bg-card-bg border border-border-color rounded-2xl p-6 mb-8">
        <div>
          <span className="text-xs text-gray-500 font-semibold uppercase block mb-1">
            Exercises
          </span>
          <span className="text-3xl font-black text-accent">
            {currentList.length}
          </span>
        </div>
        <div className="border-l border-border-color pl-4">
          <span className="text-xs text-gray-500 font-semibold uppercase block mb-1">
            Minutes
          </span>
          <span className="text-3xl font-black text-white">{totalMinutes}</span>
        </div>
        <div className="border-l border-border-color pl-4">
          <span className="text-xs text-gray-500 font-semibold uppercase block mb-1">
            Calories
          </span>
          <span className="text-3xl font-black text-white">
            {totalCalories}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="bg-card-bg border border-border-color p-1 rounded-xl flex space-x-1">
          <button
            onClick={() => setActiveTab("plan")}
            className={`px-6 py-2 rounded-lg text-xs font-bold transition-colors ${
              activeTab === "plan"
                ? "bg-[#1e232a] text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-6 py-2 rounded-lg text-xs font-bold transition-colors ${
              activeTab === "saved"
                ? "bg-[#1e232a] text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-gray-400">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "duration" | "calories" | "rating")
              }
              className="bg-card-bg border border-border-color text-white px-3 py-2 pr-8 rounded-lg appearance-none cursor-pointer focus:outline-none"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <FaChevronDown className="absolute right-2.5 top-3 text-gray-400 text-[10px] pointer-events-none" />
          </div>
        </div>
      </div>

      {sortedList.length === 0 ? (
        <div className="border border-dashed border-gray-800 rounded-2xl py-20 text-center flex flex-col items-center justify-center">
          <h3 className="text-xl font-black text-white uppercase tracking-wider mb-2">
            NOTHING HERE YET
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="bg-accent text-black font-bold text-xs px-6 py-3 rounded-lg uppercase"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedList.map((item) => (
            <div
              key={item.id}
              className={`bg-card-bg border border-border-color rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 ${
                item.isDone ? "opacity-50" : ""
              }`}
            >
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="rounded-lg object-cover"
                />
                <div>
                  <h4 className="text-base font-bold text-white uppercase flex items-center gap-2">
                    {item.name}
                    {item.isDone && (
                      <span className="text-accent text-xs">(Done)</span>
                    )}
                  </h4>
                  <p className="text-xs text-gray-400 mb-1">{item.equipment}</p>
                  <div className="flex items-center space-x-3 text-xs text-gray-400">
                    <span className="flex items-center space-x-1">
                      <FaClock className="text-accent" />{" "}
                      <span>{item.duration} min</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <FaFire className="text-accent" />{" "}
                      <span>{item.caloriesBurned} kcal</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <FaStar className="text-accent" />{" "}
                      <span>{item.rating}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                <Link
                  href={`/workouts/${item.id}`}
                  className="border border-gray-700 hover:border-gray-500 text-white text-xs font-bold px-4 py-2 rounded-lg"
                >
                  View Details
                </Link>

                {activeTab === "plan" && !item.isDone && (
                  <button
                    onClick={() => markAsDone(item.id)}
                    className="bg-accent text-black text-xs font-bold px-4 py-2 rounded-lg flex items-center space-x-1.5"
                  >
                    <FaCheck />
                    <span>Mark as Done</span>
                  </button>
                )}

                <button
                  onClick={() =>
                    activeTab === "plan"
                      ? removeFromPlan(item.id)
                      : removeFromSaved(item.id)
                  }
                  className="text-gray-500 hover:text-red-500 p-2"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
