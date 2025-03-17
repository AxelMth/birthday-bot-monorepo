import Fastify from 'fastify';

import { initServer } from '@ts-rest/fastify';
import { birthdayRouter } from './router';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

// Instantiate Fastify with some config
const server = Fastify({
  logger: true,
});

// env
server.register(require('fastify-env'), {
  schema: {
    type: 'object',
    required: ['PORT'],
    properties: {
      PORT: {
        type: 'number',
        default: 3000,
      },
      DATABASE_URL: {
        type: 'string',
      },
    },
  },
  dotenv: true,
});

// Routes
const s = initServer();
server.register(s.plugin(birthdayRouter));

// Start listening.
server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${host}:${port}`);
  }
});
