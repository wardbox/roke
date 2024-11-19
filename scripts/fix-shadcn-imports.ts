/**
 * Fixes the imports in the shadcn components since they are relative to the root.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename: string = fileURLToPath(import.meta.url)
const __dirname: string = dirname(__filename)

const srcDir: string = join(__dirname, '../src')

function fixImports(filePath: string): void {
  let content: string = readFileSync(filePath, 'utf8')

  // Calculate relative path depth based on file location
  const relativePath: number = dirname(filePath)
    .split('src')[1]
    .split('/')
    .filter(Boolean).length

  const basePath: string = '../'.repeat(relativePath) || './'

  const replacements: [RegExp, string][] = [
    // shadcn default @/ pattern
    [/@\/lib\/(utils|components)/g, `${basePath}lib/$1`],
    [/from ["']@\/components\/(.*?)["']/g, `from "${basePath}components/$1"`],

    // s/ pattern
    [/["']s\/lib\/(.*?)["']/g, `"${basePath}lib/$1"`],
    [/from ["']s\/components\/(.*?)["']/g, `from "${basePath}components/$1"`],

    // Handle any potential absolute paths
    [/["']\/components\/(.*?)["']/g, `"${basePath}components/$1"`],
    [/["']\/lib\/(.*?)["']/g, `"${basePath}lib/$1"`],

    // Handle src/ paths
    [/from ["']src\/components\/(.*?)["']/g, `from "${basePath}components/$1"`],
    [/from ["']src\/lib\/(.*?)["']/g, `from "${basePath}lib/$1"`],
    [/from ["']src\/hooks\/(.*?)["']/g, `from "${basePath}hooks/$1"`],

    // Handle imports without 'from' keyword
    [/["']src\/components\/(.*?)["']/g, `"${basePath}components/$1"`],
    [/["']src\/lib\/(.*?)["']/g, `"${basePath}lib/$1"`],
    [/["']src\/hooks\/(.*?)["']/g, `"${basePath}hooks/$1"`],
  ]

  replacements.forEach(([pattern, replacement]: [RegExp, string]) => {
    content = content.replace(pattern, replacement)
  })

  writeFileSync(filePath, content)
}

function scanDirectory(dir: string): void {
  const files: string[] = readdirSync(dir)

  files.forEach((file: string) => {
    const fullPath: string = join(dir, file)
    const stat = statSync(fullPath)

    if (stat.isDirectory()) {
      scanDirectory(fullPath)
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      console.log(`Fixing imports in: ${fullPath}`)
      fixImports(fullPath)
    }
  })
}

// Run the fix
console.log('Fixing shadcn imports...')
scanDirectory(srcDir)
console.log('Done fixing imports!')
