import { Metadata } from "next";
import { generateMetadataTemplate } from "@/lib/metadata";
import { getProviderById } from "@/api/sanity/queries";
import Link from "next/link";
import ProviderMap from "@/components/providers/provider-map";
import ShareButton from '@/components/providers/share-button';

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[]>>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const provider = await getProviderById(resolvedParams.id);

  if (!provider) {
    return generateMetadataTemplate({ title: "Provider Not Found" });
  }

  const title = `${provider.name} | Healthcare Provider | Cost Savy Health`;
  const description = `Find detailed information about ${provider.name}, a healthcare provider located in ${provider.address.city}, ${provider.address.state}. Compare costs and services.`;
  const keywords = [
    provider.name,
    "healthcare provider",
    "medical provider",
    "healthcare costs",
    "medical procedures",
    "healthcare pricing",
    provider.address.city,
    provider.address.state,
    provider.providerType,
  ].filter(Boolean);

  return generateMetadataTemplate({
    title,
    description,
    keywords,
    url: `https://costsavyhealth.com/providers/${provider.id}`,
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
  const provider = await getProviderById(id);

  if (!provider) {
    return (
      <div className="p-10 text-center text-red-500">Provider not found</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#8C2F5D] text-white p-4">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold font-tiempos">
            {provider.name}
          </h1>
          <div className="flex gap-2">
            {/* <button className="bg-[#6B1548] px-4 py-2 rounded text-sm">
              Get a Complimentary Review
            </button> */}
            {/* Share Button with Dropdown */}
            <ShareButton />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row max-w-[1400px] mx-auto py-6 px-4 lg:px-8 gap-6">
        {/* Sidebar */}
        <aside className="lg:w-1/3 w-full">
          {/* Provider Card */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-xl mr-4">
                {provider.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="font-semibold text-gray-800">{provider.name}</h2>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-500 mb-1">
                Cost Savvy VERIFICATION
              </p>
              <p className="text-sm text-gray-700 mb-2">
                {provider.isVerified
                  ? "Verified status for this provider ✓"
                  : "Unverified status for this provider"}
              </p>
              {/* <button className="text-sm font-semibold text-[#6B1548]">
                Claim This Provider
              </button> */}
            </div>

            <div className="border-[1px] mb-4"></div>

            <div className="mb-4">
              <p className="text-xs font-semibold text-black mb-1">LOCATION</p>
              <p className="text-sm text-gray-700">{provider.address.street}</p>
              <p className="text-sm text-gray-700">
                {provider.address.city}, {provider.address.state},{" "}
                {provider.address.zip}
              </p>
              <button className="text-sm font-semibold text-[#6B1548]  mt-1">
                Get Directions
              </button>
            </div>

            {/* Map Component */}
            <div className="bg-gray-200 h-44 mb-4 rounded-lg flex items-center justify-center">
              <div className="w-full h-full rounded-lg overflow-hidden">
                <ProviderMap
                  zipCodes={[
                    parseInt(provider.address.zip.charAt(0)) * 10000,
                    parseInt(provider.address.zip.charAt(0)) * 10000 + 9999,
                  ]}
                  names={provider.nearbyProviders}
                />
              </div>
            </div>

            {provider.nearbyProviders?.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 mb-2">
                  NEARBY PROVIDERS
                </p>
                <div className="text-[#6B1548] font-semibold text-sm">
                  {provider.nearbyProviders.map((nearby: any, i: any) => (
                    <span key={i} className="hover:underline cursor-pointer">
                      {nearby}
                      {i < provider.nearbyProviders.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="border-[1px] mb-4"></div>
            <div>
              <p className="text-xs font-semibold text-black mb-2">CONTACT</p>
              {provider.phone && (
                <p className="text-sm text-[#6B1548] font-semibold mb-1">
                  {provider.phone}
                </p>
              )}
              {provider.website && (
                <Link
                  href={provider.website}
                  target="_blank"
                  className="text-[#6B1548] font-semibold underline text-sm"
                >
                  Visit Website
                </Link>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:w-4/5 w-full">
          {/* Provider Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-tiempos mb-5 font-bold text-[#6B1548]">
                Provider Information
              </h2>
              {/* <Link href={`/providers/${provider._id}`} passHref>
                <button className="bg-[#6B1548] text-white px-4 py-2 rounded-full text-sm hover:bg-[#C85990] transition">
                  Get Started
                </button>
              </Link> */}
            </div>
            <div className="flex md:flex-row flex-col justify-between gap-10">
              <div className="grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-4 gap-y-2 text-sm items-start">
                {/* Name */}
                <span className="font-semibold text-gray-700 uppercase">
                  NAME
                </span>
                <span className="text-gray-800">{provider.name}</span>

                {/* Address */}
                <span className="font-semibold text-gray-700 uppercase">
                  ADDRESS
                </span>
                <span className="text-gray-800">
                  {provider.address.street},<br />
                  {provider.address.city}, {provider.address.state}{" "}
                  {provider.address.zip}
                </span>

                {/* Phone */}
                {provider.phone && (
                  <>
                    <span className="font-semibold text-gray-700 uppercase">
                      PHONE
                    </span>
                    <span className="text-[#6B1548]">{provider.phone}</span>
                  </>
                )}

                {/* Medicare Provider ID */}
                <span className="font-semibold text-gray-700 uppercase">
                  MEDICARE PROVIDER ID
                </span>
                <span className="text-gray-800">
                  {provider.medicareProviderId}
                </span>

                {/* NPI */}
                <span className="font-semibold text-gray-700 uppercase">
                  NATIONAL PROVIDER ID (NPI)
                </span>
                <span className="text-gray-800">{provider.npi}</span>

                {/* Provider Type */}
                <span className="font-semibold text-gray-700 uppercase">
                  PROVIDER TYPE
                </span>
                <span className="text-gray-800">{provider.providerType}</span>

                {/* Ownership */}
                <span className="font-semibold text-gray-700 uppercase">
                  OWNERSHIP
                </span>
                <span className="text-gray-800">{provider.ownership}</span>

                {/* Beds */}
                <span className="font-semibold text-gray-700 uppercase">
                  BEDS
                </span>
                <span className="text-gray-800">{provider.beds}</span>
              </div>
              <div className="flex w-full md:w-[60%] gap-5 flex-col">
                <div className="rounded-lg overflow-hidden">
                  <ProviderMap
                    zipCodes={[
                      parseInt(provider.address.zip.charAt(0)) * 10000,
                      parseInt(provider.address.zip.charAt(0)) * 10000 + 9999,
                    ]}
                    names={provider.nearbyProviders}
                  />
                </div>
                {provider.nearbyProviders?.length > 0 && (
                  <div className="mb-4 flex gap-10">
                    <div className="w-[40%]">
                      <p className="text-xs font-semibold text-gray-500">
                        NEARBY PROVIDERS
                      </p>
                    </div>
                    <div className="text-[#6B1548] font-semibold text-sm flex flex-wrap gap-x-1">
                      {provider.nearbyProviders.map((nearby: any, i: any) => (
                        <span
                          key={i}
                          className="hover:underline cursor-pointer"
                        >
                          {nearby}
                          {i < provider.nearbyProviders.length - 1 ? "," : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Clinical Services */}
          {provider.clinicalServices?.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-tiempos font-bold text-[#6B1548] mb-6">
                Clinical Services
              </h2>
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  ALL SERVICES
                </p>
                <div className="grid grid-cols-1 gap-y-2 gap-x-8 text-sm">
                  {provider.clinicalServices.map(
                    (service: string, idx: number) => (
                      <div key={idx} className="text-gray-700">
                        • {service}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Send Us Feedback Button */}
              <div className="mt-8 text-center">
                <a
                  href="https://mail.google.com/mail/?view=cm&to=Chat@costsavvy.health&su=Feedback&body=Hello!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#6B1548] text-white px-6 py-2 rounded-full text-sm hover:bg-[#C85990] transition"
                >
                  Send Us Feedback
                </a>
              </div>
            </div>
          )}
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
