import { initServer } from '@ts-rest/fastify';
import { peopleContract } from '@birthday-bot-monorepo/contracts';

import { DatabaseUserRepository } from '../../infrastructure/repositories/database-person.repository';
import { DatabaseCommunicationRepository } from '../../infrastructure/repositories/database-communication.repository';
import { PeopleService } from '../../application/services/people.service';

const s = initServer();

const databasePersonRepository = new DatabaseUserRepository();
const databaseCommunicationRepository = new DatabaseCommunicationRepository();

const peopleService = new PeopleService(
  databasePersonRepository,
  databaseCommunicationRepository
);

export const peopleRouter = s.router(peopleContract, {
  getPeopleWithCommunications: async ({ query }) => {
    try {
      const people = await peopleService.getPeopleWithCommunications(query);
      return {
        status: 200,
        body: {
          people,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          status: 500,
          body: {
            error: error.message,
          },
        };
      }
      return {
        status: 500,
        body: {
          error: 'An error occurred',
        },
      };
    }
  },
});
