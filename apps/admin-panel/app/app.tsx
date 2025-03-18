import {
  Stack,
  Table,
  Container,
  Pagination,
  IconButton,
  ButtonGroup,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

import { peopleClient } from './lib/client';

export default function App() {
  const [people, setPeople] = useState<unknown[]>([]);
  useEffect(() => {
    peopleClient.getPeopleWithCommunications().then((response) => {
      const body = response.body;
      setPeople(body.people);
    });
  }, []);
  return (
    <Container maxW="container.xl">
      <Stack gap="10">
        <Table.Root key={'lg'} size={'lg'}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Nom</Table.ColumnHeader>
              <Table.ColumnHeader>Date de naissance</Table.ColumnHeader>
              <Table.ColumnHeader>Communications</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {people.map((person) => (
              <Table.Row key={person.id}>
                <Table.Cell>{person.name}</Table.Cell>
                <Table.Cell>{person.birthdate}</Table.Cell>
                <Table.Cell>
                  {person.communications.map((c) => c.application)}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        <Pagination.Root count={20} pageSize={2} defaultPage={1}>
          <ButtonGroup variant="ghost" size={'lg'}>
            <Pagination.PrevTrigger asChild>
              <IconButton>
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={(page) => (
                <IconButton variant={{ base: 'ghost', _selected: 'outline' }}>
                  {page.value}
                </IconButton>
              )}
            />

            <Pagination.NextTrigger asChild>
              <IconButton>
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </Stack>
    </Container>
  );
}
