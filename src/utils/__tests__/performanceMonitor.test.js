// 測試 performanceMonitor 工具
describe("performanceMonitor", () => {
  let performanceMonitor;
  let originalNavigator;
  let logger;
  let logSpy;
  let originalPerformance;

  // 每次測試前重設 module 並 mock navigator.sendBeacon
  beforeEach(async () => {
    jest.resetModules();
    ({ default: performanceMonitor } = await import("../performanceMonitor"));
    logger = require("../logger");
    originalNavigator = global.navigator;
    originalPerformance = global.performance;
    Object.defineProperty(global, "navigator", {
      value: { sendBeacon: jest.fn() },
      writable: true,
      configurable: true,
    });
  });

  // 測試後還原 navigator 與 logger
  afterEach(() => {
    Object.defineProperty(global, "navigator", {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
    global.performance = originalPerformance;
    if (logSpy) logSpy.mockRestore();
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
    logSpy = jest.spyOn(logger, "log").mockImplementation(() => {});
    performanceMonitor.setDebug(true);
    performanceMonitor.recordMetric("dbg", 5);
    expect(logSpy).toHaveBeenCalledWith("DBG:", 5);
  });
  // 測試：cleanup 會停止記憶體使用量輪詢
  it("stops memory usage polling after cleanup", () => {
    jest.useFakeTimers();
    performanceMonitor.setDebug(true);

    // 模擬記憶體使用資訊
    global.performance = {
      memory: {
        usedJSHeapSize: 10,
        totalJSHeapSize: 100,
        jsHeapSizeLimit: 100,
      },
    };

    performanceMonitor.monitorMemoryUsage();
    // 第一次輪詢後更新 metrics
    jest.advanceTimersByTime(10000);
    expect(performanceMonitor.metrics.memory).toEqual({
      used: 10,
      total: 100,
      limit: 100,
    });

    // 修改記憶體資訊並呼叫 cleanup
    global.performance.memory = {
      usedJSHeapSize: 20,
      totalJSHeapSize: 200,
      jsHeapSizeLimit: 200,
    };

    performanceMonitor.cleanup();
    jest.advanceTimersByTime(10000);

    // metrics 不應再更新
    expect(performanceMonitor.metrics.memory).toEqual({
      used: 10,
      total: 100,
      limit: 100,
    });

    jest.useRealTimers();
  });
});
