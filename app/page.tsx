"use client"

import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  return (
    <main className="bg-white text-gray-800">

      {/* ================= HERO ================= */}
      <section className="bg-[#254B37] text-white px-6 pt-6 pb-28">
        <div className="max-w-7xl mx-auto">

          {/* NAVBAR */}
          <header className="flex items-center justify-between mb-20">
            <div className="flex items-center gap-3 font-semibold text-lg">
              <Image src="/logo bg.png" alt="CarbonScan Logo" width={32} height={32} />
              <span>CarbonScan</span>
            </div>

            <nav className="hidden md:flex gap-10 text-sm text-green-100">
              <a href="#emisi" className="hover:text-white">Emisi Karbon</a>
              <a href="#asal" className="hover:text-white">Asal Emisi</a>
              <a href="#cara-kerja" className="hover:text-white">Cara Kerja</a>
            </nav>

            <Link
              href="/login"
              className="px-5 py-2 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 transition"
            >
              Masuk
            </Link>
          </header>

          {/* HERO CONTENT */}
          <div className="grid md:grid-cols-2 items-center gap-20">

            {/* TEXT */}
            <div className="pl-6 md:pl-10">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Analisis Emisi Karbon <br />
                dari Struk Belanja <br />
                Bahan Makanan
              </h1>

              <p className="text-green-100 mb-8 max-w-md text-sm leading-relaxed">
                CarbonScan membantu UMKM dan restoran memahami serta memantau
                emisi karbon dari bahan makanan melalui analisis struk belanja.
              </p>

              <Link
                href="/register"
                className="inline-block px-7 py-3 rounded-full 
                           bg-emerald-500 text-[#254B37] 
                           font-semibold text-sm 
                           hover:bg-emerald-400 transition shadow-md"
              >
                Mulai Analisis Emisi
              </Link>
            </div>

            {/* IMAGE CIRCLES */}
            <div className="relative w-115 h-96 mx-auto">
              <div className="absolute left-[-24px] top-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full overflow-hidden">
                <Image src="/sayur.jpeg" alt="Sayur" fill className="object-cover" />
              </div>

              <div className="absolute right-0 top-2 w-[200px] h-[200px] rounded-full overflow-hidden">
                <Image src="/daging.jpeg" alt="Daging" fill className="object-cover" />
              </div>

              <div className="absolute right-12 bottom-0 w-[135px] h-[135px] rounded-full overflow-hidden">
                <Image src="/sembako.jpeg" alt="Sembako" fill className="object-cover" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= EMISI & OFFSET ================= */}
      <section id="emisi" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Emisi Karbon & Carbon Offset
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            <b>Emisi karbon</b> adalah pelepasan gas rumah kaca ke atmosfer
            akibat aktivitas manusia, termasuk produksi dan konsumsi bahan makanan.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed mt-4">
            <b>Carbon offset</b> merupakan upaya menyeimbangkan emisi tersebut.
            CarbonScan hanya menampilkan <b>estimasi offset</b> dan mengarahkan
            pengguna ke <b>pihak ketiga</b>. Fitur ini <b>opsional</b>.
          </p>
        </div>
      </section>

      {/* ================= ASAL EMISI ================= */}
      <section id="asal" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Emisi Karbon dari Bahan Makanan Berasal dari Mana?
          </h2>

          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
            Emisi karbon dihasilkan sepanjang siklus hidup bahan makanan.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            <Card title="Produksi Bahan Pangan" desc="Emisi dari pertanian dan peternakan." />
            <Card title="Pengolahan & Penyimpanan" desc="Pendinginan dan pengemasan." />
            <Card title="Distribusi & Transportasi" desc="Pengiriman bahan makanan." />
            <Card title="Limbah & Sisa Makanan" desc="Emisi dari makanan terbuang." />
          </div>
        </div>
      </section>

      {/* ================= CARA KERJA ================= */}
      <section id="cara-kerja" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Cara Kerja CarbonScan
          </h2>

          <div className="grid md:grid-cols-4 gap-8 mt-16">
            <Step number="1" title="Unggah Struk" desc="Foto atau PDF struk belanja." />
            <Step number="2" title="Analisis Emisi" desc="Perhitungan otomatis." />
            <Step number="3" title="Hasil & Riwayat" desc="Ringkasan dan pemantauan." />
            <Step number="4" title="Estimasi Offset" desc="Opsional & pihak ketiga." />
          </div>
        </div>
      </section>

{/* ================= CTA ================= */}
<section className="bg-[#254B37] px-6 py-12">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-16">

    {/* TEXT — LURUS DENGAN HERO */}
    <div className="pl-6 md:pl-10">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-white">
        Mulai Kelola Dampak <br />
        Lingkungan Bisnis Anda
      </h2>

      <p className="text-green-100 text-lg mb-8 max-w-lg">
        Hitung emisi karbon dari bahan makanan
        secara mudah dan praktis.
      </p>

      <Link
        href="/register"
        className="inline-block px-10 py-4 rounded-full
                   bg-emerald-500 text-[#254B37]
                   font-semibold text-sm
                   hover:bg-emerald-400 transition"
      >
        Daftar Sekarang
      </Link>
    </div>

    {/* IMAGE — DIPRESS ATAS BAWAH */}
    <div className="flex justify-center md:justify-end">
      <div className="relative w-[520px] h-[640px]">
        <Image
          src="/mockup.png"
          alt="CarbonScan App Mockup"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>

  </div>
</section>






      {/* ================= FOOTER ================= */}
      <footer className="bg-[#D8F3DC] px-6 py-14">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Image src="/logo bg.png" alt="CarbonScan Logo" width={28} height={28} />
            <span className="font-semibold text-lg text-[#254B37]">CarbonScan</span>
          </div>

          <p className="text-sm text-[#3A5A40] mb-6">
            Aplikasi estimasi emisi karbon bahan makanan
          </p>

          <p className="text-xs text-[#52796F]">© 2025 CarbonScan</p>
        </div>
      </footer>

    </main>
  )
}

/* ===== COMPONENTS ===== */

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  )
}

function Step({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="p-6">
      <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
        {number}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  )
}
