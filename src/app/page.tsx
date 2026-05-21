import Link from 'next/link'
import { CATEGORIES, SAMPLE_TEMPLATES } from '@/lib/templates'
import TemplateCard from '@/components/gallery/TemplateCard'
import { ArrowRight, Download, Palette, Share2 } from 'lucide-react'

export default function HomePage() {
  const featured = SAMPLE_TEMPLATES.slice(0, 6)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Beautiful Invitations &{' '}
            <span className="text-indigo-600">Greeting Cards</span>
            <br />for Every Occasion
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Design stunning cards in minutes. Choose from thousands of free templates,
            customize with your details, and share instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-colors"
            >
              Browse Templates
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-indigo-400 hover:text-indigo-600 transition-colors"
            >
              Start from Scratch
            </Link>
          </div>
        </div>
      </section>

      {/* Category grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse by Occasion</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.value}
              href={`/templates?category=${cat.value}`}
              className="flex flex-col items-center gap-2 p-6 rounded-2xl border border-gray-100 bg-white hover:border-indigo-200 hover:shadow-md transition-all group"
            >
              <span className="text-4xl">{cat.icon}</span>
              <span className="font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured templates */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Popular Templates</h2>
          <Link
            href="/templates"
            className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {featured.map(template => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center">
                <Palette className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-lg">1. Choose & Customize</h3>
              <p className="text-gray-600 text-sm">
                Pick a template and make it yours — change text, colors, fonts, and add photos.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center">
                <Share2 className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg">2. Share Digitally</h3>
              <p className="text-gray-600 text-sm">
                Send via email, text, WhatsApp or post to social media instantly.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                <Download className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg">3. Download or Print</h3>
              <p className="text-gray-600 text-sm">
                Download as PNG or PDF. Print at home or at your local print shop.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
