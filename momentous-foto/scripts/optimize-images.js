const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Image Optimization Script for Momentous Foto
 * 
 * This script optimizes images by:
 * 1. Converting to WebP format (better compression)
 * 2. Resizing to appropriate dimensions for web display
 * 3. Reducing file size while maintaining quality
 * 
 * Usage:
 *   node scripts/optimize-images.js [directory]
 * 
 * Examples:
 *   node scripts/optimize-images.js
 *   node scripts/optimize-images.js public/images/sample
 *   node scripts/optimize-images.js ../momentous-studio-raya/public/images/sample
 */

// Get directory from command line argument or use default
const targetDir = process.argv[2] || 'public/images/clients';
const IMAGES_DIR = path.isAbsolute(targetDir) 
  ? targetDir 
  : path.join(process.cwd(), targetDir);

const MAX_WIDTH = 1920; // Max width for large displays
const QUALITY = 80; // WebP quality (80 is good balance)

// Sizes for responsive images
const RESPONSIVE_SIZES = [
  { width: 640, suffix: '-sm' },   // Mobile
  { width: 1024, suffix: '-md' },  // Tablet
  { width: 1920, suffix: '-lg' }   // Desktop
];

async function optimizeImage(inputPath, outputDir) {
  try {
    const fileName = path.basename(inputPath, path.extname(inputPath));
    const stats = fs.statSync(inputPath);
    const fileSizeKB = (stats.size / 1024).toFixed(2);

    console.log(`\nProcessing: ${path.basename(inputPath)} (${fileSizeKB} KB)`);

    // Get original image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`  Original: ${metadata.width}x${metadata.height}`);

    // Create optimized versions at different sizes
    for (const size of RESPONSIVE_SIZES) {
      // Only create size if original is larger
      if (metadata.width > size.width || metadata.height > size.width) {
        const outputPath = path.join(outputDir, `${fileName}${size.suffix}.webp`);
        
        await sharp(inputPath)
          .resize(size.width, null, { 
            fit: 'inside',
            withoutEnlargement: true 
          })
          .webp({ quality: QUALITY })
          .toFile(outputPath);

        const newStats = fs.statSync(outputPath);
        const newSizeKB = (newStats.size / 1024).toFixed(2);
        const savings = ((stats.size - newStats.size) / stats.size * 100).toFixed(1);
        
        console.log(`  ✓ ${size.width}px: ${newSizeKB} KB (${savings}% smaller)`);
      }
    }

    // Create a default optimized version
    const defaultOutput = path.join(outputDir, `${fileName}.webp`);
    await sharp(inputPath)
      .resize(MAX_WIDTH, null, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .webp({ quality: QUALITY })
      .toFile(defaultOutput);

    const newStats = fs.statSync(defaultOutput);
    const newSizeKB = (newStats.size / 1024).toFixed(2);
    const savings = ((stats.size - newStats.size) / stats.size * 100).toFixed(1);
    
    console.log(`  ✓ Default: ${newSizeKB} KB (${savings}% smaller)`);

  } catch (error) {
    console.error(`  ✗ Error processing ${inputPath}:`, error.message);
  }
}

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      
      // Process jpg, jpeg, png files (skip if already optimized .webp)
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        await optimizeImage(fullPath, dir);
      }
    }
  }
}

async function main() {
  console.log('🖼️  Image Optimization Script');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📁 Processing: ${IMAGES_DIR}`);
  console.log(`🎯 Max width: ${MAX_WIDTH}px`);
  console.log(`✨ Quality: ${QUALITY}%`);
  console.log(`📐 Responsive sizes: ${RESPONSIVE_SIZES.map(s => s.width + 'px').join(', ')}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`❌ Directory not found: ${IMAGES_DIR}`);
    process.exit(1);
  }

  const startTime = Date.now();
  await processDirectory(IMAGES_DIR);
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Optimization complete! (${duration}s)`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n📝 Next steps:');
  console.log('1. Update your image references to use .webp extension');
  console.log('2. Use responsive image sizes with srcset');
  console.log('3. Keep original files as backup');
  console.log('4. Test the site to ensure all images load correctly\n');
}

main().catch(console.error);
