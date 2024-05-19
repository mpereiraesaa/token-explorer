import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

export type NotificationLevel = 'error' | 'info' | 'warning' | 'success';

export interface ErrorState {
  active: boolean;
  title: string;
  subtitle: string;
  level: NotificationLevel
  showNotification: (title: string, subtitle: string, level: NotificationLevel) => void;
  closeNotification: () => void;
}

export const useErrorStore = createWithEqualityFn<ErrorState>(
  (set) => ({
    active: false,
    title: '',
    subtitle: '',
    level: 'info',
    showNotification: (title: string, subtitle: string, level: NotificationLevel) => {
      console.log('show notification');
      set({
        active: true,
        title,
        subtitle,
        level
      });
    },
    closeNotification: () => {
      console.log('close notification');
      set({
        active: false,
      });
    }
  }),
  shallow,
);
