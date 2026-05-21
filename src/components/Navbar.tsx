'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CATEGORIES } from '@/lib/templates'
import { Menu, X, Sparkles } from 'lucide-react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
            <Sparkles className="w-5 h-5" />
            Greetings
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {CATEGORIES.slice(0, 5).map(cat => (
              <Link
                key={cat.value}
                href={`/templates?category=${cat.value}`}
                className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
              >
                {cat.label}
              </Link>
            ))}
            <Link
              href="/templates"
              className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
            >
              All Templates
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/editor"
              className="hidden md:flex items-center gap-1.5 bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Create Free
            </Link>
            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-3">
              {CATEGORIES.map(cat => (
                <Link
                  key={cat.value}
                  href={`/templates?category=${cat.value}`}
                  className="text-sm text-gray-600 hover:text-indigo-600"
                  onClick={() => setMobileOpen(false)}
                >
                  {cat.icon} {cat.label}
                </Link>
              ))}
              <Link
                href="/editor"
                className="text-sm font-medium text-indigo-600"
                onClick={() => setMobileOpen(false)}
              >
                ✨ Create Free
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
