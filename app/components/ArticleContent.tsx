export default function Home() {
  return (
    <main className="bg-white text-gray-800">

      <div className="relative w-full h-105">
        <img
          src="/hero-carbon.jpg"
          alt="Emisi karbon"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Emisi Karbon dan Aktivitas Manusia
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed max-w-2xl">
              Emisi karbon merupakan pelepasan gas rumah kaca ke atmosfer yang sebagian besar
              berasal dari aktivitas manusia dan berdampak langsung terhadap perubahan iklim global.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pengertian Emisi Karbon
          </h2>
          <div className="h-px w-32 bg-gray-400"></div>
        </div>

        <div className="mb-12">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Emisi karbon adalah pelepasan karbon dioksida (CO2) dan gas rumah kaca lainnya ke atmosfer
            akibat aktivitas manusia seperti pembakaran bahan bakar fosil, pengelolaan limbah,
            proses industri, serta perubahan penggunaan lahan.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Akumulasi emisi karbon di atmosfer memperkuat efek rumah kaca yang memicu pemanasan global,
            perubahan iklim, serta berbagai dampak lingkungan dan sosial.
          </p>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Aktivitas Manusia Penyebab Emisi Karbon
          </h1>
          <div className="h-px w-32 bg-gray-400"></div>
        </div>

        <img src="/industri.jpg" alt="Emisi industri" className="" />

        <div className="mb-10">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Aktivitas manusia menjadi penyebab utama peningkatan emisi karbon di atmosfer.
            Di Indonesia, pengelolaan sampah, terutama sampah plastik dan organik, menghasilkan
            gas rumah kaca dalam jumlah besar.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Sampah organik yang terdekomposisi di tempat pembuangan akhir melepaskan metana
            dan karbon dioksida. Pembakaran sampah plastik menyumbang hingga 96,2% dari total
            emisi CO2 dari pembakaran sampah.
          </p>
        </div>

        <img src="/sampah.jpeg" alt="Sampah dan limbah" className="" />

        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Produksi Sampah di Indonesia
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Setiap orang di Indonesia menghasilkan sekitar 0,7–1 kg sampah per hari,
            dengan 19% berupa sampah plastik.
          </p>

          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="text-gray-700 mb-4">
              Sampah plastik tidak hanya menghasilkan emisi saat dibakar, tetapi juga
              berkontribusi terhadap pencemaran lingkungan selama proses produksi dan pembuangannya.
            </p>
            <p className="text-gray-700">
              Proses dekomposisi sampah organik di TPA menghasilkan gas metana dengan potensi
              pemanasan global 28–36 kali lebih besar daripada CO2.
            </p>
          </div>
        </div>

        <img src="/hutan.jpeg" alt="Deforestasi" className="" />

        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Perubahan Penggunaan Lahan
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Perubahan penggunaan lahan seperti deforestasi dan pembukaan lahan mengurangi
            kemampuan hutan menyerap karbon dan melepaskan karbon dari pohon serta tanah.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Hutan berfungsi sebagai penyerap karbon alami melalui fotosintesis.
            Ketika hutan ditebang atau dibakar, karbon dilepaskan ke atmosfer sebagai CO2.
          </p>
        </div>

        <img src="/global.png" alt="Pemanasan global" className="" />

        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sektor Industri dan Energi
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Sektor industri, transportasi, dan energi berperan besar dalam emisi karbon.
            Batu bara masih menjadi sumber energi utama, mencapai 67,21% pada tahun 2022.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-400">
            <p className="text-gray-700">
              Ketergantungan pada batu bara menghasilkan emisi karbon signifikan,
              termasuk CO2, sulfur dioksida, nitrogen oksida, dan partikel halus.
            </p>
          </div>
        </div>

        <img src="/transportasi.jpg" alt="Transportasi" className="" />

        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sektor Transportasi
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Sektor transportasi menyumbang sekitar 21,85% hingga 27% dari total emisi karbon di Indonesia.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Penggunaan kendaraan bermotor berbahan bakar fosil menghasilkan emisi karbon
            yang terus meningkat seiring pertumbuhan jumlah kendaraan dan aktivitas ekonomi.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Rekomendasi Pengurangan Emisi
          </h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            <li>Pengelolaan sampah dengan prinsip reduce, reuse, recycle</li>
            <li>Transisi ke sumber energi terbarukan</li>
            <li>Penggunaan transportasi umum dan kendaraan ramah lingkungan</li>
            <li>Pelestarian dan rehabilitasi hutan</li>
            <li>Penerapan teknologi efisiensi energi</li>
          </ul>
        </div>

        <div className="pt-8 border-t border-gray-300">
          <p className="text-gray-700 leading-relaxed">
            Pemahaman terhadap sumber emisi karbon dari aktivitas manusia merupakan langkah awal
            dalam merancang strategi mitigasi perubahan iklim yang efektif dan berkelanjutan.
          </p>
        </div>

      </div>
    </main>
  );
}
