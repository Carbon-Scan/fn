"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

import TopBar from "@/components/top-bar"
import Card from "@/components/card"
import { Button } from "@/components/ui/button"

const API_BASE = process.env.NEXT_PUBLIC_API_URL!

export default function HistoryPage() {
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadPDF = async () => {
    setIsDownloading(true)

    try {
      // ambil riwayat terakhir (sementara hardcode user_id = 1)
      const listRes = await fetch(`${API_BASE}/api/riwayat/1`, {
        credentials: "include",
      })
      const riwayat = await listRes.json()

      if (!Array.isArray(riwayat) || riwayat.length === 0) {
        alert("Belum ada riwayat")
        return
      }

      const lastStrukId = riwayat[0].struk_id

      // ambil detail
      const detailRes = await fetch(
        `${API_BASE}/api/riwayat/detail/${lastStrukId}`,
        { credentials: "include" }
      )
      const data = await detailRes.json()

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // HEADER
      doc.setFontSize(16)
      doc.text("LAPORAN EMISI KARBON", 105, 20, { align: "center" })

      doc.setFontSize(10)
      doc.text(`Struk ID: ${data.struk_id}`, 14, 30)
      doc.text(
        `Tanggal: ${new Date().toLocaleDateString("id-ID")}`,
        14,
        36
      )

      // TABLE
      const tableBody = data.produk
        .filter((p: any) => p.berat_kg > 0)
        .map((p: any) => [
          p.nama,
          `${p.berat_kg} kg`,
          `${p.karbon} kg CO₂e`,
        ])

      autoTable(doc, {
        startY: 45,
        head: [["Produk", "Berat", "Emisi"]],
        body: tableBody,
        theme: "grid",
        styles: { fontSize: 10, cellPadding: 4 },
        headStyles: {
          fillColor: [0, 102, 51],
          textColor: 255,
          halign: "center",
        },
        columnStyles: {
          1: { halign: "center" },
          2: { halign: "right" },
        },
      })

      const finalY = (doc as any).lastAutoTable.finalY + 8
      doc.setFontSize(12)
      doc.text(`TOTAL EMISI: ${data.total_emisi} kg CO₂e`, 14, finalY)

      doc.save("laporan-emisi.pdf")
    } catch (err) {
      console.error(err)
      alert("Gagal membuat PDF")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      <main className="flex-1 p-4">
        <Card className="max-w-sm mx-auto mt-8">
          <div className="p-6 text-center">
            <h2 className="text-lg font-semibold mb-4">
              Download Riwayat
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              PDF berisi hasil emisi karbon terakhir
            </p>
            <Button
              onClick={downloadPDF}
              disabled={isDownloading}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              <Download className="mr-2 h-4 w-4" />
              {isDownloading ? "Membuat PDF..." : "Download PDF"}
            </Button>
          </div>
        </Card>
      </main>
    </div>
  )
}
