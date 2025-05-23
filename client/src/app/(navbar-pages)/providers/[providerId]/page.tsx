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