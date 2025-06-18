import { faker } from '@faker-js/faker/locale/en';
import { range } from '@gatewatcher/bistoury/utils-lang';

import type { User } from '@/mocks/types';

export const generateUsers = (count = 100): User[] =>
  range({ stop: count }).map((_, id) => ({
    id,
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 1, max: 99 }),
    avatar: faker.internet.avatar(),
  }));
