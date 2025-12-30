"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function RegisterPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [agree, setAgree] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const text = await res.text()

      let data: any
      try {
        data = JSON.parse(text)
      } catch {
        throw new Error(text || "Response backend bukan JSON")
      }

      if (!res.ok) {
        throw new Error(data.message || "Register gagal")
      }

      alert("Register berhasil, silakan login")
      router.push("/login")
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-green-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <p className="text-center text-gray-500 mb-6">
          Daftar untuk mulai menggunakan aplikasi
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={agree} onCheckedChange={(v) => setAgree(v === true)} />
            Saya setuju dengan syarat & ketentuan
          </label>

          <Button type="submit" disabled={!agree || loading} className="w-full">
            {loading ? "Memproses..." : "Daftar"}
          </Button>
        </form>

        <p className="text-center text-sm mt-6">
          Sudah punya akun?{" "}
          <Link href="/login" className="underline text-emerald-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
