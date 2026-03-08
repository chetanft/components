import { NextResponse } from "next/server";
import { buildDocsIntroSpec } from "@/lib/machine-specs/docs-intro";

export const dynamic = "force-static";

export async function GET() {
  const spec = buildDocsIntroSpec();
  return new NextResponse(spec, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
