"use client";

import { Collapsible } from "@base-ui/react/collapsible";

/** Achievements for one role — closed by default so the record stays scannable. */
export function RoleDetails({ items, label }: { items: string[]; label: string }) {
  return (
    <Collapsible.Root className="role-details">
      <Collapsible.Trigger className="role-toggle t-mono" aria-label={label}>
        <span className="role-toggle-open">Details +</span>
        <span className="role-toggle-close">Close −</span>
      </Collapsible.Trigger>
      <Collapsible.Panel className="role-panel">
        <ul>
          {items.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
