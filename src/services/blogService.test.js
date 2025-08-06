const { processBlogData } = require("./blogService");

describe("processBlogData", () => {
  beforeEach(() => {
    process.env.PUBLIC_URL = "https://example.com";
  });

  afterEach(() => {
    delete process.env.PUBLIC_URL;
  });

  it("updates image paths for each item in an array", () => {
    const data = [
      { thumbnail: "/a.jpg", image: "/b.jpg" },
      { image: "/c.jpg" },
      { thumbnail: "/d.jpg" },
    ];

    const result = processBlogData(data);

    expect(result).toBe(data);
    expect(result).toEqual([
      {
        thumbnail: "https://example.com/a.jpg",
        image: "https://example.com/b.jpg",
      },
      { image: "https://example.com/c.jpg" },
      { thumbnail: "https://example.com/d.jpg" },
    ]);
  });

  it("updates image paths for a single object", () => {
    const obj = { thumbnail: "/thumb.jpg", image: "/img.jpg" };

    const result = processBlogData(obj);

    expect(result).toBe(obj);
    expect(result).toEqual({
      thumbnail: "https://example.com/thumb.jpg",
      image: "https://example.com/img.jpg",
    });
  });
});
