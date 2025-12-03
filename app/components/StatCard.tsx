'use client';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color?: 'green' | 'blue' | 'purple' | 'orange';
}

export default function StatCard({ icon, label, value, color = 'green' }: StatCardProps) {
  const colorClasses = {
    green: 'bg-[#30e86e]/10 text-[#30e86e]',
    blue: 'bg-blue-500/10 text-blue-500',
    purple: 'bg-purple-500/10 text-purple-500',
    orange: 'bg-orange-500/10 text-orange-500',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-3">
        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${colorClasses[color]}`}>
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{label}</p>
          <p className="text-[#111813] dark:text-white text-2xl font-bold mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
}
