import {
  Box,
  Container,
  Divider,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const DetailsPage = () => {
  const router = useRouter();
  const [details, setDetails] = useState<null>(null);

  useEffect(() => {
    if (router.query.slug) {
      const category = router.query.slug[0];
      const id = router.query.slug[1];
      if (id) {
        (async () => {})();
      }
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
      {details && (
        <Container>
          <VStack mb={4}>
            {/* <Heading textAlign="center">{// TODO}</Heading> */}
            <Box></Box>
            <Divider />
          </VStack>
          <Box mt={5} mb={5}></Box>
          <Divider />
        </Container>
      )}
    </div>
  );
};

export default DetailsPage;
