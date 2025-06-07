import { useUser } from '@bytebank/shared';
import { useEffect, useState } from 'react';
import BytebankLoadingContent from '../loading-content';
import { usePathname, useRouter } from 'next/navigation';

export default function BytebankAuthRedirect({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const [redirecting, setRedirecting] = useState(false);

  const isPublicPage = pathname === '/';

  useEffect(() => {
    if (isAuthenticated && isPublicPage) {
      setRedirecting(true);
      router.replace('/home');
    }
  }, [isAuthenticated, isPublicPage, router]);

  if (redirecting) {
    return <BytebankLoadingContent />;
  }

  if (!isPublicPage) {
    return <BytebankLoadingContent />;
  }

  return <>{children}</>;
}
