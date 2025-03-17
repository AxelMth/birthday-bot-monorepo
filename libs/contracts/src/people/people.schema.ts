import { z } from 'zod';

export const getPeopleQuerySchema = z.object({
  pageSize: z.number().optional().default(10),
  pageNumber: z.number().optional().default(1),
});

export const getPeopleResponseSchema = z.object({
  people: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      birthdate: z.date(),
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
