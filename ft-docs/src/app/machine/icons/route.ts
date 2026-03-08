import { NextResponse } from "next/server";
import { buildIconsSpec } from "@/lib/machine-specs/icons";

export const dynamic = "force-static";

export async function GET() {
  const spec = buildIconsSpec();
  return new NextResponse(spec, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
