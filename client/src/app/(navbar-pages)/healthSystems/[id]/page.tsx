
import { Metadata } from "next";
import { generateMetadataTemplate } from "@/lib/metadata";
import { getHealthSystemById } from "@/api/sanity/queries";
import Link from "next/link";
import ShareButton from "@/components/providers/share-button";
import HealthSystemSearch from '@/components/health-systems/health-system-search';

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[]>>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const healthSystem = await getHealthSystemById(resolvedParams.id);

  if (!healthSystem) {
    return generateMetadataTemplate({ title: "Health System Not Found" });
  }

  const title = `${healthSystem.name} | Health System | Cost Savy Health`;
  const description = `Find detailed information about ${healthSystem.name}, a healthcare system with locations in ${healthSystem.locations.map((loc: any) => loc.city).join(", ")}.`;
  const keywords = [
    healthSystem.name,
    "health system",
    "healthcare network",
    "medical facilities",
    "healthcare costs",
    "medical procedures",
    "healthcare pricing",
    ...(healthSystem.locations
      ? healthSystem.locations.map((loc: any) => loc.city)
      : []),
    ...(healthSystem.services ? healthSystem.services : []),
  ].filter(Boolean);

  return generateMetadataTemplate({
    title,
    description,
    keywords,
    url: `https://costsavyhealth.com/healthSystems/${healthSystem.id}`,
  });
}

export default async function ProviderPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const healthSystem = await getHealthSystemById(id);

  if (!healthSystem) {
    return (
      <div className="p-10 text-center text-red-500">
        Health System not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#8C2F5D] text-white p-4">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold font-tiempos">
            {healthSystem.name}
          </h1>
          <div className="flex gap-2">
            <ShareButton />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row max-w-[1200px] mx-auto py-6 px-4 lg:px-8 gap-6">
        {/* Sidebar */}
        <aside className="lg:w-1/3 w-full">
          {/* Health System Card */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-xl mr-4">
                {healthSystem.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="font-semibold text-gray-800">
                  {healthSystem.name}
                </h2>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-semibold text-black mb-1">
                COST SAVVY VERIFICATION
              </p>
              <p className="text-sm text-gray-700 mb-2">
                {healthSystem.isVerified
                  ? "Verified rules for this health system ✓"
                  : "Unverified rules for this health system"}
              </p>
              <button className="text-xs font-semibold text-[#6B1548]">
                {healthSystem.claimUrl ? (
                  <Link href={healthSystem.claimUrl}>
                    Claim This Health System
                  </Link>
                ) : (
                  "Claim This Health System"
                )}
              </button>
            </div>
            <div className="border-[1px] mb-4"></div>

            {/* Locations */}
            {healthSystem.locations?.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 mb-2">
                  {healthSystem.locations.length} LOCATION
                  {healthSystem.locations.length > 1 ? "S" : ""}
                </p>
                <div className="space-y-3">
                  {healthSystem.locations.map((location: any, idx: number) => (
                    <div key={idx} className="pl-3">
                      <p className="text-base font-semibold text-[#6B1548]">
                        {location.facilityName}
                      </p>
                      <p className="text-sm text-gray-600">{location.street}</p>
                      <p className="text-sm text-gray-600">
                        {location.city}, {location.state}, {location.zip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:w-2/3 w-full">
          {/* Health System Services Tab */}
          <div className="bg-white rounded-lg shadow-sm border mb-6">
            <div className="border-b border-gray-200">
              <div className="px-6 py-4">
                <div className="flex space-x-8">
                  <button className="text-[#6B1548]  pb-2 font-medium">
                    Health System Services
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Search Bar */}
              <HealthSystemSearch />

              {/* All Services Section */}
              {healthSystem.services?.length > 0 && (
                <div>
                  <h3 className="text-3xl font-tiempos font-bold text-gray-800 mb-4">
                    All Services
                  </h3>
                  <div className="space-y-3">
                    {healthSystem.services.map(
                      (service: string, idx: number) => (
                        <div
                          key={idx}
                          className="border-t border-gray-200 py-5 last:border-b"
                        >
                          <p className="text-sm  font-medium  cursor-pointer">
                            {service}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {(!healthSystem.services ||
                healthSystem.services.length === 0) && (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No services data available for this health system.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <section className="bg-[#6B1548] py-16 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Are you a transparent provider or payer?
          </h2>
          <p className="text-white mb-8">
            There is a market for transparency. Let patients find you by
            claiming your provider page and listing your services. It only takes
            10 minutes.
          </p>
          <a href="/quote">
            <button className="bg-[#8C2F5D] hover:cursor-pointer text-white font-medium rounded-full px-6 py-3 transition">
              Get Started
            </button>
          </a>
        </div>
      </section>
    </div>
  );
}
