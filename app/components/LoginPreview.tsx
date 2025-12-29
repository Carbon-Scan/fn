import Image from "next/image"

export default function LoginPreview() {
  return (
    <div className="sticky top-24">
      <Image
        src="/login gambar.png"
        alt="Login CarbonScan"
        width={420}
        height={520}
        className="rounded-xl shadow-lg"
      />

      <div className="mt-6 p-5 bg-gray-50 rounded-xl">
        <h3 className="text-lg font-semibold mb-2">
          Coba CarbonScan
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Scan struk belanja dan hitung estimasi emisi karbon dari aktivitas konsumsi Anda.
        </p>

        <a
          href="/login"
          className="block text-center bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Login & Coba Sistem
        </a>
      </div>
    </div>
  )
}
