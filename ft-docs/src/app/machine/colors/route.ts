import { NextResponse } from "next/server";
import { buildColorsSpec } from "@/lib/machine-specs/colors";

export const dynamic = "force-static";

export async function GET() {
  const spec = buildColorsSpec();
  return new NextResponse(spec, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
