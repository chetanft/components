import { NextResponse } from "next/server";
import { buildMigrationsSpec } from "@/lib/machine-specs/migrations";

export const dynamic = "force-static";

export async function GET() {
  const spec = buildMigrationsSpec();
  return new NextResponse(spec, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
