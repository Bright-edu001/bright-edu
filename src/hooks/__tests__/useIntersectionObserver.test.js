// 匯入 React 及測試工具
import React from "react";
import { render, act } from "@testing-library/react";
import useIntersectionObserver from "../useIntersectionObserver";

// 測試 useIntersectionObserver hook
describe("useIntersectionObserver", () => {
  let observer;

  // 在每個測試前，mock IntersectionObserver 物件
  beforeEach(() => {
    // 自訂 mock IntersectionObserver，模擬 observe/unobserve 行為
    class MockIntersectionObserver {
      constructor(callback) {
        this.callback = callback;
        this.observe = jest.fn();
        this.unobserve = jest.fn(() => {
          this.isObserving = false;
        });
        this.isObserving = true;
      }
      // 觸發 intersection callback
      trigger(entries) {
        if (this.isObserving) {
          this.callback(entries, this);
        }
      }
    }
    // 將全域 IntersectionObserver 指向 mock 版本
    global.IntersectionObserver = jest.fn((cb) => {
      observer = new MockIntersectionObserver(cb);
      return observer;
    });
  });

  // 每次測試後清除 mock 狀態
  afterEach(() => {
    jest.clearAllMocks();
  });

  // 測試：當元素進入 viewport 時只呼叫一次 callback，並自動 unobserve
  it("calls callback once and unobserves when element intersects", () => {
    const callback = jest.fn();

    // 測試用元件，將 ref 綁定到 div
    const TestComponent = () => {
      const ref = useIntersectionObserver(callback);
      return <div data-testid="target" ref={ref} />;
    };

    const { getByTestId } = render(<TestComponent />);
    const element = getByTestId("target");

    // 觸發兩次 intersection，callback 只會被呼叫一次
    act(() => {
      observer.trigger([{ isIntersecting: true, target: element }]);
      observer.trigger([{ isIntersecting: true, target: element }]);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(observer.unobserve).toHaveBeenCalledTimes(1);
    expect(observer.unobserve).toHaveBeenCalledWith(element);
  });
});
