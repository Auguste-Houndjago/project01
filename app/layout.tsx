import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

import Navbar from '@/components/navbar'
import { AuthProvider } from './contexts/AuthContext'
import PlayerProvider from './contexts/PlayersContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Football Club Management',
  description: 'Application de gestion de clubs de football',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <PlayerProvider>
            <div className="min-h-screen bg-background">
              <Navbar />
              <main className="container mx-auto px-4 py-8">
                {children}
              </main>
            </div>
            <Toaster />
            </PlayerProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}