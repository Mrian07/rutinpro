'use client';

import { useState, useEffect } from 'react';
import { useHabit } from './hooks/useHabit';
import { useHistory } from './hooks/useHistory';
import ProgressCircle from './components/ProgressCircle';
import HabitItem from './components/HabitItem';
import AddHabitModal from './components/AddHabitModal';
import BottomNav from './components/BottomNav';
import StatsPage from './components/StatsPage';
import AddHabitPage from './components/AddHabitPage';

export default function Home() {
  const { habits, addHabit, toggleHabit, getProgress, isLoaded } = useHabit();
  const { recordToday } = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'stats' | 'add'>('home');

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDarkMode(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Record today's completion whenever habits change
  useEffect(() => {
    if (isLoaded && habits.length > 0) {
      const completedIds = habits.filter(h => h.checked).map(h => h.id);
      recordToday(completedIds, habits.length);
    }
  }, [habits, isLoaded, recordToday]);

  // Get current date info
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 18) return 'Selamat Siang';
    return 'Selamat Malam';
  };

  const getFormattedDate = () => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const now = new Date();
    return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`;
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f8f6] dark:bg-[#112116]">
        <div className="text-gray-400 text-lg">Memuat...</div>
      </div>
    );
  }

  const checkedCount = habits.filter(h => h.checked).length;

  // Render Add Habit Page
  if (currentPage === 'add') {
    return (
      <>
        <AddHabitPage
          onBack={() => setCurrentPage('home')}
          onAdd={(name, color, icon) => {
            addHabit(name, color, icon);
            setCurrentPage('home');
          }}
        />
      </>
    );
  }

  // Render Stats Page
  if (currentPage === 'stats') {
    return (
      <>
        <StatsPage onBack={() => setCurrentPage('home')} />
        <BottomNav
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onAddClick={() => setCurrentPage('add')}
        />
        <AddHabitModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={addHabit}
        />
      </>
    );
  }

  // Render Home Page
  return (
    <main className="relative flex min-h-screen w-full flex-col bg-[#f6f8f6] dark:bg-[#112116] overflow-x-hidden">
      {/* Top App Bar */}
      <div className="flex flex-col gap-2 p-4 pb-2 bg-[#f6f8f6] dark:bg-[#112116] sticky top-0 z-10">
        <div className="flex items-center h-12 justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#30e86e] to-[#28b85a] flex items-center justify-center text-white font-bold text-lg">
              R
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={toggleDarkMode}
              className="flex size-12 shrink-0 items-center justify-center text-[#111813] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                // Sun icon for light mode
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              ) : (
                // Moon icon for dark mode
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
        <p className="text-[#111813] dark:text-white tracking-light text-[28px] font-bold leading-tight">
          {getGreeting()}
        </p>
      </div>

      {/* Date */}
      <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal pb-3 pt-1 px-4">
        {getFormattedDate()}
      </p>

      {/* Progress Card */}
      <ProgressCircle
        percentage={getProgress()}
        checkedCount={checkedCount}
        totalCount={habits.length}
      />

      {/* Section Header */}
      <h2 className="text-[#111813] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-6">
        Kebiasaan Hari Ini
      </h2>

      {/* Habits List */}
      <div className="px-4 pb-32">
        <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          {habits.map((habit) => (
            <HabitItem key={habit.id} habit={habit} onToggle={toggleHabit} />
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onAddClick={() => setCurrentPage('add')}
      />

      {/* Add Habit Modal - kept for backward compatibility */}
      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={(name, color, icon) => {
          addHabit(name, color, icon);
          setCurrentPage('home');
        }}
      />
    </main>
  );
}
