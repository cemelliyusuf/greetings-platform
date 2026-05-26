'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter, Link } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import { CATEGORIES } from '@/lib/templates'
import { Menu, X, Sparkles } from 'lucide-react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const t = useTranslations('nav')
  const tc = useTranslations('categories')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (next: string) => {
    router.replace(pathname, { locale: next })
  }

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
                {tc(cat.value as Parameters<typeof tc>[0])}
              </Link>
            ))}
            <Link href="/templates" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
              {t('allTemplates')}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="hidden md:flex items-center gap-1 text-sm border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => switchLocale('en')}
                className={`px-2.5 py-1.5 transition-colors ${locale === 'en' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                EN
              </button>
              <button
                onClick={() => switchLocale('nl')}
                className={`px-2.5 py-1.5 transition-colors ${locale === 'nl' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                NL
              </button>
            </div>
            <Link
              href="/editor"
              className="hidden md:flex items-center gap-1.5 bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {t('createFree')}
            </Link>
            <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
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
                  {cat.icon} {tc(cat.value as Parameters<typeof tc>[0])}
                </Link>
              ))}
              <Link href="/editor" className="text-sm font-medium text-indigo-600" onClick={() => setMobileOpen(false)}>
                ✨ {t('createFree')}
              </Link>
              {/* Mobile language switcher */}
              <div className="flex gap-2 pt-2 border-t">
                <button onClick={() => switchLocale('en')} className={`px-3 py-1.5 rounded text-sm border ${locale === 'en' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-200 text-gray-600'}`}>EN</button>
                <button onClick={() => switchLocale('nl')} className={`px-3 py-1.5 rounded text-sm border ${locale === 'nl' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-200 text-gray-600'}`}>NL</button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
