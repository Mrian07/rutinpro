'use client';

import { useHistory } from '../hooks/useHistory';
import { useHabit } from '../hooks/useHabit';
import StatCard from './StatCard';

interface StatsPageProps {
  onBack: () => void;
}

export default function StatsPage({ onBack }: StatsPageProps) {
  const { habits } = useHabit();
  const {
    getOverallCompletionRate,
    getCurrentStreak,
    getBestStreak,
    getWeeklyData,
    getHabitCompletionRate,
  } = useHistory();

  const weeklyData = getWeeklyData();
  const maxRate = Math.max(...weeklyData.map(d => d.completionRate), 1);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#f6f8f6] dark:bg-[#112116] overflow-x-hidden pb-32">
      {/* Header */}
      <div className="flex flex-col gap-2 p-4 pb-2 bg-[#f6f8f6] dark:bg-[#112116] sticky top-0 z-10">
        <div className="flex items-center h-12 justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#111813] dark:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <h1 className="text-[#111813] dark:text-white text-xl font-bold">Statistik</h1>
          <div className="w-6"></div>
        </div>
      </div>

      <div className="px-4 space-y-4 mt-4">
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            }
            label="Rata-rata"
            value={`${getOverallCompletionRate()}%`}
            color="green"
          />

          <StatCard
            icon={
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
                <path d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path>
              </svg>
            }
            label="Streak Saat Ini"
            value={`${getCurrentStreak()} hari`}
            color="orange"
          />

          <StatCard
            icon={
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
              </svg>
            }
            label="Streak Terbaik"
            value={`${getBestStreak()} hari`}
            color="purple"
          />

          <StatCard
            icon={
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
              </svg>
            }
            label="Total Kebiasaan"
            value={habits.length}
            color="blue"
          />
        </div>

        {/* Weekly Chart */}
        {weeklyData.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
            <h3 className="text-[#111813] dark:text-white text-lg font-bold mb-4">
              7 Hari Terakhir
            </h3>
            <div className="flex items-end justify-between gap-2 h-40">
              {weeklyData.map((day, index) => {
                const height = (day.completionRate / maxRate) * 100;
                const date = new Date(day.date);
                const dayName = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'][date.getDay()];

                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden relative" style={{ height: '120px' }}>
                      <div
                        className="absolute bottom-0 w-full bg-[#30e86e] rounded-t-lg transition-all duration-300"
                        style={{ height: `${height}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {dayName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Habit Breakdown */}
        {habits.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
            <h3 className="text-[#111813] dark:text-white text-lg font-bold mb-4">
              Tingkat Penyelesaian per Kebiasaan
            </h3>
            <div className="space-y-3">
              {habits.map((habit) => {
                const rate = getHabitCompletionRate(habit.id);
                return (
                  <div key={habit.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[#111813] dark:text-white text-sm font-medium">
                        {habit.name}
                      </span>
                      <span className="text-[#30e86e] text-sm font-semibold">
                        {rate}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-[#30e86e] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${rate}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {weeklyData.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-center">
            <svg
              className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <p className="text-gray-500 dark:text-gray-400 text-base">
              Belum ada data statistik
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
              Mulai centang kebiasaan untuk melihat statistik
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
