"use client"

import { useRef, useState } from "react"
import { Upload, Cloud, Calculator } from "lucide-react"
import { useSession } from "next-auth/react"

import TopBar from "@/components/top-bar"
import Card from "@/components/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const HF_API = "https://delia-ayu-nandhita-emisicarbonmodel.hf.space"
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"]

type Product = {
  produk: string
  berat_kg: number
}

export default function UploadPage() {
  const { data: session, status } = useSession()
  const fileRef = useRef<HTMLInputElement | null>(null)

  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [result, setResult] = useState<any>(null)

  /* ================= PICK FILE ================= */
  const pickFile = (f?: File) => {
    if (!f) return
    if (!ALLOWED_TYPES.includes(f.type)) {
      alert("Format file tidak didukung")
      return
    }
    setFile(f)
    setProducts([])
    setResult(null)
  }

  /* ================= OCR / DETECT ================= */
  const processReceipt = async () => {
    if (!file) return alert("Pilih file dulu")
    setLoading(true)

    try {
      const form = new FormData()
      form.append("file", file)

      const res = await fetch(`${HF_API}/predict-carbon`, {
        method: "POST",
        body: form,
      })

      if (!res.ok) {
        const t = await res.text()
        throw new Error(t)
      }

      const data = await res.json()

      setProducts(
        (data.detected_products || []).map((p: any) => ({
          produk: p.produk ?? p,
          berat_kg: 0,
        }))
      )
    } catch (err: any) {
      console.error("OCR ERROR:", err)
      alert("Gagal memproses struk")
    } finally {
      setLoading(false)
    }
  }

  /* ================= HITUNG & SIMPAN ================= */
  const calculateAndSave = async () => {
    if (status !== "authenticated" || !session?.user?.email) {
      alert("User belum login / session tidak valid")
      return
    }

    if (products.some((p) => p.berat_kg <= 0)) {
      alert("Isi semua berat produk")
      return
    }

    setLoading(true)

    try {
      /* ---- HITUNG KE HF ---- */
      const calcRes = await fetch(`${HF_API}/calculate-carbon`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: products }),
      })

      if (!calcRes.ok) {
        const t = await calcRes.text()
        throw new Error("HF ERROR: " + t)
      }

      const calcData = await calcRes.json()
      setResult(calcData)

      /* ---- SIMPAN KE DB (NEXTAUTH SESSION) ---- */
      const saveRes = await fetch("/api/emission", {
        method: "POST",
        credentials: "include", // 🔥 WAJIB
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          total_karbon: calcData.total_karbon,
          detail: calcData.detail,
        }),
      })

      const saveText = await saveRes.text()

      console.log("💾 SAVE STATUS:", saveRes.status)
      console.log("💾 SAVE RESPONSE:", saveText)

      if (!saveRes.ok) {
        alert("❌ GAGAL SIMPAN:\n" + saveText)
        return
      }

      alert("✅ Data emisi berhasil disimpan")
    } catch (err: any) {
      console.error("SAVE ERROR:", err)
      alert("Terjadi kesalahan saat hitung / simpan")
    } finally {
      setLoading(false)
    }
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />

      <main className="flex-1 p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* UPLOAD */}
          <Card className="p-6 text-center border-dashed border-2">
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.png"
              onChange={(e) => pickFile(e.target.files?.[0])}
            />
            <Cloud className="mx-auto mb-3" />
            <Button onClick={() => fileRef.current?.click()}>
              <Upload className="w-4 h-4 mr-2" /> Pilih File
            </Button>
          </Card>

          {/* FILE INFO */}
          {file && (
            <Card className="p-4 flex justify-between items-center">
              <span>{file.name}</span>
              <Button onClick={processReceipt} disabled={loading}>
                Proses Struk
              </Button>
            </Card>
          )}

          {/* PRODUK */}
          {products.length > 0 && (
            <Card className="p-5 space-y-3">
              <h3 className="font-bold">Produk</h3>

              {products.map((p, i) => (
                <div key={i} className="flex gap-3">
                  <span className="flex-1">{p.produk}</span>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="kg"
                    onChange={(e) => {
                      const v = Number(e.target.value)
                      setProducts((prev) => {
                        const copy = [...prev]
                        copy[i].berat_kg = v
                        return copy
                      })
                    }}
                  />
                </div>
              ))}

              <Button onClick={calculateAndSave} disabled={loading}>
                <Calculator className="w-4 h-4 mr-2" />
                Hitung & Simpan
              </Button>
            </Card>
          )}

          {/* RESULT */}
          {result && (
            <Card className="p-5">
              <p className="font-bold">
                Total Emisi: {result.total_karbon} kg CO₂e
              </p>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
