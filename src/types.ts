export interface Compound {
  clinical_annotations?: string[];
  company: string;
  company_id: string;
  created_at: string;
  discontinuation_phase: number;
  discontinuation_reason: string;
  discontinuation_year: number;
  diseases?: string[];
  gene_targets?: string[];
  id: string;
  indications?: string[];
  link: string;
  mechanisms_of_action?: string[];
  name: string;
  names?: string[];
  pathway_annotations?: string[];
  repurposing_efforts: string;
  repurposing_id: string;
  repurposing_indications?: string[];
  repurposing_phase: number;
  repurposing_updated_at: string;
  repurposing_year: number;
  targets?: string[];
  updated_at: Date;
}

export interface SearchResult {
  id: string;
  matched_field_value: string;
}

export interface SearchResults {
  clinical_annotations: SearchResult[] | null;
  companies: SearchResult[] | null;
  compound_names: SearchResult[] | null;
  diseases: SearchResult[] | null;
  gene_targets: SearchResult[] | null;
  indications: SearchResult[] | null;
  mechanisms_of_action: SearchResult[] | null;
  pathway_annotations: SearchResult[] | null;
  repurposings: SearchResult[] | null;
  targets: SearchResult[] | null;
}
