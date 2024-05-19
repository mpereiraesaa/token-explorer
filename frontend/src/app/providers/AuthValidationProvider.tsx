'use client';
import { FC, useEffect } from "react";
import { useValidation } from "@/app/hooks/useValidation";
import { useOnboardingStore } from "@/app/stores/onboarding";

const AuthValidationProvider: FC = () => {
  const { success: isValidationSuccess } = useValidation();
  const setAuthentication = useOnboardingStore((state) => state.setAuthentication);

  useEffect(() => {
    setAuthentication(!!isValidationSuccess);
  }, [isValidationSuccess, setAuthentication]);

  return null;
};

export default AuthValidationProvider;
