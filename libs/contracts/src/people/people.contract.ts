import { initContract } from '@ts-rest/core';
import {
  getPeopleQuerySchema,
  getPeopleResponseSchema,
  getPersonByIdParamsSchema,
  getPersonByIdResponseSchema,
} from './people.schema.js';
import { errorBodySchema } from '../common/schemas/error.schema.js';

const c = initContract();

export const peopleContract = c.router({
  getPersonById: {
    method: 'GET',
    path: '/api/people/:id',
    responses: {
      200: getPersonByIdResponseSchema,
      500: errorBodySchema,
    },
    pathParams: getPersonByIdParamsSchema,
    summary: 'Get person by id',
  },

  getPaginatedPeople: {
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
