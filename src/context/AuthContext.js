import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../config/firebaseConfig";
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userPermissions, setUserPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  // 檢查環境
  const isProduction =
    process.env.NODE_ENV === "production" ||
    window.location.hostname !== "localhost";

  // 檢查是否為允許的email網域
  const isAllowedEmail = (email) => {
    return email && email.endsWith("@bright-edu.com");
  };

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
          password
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
          setUser(mockUser);
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
      setUser(null);
      setUserRole(null);
      setUserPermissions([]);
      message.success("已登出");
    } catch (error) {
      message.error("登出失敗");
      console.error("Logout error:", error);
    }
  };

  // 監聽身份驗證狀態變化
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (isProduction) {
        // 生產環境：使用Firebase用戶
        if (firebaseUser && isAllowedEmail(firebaseUser.email)) {
          setUser(firebaseUser);
          setUserRoleAndPermissions(firebaseUser.email);
          localStorage.setItem("isAuthenticated", "true");
        } else {
          setUser(null);
          setUserRole(null);
          setUserPermissions([]);
          localStorage.removeItem("isAuthenticated");
        }
      } else {
        // 開發環境：檢查本地存儲
        const storedAuth = localStorage.getItem("isAuthenticated");
        const storedUser = localStorage.getItem("devUser");

        if (storedAuth === "true" && storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            // 設定開發環境權限
            setUserRole(USER_ROLES.SUPER_ADMIN);
            setUserPermissions(getRolePermissions(USER_ROLES.SUPER_ADMIN));
          } catch (error) {
            console.error("Error parsing stored user:", error);
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("devUser");
            setUser(null);
            setUserRole(null);
            setUserPermissions([]);
          }
        } else {
          setUser(null);
          setUserRole(null);
          setUserPermissions([]);
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, isProduction]);

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
