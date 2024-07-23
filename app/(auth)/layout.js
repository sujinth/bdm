'use client';

import { useSession } from 'next-auth/react';
import {  useRouter,usePathname  } from 'next/navigation';
import Header from '../components/commen/Header/Header';
import Home from '../home/page';

export default function ForgotPasswordPageLayout({ children }) {
  const session = useSession();
  const router = useRouter();
  const loggedIn = !!session.data;
  const pathName = usePathname();

  let isLoggedIn = false;
  if (loggedIn && pathName !== '/update-password') {
      isLoggedIn = true;
      router.push('/home');
  }else if(!loggedIn){
      router.push(pathName);
  }


  return (
    <>
      {isLoggedIn ? (
        <Home />
      ) : (
        <>
          <Header />
          {children}
        </>
      )}
    </>
  );
}
