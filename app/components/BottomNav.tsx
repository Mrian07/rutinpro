'use client';

interface BottomNavProps {
  currentPage: 'home' | 'stats' | 'add';
  onNavigate: (page: 'home' | 'stats' | 'add') => void;
  onAddClick: () => void;
}

export default function BottomNav({ currentPage, onNavigate, onAddClick }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="flex h-full items-center justify-around max-w-lg mx-auto px-4">
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center gap-1 ${currentPage === 'home' ? 'text-[#30e86e]' : 'text-gray-500 dark:text-gray-400'
            }`}
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
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <span className="text-xs font-semibold">Home</span>
        </button>

        <button
          onClick={() => onNavigate('stats')}
          className={`flex flex-col items-center gap-1 ${currentPage === 'stats' ? 'text-[#30e86e]' : 'text-gray-500 dark:text-gray-400'
            }`}
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
            <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          <span className="text-xs font-semibold">Stats</span>
        </button>

        <button
          onClick={onAddClick}
          className="relative -top-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#30e86e] text-[#111813] shadow-lg shadow-[#30e86e]/40 hover:shadow-xl transition-all"
        >
          <svg
            className="w-10 h-10"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 4v16m8-8H4"></path>
          </svg>
        </button>

        <button className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400">
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
          </svg>
          <span className="text-xs font-semibold">Explore</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400">
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
          <span className="text-xs font-semibold">Settings</span>
        </button>
      </div>
    </div>
  );
}
