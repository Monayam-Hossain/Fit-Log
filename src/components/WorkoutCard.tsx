import Link from "next/link";
import { FaClock, FaFire, FaStar } from "react-icons/fa";
import { Workout } from "@/types/workout";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link href={`/workouts/${workout.id}`} className="group">
      <div className="bg-card-bg border border-border-color rounded-xl overflow-hidden hover:border-gray-600 transition-all duration-200 flex flex-col h-full">
        <div className="h-48 overflow-hidden bg-gray-900">
          <img
            src={workout.image}
            alt={workout.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {workout.muscleGroups.map((group, i) => (
              <span
                key={i}
                className="bg-accent text-black text-[10px] font-extrabold px-2 py-0.5 rounded uppercase"
              >
                {group}
              </span>
            ))}
          </div>
          <h3 className="text-lg font-bold text-white uppercase tracking-wide group-hover:text-accent transition-colors">
            {workout.name}
          </h3>
          <p className="text-xs text-gray-400 mb-4">{workout.equipment}</p>
          
          {/* Stats Row */}
          <div className="mt-auto flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-800">
            <span className="flex items-center space-x-1">
              <FaClock className="text-gray-500" />
              <span>{workout.duration} min</span>
            </span>
            <span className="flex items-center space-x-1">
              <FaFire className="text-gray-500" />
              <span>{workout.caloriesBurned} kcal</span>
            </span>
            <span className="flex items-center space-x-1">
              <FaStar className="text-gray-500" />
              <span>{workout.rating}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
