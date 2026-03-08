import { NextResponse } from "next/server";
import { buildNpmPackageSpec } from "@/lib/machine-specs/npm-package";

export const dynamic = "force-static";

export async function GET() {
  const spec = buildNpmPackageSpec();
  return new NextResponse(spec, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
