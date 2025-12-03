import { useState, useEffect, useCallback } from 'react';

export interface DailyHistory {
  date: string; // YYYY-MM-DD format
  completedHabits: string[];
  totalHabits: number;
  completionRate: number;
}

const HISTORY_KEY = 'rutinpro-history';
const MAX_HISTORY_DAYS = 30;

export const useHistory = () => {
  const [history, setHistory] = useState<DailyHistory[]>([]);

  // Load history from LocalStorage
  useEffect(() => {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setHistory(parsed);
      } catch (error) {
        console.error('Failed to parse history:', error);
        setHistory([]);
      }
    }
  }, []);

  // Record today's completion - wrapped in useCallback to prevent infinite loop
  const recordToday = useCallback((completedHabits: string[], totalHabits: number) => {
    const today = new Date().toISOString().split('T')[0];
    const completionRate = totalHabits > 0 ? (completedHabits.length / totalHabits) * 100 : 0;

    const todayRecord: DailyHistory = {
      date: today,
      completedHabits,
      totalHabits,
      completionRate,
    };

    setHistory(prevHistory => {
      // Check if today already exists
      const existingIndex = prevHistory.findIndex(h => h.date === today);
      let newHistory: DailyHistory[];

      if (existingIndex >= 0) {
        // Update existing record
        newHistory = [...prevHistory];
        newHistory[existingIndex] = todayRecord;
      } else {
        // Add new record
        newHistory = [...prevHistory, todayRecord];
      }

      // Keep only last MAX_HISTORY_DAYS and save
      const trimmed = newHistory.slice(-MAX_HISTORY_DAYS);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
      return trimmed;
    });
  }, []);

  // Get overall completion rate
  const getOverallCompletionRate = useCallback((): number => {
    if (history.length === 0) return 0;
    const total = history.reduce((sum, day) => sum + day.completionRate, 0);
    return Math.round(total / history.length);
  }, [history]);

  // Get current streak (consecutive days with 100% completion)
  const getCurrentStreak = useCallback((): number => {
    if (history.length === 0) return 0;

    let streak = 0;
    const sortedHistory = [...history].sort((a, b) => b.date.localeCompare(a.date));

    for (const day of sortedHistory) {
      if (day.completionRate === 100) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }, [history]);

  // Get best streak ever
  const getBestStreak = useCallback((): number => {
    if (history.length === 0) return 0;

    let currentStreak = 0;
    let bestStreak = 0;
    const sortedHistory = [...history].sort((a, b) => a.date.localeCompare(b.date));

    for (const day of sortedHistory) {
      if (day.completionRate === 100) {
        currentStreak++;
        bestStreak = Math.max(bestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }

    return bestStreak;
  }, [history]);

  // Get last 7 days data for chart
  const getWeeklyData = useCallback((): DailyHistory[] => {
    const sortedHistory = [...history].sort((a, b) => b.date.localeCompare(a.date));
    return sortedHistory.slice(0, 7).reverse();
  }, [history]);

  // Get completion rate for specific habit
  const getHabitCompletionRate = useCallback((habitId: string): number => {
    if (history.length === 0) return 0;

    const completedCount = history.filter(day =>
      day.completedHabits.includes(habitId)
    ).length;

    return Math.round((completedCount / history.length) * 100);
  }, [history]);

  return {
    history,
    recordToday,
    getOverallCompletionRate,
    getCurrentStreak,
    getBestStreak,
    getWeeklyData,
    getHabitCompletionRate,
  };
};
