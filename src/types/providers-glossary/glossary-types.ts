// Shared type definitions for the glossary components

export interface GlossaryItem {
    id: string | number;
    name: string;
    location?: string;
    description?: string;
    state?: string;
  }
  
  export interface SearchOption {
    id: string | number;
    name: string;
  }
  
  export interface StateOption {
    id: string | number;
    name: string;
  }
  
  export interface TabType {
    id: string;
    label: string;
    hasSearch: boolean;
    hasStateFilter?: boolean;
  }
  
  export interface SearchFieldType {
    value: string;
    onChange: (value: string) => void;
  }
  
  export interface GlossaryDataType {
    [key: string]: GlossaryItem[];
  }
  
  export interface SearchOptionsType {
    [key: string]: SearchOption[];
  }