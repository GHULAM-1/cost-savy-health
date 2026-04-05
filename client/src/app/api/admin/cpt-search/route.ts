import { NextRequest, NextResponse } from "next/server";

const BACKEND = "https://costsavvy-backend.onrender.com";
const ADMIN_KEY = process.env.COSTSAVVY_ADMIN_KEY || "";

export async function GET(req: NextRequest) {
  if (!ADMIN_KEY) return NextResponse.json({ error: "Admin key not configured" }, { status: 503 });
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code") ?? "";
  const limit = searchParams.get("limit") ?? "100";
  const offset = searchParams.get("offset") ?? "0";
  const res = await fetch(
    `${BACKEND}/admin/cpt-search?code=${encodeURIComponent(code)}&limit=${limit}&offset=${offset}`,
    { headers: { "X-Admin-Key": ADMIN_KEY } }
  );
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
