import { faker } from '@faker-js/faker/locale/en';

import type { Comment, Todo, User, Workspace, WorkspaceType } from './types';
import { generateApiMocks } from './utils';

faker.seed(42);
faker.setDefaultRefDate(new Date('2024-05-01'));

const handlers = {
  users: generateApiMocks<User>('/users', {
    dataFactory: id => {
      const firstname = faker.person.firstName();
      const lastname = faker.person.lastName();

      return {
        id,
        firstname,
        lastname,
        avatar: faker.internet.avatar(),
        age: faker.number.int({ min: 1, max: 99 }),
        email: faker.internet.email({
          firstName: firstname,
          lastName: lastname,
        }),
      };
    },
    errorFactory: () => ({
      firstname: ['firstname error'],
      lastname: ['lastname error'],
      password: ['password error'],
    }),
    searchFilter: (item, term) =>
      item.firstname.toLowerCase().includes(term.toLowerCase()) ||
      item.lastname.toLowerCase().includes(term.toLowerCase()),
  }),
  todos: generateApiMocks<Todo>('/todos', {
    dataFactory: id => {
      return {
        id,
        title: faker.lorem.words(4),
        completed: faker.datatype.boolean(),
      };
    },
    searchFilter: (item, term) =>
      item.title.toLowerCase().includes(term.toLowerCase()),
  }),
  comments: generateApiMocks<Comment>('comments', {
    dataFactory: id => {
      return {
        id: id.toString(),
        content: faker.lorem.paragraphs({ min: 1, max: 4 }),
        created_at: faker.date.recent().toISOString(),
        created_by: faker.person.fullName(),
        updated_at: faker.helpers.maybe(
          () => faker.date.recent().toISOString(),
          { probability: 0.8 },
        ),
      };
    },
  }),
  workspaces: generateApiMocks<Workspace>('workspaces', {
    dataFactory: id => ({
      id: id.toString(),
      name: faker.lorem.words({ min: 1, max: 5 }),
      type: faker.helpers.arrayElement<WorkspaceType>([
        'community',
        'organisation',
        'group',
      ]),
    }),
  }),
};

export const API_HANDLERS = Object.values(handlers).flatMap(items => items);
