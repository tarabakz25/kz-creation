"use client";

import Script from "next/script";

export default function TypekitLoader() {
  return (
    <Script
      src="https://use.typekit.net/vza3sdw.js"
      strategy="afterInteractive"
      onLoad={() => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).Typekit?.load({ kitId: "vza3sdw", scriptTimeout: 3000, async: true });
        } catch {
          // no-op
        }
      }}
    />
  );
}
