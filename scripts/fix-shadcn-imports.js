import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const srcDir = join(__dirname, '../src');

function fixImports(filePath) {
  let content = readFileSync(filePath, 'utf8');
  
  const replacements = [
    // shadcn default @/ pattern
    [/@\/lib\/(utils|components)/g, '../../lib/$1'],
    [/from ["']@\/components\/(.*?)["']/g, 'from "../../components/$1"'],
    
    // s/ pattern
    [/["']s\/lib\/(.*?)["']/g, '"../../lib/$1"'],
    [/from ["']s\/components\/(.*?)["']/g, 'from "../../components/$1"'],
    
    // Handle any potential absolute paths
    [/["']\/components\/(.*?)["']/g, '"../../components/$1"'],
    [/["']\/lib\/(.*?)["']/g, '"../../lib/$1"'],
    
    // Handle src/ paths
    [/from ["']src\/components\/(.*?)["']/g, 'from "../../components/$1"'],
    [/from ["']src\/lib\/(.*?)["']/g, 'from "../../lib/$1"'],
    [/from ["']src\/hooks\/(.*?)["']/g, 'from "../../hooks/$1"'],
    
    // Handle imports without 'from' keyword
    [/["']src\/components\/(.*?)["']/g, '"../../components/$1"'],
    [/["']src\/lib\/(.*?)["']/g, '"../../lib/$1"'],
    [/["']src\/hooks\/(.*?)["']/g, '"../../hooks/$1"']
  ];

  replacements.forEach(([pattern, replacement]) => {
    content = content.replace(pattern, replacement);
  });

  writeFileSync(filePath, content);
}

function scanDirectory(dir) {
  const files = readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      console.log(`Fixing imports in: ${fullPath}`);
      fixImports(fullPath);
    }
  });
}

// Run the fix
console.log('Fixing shadcn imports...');
scanDirectory(srcDir);
console.log('Done fixing imports!');
