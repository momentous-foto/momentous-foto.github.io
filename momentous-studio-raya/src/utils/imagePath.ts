/**
 * Get the correct image path for both development and production
 * In production (GitHub Pages), adds the base path /momentous-studio-raya/
 * Also properly encodes spaces and special characters in filenames
 */
export const getImagePath = (path: string): string => {
  const base = import.meta.env.BASE_URL;
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Split path into segments, encode each segment separately (preserves /)
  const segments = cleanPath.split('/');
  const encodedSegments = segments.map(segment => encodeURIComponent(segment));
  const encodedPath = encodedSegments.join('/');
  
  return `${base}${encodedPath}`;
};
