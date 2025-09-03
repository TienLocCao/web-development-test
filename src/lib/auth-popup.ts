export const openAuthPopup = (provider: 'google' | 'facebook') => {
  const width = 500;
  const height = 600;
  const left = window.screenX + (window.innerWidth - width) / 2;
  const top = window.screenY + (window.innerHeight - height) / 2;

  const popup = window.open(
    `/auth/${provider}-popup`,
    `${provider} Login`,
    `width=${width},height=${height},top=${top},left=${left}`
  );

  return new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      if (popup?.closed) {
        clearInterval(timer);
        reject(new Error("Popup closed by user"));
      }
    }, 500);

    const messageHandler = (event: MessageEvent) => {
      if (event.data === "auth-success") {
        clearInterval(timer);
        window.removeEventListener("message", messageHandler);
        popup?.close();
        resolve(true);
      } else if (event.data === "auth-cancel") {
        clearInterval(timer);
        window.removeEventListener("message", messageHandler);
        popup?.close();
        reject(new Error("Auth cancelled"));
      }
    };

    window.addEventListener("message", messageHandler);
  });
};
