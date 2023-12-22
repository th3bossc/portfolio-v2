import type { Metadata } from 'next'
import './globals.scss'
import { Catamaran } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
const catamaran = Catamaran({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Portfolio | 2023',
  description: 'Th3BossC',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body className={catamaran.className + ' relative bg-neutral-900 overflow-x-hidden text-red-200'}>

        {children}
      </body>
    </html>
  )
}
