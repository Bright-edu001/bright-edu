import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import App from "../../App";
import commonRoutes from "../commonRoutes";
import {
  BlogDetailRouteElement,
  BlogRouteElement,
  BlogSearchRouteElement,
} from "../BlogRouteBoundaries";

vi.mock("../../context/SearchContext", () => ({
  SearchProvider: ({ children }) => (
    <div data-testid="search-provider">{children}</div>
  ),
}));

vi.mock("../../context/BlogContext", () => ({
  BlogProvider: ({ children }) => (
    <div data-testid="blog-provider">{children}</div>
  ),
}));

vi.mock("../../context/FirebaseInitContext", () => ({
  useFirebaseInit: () => ({ initError: null }),
  useFirebaseBasicReady: () => true,
}));

vi.mock("../../components/Header/Header", () => ({
  default: () => <div data-testid="header" />,
}));

vi.mock("../../components/Footer/Footer", () => ({
  default: () => <div data-testid="footer" />,
}));

vi.mock("../../components/FloatingButtons/FloatingButtons", () => ({
  default: () => <div data-testid="floating-buttons" />,
}));

vi.mock("../../components/ErrorBoundary/ErrorBoundary", () => ({
  default: ({ children }) => <>{children}</>,
}));

vi.mock("../../components/ScrollToTop/ScrollToTop", () => ({
  default: () => null,
}));

const Probe = () => <div data-testid="probe" />;

describe("Blog route provider boundaries", () => {
  it("wires /blog and /blog/:slug to SearchProvider only", () => {
    render(<BlogRouteElement Component={Probe} />);
    expect(screen.getByTestId("search-provider")).toBeInTheDocument();
    expect(screen.queryByTestId("blog-provider")).not.toBeInTheDocument();
    expect(screen.getByTestId("probe")).toBeInTheDocument();

    render(<BlogDetailRouteElement Component={Probe} />);
    expect(screen.getAllByTestId("search-provider")).toHaveLength(2);
    expect(screen.queryByTestId("blog-provider")).not.toBeInTheDocument();
  });

  it("wires /blog/search/:keyword to SearchProvider + BlogProvider", () => {
    render(<BlogSearchRouteElement Component={Probe} />);

    expect(screen.getByTestId("search-provider")).toBeInTheDocument();
    expect(screen.getByTestId("blog-provider")).toBeInTheDocument();
    expect(screen.getByTestId("probe")).toBeInTheDocument();
  });

  it("maps commonRoutes blog paths to the correct boundary components", () => {
    const blogRoute = commonRoutes.find((route) => route.path === "blog");
    const blogDetailRoute = commonRoutes.find(
      (route) => route.path === "blog/:slug",
    );
    const blogSearchRoute = commonRoutes.find(
      (route) => route.path === "blog/search/:keyword",
    );

    expect(blogRoute.element.type).toBe(BlogRouteElement);
    expect(blogDetailRoute.element.type).toBe(BlogDetailRouteElement);
    expect(blogSearchRoute.element.type).toBe(BlogSearchRouteElement);
  });

  it("does not mount BlogProvider/SearchProvider at App root", () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <App />,
          children: [
            { index: true, element: <div data-testid="route-content" /> },
          ],
        },
      ],
      { initialEntries: ["/"] },
    );

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("route-content")).toBeInTheDocument();
    expect(screen.queryByTestId("search-provider")).not.toBeInTheDocument();
    expect(screen.queryByTestId("blog-provider")).not.toBeInTheDocument();
  });
});
