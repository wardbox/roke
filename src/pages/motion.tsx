import { motion, AnimatePresence } from "motion/react"
import { ArrowsClockwise, Spinner } from "@phosphor-icons/react"
import { Button } from "../components/ui/button"
import { CodeBlock } from "../components/ui/code-block"
import * as animations from "../components/ui/motion"
import { useEffect } from "react"
import { useState } from "react"
import { ModeToggle } from "../components/mode-toggle"
import TypingAnimation from "../components/ui/typing-animation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { fadeIn, slideInUp, staggerContainer, staggerItem, hoverScale, spinner } from "../components/ui/motion"

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

function AnimationExample({
  title,
  description,
  code,
  children
}: {
  title: string
  description: string
  code: string
  children: React.ReactNode
}) {
  const [key, setKey] = useState(0)

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="relative p-6 rounded-lg border bg-card">
        <ReplayButton onClick={() => setKey(prev => prev + 1)} />
        <div className="flex items-center justify-center min-h-[100px]" key={key}>
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </div>
      </div>
      <CodeBlock language="typescript" code={code} />
    </div>
  )
}


export default function MotionExamples() {
  return (
    <motion.div
      variants={animations.staggerContainer}
      initial="initial"
      animate="animate"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
    >
      {/* Header */}
      <motion.div
        variants={animations.fadeIn}
        className="space-y-4 mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Animation Examples
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A collection of reusable animations built with Motion. Click the replay button to see each animation again.
        </p>
      </motion.div>

      {/* Basic Transitions */}
      <div className="space-y-12">
        <h2 className="text-3xl font-semibold">Basic Transitions</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <AnimationExample
            title="Fade In"
            description="A simple fade in animation."
            code={`const fadeIn = ${JSON.stringify(animations.fadeIn, null, 2)}`}
          >
            <motion.div
              variants={animations.fadeIn}
              className="p-8 bg-muted rounded-lg"
            >
              Fade In Content
            </motion.div>
          </AnimationExample>

          <AnimationExample
            title="Slide In Up"
            description="Content that slides up while fading in."
            code={`const slideInUp = ${JSON.stringify(animations.slideInUp, null, 2)}`}
          >
            <motion.div
              variants={animations.slideInUp}
              className="p-8 bg-muted rounded-lg"
            >
              Slide Up Content
            </motion.div>
          </AnimationExample>
        </div>
      </div>

      {/* List Animations */}
      <motion.div variants={animations.fadeIn} className="space-y-12 mt-16">
        <h2 className="text-3xl font-semibold">List Animations</h2>
        <AnimationExample
          title="Staggered List"
          description="List items that animate in sequence."
          code={`const staggerContainer = ${JSON.stringify(animations.staggerContainer, null, 2)}
const staggerItem = ${JSON.stringify(animations.staggerItem, null, 2)}`}
        >
          <motion.ol
            variants={animations.staggerContainer}
            initial="hidden"
            whileInView="show"
            className="space-y-2 w-full"
          >
            {[1, 2, 3].map((item) => (
              <motion.li
                key={item}
                variants={animations.staggerItem}
                className="p-4 bg-muted rounded-lg"
              >
                List Item {item}
              </motion.li>
            ))}
          </motion.ol>
        </AnimationExample>
      </motion.div>

      {/* Theme Toggle */}
      <motion.div variants={animations.fadeIn} className="space-y-12 mt-16">
        <h2 className="text-3xl font-semibold">Theme Toggle</h2>
        <AnimationExample
          title="Theme Switch Animation"
          description="Smooth transition between light and dark mode icons."
          code={`const darkMode = ${JSON.stringify(animations.darkMode, null, 2)}
const lightMode = ${JSON.stringify(animations.lightMode, null, 2)}`}
        >
          <ModeToggle iconSize="lg" />
        </AnimationExample>
      </motion.div>

      {/* Hover Effects */}
      <motion.div variants={animations.fadeIn} className="space-y-12 mt-16">
        <h2 className="text-3xl font-semibold">Hover Effects</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <AnimationExample
            title="Scale"
            description="Simple scale effect on hover and tap."
            code={`const hoverScale = ${JSON.stringify(animations.hoverScale, null, 2)}`}
          >
            <motion.div
              className="p-8 bg-muted rounded-lg cursor-pointer select-none"
              variants={animations.hoverScale}
              whileHover="whileHover"
              whileTap="whileTap"
            >
              Hover Me
            </motion.div>
          </AnimationExample>

          <AnimationExample
            title="Tilt"
            description="Playful tilt animation on hover."
            code={`const hoverTilt = ${JSON.stringify(animations.hoverTilt, null, 2)}`}
          >
            <motion.div
              className="p-8 bg-muted rounded-lg cursor-pointer select-none"
              whileHover="whileHover"
              variants={animations.hoverTilt}
            >
              Hover to Tilt
            </motion.div>
          </AnimationExample>
        </div>
      </motion.div>

      {/* Loading Spinner */}
      <motion.div variants={animations.fadeIn} className="space-y-12 mt-16">
        <h2 className="text-3xl font-semibold">Loading Animations</h2>
        <AnimationExample
          title="Spinner"
          description="Smooth spinning animation that slows to stop."
          code={`const spinner = ${JSON.stringify(animations.spinner, null, 2)}`}
        >
          <motion.div
            variants={animations.spinner}
            animate="animate"
          >
            <Spinner size={64} weight="bold" />
          </motion.div>
        </AnimationExample>
      </motion.div>

      {/* Text Animation */}
      <motion.div variants={animations.fadeIn} className="space-y-12 mt-16">
        <h2 className="text-3xl font-semibold">Text Animation</h2>
        <AnimationExample
          title="Letter by Letter"
          description="Reveals text one character at a time."
          code={`const textContainer = ${JSON.stringify(animations.textContainer, null, 2)}
const textChild = ${JSON.stringify(animations.textChild, null, 2)}`}
        >
          <TypingAnimation
            texts={[
              "Hello! I'm a web page typing to you!",
              "I hope you're having a great day!",
              "Da boi prevails."
            ]}
            typingSpeed={{ min: Math.random() * (0.09 - 0.05) + 0.05, max: Math.random() * (0.09 - 0.05) + 0.09 }}
            pauseBetweenTexts={Math.random() * (2 - 1) + 1}
            className="text-4xl font-bold"
          />
        </AnimationExample>
      </motion.div>

      {/* Usage Guide */}
      <motion.div variants={animations.fadeIn} className="mt-24 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Usage Guide</h2>
        <p className="text-sm text-muted-foreground">
          Import animations from the motion file and use them with Motion components.
        </p>

        <Tabs defaultValue="example" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="code" className="mt-4">
            <CodeBlock
              language="typescript"
              code={`import { motion, AnimatePresence } from "motion/react"
import { fadeIn, slideInUp, staggerContainer, staggerItem, 
         hoverScale, spinner } from "../components/ui/motion"

export function ProductGrid({ products, isLoading }) {
  return (
        <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="mb-8"
      >
        <h1 className="text-4xl font-bold">Our Products</h1>
        <p className="text-muted-foreground">Find something you'll love.</p>
      </motion.div>

      {isLoading && (
        <AnimatePresence mode="wait">
          <motion.div
            variants={spinner}
            animate="animate"
            className="flex justify-center py-12"
          >
            <Spinner size={64} weight="bold" />
          </motion.div>
        </AnimatePresence>
      )}

      {!isLoading && (
      <AnimatePresence mode="wait">
        <motion.div
          variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={staggerItem}
                className="group relative rounded-lg overflow-hidden bg-card"
              >
                <div className="w-full h-64 bg-muted rounded-lg"></div>
                <div className="p-4">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-muted-foreground">{product.price}</p>
                </div>
              </motion.div>
            ))}
        </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}`}
            />
          </TabsContent>

          <TabsContent value="preview" className="mt-4">
            <PreviewExample />
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}


const products = [
  { id: 1, name: "Product 1", price: "$10", image: "https://via.placeholder.com/300" },
  { id: 2, name: "Product 2", price: "$20", image: "https://via.placeholder.com/300" },
  { id: 3, name: "Product 3", price: "$30", image: "https://via.placeholder.com/300" }
]

function PreviewExample() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="mb-8"
      >
        <h1 className="text-4xl font-bold">Our Products</h1>
        <p className="text-muted-foreground">Find something you'll love.</p>
      </motion.div>

      {isLoading && (
        <AnimatePresence mode="wait">
          <motion.div
            variants={spinner}
            animate="animate"
            className="flex justify-center py-12"
          >
            <Spinner size={64} weight="bold" />
          </motion.div>
        </AnimatePresence>
      )}

      {!isLoading && (
        <AnimatePresence mode="wait">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={staggerItem}
                className="group relative rounded-lg overflow-hidden bg-card"
              >
                <div className="w-full h-64 bg-muted rounded-lg"></div>
                <div className="p-4">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-muted-foreground">{product.price}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
