import React from "react";
import { Hospital, ShieldPlus, Building2 } from "lucide-react";
import Card from "@/components/card";

function PannelFeatures() {
  return (
    <div className="lg:py-16 py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card
          title="For providers"
          description="Harness price transparency as a competitive edge without staffing up or spreading thin."
          icon={Hospital}
          iconColor="bg-[#A34E78]"
        />
        <Card
          title="For payers"
          description="Stay ahead of legislation and requirements while driving value-based care decisions."
          icon={ShieldPlus}
          iconColor="bg-[#A34E78]"
        />
        <Card
          title="For employers"
          description="Empower yourself to shop for healthcare plans with our transparency products."
          icon={Building2}
          iconColor="bg-[#A34E78]"
        />
      </div>
    </div>
  );
}

export default PannelFeatures;
