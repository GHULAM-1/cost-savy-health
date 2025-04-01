import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import transparencyData from "@/data/about/transparency-data";

export default function Transparency() {
  const doValues = transparencyData.filter(item => item.type === "do");
  const dontValues = transparencyData.filter(item => item.type === "dont");

  const ValueItem = ({ type, text }: { type: "do" | "dont"; text: string }) => (
    <div className="flex  items-start w-[45%] gap-3 mb-5">
      {type === "do" ? (
        <CheckCircle size={12} className="text-emerald-500 mt-[7px] flex-shrink-0" />
      ) : (
        <XCircle size={12} className="text-red-500 mt-[8px] flex-shrink-0" />
      )}
      <p className="text-[15px]">{text}</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center py-[64px] md:py-[100px]">
      <div className="flex gap-[24px] mb-[24px] flex-col max-w-[700px]">
        <p className="text-[70px] tracking-tight text-center font-bold">
          We don't pick sides.
        </p>
        <p className="text-[15px]">
          Instead, we reach across the aisle to connect stakeholders in the
          healthcare industry toward a better, more transparent future.
        </p>
      </div>
      <div className="w-full max-w-[700px]">
        <div className="flex flex-row gap-y-4">
          <div className="flex flex-wrap justify-between gap-1">
            {transparencyData.map(item => (
              <ValueItem key={item.id} type={item.type} text={item.text} />
            ))}
            {/* {dontValues.map(item => (
              <ValueItem key={item.id} type={item.type} text={item.text} />
            ))} */}
          </div>
{/*           
          <div>
            {doValues.slice(2).map(item => (
              <ValueItem key={item.id} type={item.type} text={item.text} />
            ))}
            {dontValues.slice(2).map(item => (
              <ValueItem key={item.id} type={item.type} text={item.text} />
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}