import { initContract } from '@ts-rest/core';
import {
  getPeopleQuerySchema,
  getPeopleResponseSchema,
  getPersonByIdParamsSchema,
  getPersonByIdResponseSchema,
  createPersonBodySchema,
  createPersonResponseSchema,
  updatePersonByIdParamsSchema,
  updatePersonByIdBodySchema,
  updatePersonByIdResponseSchema,
} from './people.schema.js';
import { errorBodySchema } from '../common/schemas/error.schema.js';

const c = initContract();

export const peopleContract = c.router({
  createPerson: {
    method: 'POST',
    path: '/api/people',
    responses: {
      200: createPersonResponseSchema,
      500: errorBodySchema,
    },
    body: createPersonBodySchema,
    summary: 'Create person',
  },
  updatePersonById: {
    method: 'PUT',
    path: '/api/people/:id',
    responses: {
      200: updatePersonByIdResponseSchema,
      500: errorBodySchema,
    },
    pathParams: updatePersonByIdParamsSchema,
    body: updatePersonByIdBodySchema,
    summary: 'Update person by id',
  },
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
