"use client";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./map"), { ssr: false });

import React from "react";

export default function ProviderMap() {
  return <Map />;
}
