// 匯入測試工具與自訂 hook
import { renderHook, act } from "@testing-library/react";
import {
  useCleanup,
  useSafeTimeout,
  useSafeInterval,
  useEventListener,
} from "../useCleanup";

// 測試 useCleanup hook：註冊的 cleanup function 會在組件卸載時被呼叫
describe("useCleanup", () => {
  test("calls registered cleanup on unmount", () => {
    const fn = vi.fn();
    const { result, unmount } = renderHook(() => useCleanup());
    act(() => {
      result.current(fn);
    });
    unmount();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

// 測試 useSafeTimeout hook：確保 timeout 會被正確清除
describe("useSafeTimeout", () => {
  beforeEach(() => {
    vi.useFakeTimers(); // 使用假的計時器
  });
  afterEach(() => {
    vi.useRealTimers(); // 還原計時器
  });
  test("clears timeout on reset and unmount", () => {
    // cb1, cb2, cb3 分別模擬不同的 callback
    const cb1 = vi.fn();
    const cb2 = vi.fn();
    const cb3 = vi.fn();
    const { result, unmount } = renderHook(() => useSafeTimeout());
    // 設定第一次 timeout
    act(() => {
      result.current(cb1, 100);
    });
    // 設定第二次 timeout，會覆蓋前一次
    act(() => {
      result.current(cb2, 100);
    });
    // 推進時間，cb2 會被呼叫，cb1 不會
    vi.advanceTimersByTime(100);
    expect(cb1).not.toHaveBeenCalled();
    expect(cb2).toHaveBeenCalledTimes(1);
    // 設定第三次 timeout，然後 unmount
    act(() => {
      result.current(cb3, 100);
    });
    unmount();
    // 推進時間，cb3 不會被呼叫（因為已 unmount）
    vi.advanceTimersByTime(100);
    expect(cb3).not.toHaveBeenCalled();
  });
});

// 測試 useSafeInterval hook：確保 interval 會被正確清除
describe("useSafeInterval", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  test("clears interval on reset and unmount", () => {
    // cb1, cb2, cb3 分別模擬不同的 callback
    const cb1 = vi.fn();
    const cb2 = vi.fn();
    const cb3 = vi.fn();
    const { result, unmount } = renderHook(() => useSafeInterval());
    // 設定第一次 interval
    act(() => {
      result.current(cb1, 100);
    });
    // 設定第二次 interval，會覆蓋前一次
    act(() => {
      result.current(cb2, 100);
    });
    // 推進時間，cb2 會被呼叫 3 次，cb1 不會
    vi.advanceTimersByTime(300);
    expect(cb1).not.toHaveBeenCalled();
    expect(cb2).toHaveBeenCalledTimes(3);
    // 設定第三次 interval，然後 unmount
    act(() => {
      result.current(cb3, 100);
    });
    unmount();
    // 推進時間，cb3 不會被呼叫（因為已 unmount）
    vi.advanceTimersByTime(300);
    expect(cb3).not.toHaveBeenCalled();
  });
});

// 測試 useEventListener hook：組件卸載時會移除事件監聽
describe("useEventListener", () => {
  test("removes event listener on unmount", () => {
    const element = document.createElement("div");
    const addSpy = vi.spyOn(element, "addEventListener");
    const removeSpy = vi.spyOn(element, "removeEventListener");
    const handler = vi.fn();
    // 掛載 hook，監聽 click 事件
    const { unmount } = renderHook(() =>
      useEventListener("click", handler, element)
    );
    expect(addSpy).toHaveBeenCalledWith("click", handler);
    // 卸載時應移除監聽
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("click", handler);
  });
});
