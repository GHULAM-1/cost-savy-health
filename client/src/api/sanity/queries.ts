import client from "@/lib/sanity";
import { GlossaryItem } from "@/types/providers-glossary/glossary-types";
import {
  ArticleProps,
  HealthcareQueryParams,
  HealthcareQueryResponse,
  HealthcareRecord,
} from "@/types/sanity/sanity-types";
import { groq } from "next-sanity";

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
  return mapToGlossary(res,"dynProviders");
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