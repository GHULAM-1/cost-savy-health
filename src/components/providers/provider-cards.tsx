"use client";
import React from "react";
import { useState } from "react";
import { ProviderCard } from "@/components/providers/provider-card";
import { facilities } from "@/data/procedure/provider-facility";
import { SearchHeader } from "./search-header";

function ProviderCards() {
  const [showVerification, setShowVerification] = useState(true);
  const [sortOrder, setSortOrder] = useState("lowest");
  return (
    <div className="py-6 px-2">
      <div className="max-w-4xl space-y-4">
        <SearchHeader
          searchTerm="Articular Finger Fracture Repair - Surgical"
          resultCount={59}
          showVerification={showVerification}
          onVerificationToggle={() => setShowVerification(!showVerification)}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />
        {facilities.map((facility) => (
          <ProviderCard key={facility.id} facility={facility} />
        ))}
      </div>
    </div>
  );
}

export default ProviderCards;
