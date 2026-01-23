# Configuration Files

## featured-clients.json

This file controls which client photos appear on the home page and which specific image is shown for each client.

### How to configure:

1. Each entry in the `featured` array represents one client that will be displayed on the home page
2. The clients will be displayed in a 2-column landscape grid layout
3. Specify which image file to use for each client

### Structure:

```json
{
  "featured": [
    {
      "slug": "folder-name",           // Must match the folder name in /public/images/clients/
      "featuredImage": "filename.jpg"   // The specific image file to show (e.g., "1.jpg", "photo.jpg")
    }
  ]
}
```

### Example:

If you have these folders:
- `/public/images/clients/qistina-aswad/` with images: `1.jpg`, `2.jpg`, `3.jpg`
- `/public/images/clients/alan-naim/` with images: `cover.jpg`, `ceremony.jpg`

And you want to show:
- Qistina & Aswad using their 3rd photo
- Alan & Naim using their cover photo

Your config should be:

```json
{
  "featured": [
    {
      "slug": "qistina-aswad",
      "featuredImage": "3.jpg"
    },
    {
      "slug": "alan-naim",
      "featuredImage": "cover.jpg"
    }
  ]
}
```

### Notes:

- The client name will be auto-generated from the folder name (e.g., "alan-naim" becomes "Alan & Naim")
- If the specified image doesn't exist, it will automatically fallback to the first image in the folder
- You can add or remove clients from the home page by editing this array
- The order in the array determines the display order on the home page
