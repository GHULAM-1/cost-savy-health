import React, { useState } from "react";
import { Info } from "lucide-react";
import { FinalCalculation } from "./final-calculation";

export default function Calculator() {
  // STATES
  const [outOfPocketMax, setOutOfPocketMax] = useState<string>("");
  const [remainingAmount, setRemainingAmount] = useState<string | number>("");
  const [metDeductible, setMetDeductible] = useState<string>("");
  const [deductibleLeft, setDeductibleLeft] = useState<string | number>("");
  const [benefitType, setBenefitType] = useState<string>("");
  const [benefitAmount, setBenefitAmount] = useState<string | number>("");
  const [totalCost, setTotalCost] = useState<string>("0.00");
  const [showFinalCalculation, setShowFinalCalculation] =
    useState<boolean>(false);

  // HANDLERS
  const handleCalculate = () => {
    let cost = 0;
    if (outOfPocketMax === "no") {
      cost += Number(remainingAmount) || 0;
      if (metDeductible === "no") {
        cost += Number(deductibleLeft) || 0;
      }
      if (benefitType === "copay") {
        cost += Number(benefitAmount) || 0;
      } else if (benefitType === "coinsurance") {
        const procedureCost = 5000;
        cost += ((Number(benefitAmount) || 20) / 100) * procedureCost;
      }
    }
    setTotalCost(cost.toFixed(2));
    setShowFinalCalculation(true);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 rounded-2xl mb-4">
      {showFinalCalculation ? (
        <FinalCalculation
          totalCost={totalCost}
          onBack={() => setShowFinalCalculation(false)}
        />
      ) : (
        <>
          <p className="text-gray-700 mb-4 text-sm sm:text-base">
            Use the cost calculator below to estimate your total out-of-pocket
            cost. You can{" "}
            <a href="#" className="text-teal-700 hover:underline">
              log in to your insurance portal
            </a>{" "}
            to find your coverage information.
          </p>
          <div className="space-y-6">
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
                <label className="text-gray-900 font-medium text-sm sm:text-base">
                  Have you met your out-of-pocket-maximum?
                </label>
                <Info className="w-4 h-4 text-gray-400" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  className={`px-4 py-2 rounded-lg border ${
                    outOfPocketMax === "yes"
                      ? "border-teal-700 bg-white text-gray-900"
                      : "border-gray-300 bg-white text-gray-500"
                  }`}
                  onClick={() => setOutOfPocketMax("yes")}
                >
                  Yes
                </button>
                <button
                  className={`px-4 py-2 rounded-lg border ${
                    outOfPocketMax === "no"
                      ? "border-teal-700 bg-white text-gray-900"
                      : "border-gray-300 bg-white text-gray-500"
                  }`}
                  onClick={() => setOutOfPocketMax("no")}
                >
                  No
                </button>
              </div>
            </div>

            {outOfPocketMax === "no" && (
              <>
                <div>
                  <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                    How much do you have left?
                  </label>
                  <input
                    type="text"
                    value={remainingAmount}
                    onChange={(e) => setRemainingAmount(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base"
                    placeholder="Enter amount"
                  />
                </div>

                <div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
                    <label className="text-gray-900 font-medium text-sm sm:text-base">
                      Have you met your deductible?
                    </label>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      className={`px-4 py-2 rounded-lg border ${
                        metDeductible === "yes"
                          ? "border-teal-700 bg-white text-gray-900"
                          : "border-gray-300 bg-white text-gray-500"
                      }`}
                      onClick={() => setMetDeductible("yes")}
                    >
                      Yes
                    </button>
                    <button
                      className={`px-4 py-2 rounded-lg border ${
                        metDeductible === "no"
                          ? "border-teal-700 bg-white text-gray-900"
                          : "border-gray-300 bg-white text-gray-500"
                      }`}
                      onClick={() => setMetDeductible("no")}
                    >
                      No
                    </button>
                  </div>
                </div>

                {metDeductible === "no" && (
                  <div>
                    <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                      How much deductible do you have left?
                    </label>
                    <input
                      type="text"
                      value={deductibleLeft}
                      onChange={(e) => setDeductibleLeft(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base"
                      placeholder="Enter deductible amount"
                    />
                  </div>
                )}
                {(metDeductible === "no" || metDeductible === "yes") && (
                  <div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
                      <label className="text-gray-900 font-medium text-sm sm:text-base">
                        Do your benefits include a co-pay or co-insurance?
                      </label>
                      <Info className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        className={`px-4 py-2 rounded-lg border ${
                          benefitType === "copay"
                            ? "border-teal-700 bg-white text-gray-900"
                            : "border-gray-300 bg-white text-gray-500"
                        }`}
                        onClick={() => setBenefitType("copay")}
                      >
                        Co-Pay
                      </button>
                      <button
                        className={`px-4 py-2 rounded-lg border ${
                          benefitType === "coinsurance"
                            ? "border-teal-700 bg-white text-gray-900"
                            : "border-gray-300 bg-white text-gray-500"
                        }`}
                        onClick={() => setBenefitType("coinsurance")}
                      >
                        Co-Insurance
                      </button>
                    </div>
                    {benefitType && (
                      <div className="mt-4">
                        <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                          {benefitType === "copay"
                            ? "What is your co-pay?"
                            : "What is your co-insurance?"}
                        </label>
                        <input
                          type="text"
                          value={benefitAmount}
                          onChange={(e) => setBenefitAmount(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base"
                          placeholder={
                            benefitType === "copay"
                              ? "Enter co-pay amount"
                              : "Enter co-insurance amount"
                          }
                        />
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-4">
              <button
                onClick={() => {
                  setOutOfPocketMax("");
                  setRemainingAmount("");
                  setMetDeductible("");
                  setDeductibleLeft("");
                  setBenefitType("");
                  setBenefitAmount("");
                  setShowFinalCalculation(false);
                }}
                className="text-gray-700 font-medium text-sm sm:text-base"
              >
                Start Over
              </button>
              <button
                onClick={handleCalculate}
                className="bg-teal-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-800 transition-colors text-sm sm:text-base"
              >
                Calculate
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
