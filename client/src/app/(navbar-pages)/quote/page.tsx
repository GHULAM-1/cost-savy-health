import React from "react";
import { Metadata } from 'next';
import { generateMetadataTemplate } from '@/lib/metadata';
import QuoteContactPage from "@/components/quote/quote";

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataTemplate({
    title: 'Get Quote | Cost Savy Health',
    description: 'Get in touch with Cost Savy Health. We\'re here to help you find the best healthcare prices and answer any questions about our services.',
    keywords: [
      'contact Cost Savy Health',
      'healthcare support',
      'medical cost help',
      'healthcare questions',
      'customer support',
      'healthcare assistance'
    ],
    url: 'https://costsavyhealth.com/contact-us',
  });
}

export default function page() {
  return <QuoteContactPage />;
}
