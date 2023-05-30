import {
  Box,
  Container,
  Divider,
  Heading,
  LinkBox,
  Text,
  ListItem,
  SimpleGrid,
  VStack,
  LinkOverlay,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { CompoundSummary as CompoundListResult } from '@/types';
import { getCompoundsForAttribute } from '@/api/backend.api';
import NextLink from 'next/link';

const tableNames = {
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

const attributeStringMap = {
  clinical_annotation: 'annotation',
  company: 'name',
  compound_name: 'name',
  disease: 'name',
  gene_target: 'gene',
  indication: 'indication',
  mechanism_of_action: 'mechanism',
  pathway_annotation: 'annotation',
  repurposing: 'efforts',
  target: 'names',
};

const CompoundsList: React.FC<{ compounds: CompoundListResult[] }> = ({
  compounds,
}) => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={10}>
      {compounds.map((compound) => (
        <LinkBox
          key={compound.id}
          as="article"
          p={5}
          border="1px solid #222222"
          borderWidth={1}
          rounded="md"
          _hover={{ boxShadow: 'lg' }}
        >
          <Text fontSize="xl" fontWeight="semibold" mb={2}>
            <LinkOverlay as={NextLink} href={`/details/${compound.id}`}>
              {compound.name}
            </LinkOverlay>
          </Text>
        </LinkBox>
      ))}
    </SimpleGrid>
  );
};

const ListPage = () => {
  const router = useRouter();
  const [listResults, setListResults] = useState<CompoundListResult[] | null>(
    null
  );
  const [attribute, setAttribute] = useState<string | null>(null);

  useEffect(() => {
    if (router.query.slug) {
      const category = router.query.slug[0];
      const id = router.query.slug[1];
      if (id) {
        (async () => {
          const res = await getCompoundsForAttribute(
            tableNames[category as keyof typeof tableNames],
            id
          );
          if (res) {
            const attribute = Object.keys(res)[0];
            const stringFieldForAttribute =
              attributeStringMap[attribute as keyof typeof attributeStringMap];
            setAttribute(
              res[attribute as keyof typeof res][stringFieldForAttribute]
            );
            setListResults(res.compounds);
          }
        })();
      }
    }
  }, [router.query]);

  return (
    <div className="listPage">
      <Head>
        <title>cDDD</title>
        <meta
          name="description"
          content="Database for discontinued cardiological drugs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {listResults && attribute && (
        <Container maxW={1000}>
          <VStack mb={4}>
            <Heading textAlign="center">{attribute}</Heading>
            <Box></Box>
            <Divider />
          </VStack>
          <Box mt={5} mb={5}></Box>
          <Divider />
          <CompoundsList compounds={listResults} />
        </Container>
      )}
    </div>
  );
};

export default ListPage;
