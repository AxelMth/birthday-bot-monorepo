import { eq } from 'drizzle-orm';

import { db } from '../../db';
import { contactMethods } from '../../db/schema';
import { DatabaseCommunicationAdapter } from '../adapters/database-communication.adapter';
import { CommunicationRepository } from '../../application/ports/output/communication.repository';
import { Communication } from '../../domain/entities/communication';

export class DatabaseCommunicationRepository
  implements CommunicationRepository
{
  async getByPersonId(personId: number): Promise<Communication[]> {
    const _communications = await db
      .select()
      .from(contactMethods)
      .where(eq(contactMethods.personId, personId));
    return _communications.map(DatabaseCommunicationAdapter.toDomain);
  }
}
