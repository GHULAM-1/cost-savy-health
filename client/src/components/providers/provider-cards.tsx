"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getEntityRecords,
  getProviders,
  HealthcareRecord,
} from "../../api/search/api";
import ProviderCard from "@/components/providers/provider-card";
import { SearchHeader } from "./search-header";
import Pagination from "../pagination";

interface ProviderCardsProps {
  providers: HealthcareRecord[];
  loading: boolean;
  totalCount: number;
  searchCare: string;
}
export default function ProviderCards({
  providers,
  loading,
  totalCount,
  searchCare,
}: ProviderCardsProps) {
  // STATES
  const searchParams = useSearchParams();
  const router = useRouter();

  const distanceParam = searchParams.get("distance") || "Any";
  const distanceMatch = distanceParam.match(/\d+/);
  const maxDistance =
    distanceParam !== "Any" && distanceMatch
      ? parseInt(distanceMatch[0], 10)
      : null;

  const scoreParam = searchParams.get("score") || "";
  const scoreMatch = scoreParam.match(/\d+/);
  const minRating = scoreMatch ? parseInt(scoreMatch[0], 10) : null;

  const verificationParam = searchParams.get("verification") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;
  const [showVerification, setShowVerification] = useState(true);
  const [sortOrder, setSortOrder] = useState("lowest");

  const totalPages = Math.ceil(totalCount / cardsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  const handleCardClick = (id: string) => {
    const qs = searchParams.toString();
    router.push(`/providers/${id}?${qs}`);
  };
  console.log(providers);

  return (
    <div className="py-6 px-4">
      <div className="max-w-[1600px] space-y-4">
        <SearchHeader
          searchTerm={searchCare}
          resultCount={totalCount}
          showVerification={showVerification}
          onVerificationToggle={() => setShowVerification(!showVerification)}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />

        {loading ? (
          <p>Loading providers…</p>
        ) : providers.length > 0 ? (
          providers?.map((prov) => (
            <ProviderCard
              key={prov._id}
              facility={{
                id: prov._id,
                name: prov.provider_name,
                type: prov.billing_code_name,
                location: {
                  city: prov.provider_city,
                  state: prov.provider_state,
                  distance: 0,
                },
                rating: null,
                price: prov.negotiated_rate,
                inNetwork: true,
                initial: prov.provider_name.charAt(0).toUpperCase(),
                showVerfication: showVerification,
              }}
              onClick={() => handleCardClick(prov._id)}
            />
          ))
        ) : null}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
