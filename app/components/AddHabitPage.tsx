'use client';

import { useState } from 'react';

interface AddHabitPageProps {
  onBack: () => void;
  onAdd: (name: string, color: string, icon: string) => void;
}

const COLORS = ['#82D9A1', '#7EC9E6', '#E6A87E', '#E67E7E', '#A87EE6', '#E67EC9'];
const ICONS = [
  'book', 'fitness_center', 'water_drop', 'wb_sunny', 'bedtime',
  'restaurant', 'work', 'school', 'local_mall', 'savings',
  'favorite', 'home', 'directions_run', 'spa', 'self_improvement'
];

export default function AddHabitPage({ onBack, onAdd }: AddHabitPageProps) {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedIcon, setSelectedIcon] = useState('book');
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);

  const handleSave = () => {
    if (name.trim()) {
      onAdd(name.trim(), selectedColor, selectedIcon);
      onBack();
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#f6f8f6] dark:bg-[#112116] overflow-x-hidden text-[#111813] dark:text-[#ededed]">
      {/* Top App Bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 pb-2 bg-[#f6f8f6] dark:bg-[#112116]">
        <button
          onClick={onBack}
          className="flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-3xl">close</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-[-0.015em]">
          New Habit
        </h1>
        <div className="flex size-12 shrink-0 items-center"></div>
      </div>

      <main className="flex-1 px-4 py-2 pb-32">
        {/* Name Section */}
        <section className="mb-6">
          <h2 className="px-0 pb-3 pt-4 text-lg font-bold leading-tight tracking-[-0.015em]">
            Name
          </h2>
          <div className="flex max-w-full flex-wrap items-end gap-4 rounded-xl bg-white dark:bg-gray-800 p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
            <label className="flex flex-col min-w-40 flex-1">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex h-14 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border-none bg-gray-100 dark:bg-gray-700 p-4 text-base font-normal leading-normal placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#30e86e]/50 text-[#111813] dark:text-white"
                placeholder="e.g., Read for 15 minutes"
                autoFocus
              />
            </label>
          </div>
        </section>

        {/* Icon & Color Section */}
        <section className="mb-6">
          <h2 className="px-0 pb-3 pt-4 text-lg font-bold leading-tight tracking-[-0.015em]">
            Icon & Color
          </h2>
          <div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
            {/* Icon Selector */}
            <div
              className="flex min-h-14 items-center justify-between gap-4 cursor-pointer"
              onClick={() => setIsIconPickerOpen(!isIconPickerOpen)}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#30e86e]/20 text-[#30e86e]"
                  style={{ backgroundColor: `${selectedColor}33`, color: selectedColor }}
                >
                  <span className="material-symbols-outlined text-3xl">{selectedIcon}</span>
                </div>
                <p className="flex-1 truncate text-base font-medium leading-normal">Icon</p>
              </div>
              <div className="shrink-0">
                <span className={`material-symbols-outlined text-2xl text-gray-400 dark:text-gray-500 transition-transform duration-300 ${isIconPickerOpen ? 'rotate-90' : ''}`}>
                  arrow_forward_ios
                </span>
              </div>
            </div>

            {/* Icon Grid (Collapsible) */}
            <div className={`grid grid-cols-5 gap-4 overflow-hidden transition-all duration-300 ${isIconPickerOpen ? 'max-h-64 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
              {ICONS.map((icon) => (
                <button
                  key={icon}
                  onClick={() => setSelectedIcon(icon)}
                  className={`flex aspect-square items-center justify-center rounded-xl transition-all ${selectedIcon === icon
                      ? 'bg-gray-100 dark:bg-gray-700 ring-2 ring-[#30e86e]'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                >
                  <span className="material-symbols-outlined text-2xl" style={{ color: selectedIcon === icon ? selectedColor : undefined }}>
                    {icon}
                  </span>
                </button>
              ))}
            </div>

            <hr className="my-3 border-gray-100 dark:border-gray-700" />

            {/* Color Selector */}
            <div className="flex min-h-14 flex-col justify-center gap-4">
              <p className="text-base font-medium leading-normal">Color</p>
              <div className="flex items-center justify-between gap-2">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`size-9 rounded-full transition-transform hover:scale-110 ${selectedColor === color
                        ? 'ring-2 ring-offset-2 ring-[#30e86e] ring-offset-[#f6f8f6] dark:ring-offset-[#112116]'
                        : ''
                      }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Action Button */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 p-4 pb-6 bg-gradient-to-t from-[#f6f8f6] via-[#f6f8f6] to-transparent dark:from-[#112116] dark:via-[#112116]">
        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className="w-full rounded-xl bg-[#30e86e] py-4 text-center text-base font-bold text-[#111813] shadow-lg shadow-[#30e86e]/20 hover:shadow-[#30e86e]/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Habit
        </button>
      </footer>
    </div>
  );
}
