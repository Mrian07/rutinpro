"use client";

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

export default function PrivacyPolicyPage({ onBack }: PrivacyPolicyPageProps) {
  return (
    <div className="min-h-screen bg-[#f6f8f6] dark:bg-[#112116]">
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
            Kebijakan Privasi
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-6 space-y-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Terakhir diperbarui: 14 Desember 2025
            </p>
            <p className="text-[#111813] dark:text-white leading-relaxed">
              RutinPro berkomitmen untuk melindungi privasi Anda. Kebijakan
              privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan,
              dan melindungi informasi pribadi Anda.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#111813] dark:text-white mb-3">
              1. Informasi yang Kami Kumpulkan
            </h2>
            <p className="text-[#111813] dark:text-white leading-relaxed mb-2">
              Kami mengumpulkan informasi berikut:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#111813] dark:text-white ml-4">
              <li>Nama pengguna yang Anda berikan</li>
              <li>Data kebiasaan dan rutinitas yang Anda buat</li>
              <li>Riwayat penyelesaian kebiasaan</li>
              <li>Preferensi tema (light/dark mode)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#111813] dark:text-white mb-3">
              2. Penyimpanan Data
            </h2>
            <p className="text-[#111813] dark:text-white leading-relaxed">
              Semua data Anda disimpan secara lokal di perangkat Anda
              menggunakan localStorage browser. Kami tidak mengirim atau
              menyimpan data Anda ke server eksternal. Data Anda sepenuhnya
              berada di bawah kendali Anda.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#111813] dark:text-white mb-3">
              3. Penggunaan Data
            </h2>
            <p className="text-[#111813] dark:text-white leading-relaxed mb-2">
              Data yang kami kumpulkan digunakan untuk:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#111813] dark:text-white ml-4">
              <li>Menyediakan dan meningkatkan layanan aplikasi</li>
              <li>Menyimpan preferensi dan pengaturan Anda</li>
              <li>Menampilkan statistik dan progress kebiasaan Anda</li>
              <li>Personalisasi pengalaman pengguna</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#111813] dark:text-white mb-3">
              4. Keamanan Data
            </h2>
            <p className="text-[#111813] dark:text-white leading-relaxed">
              Kami mengambil langkah-langkah yang wajar untuk melindungi
              informasi Anda dari akses, penggunaan, atau pengungkapan yang
              tidak sah. Namun, karena data disimpan secara lokal di perangkat
              Anda, keamanan data bergantung pada keamanan perangkat Anda.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#111813] dark:text-white mb-3">
              5. Hak Anda
            </h2>
            <p className="text-[#111813] dark:text-white leading-relaxed mb-2">
              Anda memiliki hak untuk:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#111813] dark:text-white ml-4">
              <li>Mengakses data pribadi Anda kapan saja</li>
              <li>Mengubah atau memperbarui informasi Anda</li>
              <li>Menghapus semua data Anda melalui fitur reset</li>
              <li>Menghentikan penggunaan aplikasi kapan saja</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#111813] dark:text-white mb-3">
              6. Cookies dan Teknologi Pelacakan
            </h2>
            <p className="text-[#111813] dark:text-white leading-relaxed">
              Aplikasi ini menggunakan localStorage untuk menyimpan data secara
              lokal. Kami tidak menggunakan cookies pihak ketiga atau teknologi
              pelacakan untuk mengumpulkan informasi tentang aktivitas Anda.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#111813] dark:text-white mb-3">
              7. Perubahan Kebijakan
            </h2>
            <p className="text-[#111813] dark:text-white leading-relaxed">
              Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu.
              Perubahan akan diposting di halaman ini dengan tanggal pembaruan
              yang baru.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#111813] dark:text-white mb-3">
              8. Hubungi Kami
            </h2>
            <p className="text-[#111813] dark:text-white leading-relaxed">
              Jika Anda memiliki pertanyaan tentang kebijakan privasi ini,
              silakan hubungi kami di:
            </p>
            <p className="text-[#30e86e] font-medium mt-2">
              stackmasters07@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
