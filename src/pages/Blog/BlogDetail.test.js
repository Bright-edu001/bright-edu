import React from "react";
import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import BlogDetail from "./BlogDetail";

vi.mock("../../components/MbaAreasHero/MbaAreasHero", () => () => <div />);
vi.mock("../../components/SearchBar/SearchBar", () => () => <div />);

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
  <MemoryRouter initialEntries={["/blog/1"]}>
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
      '&lt;script&gt;alert("xss")&lt;/script&gt;'
    );
    expect(heading.innerHTML).not.toContain("<script>");
  });

  test("renders stably across rerenders", () => {
    const { asFragment, rerender } = render(<BlogDetail />, { wrapper });
    // 使用 snapshot 驗證重渲染前後輸出一致，避免直接存取 DOM 節點
    rerender(<BlogDetail />);
    expect(asFragment()).toMatchSnapshot();
  });
});
