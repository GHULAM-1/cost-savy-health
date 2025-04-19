import React, { Suspense } from "react";
import SearchBar from "../landing-page/landing-form";

export default function ProvidersSearch() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchBar />
      </Suspense>
    </div>
  );
}
