import { setupWorker } from 'msw/browser';

import { API_HANDLERS } from './handlers';

const worker = setupWorker(...API_HANDLERS);
export default worker;
