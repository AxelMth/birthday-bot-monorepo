import { Person } from '../../../domain/entities/person';

export interface PersonRepository {
  getPeople({
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  }): Promise<Person[]>;
  getPeopleCount(): Promise<number>;
  getPeopleByBirthday(date: Date): Promise<Person[]>;
  getPeopleByBirthdayRange(startDate: Date, endDate: Date): Promise<Person[]>;
}
