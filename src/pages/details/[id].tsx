import {
  Box,
  Container,
  Divider,
  useBreakpointValue,
  VStack,
  Text,
  Flex,
  Heading,
  Link,
  StackDivider,
  Badge,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { getCompoundById } from '@/api/backend.api';
import { isString } from 'lodash';
import { AttributeListItem, Compound } from '@/types';
import NextLink from 'next/link';
import { tableNames } from '@/utils';

const CompoundCard: React.FC<{ compound: Compound }> = ({ compound }) => {
  const fontSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });

  const displayArray = (
    label: string,
    tableName: string,
    array?: AttributeListItem[],
    badge = false
  ) => {
    return array && array.length > 0 ? (
      <VStack align="start" spacing={1} overflow="hidden">
        <Text fontSize={fontSize} fontWeight="bold">
          {label}
        </Text>
        {array.map((item, i) =>
          badge ? (
            <NextLink key={i} href={`/list/${tableName}/${item.id}`}>
              <Badge
                fontSize="sm"
                overflow="scroll"
                textOverflow="ellipsis"
                maxW={400}
              >
                {item.text}
              </Badge>
            </NextLink>
          ) : (
            <Text key={i}>{item.text}</Text>
          )
        )}
      </VStack>
    ) : null;
  };

  const flexDir = useBreakpointValue({ base: 'column', md: 'row' });
  const stackWidth = useBreakpointValue({ base: '100%', md: '48%' });

  return (
    <Box
      p={10}
      shadow="md"
      borderWidth="1px"
      flex="1"
      borderRadius="md"
      bgColor="white"
      color="black"
    >
      <Flex justifyContent="space-between">
        <Heading fontSize="4xl">{compound.names?.join(', ')}</Heading>
        <Link href={compound.link} isExternal color="blue.500">
          More Info
        </Link>
      </Flex>
      <Flex
        justify="space-between"
        mt={5}
        // @ts-ignore
        direction={flexDir}
      >
        <VStack
          align="start"
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          width={stackWidth}
        >
          <Text fontSize={fontSize}>
            <Text as="span" fontWeight="bold">
              Company:
            </Text>{' '}
            {compound.company}
          </Text>
          {displayArray(
            'Clinical Annotations',
            'clinical_annotation',
            compound.clinical_annotations
          )}
          {displayArray('Diseases', 'disease', compound.diseases, true)}
          {displayArray(
            'Gene Targets',
            'gene_target',
            compound.gene_targets,
            true
          )}
          {displayArray('Indications', 'indication', compound.indications)}
          {displayArray(
            'Pathway Annotations',
            'pathway_annotation',
            compound.pathway_annotations
          )}
        </VStack>
        <VStack align="start" spacing={4} width={stackWidth}>
          <Text fontSize={fontSize}>
            <Text as="span" fontWeight="bold">
              Discontinuation Reason:
            </Text>{' '}
            <Text overflowWrap="break-word" fontSize="md">
              {compound.discontinuation_reason || 'N/A'}
            </Text>
          </Text>
          <Text fontSize={fontSize}>
            <Text as="span" fontWeight="bold">
              Discontinuation Year:
            </Text>{' '}
            {compound.discontinuation_year || 'N/A'}
          </Text>
          <Text fontSize={fontSize}>
            <Text as="span" fontWeight="bold">
              Discontinuation Phase:
            </Text>{' '}
            {compound.discontinuation_phase || 'N/A'}
          </Text>
          <Divider borderColor="gray.200" />
          <Text fontSize={fontSize}>
            <Text as="span" fontWeight="bold">
              Repurposing Efforts:
            </Text>{' '}
            {compound.repurposing_efforts || 'N/A'}
          </Text>
          <Text fontSize={fontSize}>
            <Text as="span" fontWeight="bold">
              Repurposing Phase:
            </Text>{' '}
            {compound.repurposing_phase || 'N/A'}
          </Text>
          <Text fontSize={fontSize}>
            <Text as="span" fontWeight="bold">
              Repurposing Year:
            </Text>{' '}
            {compound.repurposing_year || 'N/A'}
          </Text>
          <Text fontSize={fontSize}>
            <Text as="span" fontWeight="bold">
              Repurposing Company:
            </Text>{' '}
            {compound.repurposing_company || 'N/A'}
          </Text>
          <Text fontSize={fontSize}>
            <Text as="span" fontWeight="bold">
              Updated at:
            </Text>{' '}
            {new Date(compound.updated_at).toLocaleDateString()}
            {displayArray(
              'Repurposing Indications',
              'indication',
              compound.repurposing_indications
            )}
          </Text>
          {compound.mechanisms_of_action?.length && (
            <Divider borderColor="gray.200" />
          )}
          {displayArray(
            'Mechanisms of Action',
            'mechanism_of_action',
            compound.mechanisms_of_action
          )}
          {compound.targets?.length && <Divider borderColor="gray.200" />}
          {displayArray('Targets', 'target', compound.targets)}
        </VStack>
      </Flex>
    </Box>
  );
};

const DetailsPage = () => {
  const router = useRouter();
  const [compound, setCompound] = useState<null | Compound>(null);

  useEffect(() => {
    const { id } = router.query;
    if (id && isString(id)) {
      (async () => {
        const res = await getCompoundById(id);
        console.log(res);
        setCompound(res);
      })();
    }
  }, [router.query]);

  return (
    <div className="detailsPage">
      <Head>
        <title>cDDD</title>
        <meta
          name="description"
          content="Database for discontinued cardiological drugs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {compound && (
        <Container maxWidth={1000}>
          <CompoundCard compound={compound} />
        </Container>
      )}
    </div>
  );
};

export default DetailsPage;
