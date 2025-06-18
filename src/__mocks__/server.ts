import { setupServer } from 'msw/node';

import { API_HANDLERS } from './handlers';

const server = setupServer(...API_HANDLERS);
export default server;
