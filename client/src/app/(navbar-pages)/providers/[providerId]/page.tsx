import { Metadata } from "next";
import { generateMetadataTemplate } from "@/lib/metadata";
import { getEntityRecordsById } from "@/api/search/api";

export async function generateMetadata({
  params,
}: {
  params: { providerId: string };
}): Promise<Metadata> {
  const provider = await getEntityRecordsById(params.providerId);
  
  if (!provider || !provider.data || provider.data.length === 0) {
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
    url: `https://costsavyhealth.com/providers/${params.providerId}`,
  });
}

import React, { Suspense } from "react";
import { FeedbackSection } from "@/components/providers/feedback-section";
import { ProviderFaqs } from "@/components/providers/provider-faqs";
import EstimatedCost from "@/components/providers/estimated-cost";
import { Summary } from "@/components/providers/summary";
import EstimatedCostSkeleton from "@/components/providers/estimated-cost-skeleton";

export default function page() {
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
