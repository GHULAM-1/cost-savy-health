import React, { useEffect, useState } from "react";
import ProcedureInfo from "./procedure-info";
import ProcedureMidRange from "./procedure-mid-range";

export default function ProcedureInfoDetails({ type }: { type: string }) {

  return (
    <div className="lg:flex-row flex justify-between flex-col">
      <div className="w-[50%]">
        <ProcedureInfo type={type} />
      </div>
      <div className="w-[50%]">
        <ProcedureMidRange />
      </div>
    </div>
  );
}
