# Momentous Foto - Recent Updates

## ✅ All Dummy Data Removed

All pages now use real images from your `public/images/` folder. No more placeholder gradients or dummy data!

## 🎨 Layout Changes

### Home Page (`app/page.tsx`)
- **Grid Layout**: Changed from 3 columns to **2 columns** (landscape layout)
- **Aspect Ratio**: Changed from portrait (3:4) to **landscape (16:9)**
- **Featured Images**: You can now choose which specific photo to show for each client
- **Configuration**: Edit `config/featured-clients.json` to control:
  - Which clients appear on home page
  - Which specific image file to use for each client
  - Display order

### Services Page (`app/services/page.tsx`)
- **Grid Layout**: Changed from 3 columns to **2 columns** (landscape layout)
- **Aspect Ratio**: Changed to **landscape (16:9)**
- **Real Images**: Now pulls images from `public/images/services/{service-slug}/` folders
- **Fallback**: If no folder exists, shows placeholder

### Services Detail Page (`app/services/[slug]/page.tsx`)
- Already using real images - no changes needed
- Displays all moodboard images from service folders

### About Page (`app/about/page.tsx`)
- Already using real moodboard image - no changes needed

### Contact Page (`app/contact/page.tsx`)
- Already functional with form handling - no changes needed

## 📁 Folder Structure

```
frontend/
├── config/
│   ├── featured-clients.json   # Configure home page featured photos
│   └── README.md              # Instructions for configuration
├── public/
│   └── images/
│       ├── clients/           # Client photo folders
│       │   ├── qistina-aswad/
│       │   ├── alan-naim/
│       │   └── ...
│       ├── services/          # Service photo folders
│       │   ├── wedding/
│       │   ├── pre-wedding/
│       │   └── ...
│       └── about/             # About page images
```

## 🎯 How to Use Featured Clients Config

Edit `config/featured-clients.json`:

```json
{
  "featured": [
    {
      "slug": "qistina-aswad",     // Folder name
      "featuredImage": "3.jpg"      // Specific image file
    },
    {
      "slug": "alan-naim",
      "featuredImage": "cover.jpg"
    }
  ]
}
```

- Add/remove entries to change which clients show on home page
- Change `featuredImage` to use different photos from client folders
- Reorder entries to change display order

## 🚀 Benefits

1. **No More Dummy Data**: All images are real from your folders
2. **Full Control**: Choose exactly which photos appear on home page
3. **Landscape Layout**: Better showcase of photography work
4. **2 Column Grid**: Cleaner, more professional look
5. **Automatic Fallback**: If featured image doesn't exist, uses first image in folder
6. **Easy Management**: Just edit JSON file to update home page

## 📝 Notes

- Client names are auto-generated from folder names (e.g., "alan-naim" → "Alan & Naim")
- All images must be in JPG, JPEG, PNG, or WEBP format
- Home page shows 2 photos per row on desktop, 1 per row on mobile
- Services page also shows 2 services per row on desktop
