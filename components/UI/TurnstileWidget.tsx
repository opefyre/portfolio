"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

const TURNSTILE_CALLBACK_NAME = "__contactTurnstileSuccess";
const TURNSTILE_SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js";

export interface TurnstileWidgetProps {
  siteKey: string;
  onToken: (token: string) => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact" | "flexible";
  /** Optional: hide the widget visually (use with Cloudflare "invisible" widget type) */
  invisible?: boolean;
}

export default function TurnstileWidget({
  siteKey,
  onToken,
  theme = "dark",
  size = "compact",
  invisible = false,
}: TurnstileWidgetProps) {
  const onTokenRef = useRef(onToken);

  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  useEffect(() => {
    (window as unknown as Record<string, (token: string) => void>)[TURNSTILE_CALLBACK_NAME] = (token: string) => {
      onTokenRef.current(token);
    };
    return () => {
      delete (window as unknown as Record<string, unknown>)[TURNSTILE_CALLBACK_NAME];
    };
  }, []);

  const containerClass = invisible ? "sr-only absolute opacity-0 pointer-events-none" : "pt-2";

  return (
    <>
      <link rel="preconnect" href="https://challenges.cloudflare.com" />
      <Script src={TURNSTILE_SCRIPT} strategy="lazyOnload" async defer />
      <div className={containerClass}>
        <div
          className="cf-turnstile"
          data-sitekey={siteKey}
          data-theme={theme}
          data-size={size}
          data-callback={TURNSTILE_CALLBACK_NAME}
        />
      </div>
    </>
  );
}
