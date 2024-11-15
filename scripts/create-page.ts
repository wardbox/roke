import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const pageName = process.argv[2];
if (!pageName) {
  console.error("❌ Please provide a page name");
  process.exit(1);
}

// Convert "test page" to "test-page" and "TestPage"
const kebabCase = pageName.toLowerCase().replace(/\s+/g, "-");
const pascalCase = pageName
  .split(/[\s-]+/)
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join("");

// Check and create page file
const pagePath = path.join(process.cwd(), "src", "pages", `${kebabCase}.tsx`);
let pageCreated = false;

if (fs.existsSync(pagePath)) {
  console.log(`ℹ️ Page file already exists: ${pagePath}`);
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
`;
    fs.writeFileSync(pagePath, pageTemplate);
    pageCreated = true;
    console.log(`✅ Created page file: ${pagePath}`);
  } catch (error) {
    console.error(`❌ Failed to create page file: ${error}`);
    process.exit(1);
  }
}

// Update main.wasp
const mainWaspPath = path.join(process.cwd(), "main.wasp");
let waspUpdated = false;

try {
  const mainWaspContent = fs.readFileSync(mainWaspPath, "utf8");
  const routeEntry =
    `route ${pascalCase}Route { path: "/${kebabCase}", to: ${pascalCase}Page }`;
  const pageEntry = `page ${pascalCase}Page {
  component: import ${pascalCase} from "@src/client/${kebabCase}",
}`;

  // Check if route and page already exist
  const hasRoute = mainWaspContent.includes(routeEntry);
  const hasPage = mainWaspContent.includes(pageEntry);

  if (hasRoute && hasPage) {
    console.log(`ℹ️ Route and page entries already exist in main.wasp`);
  } else if (!hasRoute && !hasPage) {
    const updatedMainWasp = mainWaspContent
      .replace(/\/\/#region Routes\n/, `//#region Routes\n${routeEntry}\n`)
      .replace(/\/\/#region Pages\n/, `//#region Pages\n${pageEntry}\n`);

    fs.writeFileSync(mainWaspPath, updatedMainWasp);
    waspUpdated = true;
    console.log(`✅ Updated main.wasp with route and page entries`);
  } else {
    console.error(
      `❌ Inconsistent state in main.wasp: route exists: ${hasRoute}, page exists: ${hasPage}`,
    );
    process.exit(1);
  }
} catch (error) {
  console.error(`❌ Failed to update main.wasp: ${error}`);
  process.exit(1);
}

// Update nav.tsx
const navPath = path.join(process.cwd(), "src", "components", "ui", "nav.tsx");
let navUpdated = false;

try {
  const navContent = fs.readFileSync(navPath, "utf8");

  // Check if navigation items already exist
  const hasDesktopNav = navContent.includes(`to="/${kebabCase}"`);

  if (hasDesktopNav) {
    console.log(`ℹ️ Navigation items already exist in nav.tsx`);
  } else {
    // Add nav link to the desktop menu (in the hidden md:flex section)
    const desktopNavItem = `          <Link
            to="/${kebabCase}"
            className={cn(
              "flex items-center space-x-2 text-md font-medium transition-colors hover:text-primary",
              location.pathname === "/${kebabCase}" && "text-primary"
            )}
          >
            <span>${pageName}</span>
          </Link>`;

    // Add nav link to the mobile menu (in the Sheet content)
    const mobileNavItem = `              <Link
                to="/${kebabCase}"
                className={cn(
                  "flex items-center space-x-2 text-md font-medium transition-colors hover:text-primary",
                  location.pathname === "/${kebabCase}" && "text-primary"
                )}
                onClick={handleNavigation}
              >
                <Button size="icon">
                  <Layout size={24} />
                </Button>
                <span className="text-3xl">${pageName}</span>
              </Link>`;

    // First, add the desktop nav item in the hidden md:flex section
    let updatedContent = navContent.replace(
      /(className="hidden md:flex items-center[^>]+>)([\s\S]*?)(<\/div>)/m,
      (match, start, content, end) => {
        const lastLink = content.split("</Link>").slice(-2)[0] + "</Link>";
        return start +
          content.replace(lastLink, lastLink + "\n" + desktopNavItem) + end;
      },
    );

    // Then, add the mobile nav item in the Sheet content
    updatedContent = updatedContent.replace(
      /(to="\/utils"[^>]+>[\s\S]+?<span className="text-3xl">Utils<\/span>\s*<\/Link>)/,
      (match) => `${match}\n${mobileNavItem}`,
    );

    fs.writeFileSync(navPath, updatedContent);
    navUpdated = true;
    console.log(`✅ Updated nav.tsx with navigation items`);
  }
} catch (error) {
  console.error(`❌ Failed to update nav.tsx: ${error}`);
  process.exit(1);
}

// Final status
if (!pageCreated && !waspUpdated && !navUpdated) {
  console.log(`ℹ️ All components for "${pageName}" already exist`);
} else {
  console.log(`\n✨ Successfully set up page: ${pageName}`);
  if (pageCreated) console.log(`   - Created src/client/${kebabCase}.tsx`);
  if (waspUpdated) console.log(`   - Added route and page to main.wasp`);
  if (navUpdated) console.log(`   - Added navigation items to nav.tsx`);
}
