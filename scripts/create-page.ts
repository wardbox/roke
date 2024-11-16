import fs from 'fs'
import path from 'path'

const pageName = process.argv[2]
if (!pageName) {
  console.error('❌ Please provide a page name')
  process.exit(1)
}

// Convert "test page" to "test-page" and "TestPage"
const kebabCase = pageName.toLowerCase().replace(/\s+/g, '-')
const pascalCase = pageName
  .split(/[\s-]+/)
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join('')

// Check and create page file
const pagePath = path.join(process.cwd(), 'src', 'client', `${kebabCase}.tsx`)
let pageCreated = false
let pageExists = false

if (fs.existsSync(pagePath)) {
  console.log(`ℹ️ Page file already exists: ${pagePath}`)
  pageExists = true
} else {
  try {
    const pageTemplate = `import { motion } from "motion/react"
import { fadeIn } from "../components/ui/motion"

export default function ${pascalCase}() {
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="space-y-4 mb-16"
    >
      <h1 className="text-7xl sm:text-9xl medieval">
        ${pageName}
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl">
        Description goes here
      </p>
    </motion.div>
  )
}
`
    fs.writeFileSync(pagePath, pageTemplate)
    pageCreated = true
    console.log(`✅ Created page file: ${pagePath}`)
  } catch (error) {
    console.error(`❌ Failed to create page file: ${error}`)
    process.exit(1)
  }
}

// Update main.wasp only if page doesn't exist
const mainWaspPath = path.join(process.cwd(), 'main.wasp')
let waspUpdated = false

try {
  const mainWaspContent = fs.readFileSync(mainWaspPath, 'utf8')
  const routeEntry = `route ${pascalCase}Route { path: "/${kebabCase}", to: ${pascalCase}Page }`
  const pageEntry = `page ${pascalCase}Page {
  component: import ${pascalCase} from "@src/client/${kebabCase}",
}`

  // Check if route and page already exist
  const hasRoute = mainWaspContent.includes(routeEntry)
  const hasPage = mainWaspContent.includes(pageEntry)

  if (hasRoute || hasPage) {
    console.log(`ℹ️ Route and page entries already exist in main.wasp`)
    pageExists = true
  } else if (!pageExists) {
    // Find the email verification entries and add new entries after them
    const updatedMainWasp = mainWaspContent
      .replace(
        /route EmailVerificationRoute.*?to: EmailVerificationPage.*?\n/s,
        `$&\n${routeEntry}\n`,
      )
      .replace(
        /page EmailVerificationPage.*?from "@src\/auth\/auth".*?\n\}/s,
        `$&\n\n${pageEntry}`,
      )

    fs.writeFileSync(mainWaspPath, updatedMainWasp)
    waspUpdated = true
    console.log(`✅ Updated main.wasp with route and page entries`)
  }
} catch (error) {
  console.error(`❌ Failed to update main.wasp: ${error}`)
  process.exit(1)
}

// Update nav.tsx only if page doesn't exist
const navPath = path.join(process.cwd(), 'src', 'components', 'ui', 'nav.tsx')
let navUpdated = false

try {
  const navContent = fs.readFileSync(navPath, 'utf8')

  // Check if navigation items already exist
  const hasNav = navContent.includes(`to="/${kebabCase}"`)

  if (hasNav) {
    console.log(`ℹ️ Navigation items already exist in nav.tsx`)
  } else {
    // Add nav link to the desktop menu
    const desktopNavItem = `            <Link
              to="/${kebabCase}"
              className={cn(
                'text-md flex items-center space-x-2 font-medium transition-colors hover:text-primary',
                location.pathname === '/${kebabCase}' && 'text-primary',
              )}
            >
              <span>${pageName}</span>
            </Link>`

    // Add nav link to the mobile menu
    const mobileNavItem = `                <Link
                  to="/${kebabCase}"
                  className={cn(
                    'text-md flex items-center space-x-4 font-medium transition-colors hover:text-primary',
                    location.pathname === '/${kebabCase}' && 'text-primary',
                  )}
                  onClick={handleNavigation}
                >
                  <Button size='icon' className='rounded-full' iconSize='lg'>
                    <Placeholder size={24} weight='fill' />
                  </Button>
                  <span className='text-3xl'>${pageName}</span>
                </Link>`

    // Update desktop nav - insert after Utils link
    let updatedContent = navContent.replace(
      /(to='\/utils'[\s\S]*?<span>Utils<\/span>\s*<\/Link>)/,
      `$1\n${desktopNavItem}`,
    )

    // Update mobile nav - insert after Utils link in mobile section
    updatedContent = updatedContent.replace(
      /(to='\/utils'[\s\S]*?<span className='text-3xl'>Utils<\/span>\s*<\/Link>)/,
      `$1\n${mobileNavItem}`,
    )

    // Debug: Check if content was actually modified
    if (updatedContent === navContent) {
      console.log(
        "\n⚠️ Warning: No changes were made to nav.tsx. Regex patterns didn't match.",
      )
      console.log(
        "Please check if the nav.tsx structure matches what we're looking for.",
      )
    } else {
      fs.writeFileSync(navPath, updatedContent)
      navUpdated = true
      console.log(`✅ Updated nav.tsx with navigation items`)
    }
  }
} catch (error) {
  console.error(`❌ Failed to update nav.tsx: ${error}`)
  process.exit(1)
}

// Final status - updated logic
if (!pageCreated && !waspUpdated && !navUpdated) {
  console.log(`\nℹ️ All components for "${pageName}" already exist`)
} else {
  console.log(`\n✨ Successfully set up page: ${pageName}`)
  if (pageCreated) console.log(`   - Created src/client/${kebabCase}.tsx`)
  if (waspUpdated) console.log(`   - Added route and page to main.wasp`)
  if (navUpdated) console.log(`   - Added navigation items to nav.tsx`)
}
