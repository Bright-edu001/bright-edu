// 測試 performanceMonitor 工具
describe("performanceMonitor", () => {
  let performanceMonitor;
  let originalNavigator;
  let consoleSpy;

  // 每次測試前重設 module 並 mock navigator.sendBeacon
  beforeEach(async () => {
    jest.resetModules();
    ({ default: performanceMonitor } = await import("../performanceMonitor"));
    originalNavigator = global.navigator;
    Object.defineProperty(global, "navigator", {
      value: { sendBeacon: jest.fn() },
      writable: true,
      configurable: true,
    });
  });

  // 測試後還原 navigator 與 console
  afterEach(() => {
    Object.defineProperty(global, "navigator", {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
    if (consoleSpy) consoleSpy.mockRestore();
  });

  // 測試：能正確記錄與送出 metrics
  it("records metrics and flushes them", () => {
    const listener = jest.fn();
    performanceMonitor.onMetric(listener);
    performanceMonitor.recordMetric("load", 123);
    expect(performanceMonitor.metrics.load).toBe(123);
    expect(listener).toHaveBeenCalledWith({ name: "load", value: 123 });
    performanceMonitor.flushMetrics();
    expect(global.navigator.sendBeacon).toHaveBeenCalledWith(
      "/performance-metrics",
      JSON.stringify([{ name: "load", value: 123 }])
    );
    performanceMonitor.flushMetrics();
    expect(global.navigator.sendBeacon).toHaveBeenCalledTimes(1);
  });

  // 測試：debug 模式下會 log metrics
  it("logs metrics in debug mode", () => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    performanceMonitor.setDebug(true);
    performanceMonitor.recordMetric("dbg", 5);
    expect(consoleSpy).toHaveBeenCalledWith("DBG:", 5);
  });
});
