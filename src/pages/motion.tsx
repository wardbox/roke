import { motion } from "framer-motion"
import { fadeIn, fadeInUp, staggerContainer, listItemVariant } from "../components/ui/motion"
import { CodeBlock } from "../components/ui/code-block"
import { Button } from "../components/ui/button"
import { ArrowsClockwise } from "@phosphor-icons/react"
import { useAnimationControls } from "motion/react"

function ReplayButton({ onClick }: { onClick: () => void }) {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={onClick}
      className="absolute top-2 right-2"
    >
      <ArrowsClockwise size={24} />
    </Button>
  )
}

export default function MotionExamples() {
  const fadeControls = useAnimationControls()
  const cardControls = useAnimationControls()
  const staggerControls = useAnimationControls()
  const listControls = useAnimationControls()
  const motionDivControls = useAnimationControls()

  const replayFade = async () => {
    await fadeControls.start("initial")
    fadeControls.start("animate")
  }

  const replayCard = async () => {
    await cardControls.start("initial")
    cardControls.start("animate")
  }

  const replayStagger = async () => {
    await staggerControls.start("initial")
    staggerControls.start("animate")
  }

  const replayMotionDiv = async () => {
    await motionDivControls.start("initial")
    motionDivControls.start("animate")
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
    >
      {/* Header Section */}
      <motion.div
        variants={fadeInUp}
        transition={{ duration: 0.4 }}
        className="space-y-4 mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Motion Components
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Accessible animation components built on Framer Motion. These components automatically disable animations when reduced motion is enabled.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Basic Components Section */}
        <motion.div variants={fadeIn} className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Basic Components</h2>
            <p className="text-sm text-muted-foreground">
              Motion-enabled components that respect user preferences. Use these as drop-in replacements for their HTML counterparts.
            </p>
          </div>

          <div className="space-y-4">
            <motion.div
              animate={motionDivControls}
              variants={listItemVariant}
              className="p-4 rounded-lg border bg-card relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ReplayButton onClick={replayMotionDiv} />
              <code className="text-sm">{'<motion.div />'}</code>
              <p className="text-sm text-muted-foreground mt-2">
                The main container component. Use this for any div that needs animation capabilities.
                Supports all Framer Motion props including hover and tap animations.
              </p>
            </motion.div>

            <div className="p-4 rounded-lg border bg-card relative">
              <code className="text-sm">{'<MotionLi />'}</code>
              <p className="text-sm text-muted-foreground mt-2">
                Specialized component for list items. Perfect for animated lists and menus.
              </p>
              <ul className="mt-4 space-y-2">
                <motion.li
                  animate={listControls}
                  variants={listItemVariant}
                  className="p-2 rounded bg-muted"
                  whileHover={{ x: 8 }}
                >
                  Hover to see the animation →
                </motion.li>
                <motion.li
                  animate={listControls}
                  variants={listItemVariant}
                  className="p-2 rounded bg-muted"
                  whileHover={{ x: 8 }}
                >
                  Great for navigation items →
                </motion.li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Animation Variants Section */}
        <motion.div variants={fadeIn} className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Animation Variants</h2>
            <p className="text-sm text-muted-foreground">
              Pre-built animations that can be customized with different durations and timing functions.
              Click the refresh button to replay each animation.
            </p>
          </div>

          <div className="space-y-4">
            <motion.div
              animate={fadeControls}
              variants={fadeIn}
              className="p-4 rounded-lg border bg-card relative"
            >
              <ReplayButton onClick={replayFade} />
              <code className="text-sm">fadeIn</code>
              <p className="text-sm text-muted-foreground mt-2">
                A subtle fade-in animation with a small upward movement. Duration: 0.5s
              </p>
            </motion.div>

            <motion.div
              animate={cardControls}
              variants={fadeInUp}
              className="p-4 rounded-lg border bg-card relative"
            >
              <ReplayButton onClick={replayCard} />
              <code className="text-sm">fadeInUp</code>
              <p className="text-sm text-muted-foreground mt-2">
                A quick fade-in that slides up. Default duration: 0.2s. Can be customized with a transition prop.
              </p>
            </motion.div>

            <div className="p-4 rounded-lg border bg-card relative">
              <ReplayButton onClick={replayStagger} />
              <code className="text-sm">staggerContainer</code>
              <p className="text-sm text-muted-foreground mt-2">
                Animates children sequentially with a 0.1s delay between each. Wrap this around other motion components.
              </p>
              <motion.div
                animate={staggerControls}
                variants={staggerContainer}
                initial="initial"
                className="mt-4 space-y-2"
              >
                <motion.div 
                  variants={fadeInUp}
                  className="p-2 rounded bg-muted"
                >
                  First child animates
                </motion.div>
                <motion.div 
                  variants={fadeInUp}
                  className="p-2 rounded bg-muted"
                >
                  Then this one
                </motion.div>
                <motion.div 
                  variants={fadeInUp}
                  className="p-2 rounded bg-muted"
                >
                  And finally this one
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Usage Example Section */}
      <motion.div variants={fadeIn} className="mt-16 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Usage Example</h2>
        <p className="text-sm text-muted-foreground">
          Import the components and variants you need, then combine them to create animated layouts.
          All animations automatically disable when the user has reduced motion enabled.
        </p>
        <CodeBlock 
          language="typescript" 
          code={`import { motion } from "framer-motion"

export function MyComponent() {
  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
      <motion.div variants={fadeInUp}>
        This will animate with a fade-up effect
      </motion.div>
    </motion.div>
  )
}`} 
        />
      </motion.div>
    </motion.div>
  )
}
