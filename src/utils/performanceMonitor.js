// 性能監控工具
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.observers = {};
    this.isMonitoring = process.env.NODE_ENV === "production";
  }

  // 監控 LCP (Largest Contentful Paint)
  monitorLCP() {
    if (!this.isMonitoring) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
        console.log("LCP:", lastEntry.startTime);
      });

      observer.observe({ entryTypes: ["largest-contentful-paint"] });
      this.observers.lcp = observer;
    } catch (error) {
      console.warn("LCP monitoring not supported:", error);
    }
  }

  // 監控 FID (First Input Delay)
  monitorFID() {
    if (!this.isMonitoring) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.metrics.fid = entry.processingStart - entry.startTime;
          console.log("FID:", entry.processingStart - entry.startTime);
        });
      });

      observer.observe({ entryTypes: ["first-input"] });
      this.observers.fid = observer;
    } catch (error) {
      console.warn("FID monitoring not supported:", error);
    }
  }

  // 監控 CLS (Cumulative Layout Shift)
  monitorCLS() {
    if (!this.isMonitoring) return;

    try {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.metrics.cls = clsValue;
        console.log("CLS:", clsValue);
      });

      observer.observe({ entryTypes: ["layout-shift"] });
      this.observers.cls = observer;
    } catch (error) {
      console.warn("CLS monitoring not supported:", error);
    }
  }

  // 監控資源載入時間
  monitorResourceTiming() {
    if (!this.isMonitoring) return;

    window.addEventListener("load", () => {
      const resources = performance.getEntriesByType("resource");
      const slowResources = resources.filter(
        (resource) => resource.duration > 1000
      );

      if (slowResources.length > 0) {
        console.warn("Slow resources detected:", slowResources);
        this.metrics.slowResources = slowResources;
      }
    });
  }

  // 監控記憶體使用量
  monitorMemoryUsage() {
    if (!this.isMonitoring || !performance.memory) return;

    setInterval(() => {
      const memInfo = {
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit,
      };

      this.metrics.memory = memInfo;

      // 記憶體使用超過 80% 時警告
      if (memInfo.used / memInfo.limit > 0.8) {
        console.warn("High memory usage detected:", memInfo);
      }
    }, 10000); // 每 10 秒檢查一次
  }

  // 初始化所有監控
  init() {
    this.monitorLCP();
    this.monitorFID();
    this.monitorCLS();
    this.monitorResourceTiming();
    this.monitorMemoryUsage();
  }

  // 取得所有效能指標
  getMetrics() {
    return this.metrics;
  }

  // 清理監控器
  cleanup() {
    Object.values(this.observers).forEach((observer) => {
      if (observer && observer.disconnect) {
        observer.disconnect();
      }
    });
  }
}

// 建立全域監控實例
const performanceMonitor = new PerformanceMonitor();

export default performanceMonitor;
