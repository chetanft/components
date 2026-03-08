import { NextResponse } from "next/server";
import { buildAiPromptsSpec } from "@/lib/machine-specs/ai-prompts";

export const dynamic = "force-static";

export async function GET() {
  const spec = buildAiPromptsSpec();
  return new NextResponse(spec, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
