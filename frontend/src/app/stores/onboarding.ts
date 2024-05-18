import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

export interface OnboardingState {
  authenticated: boolean;
  setAuthentication: (success: boolean) => void;
}

export const useOnboardingStore = createWithEqualityFn<OnboardingState>(
  (set) => ({
    authenticated: false,
    setAuthentication: (success: boolean) => {
      set({
        authenticated: success,
      });
    },
  }),
  shallow,
);
