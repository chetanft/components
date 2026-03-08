import { NextResponse } from "next/server";
import { buildDevelopersSpec } from "@/lib/machine-specs/developers";

export const dynamic = "force-static";

export async function GET() {
  const spec = buildDevelopersSpec();
  return new NextResponse(spec, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
