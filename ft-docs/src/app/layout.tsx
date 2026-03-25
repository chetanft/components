import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "../../../src/styles/tokens.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FT Design System",
  description: "Documentation for the FT Design System component library",
  icons: {
    icon: "/icon.png",
  },
};

import { ThemeProvider } from "@/components/theme-provider"
import { GlassProvider } from "@/components/glass-provider"
import { ViewModeProvider } from "@/components/view-mode-context"
import { FloatingViewToggle } from "@/components/floating-view-toggle"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background font-sans text-foreground`}
      >
        <Script
          id="theme-detection"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'light';

                  // Remove all theme classes first
                  document.documentElement.classList.remove('light', 'dark', 'night');

                  if (theme === 'dark' || theme === 'night' || theme === 'light') {
                    document.documentElement.classList.add(theme);
                  } else {
                    document.documentElement.classList.add('light');
                  }

                  // Glass mode FOUC prevention
                  var glass = localStorage.getItem('ft-glass-mode');
                  document.documentElement.classList.remove('theme-glass', 'theme-glass-subtle', 'theme-glass-prominent', 'theme-glass-liquid');
                  if (glass === 'true') document.documentElement.classList.add('theme-glass');
                  else if (glass === 'subtle') document.documentElement.classList.add('theme-glass-subtle');
                  else if (glass === 'prominent') document.documentElement.classList.add('theme-glass-prominent');
                  else if (glass === 'liquid') document.documentElement.classList.add('theme-glass-liquid');
                } catch (e) {}
              })();
            `,
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          themes={['light', 'dark', 'night']}
        >
          <GlassProvider defaultGlass={false} storageKey="ft-glass-mode">
            <ViewModeProvider>
              {children}
              <FloatingViewToggle />
            </ViewModeProvider>
          </GlassProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
