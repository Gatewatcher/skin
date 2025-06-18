import '@testing-library/jest-dom';
import 'intersection-observer';
import { afterAll, afterEach, beforeAll } from 'vitest';
import 'vitest-canvas-mock';

import server from '@/mocks/server';

global.ResizeObserver = require('resize-observer-polyfill');

global.ASYNC_VALIDATOR_NO_WARNING = 1;

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
