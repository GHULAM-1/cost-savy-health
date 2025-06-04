import client from "@/lib/sanity";
import { GlossaryItem } from "@/types/providers-glossary/glossary-types";
import {
  ArticleProps,
  HealthcareQueryParams,
  HealthcareQueryResponse,
  HealthcareRecord,
} from "@/types/sanity/sanity-types";
import { groq } from "next-sanity";
interface Author {
  name: string;
  image: string;
}
export interface BlogMainCard {
  _id: string;
  title: string;
  slug: { current: string };
  image?: string;
  category: string;
  description: string;
  bulletPoints: string[];
  author: Author[];
  date: string;
  content: any[];
  readTime: string;
  sortOrder: number;
}

export interface OtherArticle {
  _id: string;
  title: string;
  slug: { current: string };
  image?: string;
  category: string;
  content: any[];
  description: string;
  authors: Author[];
  date: string;
  readTime: string;
}
export interface BlogArticle {
  _id: string;
  title: string;
  slug: { current: string };
  image: string;
  category: string;
  content: any[];
  description: string;
  body: any[];
  author: Author[];
  firstSocialLink?: string;
  secondSocialLink?: string;
  estimatedReadingTime: string;
  publishedAt: string;
  readNextArticles?: string[];
}

export async function searchReportingEntities(
  searchTerm: string,
  limit = 100
): Promise<string[]> {
  if (!searchTerm) return [];

  const results: string[] = await client.fetch(
    `*[
      _type == "healthcareRecord" &&
      billing_code_name match $term
    ].billing_code_name`,
    { term: `${searchTerm}*` }
  );

  return Array.from(new Set(results)).slice(0, limit);
}

export async function getZipCodesByEntityName(name: string): Promise<string[]> {
  if (!name) return [];

  const result: string[] = await client.fetch(
    `*[
      _type == "healthcareRecord" &&
      billing_code_name match $name
    ].provider_zip_code`,
    { name: `${name}*` }
  );

  return Array.from(new Set(result)).filter(Boolean);
}
export async function getInsurersByBillingCode(
  billingName: string
): Promise<string[]> {
  if (!billingName) return [];

  const insurers: string[] = await client.fetch(
    `*[
       _type == "healthcareRecord" &&
       billing_code_name match $billingName
     ].reporting_entity_name`,
    { billingName: `${billingName}*` }
  );

  return Array.from(new Set(insurers)).filter(Boolean);
}
export async function getHealthcareRecordById(
  id: string
): Promise<HealthcareRecord | null> {
  if (!id) return null;

  const query = `*[
    _type == "healthcareRecord" &&
    _id == $id
  ][0]{
    _id,
    provider_name,
    billing_code_name,
    negotiated_rate,
    provider_city,
    provider_state,
    provider_zip_code,
    reporting_entity_name
  }`;

  return client.fetch<HealthcareRecord | null>(query, { id });
}

export async function getHealthcareRecords({
  page = 1,
  limit = 10,
  state = "",
  zipCode = "",
  providerName = "",
  insurance = "",
}: HealthcareQueryParams): Promise<HealthcareQueryResponse> {
  const filters: string[] = ['_type == "healthcareRecord"'];

  if (state) filters.push(`provider_state == "${state}"`);
  if (zipCode) filters.push(`provider_zip_code == "${zipCode}"`);
  if (providerName) filters.push(`billing_code_name match "${providerName}*"`);
  if (insurance) filters.push(`reporting_entity_name match "${insurance}*"`);

  const filterExpr = filters.join(" && ");
  const start = (page - 1) * limit;
  const end = start + limit;

  const dataQuery = `*[${filterExpr}][${start}...${end}] {
    _id,
    provider_name,
    billing_code_name,
    negotiated_rate,
    provider_city,
    provider_state,
    provider_zip_code
  }`;

  const countQuery = `count(*[${filterExpr}])`;

  const [data, total] = await Promise.all([
    client.fetch<HealthcareRecord[]>(dataQuery),
    client.fetch<number>(countQuery),
  ]);
  console.log("Query:" + data);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
}

export async function getUniqueStates(): Promise<string[]> {
  const query = `*[_type == "healthcareRecord"].provider_state`;
  const states = await client.fetch<string[]>(query);
  return [...new Set(states)].filter(Boolean).sort();
}

export async function getBlogData() {
  const query = groq`{
    "mainCards": *[_type == "blogMainCard"] | order(sortOrder asc) {
      _id,
      title,
      "image": image.asset->url,
      category,
      bulletPoints,
      "author": {
        "name": authors[0].author->name,
        "image": authors[0].author->image.asset->url
      },
      date,
      slug,
      readTime,
      sortOrder
    },
    "articles": *[_type == "blogArticle"] {
      _id,
      title,
      "image": image.asset->url,
      category,
      description,
      "authors": authors[]{
        "name": author->name,
        "image": author->image.asset->url
      },
      date,
      slug,
      readTime,
      "mainCardId": mainCardRef->_id
    },
    "otherArticles": *[_type == "otherArticle"] | order(_createdAt desc) {
      _id,
      title,
      "image": image.asset->url,
      category,
      description,
      "authors": authors[]{
        "name": author->name,
        "image": author->image.asset->url
      },
      slug,
      date,
      readTime
    }
  }`;

  try {
    const result = await client.fetch(query);

    const formattedMainCards = result.mainCards.map((card: any) => ({
      _id: card._id,
      image: card.image,
      category: card.category,
      title: card.title,
      bulletPoints: card.bulletPoints || [],
      author: {
        name: card.author.name,
        image: card.author.image,
      },
      date: new Date(card.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      slug: card.slug.current,
      readTime: card.readTime,
      sortOrder: card.sortOrder,
    }));

    const articleGroups: Record<string, any[]> = {};
    result.articles.forEach((article: any) => {
      if (!articleGroups[article.mainCardId]) {
        articleGroups[article.mainCardId] = [];
      }

      articleGroups[article.mainCardId].push({
        _id: article._id,
        image: article.image,
        category: article.category,
        title: article.title,
        description: article.description,
        authors: article.authors.map((author: any) => ({
          name: author.name,
          image: author.image,
        })),
        date: new Date(article.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        slug: article.slug.current,
        readTime: article.readTime,
      });
    });

    const formattedOtherArticles = result.otherArticles.map((article: any) => ({
      _id: article._id,
      image: article.image,
      category: article.category,
      title: article.title,
      description: article.description,
      authors: article.authors.map((author: any) => ({
        name: author.name,
        image: author.image,
      })),
      date: new Date(article.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      slug: article.slug.current,
      readTime: article.readTime,
    }));

    return {
      mainCards: formattedMainCards,
      articleGroups,
      otherArticles: formattedOtherArticles || [],
    };
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return {
      mainCards: [],
      articleGroups: {},
      otherArticles: [],
    };
  }
}

function mapToGlossary(arr: any[], tab: GlossaryItem["tab"]): GlossaryItem[] {
  return arr.map((doc) => ({
    id: doc._id,
    name: doc.name,
    location: doc.location || "",
    description: doc.description || "",
    state: doc.state || "",
    tab,
  }));
}

export async function fetchProcedures(): Promise<GlossaryItem[]> {
  const query = groq`
    *[_type == "procedure"]{
      _id,
      "name": title,
      "location": "",                           // no location for procedures
      "description": introduction[0].children[0].text,
      "state": "" ,                             // adjust if you added state
    }
  `;
  const res = await client.fetch<any[]>(query);
  return mapToGlossary(res, "procedures");
}

export async function fetchProviders(): Promise<GlossaryItem[]> {
  const query = groq`
    *[_type == "provider"]{
      _id,
      "name": name,
      "location": address.city + ", " + address.state,
      "description": providerType,
      "state": address.state,
    }
  `;
  const res = await client.fetch<any[]>(query);
  return mapToGlossary(res, "dynProviders");
}

export async function fetchHealthSystems(): Promise<GlossaryItem[]> {
  const docs = await client.fetch(`*[_type == "healthSystem"]`);

  return (docs as any[]).map((doc) => ({
    id: doc._id,
    name: doc.name,
    location: doc.locations?.[0]
      ? `${doc.locations[0].city}, ${doc.locations[0].state}`
      : "",
    description: doc.isVerified ? "Verified" : "Unverified",
    state: doc.locations?.[0]?.state || "",
    tab: "healthSystems",
  }));
}

export const getProviderByIdQuery = groq`
  *[_type == "provider" && _id == $id][0] {
    _id,
    name,
    address,
    phone,
    medicareProviderId,
    npi,
    website,
    providerType,
    ownership,
    beds,
    nearbyProviders,
    clinicalServices
  }
`;

export async function getProviderById(id: string) {
  return await client.fetch(getProviderByIdQuery, { id });
}
export const getProviderByNameQuery = groq`
  *[_type == "provider" && name == $name][0] {
    _id,
    name,
    address,
    phone,
    medicareProviderId,
    npi,
    website,
    providerType,
    ownership,
    beds,
    nearbyProviders,
    clinicalServices
  }
`;

export async function getProviderByName(name: string) {
  return await client.fetch(getProviderByNameQuery, { name });
}

export const getHealthSystemByIdQuery = groq`
  *[_type == "healthSystem" && _id == $id][0] {
    _id,
    name,
    isVerified,
    claimUrl,
    locations[] {
      facilityName,
      street,
      city,
      state,
      zip
    },
    services
  }
`;

export async function getHealthSystemById(id: string) {
  return await client.fetch(getHealthSystemByIdQuery, { id });
}

export async function getAboutPage() {
  // Query for the 'about' object itself, not wrapped in an extra field
  const query = groq`
    *[_type == "aboutPage"][0].about{
      hero { badgeText, title, description, buttonText, buttonLink, "imageUrl": image.asset->url },
      vision { headline, subtext, "imageUrl": image.asset->url },
      transparency { introTitle, introText, values[]{ type, text }, "roleImageUrl": roleImage.asset->url, imageCaption },
      serviceHighlight { heading, ctaText, ctaLink, features[]{ value, title, content, "imageUrl": image.asset->url } },
      collaborativePanel { heading, subtext, ctaText, ctaLink, features[]{ title, description, iconName } },
      testimonial { testimonial, reference, "imageUrl": image.asset->url },
      leadership { title, description, members[]->{ name, role, "defaultImage": defaultImage.asset->url, "hoverImage": hoverImage.asset->url, linkedin } },
      joinTeam { heading, description, "imageUrl": image.asset->url, ctaText, ctaLink },
      advisors[]->{ name, title, "imageUrl": image.asset->url, linkedin },
      investors[]->{ name, title, "imageUrl": image.asset->url, linkedin }
    }
  `;

  // This will now return the shell of your about object directly
  const about = await client.fetch(query);
  if (!about) {
    throw new Error("About page content not found in Sanity");
  }
  return about;
}
export async function medicare() {
  const medicareQuery = groq`
  *[_type == "medicare"]{
    _id,
    heading,
    description,
    number,
    "imageUrl": image.asset->url,
    featuresGrid[]{
      heading,
      description,
      readmore,
      "imageUrl": image.asset->url
    }
  }
`;
  const data = await client.fetch(medicareQuery);
  if (!data) {
    throw new Error("medicare page content not found in Sanity");
  }
  return data;
}
export async function indiviual() {
  const indiviualQuery = groq`
  *[_type == "indiviual"]{
    _id,
    heading,
    description,
    number,
    "imageUrl": image.asset->url,
    featuresGrid[]{
      heading,
      description,
      readmore,
      "imageUrl": image.asset->url
    }
  }
`;
  const data = await client.fetch(indiviualQuery);
  if (!data) {
    throw new Error("indiviual page content not found in Sanity");
  }
  return data;
}
export async function contactUs() {
  const contactQuery = groq`
  *[_type == "contact"]{
    _id,
    heading,
    description,
    subDescription,
}
`;
  const data = await client.fetch(contactQuery);
  if (!data) {
    throw new Error("contact page content not found in Sanity");
  }
  return data;
}
export async function getHomePage() {
  const query = groq`
    *[_type == "homePage"][0]{
      hero,
      featureCards { cards[] { title, points, "image": image.asset->url } },
      shopHealthcare {
        heading,
        description,
        "iconImage": iconImage.asset->url,
        services {
          sectionTitle,
          items[] {
            name,
            link
          }
        }
      },
      priceTransparency {
        heading,
        description,
        ctaText,
        ctaLink,
        features[] {
          icon,
          title,
          description
        }
      },
      testimonial {
        testimonial,
        "image": image.asset->url
      },
      enterprise {
        heading,
        description,
        ctaText,
        ctaLink,
        "iconImage": iconImage.asset->url,
        features[] {
          value,
          title,
          content,
          "image": image.asset->url
        }
      },
enterpriseSolutions {
  solutions[] {
    title,
    description,
    link,
    "iconImage": iconImage.asset->url
  }
},

      joinTeam {
        heading,
        description,
        ctaText,
        "image": image.asset->url
      }
    }
  `;
  const data = await client.fetch(query);
  if (!data) {
    throw new Error("Home page content not found in Sanity");
  }
  return data;
}

// Fetch mainCard by slug
export async function sanityFetchMainCardBySlug(
  slug: string
): Promise<BlogMainCard | null> {
  const query = groq`*[_type == "blogMainCard" && slug.current == $slug][0]{
    _id,
    title,
    description,
    "image": image.asset->url,
    category,
    bulletPoints,
    "authors": authors[]{
      "name": author->name,
      "image": author->image.asset->url
    },
    content,
    date,
    slug,
    readTime,
    sortOrder
  }`;
  return client.fetch<BlogMainCard>(query, { slug });
}

// Fetch article by slug
export async function sanityFetchArticleBySlug(
  slug: string
): Promise<BlogArticle | null> {
  console.log("hi");
  const query = groq`*[_type == "blogArticle" && slug.current == $slug][0]{
    _id,
    title,
    "image": image.asset->url,
    category,
    description,
    "authors": authors[]{
      "name": author->name,
      "image": author->image.asset->url
    },
    content,
    date,
    slug,
    readTime,
    "mainCardId": mainCardRef->_id,
    slug
  }`;
  return client.fetch<BlogArticle>(query, { slug });
}

// Fetch otherArticle by slug
export async function sanityFetchOtherBySlug(
  slug: string
): Promise<OtherArticle | null> {
  const query = groq`*[_type == "otherArticle" && slug.current == $slug][0]{
    _id,
    title,
    "image": image.asset->url,
    category,
    description,
    "authors": authors[]{
      "name": author->name,
      "image": author->image.asset->url
    },
    date,
    slug,
    readTime,
    slug
  }`;
  return client.fetch<OtherArticle>(query, { slug });
}

export async function fetchPostBySlug(
  slug: string,
  type: "mainCard" | "article" | "other"
) {
  switch (type) {
    case "mainCard":
      return sanityFetchMainCardBySlug(slug);
    case "article":
      return sanityFetchArticleBySlug(slug);
    case "other":
      return sanityFetchOtherBySlug(slug);
  }
}

export async function getProcedureByTitle(title: string) {
  const query = groq`
    *[_type == "procedure" && title match $title][0]{
      _id,
      title,
      averageCashPrice,
      introduction,
      sections[]{heading, content},
      conclusion
    }
  `;

  return client.fetch(query, { title: `*${title}*` });
}
