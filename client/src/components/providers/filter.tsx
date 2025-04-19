"use client";
import React, { useState } from "react";
import { ListFilter } from "lucide-react";
import { DistanceFilter } from "./distance-filter";
import { ScoreFilter } from "./score-filter";
import { PriceFilter } from "./price-filter";
import { VerificationFilter } from "./verification-filter";
import { toast } from "sonner";

export function FilterBar() {
  // STATES
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [distanceOpen, setDistanceOpen] = useState(false);
  const [scoreOpen, setScoreOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [verificationOpen, setVerificationOpen] = useState(false);

  const [distance, setDistance] = useState("Within 50 miles");
  const [score, setScore] = useState("Any");
  const [price, setPrice] = useState({ min: "", max: "" });
  const [verification, setVerification] = useState("");

  // HANDLERS
  const validatePrice = () => {
    const min = parseFloat(price.min);
    const max = parseFloat(price.max);

    if ((price.min && isNaN(min)) || (price.max && isNaN(max))) {
      toast.error("Please enter valid numbers for price");
      return false;
    }

    if ((price.min && min < 0) || (price.max && max < 0)) {
      toast.error("Price cannot be negative");
      return false;
    }

    if (price.min && price.max && min > max) {
      toast.error("Minimum price cannot be greater than maximum price");
      return false;
    }

    return true;
  };

  const closeAllFilters = () => {
    setDistanceOpen(false);
    setScoreOpen(false);
    setPriceOpen(false);
    setVerificationOpen(false);
  };

  const toggleFilter = (
    filter: "distance" | "score" | "price" | "verification"
  ) => {
    if (filter === "distance") {
      setDistanceOpen((prev) => {
        if (!prev) {
          setScoreOpen(false);
          setPriceOpen(false);
          setVerificationOpen(false);
          return true;
        }
        return false;
      });
    } else if (filter === "score") {
      setScoreOpen((prev) => {
        if (!prev) {
          setDistanceOpen(false);
          setPriceOpen(false);
          setVerificationOpen(false);
          return true;
        }
        return false;
      });
    } else if (filter === "price") {
      setPriceOpen((prev) => {
        if (!prev) {
          setDistanceOpen(false);
          setScoreOpen(false);
          setVerificationOpen(false);
          return true;
        }
        return false;
      });
    } else if (filter === "verification") {
      setVerificationOpen((prev) => {
        if (!prev) {
          setDistanceOpen(false);
          setScoreOpen(false);
          setPriceOpen(false);
          return true;
        }
        return false;
      });
    }
  };

  const resetDistance = () => {
    setDistance("Within 50 miles");
    setDistanceOpen(false);
    toast.success("Distance filter reset to default");
  };

  const applyDistance = () => {
    setDistanceOpen(false);
    toast.success(`Distance filter set to: ${distance}`);
  };

  const resetScore = () => {
    setScore("Any");
    setScoreOpen(false);
    toast.success("Score filter reset to default");
  };

  const applyScore = () => {
    setScoreOpen(false);
    toast.success(`Score filter set to: ${score}`);
  };

  const resetPrice = () => {
    setPrice({ min: "", max: "" });
    setPriceOpen(false);
    toast.success("Price filter cleared");
  };

  const applyPrice = () => {
    if (!validatePrice()) return;

    const priceText =
      price.min || price.max
        ? `${price.min ? `$${price.min}` : "Any"} to ${
            price.max ? `$${price.max}` : "Any"
          }`
        : "Any price";

    setPriceOpen(false);
    toast.success(`Price range set to: ${priceText}`);
  };

  const resetVerification = () => {
    setVerification("");
    setVerificationOpen(false);
    toast.success("Verification filter cleared");
  };

  const applyVerification = () => {
    setVerificationOpen(false);
    toast.success(`Verification filter set to: ${verification || "Any"}`);
  };

  const handleModalReset = () => {
    setDistance("Within 50 miles");
    setScore("Any");
    setPrice({ min: "", max: "" });
    setVerification("");
    closeAllFilters();
    toast.success("All filters reset to default");
  };

  const handleModalApply = () => {
    if (!validatePrice()) return;

    toast.success("All filters applied successfully");
    setIsModalOpen(false);
    closeAllFilters();
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-start gap-6 px-4 sm:px-0">
        <button
          className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center bg-[#a9e6e1] rounded-full self-start"
          onClick={() => setIsModalOpen(true)}
        >
          <ListFilter className="text-[#1B3B36] w-4 h-4 md:w-6 md:h-6" />
        </button>
        <div className="flex flex-wrap gap-4">
          <DistanceFilter
            value={distance}
            onChange={setDistance}
            isOpen={distanceOpen}
            onToggle={() => toggleFilter("distance")}
            onReset={resetDistance}
            onApply={applyDistance}
          />
          <ScoreFilter
            value={score}
            onChange={setScore}
            isOpen={scoreOpen}
            onToggle={() => toggleFilter("score")}
            onReset={resetScore}
            onApply={applyScore}
          />
          <PriceFilter
            value={price}
            onChange={setPrice}
            isOpen={priceOpen}
            onToggle={() => toggleFilter("price")}
            onReset={resetPrice}
            onApply={applyPrice}
          />
          <VerificationFilter
            value={verification}
            onChange={setVerification}
            isOpen={verificationOpen}
            onToggle={() => toggleFilter("verification")}
            onReset={resetVerification}
            onApply={applyVerification}
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-white rounded-xl w-full max-w-2xl mx-4 p-6 z-10">
            <h2 className="text-2xl font-semibold mb-4">Filter Options</h2>
            <div className="space-y-6">
              <DistanceFilter
                value={distance}
                onChange={setDistance}
                isOpen={distanceOpen}
                onToggle={() => toggleFilter("distance")}
                modal
              />
              <ScoreFilter
                value={score}
                onChange={setScore}
                isOpen={scoreOpen}
                onToggle={() => toggleFilter("score")}
                modal
              />
              <PriceFilter
                value={price}
                onChange={setPrice}
                isOpen={priceOpen}
                onToggle={() => toggleFilter("price")}
                modal
              />
              <VerificationFilter
                value={verification}
                onChange={setVerification}
                isOpen={verificationOpen}
                onToggle={() => toggleFilter("verification")}
                modal
              />
            </div>
            <div className="flex justify-end mt-6 gap-4">
              <button
                onClick={handleModalReset}
                className="text-[#2A665B] font-medium"
              >
                Reset
              </button>
              <button
                onClick={handleModalApply}
                className="bg-[#2A665B] text-white font-medium px-4 py-2 rounded-full"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
