import './Root.css'
import 'highlight.js/styles/github-dark.css'
import { Outlet } from 'react-router-dom'
import '@fontsource-variable/grenze-gotisch'
import '@fontsource-variable/public-sans'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/toaster'
import { Nav } from './components/ui/nav'
import { useAuth } from 'wasp/client/auth'
import { Footer } from './components/ui/footer'
import { MotionConfig } from "motion/react"
import { ScrollToTop } from './components/ui/scroll-to-top'

export default function Root() {
  const { data: user, isLoading } = useAuth()

  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="flex flex-col h-screen">
          <header className='border-b'>
            <Nav user={user} userLoading={isLoading} />
          </header>
          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 sm:py-40">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
          <Toaster />
          <ScrollToTop />
          <footer className="border-t z-60">
            <div className="max-w-7xl mx-auto">
              <Footer />
            </div>
          </footer>
        </div>
      </ThemeProvider>
    </MotionConfig>
  )
}
