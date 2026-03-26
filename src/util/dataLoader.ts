import * as fs from "fs";

export function loadJSON(path: string) {
  const raw = fs.readFileSync(path, "utf-8");
  return JSON.parse(raw);
}