// 權限配置文件
export const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  EDITOR: "editor",
  VIEWER: "viewer",
};

export const PERMISSIONS = {
  // 儀表板權限
  VIEW_DASHBOARD: "view_dashboard",

  // 文章管理權限
  VIEW_ARTICLES: "view_articles",
  CREATE_ARTICLES: "create_articles",
  EDIT_ARTICLES: "edit_articles",
  DELETE_ARTICLES: "delete_articles",
  PUBLISH_ARTICLES: "publish_articles",

  // 聯絡表單權限
  VIEW_CONTACT_FORMS: "view_contact_forms",
  DELETE_CONTACT_FORMS: "delete_contact_forms",
  EXPORT_CONTACT_FORMS: "export_contact_forms",

  // 用戶管理權限
  VIEW_USERS: "view_users",
  CREATE_USERS: "create_users",
  EDIT_USERS: "edit_users",
  DELETE_USERS: "delete_users",
  MANAGE_ROLES: "manage_roles",

  // 系統設定權限
  VIEW_SETTINGS: "view_settings",
  EDIT_SETTINGS: "edit_settings",
  MANAGE_SYSTEM: "manage_system",
};

// 角色權限對應表
export const ROLE_PERMISSIONS = {
  [USER_ROLES.SUPER_ADMIN]: [
    // 超級管理員擁有所有權限
    ...Object.values(PERMISSIONS),
  ],

  [USER_ROLES.ADMIN]: [
    // 管理員權限
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_ARTICLES,
    PERMISSIONS.CREATE_ARTICLES,
    PERMISSIONS.EDIT_ARTICLES,
    PERMISSIONS.DELETE_ARTICLES,
    PERMISSIONS.PUBLISH_ARTICLES,
    PERMISSIONS.VIEW_CONTACT_FORMS,
    PERMISSIONS.DELETE_CONTACT_FORMS,
    PERMISSIONS.EXPORT_CONTACT_FORMS,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.CREATE_USERS,
    PERMISSIONS.EDIT_USERS,
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.EDIT_SETTINGS,
  ],

  [USER_ROLES.EDITOR]: [
    // 編輯者權限
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_ARTICLES,
    PERMISSIONS.CREATE_ARTICLES,
    PERMISSIONS.EDIT_ARTICLES,
    PERMISSIONS.VIEW_CONTACT_FORMS,
    PERMISSIONS.VIEW_USERS,
  ],

  [USER_ROLES.VIEWER]: [
    // 檢視者權限
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_ARTICLES,
    PERMISSIONS.VIEW_CONTACT_FORMS,
  ],
};

// 預設用戶角色配置 (基於email)
export const DEFAULT_USER_ROLES = {
  // 超級管理員 (可以有多個)
  "admin@bright-edu.com": USER_ROLES.SUPER_ADMIN,
  "ceo@bright-edu.com": USER_ROLES.SUPER_ADMIN,
  "web@bright-edu.com": USER_ROLES.SUPER_ADMIN,

  // 一般管理員
  "manager@bright-edu.com": USER_ROLES.ADMIN,
  "operations@bright-edu.com": USER_ROLES.ADMIN,

  // 編輯者
  "editor@bright-edu.com": USER_ROLES.EDITOR,
  "content@bright-edu.com": USER_ROLES.EDITOR,

  // 其他 @bright-edu.com 用戶預設為檢視者
  // 可以在後台管理中手動調整
};

// 獲取用戶角色
export const getUserRole = (email) => {
  if (!email || !email.endsWith("@bright-edu.com")) {
    return null; // 非組織用戶無角色
  }

  // 檢查是否有特定角色配置
  if (DEFAULT_USER_ROLES[email]) {
    return DEFAULT_USER_ROLES[email];
  }

  // 預設為檢視者
  return USER_ROLES.VIEWER;
};

// 獲取角色權限
export const getRolePermissions = (role) => {
  return ROLE_PERMISSIONS[role] || [];
};

// 檢查用戶是否有特定權限
export const hasPermission = (userRole, permission) => {
  const permissions = getRolePermissions(userRole);
  return permissions.includes(permission);
};

// 檢查用戶是否有任一權限
export const hasAnyPermission = (userRole, permissionList) => {
  return permissionList.some((permission) =>
    hasPermission(userRole, permission)
  );
};

// 角色顯示名稱
export const ROLE_DISPLAY_NAMES = {
  [USER_ROLES.SUPER_ADMIN]: "超級管理員",
  [USER_ROLES.ADMIN]: "管理員",
  [USER_ROLES.EDITOR]: "編輯者",
  [USER_ROLES.VIEWER]: "檢視者",
};

// 權限顯示名稱
export const PERMISSION_DISPLAY_NAMES = {
  [PERMISSIONS.VIEW_DASHBOARD]: "檢視儀表板",
  [PERMISSIONS.VIEW_ARTICLES]: "檢視文章",
  [PERMISSIONS.CREATE_ARTICLES]: "建立文章",
  [PERMISSIONS.EDIT_ARTICLES]: "編輯文章",
  [PERMISSIONS.DELETE_ARTICLES]: "刪除文章",
  [PERMISSIONS.PUBLISH_ARTICLES]: "發布文章",
  [PERMISSIONS.VIEW_CONTACT_FORMS]: "檢視聯絡表單",
  [PERMISSIONS.DELETE_CONTACT_FORMS]: "刪除聯絡表單",
  [PERMISSIONS.EXPORT_CONTACT_FORMS]: "匯出聯絡表單",
  [PERMISSIONS.VIEW_USERS]: "檢視用戶",
  [PERMISSIONS.CREATE_USERS]: "建立用戶",
  [PERMISSIONS.EDIT_USERS]: "編輯用戶",
  [PERMISSIONS.DELETE_USERS]: "刪除用戶",
  [PERMISSIONS.MANAGE_ROLES]: "管理角色",
  [PERMISSIONS.VIEW_SETTINGS]: "檢視設定",
  [PERMISSIONS.EDIT_SETTINGS]: "編輯設定",
  [PERMISSIONS.MANAGE_SYSTEM]: "系統管理",
};
