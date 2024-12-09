import { useRouter } from 'next/router';

const useIsActive = (pathname: string): boolean => {
  const router = useRouter();
  return router.pathname === pathname;
};

export default useIsActive;
