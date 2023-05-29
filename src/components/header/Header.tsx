import {
  HamburgerIcon,
  CloseIcon,
  QuestionOutlineIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';

const Header = () => {
  return (
    <Flex
      as="header"
      p={2}
      align="center"
      width="100%"
      bgColor="#222222"
      zIndex={9999}
      top={0}
    >
      <Box>
        <Link href="/" color="#e9e9e9">
          <Heading>cDDD</Heading>
        </Link>
      </Box>
      <Spacer />
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={IconButton}
              aria-label="menu"
              icon={
                isOpen ? (
                  <CloseIcon color="#222222" />
                ) : (
                  <HamburgerIcon color="#e9e9e9" />
                )
              }
              variant="ghost"
            />
            <MenuList
              defaultValue="test"
              bgColor="backgroundColor.darkMode"
              color="#e9e9e9"
            >
              <Link href="/info">
                <MenuItem
                  bgColor="backgroundColor.darkMode"
                  icon={<QuestionOutlineIcon />}
                  _focus={{ backgroundColor: 'backgroundColor.darkMode' }}
                >
                  Info
                </MenuItem>
              </Link>
            </MenuList>
          </>
        )}
      </Menu>
    </Flex>
  );
};

export default Header;
