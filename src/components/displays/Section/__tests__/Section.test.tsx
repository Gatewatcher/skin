import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import type { SectionProps } from '..';
import Section from '..';

describe('Section', () => {
  const TEST_ID: TestId = 'section';
  const body = 'some content';

  const renderComponent = ({
    children,
    ...props
  }: Partial<SectionProps> = {}) =>
    render(
      <Section data-testid={TEST_ID} {...props}>
        {children || (
          <>
            <Section.Header>
              <Section.Title>Section title</Section.Title>
              <div>action</div>
            </Section.Header>
            <Section.Body>{body}</Section.Body>
          </>
        )}
      </Section>,
    );

  it('should render', async () => {
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
    const section = await screen.findByTestId(TEST_ID);
    expect(section.firstElementChild?.tagName).toBe('HEADER');
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
          <Section.Header>
            <Section.Title>Section title</Section.Title>
            <Section.Button onClick={onClick}>action</Section.Button>
          </Section.Header>
          <Section.Body>{body}</Section.Body>
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
          <Section.Header>
            <Section.Title>Section title</Section.Title>
            <Section.ButtonIcon icon="Add" onClick={onClick} />
          </Section.Header>
          <Section.Body>{body}</Section.Body>
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
          <Section.Header>
            <Section.Title as="h1">title</Section.Title>
          </Section.Header>
        </>
      ),
    });

    const title = await screen.findByRole('heading', { level: 1 });
    expect(title).toBeVisible();
  });

  it('should be secondary variant', async () => {
    renderComponent({ variant: 'secondary' });
    const section = await screen.findByTestId(TEST_ID);
    expect(section).toHaveClass('variantSecondary');
  });
});
