export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: "faq-1",
    question: "How can I make the most of the information provided?",
    answer:
      "To make the most of the information provided, start by reviewing the services, pricing, and coverage details available. Compare different providers and make sure to contact them if you have specific questions about the service you’re seeking. Always confirm insurance acceptance and coverage details with the provider before scheduling an appointment.",
  },
  {
    id: "faq-2",
    question:
      "Do my search results include an exhaustive list of providers that offer the service I'm looking for?",
    answer:
      "The search results are based on the information we have at our disposal and may not always reflect every possible provider for your chosen service. If you do not see a specific provider, consider reaching out to them directly or contacting your insurance company for a complete list of in-network providers.",
  },
  {
    id: "faq-3",
    question: "Why isn't my insurance plan listed?",
    answer:
      "We continually update our database, but not all insurance plans may be reflected. If you don't see your plan, you can contact your insurance company or the provider directly to verify coverage and costs.",
  },
  {
    id: "faq-4",
    question: "What if I can't find the service I'm looking for?",
    answer:
      "If you can’t find the service you’re looking for, try adjusting your search terms or broadening your location range. You can also contact your insurance company or provider to see if they offer the service and whether it’s covered under your plan.",
  },
  {
    id: "faq-5",
    question: "What does the estimated price include?",
    answer:
      "The estimated price typically includes the base procedure cost, facility fees, and sometimes physician fees. However, it may not cover additional services such as lab work, imaging, or follow-up visits. Always confirm the full scope of your costs with the provider.",
  },
  {
    id: "faq-6",
    question: "How does Cost Savvy determine price accuracy?",
    answer:
      "We gather pricing data from various sources, including providers, insurers, and public datasets. We use proprietary methods to analyze and present the most accurate estimates possible. For the most precise information, we recommend confirming with the provider.",
  },
  {
    id: "faq-7",
    question:
      "I’m using insurance. How do I estimate my out-of-pocket costs vs. what I can expect insurance to cover?",
    answer:
      "Your out-of-pocket cost depends on factors such as deductibles, copays, and coinsurance. The best way to estimate your share is to contact your insurance company or check your policy details. You can also request a pre-authorization or cost estimate from your provider.",
  },
  {
    id: "faq-8",
    question:
      "I enrolled in a government-sponsored healthcare program. Can I use Cost Savvy to find prices for care?",
    answer:
      "You should not use Cost Savvy Health to compare prices if you are enrolled in a Medicare or Medicaid plan. Contact Medicare or your state’s Medicaid program directly for more information about coverage and costs.",
  },
];
