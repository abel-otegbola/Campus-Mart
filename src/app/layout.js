import './globals.css'
import { Public_Sans } from 'next/font/google'

const public_sans = Public_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'OAU Marketplace',
  description: 'Ecommerce marketplace for oau students to connect buyers and sellers.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={public_sans.className}>{children}</body>
    </html>
  )
}
