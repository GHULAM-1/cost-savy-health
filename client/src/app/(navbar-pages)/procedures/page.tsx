import { Metadata } from 'next';
import { generateMetadataTemplate } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataTemplate({
    title: 'Medical Procedures | Cost Savy Health',
    description: 'Browse and compare costs for common medical procedures. Find transparent pricing information for various healthcare services and treatments.',
    keywords: [
      'medical procedures',
      'healthcare procedures',
      'medical costs',
      'procedure pricing',
      'healthcare services',
      'medical treatments',
      'cost comparison'
    ],
    url: 'https://costsavyhealth.com/procedures',
  });
} 