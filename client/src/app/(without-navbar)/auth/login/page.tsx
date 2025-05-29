import { Metadata } from 'next';
import { generateMetadataTemplate } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataTemplate({
    title: 'Login | Cost Savy Health',
    description: 'Log in to your Cost Savy Health account to access personalized healthcare cost comparisons and save on medical expenses.',
    keywords: [
      'healthcare login',
      'medical cost account',
      'healthcare portal',
      'patient login',
      'healthcare access',
      'medical cost comparison',
      'healthcare savings'
    ],
    url: 'https://costsavyhealth.com/auth/login',
  });
} 