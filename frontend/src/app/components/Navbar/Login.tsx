'use client';
import React, { useEffect } from 'react';
import { LoginButtonContainer } from '@/app/components/Navbar/';
import { useOnboarding } from '@/app/hooks/useOnboarding';
import { useAccount, useChainId, useSignMessage } from 'wagmi';
import { Chain, WELCOME_MESSAGE } from '@/constants/constants';
import { useErrorStore } from '@/app/stores/error';

export const LoginButton = () => {
  const [error, isPending, data, mutateAsync] = useOnboarding();
  const { showNotification } = useErrorStore((state) => state);
  const { address } = useAccount();
  const chainId = useChainId();
  const { signMessageAsync } = useSignMessage();

  useEffect(() => {
    if (error) {
      showNotification('Error', error.message, 'error');
    }
  }, [error, isPending, data, showNotification]);

  const handleClick = async () => {
    const signature = await signMessageAsync({ message: WELCOME_MESSAGE });

    await mutateAsync({
      address: address as string,
      chain: Chain[chainId as keyof typeof Chain],
      signature: signature
    });
  };

  return (
    <LoginButtonContainer onClick={handleClick} size='medium'>
      Login
    </LoginButtonContainer>
  );
};
