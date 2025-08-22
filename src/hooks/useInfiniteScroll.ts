import { useEffect, useRef } from "react";

interface InfiniteScrollOptions {
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number;
}

export const useInfiniteScroll = (
  callback: () => void,
  options: InfiniteScrollOptions = {}
) => {
  const { root = null, rootMargin = "100px", threshold = 0.1 } = options;
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { root, rootMargin, threshold }
    );

    observerRef.current.observe(sentinelRef.current);

    return () => {
      if (observerRef.current && sentinelRef.current) {
        observerRef.current.unobserve(sentinelRef.current);
      }
    };
  }, [callback, root, rootMargin, threshold]);

  return sentinelRef;
};
