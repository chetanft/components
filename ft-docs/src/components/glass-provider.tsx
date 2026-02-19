"use client"

import * as React from "react"
import { useState, useEffect, useCallback } from "react"
import { GlassProvider as CoreGlassProvider, type GlassMode } from "../../../src"

export function GlassProvider({
    children,
    ...props
}: {
    children: React.ReactNode
    defaultGlass?: GlassMode
    storageKey?: string
}) {
    return <CoreGlassProvider {...props}>{children as any}</CoreGlassProvider>
}

const GLASS_CLASSES = ['theme-glass', 'theme-glass-subtle', 'theme-glass-prominent'] as const;
const STORAGE_KEY = 'ft-glass-mode';

function getGlassModeFromDOM(): GlassMode {
    if (typeof document === 'undefined') return false;
    const html = document.documentElement;
    if (html.classList.contains('theme-glass-prominent')) return 'prominent';
    if (html.classList.contains('theme-glass-subtle')) return 'subtle';
    if (html.classList.contains('theme-glass')) return true;
    return false;
}

/**
 * DOM-based useGlass hook for ft-docs.
 * Bypasses React Context to avoid Turbopack module duplication issues.
 * Reads/writes glass mode via <html> classes and localStorage.
 */
export function useGlass() {
    const [glassMode, setGlassModeState] = useState<GlassMode>(() => getGlassModeFromDOM());

    useEffect(() => {
        setGlassModeState(getGlassModeFromDOM());

        const html = document.documentElement;
        const observer = new MutationObserver(() => {
            setGlassModeState(getGlassModeFromDOM());
        });
        observer.observe(html, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    const setGlassMode = useCallback((mode: GlassMode) => {
        setGlassModeState(mode);
        if (typeof window !== 'undefined') {
            const serialized = mode === true ? 'true' : mode === false ? 'false' : mode;
            localStorage.setItem(STORAGE_KEY, serialized);
            const html = document.documentElement;
            html.classList.remove(...GLASS_CLASSES);
            if (mode === true) html.classList.add('theme-glass');
            else if (mode === 'subtle') html.classList.add('theme-glass-subtle');
            else if (mode === 'prominent') html.classList.add('theme-glass-prominent');
        }
    }, []);

    return { glassMode, setGlassMode };
}

export { type GlassMode }
