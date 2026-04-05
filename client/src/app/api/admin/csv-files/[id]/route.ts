import { NextRequest, NextResponse } from "next/server";

const BACKEND = "https://costsavvy-backend.onrender.com";
const ADMIN_KEY = process.env.COSTSAVVY_ADMIN_KEY || "";

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!ADMIN_KEY) return NextResponse.json({ error: "Admin key not configured" }, { status: 503 });
  const res = await fetch(`${BACKEND}/admin/csv-files/${params.id}`, {
    method: "DELETE",
    headers: { "X-Admin-Key": ADMIN_KEY },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
