import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { fadeIn } from "./motion"
import { Mountains } from "@phosphor-icons/react"

const ScrollToTopLink = ({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Link to={to} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Guide', href: '/guide' },
    { name: 'Notes', href: '/note-example' },
    { name: 'Motion', href: '/motion' },
    { name: 'Utils', href: '/utils' },
  ],
  social: [
    {
      name: 'GitHub',
      href: 'https://github.com/wasp-lang/wasp',
      icon: "GithubLogo"
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/WaspLang',
      icon: "TwitterLogo"
    },
  ],
}

export function Footer() {
  return (
    <motion.footer
      variants={fadeIn}
      initial="initial"
      animate="animate"
    >
      <div className="px-6 py-4 md:flex md:items-center md:justify-between">
        {/* Branding & Navigation */}
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Mountains size={20} weight="fill" />
              {import.meta.env.REACT_APP_NAME}
            </h2>
            <span className="hidden md:inline text-muted-foreground">|</span>
            <p className="hidden md:block text-sm text-muted-foreground">
              A <a href="https://wasp-lang.dev" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">Wasp</a> starter with sensible defaults
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            {navigation.main.map((item) => (
              <ScrollToTopLink
                key={item.name}
                to={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </ScrollToTopLink>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 md:mt-0">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {import.meta.env.REACT_APP_NAME}
          </p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
