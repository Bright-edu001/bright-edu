import React from "react";
import { menuItems } from "../../config/menuConfig";
import {
  flattenHeaderMenuItems,
  normalizeHeaderMenuItems,
} from "../../components/Header/headerMenuHelpers";
import commonRoutes from "../commonRoutes";
import msuChineseRoutes from "../msuChineseRoutes";
import msuRoutes from "../msuRoutes";
import uicChineseRoutes from "../uicChineseRoutes";
import uicRoutes from "../uicRoutes";

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

const getHeaderMenuTargets = () =>
  flattenHeaderMenuItems(normalizeHeaderMenuItems(menuItems))
    .map((item) => item.to)
    .filter((to) => typeof to === "string" && to.startsWith("/"))
    .map(normalizePath);

const isRegisteredPublicRoute = (target, matchers) =>
  matchers.some((matcher) => matcher.test(target));

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
