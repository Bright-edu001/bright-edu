#!/usr/bin/env node
const fs = require("fs");

function renameKeys(data, depth = 0) {
  if (Array.isArray(data)) {
    return data.map((item) => renameKeys(item, depth));
  }
  if (data && typeof data === "object") {
    const result = {};
    for (const [key, value] of Object.entries(data)) {
      if (key === "details") {
        result.sections = renameKeys(value, depth + 1);
      } else if (key === "subDetails") {
        const newKey = depth <= 1 ? "items" : "subItems";
        result[newKey] = renameKeys(value, depth + 1);
      } else {
        result[key] = renameKeys(value, depth);
      }
    }
    return result;
  }
  return data;
}

function migrateFile(path) {
  const content = fs.readFileSync(path, "utf8");
  const json = JSON.parse(content);
  const migrated = renameKeys(json);
  fs.writeFileSync(path, JSON.stringify(migrated, null, 2) + "\n");
  console.log(`Migrated ${path}`);
}

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("Usage: node migrateContentStructure.js <file1> [file2 ...]");
  process.exit(1);
}
files.forEach(migrateFile);
