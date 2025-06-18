import { faker } from '@faker-js/faker/locale/en';
import { range } from '@gatewatcher/bistoury/utils-lang';
import { screen, waitForElementToBeRemoved } from '@testing-library/dom';

import type { PaginatedApiResponse, User } from '@/mocks/types';

export const generateUsers = (count = 100): User[] =>
  range({ stop: count }).map(() => ({
    id: 1,
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 1, max: 99 }),
    avatar: faker.image.avatar(),
  }));

export const generateUsersFromApi = (
  count = 100,
): PaginatedApiResponse<User> => ({
  count,
  next: 2,
  prev: null,
  results: generateUsers(count),
});

export const waitForFirstLoaderToBeRemoved = async () => {
  await waitForElementToBeRemoved(() => screen.queryByTestId('listing-loader'));
};
export const waitForLoaderToBeRemoved = async () =>
  await waitForElementToBeRemoved(() =>
    screen.queryByTestId('load-more-loader'),
  );
