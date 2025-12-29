"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ChevronDown, LogOut, User } from "lucide-react"

export default function TopBar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Unggah Struk", href: "/upload" },
    { label: "Riwayat", href: "/history" },
  ]

  // ✅ LOGOUT CUSTOM (SESUAI BACKEND KAMU)
  const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("user_id")
    router.push("/login")
  }

  return (
    <header className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
        {/* LOGO */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <img src="/logo.png" alt="CarbonScan" className="w-8 h-8" />
          <span className="font-semibold text-green-700 text-lg">
            CarbonScan
          </span>
        </Link>

        {/* MENU KANAN */}
        <div className="ml-auto flex items-center gap-8">
          {/* NAV */}
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition ${
                  pathname === item.href
                    ? "text-green-700"
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* AVATAR */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2"
            >
              <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
                D
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {open && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border z-50"
                onMouseLeave={() => setOpen(false)}
              >
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-t-xl"
                >
                  <User className="w-4 h-4" />
                  Profil
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-b-xl"
                >
                  <LogOut className="w-4 h-4" />
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
