import { NextResponse } from "next/server";
import { buildMachineSpecFromInput } from "@/lib/machine-spec";
import {
  COMPONENT_MACHINE_METADATA,
  COMPONENT_MACHINE_METADATA_BY_SLUG,
} from "@/data/component-machine-metadata.generated";

function slugToComponentName(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const metadata =
    COMPONENT_MACHINE_METADATA_BY_SLUG[slug] ||
    COMPONENT_MACHINE_METADATA[slugToComponentName(slug)];

  if (!metadata) {
    const componentName = slugToComponentName(slug);
    return new NextResponse(buildMachineSpecFromInput(componentName, {}), {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return new NextResponse(
    buildMachineSpecFromInput(metadata.componentName, {
      variantOptions: metadata.variantOptions,
      sizeOptions: metadata.sizeOptions,
      propNames: metadata.propNames,
      storyCount: metadata.storyCount,
    }),
    {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    }
  );
}

/**
 * Generate static params for all known components so this route
 * can be pre-rendered at build time.
 */
export async function generateStaticParams() {
  return Object.values(COMPONENT_MACHINE_METADATA).map((item) => ({
    slug: item.slug,
  }));
}
