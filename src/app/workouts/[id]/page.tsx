"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Workout } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";
import { FaPlus, FaBookmark, FaCheck } from "react-icons/fa";

export default function WorkoutDetailsPage() {
  const { id } = useParams();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const { plan, saved, addToPlan, saveForLater } = usePlan();

  useEffect(() => {
    async function fetchWorkoutDetails() {
      try {
        const res = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${id}`,
        );
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setWorkout(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchWorkoutDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <span className="loading loading-spinner loading-lg text-accent"></span>
        <p className="mt-4 text-gray-400 text-sm">Loading workout details...</p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-bold text-white">Workout Not Found</h2>
      </div>
    );
  }

  // Check if current workout is already in the plan or saved list
  const isInPlan = plan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {/* Left Side: Visual Image Tag */}
      <div className="bg-card-bg border border-border-color rounded-2xl overflow-hidden flex items-center justify-center p-4">
        <Image
          src={workout.image}
          alt={workout.name}
          width={500}
          height={450}
          className="w-full h-[450px] object-cover rounded-xl"
          priority
        />
      </div>

      {/* Right Side: Details */}
      <div className="flex flex-col">
        <h1 className="text-3xl font-black text-white uppercase tracking-wider mb-2">
          {workout.name}
        </h1>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          {workout.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {workout.muscleGroups.map((group, i) => (
            <span
              key={i}
              className="bg-accent text-black text-xs font-bold px-2.5 py-1 rounded uppercase"
            >
              {group}
            </span>
          ))}
        </div>

        {/* Specs Table */}
        <div className="bg-card-bg border border-border-color rounded-xl p-4 mb-6 text-xs divide-y divide-gray-800">
          <div className="flex justify-between py-2">
            <span className="text-gray-500 uppercase font-bold">Equipment</span>
            <span className="text-white font-medium">{workout.equipment}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-500 uppercase font-bold">
              Difficulty
            </span>
            <span className="text-white font-medium">{workout.difficulty}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-500 uppercase font-bold">Sets</span>
            <span className="text-white font-medium">{workout.sets}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-500 uppercase font-bold">Reps</span>
            <span className="text-white font-medium">{workout.reps}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-500 uppercase font-bold">Duration</span>
            <span className="text-white font-medium">
              {workout.duration} min
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-500 uppercase font-bold">Calories</span>
            <span className="text-white font-medium">
              {workout.caloriesBurned} kcal
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-500 uppercase font-bold">Rating</span>
            <span className="text-white font-medium">{workout.rating}</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-8">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            INSTRUCTIONS
          </h3>
          <ol className="space-y-2 text-sm text-gray-300">
            {workout.instructions.map((step, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="font-bold text-gray-500">{idx + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Action Buttons with Dynamic Text Change */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => addToPlan(workout)}
            className={`flex-1 font-bold text-sm px-4 py-3 rounded-xl flex items-center justify-center space-x-2 transition-all ${
              isInPlan
                ? "bg-gray-800 text-accent border border-accent/40 cursor-default"
                : "bg-accent text-black hover:bg-opacity-90"
            }`}
          >
            {isInPlan ? <FaCheck /> : <FaPlus />}
            <span>
              {isInPlan ? "Added to today's plan" : "Add to today's plan"}
            </span>
          </button>

          <button
            onClick={() => saveForLater(workout)}
            className={`flex-1 font-bold text-sm px-4 py-3 rounded-xl flex items-center justify-center space-x-2 transition-all ${
              isSaved
                ? "bg-gray-800 text-gray-300 border border-gray-600"
                : "border border-gray-700 hover:border-gray-500 text-white bg-card-bg"
            }`}
          >
            <FaBookmark className={isSaved ? "text-accent" : "text-gray-400"} />
            <span>{isSaved ? "Saved for later" : "Save for later"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
