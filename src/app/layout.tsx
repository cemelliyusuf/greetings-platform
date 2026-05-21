import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Greetings Platform — Free Invitation & Card Maker',
  description: 'Create beautiful invitations and greeting cards for any occasion. Free templates for birthdays, weddings, baby showers, and more.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col bg-white`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="bg-gray-50 border-t py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
            <p>© 2025 Greetings Platform. Free invitation and card maker.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
