import React from 'react'
import { motion } from 'motion/react'
import { fadeIn, staggerContainer, staggerItem } from '../components/ui/motion'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { CodeBlock } from '../components/ui/code-block'
import {
  Lightning,
  Books,
  ArrowBendUpLeft,
  Lightbulb,
} from '@phosphor-icons/react'
import waspLogo from '../static/wasp.png'
import motionLogo from '../static/motion.png'
import tailwindLogo from '../static/tailwind.svg'
import shadcnuiLogo from '../static/shadcnui.png'
import { PrismaLogo } from '../static/prisma-logo'
import type { Icon } from '@phosphor-icons/react'
import { Button } from '../components/ui/button'
import { GithubLogo } from '@phosphor-icons/react'
import { SlidingBoi } from '../components/ui/sliding-boi'
type ListItem = string | { href: string; text: string }

const ListSection = ({
  icon: Icon,
  title,
  items,
}: {
  icon: Icon
  title: string
  items: ListItem[]
}) => (
  <motion.div
    variants={staggerContainer}
    initial='initial'
    animate='animate'
    className='space-y-8'
  >
    <div className='mb-8 flex items-center gap-3'>
      <Icon size={32} weight='fill' className='text-brand-accent' />
      <motion.div
        variants={fadeIn}
        className='text-2xl font-medium tracking-tight'
      >
        {title}
      </motion.div>
    </div>
    <motion.ul
      variants={staggerContainer}
      initial='hidden'
      animate='show'
      className='space-y-4 text-lg text-foreground/90'
    >
      {items.map((item, i) => (
        <motion.li key={i} variants={staggerItem} whileHover={{ x: 5 }}>
          {typeof item === 'string' ? (
            item
          ) : (
            <a href={item.href} target='_blank' rel='noopener noreferrer'>
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
      initial='initial'
      animate='animate'
      className='space-y-24'
    >
      <motion.div variants={fadeIn} className='space-y-4'>
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
      </motion.div>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
        <motion.div variants={fadeIn} className='lg:col-span-2'>
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
              { href: 'https://wasp-lang.dev/docs', text: 'Wasp →' },
              { href: 'https://ui.shadcn.com/docs', text: 'shadcn/ui →' },
              {
                href: 'https://tailwindcss.com/docs/installation',
                text: 'Tailwind CSS →',
              },
              { href: 'https://www.framer.com/motion/', text: 'Motion →' },
            ]}
          />
        </div>
      </div>
      <motion.div variants={fadeIn}>
        <Card>
          <CardHeader>
            <div className='flex items-center gap-4'>
              <CardTitle className='text-4xl font-medium tracking-tight'>
                Why Roke?
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className='space-y-8'>
            <p className='text-pretty text-lg text-muted-foreground'>
              Every time I started a new Wasp project, I found myself going
              through the same ritual: changing the user schema, setting up the
              root layout, wrestling with shadcn/ui paths, configuring auth
              pages and routes, remembering Motion syntax... I realized I
              wasn&apos;t just repeating steps - I was rebuilding my ideal
              starting point over and over.
            </p>

            <p className='text-pretty text-lg text-muted-foreground'>
              That&apos;s when it hit me - why not create something that could
              serve as a post-starting point? Not just another blank template,
              but a thoughtfully crafted foundation that reflects how I actually
              like to build websites.
            </p>

            <p className='text-pretty text-lg text-muted-foreground'>
              By sharing Roke openly, I hope to create a space where we can
              learn from each other. It&apos;s not about chasing metrics or
              building yet another boilerplate - it&apos;s about making web
              development more enjoyable and accessible for everyone who uses
              it.
            </p>

            <div className='mt-8 border-t pt-8'>
              <p className='text-pretty text-base italic text-muted-foreground'>
                &ldquo;Remember: coding doesn&apos;t need to be about making
                money and comparing your MRR on bird network. It can be a
                creative and inspiring endeavor.&rdquo;
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <div className='flex w-full flex-col items-center'>
        <motion.div variants={fadeIn}>
          <h2 className='mb-16 text-balance text-center text-4xl font-thin tracking-tight sm:text-start'>
            powered and inspired by
          </h2>
        </motion.div>
        <motion.div
          variants={staggerContainer}
          initial='hidden'
          whileInView='show'
          className='grid grid-cols-2 items-center justify-items-center gap-8 sm:grid-cols-5'
        >
          <motion.a
            href='https://wasp-lang.dev'
            target='_blank'
            rel='noopener noreferrer'
          >
            <motion.img
              whileHover={{ scale: 1.1 }}
              variants={staggerItem}
              src={waspLogo}
              alt='wasp'
              width={100}
            />
          </motion.a>
          <motion.a
            href='https://motion.dev/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <motion.img
              whileHover={{ scale: 1.1 }}
              variants={staggerItem}
              src={motionLogo}
              alt='motion'
              width={100}
            />
          </motion.a>
          <motion.a
            href='https://tailwindcss.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <motion.img
              whileHover={{ scale: 1.1 }}
              variants={staggerItem}
              src={tailwindLogo}
              alt='tailwind'
              width={100}
              className='text-foreground'
            />
          </motion.a>
          <motion.a
            href='https://ui.shadcn.com/docs'
            target='_blank'
            rel='noopener noreferrer'
          >
            <motion.img
              whileHover={{ scale: 1.1 }}
              variants={staggerItem}
              src={shadcnuiLogo}
              alt='shadcn/ui'
              width={100}
            />
          </motion.a>
          <motion.a
            href='https://www.prisma.io/'
            target='_blank'
            rel='noopener noreferrer'
            className='col-span-2 sm:col-span-1'
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              variants={staggerItem}
              className='w-[80px] text-foreground'
            >
              <PrismaLogo />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
      <motion.div variants={fadeIn}>
        <Card>
          <CardHeader>
            <div className='flex items-center gap-4'>
              <CardTitle className='text-4xl font-medium tracking-tight'>
                What&apos;s he building in there?
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className='space-y-8'>
            <div className='space-y-4'>
              <h3 className='text-xl font-medium'>Developer Experience</h3>
              <p className='text-pretty text-muted-foreground'>
                Creating helper scripts like <code>create-page</code> and{' '}
                <code>fix-shadcn</code> to automate common tasks. These
                aren&apos;t just shortcuts - they&apos;re about removing
                friction from the development process.
              </p>
            </div>

            <div className='space-y-4'>
              <h3 className='text-xl font-medium'>Motion Made Simple</h3>
              <p className='text-pretty text-muted-foreground'>
                Making animations more accessible by providing pre-built
                variants and clear examples. The goal isn&apos;t to turn
                everyone into animation experts overnight, but to show that
                creating beautiful, interactive UIs isn&apos;t as daunting as it
                might seem.
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
                resource for Wasp development, while maintaining a focus on
                clean, maintainable code and modern development practices.
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
          </CardContent>
        </Card>
      </motion.div>
      <SlidingBoi />
    </motion.div>
  )
}
