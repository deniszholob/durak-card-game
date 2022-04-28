import type { StorybookConfig } from '@storybook/core-common';

const storyFiles = '*.stories.@(js|jsx|ts|tsx|mdx)';
const config: StorybookConfig = {
  stories: [`./**/${storyFiles}`, `../src/**/${storyFiles}`],
  addons: [
    // '@storybook/addon-links',
    '@storybook/addon-essentials',
    // '@storybook/addon-interactions',
  ],
  framework: '@storybook/angular',
  core: {
    builder: '@storybook/builder-webpack5',
    disableTelemetry: true, // 👈 Disables telemetry
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: false,
  },
  staticDirs: [
    {
      from: '../src/assets',
      to: '/assets',
    },
  ],
};

module.exports = config;
