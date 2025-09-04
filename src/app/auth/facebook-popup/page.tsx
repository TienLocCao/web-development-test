'use client';

import { useEffect } from 'react';
import { signIn } from 'next-auth/react';

export default function FacebookPopup() {
  useEffect(() => {
    const doLogin = async () => {
      const res = await signIn('facebook', {
        redirect: false,
        callbackUrl: '/auth/popup-callback', 
      });
    };
    doLogin();
  }, []);

  return <p>Signing in to Facebook...</p>;
}
