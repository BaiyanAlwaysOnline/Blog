import { useEffect, RefObject } from "react";

export function useClickOutside(
  ref: RefObject<HTMLElement>,
  handler: Function
) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && ref.current.contains(e.target as HTMLElement)) {
        return;
      }
      handler();
    };
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
}

export default useClickOutside;
