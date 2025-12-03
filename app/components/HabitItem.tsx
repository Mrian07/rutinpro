'use client';

import { Habit } from '../hooks/useHabit';

interface HabitItemProps {
  habit: Habit;
  onToggle: (id: string) => void;
}

export default function HabitItem({ habit, onToggle }: HabitItemProps) {
  return (
    <div
      className={`group flex items-center justify-between p-4 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${habit.checked ? 'opacity-75' : 'opacity-100'
        }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${habit.checked
              ? 'bg-[#30e86e] text-[#111813] shadow-lg shadow-[#30e86e]/30 scale-110'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 group-hover:scale-110'
            }`}
          style={habit.checked ? { backgroundColor: habit.color, boxShadow: `0 10px 15px -3px ${habit.color}4d` } : {}}
        >
          <span className="material-symbols-outlined text-2xl">
            {habit.icon || 'check_circle'}
          </span>
        </div>
        <div className="flex flex-col">
          <span
            className={`text-base font-semibold transition-all duration-300 ${habit.checked
                ? 'text-gray-400 dark:text-gray-500 line-through'
                : 'text-[#111813] dark:text-white'
              }`}
          >
            {habit.name}
          </span>
        </div>
      </div>

      <button
        onClick={() => onToggle(habit.id)}
        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${habit.checked
            ? 'border-transparent text-white scale-110'
            : 'border-gray-300 dark:border-gray-600 text-transparent hover:border-[#30e86e] dark:hover:border-[#30e86e]'
          }`}
        style={habit.checked ? { backgroundColor: habit.color } : {}}
      >
        <svg
          className="h-5 w-5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M5 13l4 4L19 7"></path>
        </svg>
      </button>
    </div>
  );
}
