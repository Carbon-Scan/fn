"use client"

import { useRef, useState } from "react"
import { Upload, Cloud, Calculator } from "lucide-react"

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
  const fileRef = useRef<HTMLInputElement | null>(null)

  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [result, setResult] = useState<any>(null)

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

  // STEP 1: OCR + DETEKSI PRODUK
  const processReceipt = async () => {
    if (!file) return alert("Pilih file dulu")
    setLoading(true)

    const form = new FormData()
    form.append("file", file)

    try {
      const res = await fetch(`${HF_API}/predict-carbon`, {
        method: "POST",
        body: form,
      })

      const data = await res.json()

      setProducts(
        (data.detected_products || []).map((p: any) => ({
          produk: p.produk ?? p,
          berat_kg: 0,
        }))
      )
    } catch {
      alert("Gagal memproses struk")
    } finally {
      setLoading(false)
    }
  }

  // STEP 2: HITUNG + SIMPAN KE DB
  const calculateAndSave = async () => {
    if (products.some((p) => p.berat_kg <= 0)) {
      return alert("Isi semua berat produk")
    }

    setLoading(true)

    try {
      // hitung karbon
      const calc = await fetch(`${HF_API}/calculate-carbon`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: products }),
      })

      const calcData = await calc.json()
      setResult(calcData)

      // SIMPAN KE DATABASE (PASTI MASUK)
      await fetch("https://backend-mio8188gg-deliaayunandhitapratama21s-projects.vercel.app/api/emission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: "demo@user.com",
          total_karbon: calcData.total_karbon,
          detail: calcData.detail,
        }),
      })
    } catch (e) {
      alert("Gagal menyimpan data")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />

      <main className="flex-1 p-4">
        <div className="max-w-2xl mx-auto space-y-6">

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

          {file && (
            <Card className="p-4 flex justify-between items-center">
              <span>{file.name}</span>
              <Button onClick={processReceipt} disabled={loading}>
                Proses Struk
              </Button>
            </Card>
          )}

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

          {result && (
            <Card className="p-5">
              <p className="font-bold">
                Total Emisi: {result.total_karbon} CO₂e
              </p>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
