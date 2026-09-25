'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Workout } from '@/types/workout';
import { toast } from 'react-toastify';

interface PlanContextType {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void;
  removeFromPlan: (id: string | number) => void;
  removeFromSaved: (id: string | number) => void;
  markAsDone: (id: string | number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
  // Start with empty arrays to match server rendering and prevent hydration mismatches
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage safely on client mount
  useEffect(() => {
    const savedPlan = localStorage.getItem('fitlog_plan');
    const savedList = localStorage.getItem('fitlog_saved');
    if (savedPlan) setPlan(JSON.parse(savedPlan));
    if (savedList) setSaved(JSON.parse(savedList));
    setIsInitialized(true);
  }, []);

  // Save to localStorage only after initialization
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('fitlog_plan', JSON.stringify(plan));
    }
  }, [plan, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('fitlog_saved', JSON.stringify(saved));
    }
  }, [saved, isInitialized]);

  const addToPlan = (workout: Workout) => {
    if (plan.length >= 5) {
      toast.error("You've reached the limit of 5 lifts for today!");
      return;
    }
    if (plan.some((item) => item.id === workout.id)) {
      toast.info('Workout is already in today\'s plan!');
      return;
    }
    setPlan((prev) => [...prev, { ...workout, isDone: false }]);
    toast.success('Added to today\'s plan!');
  };

  const saveForLater = (workout: Workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      toast.info('Workout is already saved!');
      return;
    }
    setSaved((prev) => [...prev, workout]);
    toast.success('Saved for later!');
  };

  const removeFromPlan = (id: string | number) => {
    setPlan((prev) => prev.filter((item) => item.id !== id));
    toast.info('Removed from today\'s plan.');
  };

  const removeFromSaved = (id: string | number) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
    toast.info('Removed from saved lifts.');
  };

  const markAsDone = (id: string | number) => {
    setPlan((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isDone: true } : item))
    );
    toast.success('Workout marked as completed! Great job!');
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) throw new Error('usePlan must be used within a PlanProvider');
  return context;
};