import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync, readdirSync } from "node:fs";
import { inlineNoteFigure } from "./note-figure";
test("remove style nodes while preserving SVG labels and explicit attributes", () => {
  const result = inlineNoteFigure('<svg xmlns="http://www.w3.org/2000/svg"><style>text{fill:red}</style><g><style>.x{fill:blue}</style><text class="x" x="12">A &amp; B</text></g></svg>');
  assert.equal(result.includes("<style"), false); assert.ok(result.includes('class="x"')); assert.ok(result.includes('x="12"')); assert.ok(result.includes("A &amp; B"));
});
test("malformed nested tag syntax is rejected rather than partially stripped", () => {
  assert.throws(() => inlineNoteFigure('<svg><sty<style>x</style>le>bad</style></svg>'));
});
test("literal markup in text remains escaped and entity declarations are rejected", () => {
  const result = inlineNoteFigure('<svg><text><![CDATA[<style>literal</style>]]></text></svg>');
  assert.equal(result.includes("<style>"), false); assert.ok(result.includes("&lt;style&gt;"));
  assert.throws(() => inlineNoteFigure('<!DOCTYPE svg [<!ENTITY a "text">]><svg><text>&a;</text></svg>'));
});
test("every authored figure remains valid and free of embedded style elements", () => {
  for (const file of readdirSync("content/notes/figures").filter(name => name.endsWith(".svg"))) {
    const result = inlineNoteFigure(readFileSync(`content/notes/figures/${file}`, "utf8"));
    assert.equal(/<style\b/i.test(result), false, file); assert.ok(result.includes("<svg"), file);
  }
});
