import { useCallback, useEffect, useLayoutEffect, useState } from "react";

const useBrowserLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : () => {};

type Width = number;
type Height = number;
type Size = [Width, Height];

export const getViewportSize = (): Size => {
  if (window.visualViewport) {
    return [window.visualViewport.width, window.visualViewport.height] as const;
  }

  return [window.innerWidth, window.innerHeight] as const;
};

export const useViewportSize = () => {
  const [viewportSize, setViewportSize] = useState<Size | undefined>();
  const updateViewportSize = useCallback(() => {
    const viewportSize = getViewportSize();

    setViewportSize((oldViewportSize) => {
      if (
        oldViewportSize &&
        oldViewportSize[0] === viewportSize[0] &&
        oldViewportSize[1] === viewportSize[1]
      ) {
        return oldViewportSize;
      }

      return viewportSize;
    });
  }, []);
  useBrowserLayoutEffect(updateViewportSize, [updateViewportSize]);

  useEffect(() => {
    const effectTwice = () => {
      updateViewportSize();
      setTimeout(updateViewportSize, 1000);
    };

    window.addEventListener("resize", effectTwice);
    window.addEventListener("orientationchange", effectTwice);
    window.visualViewport?.addEventListener("resize", effectTwice);

    return () => {
      window.removeEventListener("resize", effectTwice);
      window.removeEventListener("orientationchange", effectTwice);
      window.visualViewport?.removeEventListener("resize", effectTwice);
    };
  }, [updateViewportSize]);

  return viewportSize;
};
