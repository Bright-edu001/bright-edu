import logger from "./logger";
// 前端效能監控工具類別
class PerformanceMonitor {
  constructor() {
    // 儲存所有效能指標
    this.metrics = {};
    // 暫存待送出的指標資料
    this.metricBuffer = [];
    // 註冊的指標監聽 callback
    this.metricListeners = [];
    // 各種 PerformanceObserver 實例
    this.observers = {};
    // 記憶體使用量輪詢的 ID
    this.memoryIntervalId = null;
    // 除錯模式
    this.debug = false;
    // 是否啟用監控（預設僅 production）
    this.isMonitoring = process.env.NODE_ENV === "production";
    // 註冊頁面關閉/隱藏時自動送出指標
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", () => this.flushMetrics());
      window.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
          this.flushMetrics();
        }
      });
    }
  }

  // 切換除錯模式
  setDebug(flag = true) {
    this.debug = flag;
    this.isMonitoring = this.debug || process.env.NODE_ENV === "production";
  }

  // 註冊自訂指標監聽 callback
  onMetric(callback) {
    if (typeof callback === "function") {
      this.metricListeners.push(callback);
    }
  }

  // 記錄一個效能指標
  recordMetric(name, value) {
    this.metrics[name] = value;
    this.metricBuffer.push({ name, value });
    this.metricListeners.forEach((cb) => cb({ name, value }));
    if (this.debug) {
      // eslint-disable-next-line no-console
      logger.log(`${name.toUpperCase()}:`, value);
    }
    // 傳送自訂指標到 Firebase Performance Monitoring
    if (typeof window !== "undefined") {
      import("firebase/performance")
        .then(({ getPerformance, trace }) => {
          try {
            const perf = getPerformance();
            const t = trace(perf, "custom_metrics");
            t.start();
            t.putMetric(name, value);
            t.stop();
          } catch (err) {
            if (this.debug) {
              // eslint-disable-next-line no-console
              logger.warn("Failed to record Firebase metric", err);
            }
          }
        })
        .catch((err) => {
          if (this.debug) {
            // eslint-disable-next-line no-console
            logger.warn("Failed to load Firebase Performance", err);
          }
        });
    }
  }

  // 送出所有暫存的效能指標（通常於頁面關閉/隱藏時）
  flushMetrics() {
    if (
      this.metricBuffer.length === 0 ||
      typeof navigator === "undefined" ||
      typeof navigator.sendBeacon !== "function"
    ) {
      return;
    }

    try {
      const data = JSON.stringify(this.metricBuffer);
      navigator.sendBeacon("/performance-metrics", data);
      this.metricBuffer = [];
    } catch (err) {
      if (this.debug) {
        // eslint-disable-next-line no-console
        logger.warn("送出效能指標失敗", err);
      }
    }
  }

  // 監控 LCP（最大內容繪製）
  monitorLCP() {
    if (!this.isMonitoring) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.recordMetric("lcp", lastEntry.startTime);
      });

      observer.observe({ entryTypes: ["largest-contentful-paint"] });
      this.observers.lcp = observer;
    } catch (error) {
      logger.warn("瀏覽器不支援 LCP 監控:", error);
    }
  }

  // 監控 FID（首次輸入延遲）
  monitorFID() {
    if (!this.isMonitoring) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.recordMetric("fid", entry.processingStart - entry.startTime);
        });
      });

      observer.observe({ entryTypes: ["first-input"] });
      this.observers.fid = observer;
    } catch (error) {
      logger.warn("瀏覽器不支援 FID 監控:", error);
    }
  }

  // 監控 CLS（累積版面位移）
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
        this.recordMetric("cls", clsValue);
      });

      observer.observe({ entryTypes: ["layout-shift"] });
      this.observers.cls = observer;
    } catch (error) {
      logger.warn("瀏覽器不支援 CLS 監控:", error);
    }
  }

  // 監控資源載入時間（偵測載入超過 1 秒的資源）
  monitorResourceTiming() {
    if (!this.isMonitoring) return;

    window.addEventListener("load", () => {
      const resources = performance.getEntriesByType("resource");
      const slowResources = resources.filter(
        (resource) => resource.duration > 1000
      );

      if (slowResources.length > 0) {
        logger.warn("偵測到載入較慢的資源:", slowResources);
        this.metrics.slowResources = slowResources;
      }
    });
  }

  // 監控記憶體使用量（僅部分瀏覽器支援）
  monitorMemoryUsage() {
    if (!this.isMonitoring || !performance.memory) return;

    this.memoryIntervalId = setInterval(() => {
      const memInfo = {
        used: performance.memory.usedJSHeapSize, // 已用記憶體
        total: performance.memory.totalJSHeapSize, // 總分配記憶體
        limit: performance.memory.jsHeapSizeLimit, // 最大可用記憶體
      };

      this.metrics.memory = memInfo;

      // 當記憶體使用超過 80% 時警告
      if (memInfo.used / memInfo.limit > 0.8) {
        logger.warn("偵測到高記憶體使用率:", memInfo);
      }
    }, 10000); // 每 10 秒檢查一次
  }

  // 初始化所有效能監控
  init() {
    this.monitorLCP();
    this.monitorFID();
    this.monitorCLS();
    this.monitorResourceTiming();
    this.monitorMemoryUsage();
  }

  // 取得所有效能指標資料
  getMetrics() {
    return this.metrics;
  }

  // 清理所有監控器（釋放 observer）
  cleanup() {
    Object.values(this.observers).forEach((observer) => {
      if (observer && observer.disconnect) {
        observer.disconnect();
      }
    });
    if (this.memoryIntervalId) {
      clearInterval(this.memoryIntervalId);
      this.memoryIntervalId = null;
    }
  }
}

// 建立全域效能監控實例
const performanceMonitor = new PerformanceMonitor();

export default performanceMonitor;
