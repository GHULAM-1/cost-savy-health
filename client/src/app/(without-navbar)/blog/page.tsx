import { Metadata } from 'next';
import { generateMetadataTemplate } from '@/lib/metadata';
import BlogPage from "@/components/blog/blog-page";

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataTemplate({
    title: 'Healthcare Blog | Cost Savy Health',
    description: 'Stay informed with the latest healthcare news, cost-saving tips, and insights about medical procedures and healthcare pricing.',
    keywords: [
      'healthcare blog',
      'medical news',
      'healthcare tips',
      'medical costs',
      'healthcare insights',
      'medical procedures',
      'healthcare pricing'
    ],
    url: 'https://costsavyhealth.com/blog',
  });
}

export default async function Blog() {
  return (
    <div>
      <BlogPage />
    </div>
  );
}
