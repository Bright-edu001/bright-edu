import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useUser, AuthProvider as ReactFireAuthProvider } from "reactfire";
import { app } from "../config/firebaseCore";
import { message } from "antd";
import {
  getUserRole,
  hasPermission,
  hasAnyPermission,
  getRolePermissions,
  USER_ROLES,
} from "../config/permissions";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth 必須在 AuthProvider 內使用");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const auth = getAuth(app);

  return (
    <ReactFireAuthProvider sdk={auth}>
      <AuthContextLogicWrapper>{children}</AuthContextLogicWrapper>
    </ReactFireAuthProvider>
  );
};

// 內部邏輯封裝，讓其可以使用 reactfire 的 useUser hooks
const AuthContextLogicWrapper = ({ children }) => {
  const auth = getAuth(app);

  // 檢查環境
  const isProduction =
    process.env.NODE_ENV === "production" ||
    window.location.hostname !== "localhost";

  // 使用 ReactFire 監聽 Firebase 用戶狀態 (支援 Suspense)
  // 在開發環境下，我們不依賴它來決定最終 user，但仍需調用遵守 Hook 規則
  const { data: firebaseUser, status: authStatus } = useUser();

  const [devUser, setDevUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userPermissions, setUserPermissions] = useState([]);

  // 在原本的設計中，loading 狀態自己維護，現在我們依賴 ReactFire 的 status
  // 只有當本機與 Firebase 都處理完畢才算結束 Loading
  const [devLoading, setDevLoading] = useState(!isProduction);

  // 檢查是否為允許的email網域 (移到前面解決 ESLint no-use-before-define 錯誤)
  const isAllowedEmail = (email) => {
    return email && email.endsWith("@bright-edu.com");
  };

  // 決定當前真正生效的 user (根據環境)
  const user = isProduction
    ? isAllowedEmail(firebaseUser?.email)
      ? firebaseUser
      : null
    : devUser;
  // 決定 loading 狀態
  const loading = isProduction ? authStatus === "loading" : devLoading;

  // 設定用戶角色和權限
  const setUserRoleAndPermissions = (email) => {
    if (!email) {
      setUserRole(null);
      setUserPermissions([]);
      return;
    }

    const role = getUserRole(email);
    const permissions = getRolePermissions(role);

    setUserRole(role);
    setUserPermissions(permissions);
  };

  // 登入功能
  const login = async (email, password) => {
    try {
      if (isProduction) {
        // 生產環境：使用Firebase Authentication
        if (!isAllowedEmail(email)) {
          throw new Error("只允許 @bright-edu.com 的電子郵件帳號登入");
        }

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const user = userCredential.user;

        if (!isAllowedEmail(user.email)) {
          await signOut(auth);
          throw new Error("只允許 @bright-edu.com 的電子郵件帳號登入");
        }

        // 設定用戶角色和權限
        setUserRoleAndPermissions(user.email);
        message.success("登入成功！");
        return user;
      } else {
        // 開發環境：使用原來的帳號密碼驗證
        const EXPECTED_USERNAME = "admin";
        const EXPECTED_PASSWORD = "0000";

        if (email === EXPECTED_USERNAME && password === EXPECTED_PASSWORD) {
          // 創建一個模擬的用戶對象
          const mockUser = {
            uid: "dev-user",
            email: "admin@bright-edu.com",
            displayName: "Admin User",
            isDevelopment: true,
          };
          setDevUser(mockUser);
          // 設定開發環境的超級管理員權限
          setUserRole(USER_ROLES.SUPER_ADMIN);
          setUserPermissions(getRolePermissions(USER_ROLES.SUPER_ADMIN));

          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("devUser", JSON.stringify(mockUser));
          message.success("登入成功！");
          return mockUser;
        } else {
          throw new Error("帳號或密碼錯誤！");
        }
      }
    } catch (error) {
      message.error(error.message);
      throw error;
    }
  };

  // Google登入 (僅生產環境)
  const loginWithGoogle = async () => {
    if (!isProduction) {
      message.error("Google登入僅在生產環境可用");
      return;
    }

    try {
      const provider = new GoogleAuthProvider();
      // 強制選擇帳號
      provider.setCustomParameters({
        prompt: "select_account",
      });

      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      if (!isAllowedEmail(user.email)) {
        await signOut(auth);
        throw new Error("只允許 @bright-edu.com 的電子郵件帳號登入");
      }

      // 設定用戶角色和權限
      setUserRoleAndPermissions(user.email);
      message.success("Google登入成功！");
      return user;
    } catch (error) {
      message.error(error.message);
      throw error;
    }
  };

  // 登出功能
  const logout = async () => {
    try {
      if (isProduction && auth.currentUser) {
        await signOut(auth);
      }

      // 清除本地存儲
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("devUser");
      if (!isProduction) setDevUser(null);
      setUserRole(null);
      setUserPermissions([]);
      message.success("已登出");
    } catch (error) {
      message.error("登出失敗");
      console.error("登出錯誤:", error);
    }
  };

  // 監聽身份驗證狀態變化（依賴 ReactFire 和 localStorage）
  useEffect(() => {
    if (isProduction) {
      // 生產環境：ReactFire 的 useUser 已自動處理狀態，我們只需更新權限
      if (firebaseUser && isAllowedEmail(firebaseUser.email)) {
        setUserRoleAndPermissions(firebaseUser.email);
        localStorage.setItem("isAuthenticated", "true");
      } else {
        setUserRole(null);
        setUserPermissions([]);
        localStorage.removeItem("isAuthenticated");
      }
    } else {
      // 開發環境：讀取本地存儲
      const storedAuth = localStorage.getItem("isAuthenticated");
      const storedUser = localStorage.getItem("devUser");

      if (storedAuth === "true" && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setDevUser(parsedUser);
          // 設定開發環境權限
          setUserRole(USER_ROLES.SUPER_ADMIN);
          setUserPermissions(getRolePermissions(USER_ROLES.SUPER_ADMIN));
        } catch (error) {
          console.error("解析已儲存用戶時出錯:", error);
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("devUser");
          setDevUser(null);
          setUserRole(null);
          setUserPermissions([]);
        }
      } else {
        setDevUser(null);
        setUserRole(null);
        setUserPermissions([]);
      }
      setDevLoading(false);
    }
  }, [firebaseUser, isProduction]);

  // 檢查是否已登入
  const isAuthenticated = () => {
    return user !== null;
  };

  // 權限檢查函數
  const checkPermission = (permission) => {
    return hasPermission(userRole, permission);
  };

  const checkAnyPermission = (permissionList) => {
    return hasAnyPermission(userRole, permissionList);
  };

  const value = {
    user,
    userRole,
    userPermissions,
    login,
    loginWithGoogle,
    logout,
    isAuthenticated,
    checkPermission,
    checkAnyPermission,
    loading,
    isProduction,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
