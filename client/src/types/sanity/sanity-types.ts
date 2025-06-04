export interface HealthcareRecord {
  _id: string;
  provider_name: string;
  billing_code: string;
  billing_code_name: string;
  negotiated_rate: number;
  provider_city: string;
  provider_state: string;
  provider_zip_code: string;
  billing_code_type:string;
}
// Nested address structure
interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

// Main provider payload
export interface Provider {
  _id: string;
  name: string;
  address: Address;
  phone: string;
  providerType: string;
  ownership: string;
  npi: string;
  website: string;
  beds: number;
  medicareProviderId: string | null;
  clinicalServices: string[];
  nearbyProviders: string[];
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}
export interface HealthcareQueryParams {
  page?: number;
  limit?: number;
  state?: string;
  zipCode?: string;
  providerName?: string;
  insurance?: string;
}

export interface HealthcareQueryResponse {
  data: HealthcareRecord[];
  pagination: Pagination;
}

export interface MainCardProps {
  _id: string;
  image: string;
  category: string;
  title: string;
  bulletPoints: string[];
  author: {
    name: string;
    image: string;
  };
  date: string;
  readTime: string;
}

export interface ArticleProps {
  _id: string;
  image: string;
  category: string;
  title: string;
  description: string;
  authors: {
    name: string;
    image: string;
  }[];
  date: string;
  readTime: string;
}
