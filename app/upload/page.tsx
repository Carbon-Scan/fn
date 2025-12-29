"use client"

import { useRef, useState } from "react"
import { useSession } from "next-auth/react"
import { Upload, Cloud, Calculator } from "lucide-react"

import TopBar from "@/components/top-bar"
import Card from "@/components/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const HF_API = "https://delia-ayu-nandhita-emisicarbonmodel.hf.space"

export default function UploadPage() {
  const { status } = useSession()
  const fileRef = useRef<HTMLInputElement | null>(null)

  const [file, setFile] = useState<File | null>(null)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const processReceipt = async () => {
    if (!file) return
    setLoading(true)

    const form = new FormData()
    form.append("file", file)

    const res = await fetch(`${HF_API}/predict-carbon`, {
      method: "POST",
      body: form,
    })

    const data = await res.json()
    setProducts(data.detected_products.map((p: any) => ({
      produk: p.produk ?? p,
      berat_kg: 0,
    })))

    setLoading(false)
  }

  const calculateAndSave = async () => {
    setLoading(true)

    const calc = await fetch(`${HF_API}/calculate-carbon`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: products }),
    })

    const calcData = await calc.json()

    await fetch("/api/emission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        total_karbon: calcData.total_karbon,
        detail: calcData.detail,
      }),
    })

    setLoading(false)
    alert("Data tersimpan & terakumulasi")
  }

  if (status !== "authenticated") return null

  return (
    <div className="min-h-screen p-4">
      <TopBar />

      <Card className="p-6">
        <input
          ref={fileRef}
          type="file"
          hidden
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />

        <Button onClick={() => fileRef.current?.click()}>
          <Upload className="mr-2" /> Pilih File
        </Button>

        {file && (
          <Button onClick={processReceipt} disabled={loading} className="ml-3">
            Proses
          </Button>
        )}
      </Card>

      {products.length > 0 && (
        <Card className="p-6 mt-4">
          {products.map((p, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <span className="flex-1">{p.produk}</span>
              <Input
                type="number"
                onChange={(e) => (p.berat_kg = Number(e.target.value))}
              />
            </div>
          ))}

          <Button onClick={calculateAndSave} disabled={loading}>
            <Calculator className="mr-2" /> Hitung & Simpan
          </Button>
        </Card>
      )}
    </div>
  )
}
