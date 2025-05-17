import { Outlet } from 'react-router-dom'
import { useAuth } from 'wasp/client/auth'
import { MotionConfig } from 'motion/react'
import { MotionProvider } from './motion/motion-provider'
import { ThemeProvider } from './root-components/theme-provider'
import { Footer } from './root-components/footer'
import { Nav } from './root-components/nav'
import { ScrollToTop } from './root-components/scroll-to-top'
import { Toaster } from './root-components/toaster'
import { TransitionPlayground } from './root-components/transition-playground'
import { transitions } from './motion/transitionPresets'
import './Root.css'
import '@fontsource-variable/inter'

export default function Root() {
  const { data: user, isLoading } = useAuth()

  return (
    <MotionConfig reducedMotion='user' transition={transitions.snappy}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <MotionProvider>
          <div className='flex h-screen flex-col bg-background text-foreground'>
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
