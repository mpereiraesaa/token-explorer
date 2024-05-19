import { VALIDATION_ENDPOINT } from '@/constants/constants';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from "wagmi";
import { useCookies } from 'react-cookie';

export const useValidation = () => {
  const { isConnected } = useAccount();
  const [cookie, ] = useCookies(['jwt']);

  const { data, isLoading, error } = useQuery({
    queryKey: ['validation'],
    queryFn: async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/${VALIDATION_ENDPOINT}?jwt=${cookie.jwt}`);
      const result = await response.json();
      return result.success;
    },
    enabled: isConnected && cookie.jwt !== undefined,
  });

  return {
    success: data,
    isLoading,
    error,
  };
};
