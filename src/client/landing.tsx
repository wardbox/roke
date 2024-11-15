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
} from "@phosphor-icons/react"
import daBoi from "../static/da-boi.webp"
import motionLogo from "../static/motion.png"
import tailwindLogo from "../static/tailwind.svg"

type ListItem = string | { href: string; text: string };

const ListSection = ({
  icon: Icon,
  title,
  items
}: {
  icon: any;
  title: string;
  items: ListItem[];
}) => (
  <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
    <div className="flex items-center gap-3 mb-8">
      <Icon size={32} weight="fill" className="text-brand-accent" />
      <motion.div variants={fadeIn} className="text-2xl font-medium tracking-tight">
        {title}
      </motion.div>
    </div>
    <motion.ul variants={staggerContainer} initial="hidden" animate="show" className="space-y-4 text-foreground/90 text-lg">
      {items.map((item, i) => (
        <motion.li key={i} variants={staggerItem} whileHover={{ x: 5 }}>
          {typeof item === 'string' ? (
            item
          ) : (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.text}
            </a>
          )}
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
      className="space-y-24"
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
            <ArrowBendUpLeft className="inline-block mr-1" size={16} weight="fill" />
            Customize this title in <code>.env.client</code>!
          </span>
        </h1>
        <p className="text-2xl sm:text-3xl text-foreground/90 max-w-2xl font-extralight leading-relaxed">
          A <a href="https://wasp-lang.dev" target="_blank" className="underline">Wasp</a> starter with sensible defaults
        </p>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
        <div className="lg:col-span-2 space-y-32">
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
          {/* Powered by */}
          <div className="flex flex-col">
            <motion.div variants={fadeIn}>
              <h2 className="text-5xl font-medium tracking-tight mb-16">Powered by</h2>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="flex gap-8 justify-center"
            >
              <motion.img variants={staggerItem} src={daBoi} alt="da boi" width={100} />
              <motion.img variants={staggerItem} src={motionLogo} alt="motion" width={100} />
              <motion.img variants={staggerItem} src={tailwindLogo} alt="tailwind" width={100} className="text-foreground" />
            </motion.div>
          </div>
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
                      <FolderSimple size={32} weight="fill" className="text-brand-primary" />
                      <CardTitle className="text-3xl font-medium tracking-tight">
                        Project Structure
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      code={`src/
├── auth/                 # Authentication components and config
├── components/
│   ├── ui/              # shadcn/ui + custom components
├── lib/                 # Utility functions
│   └── utils.ts         # Common utilities
├── client/              # Application pages
│   ├── landing.tsx     # Landing page
│   └── example/        # Example features
│       ├── example.tsx
      └── operations.ts
└── Root.tsx           # App root with navigation`}
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
                "Theme toggle and Toaster included",
                "Mobile first design",
                "Common use case motion variants",
                "Utility functions"
              ]}
            />
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
              <ListSection
                icon={Books}
                title="Resources"
                items={[
                  { href: "https://wasp-lang.dev/docs", text: "Wasp →" },
                  { href: "https://ui.shadcn.com/docs", text: "shadcn/ui →" },
                  { href: "https://tailwindcss.com/docs/installation", text: "Tailwind CSS →" },
                  { href: "https://www.framer.com/motion/", text: "Motion →" }
                ]}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div >
  )
}
