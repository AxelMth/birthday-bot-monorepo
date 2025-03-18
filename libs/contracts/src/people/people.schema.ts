import { z } from 'zod';

// Create person
export const createPersonBodySchema = z.object({
  name: z.string(),
  birthdate: z.coerce.date(),
});

export const createPersonResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  birthdate: z.coerce.date(),
});

// Update person by ID
export const updatePersonByIdParamsSchema = z.object({
  id: z.coerce.number(),
});

export const updatePersonByIdBodySchema = z.object({
  name: z.string(),
  birthdate: z.coerce.date(),
});

export const updatePersonByIdResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  birthdate: z.coerce.date(),
});

// Get person by ID
export const getPersonByIdParamsSchema = z.object({
  id: z.coerce.number(),
});

export const getPersonByIdResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  birthdate: z.coerce.date(),
  communications: z.array(
    z.object({
      id: z.number(),
      personId: z.number(),
      application: z.string(),
    })
  ),
});

// Get people
export const getPeopleQuerySchema = z.object({
  pageSize: z.coerce.number().optional().default(10),
  pageNumber: z.coerce.number().optional().default(1),
});

export const getPeopleResponseSchema = z.object({
  count: z.number(),
  people: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      birthdate: z.coerce.date(),
      communications: z.array(
        z.object({
          id: z.number(),
          personId: z.number(),
          application: z.string(),
        })
      ),
    })
  ),
});
