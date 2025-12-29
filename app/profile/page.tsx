"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { User, Eye, EyeOff } from "lucide-react"

import TopBar from "@/components/top-bar"
import Card from "@/components/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  /* ================= HOOKS ================= */
  const { data: session, status } = useSession()

  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const email = session?.user?.email || "-"
  const avatar =
    session?.user?.image ||
    "https://api.dicebear.com/7.x/avataaars/svg?seed=user"

  // Nama default dari email
  const displayName =
    email !== "-" ? email.split("@")[0] : "Pengguna"

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    if (!session?.accessToken) return

    fetch("/api/me", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.name) setUsername(data.name)
      })
      .catch(() => {
        console.error("Gagal mengambil profil")
      })
  }, [session])

  /* ================= CONDITIONAL ================= */
  if (status === "loading") {
    return <p className="p-4 text-center">Memuat...</p>
  }

  if (!session) {
    if (typeof window !== "undefined") {
      window.location.href = "/login"
    }
    return null
  }

  /* ================= HANDLERS ================= */
  const handleSave = async () => {
    await fetch("/api/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({ name: username, password }),
    })

    setIsEditing(false)
    setPassword("")
    setShowPassword(false)
  }

  const handleCancel = () => {
    setUsername(displayName)
    setPassword("")
    setShowPassword(false)
    setIsEditing(false)
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />

      <main className="flex-1 p-4 max-w-3xl mx-auto w-full space-y-4">
        <Card className="bg-card rounded-3xl shadow-md p-6 border border-border/50">
          {/* HEADER */}
          <div className="flex flex-col items-center text-center mb-6">
            <Avatar className="w-24 h-24 mb-4 border-4 border-background shadow-lg">
              <AvatarImage src={avatar} />
              <AvatarFallback>
                <User className="w-12 h-12" />
              </AvatarFallback>
            </Avatar>

            <h2 className="text-xl font-bold">{username || displayName}</h2>
            <p className="text-muted-foreground">{email}</p>
          </div>

          {/* FORM */}
          <div className="space-y-5">
            {/* USERNAME */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={!isEditing}
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input value={email} disabled />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  disabled={!isEditing}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isEditing ? "Password baru" : "••••••••"}
                  className="pr-10"
                />
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* ACTION BUTTONS */}
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="w-full rounded-full">
            Edit Profil
          </Button>
        ) : (
          <>
            <Button onClick={handleSave} className="w-full rounded-full">
              Simpan Profil
            </Button>
            <Button
              onClick={handleCancel}
              variant="secondary"
              className="w-full rounded-full"
            >
              Batal
            </Button>
          </>
        )}
      </main>
    </div>
  )
}
