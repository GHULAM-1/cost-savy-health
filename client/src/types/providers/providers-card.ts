export interface ProviderCardProps {
  facility: {
    id: string;
    name: string;
    type: string;
    location: {
      city: string;
      state: string;
      distance: number;
    };
    rating: number | null;
    price: number;
    inNetwork: boolean;
    initial: string;
    showVerfication: boolean;
  };
}

// New interface to match the data structure from getProviderByName (Sanity)
export interface SanityProviderRecord {
  _id: string;
  provider_name?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  phone?: string | null;
  website?: string | null;
  procedure_name?: string;
  billing_code?: string;
  insurance_providers?: Array<{ name: string }>;
  // Add other fields as necessary from your Sanity schema
}
