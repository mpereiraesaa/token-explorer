'use client';
import { FC, useEffect } from "react";
import { useValidation } from "@/app/hooks/useValidation";
import { useOnboardingStore } from "@/app/stores/onboarding";
import { useAccount } from "wagmi";

const AuthValidationProvider: FC = () => {
  const { isConnected } = useAccount();
  const { success: isValidationSuccess } = useValidation();
  const setAuthentication = useOnboardingStore((state) => state.setAuthentication);

  useEffect(() => {
    setAuthentication(!!isValidationSuccess && isConnected);
  }, [isConnected, isValidationSuccess, setAuthentication]);

  return null;
};

export default AuthValidationProvider;
