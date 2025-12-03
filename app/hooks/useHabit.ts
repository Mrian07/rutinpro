import { useState, useEffect } from "react";

export interface Habit {
  id: string;
  name: string;
  checked: boolean;
  color: string;
  icon: string;
}

const DEFAULT_HABITS: Habit[] = [];

const STORAGE_KEY = "rutinpro-habits";

export const useHabit = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load habits from LocalStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Migration for old data
        const migrated = parsed.map((h: any) => ({
          ...h,
          color: h.color || "#30e86e",
          icon: h.icon || "check_circle",
        }));
        setHabits(migrated);
      } catch (error) {
        console.error("Failed to parse habits from localStorage:", error);
        setHabits(DEFAULT_HABITS);
      }
    } else {
      setHabits(DEFAULT_HABITS);
    }
    setIsLoaded(true);
  }, []);

  // Save habits to LocalStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    }
  }, [habits, isLoaded]);

  const addHabit = (
    name: string,
    color: string = "#30e86e",
    icon: string = "check_circle"
  ) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      checked: false,
      color,
      icon,
    };
    setHabits([...habits, newHabit]);
  };

  const toggleHabit = (id: string) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, checked: !habit.checked } : habit
      )
    );
  };

  const getProgress = () => {
    if (habits.length === 0) return 0;
    const checkedCount = habits.filter((h) => h.checked).length;
    return Math.round((checkedCount / habits.length) * 100);
  };

  return {
    habits,
    addHabit,
    toggleHabit,
    getProgress,
    isLoaded,
  };
};
