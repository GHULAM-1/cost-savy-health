// src/api/providerApi.ts

// Types
export interface Pagination {
  total: number;
}

export interface ProvidersResponse<T> {
  success: boolean;
  pagination: Pagination;
  data: T[];
}

export interface HealthcareRecord {
  _id: string;
  billing_code_name: string;
  billing_code_type: string;
  reporting_entity_name_in_network_files: string;
  provider_zip_code: number;
  provider_name: string;
  provider_city: string;
  provider_state: string;
  negotiated_rate: number;
}
interface EntitiesResponse {
    success: boolean;
    count: number;
    data: string[];
  }
  
  interface ZipsResponse {
    success: boolean;
    count: number;
    data: string[];
  }
  
  interface InsurersResponse {
    success: boolean;
    count: number;
    data: string[];
  }
  
  interface ErrorResponse {
    success: boolean;
    message: string;
  }
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  
  const fetchOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  };
  
  const apiRequest = async <T>(
    url: string,
    options: RequestInit,
    errorMessage: string
  ): Promise<T> => {
    try {
      const response = await fetch(url, options);
      const data = (await response.json()) as T | ErrorResponse;
  
      if (!response.ok) {
        const err = data as ErrorResponse;
        throw new Error(err.message || errorMessage);
      }
  
      return data as T;
    } catch (error) {
      console.error(`API error (${url}):`, error);
      throw error;
    }
  };
  
  export const getProviders = async (params: {
    searchCare?: string;
    zipCode?: string;
    insurance?: string;
    page?: number;
    limit?: number;
  }): Promise<ProvidersResponse<HealthcareRecord>> => {
    const qs = new URLSearchParams();
    if (params.searchCare) qs.set("searchCare", params.searchCare);
    if (params.zipCode) qs.set("zipCode", params.zipCode);
    if (params.insurance) qs.set("insurance", params.insurance);
    if (params.page) qs.set("page", params.page.toString());
    if (params.limit) qs.set("limit", params.limit.toString());
  
    const url = `${API_URL}/search?${qs.toString()}`;
    return apiRequest<ProvidersResponse<HealthcareRecord>>(
      url,
      { ...fetchOptions, method: "GET" },
      "Failed to fetch providers"
    );
  };
  export const getReportingEntities = async (
    search: string
  ): Promise<EntitiesResponse> => {
    const url = `${API_URL}/search/entities?search=${encodeURIComponent(
      search
    )}`;
    return apiRequest<EntitiesResponse>(url, { ...fetchOptions, method: "GET" }, "Failed to load reporting entities");
  };

  export const getZipCodesByEntityName = async (
    params: { entity?: string, query?: string }
  ): Promise<ZipsResponse> => {
    const qs = new URLSearchParams();
    if (params.entity) qs.set("entity", params.entity);
    if (params.query) qs.set("search", params.query);
    
    console.log('========== ZIP API DEBUG ==========');
    console.log('1. Parameters:', params);
    console.log('2. Query String:', qs.toString());
    
    const url = `${API_URL}/search/zips?${qs.toString()}`;
    console.log('3. Full URL:', url);
    
    const response = await apiRequest<ZipsResponse>(url, { ...fetchOptions, method: "GET" }, "Failed to load ZIP codes");
    console.log('4. API Response:', response);
    return response;
  };
  
  export const getInsurersByBillingCode = async (
    code: number | string
  ): Promise<InsurersResponse> => {
    const [searchCare, zipCode] = String(code).split("|");
    const qs = new URLSearchParams();
    if (searchCare) qs.set("searchCare", searchCare);
    if (zipCode) qs.set("zipCode", zipCode);
    
    const url = `${API_URL}/search/insurers?${qs.toString()}`;
    return apiRequest<InsurersResponse>(url, { ...fetchOptions, method: "GET" }, "Failed to load insurers");
  };
  export const getEntityRecords = async (
    entity: string,
    page: number = 1,
    limit: number = 50
  ):Promise<ProvidersResponse<HealthcareRecord>> => {
    const params = new URLSearchParams();
    params.set("searchCare", entity);
    params.set("page",   String(page));
    params.set("limit",  String(limit));
    const url = `${API_URL}/search/single-records?${params.toString()}`;
    return apiRequest<ProvidersResponse<HealthcareRecord>>(
      url,
      { ...fetchOptions, method: "GET" },
      "Failed to load entity records"
    );
  };

  export async function getCoordinates(zipCode: string): Promise<[number, number] | null> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&country=US&format=json`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
      return null;
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      return null;
    }
  }