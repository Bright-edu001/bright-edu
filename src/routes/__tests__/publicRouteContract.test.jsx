import React from "react";
import { menuItems } from "../../config/menuConfig";
import {
  flattenHeaderMenuItems,
  normalizeHeaderMenuItems,
} from "../../components/Header/headerMenuHelpers";
import { buildChineseUrl } from "../../config/urlMapping";
import { COMMON_ROUTE_PATHS, UIC_MBA_ROUTE_PATHS } from "../publicRoutePaths";
import commonRoutes from "../commonRoutes";
import msuChineseRoutes from "../msuChineseRoutes";
import msuRoutes from "../msuRoutes";
import uicChineseRoutes from "../uicChineseRoutes";
import uicRoutes from "../uicRoutes";

// ─── Route groups ─────────────────────────────────────────────────────────────

const publicRouteGroups = [
  commonRoutes,
  uicRoutes,
  uicChineseRoutes,
  msuRoutes,
  msuChineseRoutes,
];

// ─── Path helpers ─────────────────────────────────────────────────────────────

const normalizePath = (path) => {
  const pathOnly = path.split(/[?#]/)[0];
  if (pathOnly === "/") return "/";
  return `/${pathOnly.replace(/^\/+/, "").replace(/\/+$/, "")}`;
};

const joinRoutePaths = (parentPath, childPath) => {
  const parent = parentPath === "/" ? "" : parentPath.replace(/\/+$/, "");
  const child = childPath.replace(/^\/+/, "");
  return normalizePath(`${parent}/${child}`);
};

const getNavigateTarget = (route) => {
  if (
    React.isValidElement(route.element) &&
    typeof route.element.props?.to === "string"
  ) {
    return normalizePath(route.element.props.to);
  }
  return null;
};

const collectPublicRoutePaths = (routes, parentPath = "") => {
  const paths = new Set();

  routes.forEach((route) => {
    const routePath = route.index
      ? normalizePath(parentPath || "/")
      : route.path
        ? joinRoutePaths(parentPath, route.path)
        : normalizePath(parentPath || "/");

    paths.add(routePath);

    const navigateTarget = getNavigateTarget(route);
    if (navigateTarget?.startsWith("/")) {
      paths.add(navigateTarget);
    }

    if (Array.isArray(route.children)) {
      collectPublicRoutePaths(route.children, routePath).forEach((childPath) =>
        paths.add(childPath),
      );
    }
  });

  return paths;
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const routePathToMatcher = (routePath) => {
  const source = routePath
    .split("/")
    .map((segment) => {
      if (segment.startsWith(":")) return "[^/]+";
      return escapeRegExp(segment);
    })
    .join("/");

  return new RegExp(`^${source}/?$`, "i");
};

const getPublicRouteMatchers = () => {
  const routePaths = new Set(["/"]);
  publicRouteGroups.forEach((routes) => {
    collectPublicRoutePaths(routes).forEach((path) => routePaths.add(path));
  });
  return [...routePaths].map(routePathToMatcher);
};

const isRegisteredPublicRoute = (target, matchers) =>
  matchers.some((matcher) => matcher.test(target));

// ─── Header menu data ─────────────────────────────────────────────────────────

const getHeaderMenuTargets = () =>
  flattenHeaderMenuItems(normalizeHeaderMenuItems(menuItems))
    .map((item) => item.to)
    .filter((to) => typeof to === "string" && to.startsWith("/"))
    .map(normalizePath);

// ─── Footer internal links ────────────────────────────────────────────────────

// Footer.jsx (feature/test-preview) hardcodes these internal links as <a href>.
// After P0-3 is merged (footerConfig.js), replace this list by importing
// footerConfig and deriving links from UIC_SECTION_CONFIG, MSU_SECTION_CONFIG,
// and BLOG_LINK_CONFIG.
const FOOTER_INTERNAL_LINKS = [
  "/uic-business-school/uic/about-uic",
  "/uic-business-school/uic/rankings-awards",
  "/uic-business-school/mba/application",
  "/msu-business-school/msu/about-msu",
  "/msu-business-school/msu/rankings-awards",
  "/msu-business-school/msf/application",
  COMMON_ROUTE_PATHS.blogLink,
];

// ─── Legacy UrlRedirect data ──────────────────────────────────────────────────

// UrlRedirect routes have no explicit Navigate target; they compute their
// destination at runtime via buildChineseUrl(location.pathname).
// We collect those paths and verify each computed target is a registered route.
const getUrlRedirectRoutePaths = (routes) =>
  routes
    .filter((r) => r.path != null && getNavigateTarget(r) === null)
    .map((r) => normalizePath(r.path));

const getLegacyRedirectTargets = () =>
  getUrlRedirectRoutePaths([...uicRoutes, ...msuRoutes]).map((p) =>
    normalizePath(buildChineseUrl(p.slice(1))),
  );

// ─── Key canonical public routes ─────────────────────────────────────────────

// Spot-check the most important entry-point routes exist in the route config.
const KEY_PUBLIC_ROUTES = [
  // Common
  "/",
  COMMON_ROUTE_PATHS.blogLink,
  COMMON_ROUTE_PATHS.contactLink,
  // UIC (using publicRoutePaths constants where available)
  `/${UIC_MBA_ROUTE_PATHS.programs}`,
  `/${UIC_MBA_ROUTE_PATHS.application}`,
  "/伊利諾大學芝加哥分校/UIC商學院碩士/學校介紹",
  // MSU (hardcoded; MSU_ROUTE_PATHS added in P0-3)
  "/密西根州立大學/MSU商學院/學校介紹",
  "/密西根州立大學/金融碩士課程/申請資訊",
];

// ─── Test suites ──────────────────────────────────────────────────────────────

describe("public route/menu contract", () => {
  it("keeps every Header menu target registered in public route config", () => {
    const publicRouteMatchers = getPublicRouteMatchers();
    const menuTargets = getHeaderMenuTargets();

    expect(menuTargets.length).toBeGreaterThan(0);

    const missingTargets = menuTargets.filter(
      (target) => !isRegisteredPublicRoute(target, publicRouteMatchers),
    );

    expect(missingTargets).toEqual([]);
  });

  it("covers root, blog, contact, UIC, and MSU menu targets", () => {
    const menuTargets = getHeaderMenuTargets();

    expect(menuTargets).toEqual(
      expect.arrayContaining(["/", "/blog", "/聯絡我們"]),
    );
    expect(
      menuTargets.some((target) =>
        target.startsWith("/伊利諾大學芝加哥分校/"),
      ),
    ).toBe(true);
    expect(
      menuTargets.some((target) => target.startsWith("/密西根州立大學/")),
    ).toBe(true);
  });
});

describe("Footer internal link contract", () => {
  it("keeps every Footer internal link registered in public route config", () => {
    const publicRouteMatchers = getPublicRouteMatchers();

    const missingLinks = FOOTER_INTERNAL_LINKS.filter(
      (link) => !isRegisteredPublicRoute(link, publicRouteMatchers),
    );

    expect(missingLinks).toEqual([]);
  });

  it("Footer covers blog, UIC, and MSU navigation links", () => {
    expect(FOOTER_INTERNAL_LINKS).toContain(COMMON_ROUTE_PATHS.blogLink);
    expect(
      FOOTER_INTERNAL_LINKS.some(
        (l) =>
          l.startsWith("/uic-business-school/") ||
          l.startsWith("/伊利諾大學芝加哥分校/"),
      ),
    ).toBe(true);
    expect(
      FOOTER_INTERNAL_LINKS.some(
        (l) =>
          l.startsWith("/msu-business-school/") ||
          l.startsWith("/密西根州立大學/"),
      ),
    ).toBe(true);
  });
});

describe("Legacy redirect target contract", () => {
  it("every UrlRedirect route resolves to a registered Chinese public route", () => {
    const publicRouteMatchers = getPublicRouteMatchers();
    const redirectTargets = getLegacyRedirectTargets();

    expect(redirectTargets.length).toBeGreaterThan(0);

    const unresolved = redirectTargets.filter(
      (target) => !isRegisteredPublicRoute(target, publicRouteMatchers),
    );

    expect(unresolved).toEqual([]);
  });

  it("covers UIC and MSU legacy redirect paths", () => {
    const targets = getLegacyRedirectTargets();

    expect(
      targets.some((t) => t.startsWith("/伊利諾大學芝加哥分校/")),
    ).toBe(true);
    expect(
      targets.some((t) => t.startsWith("/密西根州立大學/")),
    ).toBe(true);
  });
});

describe("Key public route entries", () => {
  it("registers all key canonical public routes", () => {
    const publicRouteMatchers = getPublicRouteMatchers();

    const missingRoutes = KEY_PUBLIC_ROUTES.filter(
      (route) => !isRegisteredPublicRoute(route, publicRouteMatchers),
    );

    expect(missingRoutes).toEqual([]);
  });
});

