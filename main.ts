import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "The neighbour's cat, who has ignored me for a year, trotted over at dawn and headbutted my ankle, then stayed for the whole kettle's whistle.";

// Gate guard: the sealed scorer only accepts UTF-8 text of 1-200 chars,
// non-whitespace, standing alone as one sentence. Fail loudly instead of
// writing an invalid entry.
if (LINE.length < 1 || LINE.length > 200 || !LINE.trim()) {
  throw new Error(`entry line must be 1-200 chars, got ${LINE.length}`);
}
if ((LINE.match(/\./g) ?? []).length !== 1 || !LINE.endsWith(".")) {
  throw new Error("entry line must be exactly one sentence");
}
// The gate reads one line: no embedded newline may sneak in.
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry line must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
