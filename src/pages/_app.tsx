import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  Box,
  Center,
  ChakraProvider,
  extendTheme,
  ThemeConfig,
} from '@chakra-ui/react';
import { Header } from '../components/header';

const colors = {
  primary: {
    lightMode: '#222222',
    darkMode: '#e9e9e9',
  },
  backgroundColor: {
    lightMode: '#e9e9e9',
    darkMode: '#222222',
  },
  // TODO remove important
  // Actually unbelievable that this is getting ignored no matter what
  input: { background: '#bdbdbd !important', focus: '#323232 !important' },
};

const theme: ThemeConfig = extendTheme({
  fonts: {
    body: 'Epilogue, sans-serif',
    heading: 'Epilogue, sans-serif',
  },
  colors,
  styles: {
    global: {
      body: {
        bg: colors.backgroundColor.lightMode,
        color: colors.primary.lightMode,
      },
    },
  },
  components: {
    Input: {
      baseStyle: {
        field: {
          backgroundColor: colors.input.background,
          _hover: {
            backgroundColor: colors.input.background,
            border: '0 !important',
            boxShadow: 'none !important',
          },
          _focus: {
            backgroundColor: colors.input.focus,
            color: colors.backgroundColor.lightMode,
            border: '0 !important',
            boxShadow: 'none !important',
          },
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Box mt={10} mb={20}>
        <Component {...pageProps} />
      </Box>
      <Box margin="auto" bottom={0} p={5} width="100%">
        <Center>&copy; cDDD 2023</Center>
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
