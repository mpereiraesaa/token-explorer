'use client';
import { Alert, AlertTitle, Slide } from '@mui/material';
import { SyntheticEvent, useEffect } from 'react';
import { CustomAlertContainer } from '.';
import { useErrorStore } from '@/app/stores/error';

export interface InfoAlertProps {
  title: string;
  subtitle: string;
  active: boolean;
}

export const CustomAlert = () => {
  const { title, subtitle, active, level, closeNotification } = useErrorStore((state) => state);
  const handleClose = (
    event: SyntheticEvent<Element, Event>,
  ) => {
    event.stopPropagation();
    closeNotification();
  };

  useEffect(() => {
    if (active) {
      setTimeout(() => {
        closeNotification();
      }, 5000);
    }
  }, [active, closeNotification]);

  return (
    <Slide
      direction="up"
      in={!closed && active}
      unmountOnExit
      appear={!closed && active}
      timeout={500}
      easing={'cubic-bezier(0.32, 0, 0.67, 0)'}
    >
      <CustomAlertContainer>
        <Alert severity={level} onClose={handleClose}>
          <AlertTitle>{title}</AlertTitle>
          {subtitle}
        </Alert>
      </CustomAlertContainer>
    </Slide>
  );
};
