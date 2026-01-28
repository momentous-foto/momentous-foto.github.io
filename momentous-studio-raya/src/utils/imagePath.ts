/**
 * Get the correct image path for both development and production
 * In production (GitHub Pages), adds the base path /momentous-studio-raya/
 */
export const getImagePath = (path: string): string => {
  const base = import.meta.env.BASE_URL;
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};
