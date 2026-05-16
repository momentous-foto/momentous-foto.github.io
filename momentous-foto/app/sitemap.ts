import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://momentous-foto.github.io';
  
  // Get all client slugs dynamically
  const clientsDir = path.join(process.cwd(), 'public', 'images', 'clients');
  let clientSlugs: string[] = [];
  
  try {
    if (fs.existsSync(clientsDir)) {
      clientSlugs = fs.readdirSync(clientsDir).filter(item => {
        const itemPath = path.join(clientsDir, item);
        return fs.statSync(itemPath).isDirectory();
      });
    }
  } catch (error) {
    console.error('Error reading clients directory:', error);
  }

  // Get all service slugs
  const servicesDir = path.join(process.cwd(), 'public', 'images', 'services');
  let serviceSlugs: string[] = [];
  
  try {
    if (fs.existsSync(servicesDir)) {
      serviceSlugs = fs.readdirSync(servicesDir).filter(item => {
        const itemPath = path.join(servicesDir, item);
        return fs.statSync(itemPath).isDirectory();
      });
    }
  } catch (error) {
    console.error('Error reading services directory:', error);
  }

  // Core pages (highest priority)
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Add service pages
  serviceSlugs.forEach(slug => {
    routes.push({
      url: `${baseUrl}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Add client gallery pages
  clientSlugs.forEach(slug => {
    routes.push({
      url: `${baseUrl}/client/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return routes;
}
