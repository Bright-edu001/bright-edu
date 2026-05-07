import React from "react";
import { BlogProvider } from "../context/BlogContext";
import { SearchProvider } from "../context/SearchContext";

export function BlogRouteElement({ Component }) {
  return (
    <SearchProvider>
      <Component />
    </SearchProvider>
  );
}

export function BlogDetailRouteElement({ Component }) {
  return (
    <SearchProvider>
      <Component />
    </SearchProvider>
  );
}

export function BlogSearchRouteElement({ Component }) {
  return (
    <SearchProvider>
      <BlogProvider>
        <Component />
      </BlogProvider>
    </SearchProvider>
  );
}
