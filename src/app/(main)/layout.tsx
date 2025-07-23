// import { getMe } from '@/api/me/actions';
import { MobileContainer } from '@/components/mobile-container';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <MobileContainer>{children}</MobileContainer>
  );
}
