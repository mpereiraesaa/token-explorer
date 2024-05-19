import { ONBOARDING_ENDPOINT } from "@/constants/constants";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from 'react-cookie';

interface OnboardingRequest {
    address: string;
    chain: string;
    signature: string;
}

const onboardingRequest = async (data: OnboardingRequest) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${ONBOARDING_ENDPOINT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error("Server error: " + data.message || "Something went wrong");
    }

    return response.json();
};

export const useOnboarding: () => [Error | null, boolean, any, (data: OnboardingRequest) => void] = () => {
  const [, setCookie] = useCookies(['jwt']);
  const mutation = useMutation({
    mutationFn: onboardingRequest,
    onSuccess: (data) => {
      setCookie('jwt', data.responseObject.jwt, {
        path: '/',
        expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000), // Cookie expires in one month
        sameSite: true,
      });
    },
  });

  return [mutation.error, mutation.isPending, mutation.data, mutation.mutateAsync];
};
