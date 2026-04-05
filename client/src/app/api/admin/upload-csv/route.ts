import { NextRequest, NextResponse } from "next/server";

const BACKEND = "https://costsavvy-backend.onrender.com";
const ADMIN_KEY = process.env.COSTSAVVY_ADMIN_KEY || "";

export async function POST(req: NextRequest) {
  if (!ADMIN_KEY) {
    return NextResponse.json({ error: "Admin key not configured" }, { status: 503 });
  }
  const formData = await req.formData();
  const res = await fetch(`${BACKEND}/admin/upload-csv`, {
    method: "POST",
    headers: { "X-Admin-Key": ADMIN_KEY },
    body: formData,
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
