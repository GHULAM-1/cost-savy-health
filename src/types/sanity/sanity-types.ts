export interface HealthcareRecord {
    _id: string;
    provider_name: string;
    billing_code: string;
    billing_code_name: string;
    negotiated_rate: number;
    provider_city: string;
    provider_state: string;
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
    minRate?: string | number;
    providerName?: string;
  }
  
  export interface HealthcareQueryResponse {
    data: HealthcareRecord[];
    pagination: Pagination;
  }
  