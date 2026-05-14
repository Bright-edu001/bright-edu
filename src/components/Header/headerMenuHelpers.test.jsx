import React from "react";
import {
  getMenuItemText,
  getMenuItemTo,
  normalizeHeaderMenuItems,
  flattenHeaderMenuItems,
  findHeaderMenuItemByKey,
} from "./headerMenuHelpers";
import { menuItems } from "../../config/menuConfig";

// Duck-typed mock for a Link-like element (no react-router import needed;
// helpers only inspect props.to and props.children).
const MockLink = ({ to, children, className }) => (
  <a href={to} className={className}>
    {children}
  </a>
);

// ---------------------------------------------------------------------------
// getMenuItemText
// ---------------------------------------------------------------------------
describe("getMenuItemText", () => {
  it("extracts text from a plain string label", () => {
    expect(getMenuItemText("UIC商學院碩士")).toBe("UIC商學院碩士");
  });

  it("extracts text from a Link-like element label", () => {
    const label = <MockLink to="/">首頁</MockLink>;
    expect(getMenuItemText(label)).toBe("首頁");
  });

  it("extracts text from a Link-like element with className", () => {
    const label = (
      <MockLink to="/blog" className="nav-link-hover">
        活動與文章
      </MockLink>
    );
    expect(getMenuItemText(label)).toBe("活動與文章");
  });

  it("returns empty string for null", () => {
    expect(getMenuItemText(null)).toBe("");
  });

  it("returns empty string for undefined", () => {
    expect(getMenuItemText(undefined)).toBe("");
  });
});

// ---------------------------------------------------------------------------
// getMenuItemTo
// ---------------------------------------------------------------------------
describe("getMenuItemTo", () => {
  it("extracts to from a Link-like element", () => {
    const label = <MockLink to="/blog">活動與文章</MockLink>;
    expect(getMenuItemTo(label)).toBe("/blog");
  });

  it("returns null for a plain string label", () => {
    expect(getMenuItemTo("MSU金融碩士")).toBeNull();
  });

  it("returns null for null", () => {
    expect(getMenuItemTo(null)).toBeNull();
  });

  it("returns null for a React element without to prop", () => {
    const label = <span>text</span>;
    expect(getMenuItemTo(label)).toBeNull();
  });

  it("returns null for undefined", () => {
    expect(getMenuItemTo(undefined)).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// normalizeHeaderMenuItems
// ---------------------------------------------------------------------------
describe("normalizeHeaderMenuItems", () => {
  it("preserves item key", () => {
    const items = [{ key: "home", label: <MockLink to="/">首頁</MockLink> }];
    const result = normalizeHeaderMenuItems(items);
    expect(result[0].key).toBe("home");
  });

  it("preserves original label reference", () => {
    const label = <MockLink to="/">首頁</MockLink>;
    const items = [{ key: "home", label }];
    const result = normalizeHeaderMenuItems(items);
    expect(result[0].label).toBe(label);
  });

  it("marks leaf items as isLeaf: true", () => {
    const items = [{ key: "home", label: <MockLink to="/">首頁</MockLink> }];
    expect(normalizeHeaderMenuItems(items)[0].isLeaf).toBe(true);
  });

  it("marks items with empty children as isLeaf: true", () => {
    const items = [{ key: "home", label: "首頁", children: [] }];
    expect(normalizeHeaderMenuItems(items)[0].isLeaf).toBe(true);
  });

  it("marks parent items as isLeaf: false", () => {
    const items = [
      {
        key: "uic",
        label: "UIC商學院碩士",
        children: [
          {
            key: "about-uic",
            label: <MockLink to="/uic/about">學校介紹</MockLink>,
          },
        ],
      },
    ];
    expect(normalizeHeaderMenuItems(items)[0].isLeaf).toBe(false);
  });

  it("sets depth 0 for top-level items", () => {
    const items = [{ key: "home", label: "首頁" }];
    expect(normalizeHeaderMenuItems(items)[0].depth).toBe(0);
  });

  it("sets depth 1 for first-level children", () => {
    const items = [
      {
        key: "uic",
        label: "UIC",
        children: [{ key: "uic-sub", label: "sub" }],
      },
    ];
    const result = normalizeHeaderMenuItems(items);
    expect(result[0].children[0].depth).toBe(1);
  });

  it("sets depth 2 for second-level children", () => {
    const items = [
      {
        key: "l1",
        label: "L1",
        children: [
          {
            key: "l2",
            label: "L2",
            children: [{ key: "l3", label: "L3" }],
          },
        ],
      },
    ];
    const result = normalizeHeaderMenuItems(items);
    expect(result[0].children[0].children[0].depth).toBe(2);
  });

  it("sets parentKey to null for top-level items", () => {
    const items = [{ key: "home", label: "首頁" }];
    expect(normalizeHeaderMenuItems(items)[0].parentKey).toBeNull();
  });

  it("sets parentKey correctly for nested children", () => {
    const items = [
      {
        key: "uic",
        label: "UIC",
        children: [{ key: "uic-sub", label: "sub" }],
      },
    ];
    const result = normalizeHeaderMenuItems(items);
    expect(result[0].children[0].parentKey).toBe("uic");
  });

  it("extracts text from Link-like label", () => {
    const items = [
      { key: "home", label: <MockLink to="/">首頁</MockLink> },
    ];
    expect(normalizeHeaderMenuItems(items)[0].text).toBe("首頁");
  });

  it("extracts text from plain string label", () => {
    const items = [{ key: "uic", label: "UIC商學院碩士" }];
    expect(normalizeHeaderMenuItems(items)[0].text).toBe("UIC商學院碩士");
  });

  it("extracts to from Link-like label", () => {
    const items = [
      { key: "home", label: <MockLink to="/">首頁</MockLink> },
    ];
    expect(normalizeHeaderMenuItems(items)[0].to).toBe("/");
  });

  it("sets to: null for plain string label", () => {
    const items = [{ key: "uic", label: "UIC" }];
    expect(normalizeHeaderMenuItems(items)[0].to).toBeNull();
  });

  it("preserves nested children structure", () => {
    const items = [
      {
        key: "uic",
        label: "UIC",
        children: [
          {
            key: "uic-sub",
            label: "sub",
            children: [
              {
                key: "about-uic",
                label: <MockLink to="/uic/about">學校介紹</MockLink>,
              },
            ],
          },
        ],
      },
    ];
    const result = normalizeHeaderMenuItems(items);
    expect(result[0].children[0].children[0].key).toBe("about-uic");
    expect(result[0].children[0].children[0].to).toBe("/uic/about");
  });

  it("does not mutate the original menuConfig input", () => {
    const items = [
      {
        key: "uic",
        label: "UIC",
        children: [{ key: "uic-sub", label: "sub" }],
      },
    ];
    const originalLength = items.length;
    const originalChildLength = items[0].children.length;
    normalizeHeaderMenuItems(items);

    expect(items.length).toBe(originalLength);
    expect(items[0].children.length).toBe(originalChildLength);
    expect(items[0].depth).toBeUndefined();
    expect(items[0].isLeaf).toBeUndefined();
    expect(items[0].text).toBeUndefined();
    expect(items[0].to).toBeUndefined();
    expect(items[0].parentKey).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// flattenHeaderMenuItems
// ---------------------------------------------------------------------------
describe("flattenHeaderMenuItems", () => {
  it("flattens a two-level tree in depth-first order", () => {
    const items = normalizeHeaderMenuItems([
      {
        key: "uic",
        label: "UIC",
        children: [{ key: "uic-sub", label: "sub" }],
      },
      { key: "blog", label: <MockLink to="/blog">Blog</MockLink> },
    ]);
    const flat = flattenHeaderMenuItems(items);
    expect(flat.map((i) => i.key)).toEqual(["uic", "uic-sub", "blog"]);
  });

  it("returns all items from a 3-level tree", () => {
    const items = normalizeHeaderMenuItems([
      {
        key: "l1",
        label: "L1",
        children: [
          {
            key: "l2",
            label: "L2",
            children: [{ key: "l3", label: "L3" }],
          },
        ],
      },
    ]);
    const flat = flattenHeaderMenuItems(items);
    expect(flat.map((i) => i.key)).toEqual(["l1", "l2", "l3"]);
  });

  it("returns single item for a leaf-only list", () => {
    const items = normalizeHeaderMenuItems([
      { key: "home", label: <MockLink to="/">首頁</MockLink> },
    ]);
    const flat = flattenHeaderMenuItems(items);
    expect(flat).toHaveLength(1);
    expect(flat[0].key).toBe("home");
  });
});

// ---------------------------------------------------------------------------
// findHeaderMenuItemByKey
// ---------------------------------------------------------------------------
describe("findHeaderMenuItemByKey", () => {
  const items = normalizeHeaderMenuItems([
    {
      key: "uic",
      label: "UIC",
      children: [
        {
          key: "uic-sub",
          label: "sub",
          children: [
            {
              key: "about-uic",
              label: <MockLink to="/uic/about">學校介紹</MockLink>,
            },
          ],
        },
      ],
    },
    { key: "blog", label: <MockLink to="/blog">Blog</MockLink> },
  ]);

  it("finds a top-level item by key", () => {
    expect(findHeaderMenuItemByKey(items, "blog").key).toBe("blog");
  });

  it("finds a first-level nested item by key", () => {
    expect(findHeaderMenuItemByKey(items, "uic-sub").key).toBe("uic-sub");
  });

  it("finds a deeply nested item by key", () => {
    const found = findHeaderMenuItemByKey(items, "about-uic");
    expect(found.key).toBe("about-uic");
    expect(found.to).toBe("/uic/about");
  });

  it("returns null for a non-existent key", () => {
    expect(findHeaderMenuItemByKey(items, "nonexistent")).toBeNull();
  });

  it("returns null for an empty list", () => {
    expect(findHeaderMenuItemByKey([], "home")).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Deep UIC / MSU structure (mirrors real menuConfig nesting)
// ---------------------------------------------------------------------------
describe("normalizeHeaderMenuItems - deep UIC/MSU structure", () => {
  const uicItems = [
    {
      key: "uic",
      label: "UIC商學院碩士",
      children: [
        {
          key: "uic-sub",
          label: (
            <MockLink to="/uic/school" className="nav-link-color">
              UIC 伊利諾大學芝加哥分校
            </MockLink>
          ),
          children: [
            {
              key: "about-uic",
              label: <MockLink to="/uic/about">學校介紹</MockLink>,
            },
            {
              key: "rankings",
              label: (
                <MockLink to="/uic/rankings" className="nav-link-color">
                  排名與獎項
                </MockLink>
              ),
              children: [
                {
                  key: "aacsb",
                  label: <MockLink to="/uic/aacsb">AACSB</MockLink>,
                },
                {
                  key: "heed",
                  label: <MockLink to="/uic/heed">Heed</MockLink>,
                },
                {
                  key: "ranking",
                  label: <MockLink to="/uic/ranking">Ranking</MockLink>,
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  it("handles 4-level nesting: depth is correct at each level", () => {
    const result = normalizeHeaderMenuItems(uicItems);
    expect(result[0].depth).toBe(0);
    expect(result[0].children[0].depth).toBe(1);
    expect(result[0].children[0].children[0].depth).toBe(2);
    expect(result[0].children[0].children[1].children[0].depth).toBe(3);
  });

  it("finds a 4th-level item (aacsb) by key", () => {
    const result = normalizeHeaderMenuItems(uicItems);
    const aacsb = findHeaderMenuItemByKey(result, "aacsb");
    expect(aacsb).not.toBeNull();
    expect(aacsb.key).toBe("aacsb");
    expect(aacsb.depth).toBe(3);
    expect(aacsb.isLeaf).toBe(true);
    expect(aacsb.to).toBe("/uic/aacsb");
  });

  it("parent with Link label and children is not isLeaf, and has to", () => {
    const result = normalizeHeaderMenuItems(uicItems);
    const uicSub = findHeaderMenuItemByKey(result, "uic-sub");
    expect(uicSub.isLeaf).toBe(false);
    expect(uicSub.to).toBe("/uic/school");
    expect(uicSub.text).toBe("UIC 伊利諾大學芝加哥分校");
  });

  it("top-level string label has correct text and null to", () => {
    const result = normalizeHeaderMenuItems(uicItems);
    expect(result[0].text).toBe("UIC商學院碩士");
    expect(result[0].to).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Integration: real menuConfig
// ---------------------------------------------------------------------------
describe("integration with real menuConfig", () => {
  it("normalizes all top-level items without throwing", () => {
    const result = normalizeHeaderMenuItems(menuItems);
    expect(result).toHaveLength(menuItems.length);
  });

  it("all items in flattened tree have a string key", () => {
    const result = normalizeHeaderMenuItems(menuItems);
    const flat = flattenHeaderMenuItems(result);
    expect(flat.every((item) => typeof item.key === "string")).toBe(true);
  });

  it("finds the 'aacsb' item in the real menuConfig", () => {
    const result = normalizeHeaderMenuItems(menuItems);
    const aacsb = findHeaderMenuItemByKey(result, "aacsb");
    expect(aacsb).not.toBeNull();
    expect(aacsb.text).toBe("AACSB");
    expect(aacsb.isLeaf).toBe(true);
  });

  it("finds the 'msu' top-level item", () => {
    const result = normalizeHeaderMenuItems(menuItems);
    const msu = findHeaderMenuItemByKey(result, "msu");
    expect(msu).not.toBeNull();
    expect(msu.text).toBe("MSU金融碩士");
    expect(msu.depth).toBe(0);
    expect(msu.isLeaf).toBe(false);
  });

  it("contact item has correct to", () => {
    const result = normalizeHeaderMenuItems(menuItems);
    const contact = findHeaderMenuItemByKey(result, "contact");
    expect(contact).not.toBeNull();
    expect(contact.to).toBe("/聯絡我們");
    expect(contact.isLeaf).toBe(true);
  });

  it("blog item has correct to", () => {
    const result = normalizeHeaderMenuItems(menuItems);
    const blog = findHeaderMenuItemByKey(result, "blog");
    expect(blog).not.toBeNull();
    expect(blog.to).toBe("/blog");
    expect(blog.isLeaf).toBe(true);
  });

  it("does not mutate the original menuItems", () => {
    const originalKeys = menuItems.map((i) => i.key);
    normalizeHeaderMenuItems(menuItems);
    expect(menuItems.map((i) => i.key)).toEqual(originalKeys);
    expect(menuItems[0].depth).toBeUndefined();
    expect(menuItems[0].isLeaf).toBeUndefined();
  });
});
