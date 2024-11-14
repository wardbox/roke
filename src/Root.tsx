import './Root.css'
import { Outlet } from 'react-router-dom'
import '@fontsource-variable/grenze-gotisch'
import '@fontsource-variable/public-sans'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/toaster'
import { Nav } from './components/ui/nav'
import { useAuth } from 'wasp/client/auth'
import { Footer } from './components/ui/footer'
import { MotionConfig, useReducedMotion } from "motion/react"
import { ScrollToTop } from './components/ui/scroll-to-top'

export default function Root() {
  const { data: user, isLoading } = useAuth()
  const shouldReduceMotion = useReducedMotion()

  return (
    <MotionConfig reducedMotion={shouldReduceMotion ? "always" : "user"}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="flex flex-col h-screen">
          <header className='border-b'>
            <Nav user={user} userLoading={isLoading} />
          </header>
          <main className="mb-auto p-12 w-full max-w-7xl mx-auto">
            <Outlet />
          </main>
          <Toaster />
          <ScrollToTop />
          <footer className="flex justify-center p-3 border-t z-60">
            <Footer />
          </footer>
        </div>
      </ThemeProvider>
    </MotionConfig>
  )
}
