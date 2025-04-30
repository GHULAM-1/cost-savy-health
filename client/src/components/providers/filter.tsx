"use client";
import React, { useState, useEffect } from "react";
import { ListFilter } from "lucide-react";
import { DistanceFilter } from "./distance-filter";
import { ScoreFilter } from "./score-filter";
import { PriceFilter } from "./price-filter";
import { VerificationFilter } from "./verification-filter";
import { toast } from "sonner";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [distanceOpen, setDistanceOpen] = useState(false);
  const [scoreOpen, setScoreOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [verificationOpen, setVerificationOpen] = useState(false);

  const [distance, setDistance] = useState("Within 50 miles");
  const [score, setScore] = useState("Any");
  const [price, setPrice] = useState({ min: "", max: "" });
  const [verification, setVerification] = useState("");

  useEffect(() => {
    const dist = searchParams.get("distance");
    const sc = searchParams.get("score");
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");
    const ver = searchParams.get("verification");

    if (dist) setDistance(dist);
    if (sc) setScore(sc);
    if (priceMin || priceMax)
      setPrice({ min: priceMin || "", max: priceMax || "" });
    if (ver) setVerification(ver);
  }, []);

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

  const updateQueryParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    distance ? params.set("distance", distance) : params.delete("distance");
    score && score !== "Any"
      ? params.set("score", score)
      : params.delete("score");
    price.min ? params.set("priceMin", price.min) : params.delete("priceMin");
    price.max ? params.set("priceMax", price.max) : params.delete("priceMax");
    verification
      ? params.set("verification", verification)
      : params.delete("verification");

    router.push(`${pathname}?${params.toString()}`);
  };

  const toggleFilter = (
    filter: "distance" | "score" | "price" | "verification"
  ) => {
    setDistanceOpen(filter === "distance" ? !distanceOpen : false);
    setScoreOpen(filter === "score" ? !scoreOpen : false);
    setPriceOpen(filter === "price" ? !priceOpen : false);
    setVerificationOpen(filter === "verification" ? !verificationOpen : false);
  };

  const applyAll = () => {
    if (!validatePrice()) return;
    toast.success("Filters applied successfully");
    setTimeout(() => {
      updateQueryParams();
      setIsModalOpen(false);
      closeAllFilters();
    }, 300);
  };

  const resetAll = () => {
    setDistance("Within 50 miles");
    setScore("Any");
    setPrice({ min: "", max: "" });
    setVerification("");
    closeAllFilters();
    const params = new URLSearchParams(searchParams.toString());
    ["distance", "score", "priceMin", "priceMax", "verification"].forEach((p) =>
      params.delete(p)
    );
    router.push(`${pathname}?${params.toString()}`);
    toast.success("Filter reset successful");
  };

  const closeAllFilters = () => {
    setDistanceOpen(false);
    setScoreOpen(false);
    setPriceOpen(false);
    setVerificationOpen(false);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-start gap-6 px-4 sm:px-0">
        <button
          className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center bg-[#A34E78] rounded-full self-start"
          onClick={() => setIsModalOpen(true)}
        >
          <ListFilter className="text-white w-4 h-4 md:w-6 md:h-6" />
        </button>
        <div className="flex flex-wrap gap-4">
          <DistanceFilter
            value={distance}
            onChange={setDistance}
            isOpen={distanceOpen}
            onToggle={() => toggleFilter("distance")}
            onReset={() => {
              setDistance("Within 50 miles");
              toast.success("Filter reset successful");
              setDistanceOpen(false);
            }}
            onApply={() => {
              updateQueryParams();
              toast.success("Filter applied successfully");
              setDistanceOpen(false);
            }}
          />
          <ScoreFilter
            value={score}
            onChange={setScore}
            isOpen={scoreOpen}
            onToggle={() => toggleFilter("score")}
            onReset={() => {
              setScore("Any");
              toast.success("Filter reset successful");
              setScoreOpen(false);
            }}
            onApply={() => {
              updateQueryParams();
              toast.success("Filter applied successfully");
              setScoreOpen(false);
            }}
          />
          <PriceFilter
            value={price}
            onChange={setPrice}
            isOpen={priceOpen}
            onToggle={() => toggleFilter("price")}
            onReset={() => {
              setPrice({ min: "", max: "" });
              toast.success("Filter reset successful");
              setPriceOpen(false);
            }}
            onApply={() => {
              if (validatePrice()) {
                updateQueryParams();
                toast.success("Filter applied successfully");
                setPriceOpen(false);
              }
            }}
          />
          <VerificationFilter
            value={verification}
            onChange={setVerification}
            isOpen={verificationOpen}
            onToggle={() => toggleFilter("verification")}
            onReset={() => {
              setVerification("");
              toast.success("Filter reset successful");
              setVerificationOpen(false);
            }}
            onApply={() => {
              updateQueryParams();
              toast.success("Filter reset successful");
              setVerificationOpen(false);
            }}
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
              <button onClick={resetAll} className="text-[#2A665B] font-medium">
                Reset
              </button>
              <button
                onClick={applyAll}
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
