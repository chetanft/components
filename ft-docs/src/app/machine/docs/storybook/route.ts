import { NextResponse } from "next/server";
import { buildStorybookSpec } from "@/lib/machine-specs/storybook";

export const dynamic = "force-static";

export async function GET() {
  const spec = buildStorybookSpec();
  return new NextResponse(spec, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
