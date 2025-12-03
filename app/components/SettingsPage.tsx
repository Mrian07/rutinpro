"use client";

import { useState } from "react";

interface SettingsPageProps {
  onBack: () => void;
  userName: string;
  onNameChange: (newName: string) => void;
}

export default function SettingsPage({
  onBack,
  userName,
  onNameChange,
}: SettingsPageProps) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showNameEdit, setShowNameEdit] = useState(false);
  const [newName, setNewName] = useState(userName);

  const handleResetData = () => {
    // Get username before clearing
    const savedUsername = localStorage.getItem("rutinpro-username");

    // Clear all localStorage
    localStorage.clear();

    // Restore username
    if (savedUsername) {
      localStorage.setItem("rutinpro-username", savedUsername);
    }

    setShowResetConfirm(false);

    // Reload page to reflect changes
    window.location.reload();
  };

  const handleSaveName = () => {
    const trimmedName = newName.trim();
    if (trimmedName) {
      localStorage.setItem("rutinpro-username", trimmedName);
      onNameChange(trimmedName);
      setShowNameEdit(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8f6] dark:bg-[#112116] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#f6f8f6] dark:bg-[#112116] border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Kembali"
          >
            <svg
              className="w-6 h-6 text-[#111813] dark:text-white"
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
          <h1 className="text-2xl font-bold text-[#111813] dark:text-white">
            Pengaturan
          </h1>
        </div>
      </div>

      {/* Settings Content */}
      <div className="p-4 space-y-4">
        {/* Profile Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-[#111813] dark:text-white">
              Profil
            </h2>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#30e86e] to-[#28b85a] flex items-center justify-center text-white font-bold text-lg">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Nama Anda
                  </p>
                  <p className="text-base font-semibold text-[#111813] dark:text-white">
                    {userName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setNewName(userName);
                  setShowNameEdit(true);
                }}
                className="px-4 py-2 text-sm font-medium text-[#30e86e] hover:bg-[#30e86e]/10 rounded-lg transition-colors"
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Data Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-[#111813] dark:text-white">
              Data
            </h2>
          </div>
          <div className="p-4">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-red-600 dark:text-red-400"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-medium text-[#111813] dark:text-white">
                    Reset Semua Rutinitas
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Hapus semua kebiasaan dan riwayat
                  </p>
                </div>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Legal Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-[#111813] dark:text-white">
              Legal
            </h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <button
              onClick={() => {
                // Will be handled in parent component
                window.dispatchEvent(new CustomEvent("navigate-to-privacy"));
              }}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                <span className="text-[#111813] dark:text-white font-medium">
                  Kebijakan Privasi
                </span>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7"></path>
              </svg>
            </button>

            <button
              onClick={() => {
                // Will be handled in parent component
                window.dispatchEvent(new CustomEvent("navigate-to-terms"));
              }}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span className="text-[#111813] dark:text-white font-medium">
                  Syarat & Ketentuan
                </span>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-[#111813] dark:text-white">
              Tentang
            </h2>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Versi</span>
              <span className="text-[#111813] dark:text-white font-medium">
                1.0.0
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Aplikasi</span>
              <span className="text-[#111813] dark:text-white font-medium">
                RutinPro
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-red-600 dark:text-red-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[#111813] dark:text-white mb-2">
                Reset Semua Data?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-center text-sm">
                Tindakan ini akan menghapus semua kebiasaan dan riwayat Anda.
                Data tidak dapat dikembalikan.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-[#111813] dark:text-white font-semibold rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleResetData}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Name Modal */}
      {showNameEdit && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold text-[#111813] dark:text-white mb-4">
              Edit Nama
            </h2>

            <div className="mb-6">
              <label
                htmlFor="edit-name"
                className="block text-sm font-medium text-[#111813] dark:text-white mb-2"
              >
                Nama Anda
              </label>
              <input
                type="text"
                id="edit-name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                autoFocus
                maxLength={30}
                placeholder="Masukkan nama Anda"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#111813] dark:text-white placeholder-gray-400 focus:border-[#30e86e] focus:ring-2 focus:ring-[#30e86e]/20 outline-none transition-all"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowNameEdit(false)}
                className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-[#111813] dark:text-white font-semibold rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSaveName}
                className="flex-1 px-4 py-3 bg-[#30e86e] hover:bg-[#28b85a] text-[#111813] font-semibold rounded-xl transition-colors"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
