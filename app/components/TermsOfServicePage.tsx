"use client";

interface TermsOfServicePageProps {
  onBack: () => void;
}

export default function TermsOfServicePage({
  onBack,
}: TermsOfServicePageProps) {
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
            Syarat & Ketentuan
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
              Selamat datang di RutinPro. Dengan menggunakan aplikasi ini, Anda
              menyetujui syarat dan ketentuan berikut. Harap baca dengan seksama
              sebelum menggunakan layanan kami.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#111813] dark:text-white mb-3">
              1. Penerimaan Syarat
            </h2>
            <p className="text-[#111813] dark:text-white leading-relaxed">
              Dengan mengakses dan menggunakan RutinPro, Anda menerima dan
              setuju untuk terikat oleh syarat dan ketentuan ini. Jika Anda
              tidak setuju dengan bagian mana pun dari syarat ini, Anda tidak
              boleh menggunakan aplikasi kami.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#111813] dark:text-white mb-3">
              2. Penggunaan Layanan
            </h2>
            <p className="text-[#111813] dark:text-white leading-relaxed mb-2">
              Anda setuju untuk menggunakan RutinPro hanya untuk tujuan yang sah
              dan sesuai dengan:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#111813] dark:text-white ml-4">
              <li>Semua hukum dan peraturan yang berlaku</li>
              <li>Syarat dan ketentuan ini</li>
              <li>Norma dan etika yang berlaku umum</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#111813] dark:text-white mb-3">
              3. Akun Pengguna
            </h2>
            <p className="text-[#111813] dark:text-white leading-relaxed">
              RutinPro tidak memerlukan pembuatan akun. Semua data disimpan
              secara lokal di perangkat Anda. Anda bertanggung jawab penuh atas
              keamanan perangkat Anda dan data yang tersimpan di dalamnya.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#111813] dark:text-white mb-3">
              4. Konten Pengguna
            </h2>
            <p className="text-[#111813] dark:text-white leading-relaxed">
              Anda mempertahankan semua hak atas konten yang Anda buat di
              RutinPro, termasuk nama kebiasaan, catatan, dan data lainnya. Kami
              tidak mengklaim kepemilikan atas konten Anda.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#111813] dark:text-white mb-3">
              5. Ketersediaan Layanan
            </h2>
            <p className="text-[#111813] dark:text-white leading-relaxed">
              Kami berusaha untuk menjaga aplikasi tetap tersedia dan berfungsi,
              namun kami tidak menjamin bahwa layanan akan selalu tersedia,
              tidak terputus, atau bebas dari kesalahan. Kami berhak untuk
              memodifikasi atau menghentikan layanan kapan saja.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#111813] dark:text-white mb-3">
              6. Batasan Tanggung Jawab
            </h2>
            <p className="text-[#111813] dark:text-white leading-relaxed mb-2">
              RutinPro disediakan "sebagaimana adanya" tanpa jaminan apa pun.
              Kami tidak bertanggung jawab atas:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#111813] dark:text-white ml-4">
              <li>Kehilangan data akibat kerusakan perangkat</li>
              <li>Kesalahan atau gangguan dalam layanan</li>
              <li>Kerusakan yang timbul dari penggunaan aplikasi</li>
              <li>Tindakan pihak ketiga</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#111813] dark:text-white mb-3">
              7. Hak Kekayaan Intelektual
            </h2>
            <p className="text-[#111813] dark:text-white leading-relaxed">
              Semua hak kekayaan intelektual dalam aplikasi RutinPro, termasuk
              desain, logo, dan kode, adalah milik kami atau pemberi lisensi
              kami. Anda tidak boleh menyalin, memodifikasi, atau
              mendistribusikan aplikasi tanpa izin tertulis.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#111813] dark:text-white mb-3">
              8. Perubahan Syarat
            </h2>
            <p className="text-[#111813] dark:text-white leading-relaxed">
              Kami berhak untuk mengubah syarat dan ketentuan ini kapan saja.
              Perubahan akan berlaku segera setelah diposting. Penggunaan
              berkelanjutan Anda atas aplikasi setelah perubahan berarti Anda
              menerima syarat yang diperbarui.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#111813] dark:text-white mb-3">
              9. Penghentian
            </h2>
            <p className="text-[#111813] dark:text-white leading-relaxed">
              Anda dapat berhenti menggunakan RutinPro kapan saja dengan
              menghapus aplikasi dari perangkat Anda. Kami juga berhak untuk
              menghentikan atau menangguhkan akses Anda ke layanan jika Anda
              melanggar syarat ini.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#111813] dark:text-white mb-3">
              10. Hukum yang Berlaku
            </h2>
            <p className="text-[#111813] dark:text-white leading-relaxed">
              Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan
              hukum Republik Indonesia. Setiap sengketa akan diselesaikan di
              pengadilan yang berwenang di Indonesia.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#111813] dark:text-white mb-3">
              11. Hubungi Kami
            </h2>
            <p className="text-[#111813] dark:text-white leading-relaxed">
              Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini,
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
