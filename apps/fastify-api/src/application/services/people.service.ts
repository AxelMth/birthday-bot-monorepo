import * as z from 'zod';
import { getPeopleQuerySchema } from '@birthday-bot-monorepo/contracts';

import { CommunicationRepository } from '../ports/output/communication.repository';
import { PersonRepository } from '../ports/output/person.repository';
import {
  PeopleUseCase,
  PersonWithCommunications,
} from '../ports/input/people.use-case';

export class PeopleService implements PeopleUseCase {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly communicationRepository: CommunicationRepository
  ) {}

  async getPeopleWithCommunications(
    query: z.infer<typeof getPeopleQuerySchema>
  ): Promise<PersonWithCommunications[]> {
    const people = await this.personRepository.getPeople({
      limit: query.pageSize,
      offset: query.pageSize * (query.pageNumber - 1),
    });
    return Promise.all(
      people.map(async (person) => {
        const communications = await this.communicationRepository.getByPersonId(
          person.id
        );
        return { ...person, communications };
      })
    );
  }
}
