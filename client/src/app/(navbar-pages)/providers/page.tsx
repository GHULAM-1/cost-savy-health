import React, { Suspense } from "react";
import AllProviders from "@/components/providers/providers";
import { ProviderFaqs } from "@/components/providers/provider-faqs";
import { FeedbackSection } from "@/components/providers/feedback-section";

import HealthcareDataTable from "@/components/healthrecord/healthrecord-table";

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
      <HealthcareDataTable />
    </div>
  );
}