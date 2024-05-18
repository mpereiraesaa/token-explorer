import { JumperLearnLogo, JumperLogo } from '@/app/components/illustrations';
import { LogoWrapper } from '@/app/components/illustrations/Logo.style';

type LogoProps = {
  variant: 'default' | 'learn';
};

export const Logo = ({ variant }: LogoProps) => {
  const logo = variant === 'default' ? <JumperLogo /> : <JumperLearnLogo />;

  return <LogoWrapper>{logo}</LogoWrapper>;
};
