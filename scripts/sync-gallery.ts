import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

interface ImageAuditEntry {
  filename: string;
  src: string;
  mapped: boolean;
  width?: number;
  height?: number;
  aspectRatio?: string;
  format?: string;
  sizeBytes?: number;
  hasWebp: boolean;
}

const UI_ASSETS = new Set([
  'logo.png',
  'logo2.png',
  'hands1.png',
  'heart.png',
  'receive1.png',
  'scholarship1.png',
]);

async function syncGallery() {
  console.log('🔍 [Furaha Gallery Sync] Auditing /public/images/ ...\n');

  const imagesDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(imagesDir)) {
    console.error('Directory /public/images not found!');
    process.exit(1);
  }

  const allFiles = fs.readdirSync(imagesDir);
  const galleryDataPath = path.join(
    process.cwd(),
    'src',
    'components',
    'gallery',
    'galleryData.ts'
  );
  const galleryDataContent = fs.readFileSync(galleryDataPath, 'utf-8');

  // Filter primary photo assets
  const primaryPhotos = allFiles.filter((file) => {
    const lower = file.toLowerCase();
    if (lower.endsWith('.webp')) return false;
    if (UI_ASSETS.has(lower)) return false;
    return lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png');
  });

  const auditMap: Record<string, ImageAuditEntry> = {};
  const unmappedPhotos: ImageAuditEntry[] = [];
  let webpGeneratedCount = 0;

  for (const filename of primaryPhotos) {
    const fullPath = path.join(imagesDir, filename);
    const baseName = filename.substring(0, filename.lastIndexOf('.'));
    const webpPath = path.join(imagesDir, `${baseName}.webp`);
    const hasWebp = fs.existsSync(webpPath);

    let width: number | undefined;
    let height: number | undefined;
    let aspectRatio: string | undefined;
    let format: string | undefined;
    let sizeBytes = 0;

    try {
      const stats = fs.statSync(fullPath);
      sizeBytes = stats.size;
      const meta = await sharp(fullPath).metadata();
      width = meta.width;
      height = meta.height;
      format = meta.format;
      if (width && height) {
        aspectRatio = (width / height).toFixed(2);
      }

      // Auto-generate WebP if missing
      if (!hasWebp) {
        await sharp(fullPath).webp({ quality: 82 }).toFile(webpPath);
        webpGeneratedCount++;
      }
    } catch (e: any) {
      console.warn(`Could not process metadata for ${filename}: ${e.message}`);
    }

    const srcRef = `/images/${filename}`;
    const isMapped = galleryDataContent.includes(filename) || galleryDataContent.includes(encodeURI(filename));

    const entry: ImageAuditEntry = {
      filename,
      src: srcRef,
      mapped: isMapped,
      width,
      height,
      aspectRatio,
      format,
      sizeBytes,
      hasWebp: true,
    };

    auditMap[filename] = entry;

    if (!isMapped) {
      unmappedPhotos.push(entry);
    }
  }

  // Save audit JSON
  const auditJsonPath = path.join(process.cwd(), 'scripts', 'image-inventory-audit.json');
  fs.writeFileSync(auditJsonPath, JSON.stringify(auditMap, null, 2), 'utf-8');

  console.log(`📊 Audit Summary:`);
  console.log(`   • Total Photo Assets: ${primaryPhotos.length}`);
  console.log(`   • Active in Gallery:   ${primaryPhotos.length - unmappedPhotos.length}`);
  console.log(`   • Unmapped / Missing:  ${unmappedPhotos.length}`);
  if (webpGeneratedCount > 0) {
    console.log(`   • New WebP optimized:  ${webpGeneratedCount}`);
  }

  if (unmappedPhotos.length > 0) {
    console.log(`\n⚠️ The following photos are in /public/images/ but NOT shown on the website:`);
    unmappedPhotos.forEach((p) => {
      console.log(`   - ${p.filename} (${p.width}x${p.height})`);
    });

    console.log(`\n💡 To add them, paste the snippet into src/components/gallery/galleryData.ts`);
  } else {
    console.log(`\n✅ All ${primaryPhotos.length} photos in /public/images/ are mapped and visible on the website!`);
  }
}

syncGallery().catch(console.error);
