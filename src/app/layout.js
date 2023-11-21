import { Fira_Sans } from 'next/font/google'
import './globals.css'

import { ReduxProvider } from '@store/provider';
import { GetSession } from '@store/get-session';

const fira = Fira_Sans({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    display: 'swap',
  });

export const metadata = {
  title: 'ProbaUAM',
  description: 'ProbaUAM - Universidad Autónoma de Manizales',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body style={{
          width: '100%',
            height: '100%',
            padding: '0',
            margin: '0',
            backgroundColor: '#EDEDED',

      }} className={fira.className}>
        <ReduxProvider>
          <GetSession>
            {children}
          </GetSession>
        </ReduxProvider>
      </body>
    </html>
  )
}
