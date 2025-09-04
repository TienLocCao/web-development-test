'use client';

import { useEffect } from 'react';

export default function CallbackPopup() {
  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage('auth-success', '*');
      window.close(); 
    }
  }, []);

  return <p>Đăng nhập thành công. Đang đóng...</p>;
}
