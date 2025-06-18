import { useToggle } from '@gatewatcher/bistoury/hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { ThemeSwitch } from '../src/components/navigation/Theme/ThemeSwitch';
import { ThemeProvider } from '../src/components/navigation/Theme/theme.provider';
import worker from './../src/__mocks__/browser';
import './../src/components/navigation/Theme/theme';

import '../src/styles/index.scss';
import './styles.scss';

if (process.env.NODE_ENV === 'development') {
  worker.start({
    onUnhandledRequest: 'bypass',
  });
}

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  backgrounds: { disable: true },
  controls: {
    exclude: ['className'],
    sort: 'requiredFirst',
    matchers: {
      date: /date$/i,
    },
  },
  options: {
    storySort: {
      order: [
        'actions',
        'displays',
        'feedback',
        'forms',
        'layout',
        'listings',
        'navigation',
        'typography',
        'pagination',
        'hocs',
      ],
    },
  },
};

export const argTypes = { 'data-testid': { table: { disable: true } } };

export const decorators = [
  Story => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    });
    return (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    );
  },
  Story => {
    const [resetTransitions, toggleResetTransitions] = useToggle(true);

    return (
      <ThemeProvider withResetTransitions={resetTransitions}>
        <div className="theme-switch-container" data-testid="theme-switch">
          <div className="theme-switch-transitions">
            <input
              id="transitions"
              type="checkbox"
              onChange={toggleResetTransitions}
              checked={resetTransitions}
            />
            <label htmlFor="transitions">Reset transitions</label>
          </div>
          <ThemeSwitch />
        </div>
        <div data-testid="story-container">
          <Story />
        </div>
      </ThemeProvider>
    );
  },
];
export const tags = ['autodocs'];
