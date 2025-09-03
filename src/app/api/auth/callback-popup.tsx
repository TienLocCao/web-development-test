// 'use client';

// import { useEffect } from 'react';

// export default function CallbackPopup() {
//   useEffect(() => {
//     if (window.opener) {
//       window.opener.postMessage('auth-success', '*');
//       window.close();
//       console.log("2")
//     }
//     console.log("2xx")
//   }, []);

//   return <p>Hoàn tất đăng nhập...</p>;
// }