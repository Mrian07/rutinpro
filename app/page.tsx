"use client";

import { useState, useEffect } from "react";
import { useHabit } from "./hooks/useHabit";
import { useHistory } from "./hooks/useHistory";
import ProgressCircle from "./components/ProgressCircle";
import HabitItem from "./components/HabitItem";
import AddHabitModal from "./components/AddHabitModal";
import BottomNav from "./components/BottomNav";
import StatsPage from "./components/StatsPage";
import AddHabitPage from "./components/AddHabitPage";
import SettingsPage from "./components/SettingsPage";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";
import TermsOfServicePage from "./components/TermsOfServicePage";

export default function Home() {
  const { habits, addHabit, toggleHabit, getProgress, isLoaded } = useHabit();
  const { recordToday } = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState<
    "home" | "stats" | "add" | "settings" | "privacy" | "terms"
  >("home");
  const [userName, setUserName] = useState<string>("");
  const [showNameModal, setShowNameModal] = useState(false);

  // Load user name and dark mode preference from localStorage
  useEffect(() => {
    // Load theme
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDarkMode(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Load user name
    const savedName = localStorage.getItem("rutinpro-username");
    if (savedName) {
      setUserName(savedName);
    } else {
      setShowNameModal(true);
    }

    // Listen for navigation events from SettingsPage
    const handleNavigateToPrivacy = () => setCurrentPage("privacy");
    const handleNavigateToTerms = () => setCurrentPage("terms");

    window.addEventListener("navigate-to-privacy", handleNavigateToPrivacy);
    window.addEventListener("navigate-to-terms", handleNavigateToTerms);

    return () => {
      window.removeEventListener(
        "navigate-to-privacy",
        handleNavigateToPrivacy
      );
      window.removeEventListener("navigate-to-terms", handleNavigateToTerms);
    };
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Record today's completion whenever habits change
  useEffect(() => {
    if (isLoaded && habits.length > 0) {
      const completedIds = habits.filter((h) => h.checked).map((h) => h.id);
      recordToday(completedIds, habits.length);
    }
  }, [habits, isLoaded, recordToday]);

  // Save user name
  const handleSaveName = (name: string) => {
    const trimmedName = name.trim();
    if (trimmedName) {
      localStorage.setItem("rutinpro-username", trimmedName);
      setUserName(trimmedName);
      setShowNameModal(false);
    }
  };

  // Get current date info
  const getGreeting = () => {
    const hour = new Date().getHours();
    let greetingTime;

    if (hour < 11) {
      greetingTime = "Selamat Pagi";
    } else if (hour < 15) {
      greetingTime = "Selamat Siang";
    } else if (hour < 18) {
      greetingTime = "Selamat Sore";
    } else {
      greetingTime = "Selamat Malam";
    }

    return userName ? `${greetingTime}, ${userName}` : greetingTime;
  };

  const getFormattedDate = () => {
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
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

  const checkedCount = habits.filter((h) => h.checked).length;

  // Render Add Habit Page
  if (currentPage === "add") {
    return (
      <>
        <AddHabitPage
          onBack={() => setCurrentPage("home")}
          onAdd={(name, color, icon) => {
            addHabit(name, color, icon);
            setCurrentPage("home");
          }}
        />
      </>
    );
  }

  // Render Stats Page
  if (currentPage === "stats") {
    return (
      <>
        <StatsPage onBack={() => setCurrentPage("home")} />
        <BottomNav
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onAddClick={() => setCurrentPage("add")}
        />
        <AddHabitModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={addHabit}
        />
      </>
    );
  }

  // Render Settings Page
  if (currentPage === "settings") {
    return (
      <SettingsPage
        onBack={() => setCurrentPage("home")}
        userName={userName}
        onNameChange={setUserName}
      />
    );
  }

  // Render Privacy Policy Page
  if (currentPage === "privacy") {
    return <PrivacyPolicyPage onBack={() => setCurrentPage("settings")} />;
  }

  // Render Terms of Service Page
  if (currentPage === "terms") {
    return <TermsOfServicePage onBack={() => setCurrentPage("settings")} />;
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
          <div className="flex items-center gap-2">
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
            <button
              onClick={() => setCurrentPage("settings")}
              className="flex size-12 shrink-0 items-center justify-center text-[#111813] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              aria-label="Settings"
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
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
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

      {/* Habits List or Empty State */}
      <div className="px-4 pb-32">
        {habits.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-16 px-6 bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
            <div className="w-20 h-20 rounded-full bg-[#30e86e]/10 flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-[#30e86e]"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <h3 className="text-[#111813] dark:text-white text-lg font-bold mb-2 text-center">
              Belum Ada Rutinitas Tersimpan
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-6 max-w-xs">
              Mulai perjalanan Anda dengan menambahkan kebiasaan baik pertama
              Anda
            </p>
            <button
              onClick={() => setCurrentPage("add")}
              className="flex items-center gap-2 px-6 py-3 bg-[#30e86e] hover:bg-[#28b85a] text-[#111813] font-semibold rounded-full transition-colors shadow-lg shadow-[#30e86e]/30"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 4v16m8-8H4"></path>
              </svg>
              Tambahkan Rutinitas
            </button>
          </div>
        ) : (
          // Habits List
          <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
            {habits.map((habit) => (
              <HabitItem key={habit.id} habit={habit} onToggle={toggleHabit} />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onAddClick={() => setCurrentPage("add")}
      />

      {/* Add Habit Modal - kept for backward compatibility */}
      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={(name, color, icon) => {
          addHabit(name, color, icon);
          setCurrentPage("home");
        }}
      />

      {/* Name Input Modal */}
      {showNameModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#30e86e] to-[#28b85a] flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#111813] dark:text-white mb-2">
                Selamat Datang! 👋
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-center text-sm">
                Mari kita mulai dengan mengenal Anda
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get("name") as string;
                handleSaveName(name);
              }}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#111813] dark:text-white mb-2"
                >
                  Nama Anda
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoFocus
                  required
                  maxLength={30}
                  placeholder="Masukkan nama Anda"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#111813] dark:text-white placeholder-gray-400 focus:border-[#30e86e] focus:ring-2 focus:ring-[#30e86e]/20 outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#30e86e] hover:bg-[#28b85a] text-[#111813] font-semibold rounded-xl transition-colors shadow-lg shadow-[#30e86e]/30"
              >
                Mulai Rutinitas
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
