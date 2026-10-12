import { XMLBuilder, XMLParser, XMLValidator } from "fast-xml-parser";

type XmlNode = { [key: string]: unknown };
/** Remove complete style nodes structurally, preserving SVG text and attributes.
 * These are authored assets, not a general HTML sanitisation interface.
 */
export function inlineNoteFigure(source: string) {
  if (/<!DOCTYPE/i.test(source)) throw new Error("Note figures must not declare XML entities");
  if (XMLValidator.validate(source) !== true) throw new Error("Invalid note figure XML");
  const options = { preserveOrder: true, ignoreAttributes: false, processEntities: true, trimValues: false };
  const nodes = new XMLParser(options).parse(source) as XmlNode[];
  function stripStyles(nodes: XmlNode[]): XmlNode[] {
    return nodes.filter(node => !Object.keys(node).some(key => key.split(":").at(-1)?.toLowerCase() === "style")).map(node => Object.fromEntries(Object.entries(node).map(([key, value]) => [key, Array.isArray(value) ? stripStyles(value) : value])));
  }
  return new XMLBuilder(options).build(stripStyles(nodes)) as string;
}
