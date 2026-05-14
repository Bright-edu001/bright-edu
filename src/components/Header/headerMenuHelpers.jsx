import React from "react";

/**
 * Extract display text from a menu item label.
 * label can be:
 *   - plain string:    "UIC商學院碩士"
 *   - React element:   <Link to="...">text</Link>
 *   - nested React elements
 *
 * @param {*} label
 * @returns {string}
 */
export function getMenuItemText(label) {
  if (typeof label === "string") return label;
  if (React.isValidElement(label)) {
    return extractText(label.props.children);
  }
  return "";
}

function extractText(node) {
  if (node == null) return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement(node)) return extractText(node.props.children);
  return "";
}

/**
 * Extract route target (the `to` prop) from a menu item label.
 * Returns null if label is not a React element with a `to` prop.
 *
 * @param {*} label
 * @returns {string|null}
 */
export function getMenuItemTo(label) {
  if (
    React.isValidElement(label) &&
    label.props != null &&
    "to" in label.props
  ) {
    return label.props.to;
  }
  return null;
}

/**
 * Normalize a single menu item, adding metadata.
 * Does not mutate the original item.
 *
 * @param {object} item      - original menuConfig item
 * @param {number} depth     - nesting depth (0 = top-level)
 * @param {string|null} parentKey
 * @returns {object}
 */
function normalizeItem(item, depth, parentKey) {
  const { key, label, children } = item;
  const isLeaf = !Array.isArray(children) || children.length === 0;
  const text = getMenuItemText(label);
  const to = getMenuItemTo(label);

  const normalized = {
    key,
    label,
    text,
    to,
    isLeaf,
    depth,
    parentKey,
  };

  if (!isLeaf) {
    normalized.children = children.map((child) =>
      normalizeItem(child, depth + 1, key),
    );
  }

  return normalized;
}

/**
 * Normalize the full header menu items tree.
 * Returns a new array with metadata added; does not mutate the input.
 *
 * @param {Array} items - menuConfig items array
 * @returns {Array}
 */
export function normalizeHeaderMenuItems(items) {
  return items.map((item) => normalizeItem(item, 0, null));
}

/**
 * Flatten all items in the menu tree into a single array (depth-first).
 * Useful for lookup / search operations.
 *
 * @param {Array} items - normalized (or raw) menu items
 * @returns {Array}
 */
export function flattenHeaderMenuItems(items) {
  const result = [];
  const visit = (item) => {
    result.push(item);
    if (Array.isArray(item.children)) {
      item.children.forEach(visit);
    }
  };
  items.forEach(visit);
  return result;
}

/**
 * Find a menu item by key in the nested tree.
 * Returns the matching item or null if not found.
 *
 * @param {Array}  items
 * @param {string} key
 * @returns {object|null}
 */
export function findHeaderMenuItemByKey(items, key) {
  for (const item of items) {
    if (item.key === key) return item;
    if (Array.isArray(item.children)) {
      const found = findHeaderMenuItemByKey(item.children, key);
      if (found) return found;
    }
  }
  return null;
}
