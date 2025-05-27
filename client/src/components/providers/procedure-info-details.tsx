import React, { useEffect, useState } from "react";
import ProcedureInfo from "./procedure-info";
import ProcedureMidRange from "./procedure-mid-range";

export default function ProcedureInfoDetails() {

  return (
    <div className="lg:flex-row flex flex-col">
      <ProcedureInfo />
      <ProcedureMidRange />
    </div>
  );
}
