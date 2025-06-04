// File: app/(navbar-pages)/providers/[providerId]/page.tsx

import React, { Suspense } from "react";
import type { Metadata } from "next";
import { generateMetadataTemplate } from "@/lib/metadata";
import { getEntityRecordsById } from "@/api/search/api";

import { ProviderFaqs } from "@/components/providers/provider-faqs";
import EstimatedCost from "@/components/providers/estimated-cost";
import EstimatedCostSkeleton from "@/components/providers/estimated-cost-skeleton";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ providerId: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const { providerId } = await params;

  const provider = await getEntityRecordsById(providerId);

  if (!provider || !provider.data || provider.data.length === 0) {
    // Fallback metadata when provider not found
    return generateMetadataTemplate({
      title: "Provider Not Found | Cost Savy Health",
      description: "The requested healthcare provider could not be found.",
      keywords: [
        "healthcare provider",
        "medical provider",
        "provider not found",
      ],
      url: "https://costsavyhealth.com/providers",
    });
  }

  const providerData = provider.data[0];
  return generateMetadataTemplate({
    title: `${providerData.provider_name} | Healthcare Provider | Cost Savy Health`,
    description: `View detailed information about ${providerData.provider_name}, located in ${providerData.provider_city}, ${providerData.provider_state}. Compare costs, services, and quality metrics.`,
    keywords: [
      providerData.provider_name,
      "healthcare provider",
      "medical provider",
      "healthcare costs",
      "provider services",
      "healthcare transparency",
      providerData.provider_city,
      providerData.provider_state,
      "medical facilities",
    ].filter(Boolean),
    url: `https://costsavyhealth.com/providers/${providerId}`,
  });
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ providerId: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { providerId } = await params;

  return (
    <div className="px-[16px]">
      <Suspense fallback={<EstimatedCostSkeleton />}>
        <EstimatedCost />
      </Suspense>

      <div className="md:px-20 lg:mt-10 mt-16 px-2">
        <ProviderFaqs />
      </div>
    </div>
  );
}
