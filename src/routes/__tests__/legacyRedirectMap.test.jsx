import React from "react";
import {
  LEGACY_REDIRECT_MAP,
  getExactRedirectTarget,
} from "../../config/legacyRedirectMap";
import commonRoutes from "../commonRoutes";
import msuChineseRoutes from "../msuChineseRoutes";
import msuRoutes from "../msuRoutes";
import uicChineseRoutes from "../uicChineseRoutes";
import uicRoutes from "../uicRoutes";

// ---------------------------------------------------------------------------
// Helpers (mirrors publicRouteContract.test.jsx logic)
// ---------------------------------------------------------------------------
const publicRouteGroups = [
  commonRoutes,
  uicRoutes,
  uicChineseRoutes,
  msuRoutes,
  msuChineseRoutes,
];

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
      collectPublicRoutePaths(route.children, routePath).forEach((p) =>
        paths.add(p),
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

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("LEGACY_REDIRECT_MAP — unit tests", () => {
  it("contains at least one UIC and one MSU entry", () => {
    const keys = Object.keys(LEGACY_REDIRECT_MAP);
    expect(keys.some((k) => k.startsWith("/uic-business-school"))).toBe(true);
    expect(keys.some((k) => k.startsWith("/msu-business-school"))).toBe(true);
  });

  it("getExactRedirectTarget returns null for unmapped path", () => {
    expect(getExactRedirectTarget("/unknown-legacy/path")).toBeNull();
  });

  it("getExactRedirectTarget returns null for empty string", () => {
    expect(getExactRedirectTarget("")).toBeNull();
  });

  it("every key starts with /", () => {
    Object.keys(LEGACY_REDIRECT_MAP).forEach((key) => {
      expect(key.startsWith("/")).toBe(true);
    });
  });

  it("every value starts with /", () => {
    Object.values(LEGACY_REDIRECT_MAP).forEach((value) => {
      expect(value.startsWith("/")).toBe(true);
    });
  });

  // ---- specific required mappings ----

  it("UIC about-uic maps to correct Chinese path", () => {
    expect(getExactRedirectTarget("/uic-business-school/uic/about-uic")).toBe(
      "/伊利諾大學芝加哥分校/UIC商學院碩士/學校介紹",
    );
  });

  it("UIC MBA application maps to correct Chinese path", () => {
    expect(
      getExactRedirectTarget("/uic-business-school/mba/application"),
    ).toBe("/伊利諾大學芝加哥分校/MBA-Programs/申請資訊");
  });

  it("UIC MS finance maps to correct Chinese path", () => {
    expect(
      getExactRedirectTarget("/uic-business-school/ms/MS-in-Finance-MSF"),
    ).toBe("/伊利諾大學芝加哥分校/MS-Programs/MS-in-Finance-MSF");
  });

  it("MSU msf/master maps to MSF金融碩士 (not the broken 金融碩士)", () => {
    expect(getExactRedirectTarget("/msu-business-school/msf/master")).toBe(
      "/密西根州立大學/金融碩士課程/MSF金融碩士",
    );
  });

  it("MSU food-attractions maps to 景點與美食 (not 東蘭辛景點與美食)", () => {
    expect(
      getExactRedirectTarget(
        "/msu-business-school/msu/east-lansing/east-lansing-food-attractions",
      ),
    ).toBe("/密西根州立大學/MSU商學院/東蘭辛市/景點與美食");
  });

  it("MSU about-msu maps directly to 學校介紹 (not the legacy MSU學校介紹)", () => {
    expect(
      getExactRedirectTarget("/msu-business-school/msu/about-msu"),
    ).toBe("/密西根州立大學/MSU商學院/學校介紹");
  });

  it("chicago-city maps to correct casing Chicago-city", () => {
    expect(
      getExactRedirectTarget(
        "/uic-business-school/uic/chicago/chicago-city",
      ),
    ).toBe("/伊利諾大學芝加哥分校/UIC商學院碩士/芝加哥城市/Chicago-city");
  });
});

describe("LEGACY_REDIRECT_MAP — redirect contract", () => {
  it("every redirect target is a registered public route", () => {
    const publicRouteMatchers = getPublicRouteMatchers();
    const targets = Object.values(LEGACY_REDIRECT_MAP);

    expect(targets.length).toBeGreaterThan(0);

    const missingTargets = targets.filter(
      (target) => !isRegisteredPublicRoute(target, publicRouteMatchers),
    );

    expect(missingTargets).toEqual([]);
  });
});
