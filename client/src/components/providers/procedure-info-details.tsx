import React, { useEffect, useState } from "react";
import ProcedureInfo from "./procedure-info";
import ProcedureMidRange from "./procedure-mid-range";

export default function ProcedureInfoDetails({ type }: { type: string }) {

  return (
    <div className="lg:flex-row flex flex-col">
      <ProcedureInfo type={type} />
      <ProcedureMidRange />
    </div>
  );
}
