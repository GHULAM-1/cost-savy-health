import client from '@/lib/sanity';
import { ArticleProps, HealthcareQueryParams, HealthcareQueryResponse, HealthcareRecord } from '@/types/sanity/sanity-types';
import { groq } from 'next-sanity';


export async function getHealthcareRecords({
  page = 1,
  limit = 10,
  state = '',
  minRate = '',
  providerName = ''
}: HealthcareQueryParams): Promise<HealthcareQueryResponse> {
  const filters = ['_type == "healthcareRecord"'];
  
  if (state) {
    filters.push(`provider_state == "${state}"`);
  }
  
  if (minRate && !isNaN(parseFloat(String(minRate)))) {
    filters.push(`negotiated_rate >= ${parseFloat(String(minRate))}`);
  }
  
  if (providerName) {
    filters.push(`provider_name match "${providerName}*"`);
  }
  
  const filterString = filters.join(' && ');
  
  const start = (page - 1) * limit;
  const end = start + limit;
  
  const dataQuery = `*[${filterString}][${start}...${end}] {
    _id,
    provider_name,
    billing_code,
    billing_code_name,
    negotiated_rate,
    provider_city,
    provider_state
  }`;
  
  const countQuery = `count(*[${filterString}])`;
  
  const [data, totalCount] = await Promise.all([
    client.fetch<HealthcareRecord[]>(dataQuery),
    client.fetch<number>(countQuery)
  ]);
  
  return {
    data,
    pagination: {
      total: totalCount,
      page,
      limit,
      pages: Math.ceil(totalCount / limit)
    }
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
        image: card.author.image
      },
      date: new Date(card.date).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
      }),
      readTime: card.readTime,
      sortOrder: card.sortOrder
    }));
    
    // Group articles by their associated main card
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
          image: author.image
        })),
        date: new Date(article.date).toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric'
        }),
        readTime: article.readTime
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
        image: author.image
      })),
      date: new Date(article.date).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
      }),
      readTime: article.readTime
    }));
    
    return {
      mainCards: formattedMainCards,
      articleGroups, 
      otherArticles: formattedOtherArticles || []
    };
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return {
      mainCards: [],
      articleGroups: {},
      otherArticles: []
    };
  }
}