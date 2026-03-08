"use client";

import { useRouter, usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { docsConfig } from "@/config/docs";
import { hasStory, getAvailableStoryComponents } from "@/lib/story-loader";
import { COMPONENT_COUNT } from "@/data/design-system.generated";
import { DocPageHeader, DocSection, DocCodeBlock, DocCard, DocInfoBanner, DocBottomNav } from "@/components/docs";
import { useViewMode } from "@/components/view-mode-context";
import { MachineSpecView } from "@/components/machine-spec-view";
import { buildDocsIntroSpec } from "@/lib/machine-specs/docs-intro";

// Dynamically import the component page to avoid server-side issues
const StoryComponentPage = dynamic(
  () => import("@/components/story-component-page").then(mod => mod.StoryComponentPage),
  {
    loading: () => (
      <div className="space-y-12">
        <div className="space-y-4 animate-pulse">
          <div className="h-12 bg-muted rounded w-48" />
          <div className="h-6 bg-muted rounded w-96" />
        </div>
        <div className="space-y-4 animate-pulse">
          <div className="h-8 bg-muted rounded w-32" />
          <div className="h-12 bg-muted rounded" />
        </div>
        <div className="space-y-4 animate-pulse">
          <div className="h-8 bg-muted rounded w-32" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </div>
    ),
    ssr: false,
  }
);

/**
 * Convert kebab-case URL slug to PascalCase component name
 * e.g., "app-header" -> "AppHeader"
 */
function slugToComponentName(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

/**
 * Parse slug from pathname
 */
function parseSlugFromPathname(pathname: string): string[] | null {
  const match = pathname.match(/^\/docs(?:\/(.*))?$/);
  if (!match) return null;
  if (!match[1]) return [];
  return match[1].split("/");
}

export default function DocPage() {
  const pathname = usePathname();
  const router = useRouter();
  const isClient = typeof window !== "undefined";
  const { viewMode } = useViewMode();

  const slug = parseSlugFromPathname(pathname);

  // Introduction page
  if (!slug || slug.length === 0) {
    if (viewMode === "machine") {
      return <MachineSpecView>{buildDocsIntroSpec()}</MachineSpecView>;
    }

    return (
      <div className="space-y-8">
        <DocPageHeader
          title="Introduction"
          description="Welcome to the FT Design System documentation. This library provides a set of reusable components built with Radix UI and Tailwind CSS."
        />

        <DocSection title="Getting Started">
          <p className="text-muted-foreground text-md-rem">
            Install the design system package:
          </p>
          <DocCodeBlock code="npm install ft-design-system" lang="bash" filename="Terminal" />
        </DocSection>

        <DocSection title="Features">
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>{COMPONENT_COUNT} production-ready components</li>
            <li>Built with Radix UI primitives for accessibility</li>
            <li>Styled with Tailwind CSS for customization</li>
            <li>TypeScript support out of the box</li>
            <li>Dark mode support</li>
            <li>Comprehensive Storybook documentation</li>
          </ul>
        </DocSection>

        <DocSection title="What's Included">
          <div className="grid gap-4 md:grid-cols-2">
            <DocCard title="Components" description={`${COMPONENT_COUNT} React components with full TypeScript support, accessibility built in, and dark mode.`} />
            <DocCard title="Design Tokens" description="Complete CSS variable system for colors, spacing, typography, and theming." />
            <DocCard title="AI Prompts" description="Machine-readable rules for Cursor, Copilot, Claude, and other AI coding assistants." />
            <DocCard title="CLI Tools" description="Automated setup, verification, and update commands for your project." />
          </div>
        </DocSection>

        <DocBottomNav
          next={{ label: "AI Prompts", href: "/docs/ai-prompts" }}
        />
      </div>
    );
  }

  // Redirect /components to first component
  if (slug[0] === "components" && !slug[1]) {
    const firstComponent = docsConfig.sidebarNav
      .flatMap((section) => section.items)
      .find((item) => item.href.startsWith("/docs/components/"))?.href;

    if (firstComponent && isClient) {
      router.replace(firstComponent);
    }

    return (
      <div className="space-y-12">
        <div className="space-y-4 animate-pulse">
          <div className="h-12 bg-muted rounded w-48" />
          <div className="h-6 bg-muted rounded w-96" />
        </div>
      </div>
    );
  }

  // Component documentation page
  if (slug[0] === "components" && slug[1]) {
    const componentName = slugToComponentName(slug[1]);

    // Check if we have stories for this component
    if (!hasStory(componentName)) {
      return (
        <div className="space-y-8">
          <DocPageHeader
            title={componentName}
            description="This component does not have Storybook stories yet."
          />
          <DocInfoBanner variant="warning">
            <p>
              <strong>Stories not available</strong> — Check the Storybook at{" "}
              <a href="http://localhost:6006" className="underline">
                localhost:6006
              </a>{" "}
              for more components.
            </p>
          </DocInfoBanner>
        </div>
      );
    }

    // Render the story-based component page
    return <StoryComponentPage componentName={componentName} />;
  }

  // 404
  return (
    <div className="space-y-8">
      <DocPageHeader
        title="Page Not Found"
        description="The page you're looking for doesn't exist."
      />
    </div>
  );
}
