import { Metadata } from 'next';

interface MetadataTemplateProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

export function generateMetadataTemplate({
  title = 'Cost Savy Health',
  description = 'Find and compare healthcare costs across providers. Get transparent pricing for medical procedures and services.',
  keywords = ['healthcare', 'medical costs', 'health insurance', 'medical procedures', 'healthcare pricing'],
  image = '/icon.png', // Default OG image
  url = 'https://costsavyhealth.com', // Your domain
}: MetadataTemplateProps = {}): Metadata {
  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      url,
      siteName: 'Cost Savy Health',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-site-verification', // Add your Google verification code
    },
  };
} 