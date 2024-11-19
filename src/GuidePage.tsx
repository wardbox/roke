import type { Icon } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { staggerContainer, staggerItem } from './motion/transitionPresets'
import { useMotion } from './motion/motion-provider'
import { Card, CardContent } from './client/components/ui/card'
import { CodeBlock } from './client/components/ui/code-block'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './client/components/ui/tabs'
import { Button } from './client/components/ui/button'
import {
  FolderSimple,
  Lightbulb,
  Gear,
  Code,
  GithubLogo,
  Confetti,
  Headphones,
} from '@phosphor-icons/react'

const GuideSection = ({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: Icon
  title: string
  description: string
  children: React.ReactNode
}) => {
  const { transition, key } = useMotion()

  return (
    <motion.div
      key={key}
      variants={staggerContainer}
      initial='hidden'
      animate='show'
      exit='exit'
      transition={transition}
      className='space-y-6'
    >
      <div className='flex items-center gap-3'>
        <Icon size={32} weight='fill' className='text-brand-accent' />
        <motion.h2
          variants={staggerItem}
          transition={transition}
          className='text-2xl font-semibold tracking-tight'
        >
          {title}
        </motion.h2>
      </div>
      <motion.p
        variants={staggerItem}
        transition={transition}
        className='text-muted-foreground'
      >
        {description}
      </motion.p>
      <motion.div
        variants={staggerContainer}
        initial='hidden'
        animate='show'
        transition={transition}
        className='space-y-4'
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export default function Guide() {
  const { transition, key } = useMotion()

  return (
    <motion.div
      key={key}
      variants={staggerContainer}
      initial='hidden'
      animate='show'
      exit='exit'
      transition={transition}
      className='space-y-16'
    >
      <motion.div
        variants={staggerItem}
        transition={transition}
        className='mb-16 space-y-4'
      >
        <h1 className='medieval text-7xl sm:text-9xl'>Getting Started</h1>
        <p className='max-w-2xl text-lg text-muted-foreground'>
          A comprehensive guide to setting up and customizing your Roke
          application.
        </p>
      </motion.div>

      <div className='space-y-16'>
        {/* Initial Setup */}
        <GuideSection
          icon={Code}
          title='Initial Setup'
          description='Get your development environment ready and create your new project.'
        >
          <Card>
            <CardContent className='pt-6'>
              <motion.ol
                variants={staggerContainer}
                initial='hidden'
                animate='show'
                className='space-y-12'
              >
                <motion.li
                  variants={staggerItem}
                  className='flex flex-col gap-2'
                >
                  <p className='font-medium'>1. Create a new repository</p>
                  <p className='text-sm text-muted-foreground'>
                    Use this template to create a new repository on GitHub. Call
                    it whatever you like!
                  </p>
                  <a href='https://github.com/wardbox/roke/generate'>
                    <Button variant='outline'>
                      <GithubLogo size={16} />
                      Use this template
                    </Button>
                  </a>
                </motion.li>
                <motion.li variants={staggerItem} className='space-y-2'>
                  <p className='font-medium'>
                    2. Clone and install dependencies
                  </p>
                  <CodeBlock
                    language='bash'
                    code={`git clone <your-repo-url>
cd <your-repo-name>`}
                    variant='compact'
                  />
                </motion.li>
                <motion.li variants={staggerItem} className='space-y-2'>
                  <p className='font-medium'>3. Set up your environment</p>
                  <p className='text-sm text-muted-foreground'>
                    Copy the example environment files and configure them:
                  </p>
                  <CodeBlock
                    language='bash'
                    code={`cp .env.client.example .env.client
cp .env.server.example .env.server`}
                    variant='compact'
                  />
                </motion.li>
                <motion.li variants={staggerItem} className='space-y-2'>
                  <p className='font-medium'>4. Start the development server</p>
                  <CodeBlock
                    language='bash'
                    code={`wasp db start
wasp db migrate-dev
wasp start`}
                    variant='compact'
                  />
                </motion.li>
                <motion.li variants={staggerItem} className='space-y-2'>
                  <p className='font-medium'>5. That&apos;s it.</p>
                  <div className='flex items-center gap-2'>
                    <p className='text-sm text-muted-foreground'>
                      You&apos;re all set! Start by exploring the functionality
                      of your new app, or rip out the example features and start
                      building your own.
                    </p>
                    <motion.div
                      variants={staggerItem}
                      whileHover={{
                        rotate: [0, 12, -12, 12, -12, 0, 0, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 0.7,
                        type: 'tween',
                      }}
                    >
                      <Confetti size={32} className='text-brand-accent' />
                    </motion.div>
                  </div>
                </motion.li>
              </motion.ol>
            </CardContent>
          </Card>
        </GuideSection>

        {/* Configuration */}
        <GuideSection
          icon={Gear}
          title='Configuration'
          description="Customize your application's settings and behavior."
        >
          <Tabs defaultValue='env'>
            <TabsList>
              <TabsTrigger
                className='data-[state=active]:w-full md:data-[state=active]:w-auto'
                value='env'
              >
                env vars
              </TabsTrigger>
              <TabsTrigger
                className='data-[state=active]:w-full md:data-[state=active]:w-auto'
                value='theme'
              >
                theme
              </TabsTrigger>
              <TabsTrigger
                className='data-[state=active]:w-full md:data-[state=active]:w-auto'
                value='fonts'
              >
                fonts
              </TabsTrigger>
              <TabsTrigger
                className='data-[state=active]:w-full md:data-[state=active]:w-auto'
                value='auth'
              >
                auth
              </TabsTrigger>
            </TabsList>
            <TabsContent value='env' className='space-y-4'>
              <Card>
                <CardContent className='pt-6'>
                  <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>
                      Client Environment (.env.client)
                    </h3>
                    <CodeBlock
                      language='bash'
                      code={`REACT_APP_NAME="Your App Name"`}
                      variant='compact'
                    />
                    <h3 className='text-lg font-medium'>
                      Server Environment (.env.server)
                    </h3>
                    <CodeBlock
                      language='bash'
                      code={`ADMIN_EMAILS="admin@example.com"`}
                      variant='compact'
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='theme' className='space-y-4'>
              <Card>
                <CardContent className='pt-6'>
                  <div className='space-y-4'>
                    <p className='text-sm text-muted-foreground'>
                      Customize your theme colors in <code>Root.css</code> and
                      then update <code>tailwind.config.js</code> with the new
                      values. More detailed docs{' '}
                      <a
                        href='https://ui.shadcn.com/docs/theming'
                        target='_blank'
                        rel='noreferrer'
                        className='underline'
                      >
                        here
                      </a>
                      .
                    </p>
                    <CodeBlock
                      language='css'
                      code={`:root {
    --brand-primary: 215 41% 68%;
    --brand-accent: 26 82% 68%;
}`}
                      variant='compact'
                    />
                    <p className='text-sm text-muted-foreground'>
                      Then update <code>tailwind.config.js</code> with the new
                      values.
                    </p>
                    <CodeBlock
                      language='javascript'
                      code={`module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'hsl(var(--brand-primary))',
          accent: 'hsl(var(--brand-accent))'
        }
      }
    }
  }
}`}
                      variant='compact'
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='fonts' className='space-y-4'>
              <Card>
                <CardContent className='pt-6'>
                  <div className='space-y-4'>
                    <p className='text-sm text-muted-foreground'>
                      Fonts from Fontsource can be easily added to your project.
                      Here&apos;s an example using the Inter font:
                    </p>
                    <motion.div variants={staggerItem} className='space-y-2'>
                      <p className='font-medium'>1. Install the font package</p>
                      <CodeBlock
                        language='bash'
                        code={`# For variable fonts (recommended)
npm install @fontsource-variable/inter

# Or for static fonts
npm install @fontsource/inter`}
                        variant='compact'
                      />
                    </motion.div>
                    <motion.div variants={staggerItem} className='space-y-2'>
                      <p className='font-medium'>
                        2. Import the font in your Root.tsx
                      </p>
                      <CodeBlock
                        language='typescript'
                        code={`// For variable fonts
import '@fontsource-variable/inter'

// Or for static fonts
import '@fontsource/inter'`}
                        variant='compact'
                      />
                    </motion.div>
                    <motion.div variants={staggerItem} className='space-y-2'>
                      <p className='font-medium'>3. Add to your CSS</p>
                      <p className='text-sm text-muted-foreground'>
                        Update your tailwind.config.js to use the font:
                      </p>
                      <CodeBlock
                        language='javascript'
                        code={`module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Variable', 'sans-serif'],
        // Or for static fonts:
        // sans: ['Inter', 'sans-serif'],
      },
    },
  },
}`}
                        variant='compact'
                      />
                    </motion.div>
                    <p className='text-sm text-muted-foreground'>
                      Note: The vite.config.ts is already configured to serve
                      fonts from the @fontsource-variable directory. If you need
                      to use static fonts, uncomment the @fontsource line in
                      vite.config.ts.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='auth' className='space-y-4'>
              <Card>
                <CardContent className='pt-6'>
                  <div className='space-y-4'>
                    <p className='text-sm'>
                      Default authentication is in <code>main.wasp</code>. It
                      uses the Dummy email provider. I like this for prototyping
                      because it&apos;s fast and easy to set up.
                    </p>
                    <CodeBlock
                      language='json'
                      code={`auth: {
  userEntity: User,
  methods: {
    email: {
      fromField: {
        name: "Roke",
        email: "wizard@roke.dev"
      },
      emailVerification: {
        clientRoute: EmailVerificationRoute,
      },
      passwordReset: {
        clientRoute: PasswordResetRoute,
      },
      userSignupFields: import { getEmailUserFields } from "@src/auth/user-signup-fields", // this is checking if the user is an admin and mapping email to username for us
    }
  },
  onAuthSucceededRedirectTo: "/note-example",
  onAuthFailedRedirectTo: "/login"
},`}
                      variant='compact'
                    />
                    <p className='flex items-center text-sm'>
                      You can add various social providers thanks to{' '}
                      <a
                        href='https://wasp-lang.dev/docs/auth/social-auth/overview'
                        target='_blank'
                        rel='noreferrer'
                        className='ml-1 underline'
                      >
                        Wasp&apos;s social auth
                      </a>
                      . It&apos;s stupid simple - which is our jam.
                      <motion.div
                        animate={{
                          rotate: [0, 8, 0, -8, 0],
                          x: [0, 3.5, 0, -3.5, 0],
                          y: [0, -3.5, 0, -3.5, 0],
                          rotateX: [10, 15, -10, -15, 10],
                        }}
                        transition={{
                          duration: 1.2,
                          ease: [0.45, 0.05, 0.15, 0.95],
                          repeat: Infinity,
                        }}
                        style={{
                          perspective: '800px',
                          transformStyle: 'preserve-3d',
                        }}
                        className='mx-3 inline-block'
                      >
                        <Headphones
                          size={32}
                          weight='fill'
                          className='text-brand-accent'
                        />
                      </motion.div>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </GuideSection>

        {/* Project Structure */}
        <GuideSection
          icon={FolderSimple}
          title='Project Structure'
          description='Understanding the organization of your application.'
        >
          <Card>
            <CardContent className='pt-6'>
              <CodeBlock
                language='bash'
                code={`src/
├── auth/                 # Authentication components and config
├── client/
│   └── components/      # UI components (shadcn + custom)
├── landing/             # Landing page and components
├── motion/              # Animation system
│   ├── components/     
│   └── transitionPresets.tsx
├── notes/               # Example feature module
│   ├── components/
│   └── operations.ts
├── lib/                 # Utilities and helpers
└── root/                # App root and layout`}
                variant='compact'
              />
            </CardContent>
          </Card>
        </GuideSection>

        {/* Development Tips */}
        <GuideSection
          icon={Lightbulb}
          title='Automations'
          description='Save time with our built-in scripts.'
        >
          <Card>
            <CardContent className='space-y-12 pt-6'>
              <motion.div variants={staggerItem} className='space-y-2'>
                <h3 className='font-medium'>Adding new shadcn/ui components</h3>
                <p className='text-sm text-muted-foreground'>
                  Since Wasp doesn&apos;t support @ aliases yet, when we add
                  shadcn/ui components, we need to fix the import paths. This
                  script will do that for you.
                </p>
                <CodeBlock
                  language='bash'
                  code={`npx shadcn-ui@latest add button
npm run fix-shadcn  # Fix import paths`}
                  variant='compact'
                />
              </motion.div>
              <motion.div variants={staggerItem} className='space-y-2'>
                <h3 className='font-medium'>Creating a new page</h3>
                <p className='text-sm text-muted-foreground'>
                  Create a new page including a route, component, and add to the
                  nav automatically. The page will be created in{' '}
                  <code>src/pages/</code> and will have a basic component with
                  the name of the page. Routes are added to{' '}
                  <code>main.wasp</code> and navigation items are added to{' '}
                  <code>src/components/ui/nav.tsx</code>. If you have a page
                  with the same name, we won&apos;t overwrite it.
                </p>
                <CodeBlock
                  language='bash'
                  code={`npm run create-page "About"    
> create-page
> tsx scripts/create-page.ts About

✅ Created page file: /Users/wardbox/git/roke/src/AboutPage.tsx
✅ Updated main.wasp with route and page entries
✅ Updated nav.tsx with navigation items

✨ Successfully set up page: About
   - Created src/pages/about.tsx
   - Added route and page to main.wasp
   - Added navigation items to nav.tsx`}
                  variant='compact'
                />
              </motion.div>
              <motion.div variants={staggerItem} className='space-y-2'>
                <h3 className='font-medium'>VSCode Configuration</h3>
                <p className='text-sm text-muted-foreground'>
                  For a better development experience in VSCode or any fork of
                  it (Cursor), create a <code>.vscode/launch.json</code> file:
                </p>
                <CodeBlock
                  language='json'
                  code={`{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node-terminal",
      "name": "Run Script: start",
      "request": "launch",
      "command": "wasp start",
      "cwd": "\${workspaceFolder}",
    }
  ]
}`}
                  variant='compact'
                />
                <p className='text-sm text-muted-foreground'>
                  This configuration allows you to:
                </p>
                <ul className='list-inside list-disc space-y-1 text-sm text-muted-foreground'>
                  <li>
                    Start the Wasp development server directly from VSCode
                  </li>
                  <li>
                    Debug your application using VSCode&apos;s built-in debugger
                  </li>
                  <li>Set breakpoints in your source files</li>
                </ul>
              </motion.div>
            </CardContent>
          </Card>
        </GuideSection>

        {/* Motion System */}
        <GuideSection
          icon={Gear}
          title='Motion System'
          description='Configure and use the animation system throughout your app.'
        >
          <Card>
            <CardContent className='space-y-12 pt-6'>
              <motion.div variants={staggerItem} className='space-y-2'>
                <h3 className='font-medium'>1. Configure your transitions</h3>
                <p className='text-sm text-muted-foreground'>
                  Define your transitions in <code>src/config/motion.ts</code>.
                  You can create different presets for different parts of your
                  app:
                </p>
                <CodeBlock
                  language='typescript'
                  code={`// src/config/motion.ts
export const motionConfig = {
  default: {
    type: 'spring',
    stiffness: 200,
    damping: 8,
    mass: 0.2,
    opacity: {
      type: 'tween',
      duration: 0.2,
      ease: 'easeInOut',
    }
  },
  // Custom presets for specific use cases
  heroSection: {
    type: 'spring',
    stiffness: 300,
    damping: 15,
    mass: 0.5,
    // ...
  }
}`}
                  variant='compact'
                />
              </motion.div>

              <motion.div variants={staggerItem} className='space-y-2'>
                <h3 className='font-medium'>2. Use the default transition</h3>
                <p className='text-sm text-muted-foreground'>
                  Components can use the global transition through the{' '}
                  <code>useMotion</code> hook:
                </p>
                <CodeBlock
                  language='typescript'
                  code={`import { motion } from 'motion/react'
import { fadeIn } from '../components/ui/motion'
import { useMotion } from '../components/motion-provider'

export function MyComponent() {
  const { transition } = useMotion()

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      transition={transition}
    >
      Content
    </motion.div>
  )
}`}
                  variant='compact'
                />
              </motion.div>

              <motion.div variants={staggerItem} className='space-y-2'>
                <h3 className='font-medium'>3. Use custom presets</h3>
                <p className='text-sm text-muted-foreground'>
                  Or use specific presets for different parts of your app:
                </p>
                <CodeBlock
                  language='typescript'
                  code={`import { motion } from 'motion/react'
import { fadeIn } from '../components/ui/motion'
import { motionConfig } from '../config/motion'

export function HeroSection() {
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      transition={motionConfig.heroSection}
    >
      Hero Content
    </motion.div>
  )
}`}
                  variant='compact'
                />
              </motion.div>

              <motion.div variants={staggerItem} className='space-y-2'>
                <h3 className='font-medium'>4. Production Setup</h3>
                <p className='text-sm text-muted-foreground'>
                  The transition playground is intended as a development tool
                  for motion debugging, but you could leave it in if you want!
                  If you want to remove it, you&apos;ll want to:
                </p>
                <CodeBlock
                  language='typescript'
                  code={`// 1. Remove the playground from Root.tsx
// Remove this line:
import { TransitionPlayground } from './components/transition-playground'

// Remove this line:
<TransitionPlayground />

// 2. Configure your default transition in Root.tsx
<MotionConfig 
  reducedMotion='user'
  transition={transitions.snappy} // or any preset from motion.tsx
>
  <ThemeProvider>
    <MotionProvider>
      {/* ... */}
    </MotionProvider>
  </ThemeProvider>
</MotionConfig>

// 3. Use transitions from motion.tsx in your components
import { transitions } from '../motion/transitionPresets'

// Use a preset directly
<motion.div transition={transitions.bouncy}>
  Content
</motion.div>

// Or use the global transition through useMotion
const { transition } = useMotion()
<motion.div transition={transition}>
  Content
</motion.div>`}
                  variant='compact'
                />
              </motion.div>

              <div className='mt-8 border-t pt-8'>
                <p className='text-pretty text-sm text-muted-foreground'>
                  <Lightbulb
                    size={16}
                    weight='fill'
                    className='mr-1 inline-block text-brand-primary'
                  />
                  Tip: You can create different transition presets for different
                  parts of your app in <code>motion.tsx</code>. The playground
                  is great for finding the perfect values, which you can then
                  save as presets! You could also expand it to cover more
                  settings.
                </p>
              </div>
            </CardContent>
          </Card>
        </GuideSection>
      </div>
    </motion.div>
  )
}
