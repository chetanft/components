import React, { useState } from 'react';
import { Button } from '../components/atoms/Button/Button';
import { Badge } from '../components/atoms/Badge/Badge';
import { Input } from '../components/atoms/Input/Input';
import { Drawer } from '../components/organisms/Drawer/Drawer';
import { Table } from '../components/organisms/Table/Table';

export const FTImprovementDemo = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Mock Data
    const data = [
        { id: 1, name: 'Asset 1', status: 'active', category: 'Equity' },
        { id: 2, name: 'Asset 2', status: 'pending', category: 'Bond' },
    ];

    const columns = [
        { key: 'name', title: 'Name' },
        { 
            key: 'status', 
            title: 'Status', 
            render: (value: unknown, _row: { id: number; name: string; status: string; category: string; }, _index: number) => {
                const status = String(value);
                return <Badge variant={status === 'active' ? 'success' : 'warning'}>{status}</Badge>;
            }
        },
        { key: 'category', title: 'Category' },
    ];

    return (
        <div className="p-8 space-y-12 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">FT Design System Improvement Demo</h1>
                <p className="text-gray-600 mt-2">
                    {'Comparing \"Bad\" (Current/Inline) vs \"Good\" (Improved/Tokens) implementations.'}
                </p>
            </header>

            {/* SECTION 1: TYPOGRAPHY & SPACING */}
            <section className="grid grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-lg font-semibold mb-4 text-red-600">❌ Bad: Inline Styles & Hardcoded Values</h2>

                    {/* Bad Label/Value */}
                    <div className="mb-4">
                        <label style={{ fontSize: '12px', fontWeight: 600, color: '#6a6a6a', marginBottom: '6px', display: 'block' }}>
                            Status
                        </label>
                        <div style={{ fontSize: '14px', color: '#1a1a1a' }}>
                            Active
                        </div>
                    </div>

                    {/* Bad Button */}
                    <button style={{
                        padding: '8px 16px',
                        backgroundColor: '#0D7680',
                        color: 'white',
                        borderRadius: '4px',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <span style={{ fontSize: '16px' }}>+</span>
                        Add Asset
                    </button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-lg font-semibold mb-4 text-green-600">✅ Good: Design Tokens & Components</h2>

                    {/* Good Label/Value */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-500 mb-2">
                            Status
                        </label>
                        <div className="text-base text-gray-900">
                            Active
                        </div>
                    </div>

                    {/* Good Button */}
                    <Button variant="primary" icon="add">Add Asset</Button>
                </div>
            </section>

            {/* SECTION 2: INPUTS */}
            <section className="grid grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-lg font-semibold mb-4 text-red-600">❌ Bad: Manual Icon Placement</h2>
                    <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
                        <input
                            type="text"
                            placeholder="Search..."
                            style={{
                                paddingLeft: '36px',
                                paddingRight: '12px',
                                paddingTop: '8px',
                                paddingBottom: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                width: '100%'
                            }}
                        />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-lg font-semibold mb-4 text-green-600">✅ Good: Built-in Icon Support</h2>
                    <Input
                        placeholder="Search..."
                        leadingIcon="search"
                        className="w-full"
                    />
                </div>
            </section>

            {/* SECTION 3: DRAWER & TABLE */}
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Complex Components</h2>
                    <Button onClick={() => setDrawerOpen(true)}>Open Drawer Demo</Button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Table Component</h3>
                    <Table
                        columns={columns}
                        data={data}
                        variant="primary"
                    />
                </div>
            </section>

            <Drawer
                title="Asset Details"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                width={500}
            >
                <div className="space-y-6">
                    <div className="p-4 bg-blue-50 rounded-md border border-blue-100 text-blue-800">
                        <p className="text-sm">
                            <strong>Note:</strong> This drawer content should have a subtle background tint if implemented correctly,
                            distinguishing it from the white drawer surface if desired, or the drawer itself should handle it.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Information</h4>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                                <div className="text-base font-medium text-gray-900">Asset 1</div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Category</label>
                                <div className="text-base font-medium text-gray-900">Equity</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};
