import { Box, Container, Divider, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const ListPage = () => {
  const router = useRouter();
  const [list, setList] = useState<null>(null);

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
    <div className="listPage">
      <Head>
        <title>cDDD</title>
        <meta
          name="description"
          content="Database for discontinued cardiological drugs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {list && (
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

export default ListPage;
