import React from "react";

export default function PriceTransparency() {
  const features = [
    {
      title: "At a high level.",
      description:
        "Price transparency regulations make healthcare cost information accessible to everyone, making surprise medical bills a thing of the past.",
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
          <rect
            x="12"
            y="24"
            width="40"
            height="40"
            fill="#4CD7C6"
            fillOpacity="0.2"
          />
          <rect
            x="16"
            y="20"
            width="32"
            height="32"
            fill="#4CD7C6"
            fillOpacity="0.4"
          />
          <rect x="20" y="16" width="24" height="24" fill="#4CD7C6" />
        </svg>
      ),
    },
    {
      title: "The big three.",
      description:
        "Three main regulations define price transparency: The Hospital Price Transparency Final Rule and Transparency in Coverage Final Rule require hospitals and insurance plans to make their costs publicly available, and the No Surprises Act protects consumers from surprise medical bills.",
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
          <rect x="12" y="44" width="16" height="20" fill="#4CD7C6" />
          <rect x="24" y="32" width="16" height="32" fill="#4CD7C6" />
          <rect x="36" y="24" width="16" height="40" fill="#4CD7C6" />
        </svg>
      ),
    },
    {
      title: "Where we fit in.",
      description:
        "Turquoise Health is on a mission to make prices transparent and easy to understand for everyone. That starts with making this information available, accessible, and actionable.",
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
          <rect x="12" y="12" width="40" height="40" fill="#4CD7C6" />
          <rect x="28" y="28" width="8" height="8" fill="white" />
        </svg>
      ),
    },
  ];

  return (
    <section className="max-w-[1800px] mx-auto px-8 md:px-12  bg-gradient-to-b from-[#e9f8f8] to-white py-12 md:py-20 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-12">
        <div>
          <h2 className="text-[#03363D] text-4xl md:text-5xl font-serif font-bold leading-[1.1] mb-6">
            What the health is price transparency?
          </h2>
          <p className="text-lg text-[#03363D] leading-relaxed mb-8">
            For the first time in the history of US healthcare, hospitals and
            health plans are required by law to make their prices publicly
            available. Turquoise Health gives you the power and intelligence to
            take action, determine a price, and make cost-conscious decisions
            about your healthcare.
          </p>
          <a
            href="#"
            className="inline-block bg-[#1D5E5A] text-white px-6 py-3 rounded-full hover:bg-[#044955] transition-colors duration-300"
          >
            Resource Hub
          </a>
        </div>
        <div className="space-y-12">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex-shrink-0">{feature.icon}</div>
              <div>
                <h3 className="text-[#03363D] text-2xl font-bold mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#03363D] text-xl leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
