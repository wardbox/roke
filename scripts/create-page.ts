/**
 * Creates a new page and updates main.wasp and nav.tsx with the new page.
 * @param {string} pageName - The name of the page to create.
 */

import fs from 'fs'
import path from 'path'

const pageName = process.argv[2]
if (!pageName) {
  console.error('❌ Please provide a page name')
  process.exit(1)
}

// Convert "test" to "TestPage"
const pascalCase =
  pageName
    .split(/[\s-]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('') + 'Page'

// Check and create page file
const pagePath = path.join(process.cwd(), 'src', `${pascalCase}.tsx`)
let pageCreated = false
let pageExists = false

if (fs.existsSync(pagePath)) {
  console.log(`ℹ️ Page file already exists: ${pagePath}`)
  pageExists = true
} else {
  try {
    const pageTemplate = `import { motion } from 'motion/react'
import { fadeIn } from './motion/transitionPresets'

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
  const routeEntry = `route ${pascalCase}Route { path: "/${pageName.toLowerCase()}", to: ${pascalCase} }`
  const pageEntry = `page ${pascalCase} {
  component: import ${pascalCase} from "@src/${pascalCase}",
}`

  // Check if route and page already exist
  const hasRoute = mainWaspContent.includes(routeEntry)
  const hasPage = mainWaspContent.includes(pageEntry)

  if (hasRoute || hasPage) {
    console.log(`ℹ️ Route and page entries already exist in main.wasp`)
    pageExists = true
  } else if (!pageExists) {
    // Find the last route and page entries and add new entries after them
    const routeMatch = mainWaspContent.match(/route.*?{.*?}/gs)
    const pageMatch = mainWaspContent.match(/page.*?{.*?}/gs)

    if (routeMatch && pageMatch) {
      const lastRoute = routeMatch[routeMatch.length - 1]
      const lastPage = pageMatch[pageMatch.length - 1]

      let updatedMainWasp = mainWaspContent
        .replace(lastRoute, `${lastRoute}\n\n${routeEntry}`)
        .replace(lastPage, `${lastPage}\n\n${pageEntry}`)

      fs.writeFileSync(mainWaspPath, updatedMainWasp)
      waspUpdated = true
      console.log(`✅ Updated main.wasp with route and page entries`)
    }
  }
} catch (error) {
  console.error(`❌ Failed to update main.wasp: ${error}`)
  process.exit(1)
}

// Update nav.tsx only if page doesn't exist
const navPath = path.join(process.cwd(), 'src', 'root', 'components', 'nav.tsx')
let navUpdated = false

try {
  const navContent = fs.readFileSync(navPath, 'utf8')

  // Check if navigation items already exist
  const hasNav = navContent.includes(`to="/${pageName.toLowerCase()}"`)

  if (hasNav) {
    console.log(`ℹ️ Navigation items already exist in nav.tsx`)
  } else {
    // Add nav link to the desktop menu after Utils link
    const desktopNavItem = `            <Link
              to="/${pageName.toLowerCase()}"
              className={cn(
                'text-md flex items-center space-x-2 font-medium transition-colors hover:text-primary',
                location.pathname === '/${pageName.toLowerCase()}' && 'text-primary',
              )}
              onMouseEnter={() => prefetch('/${pageName.toLowerCase()}')}
            >
              <span>${pageName}</span>
            </Link>`

    // Add nav link to the mobile menu after Utils link
    const mobileNavItem = `                <Link
                  to="/${pageName.toLowerCase()}"
                  className={cn(
                    'text-md flex items-center space-x-4 font-medium transition-colors hover:text-primary',
                    location.pathname === '/${pageName.toLowerCase()}' && 'text-primary',
                  )}
                  onClick={handleNavigation}
                  onMouseEnter={() => prefetch('/${pageName.toLowerCase()}')}
                >
                  <Button size='icon' className='rounded-full' iconSize='lg'>
                    <Placeholder size={24} weight='fill' />
                  </Button>
                  <span className='text-3xl'>${pageName}</span>
                </Link>`

    // Update desktop nav - insert after Utils link
    let updatedContent = navContent.replace(
      /(to='\/utils'.*?\n.*?<span>Utils<\/span>\s*<\/Link>)/s,
      `$1\n${desktopNavItem}`,
    )

    // Update mobile nav - insert after Utils link in mobile section
    updatedContent = updatedContent.replace(
      /(to='\/utils'.*?\n.*?<span className='text-3xl'>Utils<\/span>\s*<\/Link>)/s,
      `$1\n${mobileNavItem}`,
    )

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

// Final status
if (!pageCreated && !waspUpdated && !navUpdated) {
  console.log(`\nℹ️ All components for "${pageName}" already exist`)
} else {
  console.log(`\n✨ Successfully set up page: ${pageName}`)
  if (pageCreated) console.log(`   - Created src/${pascalCase}.tsx`)
  if (waspUpdated) console.log(`   - Added route and page to main.wasp`)
  if (navUpdated) console.log(`   - Added navigation items to nav.tsx`)
}
