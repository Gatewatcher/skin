import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import type { CardProps } from '..';
import Card from '..';

describe('Card', () => {
  const TEST_ID: TestId = 'card';
  const body = 'some content';

  const renderComponent = ({ children, ...props }: Partial<CardProps> = {}) =>
    render(
      <Card data-testid={TEST_ID} {...props}>
        {children || (
          <>
            <Card.Header>
              <Card.Title>Card title</Card.Title>
              <Card.Button onClick={console.log}>action</Card.Button>
            </Card.Header>
            <Card.Body>{body}</Card.Body>
          </>
        )}
      </Card>,
    );

  it('should render card', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should have content', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(body, screen.findByText);
  });

  it('should have title as h3 Title', async () => {
    renderComponent();
    const title = await screen.findByRole('heading', { level: 3 });
    expect(title).toBeVisible();
  });

  it('should have header', async () => {
    renderComponent();
    const card = await screen.findByTestId(TEST_ID);
    expect(card.firstElementChild?.tagName).toBe('HEADER');
  });

  it('should have action', async () => {
    renderComponent();
    const action = await screen.findByText('action');
    expect(action).toBeVisible();
  });

  it('should have action button working', async () => {
    const onClick = vi.fn();

    renderComponent({
      children: (
        <>
          <Card.Header>
            <Card.Title>Card title</Card.Title>
            <Card.Button onClick={onClick}>action</Card.Button>
          </Card.Header>
          <Card.Body>{body}</Card.Body>
        </>
      ),
    });

    const btn = await screen.findByRole('button');
    await user.click(btn);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should have action button icon working', async () => {
    const onClick = vi.fn();

    renderComponent({
      children: (
        <>
          <Card.Header>
            <Card.Title>Card title</Card.Title>
            <Card.ButtonIcon icon="Add" onClick={onClick} />
          </Card.Header>
          <Card.Body>{body}</Card.Body>
        </>
      ),
    });

    const btn = await screen.findByRole('img');
    await user.click(btn);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should have h1 title', async () => {
    renderComponent({
      children: (
        <>
          <Card.Header>
            <Card.Title as="h1">title</Card.Title>
          </Card.Header>
        </>
      ),
    });

    const title = await screen.findByRole('heading', { level: 1 });
    expect(title).toBeVisible();
  });
});
