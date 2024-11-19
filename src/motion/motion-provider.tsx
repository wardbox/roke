import { createContext, useContext, useState } from 'react'
import { defaultTransition } from './config'
import type { SpringTransition } from './transitionPresets'
import { MotionConfig } from 'motion/react'

type MotionProviderProps = {
  children: React.ReactNode
  defaultTransition?: SpringTransition
}

type MotionProviderState = {
  transition: SpringTransition
  setTransition: (transition: SpringTransition) => void
  key: number
}

const MotionProviderContext = createContext<MotionProviderState>({
  transition: defaultTransition,
  setTransition: () => null,
  key: 0,
})

export function MotionProvider({
  children,
  defaultTransition: customDefault = defaultTransition,
}: MotionProviderProps) {
  const [transition, setTransition] = useState<SpringTransition>(customDefault)
  const [key, setKey] = useState(0)

  const updateTransitionAndReplay = (newTransition: SpringTransition) => {
    setTransition(newTransition)
    setKey(prev => prev + 1)
  }

  return (
    <MotionProviderContext.Provider
      value={{
        transition,
        setTransition: updateTransitionAndReplay,
        key,
      }}
    >
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </MotionProviderContext.Provider>
  )
}

export const useMotion = () => {
  const context = useContext(MotionProviderContext)
  if (!context) {
    throw new Error('useMotion must be used within a MotionProvider')
  }
  return context
}
