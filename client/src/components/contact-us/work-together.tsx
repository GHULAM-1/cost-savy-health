import React from "react";
import MyForm from "@/components/contact-us/form";
import { contactUs } from "@/api/sanity/queries";

export default async function WorkTogether() {
  const contact = await contactUs();
  const data = contact[0];
  return (
    <div className="bg-[#f6fbfc] px-6 py-12 md:p-24 md:px-16 lg:px-28 border-b-2">
      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-6">
          <h1 className="text-5xl font-tiempos  md:text-5xl font-bold text-[#8C2F5D] leading-tight">
            {data?.heading}
          </h1>
          <p className="text-gray-600 text-lg">
            {data.description}
          </p>
          <p className="text-gray-600">{data.subDescription}</p>
        </div>
        <MyForm />
      </div>
    </div>
  );
}
