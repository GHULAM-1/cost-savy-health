import ProvidersGlossaryPage from '@/components/providers-glossary/providers-glossary'
import React from 'react'
import { Metadata } from 'next';
import { generateMetadataTemplate } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataTemplate({
    title: 'Healthcare Providers Glossary | Cost Savy Health',
    description: 'Comprehensive glossary of healthcare providers and medical terms. Learn about different types of healthcare providers and their roles in the medical system.',
    keywords: [
      'healthcare providers',
      'medical glossary',
      'healthcare terms',
      'medical providers',
      'healthcare definitions',
      'medical professionals',
      'healthcare roles'
    ],
    url: 'https://costsavyhealth.com/providers-glossary',
  });
}

export default function ProvidersGlossary() {
  return (
    <div>
      <ProvidersGlossaryPage />
    </div>
  )
}
