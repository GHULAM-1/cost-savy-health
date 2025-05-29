// components/provider-map/index.tsx
"use client";

import dynamic from "next/dynamic";
import React from "react";
import type { ProviderMapProps } from "./map";

// Force the dynamic import to have the correct props signature
const Map = dynamic<ProviderMapProps>(
  () => import("./map"),
  { ssr: false }
);

export default function ProviderMap(props: ProviderMapProps): JSX.Element {
  // Just forward everything you receive down to the actual Map
  return <Map {...props} />;
}
