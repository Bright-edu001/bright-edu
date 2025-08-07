// 測試 debounce 工具
import { debounce } from "../debounce";

jest.useFakeTimers(); // 使用假的計時器

describe("debounce", () => {
  // 測試：debounce 只會在最後一次呼叫後執行一次
  it("executes only once after delay", () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 100);

    debounced("a");
    debounced("b");
    debounced("c");

    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("c");
  });
});
