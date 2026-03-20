import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { List, ListHeader, ListBody, ListFooter, ListItem, ListItemIcon, ListItemContent, ListItemTitle, ListItemDescription, ListItemAction } from './index';
import { Typography } from '../../atoms/Typography';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icons';

const meta: Meta<typeof List> = {
    title: 'Molecules/List',
    component: List,
    tags: ['autodocs'],
    argTypes: {
        bordered: {
            control: 'boolean',
            description: 'Whether to show a border around the list.',
        },
        split: {
            control: 'boolean',
            description: 'Whether to show split lines between items.',
        },
        loading: {
            control: 'boolean',
            description: 'Whether to show a loading spinner.',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Size of list items.',
        },
        glass: {
            control: 'select',
            options: ['none', 'frost', 'subtle', 'medium', 'heavy'],
            description: 'Glass morphism variant.',
        },
        children: {
            control: false,
            description: 'Composable sub-components (ListHeader, ListBody, ListItem, etc.).',
        },
    },
    parameters: {
        docs: {
            description: {
                component: 'A composable list component for displaying collections of items with optional headers, footers, icons, and actions. Supports bordered and grid layouts.',
            },
        },
        explorer: {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                inspector: {
                                                                                                                                                                                                                                                                                                                                  enabled: true,
                                                                                                                                                                                                                                                                                                                                  defaultMode: 'token-spacing' as const,
                                                                                                                                                                                                                                                                                                                                  spacingHints: {
                                                                                                                                                                                                                                                                                                                                    outerXToken: 'x6',
                                                                                                                                                                                                                                                                                                                                    outerYToken: 'x3',
                                                                                                                                                                                                                                                                                                                                    innerGapToken: 'x2',
                                                                                                                                                                                                                                                                                                                                  },
                                                                                                                                                                                                                                                                                                                                },
            mode: 'matrix' as const,
            behavior: 'layout',
            previewMode: 'inline' as const,
            baseStory: 'ExplorerBase',
            rows: [
                {
                    id: 'type',
                    label: 'Type',
                    scenarios: [
                        { id: 'default', label: 'Default', story: 'ExplorerBase', args: { contentType: 'default' } },
                        { id: 'with-icons', label: 'With Icons', story: 'ExplorerBase', args: { contentType: 'with-icons' } },
                        { id: 'with-actions', label: 'With Actions', story: 'ExplorerBase', args: { contentType: 'with-actions' } },
                    ],
                },
                {
                    id: 'state',
                    label: 'State',
                    scenarios: [
                        { id: 'default', label: 'Default', story: 'ExplorerBase', args: {} },
                    ],
                },
            ],
            defaultRowId: 'type',
            defaultScenarioId: 'default',
        },
    },
};

export default meta;
type Story = StoryObj<typeof List>;

export const ExplorerBase: Story = {
    render: (args: any) => {
        const contentType = args.contentType ?? 'default';
        const syncKey = JSON.stringify({ contentType });
        return (
            <div key={syncKey} className="p-6">
                {contentType === 'default' && (
                    <List bordered>
                        <ListHeader>
                            <Typography variant="body-primary-semibold">List Header</Typography>
                        </ListHeader>
                        <ListBody>
                            <ListItem>
                                <ListItemContent>
                                    <ListItemTitle>Item 1</ListItemTitle>
                                    <ListItemDescription>Description for item 1</ListItemDescription>
                                </ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemContent>
                                    <ListItemTitle>Item 2</ListItemTitle>
                                    <ListItemDescription>Description for item 2</ListItemDescription>
                                </ListItemContent>
                            </ListItem>
                        </ListBody>
                        <ListFooter>
                            <Typography variant="body-secondary-regular">Footer</Typography>
                        </ListFooter>
                    </List>
                )}
                {contentType === 'with-icons' && (
                    <List bordered>
                        <ListBody>
                            <ListItem>
                                <ListItemIcon>
                                    <Icon name="check" size={16} />
                                </ListItemIcon>
                                <ListItemContent>
                                    <ListItemTitle>Completed Task</ListItemTitle>
                                    <ListItemDescription>This task is done</ListItemDescription>
                                </ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Icon name="alert-critical" size={16} />
                                </ListItemIcon>
                                <ListItemContent>
                                    <ListItemTitle>Pending Task</ListItemTitle>
                                    <ListItemDescription>This task needs attention</ListItemDescription>
                                </ListItemContent>
                            </ListItem>
                        </ListBody>
                    </List>
                )}
                {contentType === 'with-actions' && (
                    <List bordered>
                        <ListBody>
                            <ListItem>
                                <ListItemContent>
                                    <ListItemTitle>Item with Action</ListItemTitle>
                                    <ListItemDescription>This item has an action button</ListItemDescription>
                                </ListItemContent>
                                <ListItemAction>
                                    <Button size="sm" variant="link">Edit</Button>
                                </ListItemAction>
                            </ListItem>
                            <ListItem>
                                <ListItemContent>
                                    <ListItemTitle>Another Item</ListItemTitle>
                                    <ListItemDescription>Another item with action</ListItemDescription>
                                </ListItemContent>
                                <ListItemAction>
                                    <Button size="sm" variant="link">Delete</Button>
                                </ListItemAction>
                            </ListItem>
                        </ListBody>
                    </List>
                )}
            </div>
        );
    },
};

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

// Composable API Examples (Recommended)
export const Default: Story = {
    render: () => (
        <div className="p-6">
            <List bordered>
                <ListHeader>
                    <Typography variant="body-primary-semibold">List Header</Typography>
                </ListHeader>
                <ListBody>
                    <ListItem>
                        <ListItemContent>
                            <ListItemTitle>Item 1</ListItemTitle>
                            <ListItemDescription>Description for item 1</ListItemDescription>
                        </ListItemContent>
                    </ListItem>
                    <ListItem>
                        <ListItemContent>
                            <ListItemTitle>Item 2</ListItemTitle>
                            <ListItemDescription>Description for item 2</ListItemDescription>
                        </ListItemContent>
                    </ListItem>
                </ListBody>
                <ListFooter>
                    <Typography variant="body-secondary-regular">Footer</Typography>
                </ListFooter>
            </List>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '✅ **Composable API**: Use ListHeader, ListBody, ListFooter, ListItem, and ListItemContent sub-components for flexible list composition.',
            },
            source: {
                code: `<List bordered>
  <ListHeader>
    <Typography variant="body-primary-semibold">List Header</Typography>
  </ListHeader>
  <ListBody>
    <ListItem>
      <ListItemContent>
        <ListItemTitle>Item 1</ListItemTitle>
        <ListItemDescription>Description for item 1</ListItemDescription>
      </ListItemContent>
    </ListItem>
    <ListItem>
      <ListItemContent>
        <ListItemTitle>Item 2</ListItemTitle>
        <ListItemDescription>Description for item 2</ListItemDescription>
      </ListItemContent>
    </ListItem>
  </ListBody>
  <ListFooter>
    <Typography variant="body-secondary-regular">Footer</Typography>
  </ListFooter>
</List>`,
                language: 'tsx',
                type: 'code',
            },
        },
    },
};

export const DocsWithIcons: Story = {
    render: () => (
        <div className="p-6">
            <List bordered>
                <ListBody>
                    <ListItem>
                        <ListItemIcon>
                            <Icon name="check" size={16} />
                        </ListItemIcon>
                        <ListItemContent>
                            <ListItemTitle>Completed Task</ListItemTitle>
                            <ListItemDescription>This task is done</ListItemDescription>
                        </ListItemContent>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Icon name="alert-critical" size={16} />
                        </ListItemIcon>
                        <ListItemContent>
                            <ListItemTitle>Pending Task</ListItemTitle>
                            <ListItemDescription>This task needs attention</ListItemDescription>
                        </ListItemContent>
                    </ListItem>
                </ListBody>
            </List>
        </div>
    ),
    parameters: {

      docsOnly: true,
        docs: {
            description: {
                story: 'Use ListItemIcon for icons in list items.',
            },
            source: {
                code: `<List bordered>
  <ListBody>
    <ListItem>
      <ListItemIcon>
        <Icon name="check" size={16} />
      </ListItemIcon>
      <ListItemContent>
        <ListItemTitle>Completed Task</ListItemTitle>
        <ListItemDescription>This task is done</ListItemDescription>
      </ListItemContent>
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <Icon name="alert-critical" size={16} />
      </ListItemIcon>
      <ListItemContent>
        <ListItemTitle>Pending Task</ListItemTitle>
        <ListItemDescription>This task needs attention</ListItemDescription>
      </ListItemContent>
    </ListItem>
  </ListBody>
</List>`,
                language: 'tsx',
                type: 'code',
            },
        },
    },
};

export const DocsWithActions: Story = {
    render: () => (
        <div className="p-6">
            <List bordered>
                <ListBody>
                    <ListItem>
                        <ListItemContent>
                            <ListItemTitle>Item with Action</ListItemTitle>
                            <ListItemDescription>This item has an action button</ListItemDescription>
                        </ListItemContent>
                        <ListItemAction>
                            <Button size="sm" variant="link">Edit</Button>
                        </ListItemAction>
                    </ListItem>
                    <ListItem>
                        <ListItemContent>
                            <ListItemTitle>Another Item</ListItemTitle>
                            <ListItemDescription>Another item with action</ListItemDescription>
                        </ListItemContent>
                        <ListItemAction>
                            <Button size="sm" variant="link">Delete</Button>
                        </ListItemAction>
                    </ListItem>
                </ListBody>
            </List>
        </div>
    ),
    parameters: {

      docsOnly: true,
        docs: {
            description: {
                story: 'Use ListItemAction for action buttons in list items.',
            },
            source: {
                code: `<List bordered>
  <ListBody>
    <ListItem>
      <ListItemContent>
        <ListItemTitle>Item with Action</ListItemTitle>
        <ListItemDescription>This item has an action button</ListItemDescription>
      </ListItemContent>
      <ListItemAction>
        <Button size="sm" variant="link">Edit</Button>
      </ListItemAction>
    </ListItem>
    <ListItem>
      <ListItemContent>
        <ListItemTitle>Another Item</ListItemTitle>
        <ListItemDescription>Another item with action</ListItemDescription>
      </ListItemContent>
      <ListItemAction>
        <Button size="sm" variant="link">Delete</Button>
      </ListItemAction>
    </ListItem>
  </ListBody>
</List>`,
                language: 'tsx',
                type: 'code',
            },
        },
    },
};

export const DocsVariants: Story = {
    render: () => (
        <div className="p-6 flex flex-col gap-8">
            <div>
                <Typography variant="body-primary-semibold">Default (md)</Typography>
                <List bordered>
                    <ListBody>
                        <ListItem>
                            <ListItemContent>
                                <ListItemTitle>Default size item</ListItemTitle>
                            </ListItemContent>
                        </ListItem>
                    </ListBody>
                </List>
            </div>
            <div>
                <Typography variant="body-primary-semibold">Small (sm)</Typography>
                <List bordered size="sm">
                    <ListBody>
                        <ListItem>
                            <ListItemContent>
                                <ListItemTitle>Small size item</ListItemTitle>
                            </ListItemContent>
                        </ListItem>
                    </ListBody>
                </List>
            </div>
            <div>
                <Typography variant="body-primary-semibold">Large (lg)</Typography>
                <List bordered size="lg">
                    <ListBody>
                        <ListItem>
                            <ListItemContent>
                                <ListItemTitle>Large size item</ListItemTitle>
                            </ListItemContent>
                        </ListItem>
                    </ListBody>
                </List>
            </div>
            <div>
                <Typography variant="body-primary-semibold">With Header, Footer, Icons & Actions</Typography>
                <List bordered>
                    <ListHeader>
                        <Typography variant="body-primary-semibold">Full Feature List</Typography>
                    </ListHeader>
                    <ListBody>
                        <ListItem>
                            <ListItemIcon>
                                <Icon name="check" size={16} />
                            </ListItemIcon>
                            <ListItemContent>
                                <ListItemTitle>Item with all parts</ListItemTitle>
                                <ListItemDescription>Description text</ListItemDescription>
                            </ListItemContent>
                            <ListItemAction>
                                <Button size="sm" variant="link">Edit</Button>
                            </ListItemAction>
                        </ListItem>
                    </ListBody>
                    <ListFooter>
                        <Typography variant="body-secondary-regular">Footer</Typography>
                    </ListFooter>
                </List>
            </div>
        </div>
    ),
    parameters: {

      docsOnly: true,
        docs: {
            description: {
                story: 'All visual variants of the List component shown side-by-side: sizes, bordered, with header/footer/icons/actions.',
            },
            source: {
                code: `{/* Default (md) */}
<List bordered>
  <ListBody>
    <ListItem>
      <ListItemContent>
        <ListItemTitle>Default size item</ListItemTitle>
      </ListItemContent>
    </ListItem>
  </ListBody>
</List>

{/* Small (sm) */}
<List bordered size="sm">
  <ListBody>
    <ListItem>
      <ListItemContent>
        <ListItemTitle>Small size item</ListItemTitle>
      </ListItemContent>
    </ListItem>
  </ListBody>
</List>

{/* Large (lg) */}
<List bordered size="lg">
  <ListBody>
    <ListItem>
      <ListItemContent>
        <ListItemTitle>Large size item</ListItemTitle>
      </ListItemContent>
    </ListItem>
  </ListBody>
</List>

{/* With Header, Footer, Icons & Actions */}
<List bordered>
  <ListHeader>
    <Typography variant="body-primary-semibold">Full Feature List</Typography>
  </ListHeader>
  <ListBody>
    <ListItem>
      <ListItemIcon>
        <Icon name="check" size={16} />
      </ListItemIcon>
      <ListItemContent>
        <ListItemTitle>Item with all parts</ListItemTitle>
        <ListItemDescription>Description text</ListItemDescription>
      </ListItemContent>
      <ListItemAction>
        <Button size="sm" variant="link">Edit</Button>
      </ListItemAction>
    </ListItem>
  </ListBody>
  <ListFooter>
    <Typography variant="body-secondary-regular">Footer</Typography>
  </ListFooter>
</List>`,
                language: 'tsx',
                type: 'code',
            },
        },
    },
};

export const DocsStates: Story = {
    render: () => (
        <div className="p-6 flex flex-col gap-8">
            <div>
                <Typography variant="body-primary-semibold">Empty List</Typography>
                <List bordered>
                    <ListBody>
                    </ListBody>
                </List>
            </div>
            <div>
                <Typography variant="body-primary-semibold">Single Item</Typography>
                <List bordered>
                    <ListBody>
                        <ListItem>
                            <ListItemContent>
                                <ListItemTitle>Only item</ListItemTitle>
                            </ListItemContent>
                        </ListItem>
                    </ListBody>
                </List>
            </div>
            <div>
                <Typography variant="body-primary-semibold">Without Border</Typography>
                <List>
                    <ListBody>
                        <ListItem>
                            <ListItemContent>
                                <ListItemTitle>Borderless item 1</ListItemTitle>
                            </ListItemContent>
                        </ListItem>
                        <ListItem>
                            <ListItemContent>
                                <ListItemTitle>Borderless item 2</ListItemTitle>
                            </ListItemContent>
                        </ListItem>
                    </ListBody>
                </List>
            </div>
        </div>
    ),
    parameters: {

      docsOnly: true,
        docs: {
            description: {
                story: 'List states: empty, single item, and borderless.',
            },
            source: {
                code: `{/* Empty List */}
<List bordered>
  <ListBody>
  </ListBody>
</List>

{/* Single Item */}
<List bordered>
  <ListBody>
    <ListItem>
      <ListItemContent>
        <ListItemTitle>Only item</ListItemTitle>
      </ListItemContent>
    </ListItem>
  </ListBody>
</List>

{/* Without Border */}
<List>
  <ListBody>
    <ListItem>
      <ListItemContent>
        <ListItemTitle>Borderless item 1</ListItemTitle>
      </ListItemContent>
    </ListItem>
    <ListItem>
      <ListItemContent>
        <ListItemTitle>Borderless item 2</ListItemTitle>
      </ListItemContent>
    </ListItem>
  </ListBody>
</List>`,
                language: 'tsx',
                type: 'code',
            },
        },
    },
};
