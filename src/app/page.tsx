'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import WorkoutCard from '@/components/WorkoutCard';
import { Workout } from '@/types/workout';

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
        const data = await res.json();
        setWorkouts(data);
      } catch (err) {
        console.error('Failed to load workouts:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkouts();
  }, []);

  return (
    <div>
      <Hero />

      <section id="library" className="scroll-mt-20">
        <div className="mb-8">
          <h2 className="text-2xl font-black text-white uppercase tracking-wide">
            THE LIBRARY
          </h2>
          <p className="text-gray-400 text-sm">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="loading loading-spinner loading-lg text-accent"></span>
            <p className="mt-4 text-gray-400 text-sm">Loading workouts...</p>
          </div>
        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}