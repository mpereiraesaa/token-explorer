'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  NavbarContainer as Container,
  Logo,
  LoginButton,
} from '.';
import { Box } from '@mui/material';

export const Navbar = () => {
  return (
    <Container>
      <Logo variant='default' />
      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <LoginButton />
        <ConnectButton chainStatus={'none'} />
      </Box>
    </Container>
  );
};
