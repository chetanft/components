import { ComponentPreview } from "@/components/component-preview"

export default function TablePage() {
  return (
    <div className="container relative">
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            Docs
          </div>
          <div>/</div>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            Components
          </div>
          <div>/</div>
          <div className="font-medium text-foreground">Table</div>
        </div>
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Table</h1>
          <p className="text-lg text-muted-foreground">
            A responsive table component.
          </p>
        </div>
        <div className="pb-12 pt-8">
          <div className="space-y-10">
            <div>
              <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                Example
              </h2>
              <div className="mt-6">
                <ComponentPreview name="table-demo">
                  <div className="w-full">
                    <div className="card">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-4">Name</th>
                            <th className="text-left p-4">Status</th>
                            <th className="text-left p-4">Role</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-4">John Doe</td>
                            <td className="p-4">
                              <div className="badge">Active</div>
                            </td>
                            <td className="p-4">Admin</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-4">Jane Smith</td>
                            <td className="p-4">
                              <div className="badge" style={{ backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)' }}>
                                Inactive
                              </div>
                            </td>
                            <td className="p-4">User</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </ComponentPreview>
              </div>
            </div>

            <div>
              <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                Installation
              </h2>
              <div className="mt-6">
                <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900">
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm text-white">
                    npm install ft-design-system
                  </code>
                </pre>
              </div>
            </div>

            <div>
              <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                Usage
              </h2>
              <div className="mt-6">
                <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900">
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm text-white">
{`import { Table } from "ft-design-system"

export default function TableDemo() {
  return (
    <Table>
      {/* Table content */}
    </Table>
  )
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
