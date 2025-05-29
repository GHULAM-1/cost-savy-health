import React from "react";
import MyForm from "@/components/contact-us/form";

export default function WorkTogether() {
  return (
    <div className="bg-[#f6fbfc] px-6 py-12 md:p-24 md:px-16 lg:px-28 border-b-2">
      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-5xl font-bold text-[#8C2F5D] leading-tight">
            Let's work together.
          </h1>
          <p className="text-gray-600 text-lg">
            Turquoise Health is on a mission to simplify reimbursement. For
            media, partnerships, or general inquiries, don't hesitate to reach
            out.
          </p>
          <p className="text-gray-600">Looking forward to connecting.</p>
        </div>
        <MyForm />
      </div>
    </div>
  );
}
