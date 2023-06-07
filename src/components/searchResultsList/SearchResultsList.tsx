import { Box, Button, VStack, Text, Card, Divider } from '@chakra-ui/react';
import { SearchResult, SearchResults } from '../../types';
import NextLink from 'next/link';
import { tableNames } from '@/utils';

interface SearchResultsListProps {
  searchResults: SearchResults;
  queryString: string;
  isLoading: boolean;
}

const categoryNames = {
  clinical_annotations: 'Clinical annotations',
  companies: 'Companies',
  compounds: 'Compounds',
  diseases: 'Diseases',
  gene_targets: 'Gene targets',
  indications: 'Indications',
  mechanisms_of_action: 'Mechanisms of action',
  pathway_annotations: 'Pathway annotations',
  repurposings: 'Repurposing efforts',
  targets: 'Targets',
};

function renderCategoryResults(
  category: keyof typeof categoryNames,
  results: SearchResult[]
) {
  return (
    <>
      <Text color="gray" noOfLines={0} fontWeight={600} mb={3}>
        {categoryNames[category]}
      </Text>
      <VStack className="searchResults" spacing={0} ml={5}>
        {results.map((result) => {
          const tableName = tableNames[category as keyof typeof tableNames];
          const urlFragment =
            category === 'compounds' ? 'details' : `list/${tableName}`;
          return (
            <Box width="100%" key={result.id}>
              <NextLink href={`/${urlFragment}/${result.id}`}>
                <Button
                  variant="ghost"
                  width="100%"
                  _hover={{ color: 'primary.lightMode' }}
                >
                  <Box textAlign="left" width="100%">
                    <Text
                      color="primary.darkMode"
                      noOfLines={0}
                      fontWeight={400}
                    >
                      {result.matched_field_value}
                    </Text>
                  </Box>
                </Button>
              </NextLink>
            </Box>
          );
        })}
      </VStack>
    </>
  );
}

function renderAllSearchResults(results: SearchResults) {
  return (
    <VStack spacing={5} divider={<Divider />} alignItems="left" p={5}>
      {Object.keys(results)
        .filter((key) => results[key as keyof SearchResults] !== null)
        .map((key) => {
          const categoryResults = results[key as keyof SearchResults];
          return renderCategoryResults(
            key as keyof SearchResults,
            categoryResults!
          );
        })}
    </VStack>
  );
}

const SearchResultsList: React.FC<SearchResultsListProps> = ({
  searchResults,
  queryString,
  isLoading,
}) => {
  return <>{renderAllSearchResults(searchResults)}</>;
};
export default SearchResultsList;
