import React from 'react'
import { motion } from 'motion/react'
import { fadeIn, staggerContainer, staggerItem } from '../components/ui/motion'
import { Card, CardContent } from '../components/ui/card'
import { CodeBlock } from '../components/ui/code-block'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import type { Icon } from '@phosphor-icons/react'

import { FolderSimple, Lightbulb, Gear, Code } from '@phosphor-icons/react'

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
}) => (
  <motion.div
    variants={staggerContainer}
    initial='initial'
    animate='animate'
    className='space-y-6'
  >
    <div className='flex items-center gap-3'>
      <Icon size={32} weight='fill' className='text-brand-accent' />
      <motion.h2
        variants={fadeIn}
        className='text-2xl font-semibold tracking-tight'
      >
        {title}
      </motion.h2>
    </div>
    <motion.p variants={fadeIn} className='text-muted-foreground'>
      {description}
    </motion.p>
    <motion.div variants={staggerContainer} className='space-y-4'>
      {children}
    </motion.div>
  </motion.div>
)

export default function Guide() {
  return (
    <motion.div
      variants={staggerContainer}
      initial='initial'
      animate='animate'
      className='space-y-16'
    >
      <motion.div variants={fadeIn} className='mb-16 space-y-4'>
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
              <ol className='space-y-4'>
                <motion.li variants={staggerItem} className='space-y-2'>
                  <p className='font-medium'>1. Create a new repository</p>
                  <p className='text-sm text-muted-foreground'>
                    Use this template to create a new repository on GitHub.
                    Click the &quot;Use this template&quot; button at the top of
                    the repository.
                  </p>
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
              </ol>
            </CardContent>
          </Card>
        </GuideSection>

        {/* Configuration */}
        <GuideSection
          icon={Gear}
          title='Configuration'
          description="Customize your application's settings and behavior."
        >
          <Tabs defaultValue='env' className='w-full'>
            <TabsList>
              <TabsTrigger value='env'>Environment Variables</TabsTrigger>
              <TabsTrigger value='theme'>Theme</TabsTrigger>
              <TabsTrigger value='auth'>Authentication</TabsTrigger>
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
                    <p className='text-sm'>
                      You can add various social providers thanks to{' '}
                      <a
                        href='https://wasp-lang.dev/docs/auth/social-auth/overview'
                        target='_blank'
                        rel='noreferrer'
                        className='underline'
                      >
                        Wasp&apos;s social auth
                      </a>
                      .
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
├── components/
│   ├── ui/              # shadcn/ui + custom components
├── lib/                 # Utility functions
│   └── utils.ts         # Common utilities
├── client/              # Application pages
│   ├── landing.tsx     # Landing page
│   └── example/        # Example features
│       ├── example.tsx
│       └── operations.ts
└── Root.tsx           # App root with navigation`}
                variant='compact'
              />
            </CardContent>
          </Card>
        </GuideSection>

        {/* Development Tips */}
        <GuideSection
          icon={Lightbulb}
          title='Development Tips'
          description='Best practices and helpful tips for development.'
        >
          <Card>
            <CardContent className='space-y-12 pt-6'>
              <motion.div variants={staggerItem} className='space-y-2'>
                <h3 className='font-medium'>Adding new shadcn/ui components</h3>
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
                  nav automatically.
                </p>
                <CodeBlock
                  language='bash'
                  code={`npm run create-page "About"    
> create-page
> tsx scripts/create-page.ts About

✅ Created page file: /Users/wardbox/git/roke/src/pages/about.tsx
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
      </div>
    </motion.div>
  )
}
