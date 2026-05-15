import React from "react";
import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import BlogDetail from "./BlogDetail";

vi.mock("../../components/MbaAreasHero/MbaAreasHero", () => ({
  default: () => <div />,
}));
vi.mock("../../components/SearchBar/SearchBar", () => ({
  default: () => <div />,
}));

// Mock useBlogData hook
vi.mock("../../hooks/useBlogData", () => ({
  useBlogData: () => ({
    enrollmentEvents: [
      {
        id: 1,
        title: "Sample",
        image: "img.jpg",
        excerpt: "excerpt",
        type: "enrollment",
        content: [
          {
            title: 'Hello<script>alert("xss")</script>',
            flagImage: "/flag.png",
            details: [],
          },
        ],
      },
    ],
    news: [],
    loading: false,
    error: null,
  }),
}));

const wrapper = ({ children }) => (
  <MemoryRouter
    initialEntries={["/blog/1"]}
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <Routes>
      <Route path="/blog/:id" element={children} />
    </Routes>
  </MemoryRouter>
);

describe("BlogDetail", () => {
  test("renders flag image and escapes title HTML", () => {
    render(<BlogDetail />, { wrapper });
    const heading = screen.getByRole("heading", { level: 2 });
    const img = within(heading).getByRole("img");
    expect(img).toHaveAttribute("src", "/flag.png");
    expect(heading.innerHTML).toContain(
      '&lt;script&gt;alert("xss")&lt;/script&gt;',
    );
    expect(heading.innerHTML).not.toContain("<script>");
  });

  test("renders stably across rerenders", () => {
    const { container, rerender } = render(<BlogDetail />, { wrapper });
    const before = container.innerHTML;
    rerender(<BlogDetail />);
    expect(container.innerHTML).toBe(before);
    expect(screen.getByRole("heading", { name: "Sample" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Sample" })).toHaveAttribute(
      "src",
      "img.jpg",
    );
    expect(container.querySelector('a[href="/blog"]')).toHaveAttribute(
      "href",
      "/blog",
    );
    expect(container.innerHTML).toContain(
      '&lt;script&gt;alert("xss")&lt;/script&gt;',
    );
  });
});
