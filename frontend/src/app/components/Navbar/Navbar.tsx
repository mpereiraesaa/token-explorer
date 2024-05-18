'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  NavbarContainer as Container,
  Logo,
  LoginButton,
} from '.';
import { Box } from '@mui/material';
import { useAccount } from 'wagmi';

export const Navbar = () => {
  const { isConnected } = useAccount();

  return (
    <Container>
      <Logo variant='default' />
      <Box display="flex" alignItems="center" justifyContent="flex-end">
        {isConnected && <LoginButton />}
        <ConnectButton chainStatus={'none'} />
      </Box>
    </Container>
  );
};
