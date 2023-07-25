import Footer from '@/components/footer'
import './globals.css'
import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import Navbar from '@/components/navbar'
import ModalProvider from '@/providers/modal-provider'
import ToastProvider from '@/providers/toast-provider'
import { ThemeProvider } from '@/providers/theme-provider'

const font = Urbanist({ subsets: ['latin'] })
const name = process.env.STORE_NAME

export const metadata: Metadata = {
  title: name,
  description: 'Fashion Store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider attribute='class' 
        defaultTheme='system' enableSystem>
        <ModalProvider />
        <ToastProvider />
        <Navbar />
        {children}
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  )
}
