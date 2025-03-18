import {
  Stack,
  Table,
  Container,
  Pagination,
  IconButton,
  ButtonGroup,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  LuChevronLeft,
  LuChevronRight,
  LuPencil,
  LuTrash,
} from 'react-icons/lu';

import { peopleClient } from './lib/client';

interface Person {
  id: number;
  name: string;
  birthdate: Date;
  communications: { application: string }[];
}

const PAGE_SIZE = 10;
export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [people, setPeople] = useState<Person[]>([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    peopleClient
      .getPaginatedPeople({
        query: {
          pageSize: PAGE_SIZE,
          pageNumber: currentPage,
        },
      })
      .then((res) => {
        if (res.status !== 200) {
          return;
        }
        setCount(res.body.count);
        setPeople(res.body.people);
      });
  }, [currentPage]);

  const navigate = useNavigate();
  const goToEditPerson = (id: number): void => {
    navigate(`/person/${id}/edit`);
  };

  return (
    <Container maxW="container.xl">
      <Stack gap="10">
        <Table.Root key={'lg'} size={'lg'}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Nom</Table.ColumnHeader>
              <Table.ColumnHeader>Date de naissance</Table.ColumnHeader>
              <Table.ColumnHeader>Communications</Table.ColumnHeader>
              <Table.ColumnHeader>Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {people.map((person) => (
              <Table.Row key={person.id}>
                <Table.Cell>{person.name}</Table.Cell>
                <Table.Cell>{formatDate(person.birthdate)}</Table.Cell>
                <Table.Cell>
                  {person.communications.map((c) => c.application)}
                </Table.Cell>
                <Table.Cell>
                  <ButtonGroup>
                    <IconButton
                      variant="ghost"
                      onClick={() => goToEditPerson(person.id)}
                    >
                      <LuPencil />
                    </IconButton>
                    <IconButton variant="ghost">
                      <LuTrash />
                    </IconButton>
                  </ButtonGroup>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        <Pagination.Root count={count} pageSize={PAGE_SIZE} page={currentPage}>
          <ButtonGroup variant="ghost" size={'lg'}>
            <Pagination.PrevTrigger
              asChild
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <IconButton>
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={(page) => (
                <IconButton
                  variant={{ base: 'ghost', _selected: 'outline' }}
                  onClick={() => setCurrentPage(page.value)}
                >
                  {page.value}
                </IconButton>
              )}
            />

            <Pagination.NextTrigger
              asChild
              onClick={() => setCurrentPage(currentPage + 1)}
            >
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

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const day = date.getDate();
  const formattedDay = day < 10 ? `0${day}` : day;
  return `${year}-${formattedMonth}-${formattedDay}`;
};
