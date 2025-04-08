import AllProviders from "@/components/providers/providers";
import { ProviderFaqs } from "@/components/providers/provider-faqs";
import { FeedbackSection } from "@/components/providers/feedback-section";

import React from "react";
import HealthcareDataTable from "@/components/data/data";

export default function Providers() {
  return (
    <div className="px-[16px]">
      <AllProviders />
      <FeedbackSection />
      <ProviderFaqs />
      <HealthcareDataTable />
    </div>
  );
}
