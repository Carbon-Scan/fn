"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts"

import TopBar from "@/components/top-bar"
import Card from "@/components/card"

const COLORS = ["#22C55E", "#F59E0B", "#EF4444"]

export default function DashboardPage() {
  const { status } = useSession()
  const router = useRouter()

  const [data, setData] = useState<any>(null)

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login")
    if (status !== "authenticated") return

    fetch("/api/dashboard", { credentials: "include" })
      .then((r) => r.json())
      .then(setData)
  }, [status])

  if (!data) return null

  return (
    <div className="min-h-screen p-4">
      <TopBar />

      <Card className="p-6">
        <h3>Total Emisi</h3>
        <div className="text-4xl">{data.totalEmisi} kg CO₂</div>
      </Card>

      <Card className="p-6 mt-4">
        <ResponsiveContainer height={250}>
          <LineChart data={data.monthlyEmissionData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line dataKey="emisi" stroke="#22C55E" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 mt-4">
        <ResponsiveContainer height={300}>
          <PieChart>
            <Pie data={data.categoryEmissionData} dataKey="value">
              {data.categoryEmissionData.map((_: any, i: number) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
