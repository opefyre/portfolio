type Activation = {
  defaultPrevented: boolean;
  button: number;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
};

export const DOCUMENT_NAVIGATION_QUERY = "(max-width: 760px), (pointer: coarse), (hover: none)";

/** Only intercept an ordinary same-tab desktop link. All other links stay native. */
export function shouldTransitionLink(
  event: Activation,
  link: { href: string; target?: string; download: boolean },
  currentUrl: string,
  documentNavigation: boolean,
) {
  if (documentNavigation || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (link.download || (link.target && link.target.toLowerCase() !== "_self")) return false;
  const current = new URL(currentUrl);
  const destination = new URL(link.href, current);
  return ["http:", "https:"].includes(destination.protocol) && destination.origin === current.origin;
}
