"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProviderCard from "@/components/providers/provider-card";
import { facilities } from "@/data/procedure/provider-facility";
import { SearchHeader } from "./search-header";
import Pagination from "../pagination";

function ProviderCards() {
  // HOOKS
  const searchParams = useSearchParams();
  const router = useRouter();

  // STATES
  const [showVerification, setShowVerification] = useState(true);
  const [sortOrder, setSortOrder] = useState("lowest");
  const [currentPage, setCurrentPage] = useState(1);
  const initialSearchCare = searchParams.get("searchCare") || "";

  // PAGINATION SETTINGS
  const cardsPerPage = 10;
  const totalPages = Math.ceil(facilities.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = facilities.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0);
    }
  };

  const handleCardClick = (providerId: string) => {
    const queryString = searchParams.toString();
    router.push(`/providers/${providerId}?${queryString}`);
  };

  return (
    <div className="py-6 px-2">
      <div className="max-w-[1600px] space-y-4">
        <SearchHeader
          searchTerm={initialSearchCare}
          resultCount={facilities.length}
          showVerification={showVerification}
          onVerificationToggle={() => setShowVerification(!showVerification)}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />

        {currentCards.map((facility) => (
          <ProviderCard
            key={facility.id}
            facility={facility}
            onClick={() => handleCardClick(facility.id)}
          />
        ))}

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

export default ProviderCards;
