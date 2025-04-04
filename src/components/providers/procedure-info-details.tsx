import React from "react";
import ProcedureInfo from "./procedure-info";
import ProcedureMidRange from "./procedure-mid-range";

export default function ProcedureInfoDetails() {
  return (
    <div className="flex">
      <ProcedureInfo />
      <ProcedureMidRange />
    </div>
  );
}
