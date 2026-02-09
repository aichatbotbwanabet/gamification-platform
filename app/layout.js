import './globals.css'

export const metadata = {
  title: '100xBet Rewards - Gamification Platform',
  description: 'Play games, complete missions, and win amazing rewards!',
  keywords: ['betting', 'rewards', 'games', 'missions', 'gamification'],
  authors: [{ name: '100xBet' }],
  openGraph: {
    title: '100xBet Rewards',
    description: 'Play games, complete missions, and win amazing rewards!',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/coin.png" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
