import React, { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import MobileNavPanel from "./MobileNavPanel";

const renderOpenPanel = () => {
  const closeButtonRef = createRef();
  const onClose = vi.fn();

  const view = render(
    <MemoryRouter>
      <button type="button">Background action</button>
      <MobileNavPanel
        open
        items={[{ key: "home", label: "Home", to: "/" }]}
        expandedKeys={new Set()}
        onToggle={vi.fn()}
        onClose={onClose}
        closeButtonRef={closeButtonRef}
      />
    </MemoryRouter>,
  );

  return { ...view, closeButtonRef, onClose };
};

describe("MobileNavPanel", () => {
  it("wraps Tab focus from the last drawer control back to the close button", () => {
    const { closeButtonRef, container } = renderOpenPanel();
    const panel = screen.getByRole("dialog");
    const lastDrawerLink = screen.getByRole("menuitem", { name: "Home" });

    lastDrawerLink.focus();
    fireEvent.keyDown(panel, { key: "Tab" });

    expect(document.activeElement).toBe(closeButtonRef.current);
    expect(document.activeElement).not.toBe(
      container.querySelector("button:not(.mobile-drawer__close)"),
    );
  });
});
