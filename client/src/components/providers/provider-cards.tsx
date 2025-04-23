"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import ProviderCard from "@/components/providers/provider-card";
import { SearchHeader } from "./search-header";
import Pagination from "../pagination";

import { getHealthcareRecords } from "@/api/sanity/queries";
import { HealthcareRecord } from "@/types/sanity/sanity-types";

export default function ProviderCards() {
  // STATES
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchCare = searchParams.get("searchCare") || "";
  const zipCode = searchParams.get("zipCode") || "";
  const insurance = searchParams.get("insurance") || "";
  const priceMinParam = parseFloat(searchParams.get("priceMin") || "");
  const priceMaxParam = parseFloat(searchParams.get("priceMax") || "");
  const hasMin = !isNaN(priceMinParam);
  const hasMax = !isNaN(priceMaxParam);

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
  const [providers, setProviders] = useState<HealthcareRecord[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(true);
  const [sortOrder, setSortOrder] = useState("lowest");

  useEffect(() => {
    setLoading(true);

    getHealthcareRecords({
      page: currentPage,
      limit: cardsPerPage,
      state: "",
      zipCode,
      providerName: searchCare,
      insurance,
    })
      .then((res) => {
        let filtered = res.data.filter((prov: HealthcareRecord) => {
          const price = prov.negotiated_rate;
          if (hasMin && price < priceMinParam) return false;
          if (hasMax && price > priceMaxParam) return false;

          // if (maxDistance !== null && (prov.distance ?? Infinity) > maxDistance)
          //   return false;

          // if (minRating !== null && (prov.rating ?? 0) < minRating)
          //   return false;

          // if (verificationParam && verificationParam !== prov.verification)
          //   return false;

          return true;
        });

        // Apply sorting based on sortOrder
        if (sortOrder === "lowest") {
          filtered.sort((a, b) => a.negotiated_rate - b.negotiated_rate);
        } else if (sortOrder === "highest") {
          filtered.sort((a, b) => b.negotiated_rate - a.negotiated_rate);
        } else if (sortOrder === "distance") {
          // Sort by distance
          // filtered.sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
        } else if (sortOrder === "rating") {
          // Sort by rating
          // filtered.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        }

        setProviders(filtered);
        setTotalCount(res.pagination.total);
      })
      .catch((err) => {
        console.error(err);
        setProviders([]);
        setTotalCount(0);
      })
      .finally(() => setLoading(false));
  }, [
    searchCare,
    zipCode,
    insurance,
    currentPage,
    priceMinParam,
    priceMaxParam,
    distanceParam,
    scoreParam,
    verificationParam,
    sortOrder,
  ]);

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
    <div className="py-6 px-2">
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
          providers.map((prov) => (
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
        ) : (
          <p>No providers match your filters.</p>
        )}

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
