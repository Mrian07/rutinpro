'use client';

import { useState, useEffect } from 'react';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, color: string, icon: string) => void;
}

const COLORS = ['#82D9A1', '#7EC9E6', '#E6A87E', '#E67E7E', '#A87EE6', '#E67EC9'];
const ICONS = [
  'book', 'fitness_center', 'water_drop', 'wb_sunny', 'bedtime',
  'restaurant', 'work', 'school', 'local_mall', 'savings'
];

export default function AddHabitModal({ isOpen, onClose, onAdd }: AddHabitModalProps) {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedIcon, setSelectedIcon] = useState('book');
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName('');
      setSelectedColor(COLORS[0]);
      setSelectedIcon('book');
      setIsIconPickerOpen(false);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (name.trim()) {
      onAdd(name.trim(), selectedColor, selectedIcon);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#f6f8f6] dark:bg-[#112116] rounded-2xl shadow-xl overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-bold text-[#111813] dark:text-white">Tambah Rutinitas</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="material-symbols-outlined text-2xl text-gray-500">close</span>
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-bold text-[#111813] dark:text-white mb-2">Nama Rutinitas </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-xl bg-white dark:bg-gray-800 border-none text-[#111813] dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#30e86e]/50"
              placeholder="e.g., Read for 15 minutes"
              autoFocus
            />
          </div>

          {/* Icon & Color */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            {/* Icon Selector */}
            <div
              className="flex items-center justify-between mb-4 cursor-pointer"
              onClick={() => setIsIconPickerOpen(!isIconPickerOpen)}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex size-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${selectedColor}33`, color: selectedColor }}
                >
                  <span className="material-symbols-outlined">{selectedIcon}</span>
                </div>
                <span className="font-medium text-[#111813] dark:text-white">Icon</span>
              </div>
              <span className={`material-symbols-outlined text-gray-400 transition-transform ${isIconPickerOpen ? 'rotate-90' : ''}`}>
                arrow_forward_ios
              </span>
            </div>

            {/* Icon Grid */}
            {isIconPickerOpen && (
              <div className="grid grid-cols-5 gap-2 mb-4 animate-fade-in">
                {ICONS.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => setSelectedIcon(icon)}
                    className={`aspect-square flex items-center justify-center rounded-lg transition-all ${selectedIcon === icon ? 'bg-gray-100 dark:bg-gray-700 ring-2 ring-[#30e86e]' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                  >
                    <span className="material-symbols-outlined text-xl" style={{ color: selectedIcon === icon ? selectedColor : undefined }}>
                      {icon}
                    </span>
                  </button>
                ))}
              </div>
            )}

            <hr className="border-gray-100 dark:border-gray-700 mb-4" />

            {/* Color Selector */}
            <div>
              <p className="font-medium text-[#111813] dark:text-white mb-3">Color</p>
              <div className="flex justify-between gap-2">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`size-8 rounded-full transition-transform hover:scale-110 ${selectedColor === color ? 'ring-2 ring-offset-2 ring-[#30e86e] ring-offset-white dark:ring-offset-gray-800' : ''
                      }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="w-full py-4 rounded-xl bg-[#30e86e] text-[#111813] font-bold shadow-lg shadow-[#30e86e]/20 hover:shadow-[#30e86e]/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Habit
          </button>
        </div>
      </div>
    </div>
  );
}
