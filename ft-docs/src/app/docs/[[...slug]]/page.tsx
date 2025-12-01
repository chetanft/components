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
        <h1 className="scroll-m-20 font-bold tracking-tight" style={{ fontSize: 'var(--font-size-xxl-rem)' }}>
          {/* 28px → 2rem (responsive) */}
          Introduction
        </h1>
        <p className="leading-7 text-muted-foreground [&:not(:first-child)]:mt-6" style={{ fontSize: 'var(--font-size-md-rem)' }}>
          {/* 16px → 1.143rem (responsive) */}
          Welcome to the FT Design System documentation. This library provides a set of reusable components
          built with Radix UI and Tailwind CSS.
        </p>
        <div className="space-y-4 mt-8">
          <h2 className="font-semibold tracking-tight" style={{ fontSize: 'var(--font-size-xl-rem)' }}>
            {/* 24px → 1.714rem (responsive) */}
            Getting Started
          </h2>
          <p className="text-muted-foreground" style={{ fontSize: 'var(--font-size-md-rem)' }}>
            {/* 16px → 1.143rem (responsive) */}
            Install the design system package:
          </p>
          <div 
            className="rounded-lg p-4 font-mono"
            style={{
              fontSize: 'var(--font-size-sm-rem)',
              backgroundColor: 'var(--primary-900)',
              color: 'var(--tertiary-0)'
            }}
          >
            npm install @chetanft/design_system
          </div>
        </div>
        <div className="space-y-4 mt-8">
          <h2 className="font-semibold tracking-tight" style={{ fontSize: 'var(--font-size-xl-rem)' }}>
            {/* 24px → 1.714rem (responsive) */}
            Features
          </h2>
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
          <h1 className="font-bold tracking-tight" style={{ fontSize: 'var(--font-size-xxl-rem)' }}>
            {/* 28px → 2rem (responsive) */}
            {componentName}
          </h1>
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--warning-light)', borderColor: 'var(--warning)', color: 'var(--warning-dark)' }}>
            <p className="font-medium" style={{ fontSize: 'var(--font-size-md-rem)' }}>Stories not available</p>
            <p style={{ fontSize: 'var(--font-size-sm-rem)', marginTop: 'var(--spacing-x2)' }}>
              {/* 14px → 1rem (responsive) */}
              This component does not have Storybook stories yet.
            </p>
            <p style={{ fontSize: 'var(--font-size-sm-rem)', marginTop: 'var(--spacing-x2)' }}>
              {/* 14px → 1rem (responsive) */}
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
      <h1 className="font-bold tracking-tight" style={{ fontSize: 'var(--font-size-xxl-rem)' }}>
        {/* 28px → 2rem (responsive) */}
        Page Not Found
      </h1>
      <p className="text-muted-foreground" style={{ fontSize: 'var(--font-size-md-rem)' }}>
        {/* 16px → 1.143rem (responsive) */}
        The page you're looking for doesn't exist.
      </p>
    </div>
  );
}
