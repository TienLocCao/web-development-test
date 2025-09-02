'use client';
import React, {useRef} from 'react';
import Header from '@/app/components/layout/header/Header'
import { useRedirectIfHome } from '@/app/hooks/useRedirectIfHome';

interface LayoutProps {
  children: React.ReactNode;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

const Layout = ({ children, containerRef  }: LayoutProps) => {
  useRedirectIfHome();
  return (
    <>
      <Header />
      <main className='relative top-navbar h-main-layout w-screen overflow-y-auto overflow-x-hidden bg-gray-5' ref={containerRef }>{children}</main>
      {/* <Footer /> */}
    </> 
  );
};

export default Layout;
