import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react"
import { ArrowUp } from "@phosphor-icons/react"
import { Button } from "./button"
import { scrollToTop as scrollToTopVariant } from "./motion"
import { useState } from "react"

export function ScrollToTop() {
  const { scrollY } = useScroll()
  const [isVisible, setIsVisible] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 200) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }


  return (
    <AnimatePresence>
      {isVisible && (
      <motion.div
        className="fixed bottom-6 right-6 z-100 md:block hidden"
        variants={scrollToTopVariant}
        initial="initial"
        animate="animate"
        exit="exit"
    >
      <Button
        variant="outline"
        size="icon"
        iconSize="lg"
        onClick={scrollToTop}
        className="shadow-lg border-muted-foreground/20 hover:bg-accent hover:border-accent transition-colors"
      >
        <ArrowUp  />
        </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 
