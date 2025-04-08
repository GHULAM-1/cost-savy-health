import React, { Suspense } from "react";
import AllProviders from "@/components/providers/providers";
import { ProviderFaqs } from "@/components/providers/provider-faqs";
import { FeedbackSection } from "@/components/providers/feedback-section";

<<<<<<< HEAD
const LoadingProviders = () => (
  <div className="p-4 text-center">Loading providers...</div>
);
=======
import React from "react";
import HealthcareDataTable from "@/components/data/data";
>>>>>>> stagging

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