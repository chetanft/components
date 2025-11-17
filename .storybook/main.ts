import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  viteFinal: async (config) => {
    // Fix dynamic import issues
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    
    // Ensure proper handling of .tsx and .ts files
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [
        ...(config.optimizeDeps?.include || []),
        'react',
        'react-dom',
      ],
    };

    // Fix for dynamic imports
    config.server = {
      ...config.server,
      fs: {
        ...config.server?.fs,
        allow: ['..'],
      },
    };

    // Optimize for deployment
    if (config.build) {
      config.build.rollupOptions = {
        ...config.build.rollupOptions,
        output: {
          ...config.build.rollupOptions?.output,
          manualChunks: undefined, // Disable manual chunking that can cause issues
        },
      };
      // Increase chunk size warning limit
      config.build.chunkSizeWarningLimit = 1000;
    }
    return config;
  },
};

export default config; 