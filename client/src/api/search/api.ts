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
  reporting_entity_name_in_network_files: string;
  provider_zip_code: number;
  provider_name: string;
  provider_city: string;
  provider_state: string;
  negotiated_rate: number;
  // …other fields as needed
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
    entity: string
  ): Promise<ZipsResponse> => {
    const url = `${API_URL}/search/zips?entity=${encodeURIComponent(
      entity
    )}`;
    return apiRequest<ZipsResponse>(url, { ...fetchOptions, method: "GET" }, "Failed to load ZIP codes");
  };
  
  export const getInsurersByBillingCode = async (
    code: number | string
  ): Promise<InsurersResponse> => {
    const url = `${API_URL}/search/insurers?code=${encodeURIComponent(
      String(code)
    )}`;
    return apiRequest<InsurersResponse>(url, { ...fetchOptions, method: "GET" }, "Failed to load insurers");
  };
  