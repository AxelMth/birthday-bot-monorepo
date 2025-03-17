import * as z from 'zod';
import { getPeopleQuerySchema } from '@birthday-bot-monorepo/contracts';

import { Person } from '../../../domain/entities/person';
import { Communication } from '../../../domain/entities/communication';

export type PersonWithCommunications = Person & {
  communications: Communication[];
};

export interface PeopleUseCase {
  getPeopleWithCommunications(
    query: z.infer<typeof getPeopleQuerySchema>
  ): Promise<PersonWithCommunications[]>;
}
