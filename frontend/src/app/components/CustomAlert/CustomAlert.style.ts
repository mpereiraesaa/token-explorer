'use client';
import type { BoxProps, Breakpoint } from '@mui/material';
import { Box } from '@mui/material';

import { styled } from '@mui/material/styles';

export const CustomAlertContainer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  position: 'fixed',
  left: 0,
  padding: theme.spacing(1.5),
  bottom: 0,
  zIndex: 2,
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    width: 'auto',
  },
}));
