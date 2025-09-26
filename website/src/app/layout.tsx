import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./simple-globals.css"
import { SiteHeader } from "@/components/ui/navigation"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FT Design System",
  description: "Beautifully designed components built from Figma designs. Copy and paste into your apps. Built with Tailwind CSS.",
  keywords: ["React", "Tailwind CSS", "Figma", "Components", "Design System"],
  authors: [
    {
      name: "chetanft",
      url: "https://github.com/chetanft",
    },
  ],
  creator: "chetanft",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ft-design-system.vercel.app",
    title: "FT Design System",
    description: "Beautifully designed components built from Figma designs. Copy and paste into your apps. Built with Tailwind CSS.",
    siteName: "FT Design System",
  },
  twitter: {
    card: "summary_large_image",
    title: "FT Design System",
    description: "Beautifully designed components built from Figma designs. Copy and paste into your apps. Built with Tailwind CSS.",
    creator: "@chetanft",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  )
}