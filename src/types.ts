export interface AttributeListItem {
  text: string;
  id: string;
}

type AttributeList = AttributeListItem[];

export interface Compound {
  clinical_annotations?: AttributeList;
  company: string;
  company_id: string;
  created_at: string;
  discontinuation_phase: number;
  discontinuation_reason: string;
  discontinuation_year: number;
  diseases?: AttributeList;
  gene_targets?: AttributeList;
  id: string;
  indications?: AttributeList;
  link: string;
  mechanisms_of_action?: AttributeList;
  name: string;
  names?: string[];
  pathway_annotations?: AttributeList;
  repurposing_efforts: string;
  repurposing_id: string;
  repurposing_indications?: AttributeList;
  repurposing_phase: number;
  repurposing_updated_at: string;
  repurposing_year?: number;
  repurposing_company?: string;
  targets?: AttributeList;
  updated_at: Date;
}

export interface SearchResult {
  id: string;
  matched_field_value: string;
}

export interface SearchResults {
  clinical_annotations: SearchResult[] | null;
  companies: SearchResult[] | null;
  compounds: SearchResult[] | null;
  diseases: SearchResult[] | null;
  gene_targets: SearchResult[] | null;
  indications: SearchResult[] | null;
  mechanisms_of_action: SearchResult[] | null;
  pathway_annotations: SearchResult[] | null;
  repurposings: SearchResult[] | null;
  targets: SearchResult[] | null;
}

type CompoundAttribute =
  | 'clinical_annotation'
  | 'company'
  | 'compound'
  | 'compound_name'
  | 'disease'
  | 'gene_target'
  | 'indication'
  | 'mechanism_of_action'
  | 'pathway_annotation'
  | 'repurposing'
  | 'target';

type AttributeField = Record<CompoundAttribute, any>;

export interface CompoundSummary {
  id: string;
  name: string;
}

export interface CompoundsListResults extends AttributeField {
  compounds: CompoundSummary[];
}
