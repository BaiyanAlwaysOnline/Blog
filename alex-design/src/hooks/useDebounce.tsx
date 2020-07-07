import { useState, useEffect } from "react";

export function useDebounce(value: any, delay = 300) {
  const [debounceVal, setDebounceVal] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceVal(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return [debounceVal];
}
