// app/providers/[id]/page.tsx
import { getProviderById } from "@/api/sanity/queries";
import Link from "next/link";

export default async function ProviderPage({
  params,
}: {
  params: { id: string };
}) {
  const provider = await getProviderById(params.id);

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
          <h1 className="text-xl font-semibold">{provider.name}</h1>
          <div className="flex gap-2">
            <button className="bg-[#6B1548] px-4 py-2 rounded text-sm">
              Add to Comparative Analysis
            </button>
            <button className="bg-white text-[#6B1548] px-4 py-2 rounded text-sm flex items-center gap-1">
              📤 Share
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row max-w-[1200px] mx-auto py-6 px-4 lg:px-8 gap-6">
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
                TURQUOISE VERIFICATION
              </p>
              <p className="text-sm text-gray-700 mb-2">
                {provider.isVerified
                  ? "Verified status for this provider ✓"
                  : "Unverified status for this provider"}
              </p>
              <button className="text-sm font-semibold text-[#6B1548]">
                Claim This Provider
              </button>
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

            {/* Map placeholder */}
            <div className="bg-gray-200 h-40 mb-4 rounded-lg flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-200 opacity-30"></div>
                <div className="absolute top-4 left-4 w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="absolute top-8 right-6 w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="absolute bottom-6 left-8 w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="absolute bottom-4 right-4 text-xs text-gray-600">
                  Map
                </div>
              </div>
            </div>

            {provider.nearbyProviders?.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 mb-2">
                  NEARBY PROVIDERS
                </p>
                <ul className="space-y-1">
                  {provider.nearbyProviders.map((nearby: any, i: any) => (
                    <li
                      key={i}
                      className="text-[#6B1548] font-semibold text-sm hover:underline cursor-pointer mb-2"
                    >
                      {" "}
                      {nearby}
                    </li>
                  ))}
                </ul>
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
        <main className="lg:w-2/3 w-full">
          {/* Provider Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#6B1548]">
                Provider Information
              </h2>
              <button className="bg-[#6B1548] text-white px-4 py-2 rounded-full text-sm hover:bg-teal-600 transition">
                Claim This Provider
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Name:</span>
                <span className="ml-2 text-gray-800">{provider.name}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Address:</span>
                <span className="ml-2 text-gray-800">
                  {provider.address.street}, {provider.address.city},{" "}
                  {provider.address.state} {provider.address.zip}
                </span>
              </div>
              {provider.phone && (
                <div>
                  <span className="font-semibold text-gray-700">Phone:</span>
                  <span className="ml-2 text-gray-800">{provider.phone}</span>
                </div>
              )}
              <div>
                <span className="font-semibold text-gray-700">
                  Medicare Provider ID:
                </span>
                <span className="ml-2 text-gray-800">
                  {provider.medicareProviderId}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">NPI:</span>
                <span className="ml-2 text-gray-800">{provider.npi}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">
                  Provider Type:
                </span>
                <span className="ml-2 text-gray-800">
                  {provider.providerType}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Ownership:</span>
                <span className="ml-2 text-gray-800">{provider.ownership}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Beds:</span>
                <span className="ml-2 text-gray-800">{provider.beds}</span>
              </div>
            </div>
          </div>

          {/* Clinical Services */}
          {provider.clinicalServices?.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold text-[#6B1548] mb-6">
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
                <button className="bg-[#6B1548] text-white px-6 py-2 rounded-full text-sm hover:bg-teal-600 transition">
                  Send Us Feedback
                </button>
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
          <button className="bg-[#8C2F5D]  text-white font-medium rounded-full px-6 py-3 transition">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}
