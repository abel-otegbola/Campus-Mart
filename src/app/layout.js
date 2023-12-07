import Navbar from './components/navbar/page'
import './globals.css'
import { Nunito_Sans } from 'next/font/google'

const nunito = Nunito_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'Campus Mart',
  description: 'Ecommerce marketplace for students.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className + " dark:bg-black bg-white dark:text-white text-[14px]"}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
