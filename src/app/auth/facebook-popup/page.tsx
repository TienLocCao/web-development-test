'use client';

import { useEffect } from 'react';
import { signIn } from 'next-auth/react';

export default function FacebookPopup() {
  useEffect(() => {
    const doLogin = async () => {
      const res = await signIn('facebook', {
        redirect: false,
        callbackUrl: '/auth/popup-callback', // trang sẽ xử lý postMessage
      });
      // if (res?.ok && res.url) {
      //   window.location.href = res.url;
      // } else {
      //   window.opener?.postMessage('auth-cancel', '*');
      //   window.close();
      // }
    };
    doLogin();
  }, []);

  return <p>Đang đăng nhập Facebook...</p>;
}
