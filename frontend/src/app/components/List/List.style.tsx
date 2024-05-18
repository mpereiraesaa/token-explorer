'use client';

import { Box } from '@mui/material';

import type { Breakpoint } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

export const ListContainer = styled(Box)(
  ({ theme }) => ({
    padding: theme.spacing(1, 2),
    [theme.breakpoints.up('sm' as Breakpoint)]: {
      padding: theme.spacing(2, 3),
    },
    [theme.breakpoints.up('md' as Breakpoint)]: {
      padding: theme.spacing(3),
    },
  }),
);
