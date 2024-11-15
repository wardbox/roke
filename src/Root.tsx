import './Root.css'
import 'prismjs/themes/prism-tomorrow.css'
import { Outlet } from 'react-router-dom'
import '@fontsource-variable/grenze-gotisch'
import '@fontsource-variable/public-sans'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/toaster'
import { Nav } from './components/ui/nav'
import { useAuth } from 'wasp/client/auth'
import { Footer } from './components/ui/footer'
import { MotionConfig } from 'motion/react'
import { ScrollToTop } from './components/ui/scroll-to-top'

export default function Root() {
  const { data: user, isLoading } = useAuth()

  return (
    <MotionConfig reducedMotion='user'>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
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
          <footer className='z-60 border-t'>
            <div className='mx-auto max-w-7xl'>
              <Footer />
            </div>
          </footer>
        </div>
      </ThemeProvider>
    </MotionConfig>
  )
}
