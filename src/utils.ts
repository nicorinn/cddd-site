export function isString(data: string | string[]): data is string {
  return typeof data === 'string';
}

export const tableNames = {
  clinical_annotations: 'clinical_annotation',
  companies: 'company',
  compounds: 'compound',
  compound_names: 'compound_name',
  diseases: 'disease',
  gene_targets: 'gene_target',
  indications: 'indication',
  mechanisms_of_action: 'mechanism_of_action',
  pathway_annotations: 'pathway_annotation',
  repurposings: 'repurposing',
  targets: 'target',
};
