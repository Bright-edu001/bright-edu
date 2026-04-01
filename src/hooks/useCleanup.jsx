import { useEffect, useRef, useCallback } from "react";
import logger from "../utils/logger";

// 防止記憶體洩漏的自定義 Hook
export const useCleanup = () => {
  const cleanupFunctions = useRef([]);

  const addCleanup = useCallback((cleanupFn) => {
    cleanupFunctions.current.push(cleanupFn);
  }, []);

  useEffect(() => {
    return () => {
      cleanupFunctions.current.forEach((cleanup) => {
        try {
          cleanup();
        } catch (error) {
          logger.warn("清理函數執行失敗:", error);
        }
      });
      cleanupFunctions.current = [];
    };
  }, []);

  return addCleanup;
};

// 安全的 setTimeout Hook
export const useSafeTimeout = () => {
  const timeoutRef = useRef();
  const addCleanup = useCleanup();

  const setSafeTimeout = useCallback(
    (callback, delay) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(callback, delay);

      addCleanup(() => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      });

      return timeoutRef.current;
    },
    [addCleanup]
  );

  return setSafeTimeout;
};

// 安全的 setInterval Hook
export const useSafeInterval = () => {
  const intervalRef = useRef();
  const addCleanup = useCleanup();

  const setSafeInterval = useCallback(
    (callback, delay) => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(callback, delay);

      addCleanup(() => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      });

      return intervalRef.current;
    },
    [addCleanup]
  );

  return setSafeInterval;
};

// 事件監聽器清理 Hook
export const useEventListener = (eventName, handler, element = window) => {
  const addCleanup = useCleanup();

  useEffect(() => {
    if (element && element.addEventListener) {
      element.addEventListener(eventName, handler);

      addCleanup(() => {
        element.removeEventListener(eventName, handler);
      });
    }
  }, [eventName, handler, element, addCleanup]);
};
