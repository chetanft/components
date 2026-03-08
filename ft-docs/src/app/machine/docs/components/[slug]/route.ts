import { NextResponse } from "next/server";
import { getComponentGuideline } from "@/data/designer-guidelines";
import { getAvailableStoryComponents } from "@/lib/story-loader";

/**
 * Dynamic route for per-component machine-readable specs.
 *
 * NOTE: The full `buildMachineSpec()` in lib/machine-spec.ts requires
 * StoryMeta and StoryDefinition from async Storybook story imports.
 * Those dynamic imports rely on webpack bundler context that is not
 * available in Route Handlers. This route therefore builds a static
 * spec from the designer-guidelines data (which IS server-safe) and
 * provides category, variants, do/don't guidance, Figma links, and
 * related components. Story-level detail (argTypes, story count) is
 * only available via the interactive ?view=machine client toggle.
 */

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
  const componentName = slugToComponentName(slug);
  const guideline = getComponentGuideline(componentName);

  if (!guideline) {
    // Still provide a minimal spec even without guidelines
    const lines = [
      `# ${componentName}`,
      `IMPORT: import { ${componentName} } from 'ft-design-system';`,
      "",
      "NOTE: No detailed designer guidelines available for this component.",
      "For full prop/story details, visit the interactive docs page:",
      `  /docs/components/${slug}?view=machine`,
    ];
    return new NextResponse(lines.join("\n"), {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const lines: string[] = [];

  lines.push(`# ${componentName}`);
  lines.push(`CATEGORY: ${guideline.category}`);
  lines.push(`IMPORT: import { ${componentName} } from 'ft-design-system';`);

  if (guideline.variants) {
    lines.push(
      `VARIANTS: ${guideline.variants.map((v) => v.name).join(" | ")}`
    );
  }

  if (guideline.figmaLinks && guideline.figmaLinks.length > 0) {
    guideline.figmaLinks.forEach((link) => {
      lines.push(`FIGMA: ${link}`);
    });
  }

  lines.push("");
  lines.push(`WHEN_TO_USE: ${guideline.whenToUse.join("; ")}`);
  lines.push(`WHEN_NOT_TO_USE: ${guideline.whenNotToUse.join("; ")}`);

  lines.push("");
  guideline.designDosAndDonts.forEach((pair) => {
    lines.push(`DO: ${pair.do}`);
    lines.push(`DONT: ${pair.dont}`);
  });

  if (guideline.relatedComponents.length > 0) {
    lines.push("");
    lines.push(`RELATED: ${guideline.relatedComponents.join(", ")}`);
  }

  if (guideline.variants && guideline.variants.length > 0) {
    lines.push("");
    lines.push("## Variant Details");
    guideline.variants.forEach((v) => {
      lines.push(`${v.name}: ${v.description} — ${v.useCase}`);
    });
  }

  return new NextResponse(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

/**
 * Generate static params for all known components so this route
 * can be pre-rendered at build time.
 */
export async function generateStaticParams() {
  const components = getAvailableStoryComponents();
  return components.map((name) => ({
    slug: name
      .replace(/([A-Z])/g, (m, p1, offset) =>
        offset > 0 ? `-${p1.toLowerCase()}` : p1.toLowerCase()
      ),
  }));
}
