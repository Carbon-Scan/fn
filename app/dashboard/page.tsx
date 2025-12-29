"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import TopBar from "@/components/top-bar"
import Card from "@/components/card"

const COLORS = ["#EF4444", "#F59E0B", "#22C55E"]

export default function DashboardPage() {
  const { status } = useSession()
  const router = useRouter()

  const [totalEmisi, setTotalEmisi] = useState(0)
  const [monthlyEmissionData, setMonthlyEmissionData] = useState<any[]>([])
  const [categoryEmissionData, setCategoryEmissionData] = useState<any[]>([])

  // 🔐 PROTEKSI HALAMAN
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login")
    }
  }, [status, router])

  // 📊 FETCH DATA (NANTI SAMBUNG BACKEND)
  useEffect(() => {
    if (status !== "authenticated") return

    // sementara dummy biar UI muncul
    setTotalEmisi(1234)
    setMonthlyEmissionData([
      { month: "Jan", emisi: 120 },
      { month: "Feb", emisi: 200 },
      { month: "Mar", emisi: 150 },
    ])
    setCategoryEmissionData([
      { name: "Makanan", value: 400 },
      { name: "Transport", value: 300 },
      { name: "Listrik", value: 200 },
    ])
  }, [status])

  if (status === "loading") {
    return <div className="p-6">Loading...</div>
  }

  if (status === "unauthenticated") {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />

      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">

          <Card className="rounded-3xl p-6">
            <h3 className="text-sm mb-2">Total Emisi Bulan Ini</h3>
            <div className="text-4xl font-bold text-blue-600">
              {totalEmisi.toLocaleString()} kg CO₂
            </div>
          </Card>

          <Card className="rounded-3xl p-6">
            <h3 className="text-lg mb-4">Tren Emisi Bulanan</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyEmissionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="emisi"
                  stroke="#1A6B41"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="rounded-3xl p-6">
            <h3 className="text-lg mb-4">Emisi per Kategori</h3>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Legend />
                <Pie data={categoryEmissionData} dataKey="value" outerRadius={110}>
                  {categoryEmissionData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

        </div>
      </main>
    </div>
  )
}
