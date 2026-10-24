import assert from "node:assert/strict";
import test from "node:test";
import { shouldTransitionLink } from "./link-navigation";

const click = { defaultPrevented: false, button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false };
const hub = "https://abosh.io/notes/";
const article = { href: "/notes/confidence-interval-example/", download: false };

test("phone links remain browser navigation across hub, articles and main pages", () => {
  for (const href of [article.href, "/notes/", "/", "/about/", "/work/foreviq/", "/#work"]) {
    assert.equal(shouldTransitionLink(click, { ...article, href }, hub, true), false);
  }
});

test("ordinary desktop article links retain their transition", () => {
  assert.equal(shouldTransitionLink(click, article, hub, false), true);
});

test("modified clicks, new tabs, downloads and cancelled actions stay native", () => {
  for (const event of [{ ...click, metaKey: true }, { ...click, ctrlKey: true }, { ...click, shiftKey: true }, { ...click, altKey: true }, { ...click, button: 1 }, { ...click, defaultPrevented: true }]) {
    assert.equal(shouldTransitionLink(event, article, hub, false), false);
  }
  assert.equal(shouldTransitionLink(click, { ...article, target: "_blank" }, hub, false), false);
  assert.equal(shouldTransitionLink(click, { ...article, download: true }, hub, false), false);
});

test("external destinations and non-page protocols stay native", () => {
  for (const href of ["https://vrolen.com/", "//vrolen.com/", "mailto:hello@abosh.io", "tel:+491234567"]) {
    assert.equal(shouldTransitionLink(click, { ...article, href }, hub, false), false);
  }
});
