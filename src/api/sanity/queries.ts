import client from '@/lib/sanity';
import { HealthcareQueryParams, HealthcareQueryResponse, HealthcareRecord } from '@/types/sanity/sanity-types';


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