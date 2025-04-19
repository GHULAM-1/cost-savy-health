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
    };
  }