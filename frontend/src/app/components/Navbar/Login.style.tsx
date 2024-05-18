'use client';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import { lightTheme } from '@rainbow-me/rainbowkit';

const rainbowTheme = lightTheme({});

export const LoginButtonContainer = styled(Button)(({ }) => ({
  background: '#ffffff', 
  color: '#000000',
  borderRadius: rainbowTheme.radii.connectButton,
  padding: '8px 16px',
  fontSize: '16px',
  fontWeight: 'bold',
  boxShadow: rainbowTheme.shadows.connectButton,
  border: '1px solid #e0e0e0',
  textTransform: 'none',
  marginRight: '10px',
  transition: 'transform 0.2s',
  '&:hover': {
    background: '#ffffff', 
    transform: 'scale(1.1)',
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
}));
