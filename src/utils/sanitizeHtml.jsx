export default function sanitizeHtml(dirty = "") {
  const parser = new DOMParser();
  const doc = parser.parseFromString(dirty, "text/html");
  doc.querySelectorAll("script").forEach((el) => el.remove());
  doc.querySelectorAll("*").forEach((el) => {
    [...el.attributes].forEach((attr) => {
      if (/^on/i.test(attr.name)) {
        el.removeAttribute(attr.name);
      }
    });
  });
  return doc.body.innerHTML || "";
}
