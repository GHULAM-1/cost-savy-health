import { NextRequest, NextResponse } from "next/server";

const BACKEND = "https://costsavvy-backend.onrender.com";
const ADMIN_KEY = process.env.COSTSAVVY_ADMIN_KEY || "";

export async function GET(req: NextRequest) {
  if (!ADMIN_KEY) return NextResponse.json({ error: "Admin key not configured" }, { status: 503 });
  const { searchParams } = new URL(req.url);
  const res = await fetch(
    `${BACKEND}/admin/csv-files?limit=${searchParams.get("limit") ?? 50}&offset=${searchParams.get("offset") ?? 0}`,
    { headers: { "X-Admin-Key": ADMIN_KEY } }
  );
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
