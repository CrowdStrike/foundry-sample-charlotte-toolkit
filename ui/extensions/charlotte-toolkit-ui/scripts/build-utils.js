// File: scripts/build-utils.js
import fs from 'fs-extra';
import path from 'path';

const command = process.argv[2];

async function clean() {
  try {
    const distPath = path.resolve('dist');
    const cachePath = path.resolve('.rollup-cache');
    
    if (await fs.pathExists(distPath)) {
      await fs.remove(distPath);
      console.log('✓ Cleaned dist directory');
    }
    
    if (await fs.pathExists(cachePath)) {
      await fs.remove(cachePath);
      console.log('✓ Cleaned build cache');
    }
    
    await fs.ensureDir(distPath);
  } catch (error) {
    console.error('Error cleaning directories:', error);
    process.exit(1);
  }
}

async function sizeCheck() {
  try {
    const distPath = path.resolve('dist');
    if (!(await fs.pathExists(distPath))) {
      console.error('❌ dist directory not found. Run build first.');
      process.exit(1);
    }

    console.log('\n📊 Bundle Size Report:');
    console.log('=' .repeat(50));
    
    const files = await fs.readdir(distPath);
    let totalSize = 0;
    const sizeReports = [];

    for (const file of files) {
      const filePath = path.join(distPath, file);
      const stats = await fs.stat(filePath);
      
      if (stats.isFile()) {
        const sizeKB = Math.round((stats.size / 1024) * 100) / 100;
        totalSize += sizeKB;
        
        // Categorize files
        let category = '📄';
        if (file.endsWith('.js')) category = '📜';
        else if (file.endsWith('.css')) category = '🎨';
        else if (file.endsWith('.html')) category = '📝';
        else if (file.match(/\.(png|jpg|jpeg|gif|svg)$/)) category = '🖼️';
        else if (file.endsWith('.gz')) category = '🗜️';
        else if (file.endsWith('.br')) category = '🌪️';
        
        sizeReports.push({ file, sizeKB, category });
      }
    }

    // Sort by size (largest first)
    sizeReports.sort((a, b) => b.sizeKB - a.sizeKB);

    // Display report
    sizeReports.forEach(({ file, sizeKB, category }) => {
      const sizeFormatted = sizeKB.toFixed(2).padStart(8);
      console.log(`${category} ${sizeFormatted} KB - ${file}`);
    });

    console.log('=' .repeat(50));
    console.log(`📦 Total bundle size: ${totalSize.toFixed(2)} KB`);

    // Size warnings
    if (totalSize > 1000) {
      console.log('⚠️  Bundle size is quite large (>1MB). Consider code splitting.');
    } else if (totalSize > 500) {
      console.log('💡 Bundle size is moderate. Monitor growth.');
    } else {
      console.log('✅ Bundle size looks good!');
    }

  } catch (error) {
    console.error('Error checking bundle size:', error);
    process.exit(1);
  }
}

async function validate() {
  try {
    const distPath = path.resolve('dist');
    if (!(await fs.pathExists(distPath))) {
      console.error('❌ dist directory not found. Run build first.');
      process.exit(1);
    }

    console.log('\n🔍 Build Validation:');
    console.log('=' .repeat(30));

    const files = await fs.readdir(distPath);
    const validationResults = [];

    // Check for required files
    const requiredPatterns = [
      { pattern: /index.*\.html$/, name: 'HTML entry point', found: false },
      { pattern: /.*\.js$/, name: 'JavaScript bundles', found: false },
      { pattern: /styles.*\.css$/, name: 'CSS stylesheet', found: false }
    ];

    files.forEach(file => {
      requiredPatterns.forEach(req => {
        if (req.pattern.test(file)) {
          req.found = true;
        }
      });
    });

    // Report validation results
    let allValid = true;
    requiredPatterns.forEach(req => {
      const status = req.found ? '✅' : '❌';
      console.log(`${status} ${req.name}`);
      if (!req.found) allValid = false;
    });

    // Check file sizes are reasonable
    for (const file of files) {
      if (file.endsWith('.js')) {
        const filePath = path.join(distPath, file);
        const stats = await fs.stat(filePath);
        const sizeMB = stats.size / (1024 * 1024);
        
        if (sizeMB > 5) {
          console.log(`⚠️  Large JS file detected: ${file} (${sizeMB.toFixed(2)}MB)`);
        }
      }
    }

    // Check HTML file has proper structure
    const htmlFiles = files.filter(f => f.endsWith('.html'));
    for (const htmlFile of htmlFiles) {
      const htmlPath = path.join(distPath, htmlFile);
      const content = await fs.readFile(htmlPath, 'utf8');
      
      if (!content.includes('<script')) {
        console.log('❌ HTML file missing script references');
        allValid = false;
      }
      
      if (!content.includes('stylesheet')) {
        console.log('❌ HTML file missing stylesheet references');
        allValid = false;
      }
    }

    console.log('=' .repeat(30));
    if (allValid) {
      console.log('✅ Build validation passed!');
    } else {
      console.log('❌ Build validation failed!');
      process.exit(1);
    }

  } catch (error) {
    console.error('Error validating build:', error);
    process.exit(1);
  }
}

// Execute the appropriate command
switch (command) {
  case 'clean':
    await clean();
    break;
  case 'size-check':
    await sizeCheck();
    break;
  case 'validate':
    await validate();
    break;
  default:
    console.error(`Unknown command: ${command}`);
    console.log('Available commands: clean, size-check, validate');
    process.exit(1);
}
