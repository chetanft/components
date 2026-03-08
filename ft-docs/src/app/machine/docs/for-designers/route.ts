import { NextResponse } from "next/server";
import { buildDesignersSpec } from "@/lib/machine-specs/designers";

export const dynamic = "force-static";

export async function GET() {
  const spec = buildDesignersSpec();
  return new NextResponse(spec, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
