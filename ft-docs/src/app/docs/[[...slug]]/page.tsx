import { notFound, redirect } from "next/navigation"
import { getComponentDoc, getAllComponentNames } from "@/lib/components"
import { ComponentPreview } from "@/components/component-preview"
import { docsConfig } from "@/config/docs"


interface DocPageProps {
    params: Promise<{
        slug?: string[]
    }>
}

export async function generateStaticParams() {
    const components = getAllComponentNames()
    return components.map((name) => ({
        slug: ["components", name.toLowerCase().replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()],
    }))
}

export default async function DocPage({ params }: DocPageProps) {
    const { slug } = await params

    if (!slug) {
        return (
            <div className="space-y-6">
                <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
                    Introduction
                </h1>
                <p className="leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
                    Welcome to the FT Design System documentation. This library provides a set of reusable components
                    built with Radix UI and Tailwind CSS.
                </p>
            </div>
        )
    }

    if (slug[0] === "components" && !slug[1]) {
        const firstComponent = docsConfig.sidebarNav
            .flatMap(section => section.items)
            .find(item => item.href.startsWith("/docs/components/"))?.href

        if (firstComponent) {
            redirect(firstComponent)
        }
    }

    if (slug[0] === "components" && slug[1]) {
        // Convert kebab-case to PascalCase for lookup
        // e.g. app-header -> AppHeader
        const componentName = slug[1]
            .split("-")
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join("")

        // Handle edge cases if any (e.g. specific naming conventions)

        const doc = getComponentDoc(componentName)

        if (!doc) {
            return notFound()
        }

        return (
            <div className="space-y-12">
                {/* Header */}
                <div className="space-y-4">
                    <h1 className="text-5xl font-bold tracking-tight">
                        {componentName}
                    </h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400">
                        {doc.description}
                    </p>
                </div>

                {/* Installation */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Installation
                    </h2>
                    <div className="rounded-lg bg-zinc-950 dark:bg-zinc-900 p-4 font-mono text-sm text-zinc-50">
                        {doc.import}
                    </div>
                </div>

                {/* Examples */}
                {doc.examples && doc.examples.length > 0 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Examples
                        </h2>
                        <div className="space-y-8">
                            {doc.examples.map((example, index) => (
                                <div key={index} className="space-y-3">
                                    <h3 className="text-lg font-medium">
                                        {example.name}
                                    </h3>
                                    <ComponentPreview code={example.code} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Props */}
                {doc.props && Object.keys(doc.props).length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Props
                        </h2>
                        <div className="overflow-hidden rounded-lg border">
                            <table className="w-full">
                                <thead className="bg-zinc-50 dark:bg-zinc-900">
                                    <tr className="border-b">
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Prop
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Type
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Default
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">
                                            Description
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {Object.entries(doc.props).map(([propName, propInfo]: [string, any]) => (
                                        <tr key={propName} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                                            <td className="px-6 py-4 font-mono text-sm font-medium">
                                                {propName}
                                                {propInfo.required && (
                                                    <span className="ml-1 text-red-500">*</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                                                {propInfo.type}
                                            </td>
                                            <td className="px-6 py-4 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                                                {propInfo.default || "—"}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                                                {propInfo.description}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return notFound()
}
