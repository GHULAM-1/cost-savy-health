// app/api/geocode/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zip = searchParams.get("zip");
  if (!zip) {
    return NextResponse.json({ error: "Missing zip query param" }, { status: 400 });
  }

  try {
    // Use the q= parameter for better ZIP lookup
    const nomRes = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
        zip + " USA"
      )}`,
      {
        headers: {
          // Nominatim requires a unique User-Agent
          "User-Agent": "CostSavvyHealth/1.0 (you@yourdomain.com)",
        },
      }
    );

    if (!nomRes.ok) {
      throw new Error(`Nominatim returned ${nomRes.status}`);
    }

    const data = await nomRes.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Geocode error:", err);
    return NextResponse.json(
      { error: "Failed to fetch geocode data" },
      { status: 500 }
    );
  }
}
