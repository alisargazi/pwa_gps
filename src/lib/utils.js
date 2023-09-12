export const isTouchScreen = () => {
  return navigator.maxTouchPoints && navigator.maxTouchPoints > 0 ||
    window.matchMedia && window.matchMedia("(any-pointer:coarse)").matches;
};

export const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

export const isOffline = () => 'onLine' in navigator && !navigator.onLine;
