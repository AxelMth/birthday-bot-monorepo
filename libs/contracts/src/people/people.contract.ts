import { initContract } from '@ts-rest/core';
import {
  getPeopleQuerySchema,
  getPeopleResponseSchema,
} from './people.schema.js';
import { errorBodySchema } from '../common/schemas/error.schema.js';

const c = initContract();

export const peopleContract = c.router({
  getPeopleWithCommunications: {
    method: 'GET',
    path: '/api/people',
    responses: {
      200: getPeopleResponseSchema,
      500: errorBodySchema,
    },
    query: getPeopleQuerySchema,
    summary: 'Get people',
  },
});
