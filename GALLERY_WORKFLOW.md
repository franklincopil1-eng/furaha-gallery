# Furaha Ministries — Gallery Management & Photo Upload Workflow

This guide explains how gallery images work in the Furaha website and provides the exact workflow to upload, optimize, and display new photos with zero friction.

---

## Why photos were previously missing

The website gallery pulls from a structured TypeScript dataset (`src/components/gallery/galleryData.ts`). Previously, several photos existed in `/public/images/` but lacked entries in `galleryData.ts`. Because the frontend renders items defined in `GALLERY_ITEMS`, any unmapped files remained invisible on the website.

**Current Status:** All 42 photos in `/public/images/` are now mapped, cataloged, WebP-optimized, and visible on the website.

---

## How to upload and display new photos (3 simple steps)

### Step 1: Add the image file
Drop your `.jpg`, `.jpeg`, or `.png` into:
```
public/images/your-photo-name.jpg
```
*(Tip: Use clear, descriptive filenames like `math-classroom-2026.jpg`)*

---

### Step 2: Run the automated sync & audit command
Run:
```bash
npm run gallery:sync
```
This CLI tool will:
1. Scan `/public/images/`
2. Automatically generate high-efficiency `.webp` sibling files (via Sharp) for fast page loads
3. Audit which photos are active in the gallery and list any unmapped files that need registration

---

### Step 3: Register the photo in `galleryData.ts`
Open `src/components/gallery/galleryData.ts` and add an entry to `GALLERY_ITEMS`:

```typescript
  {
    id: 'photo-math-classroom-2026',
    type: 'photo',
    title: 'Primary Math Instruction',
    subtitle: 'Students working through arithmetic problems in the Kibera classroom.',
    category: 'classroom-desks',
    categoryLabel: 'Classrooms & Campus',
    src: '/images/math-classroom-2026.jpg',
    location: 'Kibera, Nairobi, Kenya',
    objectPosition: 'object-center',
    layout: 'wide', // 'standard' | 'wide' | 'portrait'
    isFeatured: false,
  },
```

### Available Categories:
- `'faith-discipleship'` (Faith & Discipleship)
- `'books-study'` (Books & Learning)
- `'classroom-desks'` (Classrooms & Campus)
- `'school-uniforms'` (Uniforms & Students)
- `'nutrition-community'` (Nutrition & Community Relief)
- `'sanitation-repairs'` (Sanitation & Facility Repairs)

---

## Built-In Developer Tools

### 1. In-App Gallery & Photo Inventory Tab
In the website footer, click **Platform & Trust** (or open the Tech Stack Inspector). Navigate to the **Gallery & Photo Inventory** tab to:
- See the real-time audit of storage vs. active photos
- Filter and search all 42 live gallery items
- Use the **Photo Registration Snippet Generator**: enter the filename, title, and category, then click **Copy Snippet** to paste directly into `galleryData.ts`

### 2. CLI Audit Command
```bash
npm run gallery:sync
```
Reports total storage assets, active gallery count, unmapped photos, and WebP generation status.
