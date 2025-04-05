"use client";
import React from "react";
import { useState } from "react";
import { ProviderCard } from "@/components/providers/provider-card";
import { facilities } from "@/data/procedure/provider-facility";
import { SearchHeader } from "./search-header";
import { useSearchParams } from "next/navigation";
import Pagination from "../pagination";

function ProviderCards() {
  // HOOKS
  const searchParams = useSearchParams();

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

  //HANDLERS
  const handlePageChange = (pageNumber:any) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="py-6 px-2">
      <div className="max-w-4xl space-y-4">
        <SearchHeader
          searchTerm={initialSearchCare}
          resultCount={facilities.length}
          showVerification={showVerification}
          onVerificationToggle={() => setShowVerification(!showVerification)}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />
        
        {currentCards.map((facility) => (
          <ProviderCard key={facility.id} facility={facility} />
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