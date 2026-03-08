import { NextResponse } from "next/server";
import { buildAccessibilitySpec } from "@/lib/machine-specs/accessibility";

export const dynamic = "force-static";

export async function GET() {
  const spec = buildAccessibilitySpec();
  return new NextResponse(spec, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
