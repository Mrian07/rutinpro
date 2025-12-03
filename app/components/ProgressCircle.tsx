'use client';

interface ProgressCircleProps {
  percentage: number;
  checkedCount: number;
  totalCount: number;
}

export default function ProgressCircle({
  percentage,
  checkedCount,
  totalCount,
}: ProgressCircleProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const getMessage = () => {
    if (percentage === 100) return 'Sempurna!';
    if (percentage >= 75) return 'Hampir selesai!';
    if (percentage >= 50) return 'Progres bagus!';
    if (percentage >= 25) return 'Terus semangat!';
    return 'Ayo mulai!';
  };

  return (
    <div className="px-4 py-2">
      <div className="flex flex-row items-center justify-between rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] bg-white dark:bg-gray-800 p-6">
        <div className="flex flex-col gap-1.5">
          <p className="text-[#111813] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
            {getMessage()}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
            {percentage === 100
              ? 'Semua kebiasaan selesai'
              : 'Kamu hampir sampai'}
          </p>
          <p className="text-[#30e86e] text-base font-semibold leading-normal">
            {checkedCount} dari {totalCount} kebiasaan selesai
          </p>
        </div>
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              className="progress-ring-bg"
              cx="50"
              cy="50"
              fill="transparent"
              r={radius}
              strokeWidth="10"
            />
            {/* Progress circle */}
            <circle
              className="progress-ring-fg"
              cx="50"
              cy="50"
              fill="transparent"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              strokeWidth="10"
            />
          </svg>
          <span className="absolute text-xl font-bold text-[#111813] dark:text-white">
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
}
