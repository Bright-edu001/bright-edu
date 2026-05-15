import React from "react";
import MobileMenuItem from "./MobileMenuItem";

function MobileNavPanel({
  open,
  items,
  expandedKeys,
  onToggle,
  onClose,
  closeButtonRef,
}) {
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
        className="mobile-drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-label="手機導覽選單"
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
