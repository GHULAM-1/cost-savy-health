import { Metadata } from 'next';
import { generateMetadataTemplate } from '@/lib/metadata';
import { getProviderById } from '@/api/sanity/queries';

export async function generateMetadata({
  params,
}: {
  params: { providerId: string };
}): Promise<Metadata> {
  const provider = await getProviderById(params.providerId);

  if (!provider) {
    return generateMetadataTemplate({
      title: 'Provider Not Found | Cost Savy Health',
      description: 'The requested healthcare provider could not be found.',
      keywords: ['healthcare provider', 'medical provider', 'provider not found'],
      url: 'https://costsavyhealth.com/providers',
    });
  }

  return generateMetadataTemplate({
    title: `${provider.name} | Healthcare Provider | Cost Savy Health`,
    description: `View detailed information about ${provider.name}, a ${provider.providerType} located in ${provider.address.city}, ${provider.address.state}. Compare costs, services, and quality metrics.`,
    keywords: [
      provider.name,
      provider.providerType,
      'healthcare provider',
      'medical provider',
      'healthcare costs',
      'provider services',
      'healthcare transparency',
      provider.address.city,
      provider.address.state,
      'medical facilities'
    ].filter(Boolean),
    url: `https://costsavyhealth.com/providers/${provider._id}`,
  });
}
import React, { Suspense } from "react";
import { FeedbackSection } from "@/components/providers/feedback-section";
import { ProviderFaqs } from "@/components/providers/provider-faqs";
import EstimatedCost from "@/components/providers/estimated-cost";
import { Summary } from "@/components/providers/summary";

export default function page() {
  return (
    <div className="px-[16px]">
      <Suspense fallback={<div>Loading...</div>}>
        <EstimatedCost />
      </Suspense>
      <Summary />
      <div className="md:px-20 lg:mt-28 mt-16 px-2">
        <ProviderFaqs />
      </div>
    </div>
  );
}