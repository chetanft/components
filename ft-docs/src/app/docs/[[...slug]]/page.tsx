"use client";

import { useRouter, usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { docsConfig } from "@/config/docs";
import { hasStory, getAvailableStoryComponents } from "@/lib/story-loader";

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

  const slug = parseSlugFromPathname(pathname);

  // Introduction page
  if (!slug || slug.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
          Introduction
        </h1>
        <p className="leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
          Welcome to the FT Design System documentation. This library provides a set of reusable components
          built with Radix UI and Tailwind CSS.
        </p>
        <div className="space-y-4 mt-8">
          <h2 className="text-2xl font-semibold tracking-tight">Getting Started</h2>
          <p className="text-muted-foreground">
            Install the design system package:
          </p>
          <div className="rounded-lg bg-zinc-950 dark:bg-zinc-900 p-4 font-mono text-sm text-zinc-50">
            npm install @chetanft/design_system
          </div>
        </div>
        <div className="space-y-4 mt-8">
          <h2 className="text-2xl font-semibold tracking-tight">Features</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>80+ production-ready components</li>
            <li>Built with Radix UI primitives for accessibility</li>
            <li>Styled with Tailwind CSS for customization</li>
            <li>TypeScript support out of the box</li>
            <li>Dark mode support</li>
            <li>Comprehensive Storybook documentation</li>
          </ul>
        </div>
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
        <div className="space-y-6">
          <h1 className="text-5xl font-bold tracking-tight">{componentName}</h1>
          <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 p-6 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="font-medium">Stories not available</p>
            <p className="text-sm mt-2">
              This component does not have Storybook stories yet.
            </p>
            <p className="text-sm mt-2">
              Check the Storybook at{" "}
              <a href="http://localhost:6006" className="underline">
                localhost:6006
              </a>{" "}
              for more components.
            </p>
          </div>
        </div>
      );
    }

    // Render the story-based component page
    return <StoryComponentPage componentName={componentName} />;
  }

  // 404
  return (
    <div className="space-y-6">
      <h1 className="text-5xl font-bold tracking-tight">Page Not Found</h1>
      <p className="text-muted-foreground">
        The page you're looking for doesn't exist.
      </p>
    </div>
  );
}
