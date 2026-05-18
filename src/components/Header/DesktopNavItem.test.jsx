import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import DesktopNavItem from "./DesktopNavItem";

const parentItem = {
  key: "parent",
  label: "Parent",
  to: "/parent",
  children: [
    {
      key: "child",
      label: "Child",
      to: "/child",
    },
  ],
};

describe("DesktopNavItem", () => {
  it("closes an open submenu when its routed parent link is activated", () => {
    render(
      <MemoryRouter>
        <ul>
          <DesktopNavItem item={parentItem} />
        </ul>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "展開 Parent 子選單" }));
    expect(screen.getByRole("menu")).toBeVisible();

    fireEvent.click(screen.getByRole("menuitem", { name: "Parent" }));

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
