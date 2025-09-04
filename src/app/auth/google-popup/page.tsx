'use client';

import { useEffect } from 'react';
import { signIn } from 'next-auth/react';

export default function GooglePopup() {
  useEffect(() => {
    const doLogin = async () => {
      const res = await signIn('google', {
        redirect: false,
        callbackUrl: '/auth/popup-callback', 
      });
    };

    doLogin();
  }, []);

  return <p>Signing in to Google...</p>;
}
