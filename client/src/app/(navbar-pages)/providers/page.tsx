import { Metadata } from 'next';
import { generateMetadataTemplate } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataTemplate({
    title: 'Healthcare Providers | Cost Savy Health',
    description: 'Browse and compare healthcare providers across the United States. Find transparent pricing, services, and quality metrics to make informed healthcare decisions.',
    keywords: [
      'healthcare providers',
      'medical providers',
      'healthcare costs',
      'provider comparison',
      'medical services',
      'healthcare transparency',
      'provider ratings',
      'medical facilities',
      'healthcare pricing'
    ],
    url: 'https://costsavyhealth.com/providers',
  });
}

import React, { Suspense } from "react";
import AllProviders from "@/components/providers/providers";
import { ProviderFaqs } from "@/components/providers/provider-faqs";
import { FeedbackSection } from "@/components/providers/feedback-section";


const LoadingProviders = () => (
  <div className="p-4 text-center">Loading providers...</div>
);
export default function Providers() {
  return (
    <div className="px-[16px]">
      <Suspense fallback={<LoadingProviders />}>
        <AllProviders />
      </Suspense>
      <FeedbackSection />
      <ProviderFaqs />
      {/* <HealthcareDataTable /> */}
    </div>
  );
}