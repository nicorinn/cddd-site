import type { NextPage } from 'next';
import Head from 'next/head';
import { Card, Container, Heading, Input, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { searchFullDatabase } from '../api/backend.api';
import { SearchResultsList } from '../components/searchResultsList';
import { SearchResults } from '../types';
import { debounce } from 'lodash';

const Home: NextPage = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults | null>(
    null
  );
  const [isSearching, setIsSearching] = useState(false);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === '/') {
      const searchBox = document.getElementById('searchBox');
      if (document.activeElement !== searchBox) {
        e.preventDefault();
        searchBox?.focus();
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const debouncedSearch = useMemo(() => debounce(performSearch, 500), []);

  async function performSearch(text: string) {
    if (text) {
      setIsSearching(true);
      (async () => {
        const res = await searchFullDatabase(text);
        setSearchResults(res);
      })();
      setIsSearching(false);
    } else {
      setSearchResults(null);
    }
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  }

  return (
    <div className="searchPage">
      <Head>
        <title>cDDD</title>
        <meta
          name="description"
          content="Database for discontinued cardiological drugs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="search">
        <Container minH="80vh" maxW={800}>
          <Heading textAlign="center" mb={5}>
            <Text as="span">Cardio Discontinued Drug Database</Text>
          </Heading>
          <Text textAlign="center" mb={10}>
            Search for compound, company, indications, and more...
          </Text>
          <Card backgroundColor="#222222">
            <Input
              id="searchBox"
              size="lg"
              placeholder="..."
              value={query}
              p={30}
              // top={-1}
              // right={-1}
              onChange={handleSearchChange}
            />
            {query && searchResults && (
              <SearchResultsList
                searchResults={searchResults}
                queryString={query}
                isLoading={isSearching}
              />
            )}
          </Card>
        </Container>
      </main>
    </div>
  );
};

export default Home;
