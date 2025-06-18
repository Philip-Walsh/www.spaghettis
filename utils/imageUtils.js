/**
 * Utility functions for image optimization
 */

/**
 * Generates responsive image sizes for different viewport widths
 * @param {number} baseSize - Base image size in pixels
 * @returns {string} - Sizes attribute string for responsive images
 */
export function getResponsiveSizes(baseSize = 800) {
  return `(max-width: 640px) ${Math.round(baseSize * 0.8)}px, 
          (max-width: 768px) ${Math.round(baseSize * 0.9)}px, 
          ${baseSize}px`;
}

/**
 * Determines if an image should be loaded with priority
 * @param {number} index - Index of the image in a list
 * @param {boolean} isHero - Whether the image is a hero/featured image
 * @returns {boolean} - Whether to prioritize loading the image
 */
export function shouldPrioritizeImage(index = 0, isHero = false) {
  // Prioritize hero images and first few images in a list
  return isHero || index < 2;
}

/**
 * Generates a blurred placeholder for images
 * @param {string} color - Base color for the placeholder
 * @returns {string} - Data URL for a blurred placeholder
 */
export function generateBlurPlaceholder(color = '#1e3a8a') {
  // Simple SVG-based blur placeholder
  const svg = `
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
      </filter>
      <rect width="100%" height="100%" fill="${color}" filter="url(#blur)" />
    </svg>
  `;
  
  const encodedSvg = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${encodedSvg}`;
}