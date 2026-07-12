import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'موبايلك حمص - متجر الهواتف الذكية',
  description: 'أفضل متجر لبيع الهواتف الذكية والإكسسوارات في حمص',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-cairo antialiased">
        {children}
      </body>
    </html>
  )
}
