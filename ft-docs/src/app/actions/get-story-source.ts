'use server'

import fs from 'fs/promises';
import path from 'path';
import { storyPaths } from '@/lib/story-paths';

export async function getStorySource(componentName: string): Promise<string | null> {
    const relativePath = storyPaths[componentName];
    if (!relativePath) {
        console.warn(`No story path found for component: ${componentName}`);
        return null;
    }

    // Resolve path relative to ft-docs root
    // process.cwd() is expected to be the ft-docs directory in Next.js
    const fullPath = path.resolve(process.cwd(), relativePath);

    try {
        const content = await fs.readFile(fullPath, 'utf-8');
        return content;
    } catch (error) {
        console.error(`Failed to read story source for ${componentName} at ${fullPath}:`, error);
        return null;
    }
}
