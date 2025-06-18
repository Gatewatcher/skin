import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { buildTestIds } from '@/utils/testIds';

import type { AccordionProps } from '..';
import Accordion from '..';
import { SUFFIX_TEST_IDS, TEST_ID } from '../constants';

describe('Accordion', () => {
  const TEST_IDS = buildTestIds(TEST_ID, SUFFIX_TEST_IDS);
  const defaultTitle = 'title';
  const defaultChildren = 'content';

  const user = userEvent.setup();

  const renderComponent = ({
    title,
    children = defaultChildren,
    ...props
  }: Partial<AccordionProps> = {}) =>
    render(
      <Accordion data-testid={TEST_ID} title={title || defaultTitle} {...props}>
        {children}
      </Accordion>,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should have title', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_IDS.title);
    await expectToBeVisibleInTheDocument(defaultTitle, screen.findByText);
  });

  it('should have body', async () => {
    renderComponent();
    expect(await screen.findByTestId(TEST_IDS.body)).toBeInTheDocument();
    expect(await screen.findByText(defaultChildren)).toBeInTheDocument();
  });

  it('should be closed', async () => {
    renderComponent();
    expect(await screen.findByTestId(TEST_IDS.title)).not.toHaveClass(
      'TitleOpened',
    );
  });

  it('should open on click', async () => {
    renderComponent();
    const title = await screen.findByTestId(TEST_IDS.title);
    await user.click(title);
    expect(await screen.findByTestId(TEST_IDS.title)).toHaveClass(
      'TitleOpened',
    );
  });

  it('should be default expanded', async () => {
    renderComponent({ defaultExpanded: true });
    expect(await screen.findByTestId(TEST_IDS.title)).toHaveClass(
      'TitleOpened',
    );
  });

  it('should close on click when opened', async () => {
    renderComponent({ defaultExpanded: true });
    const title = await screen.findByTestId(TEST_IDS.title);

    expect(await screen.findByTestId(TEST_IDS.title)).toHaveClass(
      'TitleOpened',
    );

    await user.click(title);

    expect(await screen.findByTestId(TEST_IDS.title)).not.toHaveClass(
      'TitleOpened',
    );
  });

  it('should render group', async () => {
    render(
      <Accordion.Group data-testid="accordion-group">
        <Accordion title="title1">1</Accordion>
        <Accordion title="title2">2</Accordion>
      </Accordion.Group>,
    );

    await expectToBeVisibleInTheDocument('accordion-group');
    const group = await screen.findByTestId('accordion-group');
    expect(group.childElementCount).toBe(2);
  });

  it('should render a selectable list', async () => {
    render(
      <Accordion title="title1">
        <Accordion.SelectableItem>1</Accordion.SelectableItem>
        <Accordion.SelectableItem>2</Accordion.SelectableItem>
        <Accordion.SelectableItem>3</Accordion.SelectableItem>
        <Accordion.SelectableItem>4</Accordion.SelectableItem>
      </Accordion>,
    );

    const selectableItems = await screen.findByTestId('accordion-body');
    expect(selectableItems.childElementCount).toBe(4);
  });
});
