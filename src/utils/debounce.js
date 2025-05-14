/**
 * Debounce function: delays invoking func until after delay ms have elapsed
 */
export default function debounce(func, delay = 200) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
