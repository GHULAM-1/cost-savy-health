import { NextRequest, NextResponse } from "next/server";

const BACKEND = "https://costsavvy-backend.onrender.com";
const ADMIN_KEY = process.env.COSTSAVVY_ADMIN_KEY || "";

export async function GET() {
  if (!ADMIN_KEY) return NextResponse.json({ error: "Admin key not configured" }, { status: 503 });
  const res = await fetch(`${BACKEND}/admin/videos`, { headers: { "X-Admin-Key": ADMIN_KEY } });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function POST(req: NextRequest) {
  if (!ADMIN_KEY) return NextResponse.json({ error: "Admin key not configured" }, { status: 503 });
  const body = await req.json();
  const res = await fetch(`${BACKEND}/admin/videos`, {
    method: "POST",
    headers: { "X-Admin-Key": ADMIN_KEY, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
