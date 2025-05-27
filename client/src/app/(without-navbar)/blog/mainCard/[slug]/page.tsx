// app/blog/[slug]/page.tsx

import { PortableText } from "@portabletext/react";
import Link from "next/link";
import Image from "next/image";
import { fetchPostBySlug } from "@/api/sanity/queries";
import BlogNav from "@/components/blog/blog-nav";
import BlogHero from "@/components/blog/blog-hero";

interface Authors {
  name: string;
  image: string;
}
interface Post {
  _id: string;
  title: string;
  slug: { current: string; _type?: string };
  image?: string;
  description: string;
  content: any[];
  category: string;
  bulletPoints: string[];
  authors: Authors[];
  date: string;
  readTime: string;
  sortOrder: number;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;

  const post = await fetchPostBySlug(slug, "mainCard");
  return {
    title: post?.title ?? "Blog Post",
    openGraph: { images: post?.image ? [post.image] : [] },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;

  const post = (await fetchPostBySlug(slug, "mainCard")) as Post | null;
  if (!post) {
    return <div className="p-10 text-center text-red-500">Post no found.</div>;
  }
  const ptComponents = {
    block: {
      h2: ({ children }: any) => (
        <h2 className="text-2xl font-bold my-4">{children}</h2>
      ),
      normal: ({ children }: any) => (
        <p className="my-2 leading-relaxed">{children}</p>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 pl-4 italic my-4">
          {children}
        </blockquote>
      ),
    },

    marks: {
      link: ({ children, value }: any) => (
        <a
          href={value.href}
          className="underline text-blue-600"
          target="_blank"
          rel="noreferrer"
        >
          {children}
        </a>
      ),
    },

    types: {
      image: ({ value }: any) => (
        <Image
          src={value.asset.url}
          alt={value.alt || ""}
          width={800}
          height={400}
          className="rounded-lg my-6"
        />
      ),
    },

    // ← NEW: handle list wrappers
    list: {
      // for “bullet” lists
      bullet: ({ children }: any) => (
        <ul className="list-disc ml-6 my-4 space-y-2">{children}</ul>
      ),
      // for “numbered” lists
      number: ({ children }: any) => (
        <ol className="list-decimal ml-6 my-4 space-y-2">{children}</ol>
      ),
    },

    // ← OPTIONAL: customize each list item
    listItem: {
      bullet: ({ children }: any) => <li className="">{children}</li>,
      number: ({ children }: any) => <li className="">{children}</li>,
    },
  };

  return (
    <div className="max-w-[1660px] w-full mx-auto ">
      <BlogNav />
      <BlogHero />
      <article className="max-w-3xl mx-auto px-4 py-16 space-y-8">
        <header className="space-y-4">
          <p className="text-sm uppercase text-gray-500">{post.category}</p>
          <h1 className="text-4xl font-bold leading-tight">{post.title}</h1>

          <div className="flex items-center justify-between">
            {/* Avatars stacked with overlap */}
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {post.authors.map((a, i) => (
                  <Image
                    key={i}
                    src={a.image}
                    alt={a.name}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white"
                  />
                ))}
              </div>
              {/* Names joined by comma */}
              <p className="ml-4 text-sm font-medium text-gray-700">
                {post.authors.map((a) => a.name).join(", ")}
              </p>
            </div>

            {/* Date & read-time */}
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <span>{new Date(post.date).toLocaleDateString()}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        {post?.image && (
          <div className="w-full h-64 relative">
            <Image
              src={post?.image}
              alt={post?.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
        <div>
          <div className="prose prose-lg">
            <p className="font-bold text-2xl">{post.description}</p>{" "}
            <PortableText
              value={post.content || []}
              components={ptComponents}
            />
          </div>{" "}
        </div>
      </article>
    </div>
  );
}
