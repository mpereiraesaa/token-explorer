'use client';
import React, { useCallback, useEffect } from 'react';
import { LoginButtonContainer } from '@/app/components/Navbar/';
import { useOnboarding } from '@/app/hooks/useOnboarding';
import { useAccount, useChainId, useSignMessage } from 'wagmi';
import { Chain, WELCOME_MESSAGE } from '@/constants/constants';
import { NotificationLevel, useErrorStore } from '@/app/stores/error';
import { useOnboardingStore } from '@/app/stores/onboarding';

export const LoginButton = () => {
  const [error, isPending, data, mutateAsync] = useOnboarding();
  const { setAuthentication, authenticated } = useOnboardingStore((state) => state);
  const { showNotification } = useErrorStore((state) => state);
  const { address } = useAccount();
  const chainId = useChainId();
  const { signMessageAsync } = useSignMessage();

  const handleShowNotification = useCallback(
    (title: string, subtitle: string, level: NotificationLevel) => {
      showNotification(title, subtitle, level);
    },
    [showNotification]
  );

  const handleSetAuthentication = useCallback(
    (success: boolean) => {
      setAuthentication(success);
    },
    [setAuthentication]
  );

  useEffect(() => {
    if (error) {
      handleShowNotification('Error', error.message, 'error');
    }
    if (data) {
      handleSetAuthentication(true);
      handleShowNotification('Success', 'Login successful', 'success');
    }
  }, [error, isPending, data, handleShowNotification, handleSetAuthentication]);

  const handleClick = async () => {
    const signature = await signMessageAsync({ message: WELCOME_MESSAGE });

    await mutateAsync({
      address: address as string,
      chain: Chain[chainId as keyof typeof Chain],
      signature: signature
    });
  };

  return (
    <LoginButtonContainer disabled={isPending || authenticated} onClick={handleClick} size='medium'>
      {authenticated ? 'Logged in' : 'Login'}
    </LoginButtonContainer>
  );
};
