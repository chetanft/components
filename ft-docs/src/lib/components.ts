import componentsData from "@/data/components.json"

export type ComponentDoc = {
    description: string
    import: string
    props: Record<string, any>
    examples: Array<{
        name: string
        code: string
    }>
}

export function getComponentDoc(name: string): ComponentDoc | undefined {
    // @ts-ignore
    return componentsData.designSystem.components[name]
}

export function getAllComponentNames(): string[] {
    // @ts-ignore
    return Object.keys(componentsData.designSystem.components)
}
