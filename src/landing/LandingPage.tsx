import { useMotion } from '../motion/motion-provider'
import { fadeIn, staggerContainer } from '../motion/transitionPresets'
import { motion } from 'motion/react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../client/components/ui/card'
import { Button } from '../client/components/ui/button'
import { CodeBlock } from '../client/components/ui/code-block'
import { SlidingBoi } from './components/sliding-boi'
import { SectionCard } from './components/section-card'
import { TechStack } from './components/tech-stack'
import { ListSection } from './components/list-section'

import {
  Lightning,
  Books,
  ArrowBendUpLeft,
  Lightbulb,
  GithubLogo,
} from '@phosphor-icons/react'

import { generateSlug } from '../lib/utils'

export default function Landing() {
  const { transition, key } = useMotion()

  return (
    <motion.div
      key={key}
      variants={staggerContainer}
      initial='hidden'
      animate='show'
      exit='exit'
      transition={transition}
      custom={transition}
      className='space-y-24'
    >
      <motion.section id='hero' variants={fadeIn} className='space-y-4'>
        <h1 className='flex gap-4 text-9xl sm:text-[10rem] lg:text-[12rem]'>
          <span className='medieval'>
            {import.meta.env.REACT_APP_NAME || 'Roke'}
          </span>
          <span className='hidden translate-y-12 -rotate-12 text-pretty text-base font-light tracking-normal text-muted-foreground sm:block'>
            <ArrowBendUpLeft
              className='mr-1 inline-block'
              size={16}
              weight='fill'
            />
            Customize this title in <code>.env.client</code>!
          </span>
        </h1>
        <div className='flex flex-col gap-6 sm:flex-row sm:items-center'>
          <p className='max-w-2xl text-2xl font-extralight leading-relaxed text-foreground/90 sm:text-3xl'>
            A{' '}
            <a
              href='https://wasp-lang.dev'
              target='_blank'
              rel='noopener noreferrer'
              className='underline'
            >
              Wasp
            </a>{' '}
            starter with sensible defaults
          </p>
          <Button variant='outline' size='lg' className='group w-fit' asChild>
            <a
              href='https://github.com/wardbox/roke'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2'
            >
              <GithubLogo
                size={20}
                weight='fill'
                className='transition-transform group-hover:-rotate-12'
              />
              View on GitHub
            </a>
          </Button>
        </div>
      </motion.section>

      <motion.section
        id='quick-start'
        variants={fadeIn}
        className='grid grid-cols-1 gap-8 lg:grid-cols-3'
      >
        <motion.div className='lg:col-span-2'>
          <Card>
            <CardHeader>
              <div className='flex items-center gap-4'>
                <CardTitle className='text-4xl font-medium tracking-tight'>
                  Quick Start
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className=''>
              <div className='flex flex-col gap-12 text-lg'>
                <div className='space-y-4'>
                  <p className='font-medium'>
                    1. Set your app name in <code>.env.client</code>
                  </p>
                  <CodeBlock
                    code={`REACT_APP_NAME="App Name"`}
                    variant='compact'
                  />
                </div>
                <div className='space-y-4'>
                  <p className='font-medium'>2. Start developing:</p>
                  <CodeBlock
                    code={`wasp db start
wasp db migrate-dev
wasp start`}
                    variant='compact'
                  />
                </div>
                <p className='mt-4 text-pretty border-t pt-4 text-sm text-muted-foreground'>
                  <Lightbulb
                    size={16}
                    weight='fill'
                    className='mr-1 inline-block text-brand-primary'
                  />
                  Tip: After installing new shadcn components, run{' '}
                  <code>npm run fix-shadcn</code> to fix import paths
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <div className='space-y-16'>
          <ListSection
            icon={Lightning}
            title='Features'
            items={[
              'Wired up for shadcn/ui',
              'Theme toggle and Toaster included',
              'Mobile first design',
              'Common use case motion variants',
              'Utility functions',
            ]}
          />
          <ListSection
            icon={Books}
            title='Resources'
            items={[
              { href: 'https://wasp-lang.dev/docs', text: 'Wasp' },
              { href: 'https://ui.shadcn.com/docs', text: 'shadcn/ui' },
              {
                href: 'https://tailwindcss.com/docs/installation',
                text: 'Tailwind CSS',
              },
              { href: 'https://www.framer.com/motion/', text: 'Motion' },
            ]}
          />
        </div>
      </motion.section>

      <SectionCard sectionId={generateSlug('Why Roke?')} title='Why Roke?'>
        <p className='text-pretty text-lg text-muted-foreground'>
          Every time I started a new Wasp project, I found myself going through
          the same ritual: changing the user schema, setting up the root layout,
          wrestling with shadcn/ui paths, configuring auth pages and routes,
          remembering Motion syntax... I realized I wasn&apos;t just repeating
          steps - I was rebuilding my ideal starting point over and over.
        </p>

        <p className='text-pretty text-lg text-muted-foreground'>
          That&apos;s when it hit me - why not create something that could serve
          as a post-starting point? Not just another blank template, but a
          thoughtfully crafted foundation that reflects how I actually like to
          build websites.
        </p>

        <p className='text-pretty text-lg text-muted-foreground'>
          By sharing Roke openly, I hope to create a space where we can learn
          from each other and make web development more enjoyable and accessible
          for everyone.
        </p>

        <div className='mt-8 border-t pt-8'>
          <p className='text-pretty text-base italic text-muted-foreground'>
            &ldquo;Remember: coding doesn&apos;t need to be about making money
            and comparing your MRR on bird network. It can be a creative and
            inspiring endeavor.&rdquo;
          </p>
        </div>
      </SectionCard>

      <TechStack />

      <SectionCard
        sectionId='future-plans'
        title="What's he building in there?"
        subtitle="There's a glow from his console, and he hammers late into the night..."
      >
        <div className='space-y-4'>
          <h3 className='text-xl font-medium'>Developer Experience</h3>
          <p className='text-pretty text-muted-foreground'>
            Creating helper scripts like <code>create-page</code> and{' '}
            <code>fix-shadcn</code> to automate common tasks. These aren&apos;t
            just shortcuts - they&apos;re about removing friction from the
            development process.
          </p>
        </div>

        <div className='space-y-4'>
          <h3 className='text-xl font-medium'>Motion Made Simple</h3>
          <p className='text-pretty text-muted-foreground'>
            Making animations more accessible by providing pre-built variants
            and clear examples. The goal isn&apos;t to turn everyone into
            animation experts overnight, but to show that creating beautiful,
            interactive UIs isn&apos;t as daunting as it might seem.
          </p>
        </div>

        <div className='space-y-4'>
          <h3 className='text-xl font-medium'>Real-World Examples</h3>
          <p className='text-pretty text-muted-foreground'>
            Building out practical examples beyond the basics - think admin
            portals, purchase workflows, creative AI integrations, and more.
            Taking inspiration from projects like
            <a
              href='https://opensaas.sh'
              target='_blank'
              rel='noopener noreferrer'
              className='ml-1 underline'
            >
              OpenSaaS
            </a>{' '}
            while focusing on modularity and composability.
          </p>
        </div>

        <div className='space-y-4'>
          <h3 className='text-xl font-medium'>Best Practices</h3>
          <p className='text-pretty text-muted-foreground'>
            Enhancing our <code>.cursorrules</code> to be an even better
            resource for Wasp development, while maintaining a focus on clean,
            maintainable code and modern development practices.
          </p>
        </div>

        <div className='mt-8 border-t pt-8'>
          <p className='text-pretty text-sm text-muted-foreground'>
            <Lightbulb
              size={16}
              weight='fill'
              className='mr-1 inline-block text-brand-primary'
            />
            Want to contribute? Check out our
            <a
              href='https://github.com/wardbox/roke/issues'
              target='_blank'
              rel='noopener noreferrer'
              className='mx-1 underline'
            >
              GitHub issues
            </a>
            or submit a pull request. Let&apos;s build something beautiful
            together.
          </p>
        </div>
      </SectionCard>

      <SlidingBoi />
    </motion.div>
  )
}
