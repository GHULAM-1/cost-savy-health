import { Metadata } from 'next';
import { generateMetadataTemplate } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataTemplate({
    title: 'Register | Cost Savy Health',
    description: 'Create your Cost Savy Health account to start comparing healthcare costs and finding the best prices for medical procedures.',
    keywords: [
      'healthcare registration',
      'medical cost account',
      'healthcare signup',
      'patient registration',
      'healthcare access',
      'medical cost comparison',
      'healthcare savings'
    ],
    url: 'https://costsavyhealth.com/auth/register',
  });
} 