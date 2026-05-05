import { useRef, useEffect, useEffectEvent } from "react";

/**
 * useIntersectionObserver
 * 這是一個自訂 React Hook，用來偵測某個 DOM 元素是否進入瀏覽器視窗（viewport）。
 * 用法：將回傳的 ref 綁定到你想監控的元素上，當元素進入視窗時會執行 callback。
 * 只會觸發一次（進入後自動取消監控）。
 *
 * @param {Function} callback - 元素進入視窗時要執行的函式，會收到 entry 物件。
 * @param {Object} options - IntersectionObserver 的選項（如 rootMargin, threshold）。
 * @returns {Object} targetRef - 綁定到目標元素的 ref。
 */
function useIntersectionObserver(callback, options) {
  const targetRef = useRef(null);
  const onIntersect = useEffectEvent((entry) => {
    callback(entry);
  });

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    // 建立 IntersectionObserver，監控元素是否進入視窗
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect(entry); // 進入視窗時執行 callback
          obs.unobserve(entry.target); // 只觸發一次，進入後取消監控
        }
      });
    }, options);

    observer.observe(element);

    // 清理：元件卸載時取消監控
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [options]);

  return targetRef;
}

export default useIntersectionObserver;
