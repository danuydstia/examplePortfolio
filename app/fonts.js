// app/fonts.js atau lib/fonts.js
import localFont from 'next/font/local'

export const sfProDisplay = localFont({
  src: [
    {
      path: '../public/fonts/SF-Pro-Display-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display-ThinItalic.otf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../public/fonts/SF-Pro-Display-Ultralight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display-UltralightItalic.otf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../public/fonts/SF-Pro-Display-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/fonts/SF-Pro-Display-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display-RegularItalic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/SF-Pro-Display-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/SF-Pro-Display-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display-SemiboldItalic.otf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../public/fonts/SF-Pro-Display-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../public/fonts/SF-Pro-Display-Heavy.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display-HeavyItalic.otf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../public/fonts/SF-Pro-Display-Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display-BlackItalic.otf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-sf-pro-display',
  display: 'swap',
})

// ===== CARA PENGGUNAAN =====

// 1. Di app/layout.js (App Router)
/*
import { sfProDisplay } from './fonts'

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={sfProDisplay.variable}>
      <body className={sfProDisplay.className}>
        {children}
      </body>
    </html>
  )
}
*/

// 2. Di pages/_app.js (Pages Router)
/*
import { sfProDisplay } from '@/lib/fonts'

export default function App({ Component, pageProps }) {
  return (
    <main className={sfProDisplay.className}>
      <Component {...pageProps} />
    </main>
  )
}
*/

// 3. Di tailwind.config.js (opsional, jika pakai Tailwind)
/*
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sf-pro-display)', 'system-ui', 'sans-serif'],
      },
    },
  },
}
*/

// 4. Contoh penggunaan di komponen
/*
export default function HomePage() {
  return (
    <div>
      <h1 className="font-thin">Thin (100)</h1>
      <h1 className="font-light">Light (300)</h1>
      <h1 className="font-normal">Regular (400)</h1>
      <h1 className="font-medium">Medium (500)</h1>
      <h1 className="font-semibold">Semibold (600)</h1>
      <h1 className="font-bold">Bold (700)</h1>
      <h1 className="font-extrabold">Heavy (800)</h1>
      <h1 className="font-black">Black (900)</h1>
      <p className="italic">Italic style</p>
    </div>
  )
}
*/