/**
 * Component documentation types and exports
 * 
 * This module provides types and functions for component documentation.
 * Now uses the story-loader approach instead of the old parsing-based metadata.
 */

export type ComponentDoc = {
    description: string
    import: string
    props: Record<string, any>
    examples: Array<{
        name: string
        code: string
    }>
}

// Re-export from story-loader for compatibility
export {
    getAvailableStoryComponents as getAllComponentNames,
    hasStory,
    loadStoryModule,
    formatStoryName,
} from './story-loader'

// Note: The old getComponentDoc/getComponentMetadata function has been replaced
// with the direct story-loader approach. Component pages now load stories
// directly as ES modules instead of parsing them.
