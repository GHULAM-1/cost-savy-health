import { ArrowLeft } from "lucide-react";
type FinalCalculationProps = {
  totalCost: string;
  onBack: () => void;
};
export function FinalCalculation({ totalCost, onBack }: FinalCalculationProps) {
  return (
    <div className="w-full max-w-3xl flex flex-col items-center justify-center pt-6 gap-10">
      <div className="text-center space-y-2">
        <h2 className="text-normal font-bold text-[#A34E78]">
          Estimated up to
        </h2>
        <div className="text-2xl font-semibold text-[#A34E78]">
          ${totalCost}
        </div>
      </div>
      <button
        onClick={onBack}
        className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#A34E78] cursor-pointer text-white rounded-full hover:bg-[#6B1548] transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back to Calculator</span>
      </button>
    </div>
  );
}
