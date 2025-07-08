import { useRef } from 'react';

export function useDebouncedCallback(callback, delay = 300) {
  const timeoutRef = useRef(null);

  const debounced = (...args) => {
    if (timeoutRef.current) return;
    timeoutRef.current = setTimeout(() => {
      callback(...args);
      timeoutRef.current = null;
    }, delay);
  };

  return debounced;
}
