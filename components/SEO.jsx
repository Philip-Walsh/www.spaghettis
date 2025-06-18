import React from 'react';
import Head from 'next/head';

/**
 * SEO component for better search engine optimization
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.canonical - Canonical URL
 * @param {string} props.ogImage - Open Graph image URL
 */
export default function SEO({
  title = 'Forbidden Ramen',
  description = 'The next generation of noodles',
  canonical = 'https://www.spaghettis.com',
  ogImage = '/images/og-image.jpg',
}) {
  const siteTitle = title ? `${title} | Forbidden Ramen` : 'Forbidden Ramen';
  
  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Forbidden Ramen" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
    </Head>
  );
}