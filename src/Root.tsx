import './Root.css'
import { Outlet } from 'react-router-dom'
// Supports weights 100-900
import '@fontsource-variable/grenze-gotisch'
// Supports weights 100-900
import '@fontsource-variable/public-sans'
import { ThemeProvider } from './components/theme-provider'
import { MotionProvider } from './components/motion-provider'
import { Toaster } from './components/ui/toaster'
import { Nav } from './components/ui/nav'
import { useAuth } from 'wasp/client/auth'
import { Footer } from './components/ui/footer'
import { MotionConfig } from 'motion/react'
import { ScrollToTop } from './components/ui/scroll-to-top'
import { TransitionPlayground } from './components/transition-playground'
import { transitions } from './components/ui/motion'

export default function Root() {
  const { data: user, isLoading } = useAuth()

  return (
    <MotionConfig reducedMotion='user' transition={transitions.snappy}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <MotionProvider>
          <div className='flex h-screen flex-col'>
            <header className='border-b'>
              <Nav user={user} userLoading={isLoading} />
            </header>
            <main className='flex-1 px-4 py-12 sm:px-6 sm:py-40 lg:px-8'>
              <div className='mx-auto max-w-7xl'>
                <Outlet />
              </div>
            </main>
            <Toaster />
            <ScrollToTop />
            <footer className='relative z-50 border-t border-input bg-background'>
              <div className='relative z-50 mx-auto max-w-7xl'>
                <Footer />
              </div>
            </footer>
            <TransitionPlayground />
          </div>
        </MotionProvider>
      </ThemeProvider>
    </MotionConfig>
  )
}
