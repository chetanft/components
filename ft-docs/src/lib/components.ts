export type ComponentDoc = {
    description: string
    import: string
    props: Record<string, any>
    examples: Array<{
        name: string
        code: string
    }>
}

// Re-export from metadata generator
export {
    getComponentMetadata as getComponentDoc,
    getAllComponentNames
} from './component-metadata'
