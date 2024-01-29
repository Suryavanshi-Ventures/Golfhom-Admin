import { Inter } from 'next/font/google'
import './globals.css'
import PrivateRoute from '@/component/Protected Route/page'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Golfhom | Admin',
  description: 'Find the perfect golf vacation rentals near Florida, Arizona, Hawaii, and South Carolina. Explore our selection of luxe amenities and book your next golf getaway with Golfhom.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PrivateRoute>
          {children}
        </PrivateRoute>
      </body>
    </html>
  )
}