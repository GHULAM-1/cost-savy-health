"use client";
import React, { useState } from "react";
import { Building2, User2, X } from "lucide-react";

interface SignUpModalProps {
  onClose: () => void;
  onSelection: (option: "business" | "consumer") => void;
}

export default function SignUpModal({
  onClose,
  onSelection,
}: SignUpModalProps) {
  const [selected, setSelected] = useState<"business" | "consumer" | null>(
    null
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-8 relative mx-4">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <h1 className="text-[2.5rem] leading-tight font-semibold text-[#1B3B36] mb-4">
          I want to use Cost Savvy...
        </h1>
        <p className="text-2xl text-gray-500 mb-8">
          Select an option to continue.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => setSelected("business")}
            className={`p-6 rounded-2xl border-2 text-left transition-all ${
              selected === "business"
                ? "border-[#1B3B36] bg-[#f5f9f8]"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="mb-4">
              <Building2 size={48} className="text-[#1B3B36]" />
            </div>
            <h2 className="text-2xl font-semibold text-[#1B3B36] mb-2">
              As a business.
            </h2>
            <p className="text-gray-500 text-lg">
              Choose this option if you're a provider, payer, employer, or
              journalist.
            </p>
          </button>
          <button
            onClick={() => setSelected("consumer")}
            className={`p-6 rounded-2xl border-2 text-left transition-all ${
              selected === "consumer"
                ? "border-[#1B3B36] bg-[#f5f9f8]"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="mb-4">
              <User2 size={48} className="text-[#1B3B36]" />
            </div>
            <h2 className="text-2xl font-semibold text-[#1B3B36] mb-2">
              As a consumer.
            </h2>
            <p className="text-gray-500 text-lg">
              We're currently hard at work creating the best experience for you.
              Please check back soon.
            </p>
          </button>
        </div>

        <button
          onClick={() => selected && onSelection(selected)}
          className={`w-full py-4 rounded-full text-xl font-medium transition-all cursor-pointer ${
            selected
              ? "bg-[#8C2F5D] hover:bg-[#C85990] text-white "
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!selected}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
