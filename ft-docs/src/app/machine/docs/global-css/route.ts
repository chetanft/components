import { NextResponse } from "next/server";
import { buildGlobalCssSpec } from "@/lib/machine-specs/global-css";

export const dynamic = "force-static";

export async function GET() {
  const spec = buildGlobalCssSpec();
  return new NextResponse(spec, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
