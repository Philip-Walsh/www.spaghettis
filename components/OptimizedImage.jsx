import React from 'react';
import Image from 'next/image';
import { getResponsiveSizes, generateBlurPlaceholder } from '../utils/imageUtils';

/**
 * OptimizedImage component that leverages Next.js Image optimization
 * with advanced features like blur placeholders and responsive sizing
 * 
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alternative text for the image
 * @param {number} props.width - Image width
 * @param {number} props.height - Image height
 * @param {string} props.className - Optional CSS class name
 * @param {Object} props.style - Optional inline styles
 * @param {boolean} props.priority - Whether to prioritize loading this image
 * @param {string} props.loading - Loading behavior ('lazy' or 'eager')
 * @param {boolean} props.useBlurPlaceholder - Whether to use a blur placeholder
 * @param {string} props.placeholderColor - Base color for blur placeholder
 * @param {Object} props.rest - Any other props to pass to the Image component
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  style = {},
  priority = false,
  loading = 'lazy',
  useBlurPlaceholder = true,
  placeholderColor = '#1e3a8a',
  ...rest
}) {
  // Generate responsive sizes based on image width
  const sizes = getResponsiveSizes(width);
  
  // Generate blur placeholder if needed
  const placeholder = useBlurPlaceholder ? 'blur' : 'empty';
  const blurDataURL = useBlurPlaceholder ? generateBlurPlaceholder(placeholderColor) : undefined;

  return (
    <div className={`relative ${className}`} style={style}>
      <Image
        src={src}
        alt={alt || ''}
        width={width}
        height={height}
        priority={priority}
        loading={loading}
        quality={85}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        {...rest}
      />
    </div>
  );
}