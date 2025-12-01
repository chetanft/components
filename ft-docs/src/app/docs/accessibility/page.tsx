import Link from "next/link"
import { Accessibility, Keyboard, Eye, MousePointerClick } from "lucide-react"

export default function AccessibilityPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold mb-2">Accessibility</h1>
                <p className="text-muted-foreground text-lg">
                    Comprehensive accessibility guidelines and features of the FT Design System
                </p>
            </div>

            <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
                <div className="flex items-start gap-3">
                    <Accessibility className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                        <h3 className="font-semibold mb-2">WCAG AA Compliant</h3>
                        <p className="text-sm text-muted-foreground">
                            All components in the FT Design System adhere to WAI-ARIA design patterns and are tested with screen readers and keyboard navigation.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border bg-surface p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Keyboard className="h-6 w-6 text-primary" />
                        <h2 className="text-xl font-semibold">Keyboard Navigation</h2>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                        All interactive components support full keyboard navigation.
                    </p>
                    <ul className="space-y-2 text-sm">
                        <li>• <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">Tab</kbd> / <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">Shift+Tab</kbd> for navigation</li>
                        <li>• <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">Enter</kbd> / <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">Space</kbd> to activate</li>
                        <li>• <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">Arrow keys</kbd> for menu navigation</li>
                        <li>• <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">Escape</kbd> to close modals/dropdowns</li>
                    </ul>
                </div>

                <div className="rounded-lg border bg-surface p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Eye className="h-6 w-6 text-primary" />
                        <h2 className="text-xl font-semibold">Screen Reader Support</h2>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                        Comprehensive ARIA labels and roles for screen readers.
                    </p>
                    <ul className="space-y-2 text-sm">
                        <li>• 50+ ARIA labels implemented</li>
                        <li>• Proper semantic HTML structure</li>
                        <li>• Tested with NVDA and JAWS</li>
                        <li>• Live regions for dynamic content</li>
                    </ul>
                </div>

                <div className="rounded-lg border bg-surface p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <MousePointerClick className="h-6 w-6 text-primary" />
                        <h2 className="text-xl font-semibold">Touch Targets</h2>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                        Mobile-friendly touch targets meet accessibility standards.
                    </p>
                    <ul className="space-y-2 text-sm">
                        <li>• Minimum 44x44px touch targets</li>
                        <li>• Adequate spacing between interactive elements</li>
                        <li>• Verified on mobile devices</li>
                        <li>• Responsive design patterns</li>
                    </ul>
                </div>

                <div className="rounded-lg border bg-surface p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Accessibility className="h-6 w-6 text-primary" />
                        <h2 className="text-xl font-semibold">ARIA Attributes</h2>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                        Comprehensive ARIA implementation across components.
                    </p>
                    <ul className="space-y-2 text-sm">
                        <li>• <code className="bg-muted px-1.5 py-0.5 rounded text-xs">aria-expanded</code> on dropdowns</li>
                        <li>• <code className="bg-muted px-1.5 py-0.5 rounded text-xs">aria-sort</code> on tables</li>
                        <li>• <code className="bg-muted px-1.5 py-0.5 rounded text-xs">aria-label</code> for icon buttons</li>
                        <li>• <code className="bg-muted px-1.5 py-0.5 rounded text-xs">role</code> attributes where needed</li>
                    </ul>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Component-Specific Features</h2>
                <div className="rounded-lg border bg-surface p-6">
                    <h3 className="font-semibold mb-4">Table Component</h3>
                    <ul className="space-y-2 text-sm">
                        <li>• <code className="bg-muted px-1.5 py-0.5 rounded text-xs">aria-sort</code> for sortable columns</li>
                        <li>• Keyboard navigation for row selection</li>
                        <li>• Screen reader announcements for data changes</li>
                    </ul>
                </div>
                <div className="rounded-lg border bg-surface p-6">
                    <h3 className="font-semibold mb-4">Dropdown Component</h3>
                    <ul className="space-y-2 text-sm">
                        <li>• <code className="bg-muted px-1.5 py-0.5 rounded text-xs">aria-expanded</code> state management</li>
                        <li>• Arrow key navigation through options</li>
                        <li>• Escape key to close</li>
                    </ul>
                </div>
                <div className="rounded-lg border bg-surface p-6">
                    <h3 className="font-semibold mb-4">Modal Component</h3>
                    <ul className="space-y-2 text-sm">
                        <li>• Focus trap within modal</li>
                        <li>• Return focus to trigger on close</li>
                        <li>• Escape key support</li>
                        <li>• Backdrop click handling</li>
                    </ul>
                </div>
            </div>

            <div className="rounded-lg border bg-muted p-6">
                <h3 className="font-semibold mb-2">Accessibility Compliance</h3>
                <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">
                        The FT Design System maintains <strong>85% WCAG AA compliance</strong> with ongoing improvements.
                    </p>
                    <ul className="space-y-1 text-muted-foreground">
                        <li>✅ Color contrast ratios meet WCAG AA standards</li>
                        <li>✅ Keyboard navigation implemented across all components</li>
                        <li>✅ Screen reader support verified</li>
                        <li>✅ Touch target sizes meet mobile accessibility guidelines</li>
                        <li>🔄 High-priority ARIA improvements in progress</li>
                    </ul>
                </div>
            </div>

            <div className="rounded-lg border bg-muted p-6">
                <h3 className="font-semibold mb-2">Related Resources</h3>
                <div className="grid gap-2 md:grid-cols-2">
                    <Link href="/docs/components" className="text-primary hover:underline text-sm">
                        Component Documentation
                    </Link>
                    <Link href="/docs/migrations" className="text-primary hover:underline text-sm">
                        Migration Guides
                    </Link>
                    <Link href="/docs/for-designers" className="text-primary hover:underline text-sm">
                        Design Guidelines
                    </Link>
                    <a 
                        href="https://www.w3.org/WAI/WCAG21/quickref/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm"
                    >
                        WCAG Quick Reference
                    </a>
                </div>
            </div>
        </div>
    )
}

