import * as React from 'react'
import { useState, useEffect, useCallback, useRef } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../client/components/ui/card'
import { Button } from '../../client/components/ui/button'
import { Slider } from '../../client/components/ui/slider'
import { Label } from '../../client/components/ui/label'
import { FadersHorizontal, PlayCircle, X } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { transitions } from '../../motion/transitionPresets'
import { cn } from '../../lib/utils'
import debounce from 'lodash/debounce'
import type { SpringTransition } from '../../motion/transitionPresets'
import { useMotion } from '../../motion/motion-provider'

const playgroundTransition = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
  mass: 0.5,
  opacity: {
    type: 'tween',
    duration: 0.2,
    ease: 'easeInOut',
  },
} as const

interface TransitionConfig {
  stiffness: number
  damping: number
  mass: number
}

export function TransitionPlayground() {
  const { setTransition } = useMotion()
  const [isOpen, setIsOpen] = useState(false)
  const [config, setConfig] = useState<TransitionConfig>({
    stiffness: transitions.snappy.stiffness || 200,
    damping: transitions.snappy.damping || 8,
    mass: transitions.snappy.mass || 0.2,
  })

  const debouncedUpdate = useCallback(
    (newConfig: TransitionConfig, updateTransition: typeof setTransition) => {
      const transition: SpringTransition = {
        type: 'spring',
        ...newConfig,
        opacity: {
          type: 'tween',
          duration: 0.2,
          ease: 'easeInOut',
        },
      }
      updateTransition(transition)
    },
    [],
  )

  const debouncedUpdateRef = useRef(debounce(debouncedUpdate, 300))

  const updateConfig = (updates: Partial<TransitionConfig>) => {
    const newConfig = { ...config, ...updates }
    setConfig(newConfig)
    debouncedUpdateRef.current(newConfig, setTransition)
  }

  const triggerReplay = () => {
    const transition: SpringTransition = {
      type: 'spring',
      ...config,
      opacity: {
        type: 'tween',
        duration: 0.2,
        ease: 'easeInOut',
      },
    }

    setTransition(transition)
  }

  useEffect(() => {
    const currentRef = debouncedUpdateRef.current
    return () => {
      currentRef.cancel()
    }
  }, [])

  return (
    <motion.div
      className={cn(
        'fixed bottom-12 right-5 z-50 hidden md:block',
        !isOpen && 'transition-transform hover:scale-110',
      )}
      animate={isOpen ? { scale: 1 } : { scale: 0.8 }}
      transition={playgroundTransition}
    >
      {!isOpen ? (
        <Button
          variant='outline'
          size='icon'
          iconSize='xl'
          onClick={() => setIsOpen(true)}
          className='h-12 w-12 border-muted-foreground/20 shadow-lg transition-colors hover:border-accent hover:bg-accent'
        >
          <FadersHorizontal size={32} weight='fill' />
        </Button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={playgroundTransition}
        >
          <Card className='w-80'>
            <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='select-none text-sm font-medium'>
                Transition Playground
              </CardTitle>
              <Button
                size='icon'
                variant='ghost'
                className='h-8 w-8'
                onClick={() => setIsOpen(false)}
              >
                <X size={16} />
              </Button>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <div className='flex select-none items-center justify-between'>
                  <Label className='text-sm'>Stiffness</Label>
                  <span className='text-xs text-muted-foreground'>
                    {config.stiffness}
                  </span>
                </div>
                <Slider
                  value={[config.stiffness]}
                  min={0}
                  max={1000}
                  step={10}
                  onValueChange={([value]) =>
                    updateConfig({ stiffness: value })
                  }
                />
              </div>
              <div className='space-y-2'>
                <div className='flex select-none items-center justify-between'>
                  <Label className='text-sm'>Damping</Label>
                  <span className='text-xs text-muted-foreground'>
                    {config.damping}
                  </span>
                </div>
                <Slider
                  value={[config.damping]}
                  min={0}
                  max={300}
                  step={1}
                  onValueChange={([value]) => updateConfig({ damping: value })}
                />
              </div>
              <div className='space-y-2'>
                <div className='flex select-none items-center justify-between'>
                  <Label className='text-sm'>Mass</Label>
                  <span className='text-xs text-muted-foreground'>
                    {config.mass}
                  </span>
                </div>
                <Slider
                  value={[config.mass]}
                  min={0.1}
                  max={10}
                  step={0.1}
                  onValueChange={([value]) => updateConfig({ mass: value })}
                />
              </div>
              <Button className='w-full select-none' onClick={triggerReplay}>
                <PlayCircle className='mr-2' size={16} weight='fill' />
                Replay Animations
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
