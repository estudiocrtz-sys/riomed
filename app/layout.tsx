import type { Metadata } from 'next'
import { ToastProvider } from '@/components/ui/ToastProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'RIOMed — Sistema de Gestão Clínica',
  description: 'Sistema premium de gestão para clínicas médicas',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="h-full antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}
