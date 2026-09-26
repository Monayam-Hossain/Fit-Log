"use client";

import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";
import { FaPlus, FaBookmark, FaCheck } from "react-icons/fa";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  const { plan, saved, addToPlan, saveForLater } = usePlan();

  const isInPlan = plan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);

  return (
    <div className="bg-card-bg border border-border-color rounded-2xl overflow-hidden flex flex-col justify-between hover:border-gray-600 transition-all">

      <div className="relative w-full h-48 bg-gray-900">
        <Link href={`/workouts/${workout.id}`}>
          <Image
            src={workout.image}
            alt={workout.name}
            width={400}
            height={200}
            className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
          />
        </Link>

        <div className="absolute top-3 left-3 flex flex-wrap gap-1 pointer-events-none">
          {workout.muscleGroups.map((group, i) => (
            <span
              key={i}
              className="bg-accent text-black text-[10px] font-black px-2 py-0.5 rounded uppercase"
            >
              {group}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 flex flex-col grow">
        <Link href={`/workouts/${workout.id}`}>
          <h3 className="text-white font-bold text-lg mb-1 hover:text-accent transition-colors line-clamp-1">
            {workout.name}
          </h3>
        </Link>
        <p className="text-gray-400 text-xs mb-4 line-clamp-2 leading-relaxed">
          {workout.description}
        </p>

        <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-300 bg-[#12161c] p-2.5 rounded-xl mb-4 border border-border-color">
          <div>
            <span className="text-gray-500 block uppercase font-bold text-[9px]">
              Difficulty
            </span>
            <span className="font-semibold">{workout.difficulty}</span>
          </div>
          <div>
            <span className="text-gray-500 block uppercase font-bold text-[9px]">
              Duration
            </span>
            <span className="font-semibold">{workout.duration} min</span>
          </div>
          <div>
            <span className="text-gray-500 block uppercase font-bold text-[9px]">
              Sets / Reps
            </span>
            <span className="font-semibold">
              {workout.sets} sets ({workout.reps})
            </span>
          </div>
          <div>
            <span className="text-gray-500 block uppercase font-bold text-[9px]">
              Burn
            </span>
            <span className="font-semibold">{workout.caloriesBurned} kcal</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-auto">
          <button
            onClick={() => addToPlan(workout)}
            className={`flex-1 text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
              isInPlan
                ? "bg-gray-800 text-accent border border-accent/40"
                : "bg-accent text-black hover:bg-opacity-90"
            }`}
          >
            {isInPlan ? (
              <FaCheck className="text-[10px]" />
            ) : (
              <FaPlus className="text-[10px]" />
            )}
            <span>{isInPlan ? "In Plan" : "Add to Plan"}</span>
          </button>

          <button
            onClick={() => saveForLater(workout)}
            title={isSaved ? "Saved" : "Save for later"}
            className={`p-2 rounded-lg border transition-all ${
              isSaved
                ? "bg-gray-800 text-accent border-accent/40"
                : "bg-card-bg text-gray-400 border-border-color hover:text-white hover:border-gray-500"
            }`}
          >
            <FaBookmark className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
}
