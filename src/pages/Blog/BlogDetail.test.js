import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import BlogDetail from "./BlogDetail";
import { BlogContext } from "../../context/BlogContext";

jest.mock("../../components/MbaAreasHero/MbaAreasHero", () => () => <div />);
jest.mock("../../components/SearchBar/SearchBar", () => () => <div />);

const providerValue = {
  enrollmentEvents: [{ id: 1 }],
  news: [],
  all: [
    {
      id: 1,
      title: "Sample",
      image: "img.jpg",
      excerpt: "excerpt",
      type: "enrollment",
      content: [
        {
          title:
            '<img src=x onerror="alert(1)">Hello<script>alert("xss")</script>',
          details: [],
        },
      ],
    },
  ],
  loading: false,
  error: null,
};

const wrapper = ({ children }) => (
  <BlogContext.Provider value={providerValue}>
    <MemoryRouter initialEntries={["/blog/1"]}>
      <Routes>
        <Route path="/blog/:id" element={children} />
      </Routes>
    </MemoryRouter>
  </BlogContext.Provider>
);

describe("BlogDetail", () => {
  test("sanitizes HTML before rendering", () => {
    render(<BlogDetail />, { wrapper });
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading.innerHTML).not.toMatch(/script|onerror/);
    expect(heading).toHaveTextContent("Hello");
  });

  test("renders stably across rerenders", () => {
    const { container, rerender } = render(<BlogDetail />, { wrapper });
    const firstHTML = container.innerHTML;
    rerender(<BlogDetail />);
    expect(container.innerHTML).toBe(firstHTML);
  });
});
