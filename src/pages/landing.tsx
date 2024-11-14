import React from "react"
import { motion } from "motion/react"
import { fadeIn, staggerContainer, staggerItem } from "../components/ui/motion"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { CodeBlock } from "../components/ui/code-block"
import {
  FolderSimple,
  Lightning,
  Wrench,
  Books,
  ArrowBendUpLeft,
  Lightbulb,
  Mountains
} from "@phosphor-icons/react"

const ListSection = ({ icon: Icon, title, items }: { icon: any, title: string, items: string[] }) => (
  <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
    <div className="flex items-center gap-3 mb-8">
      <Icon size={20} weight="bold" className="text-brand-accent" />
      <motion.div variants={fadeIn} className="text-2xl font-medium tracking-tight">
        {title}
      </motion.div>
    </div>
    <motion.ul variants={staggerContainer} initial="hidden" animate="show" className="space-y-4 text-foreground/90 text-lg">
      {items.map((item, i) => (
        <motion.li key={i} variants={staggerItem}>
          {item}
        </motion.li>
      ))}
    </motion.ul>
  </motion.div>
)

export default function Landing() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex flex-col space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
    >
      <motion.div
        variants={fadeIn}
        className="space-y-4"
      >
        <h1 className="text-9xl sm:text-[10rem] lg:text-[12rem] flex gap-4">
          <span className="medieval">
            {import.meta.env.REACT_APP_NAME}
          </span>
          <span className="hidden sm:block text-base font-light text-muted-foreground tracking-normal -rotate-12 translate-y-12 text-pretty">
            <ArrowBendUpLeft className="inline-block mr-1" size={16} weight="bold" />
            Customize this title in <code>.env.client</code>!
          </span>
        </h1>
        <p className="text-2xl sm:text-3xl text-foreground/90 max-w-2xl font-extralight leading-relaxed">
          A <a href="https://wasp-lang.dev" target="_blank" className="underline">Wasp</a> starter with sensible defaults
        </p>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
        <div className="lg:col-span-2 space-y-16">
          {/* Quick Start */}
          <motion.div variants={fadeIn}>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <CardTitle className="text-4xl font-medium tracking-tight">
                    Quick Start
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="">
                <div className="flex flex-col gap-12 text-lg">
                  <div className="space-y-4">
                    <p className="font-medium">1. Set your app name in <code>.env.client</code></p>
                    <CodeBlock
                      code={`REACT_APP_NAME="App Name"`}
                      variant="compact"
                    />
                  </div>
                  <div className="space-y-4">
                    <p className="font-medium">2. Start developing:</p>
                    <CodeBlock
                      code={`wasp db start
wasp db migrate-dev
wasp start`}
                      variant="compact"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground border-t pt-4 mt-4 text-pretty">
                    <Lightbulb size={16} weight="fill" className=" text-brand-primary inline-block mr-1" />
                    Tip: After installing new shadcn components, run <code>npm run fix-shadcn</code> to fix import paths
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          {/* Core Features */}
          <div className="space-y-16">
            <motion.div variants={fadeIn}>
              <h2 className="text-5xl font-medium tracking-tight mb-16">Everything you need</h2>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-12"
            >
              <motion.div variants={fadeIn}>
                <Card className="h-full">
                  <CardHeader className="pb-6">
                    <div className="flex items-center gap-3">
                      <FolderSimple size={24} className="text-brand-primary" />
                      <CardTitle className="text-3xl font-medium tracking-tight">
                        Project Structure
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      code={`src/
├── auth/                 # Auth UI and configuration
├── components/
│   ├── ui/              # shadcn/ui + custom common components
├── lib/                 # Utility functions
│   └── utils.ts
├── pages/              # Pages that you route to
│   ├── landing.tsx
│   ├── profile.tsx
│   └── example/
│       └── example.tsx
│       └── operations.ts # Operations for this page
└── Root.tsx           # App root component with nav and footer`}
                      variant="compact"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Right column - Tools & Resources */}
        <div className="space-y-16">
          <div className="space-y-24">
            <ListSection
              icon={Lightning}
              title="Features"
              items={[
                "Wired up for shadcn/ui",
                "Theme switcher",
                "Mobile first design",
                "Common motion components",
                "Toaster included"
              ]}
            />

            <ListSection
              icon={Wrench}
              title="Development Tools"
              items={[
                "shadcn/ui",
                "Framer Motion",
                "Tailwind CSS"
              ]}
            />
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
              <div className="flex items-center gap-3 mb-8">
                <Books size={20} weight="bold" className="text-brand-accent" />
                <motion.div variants={fadeIn} className="text-2xl font-medium tracking-tight">
                  Resources
                </motion.div>
              </div>
              <ul className="space-y-4">
                {[
                  { href: "https://wasp-lang.dev/docs", text: "Wasp →" },
                  { href: "https://ui.shadcn.com/docs", text: "shadcn/ui →" },
                  { href: "https://tailwindcss.com/docs/installation", text: "Tailwind CSS →" },
                  { href: "https://www.framer.com/motion/", text: "Framer Motion →" }
                ].map((link, i) => (
                  <motion.li key={i} variants={fadeIn}>
                    <a href={link.href} target="_blank" className="text-lg text-foreground/90 hover:text-foreground transition-colors">
                      {link.text}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
