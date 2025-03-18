import * as z from 'zod';
import { getPeopleQuerySchema } from '@birthday-bot-monorepo/contracts';

import { CommunicationRepository } from '../ports/output/communication.repository';
import { PersonRepository } from '../ports/output/person.repository';
import {
  PaginatedPeopleWithCommunications,
  PeopleUseCase,
} from '../ports/input/people.use-case';

export class PeopleService implements PeopleUseCase {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly communicationRepository: CommunicationRepository
  ) {}

  async getPaginatedPeople(
    query: z.infer<typeof getPeopleQuerySchema>
  ): Promise<PaginatedPeopleWithCommunications> {
    const peopleCount = await this.personRepository.getPeopleCount();
    const people = await this.personRepository.getPaginatedPeople({
      limit: query.pageSize,
      offset: query.pageSize * (query.pageNumber - 1),
    });
    const peopleWithCommunications = await Promise.all(
      people.map(async (person) => {
        const communications = await this.communicationRepository.getByPersonId(
          person.id
        );
        return { ...person, communications };
      })
    );
    return {
      people: peopleWithCommunications,
      count: peopleCount,
    };
  }

  async getPersonById(id: number) {
    const person = await this.personRepository.getPeopleById(id);
    const communications = await this.communicationRepository.getByPersonId(
      person.id
    );
    return { ...person, communications };
  }
}
