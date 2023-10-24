import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sistema de Gerenciamento de Proposta',
  description: 'Sistema para controle de suas propostas',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className='min-h-screen'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
