import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Greetings Platform — Free Invitation & Card Maker',
  description: 'Create beautiful invitations and greeting cards for any occasion.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col bg-white`}>
        {children}
      </body>
    </html>
  )
}
