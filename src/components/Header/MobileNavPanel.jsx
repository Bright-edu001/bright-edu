import React, { useCallback, useEffect, useRef } from "react";
import MobileMenuItem from "./MobileMenuItem";

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const getFocusableElements = (container) =>
  Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
    (element) =>
      element.tabIndex >= 0 &&
      element.getAttribute("aria-hidden") !== "true",
  );

function MobileNavPanel({
  open,
  items,
  expandedKeys,
  onToggle,
  onClose,
  closeButtonRef,
}) {
  const panelRef = useRef(null);

  const focusFirstPanelControl = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const [firstFocusable] = getFocusableElements(panel);
    if (firstFocusable) {
      firstFocusable.focus();
    } else {
      panel.focus();
    }
  }, []);

  const handlePanelKeyDown = useCallback((event) => {
    if (event.key !== "Tab") return;

    const panel = panelRef.current;
    if (!panel) return;

    const focusableElements = getFocusableElements(panel);
    if (focusableElements.length === 0) {
      event.preventDefault();
      panel.focus();
      return;
    }

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey && activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable.focus();
      return;
    }

    if (!event.shiftKey && activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const handleFocusIn = (event) => {
      const panel = panelRef.current;
      if (panel && !panel.contains(event.target)) {
        focusFirstPanelControl();
      }
    };

    document.addEventListener("focusin", handleFocusIn);
    return () => document.removeEventListener("focusin", handleFocusIn);
  }, [focusFirstPanelControl, open]);

  if (!open) return null;

  return (
    <div className="mobile-drawer" role="presentation">
      <button
        className="mobile-drawer__backdrop"
        aria-label="關閉選單"
        onClick={onClose}
        tabIndex={-1}
        type="button"
      />
      <aside
        ref={panelRef}
        className="mobile-drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-label="手機導覽選單"
        tabIndex={-1}
        onKeyDown={handlePanelKeyDown}
      >
        <div className="mobile-drawer__header">
          <button
            ref={closeButtonRef}
            className="mobile-drawer__close"
            aria-label="關閉選單"
            onClick={onClose}
            type="button"
          >
            ✕
          </button>
        </div>
        <nav aria-label="手機導覽">
          <ul className="mobile-menu" role="menubar">
            {items.map((item) => (
              <MobileMenuItem
                key={item.key}
                item={item}
                expandedKeys={expandedKeys}
                onToggle={onToggle}
                onClose={onClose}
              />
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default MobileNavPanel;
