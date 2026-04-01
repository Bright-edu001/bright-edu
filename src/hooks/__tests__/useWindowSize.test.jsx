import { renderHook, act } from "@testing-library/react";
import {
  useWindowSize,
  calculateDrawerWidth,
  isMobileWidth,
} from "../useWindowSize";

/**
 * @jest-environment jsdom
 */

describe("useWindowSize", () => {
  beforeEach(() => {
    // 設定預設測試值
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 768,
    });
  });

  afterEach(() => {
    // 清理所有事件監聽器
    vi.clearAllMocks();
  });

  test("should initialize with current window size", () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });

  test("should update size on window resize", () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      // 更新 window 大小
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 500,
      });
      Object.defineProperty(window, "innerHeight", {
        writable: true,
        configurable: true,
        value: 600,
      });

      // 觸發 resize 事件
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.width).toBe(500);
    expect(result.current.height).toBe(600);
  });

  test("should handle multiple resize events", () => {
    const { result } = renderHook(() => useWindowSize());

    // 第一次縮放
    act(() => {
      Object.defineProperty(window, "innerWidth", { value: 800 });
      Object.defineProperty(window, "innerHeight", { value: 600 });
      window.dispatchEvent(new Event("resize"));
    });
    expect(result.current.width).toBe(800);
    expect(result.current.height).toBe(600);

    // 第二次縮放
    act(() => {
      Object.defineProperty(window, "innerWidth", { value: 400 });
      Object.defineProperty(window, "innerHeight", { value: 300 });
      window.dispatchEvent(new Event("resize"));
    });
    expect(result.current.width).toBe(400);
    expect(result.current.height).toBe(300);
  });

  test("should cleanup event listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useWindowSize());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );

    removeEventListenerSpy.mockRestore();
  });
});

describe("calculateDrawerWidth", () => {
  test("should return 100% for narrow screens", () => {
    expect(calculateDrawerWidth(400)).toBe("100%");
    expect(calculateDrawerWidth(500)).toBe("100%");
  });

  test("should return 500 for wide screens", () => {
    expect(calculateDrawerWidth(501)).toBe(500);
    expect(calculateDrawerWidth(1024)).toBe(500);
    expect(calculateDrawerWidth(1920)).toBe(500);
  });
});

describe("isMobileWidth", () => {
  test("should return true for mobile widths", () => {
    expect(isMobileWidth(320)).toBe(true);
    expect(isMobileWidth(768)).toBe(true);
  });

  test("should return false for desktop widths", () => {
    expect(isMobileWidth(769)).toBe(false);
    expect(isMobileWidth(1024)).toBe(false);
    expect(isMobileWidth(1920)).toBe(false);
  });
});
