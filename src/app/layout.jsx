import { Roboto } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import '../styles/tailwind.css';

const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'] })

export const metadata = {
  title: 'Sistema de Gerenciamento de Proposta',
  description: 'Sistema para controle de suas propostas',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className='min-h-screen'>

      <body className={roboto.className}>
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
