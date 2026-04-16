import React from "react";
import { renderHook, act } from "@testing-library/react";
import { message } from "antd";
import * as permissions from "../../config/permissions.jsx";
import { AuthProvider, useAuth } from "../AuthContext";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// 模擬 Firebase 模組
vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn(),
  GoogleAuthProvider: vi.fn().mockImplementation(() => ({
    setCustomParameters: vi.fn(),
  })),
  signInWithPopup: vi.fn(),
}));

vi.mock("../../config/firebaseCore", () => ({
  app: {},
}));

vi.mock("../../config/permissions.jsx", () => ({
  getUserRole: vi.fn().mockReturnValue("viewer"),
  hasPermission: vi.fn(),
  hasAnyPermission: vi.fn(),
  getRolePermissions: vi.fn(),
  USER_ROLES: {
    SUPER_ADMIN: "super_admin",
    ADMIN: "admin",
    EDITOR: "editor",
    VIEWER: "viewer",
  },
}));

// 模擬 antd message 組件
vi.mock("antd", () => ({
  message: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// 模擬 reactfire
const mockUseUser = vi.fn();
vi.mock("reactfire", () => ({
  useUser: () => mockUseUser(),
  AuthProvider: ({ children }) => children,
}));

// 輔助函數：使用 AuthProvider 包裝渲染 hook
const renderWithProvider = (initialProps) => {
  const wrapper = ({ children }) => (
    <AuthProvider {...initialProps}>{children}</AuthProvider>
  );
  return renderHook(() => useAuth(), { wrapper });
};

describe("AuthContext", () => {
  let mockAuth;
  let mockUnsubscribe;

  beforeEach(() => {
    vi.clearAllMocks();

    // 重置 localStorage
    localStorage.clear();

    // 模擬 window.location
    delete window.location;
    window.location = { hostname: "localhost" };

    // 模擬 Firebase auth
    mockAuth = {
      currentUser: null,
    };
    mockUnsubscribe = vi.fn();

    mockUseUser.mockReturnValue({ data: null, status: "success" });
    getAuth.mockReturnValue(mockAuth);
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null); // 初始狀態沒有用戶
      return mockUnsubscribe;
    });

    // 模擬權限相關函數
    permissions.getUserRole.mockReturnValue("viewer");
    permissions.getRolePermissions.mockReturnValue(["view_dashboard"]);
    permissions.hasPermission.mockReturnValue(true);
    permissions.hasAnyPermission.mockReturnValue(true);
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe("useAuth hook", () => {
    it("應該拋出錯誤如果在 AuthProvider 外使用", () => {
      // 在此測試中抑制 console.error
      const originalError = console.error;
      console.error = vi.fn();

      expect(() => {
        renderHook(() => useAuth());
      }).toThrow("useAuth 必須在 AuthProvider 內使用");

      console.error = originalError;
    });
  });

  describe("AuthProvider", () => {
    it("應該正確初始化 context 值", () => {
      const { result } = renderWithProvider();

      expect(result.current.user).toBeNull();
      expect(result.current.userRole).toBeNull();
      expect(result.current.userPermissions).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(result.current.isProduction).toBe(false);
      expect(typeof result.current.login).toBe("function");
      expect(typeof result.current.logout).toBe("function");
      expect(typeof result.current.isAuthenticated).toBe("function");
    });
  });

  describe("環境檢測", () => {
    it("應該在 localhost 環境中識別為開發環境", () => {
      window.location.hostname = "localhost";
      const { result } = renderWithProvider();
      expect(result.current.isProduction).toBe(false);
    });

    it("應該在非 localhost 環境中識別為生產環境", () => {
      window.location.hostname = "bright-edu.com";
      const { result } = renderWithProvider();
      expect(result.current.isProduction).toBe(true);
    });

    it("應該在 NODE_ENV=production 時識別為生產環境", () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      const { result } = renderWithProvider();
      expect(result.current.isProduction).toBe(true);

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe("開發環境登入", () => {
    beforeEach(() => {
      window.location.hostname = "localhost";
    });

    it("應該使用正確的帳號密碼成功登入", async () => {
      const { result } = renderWithProvider();

      await act(async () => {
        const user = await result.current.login("admin", "0000");
        expect(user.email).toBe("admin@bright-edu.com");
        expect(user.isDevelopment).toBe(true);
      });

      expect(result.current.user).toBeTruthy();
      expect(result.current.userRole).toBe("super_admin");
      expect(localStorage.getItem("isAuthenticated")).toBe("true");
      expect(message.success).toHaveBeenCalledWith("登入成功！");
    });

    it("應該拒絕錯誤的帳號密碼", async () => {
      const { result } = renderWithProvider();

      await act(async () => {
        await expect(result.current.login("wrong", "password")).rejects.toThrow(
          "帳號或密碼錯誤！",
        );
      });

      expect(result.current.user).toBeNull();
      expect(message.error).toHaveBeenCalledWith("帳號或密碼錯誤！");
    });
  });

  describe("生產環境登入", () => {
    beforeEach(() => {
      window.location.hostname = "bright-edu.com";
    });

    it("應該使用 Firebase 進行電子郵件登入", async () => {
      const mockUser = {
        uid: "test-uid",
        email: "test@bright-edu.com",
        displayName: "Test User",
      };

      signInWithEmailAndPassword.mockResolvedValueOnce({
        user: mockUser,
      });

      const { result } = renderWithProvider();

      await act(async () => {
        const user = await result.current.login(
          "test@bright-edu.com",
          "password123",
        );
        expect(user).toEqual(mockUser);
      });

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        mockAuth,
        "test@bright-edu.com",
        "password123",
      );
      expect(message.success).toHaveBeenCalledWith("登入成功！");
    });

    it("應該拒絕非 @bright-edu.com 的電子郵件", async () => {
      const { result } = renderWithProvider();

      await act(async () => {
        await expect(
          result.current.login("test@gmail.com", "password123"),
        ).rejects.toThrow("只允許 @bright-edu.com 的電子郵件帳號登入");
      });

      expect(signInWithEmailAndPassword).not.toHaveBeenCalled();
      expect(message.error).toHaveBeenCalledWith(
        "只允許 @bright-edu.com 的電子郵件帳號登入",
      );
    });

    it("應該在登入後發現非法 email 時登出", async () => {
      const mockUser = {
        uid: "test-uid",
        email: "test@gmail.com", // 非法 email
        displayName: "Test User",
      };

      signInWithEmailAndPassword.mockResolvedValueOnce({
        user: mockUser,
      });

      const { result } = renderWithProvider();

      await act(async () => {
        await expect(
          result.current.login("test@bright-edu.com", "password123"), // 注意：這裡輸入的是合法 email，但 Firebase 返回的是非法 email
        ).rejects.toThrow("只允許 @bright-edu.com 的電子郵件帳號登入");
      });

      expect(signOut).toHaveBeenCalledWith(mockAuth);
    });
  });

  describe("Google 登入", () => {
    beforeEach(() => {
      window.location.hostname = "bright-edu.com";
    });

    it("應該在開發環境中拒絕 Google 登入", async () => {
      window.location.hostname = "localhost";
      const { result } = renderWithProvider();

      await act(async () => {
        await result.current.loginWithGoogle();
      });

      expect(message.error).toHaveBeenCalledWith("Google登入僅在生產環境可用");
      expect(signInWithPopup).not.toHaveBeenCalled();
    });

    it("應該在生產環境中進行 Google 登入", async () => {
      const mockUser = {
        uid: "google-uid",
        email: "test@bright-edu.com",
        displayName: "Google User",
      };

      const mockProvider = {
        setCustomParameters: vi.fn(),
      };
      GoogleAuthProvider.mockImplementation(function () {
        return mockProvider;
      });

      signInWithPopup.mockResolvedValueOnce({
        user: mockUser,
      });

      const { result } = renderWithProvider();

      await act(async () => {
        const user = await result.current.loginWithGoogle();
        expect(user).toEqual(mockUser);
      });

      expect(GoogleAuthProvider).toHaveBeenCalled();
      expect(mockProvider.setCustomParameters).toHaveBeenCalledWith({
        prompt: "select_account",
      });
      expect(signInWithPopup).toHaveBeenCalledWith(mockAuth, mockProvider);
      expect(message.success).toHaveBeenCalledWith("Google登入成功！");
    });

    it("應該拒絕非 @bright-edu.com 的 Google 帳號", async () => {
      const mockUser = {
        uid: "google-uid",
        email: "test@gmail.com",
        displayName: "Google User",
      };

      const mockProvider = {
        setCustomParameters: vi.fn(),
      };
      GoogleAuthProvider.mockImplementation(function () {
        return mockProvider;
      });

      signInWithPopup.mockResolvedValueOnce({
        user: mockUser,
      });

      const { result } = renderWithProvider();

      await act(async () => {
        await expect(result.current.loginWithGoogle()).rejects.toThrow(
          "只允許 @bright-edu.com 的電子郵件帳號登入",
        );
      });

      expect(signOut).toHaveBeenCalledWith(mockAuth);
    });
  });

  describe("登出功能", () => {
    it("應該在開發環境中正確登出", async () => {
      window.location.hostname = "localhost";

      // 先進行登入
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem(
        "devUser",
        JSON.stringify({ email: "admin@bright-edu.com" }),
      );

      const { result } = renderWithProvider();

      await act(async () => {
        await result.current.logout();
      });

      expect(localStorage.getItem("isAuthenticated")).toBeNull();
      expect(localStorage.getItem("devUser")).toBeNull();
      expect(result.current.user).toBeNull();
      expect(message.success).toHaveBeenCalledWith("已登出");
    });

    it("應該在生產環境中正確登出", async () => {
      window.location.hostname = "bright-edu.com";
      mockAuth.currentUser = { email: "test@bright-edu.com" };

      const { result } = renderWithProvider();

      await act(async () => {
        await result.current.logout();
      });

      expect(signOut).toHaveBeenCalledWith(mockAuth);
      expect(result.current.user).toBeNull();
      expect(message.success).toHaveBeenCalledWith("已登出");
    });
  });

  describe("認證狀態檢查", () => {
    it("當沒有用戶時應該回傳 false", () => {
      const { result } = renderWithProvider();
      expect(result.current.isAuthenticated()).toBe(false);
    });

    it("當有用戶時應該回傳 true", async () => {
      window.location.hostname = "localhost";
      const { result } = renderWithProvider();

      await act(async () => {
        await result.current.login("admin", "0000");
      });

      expect(result.current.isAuthenticated()).toBe(true);
    });
  });

  describe("權限檢查", () => {
    it("應該正確檢查單一權限", () => {
      permissions.hasPermission.mockReturnValue(true);

      const { result } = renderWithProvider();

      expect(result.current.checkPermission("view_dashboard")).toBe(true);
      expect(permissions.hasPermission).toHaveBeenCalledWith(
        null,
        "view_dashboard",
      );
    });

    it("應該正確檢查多重權限", () => {
      permissions.hasAnyPermission.mockReturnValue(true);

      const { result } = renderWithProvider();

      expect(
        result.current.checkAnyPermission(["view_dashboard", "edit_articles"]),
      ).toBe(true);
      expect(permissions.hasAnyPermission).toHaveBeenCalledWith(null, [
        "view_dashboard",
        "edit_articles",
      ]);
    });
  });

  describe("Firebase 狀態監聽", () => {
    it("應該在生產環境中處理 Firebase 用戶狀態變化", () => {
      window.location.hostname = "bright-edu.com";

      const mockFirebaseUser = {
        uid: "firebase-uid",
        email: "test@bright-edu.com",
      };

      // 模擬 Firebase 認證狀態變化
      mockUseUser.mockReturnValue({
        data: mockFirebaseUser,
        status: "success",
      });
      onAuthStateChanged.mockImplementation((auth, callback) => {
        callback(mockFirebaseUser);
        return mockUnsubscribe;
      });

      const { result } = renderWithProvider();

      expect(result.current.user).toEqual(mockFirebaseUser);
      expect(localStorage.getItem("isAuthenticated")).toBe("true");
    });

    it("應該在開發環境中從 localStorage 恢復用戶狀態", () => {
      window.location.hostname = "localhost";

      const storedUser = { email: "admin@bright-edu.com", isDevelopment: true };
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("devUser", JSON.stringify(storedUser));

      const { result } = renderWithProvider();

      expect(result.current.user).toEqual(storedUser);
      expect(result.current.userRole).toBe("super_admin");
    });
  });

  describe("錯誤處理", () => {
    it("應該處理 localStorage 解析錯誤", () => {
      window.location.hostname = "localhost";

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("devUser", "invalid-json");

      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const { result } = renderWithProvider();

      expect(consoleSpy).toHaveBeenCalledWith(
        "解析已儲存用戶時出錯:",
        expect.any(SyntaxError),
      );
      expect(result.current.user).toBeNull();
      expect(localStorage.getItem("isAuthenticated")).toBeNull();

      consoleSpy.mockRestore();
    });

    it("應該處理登出錯誤", async () => {
      window.location.hostname = "bright-edu.com";
      mockAuth.currentUser = { email: "test@bright-edu.com" };

      const logoutError = new Error("登出失敗");
      signOut.mockRejectedValueOnce(logoutError);

      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const { result } = renderWithProvider();

      await act(async () => {
        await result.current.logout();
      });

      expect(message.error).toHaveBeenCalledWith("登出失敗");
      expect(consoleSpy).toHaveBeenCalledWith("登出錯誤:", logoutError);

      consoleSpy.mockRestore();
    });
  });
});
